// app/[locale]/member/representative/application/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    AlertCircle,
    Loader2,
    Phone,
    MapPin,
    Send,
    ArrowLeft,
    Award,
    Calendar,
    User,
    Mail,
    Globe,
    BookOpen,
    GraduationCap,
    Languages,
    Users,
    FileText,
    Check,
    School,
    Heart
  } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

interface RepresentativeApplicationPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function RepresentativeApplicationPage({ params }: RepresentativeApplicationPageProps) {
  const [mounted, setMounted] = useState(false);
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  
  // Application form fields - Personal Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  
  // Location Info
  const [country, setCountry] = useState("Türkiye"); // Default value
  const [city, setCity] = useState("");
  
  // Academic Info
  const [universitySchool, setUniversitySchool] = useState("");
  const [department, setDepartment] = useState("");
  const [grade, setGrade] = useState(""); // "prep", "1", "2", "3", "4", "5", "6", "graduate"
  const [languageSkills, setLanguageSkills] = useState("");
  const [otherCommunities, setOtherCommunities] = useState("");
  
  // Application Questions
  const [aboutYourself, setAboutYourself] = useState("");
  const [motivation, setMotivation] = useState("");
  const [plannedActivities, setPlannedActivities] = useState("");
  const [expectations, setExpectations] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  
  // Terms and Conditions
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Set initial form values from user data if available
    if (isLoaded && isSignedIn && user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.primaryEmailAddress?.emailAddress || "");
    }
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    if (mounted && isLoaded && !isSignedIn) {
      router.push(`/${locale}/member/login`);
    }
  }, [mounted, isLoaded, isSignedIn, router, locale]);

  const t = {
    title: locale === "tr" ? "Temsilcilik Başvurusu" : "Representative Application",
    subtitle: locale === "tr" 
      ? "BYM Türkiye'yi okulunuzda veya kurumunuzda temsil edin"
      : "Represent BYM Türkiye at your school or institution",
    
    // Form Sections
    personalInfo: locale === "tr" ? "Kişisel Bilgiler" : "Personal Information",
    locationInfo: locale === "tr" ? "Konum Bilgileri" : "Location Information",
    academicInfo: locale === "tr" ? "Akademik Bilgiler" : "Academic Information",
    applicationQuestions: locale === "tr" ? "Başvuru Soruları" : "Application Questions",
    termsAndConditions: locale === "tr" ? "Şartlar ve Koşullar" : "Terms and Conditions",
    
    // Form Fields - Personal
    firstNameLabel: locale === "tr" ? "Ad" : "First Name",
    firstNamePlaceholder: locale === "tr" ? "Adınızı girin" : "Enter your first name",
    lastNameLabel: locale === "tr" ? "Soyad" : "Last Name",
    lastNamePlaceholder: locale === "tr" ? "Soyadınızı girin" : "Enter your last name",
    emailLabel: locale === "tr" ? "E-posta Adresi" : "Email Address",
    emailPlaceholder: locale === "tr" ? "E-posta adresinizi girin" : "Enter your email address",
    phoneLabel: locale === "tr" ? "Telefon Numarası" : "Phone Number",
    phonePlaceholder: locale === "tr" ? "05XX XXX XX XX" : "05XX XXX XX XX",
    birthDateLabel: locale === "tr" ? "Doğum Tarihi" : "Birth Date",
    
    // Form Fields - Location
    countryLabel: locale === "tr" ? "Yaşadığın Ülke" : "Country",
    countryPlaceholder: locale === "tr" ? "Ülkeni seç" : "Select your country",
    cityLabel: locale === "tr" ? "Yaşadığın Şehir" : "City",
    cityPlaceholder: locale === "tr" ? "Şehrinizi girin" : "Enter your city",
    
    // Form Fields - Academic
    universityLabel: locale === "tr" ? "Okuduğun üniversitenin/lisenin adı ve bölümün" : "University/School Name and Department",
    universityPlaceholder: locale === "tr" ? "Üniversite/okul adını girin" : "Enter university/school name",
    departmentLabel: locale === "tr" ? "Bölüm" : "Department",
    departmentPlaceholder: locale === "tr" ? "Bölümünüzü girin" : "Enter your department",
    gradeLabel: locale === "tr" ? "Sınıfınız" : "Grade/Year",
    languageLabel: locale === "tr" ? "Dil yeterliliğiniz (Seviyeniz ile belirtin.)" : "Language Skills (Specify your level)",
    languagePlaceholder: locale === "tr" ? "Örn: İngilizce - B2, Almanca - A1" : "E.g., English - B2, German - A1",
    otherCommunitiesLabel: locale === "tr" 
      ? "Varsa bulunduğun diğer topluluklardan bahseder misin? (Topluluk ismiyle beraber ne topluluğu olduğunu ve görevinden 1-2 cümle ile bahsedebilirsin.)" 
      : "Can you tell us about other communities you participate in? (Please mention the name, type, and your role in 1-2 sentences)",
    
    // Application Questions
    aboutYourselfLabel: locale === "tr" ? "Kendinden biraz bahsedebilir misin? (50-100 kelime)" : "Could you tell us about yourself? (50-100 words)",
    aboutYourselfPlaceholder: locale === "tr" ? "Kendiniz hakkında bilgi verin..." : "Provide information about yourself...",
    motivationLabel: locale === "tr" ? "Neden temsilci olmak istiyorsun? (50-100 kelime)" : "Why do you want to be a representative? (50-100 words)",
    motivationPlaceholder: locale === "tr" ? "Motivasyonunuzu paylaşın..." : "Share your motivation...",
    plannedActivitiesLabel: locale === "tr" ? "Temsilci olursan neler yapacağını düşünüyor ve istiyorsun?" : "What do you plan to do if you become a representative?",
    plannedActivitiesPlaceholder: locale === "tr" ? "Planladığınız etkinlikleri ve faaliyetleri açıklayın..." : "Explain the activities and events you are planning...",
    expectationsLabel: locale === "tr" ? "Temsilcisi olarak BYM Türkiye - UNIDC'den beklentilerin neler?" : "What are your expectations from BYM Türkiye as a representative?",
    expectationsPlaceholder: locale === "tr" ? "Beklentilerinizi paylaşın..." : "Share your expectations...",
    additionalNotesLabel: locale === "tr" ? "Bize söylemek istediğin bir şey var mı?" : "Is there anything else you would like to tell us?",
    additionalNotesPlaceholder: locale === "tr" ? "Eklemek istediğiniz bilgileri yazın..." : "Write any additional information you want to add...",
    
    // Grade Options
    gradeOptions: {
      prep: locale === "tr" ? "Hazırlık" : "Preparatory Year",
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5",
      "6": "6",
      graduate: locale === "tr" ? "Mezun" : "Graduate"
    },
    
    // Terms and Privacy
    dataStorageConsent: locale === "tr" 
      ? "Bu web sitesinin, talebime yanıt verebilmesi için gönderdiğim bilgileri saklamasına izin veriyorum."
      : "I allow this website to store the information I have sent to respond to my request.",
    termsAndPrivacyConsent: locale === "tr"
      ? "Şartlar ve Koşulları ve Gizlilik Politikasını okudum ve kabul ediyorum."
      : "I have read and accept the Terms and Conditions and Privacy Policy.",
    termsLinkText: locale === "tr"
      ? "Şartlar ve Koşullara ve Gizlilik Politikasına buradan ulaşabilirsiniz."
      : "You can access the Terms and Conditions and Privacy Policy here.",
    
    // UI Text
    submitButton: locale === "tr" ? "Başvuruyu Gönder" : "Submit Application",
    loading: locale === "tr" ? "Gönderiliyor..." : "Submitting...",
    successTitle: locale === "tr" ? "Başvurunuz Alındı!" : "Application Received!",
    successMessage: locale === "tr" 
      ? "Temsilcilik başvurunuzu aldık. En kısa sürede sizinle iletişime geçeceğiz."
      : "We have received your representative application. We will contact you as soon as possible.",
    backToDashboard: locale === "tr" ? "Üye Paneline Dön" : "Back to Dashboard",
    requiredField: locale === "tr" ? "Bu alan zorunludur" : "This field is required",
    
    // Right Panel
    infoTitle: locale === "tr" ? "BYM Türkiye Temsilciliği" : "BYM Türkiye Representative Program",
    infoDesc: locale === "tr" 
      ? "Temsilciler, bulundukları kurumlarda BYM Türkiye'nin misyon ve vizyonunu temsil eder ve etkinlikler organize ederek topluluğumuzu büyütürler."
      : "Representatives embody the mission and vision of BYM Türkiye in their institutions and grow our community by organizing events.",
    responsibilities: locale === "tr" ? "Temsilci Sorumlulukları" : "Representative Responsibilities",
    resp1: locale === "tr" ? "Üniversitende/okulunda BYM Türkiye'yi temsil etmek" : "Represent BYM Türkiye at your university/school",
    resp2: locale === "tr" ? "Etkinlikler ve tanıtımlar düzenlemek" : "Organize events and promotions",
    resp3: locale === "tr" ? "Yeni üyelerin kazanılmasını sağlamak" : "Help acquire new members",
    resp4: locale === "tr" ? "BYM Türkiye etkinliklerinde aktif rol almak" : "Take an active role in BYM Türkiye events",
    
    benefits: locale === "tr" ? "Temsilcilik Avantajları" : "Representative Benefits",
    benefit1: locale === "tr" ? "Liderlik ve organizasyon becerileri geliştirme" : "Develop leadership and organization skills",
    benefit2: locale === "tr" ? "Özel eğitim ve gelişim fırsatları" : "Special training and development opportunities",
    benefit3: locale === "tr" ? "Geniş bir ağa dahil olma imkanı" : "Opportunity to be part of a wide network",
    benefit4: locale === "tr" ? "Temsilcilik sertifikası alma" : "Receive a representative certificate",
  };

  // Updated handleSubmit function matching the exact database schema
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoaded || !isSignedIn || !user) {
      setError(locale === "tr" ? "Lütfen giriş yapın" : "Please log in");
      return;
    }
  
    if (!termsAccepted || !privacyPolicyAccepted) {
      setError(locale === "tr" 
        ? "Devam etmek için şartları ve gizlilik politikasını kabul etmelisiniz" 
        : "You must accept the terms and privacy policy to continue");
      return;
    }
  
    // Validate all required fields are filled
    if (!firstName || !lastName || !email || !phoneNumber || !birthDate || 
        !country || !city || !universitySchool || !department || !grade || 
        !languageSkills || !aboutYourself || !motivation || !plannedActivities || 
        !expectations) {
      setError(locale === "tr" 
        ? "Lütfen tüm zorunlu alanları doldurun" 
        : "Please fill in all required fields");
      return;
    }
  
    try {
      setLoading(true);
      setError("");
  
      // Format birth date properly - ensure it's a valid date in YYYY-MM-DD format
      let formattedBirthDate;
      try {
        const birthDateObj = new Date(birthDate);
        if (isNaN(birthDateObj.getTime())) {
          throw new Error("Invalid date");
        }
        // Create YYYY-MM-DD format
        formattedBirthDate = birthDateObj.toISOString().split('T')[0];
      } catch (dateError) {
        console.error("Error formatting date:", dateError);
        setError(locale === "tr" 
          ? "Doğum tarihi formatı geçersiz. Lütfen kontrol ediniz." 
          : "Invalid birth date format. Please check the date.");
        setLoading(false);
        return;
      }
      
      // Prepare application data according to schema
      const applicationData = {
        clerk_id: user.id,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        birth_date: formattedBirthDate,
        country: country,
        city: city,
        university_school: universitySchool,
        department: department,
        grade: grade,
        language_skills: languageSkills,
        other_communities: otherCommunities || null,
        about_yourself: aboutYourself,
        motivation: motivation,
        planned_activities: plannedActivities,
        expectations: expectations,
        additional_notes: additionalNotes || null,
        terms_accepted: termsAccepted,
        privacy_policy_accepted: privacyPolicyAccepted
        // Not including status, created_at, updated_at as they have default values
      };
  
      console.log("Submitting application data:", applicationData);
  
      // Insert application into Supabase
      const { error: supabaseError } = await supabase
        .from("unidc_representative_applications")
        .insert([applicationData]);
  
      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        console.error("Error code:", supabaseError.code);
        console.error("Error message:", supabaseError.message);
        console.error("Error details:", supabaseError.details);
        
        // Handle specific error types
        if (supabaseError.code === '23505') {
          // Duplicate key violation
          setError(locale === "tr"
            ? "Bu e-posta adresi ile daha önce başvuru yapılmış."
            : "An application with this email has already been submitted.");
        } else if (supabaseError.code === '23502') {
          // Not null violation
          setError(locale === "tr"
            ? "Bazı zorunlu alanlar eksik. Lütfen tüm gerekli alanları doldurun."
            : "Some required fields are missing. Please fill in all required fields.");
        } else {
          // Generic error message
          setError(locale === "tr"
            ? "Başvuru kaydedilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
            : "An error occurred while saving your application. Please try again later.");
        }
        
        setLoading(false);
        return;
      }
  
      console.log("Application submitted successfully");
  
      // Now update user record
      try {
        const { error: updateError } = await supabase
          .from("unidc_users")
          .update({ wants_to_be_representative: true })
          .eq("clerk_id", user.id);
  
        if (updateError) {
          console.error("User update error:", updateError);
          // Log the error but continue since the application was saved
        } else {
          console.log("User record updated successfully");
        }
      } catch (userUpdateErr) {
        console.error("Error during user update:", userUpdateErr);
        // Continue since the application was saved
      }
  
      // Send email notification
      try {
        console.log("Sending email notification...");
        const emailResponse = await fetch("/api/representative-application", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...applicationData,
            locale: locale,
          }),
        });
      
        if (!emailResponse.ok) {
          console.warn("Email notification could not be sent - Status:", emailResponse.status);
          try {
            const errorData = await emailResponse.json();
            console.warn("Email error details:", errorData);
          } catch {
            // Using empty catch block without parameter (prevents unused variable warning)
            console.warn("Could not parse error response");
          }
        } else {
            try {
                const responseData = await emailResponse.json();
                console.log("Email notification sent successfully:", responseData);
              } catch {
                // Using empty catch block without parameter (prevents unused variable warning)
                console.log("Email sent but could not parse response");
              }
        }
      } catch (emailErr) {
        console.warn("Error sending email notification:", emailErr);
      }
  
      // Set success and clear form
      setSuccess(true);
    } catch (err: unknown) {
      console.error("Application submission failed:", err);
      
      // Log detailed error information
      if (err instanceof Error) {
        console.log("Error message:", err.message);
        console.log("Error object:", err);
      } else {
        console.log("Unknown error:", err);
      }
      
      setError(
        locale === "tr"
          ? "Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
          : "An error occurred while submitting the application. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || !isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    router.push(`/${locale}/member/login`);
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#fff7f8]">
      <div className="flex flex-1 flex-col justify-center py-8 px-6 sm:px-6 lg:px-12">
        <div className="mx-auto w-full max-w-2xl">
          <div className="text-left">
            <Image
              src="/tr/bym-turkiye-logo.png"
              alt="BYM Türkiye"
              width={110}
              height={22}
              className="h-12 w-auto"
            />
            <h2 className="mt-6 text-xl font-medium text-neutral-800">
              {t.title}
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              {t.subtitle}
            </p>
          </div>

          <div className="mt-8">
            {error && (
              <div className="mb-6 flex items-center rounded bg-red-50 p-3 text-sm text-red-800">
                <AlertCircle className="mr-2 h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {success ? (
              <div className="text-center py-8 px-4 bg-white rounded-lg shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-800 mb-2">{t.successTitle}</h2>
                <p className="text-neutral-600 mb-6">{t.successMessage}</p>
                <Link
                  href={`/${locale}/member`}
                  className="inline-flex justify-center rounded bg-[#961319] px-4 py-2 text-sm font-medium text-white hover:bg-[#7e1016] focus:outline-none transition-colors"
                >
                  {t.backToDashboard}
                </Link>
              </div>
            ) : (
              <form className="space-y-8 bg-white rounded-lg shadow-sm p-6" onSubmit={handleSubmit} noValidate>
                {/* Personal Information */}
                <div>
                  <h3 className="text-md font-medium text-neutral-800 mb-4 pb-1 border-b border-neutral-200">
                    {t.personalInfo}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t.firstNameLabel} <span className="text-[#961319]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User className="h-4 w-4 text-neutral-500" />
                        </div>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                          placeholder={t.firstNamePlaceholder}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t.lastNameLabel} <span className="text-[#961319]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User className="h-4 w-4 text-neutral-500" />
                        </div>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                          placeholder={t.lastNamePlaceholder}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t.emailLabel} <span className="text-[#961319]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="h-4 w-4 text-neutral-500" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                          placeholder={t.emailPlaceholder}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t.phoneLabel} <span className="text-[#961319]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Phone className="h-4 w-4 text-neutral-500" />
                        </div>
                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                          placeholder={t.phonePlaceholder}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="birthDate" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t.birthDateLabel} <span className="text-[#961319]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Calendar className="h-4 w-4 text-neutral-500" />
                        </div>
                        <input
                          id="birthDate"
                          name="birthDate"
                          type="date"
                          required
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div>
                  <h3 className="text-md font-medium text-neutral-800 mb-4 pb-1 border-b border-neutral-200">
                    {t.locationInfo}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t.countryLabel} <span className="text-[#961319]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Globe className="h-4 w-4 text-neutral-500" />
                        </div>
                        <select
                          id="country"
                          name="country"
                          required
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                        >
                          <option value="Türkiye">Türkiye</option>
                          <option value="Other">{locale === "tr" ? "Diğer" : "Other"}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t.cityLabel} <span className="text-[#961319]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <MapPin className="h-4 w-4 text-neutral-500" />
                        </div>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                          placeholder={t.cityPlaceholder}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div>
                  <h3 className="text-md font-medium text-neutral-800 mb-4 pb-1 border-b border-neutral-200">
                    {t.academicInfo}
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="universitySchool" className="block text-sm font-medium text-neutral-700 mb-1">
                          {t.universityLabel} <span className="text-[#961319]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <School className="h-4 w-4 text-neutral-500" />
                          </div>
                          <input
                            id="universitySchool"
                            name="universitySchool"
                            type="text"
                            required
                            value={universitySchool}
                            onChange={(e) => setUniversitySchool(e.target.value)}
                            className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                            placeholder={t.universityPlaceholder}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="department" className="block text-sm font-medium text-neutral-700 mb-1">
                          {t.departmentLabel} <span className="text-[#961319]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <BookOpen className="h-4 w-4 text-neutral-500" />
                          </div>
                          <input
                            id="department"
                            name="department"
                            type="text"
                            required
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                            placeholder={t.departmentPlaceholder}
                          />
                          </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="grade" className="block text-sm font-medium text-neutral-700 mb-1">
                          {t.gradeLabel} <span className="text-[#961319]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <GraduationCap className="h-4 w-4 text-neutral-500" />
                          </div>
                          <select
                            id="grade"
                            name="grade"
                            required
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                          >
                            <option value="">{locale === "tr" ? "Seçiniz..." : "Select..."}</option>
                            <option value="prep">{t.gradeOptions.prep}</option>
                            <option value="1">{t.gradeOptions["1"]}</option>
                            <option value="2">{t.gradeOptions["2"]}</option>
                            <option value="3">{t.gradeOptions["3"]}</option>
                            <option value="4">{t.gradeOptions["4"]}</option>
                            <option value="5">{t.gradeOptions["5"]}</option>
                            <option value="6">{t.gradeOptions["6"]}</option>
                            <option value="graduate">{t.gradeOptions.graduate}</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="languageSkills" className="block text-sm font-medium text-neutral-700 mb-1">
                          {t.languageLabel} <span className="text-[#961319]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Languages className="h-4 w-4 text-neutral-500" />
                          </div>
                          <input
                            id="languageSkills"
                            name="languageSkills"
                            type="text"
                            required
                            value={languageSkills}
                            onChange={(e) => setLanguageSkills(e.target.value)}
                            className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                            placeholder={t.languagePlaceholder}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="otherCommunities" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t.otherCommunitiesLabel}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-2.5 pointer-events-none">
                          <Users className="h-4 w-4 text-neutral-500" />
                        </div>
                        <textarea
                          id="otherCommunities"
                          name="otherCommunities"
                          rows={2}
                          value={otherCommunities}
                          onChange={(e) => setOtherCommunities(e.target.value)}
                          className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application Questions */}
                <div>
                  <h3 className="text-md font-medium text-neutral-800 mb-4 pb-1 border-b border-neutral-200">
                    {t.applicationQuestions}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="aboutYourself" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t.aboutYourselfLabel} <span className="text-[#961319]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-2.5 pointer-events-none">
                          <User className="h-4 w-4 text-neutral-500" />
                        </div>
                        <textarea
                          id="aboutYourself"
                          name="aboutYourself"
                          rows={3}
                          required
                          value={aboutYourself}
                          onChange={(e) => setAboutYourself(e.target.value)}
                          className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                          placeholder={t.aboutYourselfPlaceholder}
                        />
                      </div>
                      <div className="mt-1 text-xs text-neutral-500">
                        {aboutYourself.split(/\s+/).filter(Boolean).length} / 100 {locale === "tr" ? "kelime" : "words"}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="motivation" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t.motivationLabel} <span className="text-[#961319]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-2.5 pointer-events-none">
                          <Heart className="h-4 w-4 text-neutral-500" />
                        </div>
                        <textarea
                          id="motivation"
                          name="motivation"
                          rows={3}
                          required
                          value={motivation}
                          onChange={(e) => setMotivation(e.target.value)}
                          className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                          placeholder={t.motivationPlaceholder}
                        />
                      </div>
                      <div className="mt-1 text-xs text-neutral-500">
                        {motivation.split(/\s+/).filter(Boolean).length} / 100 {locale === "tr" ? "kelime" : "words"}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="plannedActivities" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t.plannedActivitiesLabel} <span className="text-[#961319]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-2.5 pointer-events-none">
                          <Calendar className="h-4 w-4 text-neutral-500" />
                        </div>
                        <textarea
                          id="plannedActivities"
                          name="plannedActivities"
                          rows={3}
                          required
                          value={plannedActivities}
                          onChange={(e) => setPlannedActivities(e.target.value)}
                          className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                          placeholder={t.plannedActivitiesPlaceholder}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="expectations" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t.expectationsLabel} <span className="text-[#961319]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-2.5 pointer-events-none">
                          <Award className="h-4 w-4 text-neutral-500" />
                        </div>
                        <textarea
                          id="expectations"
                          name="expectations"
                          rows={3}
                          required
                          value={expectations}
                          onChange={(e) => setExpectations(e.target.value)}
                          className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                          placeholder={t.expectationsPlaceholder}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="additionalNotes" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t.additionalNotesLabel}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-2.5 pointer-events-none">
                          <FileText className="h-4 w-4 text-neutral-500" />
                        </div>
                        <textarea
                          id="additionalNotes"
                          name="additionalNotes"
                          rows={2}
                          value={additionalNotes}
                          onChange={(e) => setAdditionalNotes(e.target.value)}
                          className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                          placeholder={t.additionalNotesPlaceholder}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div>
                  <h3 className="text-md font-medium text-neutral-800 mb-4 pb-1 border-b border-neutral-200">
                    {t.termsAndConditions}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          required
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          className="h-4 w-4 rounded border-neutral-300 text-[#961319] focus:ring-[#961319]"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-medium text-neutral-700">
                          {t.dataStorageConsent}
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="privacyPolicy"
                          name="privacyPolicy"
                          type="checkbox"
                          required
                          checked={privacyPolicyAccepted}
                          onChange={(e) => setPrivacyPolicyAccepted(e.target.checked)}
                          className="h-4 w-4 rounded border-neutral-300 text-[#961319] focus:ring-[#961319]"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="privacyPolicy" className="font-medium text-neutral-700">
                          {t.termsAndPrivacyConsent}
                        </label>
                        <p className="text-neutral-500 mt-1">
                          <Link href={`/${locale}/terms`} className="text-[#961319] hover:underline" target="_blank">
                            {t.termsLinkText}
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading || !firstName || !lastName || !email || !phoneNumber || !birthDate || 
                              !country || !city || !universitySchool || !department || !grade || !languageSkills || 
                              !aboutYourself || !motivation || !plannedActivities || !expectations ||
                              !termsAccepted || !privacyPolicyAccepted}
                    className="flex w-full justify-center rounded bg-[#961319] px-4 py-2 text-sm font-medium text-white hover:bg-[#7e1016] focus:outline-none disabled:opacity-60 transition-colors"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.loading}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t.submitButton}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 flex flex-col space-y-2">
              <Link
                href={`/${locale}/member`}
                className="text-sm font-medium text-[#961319] hover:text-[#7e1016] flex items-center"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                {t.backToDashboard}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Interactive right section */}
      <div className="relative hidden lg:block lg:w-1/2">
        <div className="absolute inset-0 h-full w-full bg-[#961319]">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
            <div className="w-full max-w-md rounded-lg bg-white/10 backdrop-blur-sm p-6 text-white shadow-lg">
              <h3 className="text-2xl font-medium mb-3">{t.infoTitle}</h3>
              <p className="mb-6 text-sm opacity-90">{t.infoDesc}</p>
              
              <div className="space-y-5">
                <h4 className="font-medium text-sm text-white/90">{t.responsibilities}</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <span className="text-xs">✓</span>
                    </div>
                    <span className="text-sm opacity-90">{t.resp1}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <span className="text-xs">✓</span>
                    </div>
                    <span className="text-sm opacity-90">{t.resp2}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <span className="text-xs">✓</span>
                    </div>
                    <span className="text-sm opacity-90">{t.resp3}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <span className="text-xs">✓</span>
                    </div>
                    <span className="text-sm opacity-90">{t.resp4}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <h4 className="font-medium text-sm text-white/90 mb-3">{t.benefits}</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <GraduationCap className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm opacity-90">{t.benefit1}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <BookOpen className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm opacity-90">{t.benefit2}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm opacity-90">{t.benefit3}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm opacity-90">{t.benefit4}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
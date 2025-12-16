// app/[locale]/member/signup/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignUp, useAuth } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AlertCircle,
  Loader2,
  ChevronRight,
  User,
  Mail,
  Lock,
  ArrowLeft,
  Building,
  BookOpen,
  Info,
  UserCheck, // New Icon
  GraduationCap, // New Icon
  Award, // New Icon
  Sparkles, // New Icon
  Brain, // New Icon
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

interface SignUpPageProps {
  params: Promise<{
    locale: string;
  }>;
}


export default function SignUpPage({ params }: SignUpPageProps) {
  const [mounted, setMounted] = useState(false);
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;

  const { isLoaded, signUp, setActive } = useSignUp();
  const { isSignedIn } = useAuth();
  const [email, setEmail] = useState("");
const [termsAccepted, setTermsAccepted] = useState(false);
const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  
  // New state variables
  const [userType, setUserType] = useState(""); // student, academic, professional
  const [gradeLevel, setGradeLevel] = useState("");
  const [academicTitle, setAcademicTitle] = useState("");
  const [futureGoals, setFutureGoals] = useState("");
  const [developmentAreas, setDevelopmentAreas] = useState("");

  const [referralSource, setReferralSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // Now 4 steps total
  const router = useRouter();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isLoaded && isSignedIn) {
      router.push(`/${locale}/member`);
    }
  }, [mounted, isLoaded, isSignedIn, router, locale]);

  const t = {
    title: locale === "tr" ? "Üye Kaydı" : "Sign Up",
    subtitle:
      locale === "tr"
        ? "BYM Türkiye Biyomühendislik Topluluğu'na katılın"
        : "Join BYM Türkiye Bioengineering Community",
    firstNameLabel: locale === "tr" ? "Ad" : "First Name",
    firstNamePlaceholder:
      locale === "tr" ? "Adınızı girin" : "Enter your first name",
    lastNameLabel: locale === "tr" ? "Soyad" : "Last Name",
    
    lastNamePlaceholder:
      locale === "tr" ? "Soyadınızı girin" : "Enter your last name",
    institutionLabel: locale === "tr" ? "Kurum/Okul" : "Institution/School",
    institutionPlaceholder:
      locale === "tr"
        ? "Kurumunuzu/okulunuzu girin"
        : "Enter your institution/school",
    departmentLabel: locale === "tr" ? "Bölüm/Departman" : "Department",
    departmentPlaceholder:
      locale === "tr" ? "Bölümünüzü/departmanınızı girin" : "Enter your department",
    
    // New translations for Step 2
    userTypeLabel: locale === "tr" ? "Kullanıcı Tipi" : "User Type",
    userTypePlaceholder: locale === "tr" ? "Lütfen seçiniz" : "Please select",
    studentOption: locale === "tr" ? "Öğrenci" : "Student",
    academicOption: locale === "tr" ? "Akademisyen" : "Academic",
    professionalOption: locale === "tr" ? "Profesyonel/Çalışan" : "Professional/Employee",
    gradeLevelLabel: locale === "tr" ? "Sınıf / Eğitim Seviyesi" : "Grade / Education Level",
    gradeLevelPlaceholder: locale === "tr" ? "Örn: 3. Sınıf, Yüksek Lisans" : "e.g., 3rd Grade, Master's Student",
    academicTitleLabel: locale === "tr" ? "Akademik Unvan" : "Academic Title",
    academicTitlePlaceholder: locale === "tr" ? "Örn: Prof. Dr., Araştırma Gör." : "e.g., Prof., Research Asst.",

    referralLabel:
      locale === "tr" ? "Bizi nereden duydunuz?" : "How did you hear about us?",
    referralPlaceholder:
      locale === "tr"
        ? "Bizi nereden duyduğunuzu belirtin"
        : "Specify how you found us",
    emailLabel: locale === "tr" ? "E-posta Adresi" : "Email Address",
    emailPlaceholder:
      locale === "tr" ? "E-posta adresinizi girin" : "Enter your email address",
    passwordLabel: locale === "tr" ? "Şifre" : "Password",
    passwordPlaceholder:
      locale === "tr" ? "Şifrenizi girin" : "Enter your password",
    signUpButton: locale === "tr" ? "Kayıt Ol" : "Sign Up",
    loginLink:
      locale === "tr"
        ? "Zaten hesabınız var mı? Giriş Yap"
        : "Already have an account? Login",
    loading: locale === "tr" ? "Kaydediliyor..." : "Signing up...",
    backToHome: locale === "tr" ? "Ana Sayfaya Dön" : "Back to Home",
    continue: locale === "tr" ? "Devam Et" : "Continue",
    back: locale === "tr" ? "Geri" : "Back",
    
    // Step Titles for Form Sections
    step1Title: locale === "tr" ? "Kişisel Bilgiler" : "Personal Information",
    step2Title: locale === "tr" ? "Eğitim ve Mesleki Bilgiler" : "Education & Professional Information",
    step3Title: locale === "tr" ? "Gelecek Planları ve Hedefler" : "Future Plans & Goals",
    step4Title: locale === "tr" ? "Hesap Detayları" : "Account Details",

    // For Right Panel
    personalInfo: locale === "tr" ? "Kişisel Bilgiler" : "Personal Information",
    educationProfessionalInfo: locale === "tr" ? "Eğitim ve Mesleki" : "Education & Professional",
    futurePlansInfo: locale === "tr" ? "Gelecek Planları" : "Future Plans",
    accountInfo: locale === "tr" ? "Hesap Bilgileri" : "Account Information",

    // New translations for Step 3 (Future Plans)
    futureGoalsLabel: locale === "tr" ? "Gelecekteki hedeflerin nelerdir?" : "What are your future goals?",
    futureGoalsPlaceholder: locale === "tr" ? "Hayallerini ve hedeflerini bizimle paylaş..." : "Share your dreams and goals with us...",
    futureGoalsLabelStudent: locale === "tr" ? "Mezuniyet sonrası hayallerin ve kariyer hedeflerin nelerdir?" : "What are your post-graduation dreams and career goals?",
    futureGoalsLabelAcademic: locale === "tr" ? "Gelecekteki akademik/araştırma hedeflerin ve projelerin nelerdir?" : "What are your future academic/research goals and projects?",
    futureGoalsLabelProfessional: locale === "tr" ? "Kariyerinde ulaşmak istediğin hedefler ve projeler nelerdir?" : "What are your career goals and projects you aim to achieve?",
    
    developmentAreasLabel: locale === "tr" ? "Hangi alanlarda kendini geliştirmek istersin?" : "In which areas do you want to develop yourself?",
    developmentAreasPlaceholder: locale === "tr" ? "Kendini geliştirmek istediğin alanları belirt..." : "Specify the areas you want to improve in...",
    developmentAreasLabelStudent: locale === "tr" ? "Hangi spesifik alanlarda kendini geliştirmek ve yeni yetkinlikler kazanmak istersin?" : "In which specific areas do you want to improve yourself and gain new competencies?",
    developmentAreasLabelAcademic: locale === "tr" ? "Akademik veya profesyonel olarak hangi alanlarda uzmanlığını derinleştirmek veya yeni yetkinlikler edinmek istersin?" : "In which areas do you want to deepen your expertise or acquire new skills, academically or professionally?",
    developmentAreasLabelProfessional: locale === "tr" ? "Mesleki olarak hangi alanlarda kendini geliştirmek ve uzmanlaşmak istiyorsun?" : "In which professional areas do you want to develop and specialize?",

    welcomeTitle:
      locale === "tr" ? "BYM Türkiye'ye Hoş Geldiniz" : "Welcome to BYM Türkiye",
    welcomeDesc:
      locale === "tr"
        ? "Biyomühendislik topluluğuna katılarak yeni bilgiler edinebilir ve etkinliklerden haberdar olabilirsiniz."
        : "Join our bioengineering community to access new knowledge and stay updated on upcoming events.",
    steps: locale === "tr" ? "Adımlar" : "Steps",
    communityJoin: locale === "tr" ? "Topluluğa Katılın" : "Join Community",
    accessEvents:
      locale === "tr" ? "BYM etkinliklerine erişin" : "Access BYM events",
    
    // Dynamic messages for right panel
    dynamicHello: locale === "tr" ? `Merhaba ${firstName}! 🎯` : `Hello ${firstName}! 🎯`,
    dynamicCommunityWelcome: locale === "tr" 
      ? "BYM Türkiye'nin yenilikçi biyomühendislik topluluğuna adım atmaya çok yakınsınız."
      : "You're one step closer to joining BYM Türkiye's innovative bioengineering community.",
    dynamicInstitutionWelcome: locale === "tr"
      ? `${institution} çatısı altından topluluğumuza katılıyorsun! 🏛️`
      : `Joining us from ${institution}! 🏛️`,
    dynamicDepartmentInfo: locale === "tr"
      ? `${department} alanında ${userType === 'student' ? 'eğitimine devam eden' : userType === 'academic' ? 'çalışmalar yürüten' : 'deneyimli'} bir üye olarak geleceği şekillendireceksin.`
      : `As a member from the ${department} field, ${userType === 'student' ? 'continuing your education' : userType === 'academic' ? 'conducting research' : 'with experience'}, you'll shape the future.`,
    dynamicFuturePlansSet: locale === "tr"
      ? `Harika hedeflerin var, ${firstName}! ✨`
      : `You have wonderful goals, ${firstName}! ✨`,
    dynamicDevelopmentFocus: locale === "tr"
      ? "Kendini geliştirmeye odaklanman çok değerli. Birlikte daha güçlüyüz!"
      : "Your focus on self-development is very valuable. Together we are stronger!",
  };

  interface UserData {
    clerk_id: string | null;
    first_name: string;
    last_name: string;
    email: string;
    institution: string;
    department: string;
    user_type: string;
    grade_level?: string;
    academic_title?: string;
    future_goals: string;
    development_areas: string;
    referral_source: string;
    created_at: Date;
  }

  const saveToSupabase = async (userData: UserData) => {
    try {
      const { error } = await supabase.from("unidc_users").insert([userData]);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error("Error saving to Supabase:", err);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;
  
    // Şartlar ve koşullar onayının kontrolü
    if (!termsAccepted || !privacyAccepted) {
      setError(
        locale === "tr"
          ? "Devam etmek için şartlar ve koşulları kabul etmelisiniz."
          : "You must accept the terms and conditions to continue."
      );
      return;
    }
  
    try {
      setLoading(true);
      setError("");
  
      const result = await signUp.create({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        emailAddress: email.trim(),
        password: password,
      });
  
      if (result.status === "complete") {
        const userData: UserData = {
          clerk_id: result.createdUserId,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          institution: institution.trim(),
          department: department.trim(),
          user_type: userType,
          grade_level: userType === "student" ? gradeLevel.trim() : undefined,
          academic_title: userType === "academic" ? academicTitle.trim() : undefined,
          future_goals: futureGoals.trim(),
          development_areas: developmentAreas.trim(),
          referral_source: referralSource.trim(),
          created_at: new Date(),
        };
  
        await saveToSupabase(userData);
        await setActive({ session: result.createdSessionId });
        
        // Temsilcilik sayfasına yönlendirme seçeneği sunmak için:
        router.push(`/${locale}/member/welcome?representative=offer`);
      } else {
        setError(
          locale === "tr"
            ? "Kayıt tamamlanamadı. Lütfen tekrar deneyin."
            : "Sign-up could not be completed. Please try again."
        );
      }
    } catch {
      // Hata mesajı zaten genel bir şekilde ayarlanıyor, err parametresine gerek yok
      setError(
        locale === "tr"
          ? "Kayıt tamamlanamadı. Lütfen tekrar deneyin."
          : "Sign-up could not be completed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && firstName && lastName) {
      setStep(2);
    } else if (
      step === 2 &&
      institution &&
      department &&
      userType &&
      (userType !== "student" || gradeLevel) &&
      (userType !== "academic" || academicTitle)
    ) {
      setStep(3);
    } else if (step === 3 && futureGoals && developmentAreas) {
      setStep(4);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (!mounted || (isLoaded && isSignedIn)) {
    return null;
  }
  
  const getFutureGoalsLabel = () => {
    if (userType === "student") return t.futureGoalsLabelStudent;
    if (userType === "academic") return t.futureGoalsLabelAcademic;
    if (userType === "professional") return t.futureGoalsLabelProfessional;
    return t.futureGoalsLabel;
  };

  const getDevelopmentAreasLabel = () => {
    if (userType === "student") return t.developmentAreasLabelStudent;
    if (userType === "academic") return t.developmentAreasLabelAcademic;
    if (userType === "professional") return t.developmentAreasLabelProfessional;
    return t.developmentAreasLabel;
  };


  return (
    <div className="flex min-h-screen bg-[#fff7f8]">
      <div className="flex flex-1 flex-col justify-center py-8 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-md">
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
            <p className="mt-1 text-sm text-neutral-600">{t.subtitle}</p>
          </div>

          <div className="mt-8">
            {error && (
              <div className="mb-6 flex items-center rounded bg-red-50 p-3 text-sm text-red-800">
                <AlertCircle className="mr-2 h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              {step === 1 && (
                <div className="space-y-4 animate-fade-in-up">
                  <h3 className="text-sm font-medium text-neutral-700 pb-1">
                    {t.step1Title}
                  </h3>
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-neutral-700 mb-1"
                    >
                      {t.firstNameLabel}{" "}
                      <span className="text-[#961319]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-4 w-4 text-neutral-500" />
                      </div>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                        placeholder={t.firstNamePlaceholder}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-neutral-700 mb-1"
                    >
                      {t.lastNameLabel}{" "}
                      <span className="text-[#961319]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-4 w-4 text-neutral-500" />
                      </div>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                        placeholder={t.lastNamePlaceholder}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!firstName || !lastName}
                      className="flex w-full justify-center items-center rounded bg-[#961319] px-4 py-2 text-sm font-medium text-white hover:bg-[#7e1016] focus:outline-none disabled:opacity-60 transition-colors"
                    >
                      {t.continue}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fade-in-up">
                  <h3 className="text-sm font-medium text-neutral-700 pb-1">
                    {t.step2Title}
                  </h3>
                  <div>
                    <label
                      htmlFor="institution"
                      className="block text-sm font-medium text-neutral-700 mb-1"
                    >
                      {t.institutionLabel}{" "}
                      <span className="text-[#961319]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Building className="h-4 w-4 text-neutral-500" />
                      </div>
                      <input
                        id="institution"
                        name="institution"
                        type="text"
                        required
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                        placeholder={t.institutionPlaceholder}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium text-neutral-700 mb-1"
                    >
                      {t.departmentLabel}{" "}
                      <span className="text-[#961319]">*</span>
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
                  <div>
                    <label htmlFor="userType" className="block text-sm font-medium text-neutral-700 mb-1">
                      {t.userTypeLabel} <span className="text-[#961319]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <UserCheck className="h-4 w-4 text-neutral-500" />
                      </div>
                      <select
                        id="userType"
                        name="userType"
                        required
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm appearance-none"
                      >
                        <option value="">{t.userTypePlaceholder}</option>
                        <option value="student">{t.studentOption}</option>
                        <option value="academic">{t.academicOption}</option>
                        <option value="professional">{t.professionalOption}</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronRight className="h-4 w-4 text-neutral-500 rotate-90" />
                      </div>
                    </div>
                  </div>

                  {userType === "student" && (
                    <div className="animate-fade-in-up">
                      <label htmlFor="gradeLevel" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t.gradeLevelLabel} <span className="text-[#961319]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <GraduationCap className="h-4 w-4 text-neutral-500" />
                        </div>
                        <input
                          id="gradeLevel"
                          name="gradeLevel"
                          type="text"
                          required={userType === "student"}
                          value={gradeLevel}
                          onChange={(e) => setGradeLevel(e.target.value)}
                          className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                          placeholder={t.gradeLevelPlaceholder}
                        />
                      </div>
                    </div>
                  )}

                  {userType === "academic" && (
                     <div className="animate-fade-in-up">
                      <label htmlFor="academicTitle" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t.academicTitleLabel} <span className="text-[#961319]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Award className="h-4 w-4 text-neutral-500" />
                        </div>
                        <input
                          id="academicTitle"
                          name="academicTitle"
                          type="text"
                          required={userType === "academic"}
                          value={academicTitle}
                          onChange={(e) => setAcademicTitle(e.target.value)}
                          className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                          placeholder={t.academicTitlePlaceholder}
                        />
                      </div>
                    </div>
                  )}


                  
                  <div>
                    <label htmlFor="referralSource" className="block text-sm font-medium text-neutral-700 mb-1">
                      {t.referralLabel}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Info className="h-4 w-4 text-neutral-500" />
                      </div>
                      <select
                        id="referralSource"
                        name="referralSource"
                        value={referralSource}
                        onChange={(e) => setReferralSource(e.target.value)}
                        className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm appearance-none"
                      >
                        <option value="">{locale === "tr" ? "Seçiniz..." : "Choose..."}</option>
                        <option value="instagram">{locale === "tr" ? "Instagram" : "Instagram"}</option>
                        <option value="twitter">{locale === "tr" ? "Twitter/X" : "Twitter/X"}</option>
                        <option value="whatsapp">{locale === "tr" ? "WhatsApp" : "WhatsApp"}</option>
                        <option value="linkedin">{locale === "tr" ? "LinkedIn" : "LinkedIn"}</option>
                        <option value="youtube">{locale === "tr" ? "YouTube" : "YouTube"}</option>
                        <option value="friend">{locale === "tr" ? "Arkadaş Tavsiyesi" : "Friend Recommendation"}</option>
                        <option value="school">{locale === "tr" ? "Okul/Üniversite" : "School/University"}</option>
                        <option value="event">{locale === "tr" ? "Etkinlik" : "Event"}</option>
                        <option value="search">{locale === "tr" ? "İnternet Araması" : "Internet Search"}</option>
                        <option value="newsletter">{locale === "tr" ? "E-posta Bülteni" : "Newsletter"}</option>
                        <option value="other">{locale === "tr" ? "Diğer" : "Other"}</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronRight className="h-4 w-4 text-neutral-500 rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex w-1/3 justify-center items-center rounded border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none transition-colors"
                    >
                      <ArrowLeft className="mr-1 h-4 w-4" />
                      {t.back}
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={
                        !institution ||
                        !department ||
                        !userType ||
                        (userType === "student" && !gradeLevel) ||
                        (userType === "academic" && !academicTitle)
                      }
                      className="flex w-2/3 justify-center items-center rounded bg-[#961319] px-4 py-2 text-sm font-medium text-white hover:bg-[#7e1016] focus:outline-none disabled:opacity-60 transition-colors"
                    >
                      {t.continue}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && ( // New Step: Future Plans
                <div className="space-y-4 animate-fade-in-up">
                  <h3 className="text-sm font-medium text-neutral-700 pb-1">
                    {t.step3Title}
                  </h3>
                   <div>
                    <label htmlFor="futureGoals" className="block text-sm font-medium text-neutral-700 mb-1">
                      {getFutureGoalsLabel()} <span className="text-[#961319]">*</span>
                    </label>
                    <div className="relative">
                       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-3 pointer-events-none">
                        <Sparkles className="h-4 w-4 text-neutral-500" />
                      </div>
                      <textarea
                        id="futureGoals"
                        name="futureGoals"
                        rows={3}
                        required
                        value={futureGoals}
                        onChange={(e) => setFutureGoals(e.target.value)}
                        className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                        placeholder={t.futureGoalsPlaceholder}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="developmentAreas" className="block text-sm font-medium text-neutral-700 mb-1">
                      {getDevelopmentAreasLabel()} <span className="text-[#961319]">*</span>
                    </label>
                    <div className="relative">
                       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-3 pointer-events-none">
                        <Brain className="h-4 w-4 text-neutral-500" />
                      </div>
                      <textarea
                        id="developmentAreas"
                        name="developmentAreas"
                        rows={3}
                        required
                        value={developmentAreas}
                        onChange={(e) => setDevelopmentAreas(e.target.value)}
                        className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                        placeholder={t.developmentAreasPlaceholder}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex w-1/3 justify-center items-center rounded border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none transition-colors"
                    >
                      <ArrowLeft className="mr-1 h-4 w-4" />
                      {t.back}
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!futureGoals || !developmentAreas}
                      className="flex w-2/3 justify-center items-center rounded bg-[#961319] px-4 py-2 text-sm font-medium text-white hover:bg-[#7e1016] focus:outline-none disabled:opacity-60 transition-colors"
                    >
                      {t.continue}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

{step === 4 && ( // Old Step 3, now Step 4: Account Details
  <div className="space-y-4 animate-fade-in-up">
    <h3 className="text-sm font-medium text-neutral-700 pb-1">
      {t.step4Title}
    </h3>
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-neutral-700 mb-1"
      >
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
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
          placeholder={t.emailPlaceholder}
        />
      </div>
    </div>
    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-neutral-700 mb-1"
      >
        {t.passwordLabel}{" "}
        <span className="text-[#961319]">*</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Lock className="h-4 w-4 text-neutral-500" />
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
          placeholder={t.passwordPlaceholder}
        />
      </div>
    </div>

    {/* Şartlar ve Koşullar Kısmı */}
<div className="mt-4 mb-4 animate-fade-in-up">
  <div className="flex items-start mb-4">
    <div className="flex items-center h-5 mt-1">
      <input
        id="terms"
        name="terms"
        type="checkbox"
        required
        checked={termsAccepted}
        onChange={(e) => setTermsAccepted(e.target.checked)}
        className="w-4 h-4 border border-neutral-300 rounded bg-neutral-50 focus:ring-[#961319] focus:border-[#961319] dark:bg-neutral-700 dark:border-neutral-600"
      />
    </div>
    <div className="ml-3 text-sm">
      <label htmlFor="terms" className="font-light text-neutral-600">
        {locale === "tr" 
          ? "Bu web sitesinin, talebime yanıt verebilmesi için gönderdiğim bilgileri saklamasına izin veriyorum." 
          : "I allow this website to store the information I've submitted to respond to my request."}
      </label>
    </div>
  </div>
  
  <div className="flex items-start">
    <div className="flex items-center h-5 mt-1">
      <input
        id="privacy"
        name="privacy"
        type="checkbox"
        required
        checked={privacyAccepted}
        onChange={(e) => setPrivacyAccepted(e.target.checked)}
        className="w-4 h-4 border border-neutral-300 rounded bg-neutral-50 focus:ring-[#961319] focus:border-[#961319] dark:bg-neutral-700 dark:border-neutral-600"
      />
    </div>
    <div className="ml-3 text-sm">
      <label htmlFor="privacy" className="font-light text-neutral-600">
        {locale === "tr" 
          ? "Şartlar ve Koşulları ve Gizlilik Politikasını okudum ve kabul ediyorum." 
          : "I have read and agree to the Terms and Conditions and Privacy Policy."}
      </label>
      <p className="mt-1 text-xs text-neutral-500">
        {locale === "tr" 
          ? <span>Şartlar ve Koşullara ve Gizlilik Politikasına <Link href={`/${locale}/terms`} className="text-[#961319] hover:underline">buradan</Link> ulaşabilirsiniz.</span>
          : <span>You can access the Terms and Conditions and Privacy Policy <Link href={`/${locale}/terms`} className="text-[#961319] hover:underline">here</Link>.</span>}
      </p>
    </div>
  </div>
</div>




    <div id="clerk-captcha" className="mt-2" />
    <div className="flex space-x-3">
      <button
        type="button"
        onClick={prevStep}
        className="flex w-1/3 justify-center items-center rounded border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none transition-colors"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        {t.back}
      </button>
      <button
  type="submit"
  disabled={loading || !email || !password || !termsAccepted || !privacyAccepted}
  className="flex w-2/3 justify-center items-center rounded bg-[#961319] px-4 py-2 text-sm font-medium text-white hover:bg-[#7e1016] focus:outline-none disabled:opacity-60 transition-colors"
>
  {loading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {t.loading}
    </>
  ) : (
    t.signUpButton
  )}
</button>
    </div>
  </div>
)}
            </form>

            <div className="mt-6 flex flex-col space-y-2">
              <Link
                href={`/${locale}/member/login`}
                className="text-sm font-medium text-[#961319] hover:text-[#7e1016]"
              >
                {t.loginLink}
              </Link>
              <Link
                href={`/${locale}`}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-800"
              >
                {t.backToHome}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive right section */}
      <div className="relative hidden lg:block lg:w-1/2">
        <div className="absolute inset-0 h-full w-full bg-[#961319]">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
            {/* Dynamic personalized content based on completed steps */}
            {step === 2 && firstName && lastName && (
              <div className="w-full max-w-md mb-6 animate-fade-in-up">
                <div className="rounded-xl bg-white/95 backdrop-blur-sm p-6 text-[#961319] shadow-xl">
                  <h3 className="text-2xl font-bold mb-2">{t.dynamicHello}</h3>
                  <p className="text-sm text-neutral-700">{t.dynamicCommunityWelcome}</p>
                </div>
              </div>
            )}

            {step === 3 && institution && department && userType && (
                (userType === "student" && gradeLevel) || 
                (userType === "academic" && academicTitle) ||
                (userType === "professional")
              ) && (
              <div className="w-full max-w-md mb-6 animate-fade-in-up">
                <div className="rounded-xl bg-white/95 backdrop-blur-sm p-6 text-[#961319] shadow-xl">
                  <h3 className="text-xl font-bold mb-2">{t.dynamicInstitutionWelcome}</h3>
                  <p className="text-sm text-neutral-700">{t.dynamicDepartmentInfo}</p>
                </div>
              </div>
            )}
            
            {step === 4 && futureGoals && developmentAreas && (
               <div className="w-full max-w-md mb-6 animate-fade-in-up">
                <div className="rounded-xl bg-white/95 backdrop-blur-sm p-6 text-[#961319] shadow-xl">
                  <h3 className="text-xl font-bold mb-2">{t.dynamicFuturePlansSet}</h3>
                  <p className="text-sm text-neutral-700">{t.dynamicDevelopmentFocus}</p>
                </div>
              </div>
            )}


            <div className="w-full max-w-md rounded-lg bg-white/10 backdrop-blur-sm p-6 text-white shadow-lg">
              <h3 className="text-lg font-medium mb-3">{t.welcomeTitle}</h3>
              <p className="mb-6 text-sm opacity-90">{t.welcomeDesc}</p>

              <div className="space-y-5">
                {/* Step 1: Personal Info */}
                <div className="flex items-center space-x-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${step >= 1 ? 'bg-white text-[#961319] scale-110' : 'bg-white/20 text-white'}`}>
                    {step > 1 ? '✓' : '1'}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{t.personalInfo}</h4>
                    <p className="text-xs opacity-80">
                      {step > 1 && firstName && lastName
                        ? `${firstName} ${lastName}`
                        : (locale === "tr" ? "Adınız ve soyadınız" : "Your first and last name")}
                    </p>
                  </div>
                </div>

                {/* Step 2: Education & Professional Info */}
                <div className="flex items-center space-x-3">
                   <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${step >= 2 ? 'bg-white text-[#961319] scale-110' : 'bg-white/20 text-white'}`}>
                    {step > 2 ? '✓' : '2'}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{t.educationProfessionalInfo}</h4>
                    <p className="text-xs opacity-80">
                      {step > 2 && institution && department && userType
                        ? `${institution} - ${department} (${userType === 'student' ? gradeLevel : userType === 'academic' ? academicTitle : t.professionalOption})`
                        : (locale === "tr" ? "Eğitim ve mesleki bilgileriniz" : "Your education & professional info")}
                    </p>
                  </div>
                </div>
                
                {/* Step 3: Future Plans */}
                <div className="flex items-center space-x-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${step >= 3 ? 'bg-white text-[#961319] scale-110' : 'bg-white/20 text-white'}`}>
                    {step > 3 ? '✓' : '3'}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{t.futurePlansInfo}</h4>
                     <p className="text-xs opacity-80">
                      {step > 3 && futureGoals 
                        ? (locale === "tr" ? "Hedefleriniz kaydedildi" : "Your goals are set")
                        : (locale === "tr" ? "Gelecek planlarınız ve hedefleriniz" : "Your future plans and goals")}
                    </p>
                  </div>
                </div>

                {/* Step 4: Account Info */}
                <div className="flex items-center space-x-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${step >= 4 ? 'bg-white text-[#961319] scale-110' : 'bg-white/20 text-white'}`}>
                    <span className="text-xs font-medium">{step > 4 ? '✓' : '4'}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{t.accountInfo}</h4>
                    <p className="text-xs opacity-80">
                      {step === 4 && email
                        ? email
                        : (locale === "tr" ? "E-posta ve şifre bilgileriniz" : "Your email and password")}
                    </p>
                  </div>
                </div>
              </div>

              {step === 4 && (
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-white/90">
                      {locale === "tr" ? "Üyelik avantajlarınız:" : "Your membership benefits:"}
                    </h4>
                    <ul className="space-y-2 text-xs opacity-80">
                      <li className="flex items-center">
                        <span className="mr-2">✓</span>
                        {locale === "tr" ? "Özel BYM etkinliklerine erişim" : "Access to exclusive BYM events"}
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span>
                        {locale === "tr" ? "Mentorluk ve network fırsatları" : "Mentorship and networking opportunities"}
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span>
                        {locale === "tr" ? "Eğitim materyalleri ve sertifikalar" : "Educational materials and certificates"}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
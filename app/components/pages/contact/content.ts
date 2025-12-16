// app/components/pages/contact/content.ts

export interface ContactContent {
  title: string;
  description: string;
  officeTitle: string;
  address: string;
  contactInfoTitle: string;
  phoneTitle: string;
  phoneNumber: string;
  emailTitle: string;
  emailAddress: string;
  formTitle: string;
  nameLabel: string;
  namePlaceholder: string;
  surnameLabel: string;
  surnamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitButton: string;
  successMessage: string;
  errorMessage: string;
  requiredFieldError: string;
  invalidEmailError: string;
  invalidPhoneError: string;
  spamProtectionText: string;
  communityTitle: string;
  communityText: string;
  socialMediaTitle: string;
  followUs: string;
  socialLinks: {
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}

const content = {
tr: {
  title: "İletişim",
  description: "Biyomühendislik projeleri, akademik işbirlikleri ve topluluk faaliyetlerimiz hakkında bilgi almak için bizimle iletişime geçebilirsiniz.",
  officeTitle: "Merkez Ofisimiz",
  address: "Gebze Teknik Üniversitesi, Biyomühendislik Bölümü, Gebze/Kocaeli, Türkiye",
  contactInfoTitle: "İletişim Bilgileri",
  phoneTitle: "Telefon",
  phoneNumber: "+90 (541) 944 46 34",
  emailTitle: "E-posta",
  emailAddress: "info@unidc.org",
  formTitle: "İletişim Formu",
  nameLabel: "Adınız",
  namePlaceholder: "Adınızı giriniz",
  surnameLabel: "Soyadınız",
  surnamePlaceholder: "Soyadınızı giriniz",
  emailLabel: "E-posta Adresiniz",
  emailPlaceholder: "E-posta adresinizi giriniz",
  phoneLabel: "Telefon Numaranız",
  phonePlaceholder: "Telefon numaranızı giriniz",
  messageLabel: "Mesajınız",
  messagePlaceholder: "Mesajınızı buraya yazınız...",
  submitButton: "Gönder",
  successMessage: "Mesajınız başarıyla gönderildi. Topluluk ekibimiz en kısa sürede sizinle iletişime geçecektir.",
  errorMessage: "Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.",
  requiredFieldError: "Bu alan zorunludur",
  invalidEmailError: "Geçerli bir e-posta adresi giriniz",
  invalidPhoneError: "Geçerli bir telefon numarası giriniz",
  spamProtectionText: "Bu formda spam koruması bulunmaktadır. Lütfen gerçek bilgilerinizi giriniz.",
  communityTitle: "BYM Türkiye Hakkında",
  communityText: "BYM Türkiye, biyomühendislik ve biyolojik bilimler alanlarında bilgi paylaşımını ve iş birliğini teşvik eden bir öğrenci topluluğudur. Akademik çalışmalar, seminerler ve araştırma projeleri ile gençlerin gelişimine katkıda bulunuyoruz.",
  socialMediaTitle: "Sosyal Medya",
  followUs: "Bizi takip edin",
  socialLinks: {
    twitter: "https://twitter.com/bymturkiye",
    instagram: "https://instagram.com/bymturkiye",
    linkedin: "https://linkedin.com/company/bymturkiye"
  }
},
en: {
  title: "Contact",
  description: "Get in touch with us for bioengineering projects, academic collaborations, and community activities.",
  officeTitle: "Our Headquarters",
  address: "Gebze Technical University, Department of Bioengineering, Gebze/Kocaeli, Turkey",
  contactInfoTitle: "Contact Information",
  phoneTitle: "Phone",
  phoneNumber: "+90 (541) 944 46 34",
  emailTitle: "Email",
  emailAddress: "info@unidc.org",
  formTitle: "Contact Form",
  nameLabel: "First Name",
  namePlaceholder: "Enter your first name",
  surnameLabel: "Last Name",
  surnamePlaceholder: "Enter your last name",
  emailLabel: "Email Address",
  emailPlaceholder: "Enter your email address",
  phoneLabel: "Phone Number",
  phonePlaceholder: "Enter your phone number",
  messageLabel: "Message",
  messagePlaceholder: "Write your message here...",
  submitButton: "Submit",
  successMessage: "Your message has been sent successfully. Our community team will contact you as soon as possible.",
  errorMessage: "An error occurred while sending your message. Please try again later.",
  requiredFieldError: "This field is required",
  invalidEmailError: "Please enter a valid email address",
  invalidPhoneError: "Please enter a valid phone number",
  spamProtectionText: "This form has spam protection. Please enter your real information.",
  communityTitle: "About Bioengineering Community",
  communityText: "Bioengineering Community is a student organization that promotes knowledge sharing and collaboration in bioengineering and biological sciences. We contribute to the development of young people through academic studies, seminars, and research projects.",
  socialMediaTitle: "Social Media",
  followUs: "Follow us",
  socialLinks: {
    twitter: "https://twitter.com/bioenglobal",
    instagram: "https://instagram.com/bioenglobal",
    linkedin: "https://linkedin.com/company/bioenglobal"
  }
}
};

export default content;
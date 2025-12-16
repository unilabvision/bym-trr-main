'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Shield, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface ContactFormProps {
  locale: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  honeypot: string;
  timestamp: number;
  browser: string;
  operatingSystem: string;
  deviceType: string;
  hcaptchaToken: string | null;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  hcaptcha?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ locale }) => {
  const content = {
    tr: {
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
      successMessage: "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.",
      errorMessage: "Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.",
      requiredFieldError: "Bu alan zorunludur",
      invalidEmailError: "Geçerli bir e-posta adresi giriniz",
      invalidPhoneError: "Geçerli bir telefon numarası giriniz",
      spamProtectionText: "Bu formda spam koruması bulunmaktadır. Lütfen gerçek bilgilerinizi giriniz.",
      hcaptchaError: "Lütfen doğrulama işlemini tamamlayınız.",
    },
    en: {
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
      successMessage: "Your message has been sent successfully. We will get back to you as soon as possible.",
      errorMessage: "An error occurred while sending your message. Please try again later.",
      requiredFieldError: "This field is required",
      invalidEmailError: "Please enter a valid email address",
      invalidPhoneError: "Please enter a valid phone number",
      spamProtectionText: "This form has spam protection. Please enter your real information.",
      hcaptchaError: "Please complete the verification.",
    },
  };

  const t = locale in content ? content[locale as keyof typeof content] : content.tr;

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '',
    timestamp: Date.now(),
    browser: '',
    operatingSystem: '',
    deviceType: '',
    hcaptchaToken: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hcaptchaKey, setHcaptchaKey] = useState<number>(0); // Added for hCaptcha reset
  const formRef = useRef<HTMLFormElement>(null);
  const hcaptchaRef = useRef<HCaptcha>(null);

  useEffect(() => {
    const detectBrowser = () => {
      const userAgent = navigator.userAgent;
      let browserName = "Unknown";
      let browserVersion = "";

      if (userAgent.indexOf("Firefox") > -1) {
        browserName = "Firefox";
        browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || "";
      } else if (userAgent.indexOf("SamsungBrowser") > -1) {
        browserName = "Samsung Browser";
        browserVersion = userAgent.match(/SamsungBrowser\/([0-9.]+)/)?.[1] || "";
      } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
        browserName = "Opera";
        browserVersion = userAgent.match(/(?:Opera|OPR)\/([0-9.]+)/)?.[1] || "";
      } else if (userAgent.indexOf("Trident") > -1) {
        browserName = "Internet Explorer";
        browserVersion = userAgent.match(/rv:([0-9.]+)/)?.[1] || "";
      } else if (userAgent.indexOf("Edge") > -1) {
        browserName = "Edge (Legacy)";
        browserVersion = userAgent.match(/Edge\/([0-9.]+)/)?.[1] || "";
      } else if (userAgent.indexOf("Edg") > -1) {
        browserName = "Edge Chromium";
        browserVersion = userAgent.match(/Edg\/([0-9.]+)/)?.[1] || "";
      } else if (userAgent.indexOf("Chrome") > -1) {
        browserName = "Chrome";
        browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || "";
      } else if (userAgent.indexOf("Safari") > -1) {
        browserName = "Safari";
        browserVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || "";
      }

      return `${browserName} ${browserVersion}`.trim();
    };

    const detectOS = () => {
      const userAgent = navigator.userAgent;
      let osName = "Unknown";

      if (userAgent.indexOf("Win") > -1) {
        osName = "Windows";
        if (userAgent.indexOf("Windows NT 10.0") > -1) osName = "Windows 10";
        else if (userAgent.indexOf("Windows NT 6.3") > -1) osName = "Windows 8.1";
        else if (userAgent.indexOf("Windows NT 6.2") > -1) osName = "Windows 8";
        else if (userAgent.indexOf("Windows NT 6.1") > -1) osName = "Windows 7";
      } else if (userAgent.indexOf("Mac") > -1) {
        osName = "MacOS";
      } else if (userAgent.indexOf("Android") > -1) {
        osName = "Android";
      } else if (userAgent.indexOf("like Mac") > -1) {
        osName = "iOS";
      } else if (userAgent.indexOf("Linux") > -1) {
        osName = "Linux";
      } else if (userAgent.indexOf("X11") > -1) {
        osName = "UNIX";
      }

      return osName;
    };

    const detectDeviceType = () => {
      const userAgent = navigator.userAgent;

      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
        return "Tablet";
      } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
        return "Mobile";
      }
      return "Desktop";
    };

    setFormData(prev => ({
      ...prev,
      browser: detectBrowser(),
      operatingSystem: detectOS(),
      deviceType: detectDeviceType(),
    }));
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t.requiredFieldError;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t.requiredFieldError;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.requiredFieldError;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmailError;
    }

    if (formData.phone.trim() && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = t.invalidPhoneError;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.requiredFieldError;
    }

    if (!formData.hcaptchaToken) {
      newErrors.hcaptcha = t.hcaptchaError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleHcaptchaVerify = (token: string) => {
    setFormData(prev => ({ ...prev, hcaptchaToken: token }));
    setErrors(prev => ({ ...prev, hcaptcha: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const timeSinceFormLoaded = Date.now() - formData.timestamp;
    if (formData.honeypot || timeSinceFormLoaded < 3000) {
      console.log('Spam detected.');
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
      }, 1500);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('Form submission started. Data:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message.substring(0, 20) + '...',
        locale,
        browser: formData.browser,
        operatingSystem: formData.operatingSystem,
        deviceType: formData.deviceType,
        hcaptchaToken: formData.hcaptchaToken ? 'present' : 'missing',
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          locale,
          browser: formData.browser,
          operatingSystem: formData.operatingSystem,
          deviceType: formData.deviceType,
          hcaptchaToken: formData.hcaptchaToken,
        }),
      });

      const result = await response.json();
      console.log('API response:', { status: response.status, result });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
          honeypot: '',
          timestamp: Date.now(),
          browser: formData.browser,
          operatingSystem: formData.operatingSystem,
          deviceType: formData.deviceType,
          hcaptchaToken: null,
        });
        if (formRef.current) {
          formRef.current.reset();
        }
        setHcaptchaKey(prev => prev + 1); // Reset hCaptcha by changing key
      } else {
        console.error('API returned an error:', result);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-sm p-8">
      {submitStatus === 'success' ? (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-6 rounded-sm flex items-start">
          <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">{t.successMessage}</p>
          </div>
        </div>
      ) : submitStatus === 'error' ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-6 rounded-sm flex items-start">
          <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">{t.errorMessage}</p>
          </div>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="hidden">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {t.nameLabel} *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder={t.namePlaceholder}
                className={`w-full p-3 text-black dark:text-white bg-neutral-50 dark:bg-neutral-900 border ${
                  errors.firstName
                    ? 'border-red-300 dark:border-red-500'
                    : 'border-neutral-300 dark:border-neutral-700'
                } rounded-sm outline-none focus:ring-2 focus:ring-[#a90013] dark:focus:ring-[#ffdee2]`}
                required
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {t.surnameLabel} *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder={t.surnamePlaceholder}
                className={`w-full p-3 text-black dark:text-white bg-neutral-50 dark:bg-neutral-900 border ${
                  errors.lastName
                    ? 'border-red-300 dark:border-red-500'
                    : 'border-neutral-300 dark:border-neutral-700'
                } rounded-sm outline-none focus:ring-2 focus:ring-[#a90013] dark:focus:ring-[#ffdee2]`}
                required
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {t.emailLabel} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t.emailPlaceholder}
                className={`w-full text-black dark:text-white p-3 bg-neutral-50 dark:bg-neutral-900 border ${
                  errors.email
                    ? 'border-red-300 dark:border-red-500'
                    : 'border-neutral-300 dark:border-neutral-700'
                } rounded-sm outline-none focus:ring-2 focus:ring-[#a90013] dark:focus:ring-[#ffdee2]`}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {t.phoneLabel}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={t.phonePlaceholder}
                className={`w-full p-3 text-black dark:text-white bg-neutral-50 dark:bg-neutral-900 border ${
                  errors.phone
                    ? 'border-red-300 dark:border-red-500'
                    : 'border-neutral-300 dark:border-neutral-700'
                } rounded-sm outline-none focus:ring-2 focus:ring-[#a90013] dark:focus:ring-[#ffdee2]`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {t.messageLabel} *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={t.messagePlaceholder}
              rows={6}
              className={`w-full p-3 text-black dark:text-white bg-neutral-50 dark:bg-neutral-900 border ${
                errors.message
                  ? 'border-red-300 dark:border-red-500'
                  : 'border-neutral-300 dark:border-neutral-700'
              } rounded-sm outline-none focus:ring-2 focus:ring-[#a90013] dark:focus:ring-[#ffdee2]`}
              required
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
            )}
          </div>

          <div>
            <HCaptcha
              key={hcaptchaKey}
              ref={hcaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || 'your-hcaptcha-site-key'}
              onVerify={handleHcaptchaVerify}
            />
            {errors.hcaptcha && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.hcaptcha}</p>
            )}
          </div>

          <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center">
            <Shield className="w-4 h-4 mr-2 flex-shrink-0" />
            {t.spamProtectionText}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#a90013] hover:bg-[#8a0010] dark:bg-[#a90013] dark:hover:bg-[#8a0010] text-white py-3 px-8 rounded-sm text-md font-medium transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  {locale === 'tr' ? 'Gönderiliyor...' : 'Sending...'}
                </>
              ) : (
                t.submitButton
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
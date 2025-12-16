// app/[locale]/member/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignIn, useAuth } from "@clerk/nextjs"; // Added useAuth import
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AlertCircle, Loader2, Mail, Lock } from "lucide-react";

interface LoginPageProps {
  params: Promise<{
    locale: string;
  }>;
}

interface ClerkAPIError {
  status: number;
  message?: string;
  code?: string;
  errors?: Array<{
    code: string;
    message: string;
    longMessage?: string;
    meta?: Record<string, unknown>;
  }>;
}

export default function LoginPage({ params }: LoginPageProps) {
  const [mounted, setMounted] = useState(false);
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;

  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn } = useAuth(); // Added to check if user is already signed in
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Add this effect to redirect logged-in users to the member panel
  useEffect(() => {
    if (mounted && isLoaded && isSignedIn) {
      router.push(`/${locale}/member`);
    }
  }, [mounted, isLoaded, isSignedIn, router, locale]);

  const t = {
    title: locale === "tr" ? "Üye Girişi" : "Member Login",
    subtitle: locale === "tr"
      ? "BYM Türkiye hesabınıza giriş yapın"
      : "Sign in to your BYM Türkiye account",
    emailLabel: locale === "tr" ? "E-posta Adresi" : "Email Address",
    emailPlaceholder: locale === "tr" ? "E-posta adresinizi girin" : "Enter your email address",
    passwordLabel: locale === "tr" ? "Şifre" : "Password",
    passwordPlaceholder: locale === "tr" ? "Şifrenizi girin" : "Enter your password",
    loginButton: locale === "tr" ? "Giriş Yap" : "Sign In",
    signupLink: locale === "tr" ? "Hesabınız yok mu? Kayıt Olun" : "Don't have an account? Sign Up",
    loading: locale === "tr" ? "Giriş yapılıyor..." : "Signing in...",
    backToHome: locale === "tr" ? "Ana Sayfaya Dön" : "Back to Home",
    forgotPassword: locale === "tr" ? "Şifremi Unuttum" : "Forgot Password",
    rememberMe: locale === "tr" ? "Beni Hatırla" : "Remember Me",
    welcomeBack: locale === "tr" ? "Tekrar Hoş Geldiniz!" : "Welcome Back!",
    loginBenefits: locale === "tr" 
      ? "Giriş yaparak BYM Türkiye'nin özel içeriklerine ve etkinliklerine erişebilirsiniz."
      : "Sign in to access exclusive BYM Türkiye content and events.",
    memberBenefits: locale === "tr" ? "Üyelik Avantajları" : "Member Benefits",
    benefit1: locale === "tr" ? "Özel etkinliklere erişim" : "Access to exclusive events",
    benefit2: locale === "tr" ? "Eğitim materyalleri" : "Educational materials",
    benefit3: locale === "tr" ? "Network fırsatları" : "Networking opportunities"
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || !signIn) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await signIn.create({
        identifier: email.trim(),
        password: password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push(`/${locale}/member`);
      } else {
        setError(locale === "tr"
          ? "Giriş tamamlanamadı. Lütfen tekrar deneyin."
          : "Sign-in could not be completed. Please try again."
        );
      }
    } catch (err: unknown) {
      const clerkError = err as ClerkAPIError;
      let errorMessage = locale === "tr"
        ? "Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin."
        : "An error occurred during sign-in. Please try again.";

      if (clerkError.errors && clerkError.errors.length > 0) {
        const firstError = clerkError.errors[0];
        
        switch (firstError.code) {
          case "form_identifier_not_found":
            errorMessage = locale === "tr"
              ? "Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı."
              : "No account found with this email address.";
            break;
          case "form_password_incorrect":
            errorMessage = locale === "tr"
              ? "Hatalı şifre. Lütfen tekrar deneyin."
              : "Incorrect password. Please try again.";
            break;
          default:
            errorMessage = firstError.message || errorMessage;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // If not mounted or user is already signed in, show nothing
  if (!mounted || (isLoaded && isSignedIn)) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#fff7f8]">
      {/* Rest of the component remains the same */}
      <div className="flex flex-1 flex-col justify-center py-8 px-6 sm:px-6 lg:px-12">
        {/* Component content as before */}
        {/* ... */}
        
        {/* Your existing component JSX */}
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

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                  {t.emailLabel}
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
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                  {t.passwordLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-4 w-4 text-neutral-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded border border-neutral-200 bg-white pl-10 pr-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                    placeholder={t.passwordPlaceholder}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-300 text-[#961319] focus:ring-[#961319]"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-sm text-neutral-700">
                    {t.rememberMe}
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href={`/${locale}/member/forgot-password`}
                    className="font-medium text-[#961319] hover:text-[#7e1016]"
                  >
                    {t.forgotPassword}
                  </Link>
                </div>
              </div>

              <div id="clerk-captcha" className="mt-2" />

              <div>
                <button
                  type="submit"
                  disabled={loading || !email || !password}
                  className="flex w-full justify-center rounded bg-[#961319] px-4 py-2 text-sm font-medium text-white hover:bg-[#7e1016] focus:outline-none disabled:opacity-60 transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t.loading}
                    </>
                  ) : (
                    t.loginButton
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 flex flex-col space-y-2">
              <Link
                href={`/${locale}/member/signup`}
                className="text-sm font-medium text-[#961319] hover:text-[#7e1016]"
              >
                {t.signupLink}
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
            <div className="w-full max-w-md rounded-lg bg-white/10 backdrop-blur-sm p-6 text-white shadow-lg">
              <h3 className="text-2xl font-medium mb-3">{t.welcomeBack}</h3>
              <p className="mb-6 text-sm opacity-90">{t.loginBenefits}</p>
              
              <div className="space-y-5">
                <h4 className="font-medium text-sm text-white/90">{t.memberBenefits}</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <span className="text-xs">✓</span>
                    </div>
                    <span className="text-sm opacity-90">{t.benefit1}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <span className="text-xs">✓</span>
                    </div>
                    <span className="text-sm opacity-90">{t.benefit2}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <span className="text-xs">✓</span>
                    </div>
                    <span className="text-sm opacity-90">{t.benefit3}</span>
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
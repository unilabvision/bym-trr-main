"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignIn, useAuth } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AlertCircle, Loader2, Mail, ArrowLeft, Check, Info } from "lucide-react";

interface ForgotPasswordPageProps {
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

export default function ForgotPasswordPage({ params }: ForgotPasswordPageProps) {
  const [mounted, setMounted] = useState(false);
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || "en"; // Fallback to English if locale is invalid

  const { isLoaded, signIn } = useSignIn();
  const { isSignedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const router = useRouter();

  // Redirect if user is already signed in
  useEffect(() => {
    if (mounted && isSignedIn) {
      router.push(`/${locale}/`);
    }
  }, [isSignedIn, mounted, router, locale]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = {
    title: locale === "tr" ? "Şifre Sıfırlama" : "Reset Password",
    subtitle: locale === "tr"
      ? "Şifrenizi sıfırlamak için e-posta adresinizi girin"
      : "Enter your email address to reset your password",
    emailLabel: locale === "tr" ? "E-posta Adresi" : "Email Address",
    emailPlaceholder: locale === "tr" ? "E-posta adresinizi girin" : "Enter your email address",
    resetButton: locale === "tr" ? "Sıfırlama Kodu Gönder" : "Send Reset Code",
    loading: locale === "tr" ? "Gönderiliyor..." : "Sending...",
    backToLogin: locale === "tr" ? "Giriş Sayfasına Dön" : "Back to Login",
    backToHome: locale === "tr" ? "Ana Sayfaya Dön" : "Back to Home",
    successTitle: locale === "tr" ? "Şifre Değiştirildi!" : "Password Changed!",
    successMessage: locale === "tr"
      ? "Şifreniz başarıyla değiştirildi. Artık yeni şifrenizle giriş yapabilirsiniz."
      : "Your password has been successfully changed. You can now log in with your new password.",
    verifyTitle: locale === "tr" ? "Kodunuzu Doğrulayın" : "Verify Your Code",
    verifySubtitle: locale === "tr"
      ? "E-postanıza gönderilen kodu girin ve yeni şifrenizi oluşturun"
      : "Enter the code sent to your email and create your new password",
    codeLabel: locale === "tr" ? "Sıfırlama Kodu" : "Reset Code",
    codePlaceholder: locale === "tr" ? "6 haneli kodu girin" : "Enter 6-digit code",
    passwordLabel: locale === "tr" ? "Yeni Şifre" : "New Password",
    passwordPlaceholder: locale === "tr" ? "Yeni şifrenizi girin" : "Enter your new password",
    confirmPasswordLabel: locale === "tr" ? "Şifreyi Onayla" : "Confirm Password",
    confirmPasswordPlaceholder: locale === "tr" ? "Şifrenizi tekrar girin" : "Re-enter your password",
    resetButtonFinal: locale === "tr" ? "Şifremi Sıfırla" : "Reset My Password",
    codeSent: locale === "tr"
      ? "Şifre sıfırlama kodu e-posta adresinize gönderildi."
      : "Password reset code has been sent to your email address.",
    loginButton: locale === "tr" ? "Giriş Yap" : "Log In",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || !signIn) {
      setError(locale === "tr" ? "Sistem hazır değil, lütfen tekrar deneyin." : "System not ready, please try again.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await signIn.create({
        identifier: email.trim(),
      });

      const resetPasswordFactor = result.supportedFirstFactors?.find(
        (factor) => factor.strategy === "reset_password_email_code"
      );

      if (!resetPasswordFactor || !resetPasswordFactor.emailAddressId) {
        throw new Error("Reset password via email is not available for this account");
      }

      await signIn.prepareFirstFactor({
        strategy: "reset_password_email_code",
        emailAddressId: resetPasswordFactor.emailAddressId,
      });

      setCodeSent(true);
    } catch (err: unknown) {
      const clerkError = err as ClerkAPIError;
      let errorMessage = locale === "tr"
        ? "Şifre sıfırlama işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin."
        : "An error occurred during the password reset process. Please try again.";

      if (clerkError.errors && clerkError.errors.length > 0) {
        const firstError = clerkError.errors[0];
        switch (firstError.code) {
          case "form_identifier_not_found":
            errorMessage = locale === "tr"
              ? "Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı."
              : "No account found with this email address.";
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

  const handleVerifyAndReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || !signIn) {
      setError(locale === "tr" ? "Sistem hazır değil, lütfen tekrar deneyin." : "System not ready, please try again.");
      return;
    }

    if (password !== confirmPassword) {
      setError(locale === "tr" ? "Şifreler eşleşmiyor" : "Passwords don't match");
      return;
    }

    if (password.length < 8) {
      setError(locale === "tr" ? "Şifre en az 8 karakter uzunluğunda olmalıdır" : "Password must be at least 8 characters long");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (result.status === "complete") {
        setSuccess(true);
        setCodeSent(false);
      } else {
        setError(
          locale === "tr"
            ? "Şifre sıfırlama işlemi tamamlanamadı. Lütfen tekrar deneyin."
            : "Password reset process could not be completed. Please try again."
        );
      }
    } catch (err: unknown) {
      const clerkError = err as ClerkAPIError;
      let errorMessage = locale === "tr"
        ? "Şifre sıfırlama sırasında bir hata oluştu. Lütfen tekrar deneyin."
        : "An error occurred during password reset. Please try again.";

      if (clerkError.errors && clerkError.errors.length > 0) {
        const firstError = clerkError.errors[0];
        switch (firstError.code) {
          case "form_code_incorrect":
            errorMessage = locale === "tr" ? "Geçersiz kod. Lütfen kontrol edip tekrar deneyin." : "Invalid code. Please check and try again.";
            break;
          case "form_password_pwned":
            errorMessage = locale === "tr" ? "Bu şifre güvenli değil. Lütfen daha güçlü bir şifre seçin." : "This password is insecure. Please choose a stronger password.";
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

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#fff7f8]">
      <div className="flex flex-1 flex-col justify-center py-8 px-6 sm:px-6 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="text-left">
            <Image src="/tr/bym-turkiye-logo.png" alt="BYM Türkiye" width={110} height={22} className="h-12 w-auto" />

            {!success && !codeSent ? (
              <>
                <h2 className="mt-6 text-xl font-medium text-neutral-800">{t.title}</h2>
                <p className="mt-1 text-sm text-neutral-600">{t.subtitle}</p>
              </>
            ) : codeSent ? (
              <>
                <h2 className="mt-6 text-xl font-medium text-neutral-800">{t.verifyTitle}</h2>
                <p className="mt-1 text-sm text-neutral-600">{t.verifySubtitle}</p>
              </>
            ) : (
              <>
                <h2 className="mt-6 text-xl font-medium text-green-700 flex items-center">
                  <Check className="mr-2 h-5 w-5" />
                  {t.successTitle}
                </h2>
                <p className="mt-1 text-sm text-neutral-600">{t.successMessage}</p>
              </>
            )}
          </div>

          <div className="mt-8">
            {error && (
              <div className="mb-6 flex items-center rounded bg-red-50 p-3 text-sm text-red-800">
                <AlertCircle className="mr-2 h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {!success && !codeSent ? (
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
                      aria-describedby={error ? "email-error" : undefined}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading || !email}
                    className="flex w-full justify-center rounded bg-[#961319] px-4 py-2 text-sm font-medium text-white hover:bg-[#7e1016] focus:outline-none disabled:opacity-60 transition-colors"
                    aria-busy={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.loading}
                      </>
                    ) : (
                      t.resetButton
                    )}
                  </button>
                </div>
              </form>
            ) : codeSent ? (
              <form className="space-y-4" onSubmit={handleVerifyAndReset} noValidate>
                <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 mb-4">
                  <p className="text-sm text-blue-700">{t.codeSent}</p>
                </div>

                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-neutral-700 mb-1">
                    {t.codeLabel}
                  </label>
                  <input
                    id="code"
                    name="code"
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="block w-full rounded border border-neutral-200 bg-white px-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                    placeholder={t.codePlaceholder}
                    maxLength={6}
                    aria-describedby={error ? "code-error" : undefined}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                    {t.passwordLabel}
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded border border-neutral-200 bg-white px-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm"
                    placeholder={t.passwordPlaceholder}
                    aria-describedby={error ? "password-error" : undefined}
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                    {t.confirmPasswordLabel}
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`block w-full rounded border bg-white px-4 py-2 text-neutral-900 focus:border-[#961319] focus:ring-[#961319] text-sm ${
                      confirmPassword && password !== confirmPassword ? "border-red-500" : "border-neutral-200"
                    }`}
                    placeholder={t.confirmPasswordPlaceholder}
                    aria-describedby={error || (confirmPassword && password !== confirmPassword) ? "confirm-password-error" : undefined}
                  />
                  {confirmPassword && password !== confirmPassword && (
                    <p id="confirm-password-error" className="mt-1 text-xs text-red-500">
                      {locale === "tr" ? "Şifreler eşleşmiyor" : "Passwords don't match"}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading || !code || !password || !confirmPassword || password !== confirmPassword || password.length < 8}
                    className="flex w-full justify-center rounded bg-[#961319] px-4 py-2 text-sm font-medium text-white hover:bg-[#7e1016] focus:outline-none disabled:opacity-60 transition-colors"
                    aria-busy={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.loading}
                      </>
                    ) : (
                      t.resetButtonFinal
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-6 space-y-6">
                <div className="rounded-lg bg-green-50 p-5 border border-green-200 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 rounded-full p-1 mr-3">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-base font-medium text-green-800">{t.successTitle}</h3>
                  </div>
                  <p className="text-sm text-green-700 mb-4">{t.successMessage}</p>

                  <div className="flex items-start bg-white/50 p-3 rounded-md border border-green-100">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-xs text-blue-700">
                      {locale === "tr"
                        ? "Şifreniz başarıyla değiştirildi. Güvenliğiniz için oturumunuz kapatıldı. Lütfen yeni şifrenizle giriş yapın."
                        : "Your password has been successfully changed. For your security, you have been logged out. Please log in with your new password."}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => router.push(`/${locale}/member/login`)}
                  className="flex w-full justify-center rounded bg-[#961319] px-4 py-2 text-sm font-medium text-white hover:bg-[#7e1016] focus:outline-none transition-colors"
                >
                  {t.loginButton}
                </button>
              </div>
            )}

            <div className="mt-6 flex flex-col space-y-2">
              <Link
                href={`/${locale}/member/login`}
                className="text-sm font-medium text-[#961319] hover:text-[#7e1016] flex items-center"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                {t.backToLogin}
              </Link>
              <Link href={`/${locale}`} className="text-sm font-medium text-neutral-600 hover:text-neutral-800">
                {t.backToHome}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block lg:w-1/2">
        <div className="absolute inset-0 h-full w-full bg-[#961319]">
          <Image src="/tr/bym-turkiye-hero.webp" alt="BYM Türkiye" fill className="object-cover mix-blend-overlay opacity-20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
            <div className="w-full max-w-md rounded-lg bg-white/10 backdrop-blur-sm p-6 text-white shadow-lg">
              {!success && !codeSent ? (
                <>
                  <h3 className="text-2xl font-medium mb-3">
                    {locale === "tr" ? "Şifrenizi mi Unuttunuz?" : "Forgot Your Password?"}
                  </h3>
                  <p className="mb-6 text-sm opacity-90">
                    {locale === "tr"
                      ? "Endişelenmeyin, hesabınıza tekrar erişmenize yardımcı olacağız."
                      : "Don't worry, we'll help you regain access to your account."}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <span className="text-xs">1</span>
                      </div>
                      <span className="text-sm opacity-90">
                        {locale === "tr" ? "E-posta adresinizi girin" : "Enter your email address"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <span className="text-xs">2</span>
                      </div>
                      <span className="text-sm opacity-90">
                        {locale === "tr" ? "E-postanıza gönderilen şifre sıfırlama kodunu alın" : "Receive the password reset code in your email"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <span className="text-xs">3</span>
                      </div>
                      <span className="text-sm opacity-90">
                        {locale === "tr" ? "Yeni güçlü şifrenizi oluşturun" : "Create your new strong password"}
                      </span>
                    </div>
                  </div>
                </>
              ) : codeSent ? (
                <>
                  <h3 className="text-2xl font-medium mb-3">{locale === "tr" ? "Şifre Sıfırlama Kodu" : "Password Reset Code"}</h3>
                  <p className="mb-6 text-sm opacity-90">
                    {locale === "tr" ? "E-postanıza gönderilen kodu girip yeni şifrenizi oluşturun." : "Enter the code sent to your email and create your new password."}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <span className="text-xs">1</span>
                      </div>
                      <span className="text-sm opacity-90">
                        {locale === "tr" ? "E-postanıza gönderilen 6 haneli kodu girin" : "Enter the 6-digit code sent to your email"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <span className="text-xs">2</span>
                      </div>
                      <span className="text-sm opacity-90">
                        {locale === "tr" ? "Yeni güçlü şifrenizi belirleyin" : "Choose your new strong password"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <span className="text-xs">3</span>
                      </div>
                      <span className="text-sm opacity-90">
                        {locale === "tr" ? "Şifrenizi onaylayın ve sıfırlamayı tamamlayın" : "Confirm your password and complete the reset"}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-medium mb-3">
                    {locale === "tr" ? "Şifreniz Başarıyla Değiştirildi!" : "Password Successfully Changed!"}
                  </h3>
                  <p className="mb-6 text-sm opacity-90">
                    {locale === "tr" ? "Hesabınızın güvenliği sağlandı. Artık yeni şifrenizle giriş yapabilirsiniz." : "Your account is now secure. You can now log in with your new password."}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm opacity-90">
                        {locale === "tr" ? "Yeni şifreniz başarıyla kaydedildi" : "Your new password has been successfully saved"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm opacity-90">
                        {locale === "tr" ? "Tüm oturumlar güvenlik nedeniyle sonlandırıldı" : "All sessions have been terminated for security"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm opacity-90">
                        {locale === "tr" ? "Hesabınıza tekrar giriş yapmaya hazırsınız" : "You're ready to log back into your account"}
                      </span>
                    </div>
                  </div>
                </>
              )}
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm opacity-80">
                  {locale === "tr"
                    ? "Sorun yaşıyorsanız, destek ekibimize başvurun."
                    : "If you encounter any issues, contact our support team."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
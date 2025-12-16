// app/[locale]/member/welcome/page.tsx

"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ArrowRight, Award, LayoutDashboard, Calendar, BookOpen } from "lucide-react";

interface WelcomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Separate component to handle useSearchParams
function WelcomeContent({ locale }: { locale: string }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const showRepresentativeOffer = searchParams.get('representative') === 'offer';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isLoaded && !isSignedIn) {
      router.push(`/${locale}/member/login`);
    }
  }, [mounted, isLoaded, isSignedIn, router, locale]);

  const t = {
    welcomeTitle: locale === "tr" ? "Aramıza Hoş Geldiniz!" : "Welcome Aboard!",
    welcomeMessage: locale === "tr" 
      ? `${user?.firstName || ''}, BYM Türkiye ailesine katıldığınız için teşekkür ederiz.`
      : `${user?.firstName || ''}, thank you for joining the BYM Türkiye family.`,
    whatNext: locale === "tr" ? "Şimdi Ne Yapabilirsiniz?" : "What You Can Do Now",
    goDashboard: locale === "tr" ? "Kontrol Paneline Git" : "Go to Dashboard",
    goDashboardDesc: locale === "tr" 
      ? "Üye panelinize erişin ve BYM Türkiye deneyiminizi yönetin."
      : "Access your member dashboard and manage your BYM Türkiye experience.",
    exploreEvents: locale === "tr" ? "Etkinlikleri Keşfedin" : "Explore Events",
    exploreEventsDesc: locale === "tr" 
      ? "Yaklaşan etkinliklere göz atın ve kaçırmak istemediğiniz fırsatları yakalayın."
      : "Browse upcoming events and catch opportunities you don't want to miss.",
    updateProfile: locale === "tr" ? "Profilinizi Güncelleyin" : "Update Your Profile",
    updateProfileDesc: locale === "tr" 
      ? "Profilinizi tamamlayarak topluluğumuzda daha aktif bir üye olun."
      : "Complete your profile to become a more active member in our community.",
    becomeRepresentative: locale === "tr" ? "Temsilci Olun" : "Become a Representative",
    becomeRepresentativeDesc: locale === "tr" 
      ? "Kurumunuzda/Okulunuzda BYM Türkiye - UNIDC'yi temsil ederek etkinliklere öncülük edin ve topluluğumuzun büyümesine katkıda bulunun."
      : "Represent Bioengineering Community - UNIDC in your organization/school, lead events and contribute to the growth of our community.",
    goToDashboard: locale === "tr" ? "Kontrol Paneline Git" : "Go to Dashboard",
    applyNow: locale === "tr" ? "Hemen Başvur" : "Apply Now",
    memberBenefits: locale === "tr" ? "Üyelik Avantajları" : "Membership Benefits",
    benefit1: locale === "tr" ? "Özel etkinliklere erişim" : "Access to exclusive events",
    benefit2: locale === "tr" ? "Eğitim materyalleri ve kaynaklar" : "Educational materials and resources",
    benefit3: locale === "tr" ? "Network ve iş birliği fırsatları" : "Networking and collaboration opportunities",
    benefit4: locale === "tr" ? "Biyomühendislik alanında güncel bilgiler" : "Up-to-date information in bioengineering",
  };

  if (!mounted || !isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#fff7f8]">
      <div className="flex flex-1 flex-col justify-center py-8 px-6 sm:px-6 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="text-left">
            <Image
              src="/tr/bym-turkiye-logo.png"
              alt="BYM Türkiye"
              width={110}
              height={22}
              className="h-12 w-auto"
            />
            <div className="mt-6 flex items-center">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-3">
                <h2 className="text-xl font-medium text-neutral-800">{t.welcomeTitle}</h2>
                <p className="mt-1 text-sm text-neutral-600">{t.welcomeMessage}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-neutral-700 mb-4">{t.whatNext}</h3>
            
            <div className="space-y-4">
              <Link 
                href={`/${locale}/member`} 
                className="flex items-center p-4 border border-neutral-200 rounded-lg hover:border-[#961319] hover:bg-[#fff0f1] transition-colors"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#ffeaec]">
                  <LayoutDashboard className="h-5 w-5 text-[#961319]" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-neutral-800">{t.goDashboard}</h4>
                  <p className="text-xs text-neutral-500">{t.goDashboardDesc}</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-neutral-400" />
              </Link>
              
              <Link 
                href={`/${locale}/member`} 
                className="flex items-center p-4 border border-neutral-200 rounded-lg hover:border-[#961319] hover:bg-[#fff0f1] transition-colors"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#ffeaec]">
                  <Calendar className="h-5 w-5 text-[#961319]" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-neutral-800">{t.exploreEvents}</h4>
                  <p className="text-xs text-neutral-500">{t.exploreEventsDesc}</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-neutral-400" />
              </Link>
              
            </div>
            
            {showRepresentativeOffer && (
              <div className="mt-8 rounded-lg border border-[#ffd6a5] bg-[#fff8f0] p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffe9c8]">
                      <Award className="h-5 w-5 text-[#e67700]" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-neutral-800">{t.becomeRepresentative}</h4>
                    <p className="mt-1 text-xs text-neutral-600">{t.becomeRepresentativeDesc}</p>
                    <div className="mt-4 flex space-x-3">
                      <Link
                        href={`/${locale}/member/representative/application`}
                        className="inline-flex items-center justify-center rounded-md bg-[#961319] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#7e1016] transition-colors"
                      >
                        {t.applyNow}
                      </Link>
                      <Link
                        href={`/${locale}/member`}
                        className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                      >
                        {t.goToDashboard}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Right section like in login page */}
      <div className="relative hidden lg:block lg:w-1/2">
        <div className="absolute inset-0 h-full w-full bg-[#961319]">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
            <div className="w-full max-w-md rounded-lg bg-white/10 backdrop-blur-sm p-6 text-white shadow-lg">
              <h3 className="text-2xl font-medium mb-3">
                {locale === "tr" ? "BYM Türkiye'ye Hoş Geldiniz" : "Welcome to BYM Türkiye"}
              </h3>
              <p className="mb-6 text-sm opacity-90">
                {locale === "tr" 
                  ? "Biyomühendislik topluluğumuzun bir parçası olarak birçok avantajdan faydalanacaksınız."
                  : "As part of our bioengineering community, you'll benefit from many advantages."}
              </p>
              
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
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <span className="text-xs">✓</span>
                    </div>
                    <span className="text-sm opacity-90">{t.benefit4}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex space-x-3">
                  <BookOpen className="h-5 w-5 text-white/70" />
                  <p className="text-xs text-white/70">
                    {locale === "tr"
                      ? "Üyelik deneyiminizi geliştirmek için kontrol panelinizi ziyaret edin ve profilinizi tamamlayın."
                      : "Visit your dashboard and complete your profile to enhance your membership experience."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WelcomePage({ params }: WelcomePageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WelcomeContent locale={locale} />
    </Suspense>
  );
}
// app/[locale]/representative/RepresentativeButtons.tsx
"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

interface RepresentativeButtonsProps {
  locale: string;
  translations: {
    signupButtonText: string;
    applyButtonText: string;
    loginButtonText: string;
    backButton: string;
  };
}

export default function RepresentativeButtons({ locale, translations }: RepresentativeButtonsProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sayfa yüklenene ve auth durumu kontrol edilene kadar boş div göster
  if (!mounted || !isLoaded) {
    return <div className="flex flex-wrap gap-4 animate-fade-in-delayed-more">
      <div className="h-12 w-48 bg-neutral-200 animate-pulse rounded-md"></div>
      <div className="h-12 w-48 bg-neutral-200 animate-pulse rounded-md"></div>
    </div>;
  }

  return (
    <div className="flex flex-wrap gap-4 animate-fade-in-delayed-more">
      {!isSignedIn ? (
        // Kullanıcı giriş yapmamışsa
        <>
          <Link
            href={`/${locale}/member/signup`}
            className="relative bg-[#a90013] hover:bg-[#8a0010] dark:bg-[#a90013] dark:hover:bg-[#8a0010] text-white py-3 px-8 rounded-md text-md font-medium inline-flex items-center flex-shrink-0 w-fit transform hover:-translate-y-1 transition-all duration-300"
          >
            <span>{translations.signupButtonText}</span>
          </Link>
          
          <Link
            href={`/${locale}/member/login`}
            className="relative bg-transparent border border-[#a90013] hover:bg-[#ffdee2]/10 text-[#a90013] dark:text-[#ffdee2] dark:border-[#ffdee2] py-3 px-8 rounded-md text-md font-medium inline-flex items-center flex-shrink-0 w-fit transform hover:-translate-y-1 transition-all duration-300"
          >
            <span>{translations.loginButtonText}</span>
          </Link>
        </>
      ) : (
        // Kullanıcı giriş yapmışsa
        <Link
          href={`/${locale}/member/representative/application`}
          className="relative bg-[#a90013] hover:bg-[#8a0010] dark:bg-[#a90013] dark:hover:bg-[#8a0010] text-white py-3 px-8 rounded-md text-md font-medium inline-flex items-center flex-shrink-0 w-fit transform hover:-translate-y-1 transition-all duration-300"
        >
          <span>{translations.applyButtonText}</span>
        </Link>
      )}
      
      <Link
        href={`/${locale}/`}
        className="relative bg-transparent border border-[#a90013] hover:bg-[#ffdee2]/10 text-[#a90013] dark:text-[#ffdee2] dark:border-[#ffdee2] py-3 px-8 rounded-md text-md font-medium inline-flex items-center flex-shrink-0 w-fit transform hover:-translate-y-1 transition-all duration-300"
      >
        <span>{translations.backButton}</span>
      </Link>
    </div>
  );
}
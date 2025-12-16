"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getAlternateLanguagePath } from "@/app/lib/routes";
import { useEffect } from "react";

interface LanguageSwitcherProps {
  mobile?: boolean;
}

export default function LanguageSwitcher({ mobile = false }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Yolu parçalara ayır
  const segments = pathname.split('/');
  
  // İlk segment dil kodu (tr veya en)
  const currentLocale = segments.length > 1 ? segments[1] : 'tr';
  
  // Hedef dili belirle
  const targetLocale = currentLocale === 'tr' ? 'en' : 'tr';
  
  // Alternatif dil için yolu hesapla
  const targetPath = getAlternateLanguagePath(pathname, currentLocale, targetLocale);

  // Sayfa yüklendiğinde scroll pozisyonunu kontrol et
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      const scrollY = parseInt(savedScrollPosition);
      // Sayfanın tamamen yüklenmesini bekle
      setTimeout(() => {
        window.scrollTo(0, scrollY);
        sessionStorage.removeItem('scrollPosition');
      }, 100);
    }
  }, []);

  const handleLanguageSwitch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Mevcut scroll pozisyonunu kaydet
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    
    // Yeni sayfaya yönlendir
    router.push(targetPath);
  };

  return (
    <Link
      href={targetPath}
      onClick={handleLanguageSwitch}
      className={`
        text-sm font-medium
        text-neutral-500 dark:text-neutral-400
        hover:text-neutral-900 dark:hover:text-neutral-50
        transition-all duration-300 ease-in-out
        border-b border-transparent hover:border-current
        ${mobile ? 'py-2' : 'mx-1'}
      `}
      aria-label={currentLocale === 'tr' ? "Switch to English" : "Türkçe'ye geç"}
    >
      {currentLocale === 'tr' ? 'EN' : 'TR'}
    </Link>
  );
}
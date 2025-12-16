'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User } from 'lucide-react';
import { useUser, UserButton } from '@clerk/nextjs';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import LanguageSwitcher from '../LanguageSwitcher';

interface HeaderProps {
  primary?: string;
  locale: string;
}

export default function Header({ primary = '#a90013', locale }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle theme detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const isDark =
        savedTheme === 'dark' ||
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setIsDarkMode(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Locale-based content
  const contactText = locale === 'tr' ? 'Üye Ol!' : 'Become a Member!';
  const loginText = locale === 'tr' ? 'Giriş Yap' : 'Log In';
  const panelText = locale === 'tr' ? 'Panelim' : 'My Panel';

  return (
    <header
      className={`fixed top-0 left-0 right-0 backdrop-blur-md z-50 transition-all duration-300
        ${isScrolled ? 'bg-[#fff7f8] dark:bg-neutral-900/95 shadow-sm py-3' : 'bg-[#fff7f8] dark:bg-neutral-900/80 py-5'} 
        border-b border-neutral-200 dark:border-neutral-800`}
      style={{ '--primary': primary } as React.CSSProperties}
    >
      <div className="container mx-auto px-6 sm:px-2 md:px-10 lg:px-12 xl:px-16 2xl:px-20 flex justify-between items-center">
        {/* Logo */}
        <Link href={`/${locale}`} className="transition-all duration-300 flex items-center">
          {isDarkMode ? (
            <Image src="/tr/bym-turkiye-logo-2.png" alt="BYM Türkiye" width={150} height={40} className="h-14 w-auto" />
          ) : (
            <Image src="/tr/bym-turkiye-logo.png" alt="BYM Türkiye" width={150} height={40} className="h-14 w-auto" />
          )}
        </Link>

        {/* Desktop Navigation - pass locale parameter */}
        <DesktopNav locale={locale} />

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-5">
          <SearchBar locale={locale} />
          <LanguageSwitcher />
          <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          {isLoaded ? (
            isSignedIn ? (
              <div className="flex items-center space-x-3">
                <Link
                  href={`/${locale}/member`}
                  className="bg-gray-100 hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-gray-800 dark:text-neutral-200 py-2 px-4 rounded-sm text-sm font-medium flex items-center transition-colors duration-300"
                >
                  <User className="h-4 w-4 mr-2" />
                  <span>{panelText}</span>
                </Link>
                <UserButton
                  afterSignOutUrl={`/${locale}`}
                  appearance={{
                    elements: {
                      userButtonAvatarBox: 'h-10 w-10',
                      userButtonTrigger: 'flex items-center',
                      userButtonPopoverCard: 'bg-white dark:bg-neutral-800 shadow-lg',
                      userButtonPopoverItem: 'text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700',
                      userButtonPopoverFooter: 'border-t border-gray-200 dark:border-neutral-700',
                    },
                  }}
                />
              </div>
            ) : (
              <div className="flex space-x-3">
                <a
                  href={`/${locale}/member/login`}
                  className="bg-gray-100 hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-gray-800 dark:text-neutral-200 py-2.5 px-6 rounded-sm text-sm font-medium flex items-center transition-colors duration-300"
                >
                  <span>{loginText}</span>
                </a>
                <a
                  href={`/${locale}/member/signup`}
                  className="bg-[#a90013] hover:bg-[#8a0010] dark:bg-[#a90013] dark:hover:bg-[#8a0010] text-white py-2.5 px-6 rounded-sm text-sm font-medium flex items-center transition-colors duration-300"
                >
                  <span>{contactText}</span>
                </a>
              </div>
            )
          ) : (
            <div className="h-10 w-10 animate-pulse bg-gray-200 dark:bg-neutral-700 rounded-full" />
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-4">
          <LanguageSwitcher mobile />
          <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <button
            className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-label={locale === 'tr' ? 'Menüyü aç/kapat' : 'Toggle menu'}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - pass locale parameter */}
      {isMobileMenuOpen && <MobileNav toggleMobileMenu={toggleMobileMenu} locale={locale} />}
    </header>
  );
}
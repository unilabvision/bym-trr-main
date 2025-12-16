'use client';

import Link from "next/link";
import MobileSearchBar from './MobileSearchbar';
import { User } from 'lucide-react';
import { useUser, UserButton } from '@clerk/nextjs';

interface MobileNavProps {
  toggleMobileMenu: () => void;
  locale: string;
}

interface MenuItem {
  href: string;
  label: string;
  external?: boolean;
}

export default function MobileNav({ toggleMobileMenu, locale }: MobileNavProps) {
  const { isSignedIn, isLoaded } = useUser();
  
  // Dil bazlı menü içeriği
  const menuItems: Record<string, MenuItem[]> = {
    tr: [
      { href: `/${locale}/`, label: "Ana Sayfa" },
      { href: `/${locale}/hakkimizda`, label: "Hakkımızda" },
      { href: `/${locale}/blog`, label: "Blog" },
      { href: `/${locale}/iletisim`, label: "İletişim" },
    ],
    en: [
      { href: `/${locale}/`, label: "Home" },
      { href: `/${locale}/about`, label: "About Us" },
      { href: `/${locale}/blog`, label: "Blog" },
      { href: `/${locale}/contact`, label: "Contact" },
    ]
  };

  // Locale-based content
  const memberText = locale === 'tr' ? 'Üye Ol!' : 'Become a Member!';
  const signInText = locale === 'tr' ? 'Giriş Yap' : 'Sign In';
  const panelText = locale === 'tr' ? 'Panelim' : 'My Panel';

  // Güvenli bir şekilde menü öğelerini al (desteklenmeyen dil olursa tr'ye geri dön)
  const items = menuItems[locale] || menuItems.tr;

  return (
    <div className="lg:hidden bg-[#fff7f8] min-h-screen dark:bg-neutral-900 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 absolute top-full left-0 right-0 z-40 animate-slideDown shadow-lg">
      <nav className="max-w-6xl mx-auto px-6 py-6 flex flex-col space-y-5">
        {/* Mobile Search Bar - using our new component */}
        <div className="mb-4">
          <MobileSearchBar locale={locale} />
        </div>

        {/* Menu Items */}
        {items.map((item, index) => (
          item.external ? (
            <a
              key={index}
              href={item.href}
              className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
              onClick={toggleMobileMenu}
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={index}
              href={item.href}
              className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              {item.label}
            </Link>
          )
        ))}

        {/* Member Section */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          {isLoaded ? (
            isSignedIn ? (
              <div className="flex flex-col space-y-3">
                <Link
                  href={`/${locale}/member`}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-gray-700 dark:text-gray-200 py-2.5 px-4 rounded-sm font-medium transition-colors duration-300"
                  onClick={toggleMobileMenu}
                >
                  <User className="h-4 w-4" />
                  <span>{panelText}</span>
                </Link>
                <div className="flex items-center space-x-3">
                  <UserButton
                    afterSignOutUrl={`/${locale}`}
                    appearance={{
                      elements: {
                        userButtonAvatarBox: 'h-8 w-8',
                        userButtonTrigger: 'flex items-center',
                        userButtonPopoverCard: 'bg-white dark:bg-neutral-800 shadow-lg',
                        userButtonPopoverItem: 'text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700',
                        userButtonPopoverFooter: 'border-t border-gray-200 dark:border-neutral-700',
                      },
                    }}
                  />
                  <span className="text-base font-medium text-gray-700 dark:text-gray-200">
                    {locale === 'tr' ? 'Profil' : 'Profile'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <a
                  href={`/${locale}/member/signup`}
                  className="inline-block bg-[#a90013] hover:bg-[#8a0010] dark:bg-[#a90013] dark:hover:bg-[#8a0010] text-white py-2.5 px-6 rounded-sm text-sm font-medium text-center transition-colors duration-300"
                  onClick={toggleMobileMenu}
                >
                  {memberText}
                </a>
                <a
                  href={`/${locale}/member/login`}
                  className="inline-block bg-transparent border border-[#a90013] hover:bg-[#a90013] hover:text-white dark:border-[#a90013] dark:hover:bg-[#a90013] dark:hover:text-white text-[#a90013] dark:text-[#a90013] py-2.5 px-6 rounded-sm text-sm font-medium text-center transition-colors duration-300"
                  onClick={toggleMobileMenu}
                >
                  {signInText}
                </a>
              </div>
            )
          ) : (
            <div className="h-10 w-10 animate-pulse bg-gray-200 dark:bg-neutral-700 rounded-full" />
          )}
        </div>
      </nav>
    </div>
  );
}
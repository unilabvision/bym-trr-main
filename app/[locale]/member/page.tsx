"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { 
  LayoutDashboard, 
  User, 
  LogOut, 
  Home,
  Calendar, 
  Bell,
  Menu,
  ChevronRight
} from "lucide-react";
import ThemeToggle from "@/app/components/header/ThemeToggle";

interface MemberPageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Yeniden adlandırılmış EventItem interface
interface EventItem {
  id: string;
  title: string;
  type: 'workshop' | 'seminar' | 'competition' | 'conference';
  date: string;
  time: string;
  location: string;
  registrationUrl?: string;
  deadline?: string;
}

export default function MemberPage({ params }: MemberPageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sample data - replace with actual API calls
  const [upcomingEvents] = useState<EventItem[]>([
    {
      id: '1',
      title: locale === 'tr' ? 'Mehmet Kazgan ile 19 Mayıs Gençlik ve Spor Bayramı Etkinliği - BYM Türkiye' : 'May 19th Youth and Sports Day Event with Mehmet Kazgan - BYM Turkey',
      type: 'seminar',
      date: '2025-05-19',
      time: '20:00',
      location: locale === 'tr' ? 'Zoom (Online)' : 'Zoom (Online)',
      registrationUrl: 'https://forms.gle/yXQC9K7C7qzwoauL9',
      deadline: '2025-05-18'
    }
  ]);

  // Initialize theme
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      const dark = storedTheme === "dark";
      setIsDarkMode(dark);
      document.documentElement.classList.toggle("dark", dark);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(`/${locale}/member/login`);
    }
  }, [isLoaded, isSignedIn, router, locale]);

  const t = {
    welcome: locale === "tr" ? "Merhaba" : "Welcome",
    dashboard: locale === "tr" ? "Kontrol Paneli" : "Dashboard",
    profile: locale === "tr" ? "Profil" : "Profile",
    logout: locale === "tr" ? "Çıkış Yap" : "Logout",
    upcomingEvents: locale === "tr" ? "Yaklaşan Etkinlikler" : "Upcoming Events",
    eventsSubtitle: locale === "tr" ? "Atölye, seminer, yarışma ve daha fazlası" : "Workshops, seminars, competitions and more",
    register: locale === "tr" ? "Kayıt Ol" : "Register",
    deadline: locale === "tr" ? "Son Başvuru" : "Deadline",
    viewAll: locale === "tr" ? "Tümünü Gör" : "View All",
    eventTypes: {
      workshop: locale === "tr" ? "Atölye" : "Workshop",
      seminar: locale === "tr" ? "Seminer" : "Seminar",
      competition: locale === "tr" ? "Yarışma" : "Competition",
      conference: locale === "tr" ? "Konferans" : "Conference"
    },
    // Temsilcilik CTA metinleri
    becomeRepTitle: locale === "tr" ? "Temsilcimiz Olmak İster Misiniz?" : "Would You Like to Be Our Representative?",
    becomeRepDesc: locale === "tr" 
      ? "Üniversitenizde veya kurumunuzda BYM Türkiye - UNIDC'yi temsil edin! Bilim ve teknolojik alanlarda etkinlikler düzenleyin, topluluğunuzu büyütün ve özel avantajlar kazanın." 
      : "Represent Bioengineering Community - UNIDC in your university or organization! Organize events in science and technology, grow your community and earn special benefits.",
    becomeRepButton: locale === "tr" ? "Hemen Başvur" : "Apply Now"
  };

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: t.dashboard, 
      href: `/${locale}/member` 
    },
    { 
      icon: User, 
      label: t.profile, 
      href: `/${locale}/member/profile` 
    },
    { 
      icon: Calendar, 
      label: t.upcomingEvents, 
      href: `/${locale}/member/events` 
    },
  ];

  if (!mounted || !isLoaded || !isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-800 dark:border-neutral-700 dark:border-t-neutral-200" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <aside className="fixed top-0 hidden h-full w-64 border-r border-neutral-100 bg-white transition-all dark:border-neutral-800 dark:bg-neutral-900 lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-neutral-100 px-6 dark:border-neutral-800">
            <Image
              src="/tr/bym-turkiye-logo.png"
              alt="BYM Türkiye"
              width={100}
              height={24}
              className="h-10 w-auto dark:hidden"
            />
            <Image
              src="/tr/bym-turkiye-logo-2.png"
              alt="BYM Türkiye"
              width={100}
              height={24}
              className="hidden h-10 w-auto dark:block"
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Return to Homepage Button */}
          <div className="border-t border-neutral-100 p-4 dark:border-neutral-800">
            <Link
              href={`/${locale}`}
              className="flex w-full items-center justify-center rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
            >
              <Home className="mr-2 h-4 w-4" />
              {locale === 'tr' ? 'Ana Sayfaya Dön' : 'Return to Homepage'}
            </Link>
          </div>

          {/* User Section */}
          <div className="border-t border-neutral-100 p-4 dark:border-neutral-800">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {user?.emailAddresses[0]?.emailAddress}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut(() => router.push(`/${locale}`))}
              className="mt-3 flex w-full items-center justify-center rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
            >
              <LogOut className="mr-2 h-3 w-3" />
              {t.logout}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div 
          className={`absolute inset-0 bg-neutral-900 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'bg-opacity-50' : 'bg-opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className={`absolute left-0 top-0 h-full w-64 bg-white dark:bg-neutral-900 transition-transform duration-300 transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex h-full flex-col">
            {/* Logo and Close Button */}
            <div className="flex h-16 items-center justify-between border-b border-neutral-100 px-6 dark:border-neutral-800">
              <Image
                src="/bym-turkiye-logo-blue.png"
                alt="BYM Türkiye"
                width={100}
                height={24}
                className="h-6 w-auto dark:hidden"
              />
              <Image
                src="/bym-turkiye-logo-white.png"
                alt="BYM Türkiye"
                width={100}
                height={24}
                className="hidden h-6 w-auto dark:block"
              />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <svg className="h-6 w-6 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Return to Homepage Button */}
            <div className="border-t border-neutral-100 p-4 dark:border-neutral-800">
              <Link
                href={`/${locale}`}
                className="flex w-full items-center justify-center rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="mr-2 h-4 w-4" />
                {locale === 'tr' ? 'Ana Sayfaya Dön' : 'Return to Homepage'}
              </Link>
            </div>

            {/* User Section */}
            <div className="border-t border-neutral-100 p-4 dark:border-neutral-800">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {user?.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  signOut(() => router.push(`/${locale}`));
                  setIsMobileMenuOpen(false);
                }}
                className="mt-3 flex w-full items-center justify-center rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
              >
                <LogOut className="mr-2 h-3 w-3" />
                {t.logout}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Top Bar - FIXED HIGHER Z-INDEX */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-neutral-100 bg-white px-4 dark:border-neutral-800 dark:bg-neutral-900 sm:px-8 shadow-sm">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="mr-4 rounded-md p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 sm:text-base">
              {t.welcome}, {user?.firstName}
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="relative rounded-full p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500" />
            </button>
            <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="px-6 py-6 sm:px-6 lg:px-8">
          {/* Temsilcilik Başvurusu Banner - FIXED Z-INDEX TO BE LOWER */}
          <div className="mb-8 rounded-lg border border-[#ffdaa5] bg-gradient-to-r from-[#fffaee] to-[#fff5e0] dark:from-[#3a2d05] dark:to-[#332505] dark:border-[#daa520]/30 p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group z-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#ffdaa5]/20 dark:bg-[#daa520]/10 rounded-full -mt-16 -mr-16 backdrop-blur-lg"></div>
            <div className="flex items-start md:items-center flex-col md:flex-row justify-between relative z-10">
              <div className="mb-4 md:mb-0 md:mr-4">
                <h2 className="text-lg font-semibold text-[#8a4500] dark:text-[#f0d080] mb-1">
                  {t.becomeRepTitle}
                </h2>
                <p className="text-sm text-[#8a5700] dark:text-[#e6d098]">
                  {t.becomeRepDesc}
                </p>
              </div>
              <Link
                href={`/${locale}/member/representative/application`}
                className="inline-flex items-center justify-center rounded-md bg-[#d68c00] hover:bg-[#b27300] dark:bg-[#f0d080] dark:text-[#8a4500] dark:hover:bg-[#e6d098] text-white px-4 py-2 text-sm font-medium transform hover:-translate-y-1 transition-all duration-300 whitespace-nowrap group-hover:shadow-md"
              >
                {t.becomeRepButton}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Upcoming Events Section */}
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  {t.upcomingEvents}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {t.eventsSubtitle}
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-lg border border-[#ffdee2] bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-[#a90013]/50 dark:bg-neutral-900 transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[#ffdee2] text-[#a90013] dark:bg-[#a90013]/50 dark:text-[#ffdee2] shadow-md backdrop-blur-sm">
                      {t.eventTypes[event.type]}
                    </span>
                    <Calendar className="h-4 w-4 text-[#a90013]" />
                  </div>
                  <h3 className="mb-2 pierwsz2 font-medium text-[#a90013] dark:text-[#ffdee2]">
                    {event.title}
                  </h3>
                  <div className="mb-3 space-y-1">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      📅 {new Date(event.date).toLocaleDateString(locale)} • {event.time}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      📍 {event.location}
                    </p>
                    {event.deadline && (
                      <p className="text-sm text-[#a90013] dark:text-[#ffdee2]">
                        ⏰ {t.deadline}: {new Date(event.deadline).toLocaleDateString(locale)}
                      </p>
                    )}
                  </div>
                  <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
                    {locale === 'tr' 
                      ? '19 Mayıs Gençlik ve Spor Bayramı\'nda sağlık teknolojileri alanındaki deneyimlerini ve girişimcilik hikayesini paylaşacak olan Mehmet Kazgan ile bir araya geliyoruz. İlham verici bir buluşma sizleri bekliyor!' 
                      : 'We are coming together with Mehmet Kazgan, who will share his experiences in health technologies and his entrepreneurship story on May 19th Youth and Sports Day. An inspiring meeting awaits you!'}
                  </p>
                  {event.registrationUrl && (
                    <Link
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-md bg-[#a90013] hover:bg-[#8a0010] dark:bg-[#a90013] dark:hover:bg-[#8a0010] text-white px-3 py-2 text-sm font-medium transform hover:-translate-y-1 transition-all duration-300"
                    >
                      {t.register}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
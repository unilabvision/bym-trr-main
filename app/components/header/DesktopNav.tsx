import Link from "next/link";
import { useUser } from "@clerk/nextjs";

interface DesktopNavProps {
  locale: string;
}

export default function DesktopNav({ locale }: DesktopNavProps) {
  const { isSignedIn } = useUser();

  const menuItems = {
    tr: [
      { href: `/${locale}/#`, label: "Ana Sayfa" },
      { href: `/${locale}/hakkimizda`, label: "Hakkımızda" },
      { href: `/${locale}/blog`, label: "Blog" },
      { href: `/${locale}/iletisim`, label: "İletişim" },
    ],
    en: [
      { href: `/${locale}/`, label: "Home" },
      { href: `/${locale}/about`, label: "About Us" },
      { href: `/${locale}/blog`, label: "Blog" },
      { href: `/${locale}/contact`, label: "Contact" },
    ],
  };

  // Add panel link if user is signed in
  if (isSignedIn) {
    menuItems.tr.push({ href: `/${locale}/member`, label: "Panelim" });
    menuItems.en.push({ href: `/${locale}/member`, label: "My Panel" });
  }

  const items = menuItems[locale as keyof typeof menuItems] || menuItems.tr;

  return (
    <nav className="hidden lg:flex items-center space-x-10">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
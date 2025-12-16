import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Instagram, Mail } from 'lucide-react';
import XIcon from './XIcon'; // Import the new XIcon component

interface FooterProps {
  locale: string;
}

const Footer = ({ locale }: FooterProps) => {
  // Dil bazlı içerikler
  const content = {
    tr: {
      description: "BYM Türkiye (Biyomühendislik Türkiye), biyomühendislik ve biyolojik bilimler alanlarında bilgi paylaşımını ve iş birliğini teşvik eden bir öğrenci topluluğudur. UNIDC ve UNILAB Vision'ın dinamik yapısı içinde yer alıyoruz.",
      copyright: `© ${new Date().getFullYear()} BYM Türkiye. Tüm hakları saklıdır.`,
      privacyPolicy: "Gizlilik Politikası",
      termsOfService: "Kullanım Koşulları",
      mainLinks: [
        {
          title: 'BYM Türkiye',
          items: [
            { label: 'Ana Sayfa', href: `/${locale}` },
            { label: 'Hakkımızda', href: `/${locale}/hakkimizda` },
            { label: 'İletişim', href: `/${locale}/iletisim` },
          ],
        },
        {
          title: 'Ne Yapıyoruz?',
          items: [
            { label: 'Bilimsel İçerikler', href: `/${locale}/blog` },
            { label: 'Etkinlikler', href: `/${locale}/soon` },
            { label: 'Projeler', href: `/${locale}/soon` }
          ],
        },
        {
          title: 'Kategoriler',
          items: [
            { label: 'Biyoinformatik', href: `/${locale}/blog#Biyoinformatik`}, 
            { label: 'Biyomalzemeler', href: `/${locale}/blog#Biyomalzemeler` },
            { label: 'Biyoteknoloji', href: `/${locale}/blog#Biyoteknoloji` },
          ],
        },
        {
          title: 'Katılın',
          items: [
            { label: 'Üye Ol', href: `/${locale}/member/signup` },
            { label: 'Etkinlikler', href: `/${locale}/soon` },
            { label: 'Ekibe Başvur!', href: `https://unilabvision.com/tr/kariyer/` },
          ],
        },
      ]
    },
    en: {
      description: "Bioengineering Community is a student community that promotes knowledge sharing and collaboration in the fields of bioengineering and biological sciences. We take part in the dynamic structure of UNIDC and UNILAB Vision.",
      copyright: `© ${new Date().getFullYear()} BYM Turkey. All rights reserved.`,
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      mainLinks: [
        {
          title: 'Bioengineering',
          items: [
            { label: 'Home', href: `/${locale}` },
            { label: 'About Us', href: `/${locale}/about` },
            { label: 'Contact', href: `/${locale}/contact` },
          ],
        },
        {
          title: 'What We Do',
          items: [
            { label: 'Scientific Content', href: `/${locale}/blog` },
            { label: 'Events', href: `/${locale}/soon` },
            { label: 'Projects', href: `/${locale}/soon` },
          ],
        },
        {
          title: 'Our Topics',
          items: [
            { label: 'Bioinformatics', href: `/${locale}/blog#Bioinformatics` },
            { label: 'Biomaterials', href: `/${locale}/blog#Biyomalzemeler` },
            { label: 'Biotechnology', href: `/${locale}/blog#Biotechnology` },
          ],
        },
        {
          title: 'Join Us',
          items: [
            { label: 'Become a Member', href: `/${locale}/member/signup` },
            { label: 'Events', href: `/${locale}/soon` },
            { label: 'Apply to the Team!', href: `https://unilabvision.com/tr/career/` },
          ],
        },
      ]
    }
  };

  // Güvenli bir şekilde içeriği al (desteklenmeyen dil olursa tr'ye geri dön)
  const t = locale in content ? content[locale as keyof typeof content] : content.tr;

  // Sosyal medya linkleri (Twitter yerine X)
  const socialLinks = [
    { icon: Mail, href: 'mailto:info@unidc.org', label: 'Email' },
    { icon: Instagram, href: 'https://instagram.com/bioenglobal', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/in/bioenglobal', label: 'LinkedIn' },
    { icon: XIcon, href: 'https://x.com/bioenglobal', label: 'X' },
  ];

  return (
    <footer className="bg-neutral-900 dark:bg-neutral-950 text-neutral-300 py-16 px-6">
      <div className="container mx-auto sm:px-2 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link href={`/${locale}`} className="block mb-4">
              <Image 
                src="/tr/bym-turkiye-logo-2.png"
                alt={locale === 'tr' ? 'BYM Türkiye' : 'Bioengineering Community'} 
                width={180} 
                height={60} 
                className="h-10 w-auto" 
              />
            </Link>
            <p className="mt-4 text-md leading-relaxed text-neutral-400">
              {t.description}
            </p>
            <div className="mt-6 flex space-x-5">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-[#a90013] dark:hover:text-[#ffdee2] transition-colors duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {t.mainLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-md font-medium text-neutral-100 mb-5">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral-400 hover:text-[#a90013] dark:hover:text-[#ffdee2] transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-neutral-800">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <p className="text-neutral-500 text-sm text-center md:text-left">
                {t.copyright}
              </p>
              <p className="text-xs text-neutral-600 text-center md:text-left">
                {locale === 'tr' 
                  ? 'UNIDC ve UNILAB Vision bünyesinde faaliyet göstermektedir.' 
                  : 'Operating within UNIDC and UNILAB Vision.'}
              </p>
            </div>
            <div className="flex space-x-6 mt-4 lg:mt-0">
              <Link href={`/${locale}/privacy`} className="text-neutral-500 hover:text-[#a90013] dark:hover:text-[#ffdee2] transition-colors duration-200 text-sm">
                {t.privacyPolicy}
              </Link>
              <Link href={`/${locale}/terms`} className="text-neutral-500 hover:text-[#a90013] dark:hover:text-[#ffdee2] transition-colors duration-200 text-sm">
                {t.termsOfService}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
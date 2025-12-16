import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import ConditionalLayout from "../components/ConditionalLayout";
import "../globals.css";
import Script from "next/script";

// Font definitions
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// Generate metadata function
export async function generateMetadata({
  params,
  pathname,
}: {
  params: { locale: string } | Promise<{ locale: string }>;
  pathname?: string; // Pathname'i opsiyonel yap
}): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const locale = resolvedParams.locale || 'tr';
  
  // Path yapısını düzeltme - pathname undefined olabilir
  const pathStr = pathname || '';
  
  // Eğer pathname varsa ve locale içeriyorsa, locale kısmını kaldır
  const cleanPath = pathStr ? pathStr.replace(new RegExp(`^/?${locale}/?`), '') : '';
  
  // Canonical URL ve dil alternatiflerini doğru şekilde oluştur
  const canonicalUrl = `https://biyomuhendislik.net.tr/${locale}${cleanPath ? (cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`) : ''}`;
  
  // Dil alternatiflerini hazırla
  const trPath = `https://biyomuhendislik.net.tr/tr${cleanPath ? (cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`) : ''}`;
  const enPath = `https://biyomuhendislik.net.tr/en${cleanPath ? (cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`) : ''}`;

  return {
    title: locale === 'tr'
      ? "Biyomühendislik Türkiye | Biyomühendislik Topluluğu"
      : "Bioengineering Community | Global Network",
    description: locale === 'tr'
      ? "Biyomühendislik Türkiye, biyomühendislikte yenilikçi projeler ve işbirlikleriyle lider topluluk."
      : "Join the Bioengineering Community for global innovation and collaboration in biotech.",
    keywords: locale === 'tr'
      ? [
          "biyomühendislik",
          "Biyomühendislik Türkiye",
          "biyoteknoloji topluluğu",
          "biyomühendislik projeleri",
          "inovasyon ve işbirliği",
        ]
      : [
          "bioengineering",
          "biotechnology community",
          "bioengineering projects",
          "innovation in biotech",
          "global collaboration",
        ],
    authors: [{ name: "Biyomühendislik Türkiye" }],
    robots: "index, follow",
    // Düzeltilmiş canonical URL ve dil alternatifleri
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'tr': trPath,
        'en': enPath,
      },
    },
    // Open Graph Meta Tags
    openGraph: {
      title: locale === 'tr'
        ? "Biyomühendislik Türkiye | Biyomühendislik Topluluğu"
        : "Bioengineering Community | Global Network",
      description: locale === 'tr'
        ? "Biyomühendislik Türkiye, biyomühendislikte yenilikçi projeler ve işbirlikleriyle lider topluluk."
        : "Join the Bioengineering Community for global innovation and collaboration in biotech.",
      url: canonicalUrl,
      siteName: "Biyomühendislik Türkiye",
      images: [
        {
          url: "https://biyomuhendislik.net.tr/og-image.jpg",
          width: 1200,
          height: 630,
          alt: locale === 'tr' ? "Biyomühendislik Türkiye Topluluk Görseli" : "Bioengineering Community Image",
        },
      ],
      locale: locale === 'tr' ? "tr_TR" : "en_US",
      type: "website",
    },
    // Twitter Card Meta Tags
    twitter: {
      card: "summary_large_image",
      title: locale === 'tr'
        ? "Biyomühendislik Türkiye | Biyomühendislik Topluluğu"
        : "Bioengineering Community | Global Network",
      description: locale === 'tr'
        ? "Biyomühendislik Türkiye, biyomühendislikte yenilikçi projeler ve işbirlikleriyle lider topluluk."
        : "Join the Bioengineering Community for global innovation and collaboration in biotech.",
      images: ["https://biyomuhendislik.net.tr/twitter-image.jpg"],
    },
    // Schema Markup
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Biyomühendislik Türkiye",
        url: canonicalUrl,
        logo: "https://biyomuhendislik.net.tr/logo.png",
        description: locale === 'tr'
          ? "Biyomühendislik Türkiye, biyomühendislikte yenilikçi projeler ve işbirlikleriyle lider topluluk."
          : "Join the Bioengineering Community for global innovation and collaboration in biotech.",
        sameAs: [
          "https://twitter.com/bymturkiye",
          "https://linkedin.com/company/bymturkiye",
        ],
      }),
    },
  };
}

// Viewport export
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Static parameters
export function generateStaticParams() {
  return [
    { locale: 'tr' },
    { locale: 'en' },
  ];
}

// Layout component with corrected type definition
export default async function LocaleLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode; 
  params: { locale: string; }; 
}) {
  const locale = params.locale || 'tr';
  
  return (
    <html lang={locale} dir="ltr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://clerk.com" />
        
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W94586N6');
          `}
        </Script>
        
        {/* Microsoft Clarity Analytics */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "rfuvv2ml2b");
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-[#fff7f8] dark:bg-neutral-900">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-W94586N6"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          ></iframe>
        </noscript>
        
        <ClerkProvider>
          <ConditionalLayout locale={locale}>
            {children}
          </ConditionalLayout>
        </ClerkProvider>
      </body>
    </html>
  );
}
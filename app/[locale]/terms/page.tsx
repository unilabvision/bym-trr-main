import Link from "next/link";

// Define supported locales
const locales = ['tr', 'en'];

// Generate static paths for each locale
export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

// Type definition for params
interface TermsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function TermsPage({ params }: TermsPageProps) {
  // Resolve params with await
  const { locale } = await params;

  // Check valid language, use 'tr' as fallback
  const safeLocale = locales.includes(locale) ? locale : 'tr';

  // Content based on locale
  const content = {
    badge: safeLocale === 'tr' ? 'KULLANIM ŞARTLARI' : 'TERMS OF USE',
    title: safeLocale === 'tr' ? 'Kullanım Şartlarımız' : 'Our Terms of Use',
    description: safeLocale === 'tr'
      ? 'BYM Türkiye olarak, topluluğumuzun hizmetlerini kullanırken uymanız gereken kuralları ve şartları açık bir şekilde sunuyoruz.'
      : 'At BYM Türkiye, we clearly outline the rules and conditions you must follow when using our community’s services.',
    sectionTitle1: safeLocale === 'tr' ? 'Hizmetlerimizin Kapsamı' : 'Scope of Our Services',
    sectionText1: safeLocale === 'tr'
      ? 'BYM Türkiye, üniversite öğrencilerine yönelik etkinlikler, mentorluk programları, projeler ve ağ oluşturma fırsatları sunar. Hizmetlerimizi kullanarak, bu şartları kabul etmiş sayılırsınız. Hizmetlerimiz, yalnızca kayıtlı üyelerimiz için geçerlidir ve ticari amaçlarla kullanılamaz.'
      : 'BYM Türkiye offers events, mentorship programs, projects, and networking opportunities for university students. By using our services, you agree to these terms. Our services are available only to registered members and cannot be used for commercial purposes.',
    sectionTitle2: safeLocale === 'tr' ? 'Kullanıcı Yükümlülükleri' : 'User Responsibilities',
    sectionText2: safeLocale === 'tr'
      ? 'Hizmetlerimizi kullanırken, doğru ve güncel bilgiler sağlamayı taahhüt edersiniz. Topluluğumuzun kurallarına uymalı, diğer üyelerin gizliliğine saygı göstermeli ve yasa dışı veya uygunsuz davranışlarda bulunmamalısınız. Aksi takdirde, hesabınız askıya alınabilir veya sonlandırılabilir.'
      : 'When using our services, you commit to providing accurate and up-to-date information. You must adhere to our community rules, respect the privacy of other members, and refrain from illegal or inappropriate behavior. Failure to comply may result in account suspension or termination.',
    sectionTitle3: safeLocale === 'tr' ? 'Sorumluluk Sınırlandırması' : 'Limitation of Liability',
    sectionText3: safeLocale === 'tr'
      ? 'BYM Türkiye, hizmetlerimizin kesintisiz veya hatasız olacağını garanti etmez. Hizmetlerimizden kaynaklanan herhangi bir dolaylı, özel veya tesadüfi zarardan sorumlu değiliz. Hizmetlerimizi kullanmanız, kendi sorumluluğunuzdadır.'
      : 'BYM Türkiye does not guarantee that our services will be uninterrupted or error-free. We are not liable for any indirect, special, or incidental damages arising from the use of our services. You use our services at your own risk.',
    backButton: safeLocale === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home',
  };

  return (
    <div className="relative flex items-center">
      {/* Main Section */}
      <section className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <div className="max-w-3xl">
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#a90013]/20 rounded-md blur-3xl animate-pulse-slow opacity-50"></div>
            <div className="transform hover:scale-105 transition-transform duration-300 inline-block mb-4">
              <span className="bg-[#ffdee2] text-[#a90013] dark:bg-[#a90013]/50 dark:text-[#ffdee2] px-4 py-1.5 text-xs font-medium tracking-wider inline-block shadow-md backdrop-blur-sm rounded-md">
                {content.badge}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#141414] dark:text-white mt-4 mb-6 leading-tight animate-fade-in">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#141414] to-[#a90013] dark:from-white dark:to-[#ffdee2]">
                {content.title}
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mb-8 animate-fade-in-delayed">
              {content.description}
            </p>
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#141414] dark:text-white mb-4">
                {content.sectionTitle1}
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {content.sectionText1}
              </p>
            </div>
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#141414] dark:text-white mb-4">
                {content.sectionTitle2}
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {content.sectionText2}
              </p>
            </div>
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#141414] dark:text-white mb-4">
                {content.sectionTitle3}
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {content.sectionText3}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 animate-fade-in-delayed-more">
              <Link
                href={`/${safeLocale}/`}
                className="relative bg-[#a90013] hover:bg-[#8a0010] dark:bg-[#a90013] dark:hover:bg-[#8a0010] text-white py-3 px-8 rounded-md text-md font-medium inline-flex items-center flex-shrink-0 w-fit transform hover:-translate-y-1 transition-all duration-300"
              >
                <span>{content.backButton}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
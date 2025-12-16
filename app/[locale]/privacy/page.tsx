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
interface PrivacyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  // Resolve params with await
  const { locale } = await params;

  // Check valid language, use 'tr' as fallback
  const safeLocale = locales.includes(locale) ? locale : 'tr';

  // Content based on locale
  const content = {
    badge: safeLocale === 'tr' ? 'GİZLİLİK POLİTİKASI' : 'PRIVACY POLICY',
    title: safeLocale === 'tr' ? 'Gizlilik Politikamız' : 'Our Privacy Policy',
    description: safeLocale === 'tr'
      ? 'BYM Türkiye olarak, kişisel verilerinizi nasıl topladığımız, kullandığımız, koruduğumuz ve paylaştığımız hakkında şeffaf bir şekilde bilgi sunuyoruz.'
      : 'At BYM Türkiye, we provide transparent information about how we collect, use, protect, and share your personal information.',
    sectionTitle1: safeLocale === 'tr' ? 'Hangi Verileri Topluyoruz?' : 'What Data Do We Collect?',
    sectionText1: safeLocale === 'tr'
      ? 'Topluluğumuza katılan üyelerimizden ad, soyad, e-posta adresi, üniversite bilgisi gibi temel kişisel bilgileri topluyoruz. Ayrıca, etkinliklere katılım, proje başvuruları veya bülten abonelikleri sırasında sağladığınız ek bilgileri kaydedebiliriz. Bu veriler, yalnızca hizmetlerimizi sunmak ve deneyiminizi kişiselleştirmek için kullanılır.'
      : 'We collect basic personal information from our community members, such as name, surname, email address, and university details. Additionally, we may record extra information provided during event participation, project applications, or newsletter subscriptions. This data is used solely to deliver our services and personalize your experience.',
    sectionTitle2: safeLocale === 'tr' ? 'Verileri Nasıl Kullanıyoruz?' : 'How Do We Use Your Data?',
    sectionText2: safeLocale === 'tr'
      ? 'Topladığımız veriler, etkinlik ve seminer duyuruları yapmak, projeleriniz için mentorluk desteği sağlamak, bültenlerimizi göndermek ve topluluğumuzun faaliyetlerini geliştirmek için kullanılır. Verileriniz, sizin izniniz olmadan pazarlama amaçlı üçüncü taraflarla paylaşılmaz. Ayrıca, hizmetlerimizi optimize etmek için anonimleştirilmiş verilerle analizler yapabiliriz.'
      : 'The data we collect is used to announce events and seminars, provide mentorship support for your projects, send newsletters, and improve our community’s activities. Your data is not shared with third parties for marketing purposes without your consent. We may also conduct analyses using anonymized data to optimize our services.',
    sectionTitle3: safeLocale === 'tr' ? 'Veri Güvenliği ve Saklama' : 'Data Security and Retention',
    sectionText3: safeLocale === 'tr'
      ? 'Kişisel verilerinizi korumak için uygun teknik ve organizasyonel önlemleri alıyoruz. Verileriniz, güvenli sunucularda saklanır ve yalnızca yetkili personel tarafından erişilebilir. Verilerinizi, yalnızca hizmetlerimizi sağlamak için gerektiği sürece saklarız ve yasal gereklilikler doğrultusunda sileriz.'
      : 'We take appropriate technical and organizational measures to protect your personal data. Your data is stored on secure servers and accessible only by authorized personnel. We retain your data only for as long as necessary to provide our services and delete it in accordance with legal requirements.',
    sectionText4: safeLocale === 'tr',
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
            <div className="mb-12">
              
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {content.sectionText4}
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
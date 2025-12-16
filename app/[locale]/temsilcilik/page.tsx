// app/[locale]/representative/page.tsx 
import RepresentativeButtons from "./RepresentativeButtons"; // İstemci tarafı komponenti

// Define supported locales
const locales = ['tr', 'en'];

// Generate static paths for each locale
export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

// Type definition for params
interface RepresentativePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function RepresentativePage({ params }: RepresentativePageProps) {
  // Resolve params with await
  const { locale } = await params;

  // Check valid language, use 'tr' as fallback
  const safeLocale = locales.includes(locale) ? locale : 'tr';

  // Content based on locale
  const content = {
    badge: safeLocale === 'tr' ? 'TEMSİLCİLİK PROGRAMI' : 'REPRESENTATIVE PROGRAM',
    title: safeLocale === 'tr' ? 'UNIDC Temsilcilik Programı' : 'UNIDC Representative Program',
    description: safeLocale === 'tr'
      ? 'UNILAB Vision Discovery Club (UNIDC) olarak, üniversite ve kurumlarda topluluğumuzu temsil edecek, etkinliklerimizi organize edecek, kariyerini geliştirmek ve kendini keşfetmek isteyen, BYM Türkiye dahil tüm birimlerimizin çalışmalarında farkındalık yaratacak temsilciler arıyoruz.'
      : 'At UNILAB Vision Discovery Club (UNIDC), we are looking for representatives who will represent our community in universities and institutions, organize our events, develop their careers, discover themselves, and create awareness in all our units including BYM.',
    sectionTitle1: safeLocale === 'tr' ? 'Temsilci Olmanın Avantajları' : 'Benefits of Being a Representative',
    sectionText1: safeLocale === 'tr'
      ? 'UNIDC temsilcisi olarak, kariyerinizi geliştirme ve kendinizi keşfetme fırsatı bulacaksınız. Bilim ve teknoloji alanlarında geniş bir ağa dahil olabilir, potansiyelinizi ortaya çıkarabilir ve profesyonel gelişiminiz için değerli deneyimler kazanabilirsiniz. Temsilcilerimize özel kariyer fırsatları sunuyoruz. BYM Türkiye (Biyomühendislik) dahil tüm birimlerimizin etkinliklerine öncelikli erişim sağlayabilirsiniz.'
      : 'As a UNIDC representative, you will have the opportunity to develop your career and discover yourself. You can become part of a wide network in the fields of science and technology, unlock your potential, and gain valuable experiences for your professional development. We offer special training, mentoring support, and career opportunities to our representatives. You can also have priority access to all our units\' activities including BYM (Bioengineering).',
    sectionTitle2: safeLocale === 'tr' ? 'Temsilcilerin Görevleri' : 'Duties of Representatives',
    sectionText2: safeLocale === 'tr'
      ? 'Temsilcilerimiz, bulundukları kurumda/okulda UNIDC ve bağlı birimlerimizin (BYM Türkiye dahil) etkinliklerini duyurmak, yerel etkinlikler organize etmek, öğrenciler arasında topluluğumuzu tanıtmak ve bilim-teknoloji alanlarındaki gelişmeleri paylaşmakla sorumludur. Ayrıca, merkez ekibimizle düzenli toplantılara katılarak fikir alışverişinde bulunurlar.'
      : 'Our representatives are responsible for announcing UNIDC and affiliated units\' (including BYM) events in their institutions, organizing local events, promoting our community among students, and sharing developments in science and technology fields. Additionally, they participate in regular meetings with our central team for exchanging ideas.',
    sectionTitle3: safeLocale === 'tr' ? 'Temsilci Nasıl Olunur?' : 'How to Become a Representative',
    sectionText3: safeLocale === 'tr'
      ? 'Temsilci olmak için UNIDC\'nin faaliyet gösterdiği bilim ve teknoloji alanlarından birinde (mühendislik, temel bilimler, tıp vb.) öğrenci veya profesyonel olmanız, iletişim becerilerinizin güçlü olması ve topluluğumuza zaman ayırabilmeniz gerekiyor. BYM Türkiye (Biyomühendislik) biriminde aktif olmak isteyenler için bu alanda bilgi sahibi olmak avantaj sağlayacaktır. Başvuru formunu doldurarak temsilcilik sürecini başlatabilirsiniz. Başvurular değerlendirildikten sonra seçilen adaylarla online görüşme yapılacaktır.'
      : 'To become a representative, you need to be a student or professional in one of the science and technology fields that UNIDC operates in (engineering, basic sciences, medicine, etc.), have strong communication skills, and be able to devote time to our community. For those who want to be active in the BYM (Bioengineering) unit, having knowledge in this field will be an advantage. You can start the representation process by filling out the application form. After the applications are evaluated, an online interview will be held with the selected candidates.',

    signupButtonText: safeLocale === 'tr' ? 'Üye Ol' : 'Sign Up',
    applyButtonText: safeLocale === 'tr' ? 'Temsilcilik Başvurusu Yap' : 'Apply for Representative Position',
    loginButtonText: safeLocale === 'tr' ? 'Üyeyseniz Giriş Yapın' : 'Login if You\'re a Member',
    backButton: safeLocale === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home',
  };

  return (
    <div className="relative flex items-center">
      {/* Main Section */}
      <section className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <div className="max-w-4xl">
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

            {/* İstemci tarafında çalışan butonlar komponenti */}
            <RepresentativeButtons 
              locale={safeLocale} 
              translations={{
                signupButtonText: content.signupButtonText,
                applyButtonText: content.applyButtonText,
                loginButtonText: content.loginButtonText,
                backButton: content.backButton
              }} 
            />
          </div>
        </div>
      </section>
    </div>
  );
}
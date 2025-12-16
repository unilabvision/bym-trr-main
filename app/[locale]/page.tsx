// app/[locale]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Zap } from "lucide-react";
import { getBlogPosts, getBlogCategories, getFeaturedBlogPosts } from '@/app/services/blogService';

// Dynamic always active
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Type definition: params should contain a Promise
interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Function to format date in the desired format based on locale
function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  
  if (locale === 'tr') {
    // Turkish date format: 25 Temmuz, 2025
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
  } else {
    // English date format: July 25, 2025
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }
}

export default async function Home({ params }: HomePageProps) {
  // Resolve params with await
  const { locale } = await params;

  // Check valid language, use 'tr' as fallback
  const safeLocale = locale === 'tr' || locale === 'en' ? locale : 'tr';

  // Load blog data in parallel
  const [allPosts, categories, featuredPosts] = await Promise.all([
    getBlogPosts(safeLocale),
    getBlogCategories(safeLocale),
    getFeaturedBlogPosts(safeLocale)
  ]);

  // Format dates for all posts
  const postsWithFormattedDates = allPosts.map(post => ({
    ...post,
    formattedDate: formatDate(post.date, safeLocale)
  }));

  // Format dates for featured posts
  const featuredPostsWithFormattedDates = featuredPosts.map(post => ({
    ...post,
    formattedDate: formatDate(post.date, safeLocale)
  }));

  // If no featured posts, show latest posts
  // If no featured posts, show latest posts, but limit to maximum 3
const postsToDisplay = featuredPostsWithFormattedDates.length > 0 
? featuredPostsWithFormattedDates.slice(0, 3) // Öne çıkan gönderilerden en fazla 3'ünü al
: postsWithFormattedDates.slice(0, 3); // Öne çıkan yoksa, tüm gönderilerden en fazla 3'ünü al

  return (
    <div className="relative">
      {/* Hero Section - Keeping this section unchanged as requested */}
      <section className="relative bg-[#141414] py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full">
            
          </div>
          <div className="absolute right-0 xl:right-20 top-0 h-full w-2/3 opacity-90 z-10 hidden xl:block">
            <div className="absolute h-full w-full">
              <Image
                src="/tr/images/dna-helix.svg"
                alt="DNA Helix"
                fill
                className="object-contain object-right animate-float scale-125"
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-1/2 w-1/2 opacity-20">
            <div className="absolute h-full w-full bg-[url('/images/molecules.svg')] bg-no-repeat bg-contain bg-left animate-pulse"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#141414] via-[#a90013]/20 to-[#141414] opacity-90"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <div className="max-w-3xl relative">
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#a90013]/20 rounded-md blur-3xl animate-pulse-slow opacity-50"></div>
            <div className="transform hover:scale-105 transition-transform duration-300 inline-block mb-2">
              <span className="bg-[#ffdee2] text-[#a90013] dark:bg-[#a90013]/50 dark:text-[#ffdee2] px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-medium tracking-wider inline-block shadow-md backdrop-blur-sm rounded-md">
                {safeLocale === 'tr' ? 'BYM TÜRKİYE' : 'BYM TURKIYE'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mt-3 sm:mt-4 mb-4 sm:mb-6 leading-tight animate-fade-in">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#ffdee2]">
                {safeLocale === 'tr' 
                  ? 'Biyomühendislik Dünyasına Hoş Geldiniz' 
                  : 'Welcome to the World of Bioengineering'}
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl mb-6 sm:mb-8 animate-fade-in-delayed">
              {safeLocale === 'tr' 
                ? 'Biyomühendislik alanındaki en güncel araştırmalar, bilimsel makaleler ve ilgi çekici gelişmeleri burada bulabilirsiniz.' 
                : 'Here you can find the latest research, scientific articles and interesting developments in the field of bioengineering.'}
            </p>
            <div className="relative inline-block group animate-fade-in-delayed-more">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#a90013] to-[#ffdee2] rounded-md blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <Link 
                href={`/${safeLocale}/blog`}
                className="relative bg-[#a90013] hover:bg-[#8a0010] dark:bg-[#a90013] dark:hover:bg-[#8a0010] text-white py-2.5 sm:py-3 px-6 sm:px-8 rounded-md text-sm sm:text-md font-medium inline-flex items-center flex-shrink-0 w-fit transform group-hover:translate-y-[-2px] transition-all duration-300"
              >
                <span>{safeLocale === 'tr' ? 'Tüm Yazıları Görüntüle' : 'View All Posts'}</span>
                <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 inline group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            <div className="absolute top-1/2 right-0 transform translate-x-[190%] -translate-y-1/2 w-64 h-64 opacity-20 hidden lg:block">
              <div className="absolute inset-0 bg-[#ffdee2] rounded-md blur-3xl animate-blob"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity duration-300 hidden sm:flex">
          <span className="text-[#ffdee2] text-xs mb-2">
            {safeLocale === 'tr' ? 'Aşağı Kaydır' : 'Scroll Down'}
          </span>
          <div className="w-5 h-8 border-2 border-[#ffdee2] rounded-md flex justify-center p-1">
            <div className="w-1 h-1 bg-[#ffdee2] rounded-md animate-scroll-down"></div>
          </div>
        </div>
      </section>

      {/* Featured Posts - Interactive Cards */}
      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#141414] dark:text-white">
              {safeLocale === 'tr' ? 'Öne Çıkan Araştırmalar' : 'Featured Research'}
            </h2>
            <div className="w-12 h-px bg-[#a90013] mt-2 mb-4"></div>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
              {safeLocale === 'tr' 
                ? 'Biyomühendislik alanındaki en güncel ve önemli çalışmalar.' 
                : 'Our most current and important work in the field of bioengineering.'}
            </p>
          </div>
          
          {postsToDisplay.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {postsToDisplay.map((post) => (
                <div 
                  key={post.id} 
                  className="group relative cursor-pointer bg-white dark:bg-[#1a1a1a] rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#a90013]"
                >
                  {/* Make entire card clickable */}
                  <Link href={`/${safeLocale}/blog/${post.slug}`} className="absolute inset-0 z-40">
                    <span className="sr-only">{post.title}</span>
                  </Link>
                  
                  {/* Image section with hover effects */}
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <Image 
                      src={post.image || "/blog/default-image.webp"} 
                      alt={post.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Gradient overlay that darkens on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                    
                    {/* Category label */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-[#a90013] text-white px-3 py-1 text-xs font-medium rounded-md transform group-hover:scale-105 transition-transform duration-300">
                        {post.category}
                      </span>
                    </div>
                    
                    {/* Date that moves up slightly on hover - UPDATED TO USE FORMATTED DATE */}
                    <div className="absolute bottom-3 right-3 z-10">
                      <span className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 text-xs rounded-md transform group-hover:translate-y-[-4px] transition-all duration-300">
                        {post.formattedDate}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content section with hover animations */}
                  <div className="p-5 relative">
                    {/* Animated line that appears when hovering */}
                    <div className="absolute left-0 top-0 w-0 h-1 bg-[#a90013] group-hover:w-full transition-all duration-500"></div>
                    
                    <h3 className="text-lg font-medium text-[#141414] dark:text-white mb-3 group-hover:text-[#a90013] dark:group-hover:text-[#ffdee2] transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    {/* Excerpt that grows slightly in height on hover */}
                    <div className="h-[40px] overflow-hidden group-hover:h-[60px] transition-all duration-500">
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        {post.excerpt}
                      </p>
                    </div>
                    
                    {/* Read more button with animated arrow */}
                    <div className="mt-4 relative z-20 pointer-events-none">
                      <span className="text-[#a90013] dark:text-[#ffdee2] text-sm font-medium inline-flex items-center">
                        <span>{safeLocale === 'tr' ? 'Devamını Oku' : 'Read More'}</span>
                        <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white/5 dark:bg-black/5 rounded-lg">
              <p className="text-neutral-600 dark:text-neutral-400">
                {safeLocale === 'tr' 
                  ? 'Henüz blog yazısı bulunmamaktadır.' 
                  : 'No blog posts available yet.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Research Areas - Simplified */}
<section className="py-14 sm:py-16">
  <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
    <div className="mb-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#141414] dark:text-white">
        {safeLocale === 'tr' ? 'Araştırma Alanlarımız' : 'Our Research Areas'}
      </h2>
      <div className="w-12 h-px bg-[#a90013] mt-2 mb-4"></div>
      <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
        {safeLocale === 'tr'
          ? 'Biyomühendislik alanında araştırmalar yapıyor ve yazılar yazıyoruz.'
          : 'We conduct research and write articles in the field of bioengineering.'}
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-md shadow-sm hover:shadow-md transition-all duration-300 group">
        <div className="w-12 h-12 bg-[#a90013]/10 rounded-md flex items-center justify-center mb-4 text-[#a90013] dark:text-[#ffdee2] group-hover:bg-[#a90013] group-hover:text-white transition-all duration-300">
          <BookOpen size={20} />
        </div>
        <h3 className="text-xl font-medium text-[#141414] dark:text-white mb-3">
          {safeLocale === 'tr' ? 'Biyomedikal Araştırmalar' : 'Biomedical Research'}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
          {safeLocale === 'tr'
            ? 'Biyomühendislik teknolojileriyle tıbbi araştırmalar üzerine yazılar yazıyor ve analizler yapıyoruz.'
            : 'We write articles and conduct analyses on biomedical research using bioengineering technologies.'}
        </p>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-md shadow-sm hover:shadow-md transition-all duration-300 group">
        <div className="w-12 h-12 bg-[#a90013]/10 rounded-md flex items-center justify-center mb-4 text-[#a90013] dark:text-[#ffdee2] group-hover:bg-[#a90013] group-hover:text-white transition-all duration-300">
          <Zap size={20} />
        </div>
        <h3 className="text-xl font-medium text-[#141414] dark:text-white mb-3">
          {safeLocale === 'tr' ? 'Çevre Biyoteknolojisi' : 'Environmental Biotechnology'}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
          {safeLocale === 'tr'
            ? 'Çevresel biyoteknoloji konularında araştırmalar yapıyor ve sürdürülebilirlik üzerine yazılar yazıyoruz.'
            : 'We research and write articles on environmental biotechnology and sustainability.'}
        </p>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
        <div className="w-12 h-12 bg-[#a90013]/10 rounded-lg flex items-center justify-center mb-4 text-[#a90013] dark:text-[#ffdee2] group-hover:bg-[#a90013] group-hover:text-white transition-all duration-300">
          <Users size={20} />
        </div>
        <h3 className="text-xl font-medium text-[#141414] dark:text-white mb-3">
          {safeLocale === 'tr' ? 'Biyoinformatik' : 'Bioinformatics'}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
          {safeLocale === 'tr'
            ? 'Genetik veri analizi ve biyoinformatik modelleme üzerine araştırmalar yapıyor ve yazılar yazıyoruz.'
            : 'We research and write articles on genetic data analysis and bioinformatics modeling.'}
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Categories Section - Fixed with Hash Links */}
{categories.length > 0 && (
  <section className="py-16 sm:py-20 relative">
    <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between ">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#141414] dark:text-white">
            {safeLocale === 'tr' ? 'Kategoriler' : 'Categories'}
          </h2>
          <div className="w-12 h-px bg-[#a90013] mt-2 mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
            {safeLocale === 'tr' 
              ? 'Biyomühendislik alanında içerik ürettiğimiz temel konular ve alanlar.' 
              : 'The main topics and areas where we produce content in the field of bioengineering.'}
          </p>
        </div>
        <div className="relative mt-4 sm:mt-0">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#a90013] to-[#ffdee2]/70 rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition duration-300"></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category, index) => {
          const postCount = allPosts.filter(post => post.category === category).length;
          return (
            <Link 
              key={index}
              href={`/${safeLocale}/blog#${encodeURIComponent(category)}`}
              className="group bg-white dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800 hover:border-[#a90013] dark:hover:border-[#a90013] rounded-xl p-5 sm:p-6 transition-all duration-300 hover:shadow-md relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#a90013]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#141414] dark:text-white group-hover:text-[#a90013] dark:group-hover:text-[#ffdee2] transition-colors">
                    {category}
                  </h3>
                  <span className="bg-[#a90013]/10 dark:bg-[#a90013]/20 text-[#a90013] dark:text-[#ffdee2] px-2 py-1 text-xs rounded-full font-medium">
                    {postCount}
                  </span>
                </div>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4">
                  {safeLocale === 'tr' 
                    ? 'Bu kategorideki en son araştırmalar ve gelişmeler.' 
                    : 'Latest research and developments in this category.'}
                </p>
                <div className="flex items-center text-[#a90013] dark:text-[#ffdee2]">
                  <span className="text-sm font-medium">
                    {safeLocale === 'tr' ? 'Keşfet' : 'Explore'}
                  </span>
                  <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
)}

      {/* About BYM Section - Optimized */}
<section className="py-16 sm:py-20 bg-gradient-to-br from-[#141414] to-[#1a1a1a] text-white relative overflow-hidden">
  {/* Basitleştirilmiş arka plan - SVG pattern kaldırıldı */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#a90013]/10 to-transparent"></div>
  
  <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className="order-2 lg:order-1">
        <span className="text-[#ffdee2] text-sm font-medium">
          {safeLocale === 'tr' ? 'HAKKIMIZDA' : 'ABOUT US'}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
          {safeLocale === 'tr' ? 'BYM Türkiye Hakkında' : 'About Bioengineering Community'}
        </h2>
        <div className="space-y-4 mb-8">
          <p className="text-neutral-300">
            {safeLocale === 'tr' 
              ? 'BYM Türkiye (Biyomühendislik Türkiye), biyomühendislik ve biyolojik bilimler alanlarında bilgi paylaşımını ve iş birliğini teşvik eden bir öğrenci topluluğudur. UNIDC ve UNILAB Vision\'ın dinamik yapısı içinde yer alıyoruz.' 
              : 'Bioengineering Community is a student community that promotes knowledge sharing and collaboration in the fields of bioengineering and biological sciences. We take part in the dynamic structure of UNIDC and UNILAB Vision.'}
          </p>
          <p className="text-neutral-300">
            {safeLocale === 'tr' 
              ? 'Amacımız, bilimsel içerikler üretmek, etkinlikler düzenlemek ve disiplinlerarası projeler geliştirmektir. Bilimsel farkındalığı artırmayı, üretkenliği desteklemeyi ve ilham verici içerikler üretmeyi hedefliyoruz.' 
              : 'Our aim is to produce scientific content, organize events, and develop interdisciplinary projects. We aim to increase scientific awareness, support productivity, and create inspiring content.'}
          </p>
          <p className="text-neutral-300">
            {safeLocale === 'tr' 
              ? 'Topluluğumuz, bilimsel içerikler (bülten, haber, güncel gelişmeler), röportajlar, seminerler, atölye çalışmaları, bilimsel projeler, yarışmalar ve mentorluk programları düzenleyerek üyelerimize kapsamlı bir öğrenme ve gelişim ortamı sunar.' 
              : 'Our community offers our members a comprehensive learning and development environment by organizing scientific content (bulletins, news, current developments), interviews, seminars, workshops, scientific projects, competitions, and mentorship programs.'}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Link 
            href={`/${safeLocale}/member/signup`}
            className="bg-[#a90013] hover:bg-[#8a0010] text-white px-6 py-3 rounded-md font-medium inline-flex items-center gap-2 transform hover:-translate-y-1 transition-all duration-300"
          >
            <span>{safeLocale === 'tr' ? 'Üye Ol!' : 'Apply Now!'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
  href={`/${safeLocale}/${safeLocale === 'tr' ? 'hakkimizda' : 'about'}`}
  className="bg-transparent border-2 border-[#ffdee2] hover:bg-[#ffdee2]/10 text-white px-6 py-3 rounded-md font-medium inline-flex items-center gap-2 transform hover:-translate-y-1 transition-all duration-300"
>
  <span>{safeLocale === 'tr' ? 'Daha Fazla Bilgi' : 'More Information'}</span>
  <ArrowRight className="w-4 h-4" />
</Link>
        </div>
      </div>
      
      <div className="order-1 lg:order-2 relative">
        {/* Blur efekti hafifletildi */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#a90013]/20 blur-xl"></div>
        
        {/* Kart animasyonu korunuyor */}
        <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#141414] p-6 sm:p-8 rounded-2xl border border-neutral-800 transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-xl will-change-transform">
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#ffdee2] rounded-full flex items-center justify-center transform rotate-12">
            <Zap className="w-6 h-6 text-[#a90013]" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            {safeLocale === 'tr' ? 'BYM\'ye Katılın' : 'Join BYM'}
          </h3>
          <p className="text-neutral-300 mb-6">
            {safeLocale === 'tr' 
              ? 'UNIDC\'ye katılın, keşfedin ve değişimde rol alın! Birlikte büyüyen bir topluluğun parçası olun ve bilimin gücüyle daha fazlasını keşfedin.' 
              : 'Join UNIDC, discover and play a role in change! Be part of a growing community and discover more with the power of science.'}
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#a90013]/20 flex items-center justify-center text-[#ffdee2]">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-white">
                {safeLocale === 'tr' ? 'Network Sağlama' : 'Professional Network'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#a90013]/20 flex items-center justify-center text-[#ffdee2]">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-white">
                {safeLocale === 'tr' ? 'Eğitim Desteği' : 'Educational Support'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#a90013]/20 flex items-center justify-center text-[#ffdee2]">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-white">
                {safeLocale === 'tr' ? 'Bilimsel Projeler' : 'Scientific Projects'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Stats Section - Interactive */}
<section className="py-14 sm:py-16 mb-10">
  <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
    <div className="mb-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#141414] dark:text-white">
        {safeLocale === 'tr' ? 'Sayılarla Topluluğumuz' : 'Our Community in Numbers'}
      </h2>
      <div className="w-12 h-px bg-[#a90013] mt-2 mb-4"></div>
      <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
        {safeLocale === 'tr'
          ? 'Biyomühendislik topluluğu olarak araştırma ve yazılarımızla farkındalık yaratıyoruz.'
          : 'As a bioengineering community, we raise awareness through our research and articles.'}
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="group cursor-pointer relative overflow-hidden bg-white dark:bg-[#1a1a1a] p-5 rounded-lg shadow-sm transition-all duration-300 border border-transparent hover:border-[#a90013] hover:shadow-md">
        <div className="absolute inset-0 bg-gradient-to-br from-[#a90013]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute left-0 top-0 w-0 h-1 bg-[#a90013] group-hover:w-full transition-all duration-500"></div>

        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-[#a90013] dark:text-[#ffdee2] mb-2 transform group-hover:translate-x-1 transition-transform duration-300">
            200+
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors duration-300">
            {safeLocale === 'tr' ? 'Topluluk Üyesi' : 'Community Members'}
          </p>

          <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
            {safeLocale === 'tr'
              ? 'Farklı üniversitelerden biyomühendislik meraklıları.'
              : 'Bioengineering enthusiasts from various universities.'}
          </div>
        </div>
      </div>

      <div className="group cursor-pointer relative overflow-hidden bg-white dark:bg-[#1a1a1a] p-5 rounded-lg shadow-sm transition-all duration-300 border border-transparent hover:border-[#a90013] hover:shadow-md">
        <div className="absolute inset-0 bg-gradient-to-br from-[#a90013]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute left-0 top-0 w-0 h-1 bg-[#a90013] group-hover:w-full transition-all duration-500"></div>

        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-[#a90013] dark:text-[#ffdee2] mb-2 transform group-hover:translate-x-1 transition-transform duration-300">
            10.000+
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors duration-300">
            {safeLocale === 'tr' ? 'Takipçi Kitlesi' : 'Follower Audience'}
          </p>

          <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
            {safeLocale === 'tr'
              ? 'Biyomühendislik alanındaki kümülatif takipçi sayımız.'
              : 'Our cumulative number of followers in Bioengineering.'}
          </div>
        </div>
      </div>

      <div className="group cursor-pointer relative overflow-hidden bg-white dark:bg-[#1a1a1a] p-5 rounded-lg shadow-sm transition-all duration-300 border border-transparent hover:border-[#a90013] hover:shadow-md">
        <div className="absolute inset-0 bg-gradient-to-br from-[#a90013]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute left-0 top-0 w-0 h-1 bg-[#a90013] group-hover:w-full transition-all duration-500"></div>

        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-[#a90013] dark:text-[#ffdee2] mb-2 transform group-hover:translate-x-1 transition-transform duration-300">
            15+
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors duration-300">
            {safeLocale === 'tr' ? 'Ekip Üyesi' : 'Team Member'}
          </p>

          <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
            {safeLocale === 'tr'
              ? 'Biyomühendislik ve pekçok alanda biyoloji tutkunu ekibimiz.'
              : 'Our team is passionate about bioengineering and biology in many fields.'}
          </div>
        </div>
      </div>

      <div className="group cursor-pointer relative overflow-hidden bg-white dark:bg-[#1a1a1a] p-5 rounded-lg shadow-sm transition-all duration-300 border border-transparent hover:border-[#a90013] hover:shadow-md">
        <div className="absolute inset-0 bg-gradient-to-br from-[#a90013]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute left-0 top-0 w-0 h-1 bg-[#a90013] group-hover:w-full transition-all duration-500"></div>

        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-[#a90013] dark:text-[#ffdee2] mb-2 transform group-hover:translate-x-1 transition-transform duration-300">
            200+
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors duration-300">
            {safeLocale === 'tr' ? 'İçerik' : 'Contents'}
          </p>

          <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
            {safeLocale === 'tr'
              ? 'Biyomühendislik ve biyolojik bilimler alanı üzerine ürettiğimiz içerik sayısı.'
              : 'The number of content we produce on bioengineering and biological sciences.'}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      
    </div>
  );
}
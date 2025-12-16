import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CommentSection from '@/app/components/pages/blog/CommentSection';

// Import client components for sharing
import MobileShareSection from '@/app/components/pages/blog/MobileShareSection';
import DesktopShareSection from '@/app/components/pages/blog/DesktopShareSection';

// Service functions
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/app/services/blogService';

// Supported languages
type SupportedLocale = 'tr' | 'en';

// Page parameters type
interface PageParams {
  locale: string;
  slug: string;
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

// Correct component props definition (params should be Promise)
export default async function BlogPostPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale, slug } = await params;

  // Language check
  if (locale !== 'tr' && locale !== 'en') {
    notFound();
  }

  // Get the post
  const post = await getBlogPostBySlug(slug, locale as SupportedLocale);
  if (!post) {
    notFound();
  }

  // Format the post date
  const formattedDate = formatDate(post.date, locale);

  // Get related posts
  const relatedPosts = await getRelatedBlogPosts(post, locale as SupportedLocale, 3);

  // Format dates for related posts
  const relatedPostsWithFormattedDates = relatedPosts.map(relatedPost => ({
    ...relatedPost,
    formattedDate: formatDate(relatedPost.date, locale)
  }));

  // Check if there's an alternate language version
  const alternateLocale = locale === 'tr' ? 'en' : 'tr';
  const alternateSlug = post.alternateSlug || null;

  return (
    <article className="bg-white dark:bg-neutral-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-[#141414] to-[#1a1a1a] py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          {post.image && (
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              className="object-cover"
              priority 
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/80 via-[#141414]/60 to-[#1a1a1a]/80"></div>
          
          {/* Animated overlay elements */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#a90013]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#a90013]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link href={`/${locale}`} className="text-neutral-400 hover:text-[#ffdee2] transition flex items-center text-sm">
                  {locale === 'tr' ? 'Ana Sayfa' : 'Home'}
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-3 h-3 text-neutral-500" />
                  <Link href={`/${locale}/blog`} className="ml-1 text-neutral-400 hover:text-[#ffdee2] transition text-sm">
                    Blog
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-3 h-3 text-neutral-500" />
                  <span className="ml-1 text-sm font-medium text-neutral-300 truncate max-w-[200px]">
                    {post.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          
          {/* Category */}
          <div className="mb-4">
            <Link 
              href={`/${locale}/blog?category=${encodeURIComponent(post.category)}`}
              className="bg-[#a90013]/20 text-[#ffdee2] px-3 py-1 text-xs font-medium tracking-wider inline-block rounded-md hover:bg-[#a90013]/30 transition-colors"
            >
              {post.category}
            </Link>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl leading-tight">
            {post.title}
          </h1>
          
          {/* Author and Date Info */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8 text-neutral-300 mb-8">
            <div className="flex items-center">
              {post.author.avatar && (
                <div className="relative mr-3 border-2 border-[#a90013] rounded-full p-0.5">
                  <Image 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    width={44} 
                    height={44} 
                    className="rounded-full" 
                  />
                </div>
              )}
              <div>
                <p className="font-medium text-white">{post.author.name}</p>
                <p className="text-neutral-400 text-sm">{post.author.position}</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <span className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2 text-[#a90013]" />
                {formattedDate}
              </span>
              <span className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2 text-[#a90013]" />
                {post.readingTime}
              </span>
            </div>
          </div>
          
          {/* Alternate Language Link */}
          {alternateSlug && (
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md text-sm">
              <Link 
                href={`/${alternateLocale}/blog/${alternateSlug}`}
                className="text-[#ffdee2] hover:text-white transition-colors flex items-center"
              >
                {locale === 'tr' 
                  ? 'Read in English' 
                  : 'Türkçe Oku'}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Social Share Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <DesktopShareSection postId={post.id} title={post.title} locale={locale} />
          </div>
          
          {/* Left Column - Content */}
          <div className="lg:col-span-7">
            {/* Featured Image */}
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
              {post.image && (
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  width={800} 
                  height={450} 
                  className="w-full h-auto" 
                />
              )}
            </div>
            
            {/* Description */}
            <div className="mb-10">
              <p className="text-xl text-neutral-800 dark:text-neutral-300 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
            
            {/* Post content rendered as HTML */}
            <div className="blog-content prose prose-lg max-w-none dark:prose-invert prose-headings:font-medium prose-h2:text-2xl prose-h3:text-xl prose-p:text-base prose-p:leading-relaxed mb-12">
              <div 
                dangerouslySetInnerHTML={{ __html: post.content }} 
                className="rich-text-content"
              />
            </div>
            
            {/* Tags */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 mt-8">
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-4 flex items-center">
                <Tag className="mr-2 w-4 h-4 text-[#a90013]" />
                {locale === 'tr' ? 'Etiketler' : 'Tags'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Link 
                    key={index}
                    href={`/${locale}/blog?tag=${encodeURIComponent(tag)}`}
                    className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 px-3 py-1.5 text-sm rounded-md transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Author Info */}
            <div className="mt-12 bg-neutral-50 dark:bg-neutral-800/50 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                {post.author.avatar && (
                  <div className="relative border-2 border-[#a90013] rounded-full p-0.5">
                    <Image 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      width={70} 
                      height={70} 
                      className="rounded-full" 
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                    {post.author.name}
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-3">
                    {post.author.position}
                  </p>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                    {post.author.bio || (locale === 'tr' 
                      ? 'BYM Türkiye ekibinde biyomühendislik ve biyoteknoloji alanlarında uzmanlaşmış bir profesyonel.'
                      : 'A professional specialized in bioengineering and biotechnology in the BYM Turkey team.')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Mobile sharing options */}
            <div className="flex justify-between items-center mt-8 lg:hidden border-t border-neutral-200 dark:border-neutral-800 pt-6">
              <Link 
                href={`/${locale}/blog`}
                className="inline-flex items-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                {locale === 'tr' ? 'Tüm Yazılara Dön' : 'Back to All Posts'}
              </Link>
              
              {/* Client Component for Share buttons */}
              <MobileShareSection postId={post.id} title={post.title} locale={locale} />
            </div>
            
            {/* Comments Section */}
            <div id="comments">
              <CommentSection postId={post.id} locale={locale} />
            </div>
          </div>
          
          {/* Right Column - Related Content */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              {/* Back Button (desktop only) */}
              <div className="hidden lg:block">
                <Link 
                  href={`/${locale}/blog`}
                  className="inline-flex items-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 mb-6 transition-colors"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  {locale === 'tr' ? 'Tüm Yazılara Dön' : 'Back to All Posts'}
                </Link>
              </div>
              
              {/* Related Posts Section */}
              {relatedPostsWithFormattedDates.length > 0 && (
                <div className="bg-neutral-50 dark:bg-neutral-800/50 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <h3 className="font-medium text-lg text-neutral-900 dark:text-neutral-100 mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-700">
                    {locale === 'tr' ? 'İlgili Yazılar' : 'Related Posts'}
                  </h3>
                  <div className="space-y-5">
                    {relatedPostsWithFormattedDates.map((relatedPost) => (
                      <Link 
                        key={relatedPost.id}
                        href={`/${locale}/blog/${relatedPost.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-24 h-16 relative overflow-hidden rounded-md">
                            {relatedPost.image && (
                              <Image 
                                src={relatedPost.image} 
                                alt={relatedPost.title} 
                                fill 
                                className="object-cover transition-transform duration-300 group-hover:scale-110" 
                              />
                            )}
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-[#a90013] dark:group-hover:text-[#ffdee2] transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h4>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                              {relatedPost.formattedDate}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Categories */}
              <div className="bg-neutral-50 dark:bg-neutral-800/50 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 mt-6">
                <h3 className="font-medium text-lg text-neutral-900 dark:text-neutral-100 mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-700">
                  {locale === 'tr' ? 'Kategoriler' : 'Categories'}
                </h3>
                <ul className="space-y-3">
                  {Array.from(new Set([post.category, ...relatedPostsWithFormattedDates.map(p => p.category)])).map((category, index) => (
                    <li key={index}>
                      <Link 
                        href={`/${locale}/blog?category=${encodeURIComponent(category)}`}
                        className="flex items-center justify-between text-neutral-700 dark:text-neutral-400 hover:text-[#a90013] dark:hover:text-[#ffdee2] py-1 transition-colors"
                      >
                        <span>{category}</span>
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// Metadata function should also be async
export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (locale !== 'tr' && locale !== 'en') {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  const post = await getBlogPostBySlug(slug, locale as SupportedLocale);
  if (!post) {
    return {
      title: locale === 'tr' ? '404 - Yazı Bulunamadı' : '404 - Post Not Found',
      description: locale === 'tr' 
        ? 'Aradığınız blog yazısı bulunamadı.' 
        : 'The blog post you are looking for does not exist.',
    };
  }

  // Sayfanın tam URL'ini oluştur
  const canonicalUrl = `https://biyomuhendislik.net.tr/${locale}/blog/${slug}`;
  
  // Alternatif dil URL'i - Remove this unused variable
  const alternateLocale = locale === 'tr' ? 'en' : 'tr';
  
  return {
    title: `${post.title} | BYM Türkiye Blog`,
    description: post.excerpt,
    keywords: [...post.tags, post.category, 'blog', 'BYM Türkiye'],
    // Canonical URL ekleme
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'tr': alternateLocale === 'tr' && post.alternateSlug 
          ? `https://biyomuhendislik.net.tr/tr/blog/${post.alternateSlug}` 
          : `https://biyomuhendislik.net.tr/tr/blog/${slug}`,
        'en': alternateLocale === 'en' && post.alternateSlug 
          ? `https://biyomuhendislik.net.tr/en/blog/${post.alternateSlug}` 
          : `https://biyomuhendislik.net.tr/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl, // OpenGraph URL'ini de güncelle
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}
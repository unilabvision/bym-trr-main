// app/components/pages/PageHandler.tsx
import { pageRoutes } from '@/app/lib/routes';
import PageLayout from '@/app/components/layout/PageLayout';
import NotFound from '@/app/components/pages/errors/NotFound';

// İçerik sayfaları
import AboutPage from './about/AboutPage';
import ProjectsPage from './projects/ProjectsPage';
import BlogPage from './blog/BlogPage';
import ContactPage from './contact/ContactPage';

// İçerik türleri - Blog içeriği kaldırıldı
import { AboutContent } from './about/content';
import { ProjectsContent } from './projects/content';
// import { BlogContent } from './blog/content'; // Blog içeriği kaldırıldı
import { ContactContent } from './contact/content';
import { default as aboutContentModule } from './about/content';
import { default as projectsContentModule } from './projects/content';
// import { default as blogContentModule } from './blog/content'; // Blog içeriği kaldırıldı
import { default as contactContentModule } from './contact/content';

// Blog içeriği için alternatif
import { getBlogContent } from '@/app/services/blogService';
import { BlogContent } from '@/app/types/blog';

// Desteklenen diller ve sayfalar için tip tanımları
type SupportedLocale = 'tr' | 'en';
type PageType = 'about' | 'projects' | 'blog' | 'services' | 'careers' | 'contact' | 'not-found';

// Generic content interface to avoid using `any`
interface PageContent {
  title: string;
  description: string;
}

// Sayfa içerik API'si - jenerik tip kullanarak her sayfa için doğru içerik tipini döndür
async function getPageContent<T extends PageContent>(locale: string, page: PageType): Promise<T | null> {
  try {
    if (locale !== 'tr' && locale !== 'en') {
      return null;
    }
    
    const localeKey = locale as SupportedLocale;
    
    switch(page) {
      case 'about':
        return aboutContentModule[localeKey] as unknown as T;
      case 'projects':
        return projectsContentModule[localeKey] as unknown as T;
      case 'blog':
        // Blog içeriğini veritabanından al
        return getBlogContent(locale) as unknown as T;
      case 'contact':
        return contactContentModule[localeKey] as unknown as T;
      default:
        return null;
    }
  } catch (error) {
    console.error(`Error loading content for page "${page}" in "${locale}" locale:`, error);
    return null;
  }
}

interface PageHandlerProps {
  pageType: string;
  locale: string;
}

// Her sayfa için arka plan görselleri
const bgImages: Record<PageType, string> = {
  'about': '/about-hero.webp',
  'projects': '/projects-hero.webp',
  'blog': '/blog-hero.webp',
  'services': '/services-hero.webp',
  'careers': '/careers-hero.webp',
  'contact': '/contact-hero.webp',
  'not-found': '/default-hero.webp'
};

export default async function PageHandler({ pageType, locale }: PageHandlerProps) {
  // Geçerli bir sayfa türü olup olmadığını kontrol et
  const validPageType = ['about', 'projects', 'blog', 'services', 'careers', 'contact'].includes(pageType) 
    ? pageType as PageType 
    : 'not-found';
  
  // Her sayfa için kendi içerik tipini kullanarak verileri al
  let content: PageContent | null = null;
  let pageContent: React.ReactNode = null;
  
  if (validPageType === 'about') {
    const aboutContent = await getPageContent<AboutContent>(locale, validPageType);
    if (aboutContent) {
      content = aboutContent;
      pageContent = <AboutPage content={aboutContent} locale={locale} />;
    }
  } else if (validPageType === 'projects') {
    const projectsContent = await getPageContent<ProjectsContent>(locale, validPageType);
    if (projectsContent) {
      content = projectsContent;
      pageContent = <ProjectsPage content={projectsContent} locale={locale} />;
    }
  } else if (validPageType === 'blog') {
    const blogContent = await getPageContent<BlogContent>(locale, validPageType);
    if (blogContent) {
      content = blogContent;
      pageContent = <BlogPage content={blogContent} locale={locale} />;
    }
  } else if (validPageType === 'contact') {
    const contactContent = await getPageContent<ContactContent>(locale, validPageType);
    if (contactContent) {
      content = contactContent;
      pageContent = <ContactPage locale={locale} />; // Remove content prop
    }
  }
  
  // İçerik bulunamazsa, NotFound bileşenini göster
  if (!content) {
    return <NotFound locale={locale} />;
  }
  
  // Breadcrumbs için sayfa adını al
  let pageName = pageType;
  if (validPageType !== 'not-found' && locale in pageRoutes[validPageType as keyof typeof pageRoutes]) {
    pageName = pageRoutes[validPageType as keyof typeof pageRoutes][locale as 'tr' | 'en'];
  }
  
  const breadcrumbs = [
    {
      name: content.title,
      href: `/${locale}/${pageName}`
    }
  ];
  
  return (
    <PageLayout 
      title={content.title} 
      description={content.description} 
      locale={locale}
      breadcrumbs={breadcrumbs}
      bgImage={bgImages[validPageType] || '/default-hero.webp'}
    >
      {/* Sayfa içeriğini göster */}
      {pageContent}
      
      {/* Henüz bileşeni eklenmemiş sayfalar için geçici içerik */}
      {!pageContent && validPageType !== 'not-found' && (
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-medium mb-6">{content.title}</h2>
          <p className="mb-8">{content.description}</p>
          <p className="text-neutral-500">Bu sayfa yapım aşamasındadır - {pageType} / {locale}</p>
        </div>
      )}
    </PageLayout>
  );
}
import { getPageFromSlug } from '@/app/lib/routes';
import PageHandler from '@/app/components/pages/PageHandler';
import type { Metadata } from 'next';

// Define the interface for the page props
interface PageParams {
  locale: string;
  slug: string[];
}

// ✅ Correct typing for App Router page component
type PageProps = {
  params: Promise<PageParams>;
};

const PageSlug = async ({ params }: PageProps) => {
  const { locale, slug } = await params;
  const slugString = slug?.[0] || '';

  const pageType = getPageFromSlug(locale, slugString);

  return <PageHandler pageType={pageType || 'not-found'} locale={locale} />;
};

export default PageSlug;

// ✅ Also update generateMetadata to handle Promise
export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const slugString = slug?.[0] || '';

  return {
    title:
      locale === 'tr'
        ? `${slugString ? slugString.charAt(0).toUpperCase() + slugString.slice(1) : 'Sayfa'} | BYM Türkiye`
        : `${slugString ? slugString.charAt(0).toUpperCase() + slugString.slice(1) : 'Page'} | BYM Turkey`,
    description:
      locale === 'tr'
        ? 'Biyomühendislik alanında eğitim, araştırma ve inovasyon faaliyetlerini destekleyen topluluk'
        : 'Community supporting education, research, and innovation in bioengineering',
  };
}
'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowLeft, Clock, BookOpen, Newspaper, Calendar, Briefcase } from 'lucide-react';

// Search result interface
interface SearchResultItem {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  type: 'blog' | 'page' | 'event' | 'project';
  image?: string;
  category?: string;
  date?: string;
  tags?: string[];
}

interface SearchPageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Helper function to format date in Turkish format (25 Temmuz, 2025)
const formatDateTurkish = (dateStr: string): string => {
  try {
    let date: Date;
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
      date = new Date(dateStr);
    } else {
      date = new Date(dateStr);
    }
    if (isNaN(date.getTime())) {
      return dateStr;
    }
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
  } catch {
    return dateStr;
  }
};

// Helper function to format date in English format (July 25, 2025)
const formatDateEnglish = (dateStr: string): string => {
  try {
    let date: Date;
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
      date = new Date(dateStr);
    } else {
      date = new Date(dateStr);
    }
    if (isNaN(date.getTime())) {
      return dateStr;
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

// Client Component to handle search logic
function SearchContent({ locale }: { locale: string }) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newQuery, setNewQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Filter states - using destructuring assignment but keeping only the value we need
  const [activeFilters] = useState<Record<string, boolean>>({
    blog: true,
    page: true,
    event: true, 
    project: true
  });
  
  const searchParams = useSearchParams();

  const performSearch = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&locale=${locale}`);
      
      if (!response.ok) {
        throw new Error(`Search failed with status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON response but got ${contentType}`);
      }
      
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    const query = searchParams?.get('q') || '';
    setSearchQuery(query);
    setNewQuery(query);

    if (query) {
      performSearch(query);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [searchParams, performSearch]);

  const handleNewSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuery.trim()) {
      const url = new URL(window.location.href);
      url.searchParams.set('q', newQuery);
      window.history.pushState({}, '', url.toString());
      performSearch(newQuery);
      setSearchQuery(newQuery);
    }
  };

  // Filter results
  const filteredResults = results.filter(result => activeFilters[result.type]);

  // Translations based on locale
  const t = {
    searchResults: locale === 'tr' ? 'Arama Sonuçları' : 'Search Results',
    searchFor: locale === 'tr' ? 'Arama' : 'Search',
    noResults: locale === 'tr' ? 'Aramanız için sonuç bulunamadı' : 'No results found for your search',
    tryAgain: locale === 'tr' ? 'Farklı anahtar kelimeler deneyebilir veya filtreleri değiştirebilirsiniz.' : 'You can try different keywords or change the filters.',
    searchPlaceholder: locale === 'tr' ? 'Ne aramak istiyorsunuz?' : 'What are you looking for?',
    searchButton: locale === 'tr' ? 'Ara' : 'Search',
    filters: locale === 'tr' ? 'Filtreler' : 'Filters',
    allResults: locale === 'tr' ? 'Tüm Sonuçlar' : 'All Results',
    clearFilters: locale === 'tr' ? 'Filtreleri Temizle' : 'Clear Filters',
    loading: locale === 'tr' ? 'Aranıyor...' : 'Searching...',
    backToHome: locale === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home',
    errorText: locale === 'tr' ? 'Arama sırasında bir hata oluştu' : 'An error occurred during search',
    tryLater: locale === 'tr' ? 'Lütfen daha sonra tekrar deneyin' : 'Please try again later',
    resultsCount: locale === 'tr'
      ? (count: number) => `${count} sonuç bulundu`
      : (count: number) => `${count} result${count !== 1 ? 's' : ''} found`,
    contentTypes: {
      blog: locale === 'tr' ? 'Blog Yazısı' : 'Blog Post',
      page: locale === 'tr' ? 'Sayfa' : 'Page',
      event: locale === 'tr' ? 'Etkinlik' : 'Event',
      project: locale === 'tr' ? 'Proje' : 'Project'
    },
    filterLabels: {
      blog: locale === 'tr' ? 'Blog Yazıları' : 'Blog Posts',
      page: locale === 'tr' ? 'Sayfalar' : 'Pages',
      event: locale === 'tr' ? 'Etkinlikler' : 'Events',
      project: locale === 'tr' ? 'Projeler' : 'Projects'
    }
  };

  // Get icon by content type
  const getIconForType = (type: string) => {
    switch (type) {
      case 'blog':
        return <Newspaper className="w-4 h-4" />;
      case 'page':
        return <BookOpen className="w-4 h-4" />;
      case 'event':
        return <Calendar className="w-4 h-4" />;
      case 'project':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <Newspaper className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-[#fff7f8] dark:bg-neutral-900 min-h-screen">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-[#141414] to-[#1a1a1a] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#a90013]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#a90013]/10 rounded-full blur-3xl"></div>

          <Link
            href={`/${locale}`}
            className="inline-flex items-center text-sm text-neutral-300 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            {t.backToHome}
          </Link>

          <div className="max-w-3xl mx-auto relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 text-center">
              {t.searchResults}
            </h1>

            <div className="bg-white/10 backdrop-blur-md p-1 rounded-lg shadow-lg relative z-10">
              <form onSubmit={handleNewSearch} className="flex items-center">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-white" />
                  </div>
                  <input
                    type="text"
                    value={newQuery}
                    onChange={(e) => setNewQuery(e.target.value)}
                    className="py-4 pl-12 pr-4 block w-full rounded-l-lg bg-transparent border-0 text-white placeholder-white/70 focus:outline-none focus:ring-0 text-lg"
                    placeholder={t.searchPlaceholder}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#a90013] hover:bg-[#8a0010] text-white py-4 px-8 rounded-r-lg font-medium transition-colors"
                >
                  {t.searchButton}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {searchQuery && (
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm">
            <div>
              <p className="text-neutral-600 dark:text-neutral-300">
                <span className="font-medium">{t.searchFor}:</span>{' '}
                <span className="font-bold text-[#a90013] dark:text-[#ffdee2]">{searchQuery}</span>
              </p>
              {!loading && !error && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {t.resultsCount(results.length)}
                </p>
              )}
            </div>

            {results.length > 0 && (
              <div className="relative mt-4 sm:mt-0">
                {/* Filter UI can be added here if needed */}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-8">
            <div className="flex flex-col items-center text-center max-w-md mx-auto">
              <div className="w-24 h-24 text-red-500 dark:text-red-400 mb-6">
                <Search className="w-full h-full" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                {t.errorText}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                {error}
              </p>
              <p className="text-neutral-500 dark:text-neutral-500 mb-6">
                {t.tryLater}
              </p>

              <div className="w-full max-w-sm mt-4">
                <form onSubmit={handleNewSearch} className="flex items-center">
                  <input
                    type="text"
                    value={newQuery}
                    onChange={(e) => setNewQuery(e.target.value)}
                    className="flex-grow py-2 px-4 border border-neutral-300 dark:border-neutral-600 rounded-l-md bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#a90013] focus:border-transparent"
                    placeholder={t.searchPlaceholder}
                  />
                  <button
                    type="submit"
                    className="bg-[#a90013] hover:bg-[#8a0010] text-white py-2 px-4 rounded-r-md font-medium transition-colors"
                  >
                    {t.searchButton}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-neutral-800 rounded-lg shadow-sm">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-neutral-200 dark:border-neutral-700"></div>
              <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-[#a90013] animate-spin"></div>
            </div>
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400">{t.loading}</p>
          </div>
        ) : (
          <>
            {!error && results.length === 0 && searchQuery && (
              <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-8">
                <div className="flex flex-col items-center text-center max-w-md mx-auto">
                  <div className="w-24 h-24 text-neutral-300 dark:text-neutral-600 mb-6">
                    <Search className="w-full h-full" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                    {t.noResults}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    {t.tryAgain}
                  </p>

                  <div className="w-full max-w-sm mt-4">
                    <form onSubmit={handleNewSearch} className="flex items-center">
                      <input
                        type="text"
                        value={newQuery}
                        onChange={(e) => setNewQuery(e.target.value)}
                        className="flex-grow py-2 px-4 border border-neutral-300 dark:border-neutral-600 rounded-l-md bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#a90013] focus:border-transparent"
                        placeholder={t.searchPlaceholder}
                      />
                      <button
                        type="submit"
                        className="bg-[#a90013] hover:bg-[#8a0010] text-white py-2 px-4 rounded-r-md font-medium transition-colors"
                      >
                        {t.searchButton}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {filteredResults.length > 0 && (
              <div className="space-y-4">
                {filteredResults.map((result) => (
                  <Link
                    key={result.id}
                    href={result.url}
                    className="block bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
                  >
                    <div className="flex flex-col sm:flex-row h-full">
                      {result.image && (
                        <div className="sm:w-48 h-40 relative overflow-hidden">
                          <Image
                            src={result.image}
                            alt={result.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      )}

                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white px-2.5 py-1 rounded-full bg-[#a90013] dark:bg-[#a90013]/80">
                            {getIconForType(result.type)}
                            {t.contentTypes[result.type as keyof typeof t.contentTypes]}
                          </span>

                          {result.category && (
                            <span className="text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700 px-2.5 py-1 rounded-full">
                              {result.category}
                            </span>
                          )}

                          {result.date && (
                            <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center ml-auto">
                              <Clock className="w-3 h-3 mr-1" />
                              {locale === 'tr'
                                ? result.date.includes(',') ? result.date : formatDateTurkish(result.date)
                                : result.date.includes(',') ? result.date : formatDateEnglish(result.date)
                              }
                            </span>
                          )}
                        </div>

                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-[#a90013] dark:group-hover:text-[#ffdee2] transition-colors">
                          {result.title}
                        </h2>

                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2 flex-grow">
                          {result.excerpt}
                        </p>

                        {result.tags && result.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {result.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700 px-2 py-0.5 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-700">
                          <span className="text-sm text-[#a90013] dark:text-[#ffdee2] font-medium flex items-center">
                            {locale === 'tr' ? 'Ayrıntıları Görüntüle' : 'View Details'}
                            <ArrowLeft className="w-4 h-4 ml-1 rotate-180 transform group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function SearchPage({ params }: SearchPageProps) {
  const [locale, setLocale] = useState<string>('tr');

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setLocale(resolvedParams.locale || 'tr');
    };
    resolveParams();
  }, [params]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent locale={locale} />
    </Suspense>
  );
}
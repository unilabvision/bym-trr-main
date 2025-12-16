// app/components/pages/blog/BlogPage.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Tag } from 'lucide-react';
import CategoryFilter from './CategoryFilter';
import BlogCard from './BlogCard';
import FeaturedBlogCard from './FeaturedBlogCard';
import SearchBar from './SearchBar';
import { BlogPost } from '@/app/types/blog';
import { useRouter } from 'next/navigation';

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

interface BlogPageProps {
  content: {
    title: string;
    description: string;
    categories: string[];
    posts: BlogPost[];
    featured: BlogPost[];
  };
  locale: string;
}

const BlogPage: React.FC<BlogPageProps> = ({ content, locale }) => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Format dates for all posts
  const postsWithFormattedDates = useMemo(() => {
    return content.posts.map(post => ({
      ...post,
      formattedDate: formatDate(post.date, locale)
    }));
  }, [content.posts, locale]);

  // Format dates for featured posts
  const featuredPostsWithFormattedDates = useMemo(() => {
    return content.featured.map(post => ({
      ...post,
      formattedDate: formatDate(post.date, locale)
    }));
  }, [content.featured, locale]);

  // Initialize category from URL hash when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1);
      if (hash && content.categories.includes(hash)) {
        setActiveCategory(hash);
      }
    }
  }, [content.categories]);

  // Update URL hash when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const newHash = category === 'all' ? '' : `#${category}`;
    router.push(`/${locale}/blog${newHash}`, { scroll: false });
  };
  
  // Filter by category and search
  const filteredPosts = useMemo(() => {
    let filtered = [...postsWithFormattedDates];
    
    // Apply category filter first
    if (activeCategory !== 'all') {
      filtered = filtered.filter(post => post.category === activeCategory);
    }
    
    // Then apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    return filtered;
  }, [postsWithFormattedDates, activeCategory, searchQuery]);
  
  return (
    <div>
      {/* Search Bar */}
      <div className="container mx-auto">
        <div>
          <SearchBar onSearch={setSearchQuery} locale={locale} />
        </div>
      </div>
      
      <div className="container mx-auto py-12">
        {/* Featured Blog Posts */}
        {featuredPostsWithFormattedDates.length > 0 && !searchQuery && activeCategory === 'all' && (
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#141414] dark:text-white">
                {locale === 'tr' ? 'Öne Çıkan Araştırmalar' : 'Featured Research'}
              </h2>
              <div className="w-12 h-px bg-[#a90013] mt-2 mb-4"></div>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
                {locale === 'tr' 
                  ? 'Biyomühendislik alanındaki en güncel ve önemli çalışmalar.' 
                  : 'Our most current and important work in the field of bioengineering.'}
              </p>
            </div>
            
            <div className="space-y-8">
              {featuredPostsWithFormattedDates.map((post) => (
                <FeaturedBlogCard key={post.id} post={post} locale={locale} />
              ))}
            </div>
          </section>
        )}
        
        {/* All Blog Posts */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#141414] dark:text-white">
              {locale === 'tr' ? 'Tüm Yazılar' : 'All Posts'}
            </h2>
            <div className="w-12 h-px bg-[#a90013] mt-2 mb-4"></div>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
              {locale === 'tr' 
                ? 'Biyomühendislik alanındaki tüm araştırmalarımız ve makalelerimiz.' 
                : 'All our research and articles in the field of bioengineering.'}
            </p>
          </div>
          
          {/* Category Filter with hash navigation */}
          <CategoryFilter 
            categories={content.categories} 
            activeCategory={activeCategory} 
            onChange={handleCategoryChange}
            locale={locale}
          />
          
          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/5 dark:bg-black/5 rounded-lg">
              <Tag className="w-12 h-12 mx-auto text-neutral-400 dark:text-neutral-500 mb-4" />
              <h3 className="text-xl font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {locale === 'tr' ? 'Sonuç Bulunamadı' : 'No Results Found'}
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400">
                {locale === 'tr' 
                  ? 'Aramanıza veya seçtiğiniz kategoriye uygun yazı bulunamadı. Lütfen başka bir arama yapın veya kategori seçin.' 
                  : 'No posts matching your search or selected category. Please try another search or category.'}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default BlogPage;
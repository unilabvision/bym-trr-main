// app/components/pages/blog/FeaturedBlogCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/app/types/blog';

interface FeaturedBlogCardProps {
  post: BlogPost;
  locale: string;
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

const FeaturedBlogCard: React.FC<FeaturedBlogCardProps> = ({ post, locale }) => {
  const postUrl = `/${locale}/blog/${post.slug}`;
  
  // Format the post date
  const formattedDate = formatDate(post.date, locale);
  
  // Default image for posts with missing images
  const defaultImage = "/blog/default-image.webp";
  
  return (
    <div className="group relative cursor-pointer bg-white dark:bg-[#1a1a1a] rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#a90013]">
      {/* Link covering the entire article */}
      <Link href={postUrl} className="absolute inset-0 z-10">
        <span className="sr-only">{post.title}</span>
      </Link>
      
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image section with hover effects */}
        <div className="relative h-full overflow-hidden">
          <Image 
            src={post.image || defaultImage} 
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Gradient overlay that darkens on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          
          {/* Category label */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-[#a90013] text-white px-3 py-1 text-xs font-medium rounded-md transform group-hover:scale-105 transition-transform duration-300">
              {post.category}
            </span>
          </div>
        </div>
        
        {/* Content section with hover animations */}
        <div className="p-6 relative flex flex-col">
          {/* Animated line that appears when hovering */}
          <div className="absolute left-0 top-0 w-0 h-1 bg-[#a90013] group-hover:w-full transition-all duration-500"></div>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-neutral-500 dark:text-neutral-400 text-sm flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {formattedDate}
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 text-sm flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {post.readingTime || (locale === 'tr' ? '5 dk' : '5 min')}
            </span>
          </div>
          
          <h3 className="text-xl font-medium text-[#141414] dark:text-white mb-3 group-hover:text-[#a90013] dark:group-hover:text-[#ffdee2] transition-colors duration-300">
            {post.title}
          </h3>
          
          {/* Excerpt that grows slightly in height on hover */}
          <div className="mb-6 flex-grow">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              {post.excerpt}
            </p>
          </div>
          
          <div className="flex items-center justify-between mb-4 z-20 pointer-events-auto">
            <div className="flex items-center">
              <Image 
                src={post.author?.avatar || "/blog/authors/default.webp"} 
                alt={post.author?.name || "Author"} 
                width={32} 
                height={32} 
                className="rounded-full mr-2" 
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {post.author?.name || (locale === 'tr' ? "BYM Türkiye" : "BYM Turkey")}
              </span>
            </div>
          </div>
          
          {/* Tags section with hover effects */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags && post.tags.slice(0, 3).map((tag, index) => (
              <Link 
                key={index}
                href={`/${locale}/blog?tag=${encodeURIComponent(tag)}`}
                className="bg-[#ffdee2]/30 text-[#a90013] dark:bg-[#a90013]/10 dark:text-[#ffdee2] px-2 py-1 text-xs rounded-md z-20 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {tag}
              </Link>
            ))}
          </div>
          
          {/* Read more button with animated arrow */}
          <div className="mt-auto relative z-20 pointer-events-none">
            <span className="text-[#a90013] dark:text-[#ffdee2] text-sm font-medium inline-flex items-center">
              <span>{locale === 'tr' ? 'Devamını Oku' : 'Read More'}</span>
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogCard;
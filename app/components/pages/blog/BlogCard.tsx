// app/components/pages/blog/BlogCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogPost } from '@/app/types/blog';

interface BlogCardProps {
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

const BlogCard: React.FC<BlogCardProps> = ({ post, locale }) => {
  // Format the post date
  const formattedDate = formatDate(post.date, locale);
  
  return (
    <div className="group bg-white dark:bg-[#1a1a1a] rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#a90013] flex flex-col h-full">
      {/* Image section with hover effects */}
      <Link href={`/${locale}/blog/${post.slug}`} className="block aspect-[16/9] relative overflow-hidden">
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
        
        {/* Date that moves up slightly on hover - USING FORMATTED DATE */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 text-xs rounded-md transform group-hover:translate-y-[-4px] transition-all duration-300">
            {formattedDate}
          </span>
        </div>
      </Link>
      
      {/* Content section */}
      <div className="p-5 flex flex-col flex-grow">
        <Link href={`/${locale}/blog/${post.slug}`} className="block">
          <h3 className="text-lg font-medium text-[#141414] dark:text-white mb-3 group-hover:text-[#a90013] dark:group-hover:text-[#ffdee2] transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>
        
        <Link 
          href={`/${locale}/blog/${post.slug}`} 
          className="text-[#a90013] dark:text-[#ffdee2] text-sm font-medium inline-flex items-center mt-auto"
        >
          <span>{locale === 'tr' ? 'Devamını Oku' : 'Read More'}</span>
          <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
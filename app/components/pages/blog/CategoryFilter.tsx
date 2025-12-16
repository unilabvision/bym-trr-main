// app/components/pages/blog/CategoryFilter.tsx
import React from 'react';
import Link from 'next/link';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
  locale: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  activeCategory, 
  onChange, 
  locale 
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-12">
      <Link 
        href={`/${locale}/blog`}
        onClick={(e) => {
          e.preventDefault();
          onChange('all');
        }}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          activeCategory === 'all'
            ? 'bg-[#a90013] text-white dark:bg-[#a90013] dark:text-white'
            : 'bg-[#ffdee2]/50 text-[#141414] dark:bg-neutral-800 dark:text-neutral-300 hover:bg-[#ffdee2] dark:hover:bg-neutral-700'
        }`}
      >
        {locale === 'tr' ? 'Tümü' : 'All'}
      </Link>
      
      {categories.map((category, index) => (
        <Link
          key={index}
          href={`/${locale}/blog#${category}`}
          onClick={(e) => {
            e.preventDefault();
            onChange(category);
          }}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeCategory === category
              ? 'bg-[#a90013] text-white dark:bg-[#a90013] dark:text-white'
              : 'bg-[#ffdee2]/50 text-[#141414] dark:bg-neutral-800 dark:text-neutral-300 hover:bg-[#ffdee2] dark:hover:bg-neutral-700'
          }`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
};

export default CategoryFilter;
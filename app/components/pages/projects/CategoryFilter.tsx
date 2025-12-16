// app/components/pages/projects/CategoryFilter.tsx
import React from 'react';

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
      <button 
        onClick={() => onChange('all')}
        className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
          activeCategory === 'all'
            ? 'bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-900'
            : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
        }`}
      >
        {locale === 'tr' ? 'Tümü' : 'All'}
      </button>
      
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => onChange(category)}
          className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
            activeCategory === category
              ? 'bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-900'
              : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
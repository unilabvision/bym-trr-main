// app/components/pages/blog/SearchBar.tsx
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  locale: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, locale }) => {
  const [query, setQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };
  
  return (
    <div className="w-full mb-8 relative">
      {/* Animated background effect */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#ffdee2]/20 rounded-full blur-3xl -z-10"></div>
      
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="relative flex-grow flex items-center">
          <div className="absolute left-4">
            <Search className="h-4 w-4 text-[#a90013]" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={locale === 'tr' ? 'Blog yazılarında ara...' : 'Search blog posts...'}
            className="w-full py-3 pl-12 pr-4 bg-white dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-700 rounded-md text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#a90013] dark:focus:ring-[#ffdee2] placeholder-neutral-400"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="relative ml-4 group">
          <div className="absolute -inset-0.5  opacity-50 group-hover:opacity-100 transition duration-500"></div>
          <button
            type="submit"
            className="relative bg-[#a90013] hover:bg-[#8a0010] dark:bg-[#a90013] dark:hover:bg-[#8a0010] text-white py-3 px-6 rounded-md font-medium transform group-hover:translate-y-[-2px] transition-all duration-300"
          >
            {locale === 'tr' ? 'Ara' : 'Search'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
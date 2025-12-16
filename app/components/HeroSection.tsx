// components/HeroSection.tsx
import React from 'react';
import Button from './ui/Button';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

// Locale parametresi ekleyin
interface HeroSectionProps {
  locale: string;
}

async function getHeroContent(locale: string) {
  const { data, error } = await supabase
    .from('hero_content')
    .select('*')
    .eq('locale', locale)
    .single();

  if (error) {
    console.error('Error fetching hero content:', error);
    
    // Eğer istenen dilde içerik yoksa varsayılan dile geri dön
    if (locale !== 'tr') {
      return getHeroContent('tr');
    }
    
    throw error;
  }

  return data;
}

export default async function HeroSection({ locale }: HeroSectionProps) {
  const content = await getHeroContent(locale);

  return (
    <section className="py-16 lg:py-20 relative">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <div>
              <span className="bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 px-4 py-1.5 text-xs font-medium tracking-wider inline-block">
                {content.badge}
              </span>
            </div>

            <div>
              <h1 className="text-3xl lg:text-4xl font-medium text-neutral-900 dark:text-neutral-100 leading-tight mb-3">
                {content.title}{' '}
                <span className="text-neutral-500 dark:text-neutral-400">
                  {content.title_highlight}
                </span>
                <br />
                {content.subtitle}
              </h1>
              <div className="w-16 h-px bg-neutral-300 dark:bg-neutral-700"></div>
            </div>

            <p className="text-md text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
              {content.description}
            </p>

            <div className="pt-2">
              <ul className="space-y-2">
                {content.features.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 mt-1.5 bg-neutral-200 dark:bg-neutral-700 h-1 w-1 rounded-full"></div>
                    <span className="text-md text-neutral-600 dark:text-neutral-400">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                variant="primary"
                icon={false}
                className="bg-neutral-800 hover:bg-neutral-900 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white border-0 rounded-sm py-3 px-8 text-md font-medium flex items-center"
              >
                {content.primary_button} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500 rounded-sm py-3 px-8 text-md font-medium flex items-center"
              >
                <Play className="mr-2 w-4 h-4" /> {content.secondary_button}
              </Button>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="relative z-10 bg-neutral-50 dark:bg-neutral-800 rounded-sm overflow-hidden shadow-lg p-8 border-l-2 border-neutral-200 dark:border-neutral-700">
                <div className="aspect-video bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center rounded-sm mb-6">
                  <Image 
                    src="/unidev-software-features-1.webp" 
                    alt="Software Features" 
                    fill 
                    className="object-cover" 
                  />
                </div>

                <div className="space-y-4">
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded-sm w-3/4"></div>
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded-sm w-full"></div>
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded-sm w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
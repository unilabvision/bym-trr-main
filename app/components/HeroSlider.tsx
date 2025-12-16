'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight, Pause, Play } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/database.types';

// Slide content type definition
interface SlideContent {
  id: number;
  title: string;
  subtitle: string | null;
  description: string;
  button_text: string;
  button_link: string;
  secondary_button_text: string | null;
  secondary_button_link: string | null;
  image_url: string;
}

// Default slides in case database fetch fails
const defaultSlides: SlideContent[] = [
  {
    id: 1,
    title: "UNILAB Vision",
    subtitle: "Geleceğe Bakış",
    description: "Yenilikçi yazılım çözümlerimizle işletmenizi dijital dönüşüm yolculuğunda destekliyoruz. Modern teknolojilerle geleceği şekillendiriyoruz.",
    button_text: "Keşfedin",
    button_link: "/vision",
    secondary_button_text: "İzle",
    secondary_button_link: "/demo",
    image_url: "/unidev-software-hero.webp",
  },
  {
    id: 2,
    title: "UNIDEV",
    subtitle: "Yazılım Çözümleri",
    description: "Modern teknolojilerle geliştirilen, ölçeklenebilir ve güvenli yazılım projeleri ile işinizi bir adım öteye taşıyın.",
    button_text: "Projelerimiz",
    button_link: "/projects",
    secondary_button_text: "Nasıl Çalışırız",
    secondary_button_link: "/methodology",
    image_url: "/unidev-software-hero-2.webp",
  },
  {
    id: 3,
    title: "Teknoloji ile İş Süreçlerinizi",
    subtitle: "Dönüştürün",
    description: "İşletmenize özel çözümlerle verimliliğinizi artırın, maliyetlerinizi azaltın ve rekabet avantajı elde edin.",
    button_text: "İletişime Geçin",
    button_link: "/contact",
    secondary_button_text: null,
    secondary_button_link: null,
    image_url: "/unidev-software-hero-3.webp",
  }
];

const TRANSITION_DURATION = 800;
const AUTOPLAY_INTERVAL = 6000;

interface HeroSliderProps {
  locale: string;
}

const HeroSlider = ({ locale = 'tr' }: HeroSliderProps) => {
  const [slides, setSlides] = useState<SlideContent[]>(defaultSlides);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const supabase = createClientComponentClient<Database>();
  // Ref for isPaused to be used in effects
  const isPausedRef = useRef(isPaused);

  // Update ref when isPaused changes
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Fetch slides from database
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setIsLoading(true);
        
        // First try to get slides for the specified locale
        // eslint-disable-next-line prefer-const
        let { data: localeSlides, error: localeError } = await supabase
          .from('hero_slides')
          .select('*')
          .eq('locale', locale)
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (localeError) throw localeError;

        // If no slides for the specified locale, fall back to default locale (tr)
        if (!localeSlides || localeSlides.length === 0) {
          const { data: defaultLocaleSlides, error: defaultError } = await supabase
            .from('hero_slides')
            .select('*')
            .eq('locale', 'tr')
            .eq('is_active', true)
            .order('sort_order', { ascending: true });

          if (defaultError) throw defaultError;
          localeSlides = defaultLocaleSlides;
        }

        // If we still have no slides, use the default ones
        if (!localeSlides || localeSlides.length === 0) {
          setSlides(defaultSlides);
        } else {
          setSlides(localeSlides);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching hero slides:', err);
        setError('Failed to load slides. Showing default content.');
        setSlides(defaultSlides);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, [locale, supabase]);

  // Set full height
  useEffect(() => {
    const setInitialHeight = () => {
      if (sliderRef.current) {
        sliderRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    setInitialHeight();
    window.addEventListener('resize', setInitialHeight);
    
    return () => {
      window.removeEventListener('resize', setInitialHeight);
    };
  }, []);

  // Transition animation
  const handleTransition = useCallback((index: number) => {
    if (isTransitioning || index === activeIndex || !slides.length) return;
    
    setIsTransitioning(true);
    setActiveIndex(index);
    
    setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION / 2);
  }, [isTransitioning, activeIndex, slides.length]);

  // Next slide
  const handleNext = useCallback(() => {
    if (!slides.length) return;
    const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
    handleTransition(nextIndex);
  }, [activeIndex, slides.length, handleTransition]);

  // Previous slide
  const handlePrev = useCallback(() => {
    if (!slides.length) return;
    const prevIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    handleTransition(prevIndex);
  }, [activeIndex, slides.length, handleTransition]);

  // Autoplay
  useEffect(() => {
    if (!slides.length) return;
    
    const autoplayTimer = setInterval(() => {
      if (!isPausedRef.current) {
        handleNext();
      }
    }, AUTOPLAY_INTERVAL);
    
    return () => clearInterval(autoplayTimer);
  }, [handleNext, slides.length]);

  // Touch navigation handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!slides.length) return;
    
    if (touchStart - touchEnd > 75) {
      handleNext();
    }
    
    if (touchStart - touchEnd < -75) {
      handlePrev();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === ' ' || e.key === 'Spacebar') setIsPaused(prev => !prev);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Progress bar animation
  const ProgressBar = () => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
      if (slides.length === 0) return;
      
      setProgress(0);
      
      const animationFrame = requestAnimationFrame(() => {
        const startTime = Date.now();
        
        const updateProgress = () => {
          // Use ref value instead of the state directly
          if (isPausedRef.current) return;
          
          const elapsed = Date.now() - startTime;
          const calculatedProgress = (elapsed / AUTOPLAY_INTERVAL) * 100;
          
          if (calculatedProgress <= 100) {
            setProgress(calculatedProgress);
            requestAnimationFrame(updateProgress);
          }
        };
        
        updateProgress();
      });
      
      return () => cancelAnimationFrame(animationFrame);
    }, []); // Empty dependency array as we're using ref
    
    return (
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-800/50">
        <div 
          className="h-full bg-neutral-300 transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  if (isLoading) {
    return (
      <div 
        ref={sliderRef}
        className="relative w-full max-w-screen overflow-hidden bg-neutral-950 mx-auto flex items-center justify-center"
      >
        <div className="animate-pulse text-neutral-400">Loading slides...</div>
      </div>
    );
  }

  if (error) {
    console.warn(error);
  }

  if (!slides.length) {
    return (
      <div 
        ref={sliderRef}
        className="relative w-full max-w-screen overflow-hidden bg-neutral-950 mx-auto flex items-center justify-center"
      >
        <div className="text-neutral-400">No slides available</div>
      </div>
    );
  }

  return (
    <div 
      ref={sliderRef}
      className="relative w-full max-w-screen overflow-hidden bg-neutral-950 mx-auto group"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider container */}
      <div className="h-full relative">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-${TRANSITION_DURATION} ease-out ${
              index === activeIndex 
                ? 'opacity-100 z-10 scale-100' 
                : 'opacity-0 z-0 scale-105'
            }`}
            aria-hidden={index !== activeIndex}
          >
            {/* Image */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={slide.image_url}
                alt={slide.title}
                fill
                priority={index === activeIndex}
                className={`object-cover transition-transform duration-${TRANSITION_DURATION * 1.5} ${
                  index === activeIndex ? 'scale-100' : 'scale-110'
                }`}
                unoptimized
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/75 to-neutral-900/40" />
            </div>

            {/* Content area */}
            <div className="relative z-20 flex h-full items-center justify-start text-left">
              <div className="max-w-[1470px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
                <div className="max-w-md lg:max-w-xl">
                  {/* Subtitle */}
                  {slide.subtitle && (
                    <div className="overflow-hidden mb-2">
                      <p className={`text-sm sm:text-base uppercase tracking-widest font-light text-neutral-300 text-shadow-md ${
                        index === activeIndex ? 'animate-slideInFromBottom' : ''
                      }`}>
                        {slide.subtitle}
                      </p>
                    </div>
                  )}
                  
                  {/* Title */}
                  <div className="overflow-hidden mb-2 sm:mb-3">
                    <h2 className={`font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-neutral-100 text-shadow-md ${
                      index === activeIndex ? 'animate-slideInFromBottom animation-delay-100' : ''
                    }`}>
                      {slide.title}
                    </h2>
                  </div>
                  
                  {/* Description */}
                  <div className="overflow-hidden mb-6 sm:mb-8">
                    <p className={`text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-md text-neutral-200 text-shadow-md ${
                      index === activeIndex ? 'animate-slideInFromBottom animation-delay-200' : ''
                    }`}>
                      {slide.description}
                    </p>
                  </div>
                  
                  {/* Buttons */}
                  <div className={`flex flex-wrap gap-4 ${
                    index === activeIndex ? 'animate-fadeIn animation-delay-300' : 'opacity-0'
                  }`}>
                    {/* Primary button */}
                    <a
                      href={slide.button_link}
                      className="inline-flex items-center justify-center px-5 py-2.5 text-sm sm:text-base font-medium text-neutral-100 bg-neutral-800 hover:bg-neutral-700 transition-all duration-300 group relative overflow-hidden shadow-lg"
                    >
                      <span className="absolute inset-0 w-0 bg-neutral-100 group-hover:w-full transition-all duration-500 ease-out z-0 opacity-10"></span>
                      <span className="relative z-10 flex items-center">
                        {slide.button_text}
                        <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </a>
                    
                    {/* Secondary button */}
                    {slide.secondary_button_text && (
                      <a
                        href={slide.secondary_button_link || '#'}
                        className="inline-flex items-center justify-center px-5 py-2.5 text-sm sm:text-base font-medium bg-transparent border border-neutral-300 text-neutral-200 hover:bg-neutral-200 hover:text-neutral-900 transition-all duration-300 group"
                      >
                        {slide.secondary_button_text}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Progress bar */}
        <ProgressBar />
      </div>

      {/* Slide info and navigation dots */}
      <div className="absolute bottom-6 left-0 z-30 flex justify-left gap-3 px-6">
        <div className="flex items-center gap-3 bg-neutral-900/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
          {/* Active slide info */}
          <span className="text-xs text-neutral-300/80 font-medium">
            {(activeIndex + 1).toString().padStart(2, '0')}/{slides.length.toString().padStart(2, '0')}
          </span>
          
          {/* Navigation dots */}
          <div className="flex gap-1.5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleTransition(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex 
                    ? 'bg-neutral-200 w-6 h-1.5' 
                    : 'bg-neutral-400/40 w-1.5 h-1.5 hover:bg-neutral-400/60'
                }`}
                aria-label={`Slide ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-xs font-light text-neutral-300 mb-1">
            {locale === 'tr' ? 'Keşfedin' : 'Explore'}
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-neutral-300"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Desktop navigation buttons */}
      <div className="hidden md:block">
        <button
          onClick={handlePrev}
          className="absolute left-8 top-1/2 z-30 -translate-y-1/2 bg-neutral-900/30 hover:bg-neutral-800/50 text-neutral-200 rounded-full p-4 transition-all duration-300 opacity-60 hover:opacity-100 focus:opacity-100 shadow-lg"
          aria-label={locale === 'tr' ? 'Önceki slide' : 'Previous slide'}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-8 top-1/2 z-30 -translate-y-1/2 bg-neutral-900/30 hover:bg-neutral-800/50 text-neutral-200 rounded-full p-4 transition-all duration-300 opacity-60 hover:opacity-100 focus:opacity-100 shadow-lg"
          aria-label={locale === 'tr' ? 'Sonraki slide' : 'Next slide'}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Play/Pause button */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute bottom-6 right-6 z-30 bg-neutral-900/30 hover:bg-neutral-800/50 text-neutral-200 rounded-full p-2 transition-all duration-300 opacity-60 hover:opacity-100 focus:opacity-100"
        aria-label={isPaused ? (locale === 'tr' ? "Oynat" : "Play") : (locale === 'tr' ? "Durdur" : "Pause")}
      >
        {isPaused ? (
          <Play className="w-4 h-4" />
        ) : (
          <Pause className="w-4 h-4" />
        )}
      </button>
      
      {/* Keyframes animations */}
      <style jsx global>{`
        @keyframes slideInFromBottom {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-slideInFromBottom {
          animation: slideInFromBottom 1.2s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 1.5s ease-in-out forwards;
        }

        .animation-delay-100 {
          animation-delay: 0.2s;
        }

        .animation-delay-200 {
          animation-delay: 0.4s;
        }

        .animation-delay-300 {
          animation-delay: 0.6s;
        }

        .group:hover .group-hover\\:opacity-100 {
          opacity: 1;
          transition: opacity 0.5s ease;
        }

        /* Improved softer text shadow */
        .text-shadow-md {
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
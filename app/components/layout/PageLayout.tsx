// app/components/layout/PageLayout.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  locale: string;
  breadcrumbs?: BreadcrumbItem[];
  bgImage?: string;
}

export default function PageLayout({
  children,
  title,
  description,
  locale,
  breadcrumbs,
  bgImage
}: PageLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Banner Section */}
      <div 
        className="relative bg-neutral-900 py-28 lg:py-32"
        style={bgImage ? { 
          backgroundImage: `linear-gradient(to right, rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.7)), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : {}}
      >
        <div className="container mx-auto px-6 sm:px-2 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
          {/* Breadcrumbs */}
          {breadcrumbs && (
            <nav className="flex mb-8" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href={`/${locale}`} className="text-neutral-400 hover:text-neutral-200 transition flex items-center">
                    <ArrowLeft className="w-3 h-3 mr-1" />
                    {locale === 'tr' ? 'Ana Sayfa' : 'Home'}
                  </Link>
                </li>
                {breadcrumbs.map((item, index) => (
                  <li key={index}>
                    <div className="flex items-center">
                      <ChevronRight className="w-4 h-4 text-neutral-500" />
                      {index === breadcrumbs.length - 1 ? (
                        <span className="ml-1 text-sm font-medium text-neutral-300 md:ml-2">{item.name}</span>
                      ) : (
                        <Link href={item.href} className="ml-1 text-sm text-neutral-400 hover:text-neutral-200 transition md:ml-2">
                          {item.name}
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Title and Description */}
          <div className="max-w-3xl">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-white mb-6">{title}</h1>
            {description && (
              <p className="text-lg text-neutral-300 leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 lg:py-16">
        <div className="container mx-auto px-6 sm:px-2 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
          {children}
        </div>
      </div>
    </div>
  );
}
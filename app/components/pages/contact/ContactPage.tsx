// app/components/pages/contact/ContactPage.tsx
import React from 'react';
import { Phone, Mail, Users, Share2} from 'lucide-react';
import ContactForm from './ContactForm';
import content from './content';

interface ContactPageProps {
  locale: string;
}

export default function ContactPage({ locale }: ContactPageProps) {
  // Get appropriate content for the current locale
  const t = locale in content ? content[locale as keyof typeof content] : content.tr;

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        {/* Left Column - Contact Information */}
        <div className="lg:col-span-1 space-y-8">
          {/* Main Contact Info */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-[#a90013] dark:hover:border-[#a90013] transition-all duration-300 p-8">
            <h2 className="text-xl font-semibold text-[#141414] dark:text-white mb-6">
              {t.contactInfoTitle}
            </h2>
            
            <div className="space-y-6">
              
              {/* Phone */}
              <div>
                <h3 className="font-medium text-[#141414] dark:text-neutral-200 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-[#a90013]" />
                  {t.phoneTitle}
                </h3>
                <a 
                  href={`tel:${t.phoneNumber.replace(/[^0-9+]/g, '')}`}
                  className="text-neutral-600 dark:text-neutral-400 hover:text-[#a90013] dark:hover:text-[#ffdee2] transition-colors pl-6 block"
                >
                  {t.phoneNumber}
                </a>
              </div>
              
              {/* Email */}
              <div>
                <h3 className="font-medium text-[#141414] dark:text-neutral-200 mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-[#a90013]" />
                  {t.emailTitle}
                </h3>
                <a 
                  href={`mailto:${t.emailAddress}`}
                  className="text-neutral-600 dark:text-neutral-400 hover:text-[#a90013] dark:hover:text-[#ffdee2] transition-colors pl-6 block"
                >
                  {t.emailAddress}
                </a>
              </div>
            </div>
          </div>

          {/* Community Section */}
          <div className="bg-[#ffdee2]/10 dark:bg-neutral-800/50 rounded-xl border border-[#ffdee2]/20 dark:border-neutral-700 p-8">
            <h3 className="font-semibold text-[#141414] dark:text-white mb-3 flex items-center">
              <Users className="w-5 h-5 mr-2 text-[#a90013]" />
              {t.communityTitle}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              {t.communityText}
            </p>
          </div>

          {/* Social Media Section */}
          <div className="bg-gradient-to-br from-[#a90013]/10 to-transparent dark:from-[#a90013]/20 rounded-xl border border-[#a90013]/20 dark:border-[#a90013]/30 p-8">
            <h3 className="font-semibold text-[#141414] dark:text-white mb-4 flex items-center">
              <Share2 className="w-5 h-5 mr-2 text-[#a90013]" />
              {t.socialMediaTitle}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              {t.followUs}
            </p>
            <div className="flex space-x-3">
              {/* X (Twitter) */}
              <a 
                href={t.socialLinks.twitter}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white dark:bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-200 dark:border-neutral-700 hover:border-[#a90013] hover:text-[#a90013] text-neutral-600 dark:text-neutral-300 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              {/* Instagram */}
              <a 
                href={t.socialLinks.instagram}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white dark:bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-200 dark:border-neutral-700 hover:border-[#a90013] hover:text-[#a90013] text-neutral-600 dark:text-neutral-300 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a 
                href={t.socialLinks.linkedin}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white dark:bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-200 dark:border-neutral-700 hover:border-[#a90013] hover:text-[#a90013] text-neutral-600 dark:text-neutral-300 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Right Column - Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm locale={locale} />
        </div>
      </div>
    </div>
  );
}
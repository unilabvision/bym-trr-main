// app/components/pages/projects/ProjectsPage.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { Tag } from 'lucide-react';
import { ProjectsContent } from './content';
import CategoryFilter from './CategoryFilter';
import ProjectCard from './ProjectCard';
import FeaturedProjectCard from './FeaturedProjectCard';

interface ProjectsPageProps {
  content: ProjectsContent;
  locale: string;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ content, locale }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Kategoriye göre filtreleme
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') {
      return content.projects;
    }
    return content.projects.filter(project => project.category === activeCategory);
  }, [content.projects, activeCategory]);
  
  return (
    <>
      {/* Öne Çıkan Projeler */}
      {content.featured.length > 0 && (
        <section className="mb-20">
          <div className="mb-12">
            <h2 className="text-3xl font-medium text-neutral-900 dark:text-neutral-100 mb-3">
              {locale === 'tr' ? 'Öne Çıkan Projeler' : 'Featured Projects'}
            </h2>
            <div className="w-16 h-px bg-neutral-300 dark:bg-neutral-700 mb-6"></div>
          </div>
          
          <div className="space-y-12">
            {content.featured.map((project) => (
              <FeaturedProjectCard key={project.id} project={project} locale={locale} />
            ))}
          </div>
        </section>
      )}
      
      {/* Tüm Projeler */}
      <section>
        <div className="mb-12">
          <h2 className="text-3xl font-medium text-neutral-900 dark:text-neutral-100 mb-3">
            {locale === 'tr' ? 'Tüm Projelerimiz' : 'All Projects'}
          </h2>
          <div className="w-16 h-px bg-neutral-300 dark:bg-neutral-700 mb-6"></div>
        </div>
        
        {/* Kategori Filtresi */}
        <CategoryFilter 
          categories={content.categories} 
          activeCategory={activeCategory} 
          onChange={setActiveCategory}
          locale={locale}
        />
        
        {/* Proje Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} />
          ))}
        </div>
        
        {/* Boş Sonuç */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Tag className="w-12 h-12 mx-auto text-neutral-400 dark:text-neutral-500 mb-4" />
            <h3 className="text-xl font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {locale === 'tr' ? 'Sonuç Bulunamadı' : 'No Results Found'}
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400">
              {locale === 'tr' 
                ? 'Bu kategoride henüz proje bulunmuyor. Lütfen başka bir kategori seçin.' 
                : 'There are no projects in this category yet. Please select another category.'}
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default ProjectsPage;
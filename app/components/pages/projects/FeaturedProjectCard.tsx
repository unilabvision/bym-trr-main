// app/components/pages/projects/FeaturedProjectCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Users } from 'lucide-react';
import { Project } from './content';

interface FeaturedProjectCardProps {
  project: Project;
  locale: string;
}

const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({ project, locale }) => {
  const projectUrl = `/${locale}/${locale === 'tr' ? 'projelerimiz' : 'projects'}/${project.slug}`;
  
  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 overflow-hidden group relative border-l-2 border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="h-full w-full aspect-[4/3] relative overflow-hidden">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <div className="p-8 flex flex-col">
          <div className="mb-auto">
            <div className="flex items-center mb-4">
              <span className="bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 px-3 py-1 text-xs font-medium tracking-wider inline-block">
                {project.category}
              </span>
              <span className="text-neutral-500 dark:text-neutral-400 text-sm ml-3 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {project.date}
              </span>
            </div>
            
            <h3 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100 mb-3">
              {project.title}
            </h3>
            
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              {project.description}
            </p>
            
            <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-6">
              <Users className="w-4 h-4 mr-1" />
              <span>{locale === 'tr' ? 'Müşteri:' : 'Client:'} {project.client}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 px-2 py-1 text-xs rounded-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <Link 
            href={projectUrl}
            className="flex items-center text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 group-hover:translate-x-1 transition-all duration-300"
          >
            {locale === 'tr' ? 'Projeyi İncele' : 'View Project'}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjectCard;
// app/components/pages/projects/ProjectCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { Project } from './content';

interface ProjectCardProps {
  project: Project;
  locale: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, locale }) => {
  const projectUrl = `/${locale}/${locale === 'tr' ? 'projelerimiz' : 'projects'}/${project.slug}`;
  
  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 overflow-hidden group relative border-l-2 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300">
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image 
          src={project.image} 
          alt={project.title} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-3 py-1 text-xs font-medium tracking-wider inline-block">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
            {project.title}
          </h3>
          <span className="text-neutral-500 dark:text-neutral-400 text-sm flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {project.date}
          </span>
        </div>
        
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span 
              key={index}
              className="bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 px-2 py-1 text-xs rounded-sm"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 px-2 py-1 text-xs rounded-sm">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        
        <Link 
          href={projectUrl}
          className="flex items-center text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 group-hover:translate-x-1 transition-all duration-300 text-sm"
        >
          {locale === 'tr' ? 'Detayları Gör' : 'View Details'}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
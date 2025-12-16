// app/components/pages/about/Team.tsx
import React from 'react';
import Image from 'next/image';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { TeamMember } from './content';

interface TeamProps {
  title: string;
  team: TeamMember[];
}

const Team: React.FC<TeamProps> = ({ title, team }) => {
  return (
    <section className="py-16 sm:py-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-[#141414] dark:text-white">
          {title}
        </h2>
        <div className="w-12 h-px bg-[#a90013] mt-2 mb-4"></div>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Biyomühendislik alanında uzman ekibimizle tanışın
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member) => (
          <div 
            key={member.id} 
            className="group relative bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#a90013]"
          >
            {/* Image container with overlay */}
            <div className="relative h-80 overflow-hidden">
              <Image 
                src={member.image} 
                alt={member.name} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
              
              {/* Social icons overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex justify-center space-x-4">
                  <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#a90013] transition-colors duration-300">
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#a90013] transition-colors duration-300">
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#a90013] transition-colors duration-300">
                    <Mail className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#141414] dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-[#a90013] dark:text-[#ffdee2] font-medium mb-3">
                {member.role}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
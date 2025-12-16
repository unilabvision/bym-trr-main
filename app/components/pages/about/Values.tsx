// app/components/pages/about/Values.tsx
import React from 'react';
import { Search, Users, Lightbulb, Globe, BookOpen, Target } from 'lucide-react';

interface Value {
  title: string;
  description: string;
  icon: string;
}

interface ValuesProps {
  title: string;
  values: Value[];
}

const renderIcon = (iconName: string) => {
  const iconClass = "w-6 h-6";
  
  switch (iconName) {
    case 'Search':
      return <Search className={iconClass} />;
    case 'Users':
      return <Users className={iconClass} />;
    case 'Lightbulb':
      return <Lightbulb className={iconClass} />;
    case 'Globe':
      return <Globe className={iconClass} />;
    case 'BookOpen':
      return <BookOpen className={iconClass} />;
    case 'Target':
      return <Target className={iconClass} />;
    default:
      return <Target className={iconClass} />;
  }
};

const Values: React.FC<ValuesProps> = ({ title, values }) => {
  return (
    <section className="py-16 sm:py-16">
      <div className="container mx-auto ">
        <div className="mb-12 text-left">
          <h2 className="text-3xl font-bold text-[#141414] dark:text-white mb-4">
            {title}
          </h2>
          <div className="w-16 h-px bg-[#a90013]  mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400 mx-auto ">
            BYM Türkiye olarak benimsediğimiz temel değerler
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div 
              key={index}
              className="group bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#a90013]"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#a90013]/10 rounded-lg flex items-center justify-center text-[#a90013] group-hover:bg-[#a90013] group-hover:text-white transition-all duration-300 flex-shrink-0">
                  {renderIcon(value.icon)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#141414] dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
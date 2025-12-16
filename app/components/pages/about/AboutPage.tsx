// app/components/pages/about/AboutPage.tsx
import React from 'react';
import { AboutContent } from './content';
import MissionVision from './MissionVision';
import Values from './Values';

interface AboutPageProps {
  content: AboutContent;
  locale: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ content, locale }) => {
  return (
    <>
      {/* Misyon & Vizyon */}
      <MissionVision 
        locale={locale}
        missionTitle={locale === 'tr' ? 'Misyonumuz' : 'Our Mission'}
        mission={content.mission}
        visionTitle={locale === 'tr' ? 'Vizyonumuz' : 'Our Vision'}
        vision={content.vision}
      />
      
      {/* Değerlerimiz */}
      <Values 
        title={locale === 'tr' ? 'Değerlerimiz' : 'Our Values'}
        values={content.values}
      />
      
     
    </>
  );
};

export default AboutPage;
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface AboutContent {
  title: string;
  description: string;
  mission: string;
  vision: string;
  values: Array<{
      title: string;
      description: string;
      icon: string;
  }>;
  history: Array<{
      year: string;
      title: string;
      description: string;
  }>;
  team: TeamMember[];
}

const content = {
  tr: {
      title: "Hakkımızda",
      description: "BYM Türkiye (Biyomühendislik Türkiye), biyomühendislik ve biyolojik bilimler alanlarında bilgi paylaşımını ve iş birliğini teşvik eden bir öğrenci topluluğudur. UNIDC ve UNILAB Vision'ın dinamik yapısı içinde yer alıyoruz.",
      mission: "Bilimsel farkındalığı artırmak, üretkenliği desteklemek ve ilham verici içerikler üreterek biyomühendislik alanında disiplinlerarası projeler geliştirmek.",
      vision: "Biyomühendislik ve biyolojik bilimler alanında öncü bir topluluk olarak, global ölçekte tanınan ve ilham veren bir platform olmak.",
      values: [
          {
              title: "Bilimsel Merak",
              description: "Bilimsel keşiflere olan tutkumuzla, sürekli öğrenme ve araştırma kültürünü teşvik ediyoruz.",
              icon: "Search"
          },
          {
              title: "İş Birliği",
              description: "Farklı disiplinlerden gelen üyelerimizle iş birliği yaparak yenilikçi projeler üretiyoruz.",
              icon: "Users"
          },
          {
              title: "İlham Vericilik",
              description: "Eğitici ve motive edici içerikler üreterek topluluğumuzu ve çevremizi güçlendiriyoruz.",
              icon: "Lightbulb"
          },
          {
              title: "Toplumsal Etki",
              description: "Bilimsel farkındalığı artırarak toplumda olumlu bir etki yaratmayı hedefliyoruz.",
              icon: "Globe"
          },
          {
              title: "Sürekli Gelişim",
              description: "Üyelerimizin kişisel ve profesyonel gelişimini desteklemek için mentorluk ve eğitim programları sunuyoruz.",
              icon: "BookOpen"
          }
      ],
      history: [
          {
              year: "Mayıs 2023",
              title: "Kuruluş",
              description: "BYM Türkiye, biyomühendislik öğrencileri tarafından bilimsel iş birliği vizyonuyla kuruldu."
          },
          {
              year: "Temmuz 2023",
              title: "Büyük Büyüme",
              description: "Biyomühendislik topluluğumuz hızlı şekilde büyüme katederek binlerce takipçili bir platform haline geldi."
          },
          {
              year: "2024",
              title: "İlk Bilimsel Proje",
              description: "Disiplinlerarası bir biyoteknoloji projesi başlattık ve ulusal yarışmada ödül kazandık."
          },
          {
              year: "2022",
              title: "Mentorluk Programı",
              description: "Öğrenciler ve profesyoneller arasında köprü kuran mentorluk programımızı başlattık."
          }
      ],
      team: [
          {
              id: 1,
              name: "Elif Yılmaz",
              role: "Başkan",
              image: "/team/president.webp",
              bio: "Biyomühendislik öğrencisi olarak topluluğumuzun vizyonunu yönlendiriyor."
          },
          {
              id: 2,
              name: "Ahmet Kaya",
              role: "Proje Koordinatörü",
              image: "/team/project-coordinator.webp",
              bio: "Disiplinlerarası projelerimizin yönetiminden sorumlu."
          },
          {
              id: 3,
              name: "Zeynep Demir",
              role: "İçerik Yöneticisi",
              image: "/team/content-manager.webp",
              bio: "Bilimsel bültenler ve sosyal medya içeriklerimizi üretiyor."
          },
          {
              id: 4,
              name: "Murat Şahin",
              role: "Etkinlik Koordinatörü",
              image: "/team/event-coordinator.webp",
              bio: "Seminerler ve atölye çalışmalarımızın organizasyonunu üstleniyor."
          }
      ]
  },
  en: {
      title: "About Us",
      description: "Bioengineering Community (BYM Türkiye) is a student organization dedicated to promoting knowledge sharing and collaboration in the fields of bioengineering and biological sciences. We operate within the dynamic structure of UNIDC and UNILAB Vision.",
      mission: "To increase scientific awareness, foster productivity, and develop interdisciplinary projects in bioengineering by producing inspiring content.",
      vision: "To become a globally recognized and inspiring platform as a leading community in bioengineering and biological sciences.",
      values: [
          {
              title: "Scientific Curiosity",
              description: "We foster a culture of continuous learning and research driven by our passion for scientific discovery.",
              icon: "Search"
          },
          {
              title: "Collaboration",
              description: "We create innovative projects by collaborating with members from diverse disciplines.",
              icon: "Users"
          },
          {
              title: "Inspiration",
              description: "We empower our community and beyond by producing educational and motivational content.",
              icon: "Lightbulb"
          },
          {
              title: "Societal Impact",
              description: "We aim to create a positive impact on society by raising scientific awareness.",
              icon: "Globe"
          },
          {
              title: "Continuous Development",
              description: "We support the personal and professional growth of our members through mentorship and training programs.",
              icon: "BookOpen"
          }
      ],
      history: [
          {
              year: "2018",
              title: "Foundation",
              description: "Bioengineering Community was founded by bioengineering students with a vision for scientific collaboration."
          },
          {
              year: "2019",
              title: "First Event",
              description: "We organized our first seminar and workshop to raise bioengineering awareness."
          },
          {
              year: "2020",
              title: "First Scientific Project",
              description: "We launched an interdisciplinary biotechnology project and won an award in a national competition."
          },
          {
              year: "2022",
              title: "Mentorship Program",
              description: "We started our mentorship program to bridge students and professionals."
          },
          {
              year: "2024",
              title: "Global Collaboration",
              description: "As Bioengineering Community, we began participating in international projects."
          }
      ],
      team: [
          {
              id: 1,
              name: "Elif Yilmaz",
              role: "President",
              image: "/team/president.webp",
              bio: "As a bioengineering student, she shapes the vision of our community."
          },
          {
              id: 2,
              name: "Ahmet Kaya",
              role: "Project Coordinator",
              image: "/team/project-coordinator.webp",
              bio: "Responsible for managing our interdisciplinary projects."
          },
          {
              id: 3,
              name: "Zeynep Demir",
              role: "Content Manager",
              image: "/team/content-manager.webp",
              bio: "Produces our scientific bulletins and social media content."
          },
          {
              id: 4,
              name: "Murat Sahin",
              role: "Event Coordinator",
              image: "/team/event-coordinator.webp",
              bio: "Organizes our seminars and workshops."
          }
      ]
  }
};

export default content;
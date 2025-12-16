// app/components/pages/projects/content.ts

// İçerik türü tanımları
export interface Project {
    id: string;
    title: string;
    slug: string;
    category: string;
    description: string;
    client: string;
    date: string;
    image: string;
    technologies: string[];
    featured: boolean;
  }
  
  export interface ProjectsContent {
    title: string;
    description: string;
    categories: string[];
    featured: Project[];
    projects: Project[];
  }
  
  // Varsayılan içerik
  const content = {
    tr: {
      title: "Projelerimiz",
      description: "Farklı sektörlerde geliştirdiğimiz başarılı projelerimiz ile müşterilerimizin dijital dönüşüm yolculuğunda yanlarındayız.",
      categories: ["Web Geliştirme", "Mobil Uygulama", "Yapay Zeka", "E-Ticaret", "Kurumsal Yazılım"],
      featured: [
        {
          id: "virtualtour-1",
          title: "VR Sanal Tur Platformu",
          slug: "vr-sanal-tur-platformu",
          category: "Web Geliştirme",
          description: "Emlak sektörü için geliştirdiğimiz sanal tur platformu, kullanıcılara evleri 360° olarak gezme imkanı sunuyor. Canlı tur rehberleri ile interaktif bir deneyim sunan platform, konut satışlarında %40 artış sağladı.",
          client: "HomeVision Emlak",
          date: "2023",
          image: "/projects/virtual-tour.webp",
          technologies: ["React", "Three.js", "WebGL", "Node.js", "MongoDB", "WebRTC"],
          featured: true
        },
        {
          id: "aianalytics-2",
          title: "Yapay Zeka Destekli Veri Analiz Platformu",
          slug: "yapay-zeka-veri-analiz-platformu",
          category: "Yapay Zeka",
          description: "Büyük veri setlerini analiz eden ve anlamlı içgörüler sunan yapay zeka destekli veri analiz platformu. Doğal dil işleme ve makine öğrenmesi ile verileri yorumlayan sistem, şirketlerin karar verme süreçlerini hızlandırıyor.",
          client: "DataSmart Analytics",
          date: "2022",
          image: "/projects/ai-analytics.webp",
          technologies: ["Python", "TensorFlow", "React", "D3.js", "Flask", "AWS"],
          featured: true
        }
      ],
      projects: [
        {
          id: "virtualtour-1",
          title: "VR Sanal Tur Platformu",
          slug: "vr-sanal-tur-platformu",
          category: "Web Geliştirme",
          description: "Emlak sektörü için geliştirdiğimiz sanal tur platformu, kullanıcılara evleri 360° olarak gezme imkanı sunuyor.",
          client: "HomeVision Emlak",
          date: "2023",
          image: "/projects/virtual-tour.webp",
          technologies: ["React", "Three.js", "WebGL", "Node.js", "MongoDB", "WebRTC"],
          featured: true
        },
        {
          id: "aianalytics-2",
          title: "Yapay Zeka Destekli Veri Analiz Platformu",
          slug: "yapay-zeka-veri-analiz-platformu",
          category: "Yapay Zeka",
          description: "Büyük veri setlerini analiz eden ve anlamlı içgörüler sunan yapay zeka destekli veri analiz platformu.",
          client: "DataSmart Analytics",
          date: "2022",
          image: "/projects/ai-analytics.webp",
          technologies: ["Python", "TensorFlow", "React", "D3.js", "Flask", "AWS"],
          featured: true
        },
        {
          id: "ecommerce-3",
          title: "B2B E-Ticaret Platformu",
          slug: "b2b-e-ticaret-platformu",
          category: "E-Ticaret",
          description: "Toptan satış yapan işletmeler için özel olarak geliştirilen B2B e-ticaret platformu.",
          client: "Global Trade Center",
          date: "2022",
          image: "/projects/b2b-ecommerce.webp",
          technologies: ["Next.js", "Tailwind CSS", "Node.js", "PostgreSQL", "Stripe", "Redis"],
          featured: false
        },
        {
          id: "healthapp-4",
          title: "Sağlık Takip Uygulaması",
          slug: "saglik-takip-uygulamasi",
          category: "Mobil Uygulama",
          description: "Kullanıcıların sağlık verilerini takip edebilecekleri, doktorları ile iletişim kurabilecekleri kapsamlı mobil uygulama.",
          client: "MedLife Sağlık",
          date: "2021",
          image: "/projects/health-app.webp",
          technologies: ["React Native", "Firebase", "Redux", "Node.js", "MongoDB", "Push Notifications"],
          featured: false
        },
        {
          id: "erp-5",
          title: "Kurumsal Kaynak Planlama Sistemi",
          slug: "kurumsal-kaynak-planlama-sistemi",
          category: "Kurumsal Yazılım",
          description: "Orta ve büyük ölçekli işletmeler için geliştirilen, tüm iş süreçlerini tek bir platformdan yönetmeyi sağlayan ERP sistemi.",
          client: "Industrial Solutions",
          date: "2021",
          image: "/projects/erp-system.webp",
          technologies: ["Angular", "Java Spring Boot", "MySQL", "Docker", "Kubernetes", "RabbitMQ"],
          featured: false
        },
        {
          id: "iot-6",
          title: "Akıllı Fabrika IoT Çözümü",
          slug: "akilli-fabrika-iot-cozumu",
          category: "Yapay Zeka",
          description: "Üretim tesislerindeki makinelerin IoT sensörleri ile takip edilmesini ve verilerin yapay zeka ile analiz edilmesini sağlayan platform.",
          client: "TechFactory Automation",
          date: "2020",
          image: "/projects/iot-factory.webp",
          technologies: ["Python", "TensorFlow", "MQTT", "React", "Node.js", "Time Series Database"],
          featured: false
        },
        {
          id: "mobilebanking-7",
          title: "Mobil Bankacılık Uygulaması",
          slug: "mobil-bankacilik-uygulamasi",
          category: "Mobil Uygulama",
          description: "Bir finans kuruluşu için geliştirilen, kullanıcı dostu arayüzü ve güvenlik özellikleri ile öne çıkan mobil bankacılık uygulaması.",
          client: "SecureBank",
          date: "2020",
          image: "/projects/mobile-banking.webp",
          technologies: ["Swift", "Kotlin", "Java", "Spring Boot", "Oracle", "OAuth", "SSL"],
          featured: false
        },
        {
          id: "elearning-8",
          title: "Online Eğitim Platformu",
          slug: "online-egitim-platformu",
          category: "Web Geliştirme",
          description: "Canlı dersler, interaktif içerikler ve sınav modülleri ile eksiksiz bir online eğitim deneyimi sunan platform.",
          client: "EduTech Learning",
          date: "2019",
          image: "/projects/e-learning.webp",
          technologies: ["React", "Node.js", "MongoDB", "WebRTC", "Socket.io", "AWS S3"],
          featured: false
        }
      ]
    },
    en: {
      title: "Our Projects",
      description: "We stand by our customers in their digital transformation journey with our successful projects developed in different sectors.",
      categories: ["Web Development", "Mobile App", "AI Solutions", "E-Commerce", "Enterprise Software"],
      featured: [
        {
          id: "virtualtour-1",
          title: "VR Virtual Tour Platform",
          slug: "vr-virtual-tour-platform",
          category: "Web Development",
          description: "The virtual tour platform we developed for the real estate sector allows users to tour homes in 360°. Offering an interactive experience with live tour guides, the platform increased housing sales by 40%.",
          client: "HomeVision Real Estate",
          date: "2023",
          image: "/projects/virtual-tour.webp",
          technologies: ["React", "Three.js", "WebGL", "Node.js", "MongoDB", "WebRTC"],
          featured: true
        },
        {
          id: "aianalytics-2",
          title: "AI-Powered Data Analysis Platform",
          slug: "ai-powered-data-analysis-platform",
          category: "AI Solutions",
          description: "AI-powered data analysis platform that analyzes large data sets and provides meaningful insights. The system interprets data with natural language processing and machine learning, accelerating companies' decision-making processes.",
          client: "DataSmart Analytics",
          date: "2022",
          image: "/projects/ai-analytics.webp",
          technologies: ["Python", "TensorFlow", "React", "D3.js", "Flask", "AWS"],
          featured: true
        }
      ],
      projects: [
        {
          id: "virtualtour-1",
          title: "VR Virtual Tour Platform",
          slug: "vr-virtual-tour-platform",
          category: "Web Development",
          description: "The virtual tour platform we developed for the real estate sector allows users to tour homes in 360°.",
          client: "HomeVision Real Estate",
          date: "2023",
          image: "/projects/virtual-tour.webp",
          technologies: ["React", "Three.js", "WebGL", "Node.js", "MongoDB", "WebRTC"],
          featured: true
        },
        {
          id: "aianalytics-2",
          title: "AI-Powered Data Analysis Platform",
          slug: "ai-powered-data-analysis-platform",
          category: "AI Solutions",
          description: "AI-powered data analysis platform that analyzes large data sets and provides meaningful insights.",
          client: "DataSmart Analytics",
          date: "2022",
          image: "/projects/ai-analytics.webp",
          technologies: ["Python", "TensorFlow", "React", "D3.js", "Flask", "AWS"],
          featured: true
        },
        {
          id: "ecommerce-3",
          title: "B2B E-Commerce Platform",
          slug: "b2b-e-commerce-platform",
          category: "E-Commerce",
          description: "B2B e-commerce platform specially developed for wholesale businesses.",
          client: "Global Trade Center",
          date: "2022",
          image: "/projects/b2b-ecommerce.webp",
          technologies: ["Next.js", "Tailwind CSS", "Node.js", "PostgreSQL", "Stripe", "Redis"],
          featured: false
        },
        {
          id: "healthapp-4",
          title: "Health Tracking App",
          slug: "health-tracking-app",
          category: "Mobile App",
          description: "Comprehensive mobile application where users can track their health data and communicate with their doctors.",
          client: "MedLife Health",
          date: "2021",
          image: "/projects/health-app.webp",
          technologies: ["React Native", "Firebase", "Redux", "Node.js", "MongoDB", "Push Notifications"],
          featured: false
        },
        {
          id: "erp-5",
          title: "Enterprise Resource Planning System",
          slug: "enterprise-resource-planning-system",
          category: "Enterprise Software",
          description: "ERP system developed for medium and large-scale businesses, enabling management of all business processes from a single platform.",
          client: "Industrial Solutions",
          date: "2021",
          image: "/projects/erp-system.webp",
          technologies: ["Angular", "Java Spring Boot", "MySQL", "Docker", "Kubernetes", "RabbitMQ"],
          featured: false
        },
        {
          id: "iot-6",
          title: "Smart Factory IoT Solution",
          slug: "smart-factory-iot-solution",
          category: "AI Solutions",
          description: "Platform that enables tracking of machines in production facilities with IoT sensors and analyzing data with artificial intelligence.",
          client: "TechFactory Automation",
          date: "2020",
          image: "/projects/iot-factory.webp",
          technologies: ["Python", "TensorFlow", "MQTT", "React", "Node.js", "Time Series Database"],
          featured: false
        },
        {
          id: "mobilebanking-7",
          title: "Mobile Banking Application",
          slug: "mobile-banking-application",
          category: "Mobile App",
          description: "Mobile banking application developed for a financial institution, standing out with its user-friendly interface and security features.",
          client: "SecureBank",
          date: "2020",
          image: "/projects/mobile-banking.webp",
          technologies: ["Swift", "Kotlin", "Java", "Spring Boot", "Oracle", "OAuth", "SSL"],
          featured: false
        },
        {
          id: "elearning-8",
          title: "Online Education Platform",
          slug: "online-education-platform",
          category: "Web Development",
          description: "Platform offering a complete online education experience with live classes, interactive content, and exam modules.",
          client: "EduTech Learning",
          date: "2019",
          image: "/projects/e-learning.webp",
          technologies: ["React", "Node.js", "MongoDB", "WebRTC", "Socket.io", "AWS S3"],
          featured: false
        }
      ]
    }
  };
  
  export default content;
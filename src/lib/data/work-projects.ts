// src/lib/data/work-projects.ts - REDUCED TO 3 PROJECTS + CTA
import { WorkProject } from '@/types/data';

export const workProjects: WorkProject[] = [
  {
    id: '1',
    title: 'FinTech Mobile App',
    category: 'Mobile Development',
    client: 'NeoBank Solutions',
    duration: '4 months',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&auto=format&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&auto=format&q=80',
    description: 'A comprehensive mobile banking application featuring advanced security protocols, intuitive user experience design, and seamless integration with financial APIs. The app supports biometric authentication, real-time transaction notifications, and AI-powered spending insights.',
    link: 'https://example.com/fintech-app',
    tags: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'Fintech', 'Mobile UI/UX']
  },
  {
    id: '2',
    title: 'E-commerce Platform Redesign',
    category: 'Web Development',
    client: 'RetailMax Inc.',
    duration: '6 months',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&auto=format&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&auto=format&q=80',
    description: 'Complete redesign and development of a high-traffic e-commerce platform that increased conversion rates by 40% and reduced bounce rate by 25%. Features include advanced product filtering, personalized recommendations, and optimized checkout flow.',
    link: 'https://example.com/ecommerce-redesign',
    tags: ['Next.js', 'Shopify Plus', 'React', 'Tailwind CSS', 'E-commerce', 'Performance']
  },
  {
    id: '3',
    title: 'SaaS Dashboard Analytics',
    category: 'UI/UX Design',
    client: 'DataViz Pro',
    duration: '3 months',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&auto=format&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop&auto=format&q=80',
    description: 'Modern analytics dashboard with real-time data visualization, interactive reporting features, and customizable widget system. The platform processes over 10 million data points daily with millisecond response times.',
    link: 'https://example.com/saas-dashboard',
    tags: ['Vue.js', 'D3.js', 'Python', 'FastAPI', 'Data Visualization', 'Real-time']
  },
  // CTA CARD - "Your Project Here"
  {
    id: 'cta',
    title: 'Your Project Here',
    category: 'Let\'s Work Together',
    client: 'Your Company',
    duration: 'Let\'s Discuss',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&auto=format&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&auto=format&q=80',
    description: 'Ready to bring your vision to life? Let\'s collaborate on your next digital project and create something extraordinary together. From concept to launch, we\'ll guide you through every step of the process.',
    link: '#contact', // Links to contact section
    tags: ['Your Vision', 'Our Expertise', 'Together', 'Innovation', 'Success', 'Partnership'],
    isCTA: true // Special flag to identify this as CTA card
  }
];

// Featured projects for homepage (exclude CTA card)
export const featuredProjects = workProjects.filter(p => !p.isCTA);

// Projects by category (exclude CTA card)  
export const projectsByCategory = {
  'Mobile Development': workProjects.filter(p => p.category === 'Mobile Development'),
  'Web Development': workProjects.filter(p => p.category === 'Web Development'),
  'UI/UX Design': workProjects.filter(p => p.category === 'UI/UX Design'),
};

// Recent projects (all 3 actual projects)
export const recentProjects = workProjects.filter(p => !p.isCTA);

// Project statistics for about section (exclude CTA)
const actualProjects = workProjects.filter(p => !p.isCTA);
export const projectStats = {
  totalProjects: actualProjects.length,
  categories: Object.keys(projectsByCategory).length,
  averageDuration: '4.3 months',
  clientSatisfaction: '98%',
  totalClients: actualProjects.length, // Assuming one project per client
  yearsExperience: 8
};
// src/lib/data/work-projects.ts - WITH LOCAL IMAGES
import { WorkProject } from '@/types/data';

export const workProjects: WorkProject[] = [
  {
    id: '1',
    title: 'Your Clean Queen',
    category: 'Business Website',
    client: 'Your Clean Queen',
    duration: '1 month',
    image: '/images/work/your-clean-queen.png',
    thumbnail: '/images/work/your-clean-queen-thumb.png',
    description: 'Developed a professional, clean, and mobile-first website for a domestic cleaning business. The project focused on building a modern online presence to build customer trust and generate local inquiries through a clear call-to-action strategy.',
    link: 'https://www.yourcleanqueen.co.uk/',
    tags: ['WordPress', 'Elementor', 'Responsive Design', 'Local SEO', 'Lead Generation']
  },
  {
    id: '2',
    title: 'Insight Opticians',
    category: 'Local Business Website',
    client: 'Insight Opticians',
    duration: '6 weeks',
    image: '/images/work/insight-opticians.png',
    thumbnail: '/images/work/insight-opticians-thumb.png',
    description: 'Designed and built a comprehensive, user-friendly website for a local opticians. The site was crafted to present a wide range of services and contact options in a clean and professional layout, enhancing the clinic\'s online brand and accessibility.',
    link: 'https://insightdorchester.co.uk/',
    tags: ['WordPress', 'Elementor', 'UI/UX Design', 'Custom Forms', 'Accessibility']
  },
  {
    id: '3',
    title: 'SaveOnThePen',
    category: 'Full-Stack Web App',
    client: 'Personal Project',
    duration: 'Ongoing',
    image: '/images/work/saveonthepen.png',
    thumbnail: '/images/work/saveonthepen-thumb.jpg',
    description: 'A full-stack web application designed to help users find cost-saving solutions for popular consumer products. The project includes dynamic data handling, a custom content management system, and an intuitive user interface built to provide clear value.',
    link: 'https://saveonthepen.com/',
    tags: ['React', 'Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Full-Stack', 'AI Integration']
  },
  {
    id: '4',
    title: 'Plodding Isles',
    category: 'Web3 / Blockchain',
    client: 'Personal Project',
    duration: '2 months',
    image: '/images/work/plodding-isles.png',
    thumbnail: '/images/work/plodding-isles-thumb.jpg',
    description: 'A custom, high-energy marketing website and smart contract for an NFT project. The site was built to generate community engagement, showcase the collection, and provide a seamless, secure user experience for interacting with the blockchain.',
    link: 'https://www.ploddingisles.io/',
    tags: ['React', 'Next.js', 'Solidity', 'Ethereum', 'Web3', 'Blockchain']
  },
  // CTA CARD - "Your Project Here"
  {
    id: 'cta',
    title: 'Your Project Here',
    category: 'Let\'s Work Together',
    client: 'Your Company',
    duration: 'Let\'s Discuss',
    image: '/images/work/cta-background.jpg',
    thumbnail: '/images/work/cta-background-thumb.jpg',
    description: 'Ready to bring your vision to life? Let\'s collaborate on your next digital project and create something extraordinary together. From concept to launch, we\'ll guide you through every step of the process.',
    link: '#contact',
    tags: ['Your Vision', 'Our Expertise', 'Together', 'Innovation', 'Success', 'Partnership'],
    isCTA: true
  }
];

// Featured projects for homepage (exclude CTA card)
export const featuredProjects = workProjects.filter(p => !p.isCTA);

// Projects by category - UPDATE TO MATCH YOUR ACTUAL CATEGORIES
export const projectsByCategory = {
  'Business Website': workProjects.filter(p => p.category === 'Business Website'),
  'Local Business Website': workProjects.filter(p => p.category === 'Local Business Website'),
  'Full-Stack Web App': workProjects.filter(p => p.category === 'Full-Stack Web App'),
  'Web3 / Blockchain': workProjects.filter(p => p.category === 'Web3 / Blockchain'),
};

// Recent projects (all 4 actual projects)
export const recentProjects = workProjects.filter(p => !p.isCTA);

// Project statistics for about section (exclude CTA)
const actualProjects = workProjects.filter(p => !p.isCTA);
export const projectStats = {
  totalProjects: actualProjects.length,
  categories: Object.keys(projectsByCategory).length,
  averageDuration: '2.3 months', // Updated based on your actual durations
  clientSatisfaction: '100%',
  totalClients: actualProjects.length,
  yearsExperience: 5 // Adjust to your actual experience
};
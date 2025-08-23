import { Service } from '@/types/data';

export const services: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies and best practices for optimal performance and user experience.',
    features: [
      'Responsive design across all devices',
      'Performance optimization and SEO',
      'Modern frameworks (React, Next.js, Vue)',
      'Progressive Web App capabilities',
      'API integration and backend development',
      'Content Management Systems'
    ],
    duration: '4-12 weeks',
    icon: 'BrowserIcon'
  },
  {
    id: '2',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.',
    features: [
      'Native iOS and Android development',
      'Cross-platform solutions (React Native, Flutter)',
      'App Store optimization and deployment',
      'Push notifications and real-time features',
      'Offline functionality and data sync',
      'Integration with device features'
    ],
    duration: '6-16 weeks',
    icon: 'MobileIcon'
  },
  {
    id: '3',
    title: 'UI/UX Design',
    description: 'User-centered design solutions that combine beautiful aesthetics with intuitive functionality and accessibility.',
    features: [
      'User research and persona development',
      'Wireframing and prototyping',
      'Visual design and brand integration',
      'Usability testing and iteration',
      'Design system creation',
      'Accessibility compliance (WCAG)'
    ],
    duration: '3-8 weeks',
    icon: 'DesignIcon'
  },
  {
    id: '4',
    title: 'Brand Strategy',
    description: 'Comprehensive brand development that establishes strong market presence and emotional connections with your audience.',
    features: [
      'Brand positioning and messaging',
      'Logo and visual identity design',
      'Brand guidelines and style guides',
      'Marketing collateral design',
      'Digital brand implementation',
      'Brand audit and competitive analysis'
    ],
    duration: '2-6 weeks',
    icon: 'BrandIcon'
  },
  {
    id: '5',
    title: 'E-commerce Solutions',
    description: 'Complete e-commerce platforms that drive sales with optimized user journeys and powerful backend management.',
    features: [
      'Custom e-commerce development',
      'Payment gateway integration',
      'Inventory management systems',
      'Order processing and fulfillment',
      'Analytics and reporting dashboards',
      'Multi-channel selling capabilities'
    ],
    duration: '6-20 weeks',
    icon: 'ShoppingIcon'
  },
  {
    id: '6',
    title: 'Digital Consulting',
    description: 'Strategic guidance to help businesses navigate digital transformation and optimize their online presence.',
    features: [
      'Digital strategy development',
      'Technology stack recommendations',
      'Performance audits and optimization',
      'SEO and digital marketing strategy',
      'Conversion rate optimization',
      'Analytics setup and interpretation'
    ],
    duration: '2-4 weeks',
    icon: 'ConsultingIcon'
  }
];
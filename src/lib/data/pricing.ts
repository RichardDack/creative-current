import { PricingPlan } from '@/types/data';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 2500,
    period: 'project',
    description: 'Perfect for small businesses and startups looking to establish their digital presence.',
    features: [
      'Custom website design (up to 5 pages)',
      'Responsive mobile optimization',
      'Basic SEO setup',
      'Contact form integration',
      'Social media integration',
      '30 days of support',
      'Google Analytics setup'
    ],
    ctaText: 'Get Started',
    ctaLink: '/contact?plan=starter'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 5500,
    period: 'project',
    description: 'Comprehensive solution for growing businesses that need advanced functionality and features.',
    features: [
      'Custom website design (up to 15 pages)',
      'Advanced animations and interactions',
      'Content Management System',
      'E-commerce functionality (up to 50 products)',
      'Advanced SEO optimization',
      'Performance optimization',
      '90 days of support',
      'Training and documentation',
      'Email marketing integration'
    ],
    popular: true,
    ctaText: 'Choose Professional',
    ctaLink: '/contact?plan=professional'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 12000,
    period: 'project',
    description: 'Full-scale digital solutions for large organizations with complex requirements.',
    features: [
      'Unlimited pages and custom functionality',
      'Advanced web application development',
      'Custom API development and integrations',
      'Multi-language support',
      'Advanced security implementation',
      'Performance monitoring and analytics',
      'Dedicated project manager',
      '6 months of support and maintenance',
      'Staff training and workshops',
      'Priority support and updates'
    ],
    ctaText: 'Contact Sales',
    ctaLink: '/contact?plan=enterprise'
  },
  {
    id: 'retainer',
    name: 'Monthly Retainer',
    price: 3500,
    period: 'month',
    description: 'Ongoing partnership for continuous development, maintenance, and optimization.',
    features: [
      '40 hours of development time per month',
      'Priority support and bug fixes',
      'Regular performance optimization',
      'Content updates and maintenance',
      'Monthly analytics reports',
      'Strategic consultation calls',
      'Feature enhancements and improvements',
      'Security updates and monitoring'
    ],
    ctaText: 'Start Partnership',
    ctaLink: '/contact?plan=retainer'
  }
];
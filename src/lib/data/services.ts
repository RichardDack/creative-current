// src/lib/data/services.ts - Web design service definitions for SEO optimization

/**
 * Service data structures for web design offerings
 * Provides comprehensive data for service-based SEO optimization
 */

export interface WebDesignService {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  pricing: {
    starting: number;
    typical: number;
    currency: string;
    unit: string;
  };
  deliverables: string[];
  timeline: string;
  targetKeywords: string[];
  relatedServices: string[];
  category: 'design' | 'development' | 'ecommerce' | 'cms' | 'marketing';
  difficulty: 'basic' | 'intermediate' | 'advanced';
  popularity: number; // 1-10 scale
  seoData: {
    primaryKeywords: string[];
    secondaryKeywords: string[];
    competitorKeywords: string[];
    searchVolume: number;
  };
  technicalSpecs: {
    technologies: string[];
    platforms: string[];
    integrations: string[];
  };
  idealFor: string[];
  process: Array<{
    step: number;
    name: string;
    description: string;
    duration: string;
  }>;
}

/**
 * Comprehensive web design service definitions
 */
export const WEB_DESIGN_SERVICES: Record<string, WebDesignService> = {
  'responsive-web-design': {
    slug: 'responsive-web-design',
    name: 'Responsive Web Design',
    shortName: 'Responsive Design',
    description: 'Mobile-first responsive websites that look perfect on all devices and screen sizes.',
    longDescription: 'Our responsive web design service creates websites that automatically adapt to any screen size, from mobile phones to desktop computers. Using modern CSS frameworks and mobile-first design principles, we ensure your website provides an optimal viewing experience across all devices.',
    features: [
      'Mobile-first design approach',
      'Flexible grid layouts',
      'Optimized images and media',
      'Touch-friendly navigation',
      'Cross-browser compatibility',
      'Fast loading speeds',
      'SEO-optimized structure'
    ],
    benefits: [
      'Improved user experience on all devices',
      'Better search engine rankings',
      'Increased mobile traffic and conversions',
      'Reduced bounce rates',
      'Future-proof design',
      'Cost-effective single website solution'
    ],
    pricing: {
      starting: 800,
      typical: 1500,
      currency: 'GBP',
      unit: 'project'
    },
    deliverables: [
      'Fully responsive website',
      'Mobile and tablet optimized layouts',
      'Cross-browser testing report',
      'Performance optimization',
      'SEO-ready structure',
      'Content management system',
      'Training and documentation'
    ],
    timeline: '2-4 weeks',
    targetKeywords: [
      'responsive web design',
      'mobile-friendly website',
      'responsive website design',
      'mobile web design'
    ],
    relatedServices: ['wordpress-development', 'ecommerce-website', 'website-redesign'],
    category: 'design',
    difficulty: 'intermediate',
    popularity: 9,
    seoData: {
      primaryKeywords: [
        'responsive web design',
        'responsive website design',
        'mobile-friendly web design',
        'mobile responsive website'
      ],
      secondaryKeywords: [
        'adaptive web design',
        'mobile-first design',
        'cross-device compatibility',
        'responsive design services'
      ],
      competitorKeywords: [
        'professional responsive design',
        'custom responsive websites',
        'responsive web development'
      ],
      searchVolume: 2400
    },
    technicalSpecs: {
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Flexbox', 'CSS Grid'],
      platforms: ['WordPress', 'Custom HTML/CSS', 'Next.js', 'React'],
      integrations: ['Google Analytics', 'Search Console', 'Social Media', 'Contact Forms']
    },
    idealFor: [
      'Businesses targeting mobile users',
      'E-commerce stores',
      'Service-based companies',
      'Restaurants and hospitality',
      'Local businesses'
    ],
    process: [
      {
        step: 1,
        name: 'Device Analysis',
        description: 'Analyze target audience device usage and screen sizes',
        duration: '1 day'
      },
      {
        step: 2,
        name: 'Wireframe Creation',
        description: 'Create responsive wireframes for all device breakpoints',
        duration: '2-3 days'
      },
      {
        step: 3,
        name: 'Design Development',
        description: 'Design layouts for mobile, tablet, and desktop views',
        duration: '5-7 days'
      },
      {
        step: 4,
        name: 'Responsive Development',
        description: 'Code the responsive website with mobile-first approach',
        duration: '7-10 days'
      },
      {
        step: 5,
        name: 'Testing & Optimization',
        description: 'Test across devices and optimize performance',
        duration: '2-3 days'
      }
    ]
  },

  'wordpress-development': {
    slug: 'wordpress-development',
    name: 'WordPress Development',
    shortName: 'WordPress',
    description: 'Custom WordPress websites with powerful content management and easy updates.',
    longDescription: 'Our WordPress development service creates custom, secure, and scalable websites using the world\'s most popular content management system. We build bespoke themes, integrate essential plugins, and provide comprehensive training for easy content management.',
    features: [
      'Custom WordPress theme development',
      'Plugin integration and customization',
      'SEO optimization',
      'Security hardening',
      'Performance optimization',
      'Content management training',
      'Ongoing maintenance options'
    ],
    benefits: [
      'Easy content updates without technical knowledge',
      'Extensive plugin ecosystem',
      'SEO-friendly structure',
      'Scalable and flexible',
      'Cost-effective long-term solution',
      'Large community support'
    ],
    pricing: {
      starting: 1200,
      typical: 2500,
      currency: 'GBP',
      unit: 'project'
    },
    deliverables: [
      'Custom WordPress website',
      'Responsive design',
      'Admin panel training',
      'SEO plugin setup',
      'Security configuration',
      'Backup system',
      'Documentation and support'
    ],
    timeline: '3-6 weeks',
    targetKeywords: [
      'wordpress development',
      'wordpress website design',
      'custom wordpress',
      'wordpress web design'
    ],
    relatedServices: ['responsive-web-design', 'ecommerce-website', 'website-maintenance'],
    category: 'cms',
    difficulty: 'intermediate',
    popularity: 10,
    seoData: {
      primaryKeywords: [
        'wordpress development',
        'wordpress website design',
        'custom wordpress development',
        'wordpress web design'
      ],
      secondaryKeywords: [
        'wordpress theme development',
        'wordpress customization',
        'wordpress website builder',
        'professional wordpress design'
      ],
      competitorKeywords: [
        'bespoke wordpress development',
        'wordpress specialists',
        'wordpress experts'
      ],
      searchVolume: 1800
    },
    technicalSpecs: {
      technologies: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'WordPress API'],
      platforms: ['WordPress', 'WooCommerce', 'Elementor', 'Advanced Custom Fields'],
      integrations: ['Yoast SEO', 'Contact Form 7', 'Google Analytics', 'Social Media', 'Payment Gateways']
    },
    idealFor: [
      'Businesses needing regular content updates',
      'Blogs and news websites',
      'Small to medium businesses',
      'Non-profit organizations',
      'Professional service providers'
    ],
    process: [
      {
        step: 1,
        name: 'Requirements Analysis',
        description: 'Define functionality, content structure, and user roles',
        duration: '2 days'
      },
      {
        step: 2,
        name: 'Theme Planning',
        description: 'Plan custom theme architecture and design approach',
        duration: '2-3 days'
      },
      {
        step: 3,
        name: 'Design & Development',
        description: 'Create custom WordPress theme and functionality',
        duration: '10-15 days'
      },
      {
        step: 4,
        name: 'Content Migration',
        description: 'Set up content structure and migrate existing content',
        duration: '2-3 days'
      },
      {
        step: 5,
        name: 'Testing & Training',
        description: 'Test functionality and train client on WordPress admin',
        duration: '3-4 days'
      }
    ]
  },

  'ecommerce-website': {
    slug: 'ecommerce-website',
    name: 'E-commerce Website Development',
    shortName: 'E-commerce',
    description: 'Professional online stores with secure payments and inventory management.',
    longDescription: 'Our e-commerce development service creates powerful online stores that drive sales and provide excellent customer experiences. We integrate secure payment systems, inventory management, and marketing tools to help your business succeed online.',
    features: [
      'Custom e-commerce design',
      'Secure payment integration',
      'Inventory management system',
      'Order tracking and management',
      'Customer account areas',
      'Mobile-optimized checkout',
      'SEO and marketing tools'
    ],
    benefits: [
      'Increased sales and revenue',
      '24/7 online presence',
      'Automated order processing',
      'Customer data insights',
      'Scalable business growth',
      'Reduced operational costs'
    ],
    pricing: {
      starting: 2500,
      typical: 5000,
      currency: 'GBP',
      unit: 'project'
    },
    deliverables: [
      'Complete e-commerce website',
      'Payment gateway integration',
      'Product catalog setup',
      'Order management system',
      'Customer account functionality',
      'Mobile-responsive design',
      'Analytics and reporting setup'
    ],
    timeline: '6-10 weeks',
    targetKeywords: [
      'ecommerce website development',
      'online store design',
      'ecommerce web design',
      'online shop development'
    ],
    relatedServices: ['wordpress-development', 'responsive-web-design', 'digital-marketing'],
    category: 'ecommerce',
    difficulty: 'advanced',
    popularity: 8,
    seoData: {
      primaryKeywords: [
        'ecommerce website development',
        'ecommerce web design',
        'online store development',
        'ecommerce website design'
      ],
      secondaryKeywords: [
        'online shop design',
        'ecommerce platform development',
        'custom ecommerce solution',
        'professional online store'
      ],
      competitorKeywords: [
        'bespoke ecommerce development',
        'ecommerce specialists',
        'online retail solutions'
      ],
      searchVolume: 1200
    },
    technicalSpecs: {
      technologies: ['PHP', 'JavaScript', 'HTML5', 'CSS3', 'MySQL', 'API Integration'],
      platforms: ['WooCommerce', 'Shopify', 'Magento', 'Custom Solutions'],
      integrations: ['Stripe', 'PayPal', 'Sage Pay', 'Royal Mail', 'Mailchimp', 'Google Analytics']
    },
    idealFor: [
      'Retail businesses going online',
      'Existing businesses expanding sales channels',
      'Entrepreneurs launching products',
      'B2B companies with product catalogs',
      'Service providers selling digital products'
    ],
    process: [
      {
        step: 1,
        name: 'Business Analysis',
        description: 'Analyze products, target market, and business requirements',
        duration: '3-4 days'
      },
      {
        step: 2,
        name: 'Platform Selection',
        description: 'Choose optimal e-commerce platform and payment solutions',
        duration: '2 days'
      },
      {
        step: 3,
        name: 'Design & UX',
        description: 'Create user-focused design with optimized conversion paths',
        duration: '7-10 days'
      },
      {
        step: 4,
        name: 'Development & Integration',
        description: 'Build store functionality and integrate payment systems',
        duration: '15-20 days'
      },
      {
        step: 5,
        name: 'Testing & Launch',
        description: 'Comprehensive testing and go-live support',
        duration: '5-7 days'
      }
    ]
  },

  'website-redesign': {
    slug: 'website-redesign',
    name: 'Website Redesign',
    shortName: 'Redesign',
    description: 'Transform your existing website with modern design and improved functionality.',
    longDescription: 'Our website redesign service breathes new life into outdated websites, improving user experience, search engine rankings, and conversion rates. We analyze your current site, identify opportunities, and create a modern, effective web presence.',
    features: [
      'Comprehensive site audit',
      'Modern responsive design',
      'Improved user experience',
      'SEO optimization',
      'Performance enhancement',
      'Content strategy review',
      'Analytics and tracking setup'
    ],
    benefits: [
      'Improved search engine rankings',
      'Better user engagement',
      'Increased conversion rates',
      'Modern, professional appearance',
      'Enhanced mobile experience',
      'Faster loading speeds'
    ],
    pricing: {
      starting: 1500,
      typical: 3500,
      currency: 'GBP',
      unit: 'project'
    },
    deliverables: [
      'Redesigned website',
      'Site audit report',
      'SEO improvements',
      'Performance optimization',
      'Content migration',
      'Training and documentation',
      'Post-launch support'
    ],
    timeline: '4-8 weeks',
    targetKeywords: [
      'website redesign',
      'website makeover',
      'site redesign',
      'web redesign services'
    ],
    relatedServices: ['responsive-web-design', 'seo-optimization', 'website-maintenance'],
    category: 'design',
    difficulty: 'intermediate',
    popularity: 7,
    seoData: {
      primaryKeywords: [
        'website redesign',
        'website redesign services',
        'web redesign',
        'site redesign'
      ],
      secondaryKeywords: [
        'website makeover',
        'website refresh',
        'modern website design',
        'website improvement'
      ],
      competitorKeywords: [
        'professional website redesign',
        'website redesign specialists',
        'custom website redesign'
      ],
      searchVolume: 800
    },
    technicalSpecs: {
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Modern Frameworks'],
      platforms: ['WordPress', 'Custom Solutions', 'Static Site Generators'],
      integrations: ['Google Analytics', 'Search Console', 'Social Media', 'CRM Systems']
    },
    idealFor: [
      'Businesses with outdated websites',
      'Companies rebranding',
      'Sites with poor mobile experience',
      'Websites with low conversion rates',
      'Businesses expanding services'
    ],
    process: [
      {
        step: 1,
        name: 'Site Audit',
        description: 'Comprehensive analysis of current website performance',
        duration: '2-3 days'
      },
      {
        step: 2,
        name: 'Strategy Planning',
        description: 'Define redesign goals and improvement opportunities',
        duration: '2 days'
      },
      {
        step: 3,
        name: 'Design Development',
        description: 'Create new design concepts and user experience',
        duration: '7-10 days'
      },
      {
        step: 4,
        name: 'Development & Migration',
        description: 'Build new site and migrate content safely',
        duration: '10-15 days'
      },
      {
        step: 5,
        name: 'Testing & Launch',
        description: 'Test thoroughly and launch with minimal downtime',
        duration: '3-5 days'
      }
    ]
  },

  'seo-optimization': {
    slug: 'seo-optimization',
    name: 'SEO Optimization',
    shortName: 'SEO',
    description: 'Improve search engine rankings with comprehensive SEO strategies and optimization.',
    longDescription: 'Our SEO optimization service helps your website rank higher in search results, driving more organic traffic and qualified leads. We provide technical SEO, content optimization, and ongoing monitoring to ensure sustained growth.',
    features: [
      'Technical SEO audit',
      'Keyword research and strategy',
      'On-page optimization',
      'Content optimization',
      'Local SEO setup',
      'Performance monitoring',
      'Monthly reporting'
    ],
    benefits: [
      'Higher search engine rankings',
      'Increased organic traffic',
      'Better qualified leads',
      'Improved online visibility',
      'Long-term sustainable growth',
      'Better return on investment'
    ],
    pricing: {
      starting: 500,
      typical: 1200,
      currency: 'GBP',
      unit: 'month'
    },
    deliverables: [
      'SEO audit report',
      'Keyword strategy document',
      'Optimized website content',
      'Technical improvements',
      'Local SEO setup',
      'Analytics configuration',
      'Monthly performance reports'
    ],
    timeline: 'Ongoing (3-6 month minimum)',
    targetKeywords: [
      'seo optimization',
      'search engine optimization',
      'seo services',
      'website seo'
    ],
    relatedServices: ['website-redesign', 'content-creation', 'digital-marketing'],
    category: 'marketing',
    difficulty: 'advanced',
    popularity: 9,
    seoData: {
      primaryKeywords: [
        'seo optimization',
        'search engine optimization',
        'seo services',
        'website seo'
      ],
      secondaryKeywords: [
        'local seo',
        'technical seo',
        'seo consultant',
        'seo specialist'
      ],
      competitorKeywords: [
        'professional seo services',
        'seo experts',
        'seo agency'
      ],
      searchVolume: 3200
    },
    technicalSpecs: {
      technologies: ['Google Analytics', 'Search Console', 'SEO Tools', 'Schema Markup'],
      platforms: ['WordPress', 'All Major CMS', 'Custom Websites'],
      integrations: ['Google My Business', 'Social Media', 'Analytics Tools', 'Reporting Dashboards']
    },
    idealFor: [
      'Businesses wanting more online visibility',
      'Local service providers',
      'E-commerce stores',
      'Professional service firms',
      'Companies with poor search rankings'
    ],
    process: [
      {
        step: 1,
        name: 'SEO Audit',
        description: 'Comprehensive analysis of current SEO performance',
        duration: '3-5 days'
      },
      {
        step: 2,
        name: 'Keyword Research',
        description: 'Identify target keywords and search opportunities',
        duration: '2-3 days'
      },
      {
        step: 3,
        name: 'Technical Optimization',
        description: 'Fix technical SEO issues and improve site structure',
        duration: '5-10 days'
      },
      {
        step: 4,
        name: 'Content Optimization',
        description: 'Optimize existing content and create new SEO content',
        duration: 'Ongoing'
      },
      {
        step: 5,
        name: 'Monitoring & Reporting',
        description: 'Track progress and provide regular performance reports',
        duration: 'Monthly'
      }
    ]
  }
};

/**
 * Get service data by slug
 */
export function getServiceBySlug(slug: string): WebDesignService | undefined {
  return WEB_DESIGN_SERVICES[slug];
}

/**
 * Get all service slugs
 */
export function getAllServiceSlugs(): string[] {
  return Object.keys(WEB_DESIGN_SERVICES);
}

/**
 * Get services by category
 */
export function getServicesByCategory(category: WebDesignService['category']): WebDesignService[] {
  return Object.values(WEB_DESIGN_SERVICES)
    .filter(service => service.category === category);
}

/**
 * Get services by popularity (for featuring on homepage)
 */
export function getServicesByPopularity(limit?: number): WebDesignService[] {
  const sorted = Object.values(WEB_DESIGN_SERVICES)
    .sort((a, b) => b.popularity - a.popularity);
  
  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Get related services
 */
export function getRelatedServices(slug: string, limit: number = 3): WebDesignService[] {
  const service = getServiceBySlug(slug);
  if (!service) return [];

  return service.relatedServices
    .map(relatedSlug => getServiceBySlug(relatedSlug))
    .filter((service): service is WebDesignService => service !== undefined)
    .slice(0, limit);
}

/**
 * Generate service-specific keywords
 */
export function generateServiceKeywords(slug: string, location?: string): string[] {
  const service = getServiceBySlug(slug);
  if (!service) return [];

  let keywords = [...service.seoData.primaryKeywords, ...service.seoData.secondaryKeywords];

  // Add location-specific keywords
  if (location) {
    const locationKeywords = keywords.map(keyword => `${keyword} ${location}`);
    keywords = [...keywords, ...locationKeywords];
    
    // Add additional location variations
    keywords.push(
      `${service.shortName.toLowerCase()} ${location}`,
      `${location} ${service.shortName.toLowerCase()}`,
      `${service.name.toLowerCase()} in ${location}`,
      `${service.name.toLowerCase()} near ${location}`
    );
  }

  return [...new Set(keywords)]; // Remove duplicates
}

/**
 * Get service SEO data
 */
export function getServiceSEOData(slug: string, location?: string): {
  title: string;
  description: string;
  keywords: string[];
  schema: {
    name: string;
    description: string;
    category: string;
  };
} | null {
  const service = getServiceBySlug(slug);
  if (!service) return null;

  const locationSuffix = location ? ` in ${location.charAt(0).toUpperCase() + location.slice(1)}` : '';
  
  return {
    title: `${service.name}${locationSuffix} - Professional ${service.shortName} Services`,
    description: `${service.description}${locationSuffix ? ` Serving businesses${locationSuffix} and surrounding areas.` : ''}`,
    keywords: generateServiceKeywords(slug, location),
    schema: {
      name: service.name,
      description: service.longDescription,
      category: service.category
    }
  };
}

/**
 * Get service pricing display
 */
export function getServicePricingDisplay(slug: string): string {
  const service = getServiceBySlug(slug);
  if (!service) return 'Contact for quote';

  const { starting, unit } = service.pricing;
  
  if (unit === 'month') {
    return `From £${starting}/month`;
  } else {
    return `From £${starting}`;
  }
}

/**
 * Get services suitable for specific business types
 */
export function getServicesForBusinessType(businessType: string): WebDesignService[] {
  return Object.values(WEB_DESIGN_SERVICES)
    .filter(service => 
      service.idealFor.some(ideal => 
        ideal.toLowerCase().includes(businessType.toLowerCase())
      )
    );
}
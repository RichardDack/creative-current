// src/lib/data/content.ts - SEO content templates and keyword mapping

/**
 * SEO content templates and generation utilities
 * Provides dynamic content generation for location-service combinations
 */

import { DorsetLocation } from './locations';
import { WebDesignService } from './services';

export interface ContentTemplate {
  generateTitle(location?: string, service?: string): string;
  generateDescription(location?: string, service?: string): string;
  generateContent(location?: string, service?: string, data?: unknown): string;
  generateFAQ(location?: string, service?: string): FAQ[];
}

export interface FAQ {
  question: string;
  answer: string;
  keywords: string[];
}

export interface LocalizedContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  services: ServiceHighlight[];
  testimonials: LocalTestimonial[];
  faq: FAQ[];
  localInfo: LocalAreaInfo;
}

export interface ServiceHighlight {
  name: string;
  description: string;
  icon: string;
  link: string;
}

export interface LocalTestimonial {
  name: string;
  business: string;
  location: string;
  quote: string;
  service: string;
  rating: number;
}

export interface LocalAreaInfo {
  businessCount: number;
  keyIndustries: string[];
  nearbyAreas: string[];
  localLandmarks: string[];
}

/**
 * Escape content strings for safe HTML output
 */
function escapeContent(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Homepage content templates
 */
export const HOMEPAGE_TEMPLATES: ContentTemplate = {
  generateTitle: (location?: string, service?: string): string => {
    if (location && service) {
      return escapeContent(`${service} in ${location} - Creative Current`);
    } else if (location) {
      return escapeContent(`Web Design ${location} - Professional Website Design Services`);
    } else if (service) {
      return escapeContent(`${service} Services - Creative Current Dorset`);
    }
    return escapeContent('Professional Web Design Services in Dorset - Creative Current');
  },

  generateDescription: (location?: string, service?: string): string => {
    const baseDesc = 'Professional web design and development services';
    const locationDesc = location ? ` in ${location}, Dorset` : ' across Dorset';
    const serviceDesc = service ? ` specializing in ${service.toLowerCase()}` : '';
    
    return escapeContent(`${baseDesc}${locationDesc}${serviceDesc}. Custom websites, responsive design, and digital solutions for businesses.`);
  },

  generateContent: (location?: string, service?: string): string => {
    const locationName = location ? location.charAt(0).toUpperCase() + location.slice(1) : 'Dorset';
    const serviceName = service || 'web design';
    
    return escapeContent(`
      <h1>Professional ${serviceName} Services in ${locationName}</h1>
      <p>Creative Current provides expert ${serviceName.toLowerCase()} services to businesses in ${locationName} and throughout Dorset. Our team combines creative design with technical expertise to deliver websites that drive results.</p>
      
      <h2>Why Choose Creative Current for ${serviceName} in ${locationName}?</h2>
      <ul>
        <li>Local expertise with global standards</li>
        <li>Responsive, mobile-first design approach</li>
        <li>SEO-optimized for better search rankings</li>
        <li>Ongoing support and maintenance</li>
        <li>Competitive pricing with transparent quotes</li>
      </ul>
      
      <h2>Our ${serviceName} Process</h2>
      <p>We follow a proven process to ensure your ${serviceName.toLowerCase()} project is delivered on time and exceeds expectations. From initial consultation to launch and beyond, we're with you every step of the way.</p>
    `);
  },

  generateFAQ: (location?: string, service?: string): FAQ[] => {
    const locationName = location ? location.charAt(0).toUpperCase() + location.slice(1) : 'Dorset';
    const serviceName = service || 'web design';
    
    return [
      {
        question: `How much does ${serviceName.toLowerCase()} cost in ${locationName}?`,
        answer: `${serviceName} costs vary depending on your specific requirements. We offer competitive pricing starting from £800 for basic websites, with most ${serviceName.toLowerCase()} projects in ${locationName} ranging from £1,500 to £5,000. Contact us for a free, no-obligation quote tailored to your needs.`,
        keywords: [`${serviceName.toLowerCase()} cost ${location}`, `${serviceName.toLowerCase()} price ${location}`, `web design quote ${location}`]
      },
      {
        question: `How long does a ${serviceName.toLowerCase()} project take in ${locationName}?`,
        answer: `Most ${serviceName.toLowerCase()} projects in ${locationName} take 2-8 weeks depending on complexity. Simple brochure websites can be completed in 2-3 weeks, while complex e-commerce or custom development projects may take 6-8 weeks. We'll provide a detailed timeline during your consultation.`,
        keywords: [`${serviceName.toLowerCase()} timeline ${location}`, `website development time ${location}`]
      },
      {
        question: `Do you provide ongoing support after the ${serviceName.toLowerCase()} is complete?`,
        answer: `Yes, we provide comprehensive ongoing support for all our ${serviceName.toLowerCase()} clients in ${locationName}. This includes website maintenance, security updates, content updates, and technical support. We offer various support packages to suit different needs and budgets.`,
        keywords: [`website maintenance ${location}`, `web design support ${location}`]
      },
      {
        question: `Will my website be mobile-friendly and responsive?`,
        answer: `Absolutely! All our ${serviceName.toLowerCase()} projects in ${locationName} are built with a mobile-first approach. Your website will look and function perfectly on all devices - smartphones, tablets, and desktop computers. This is essential for both user experience and search engine rankings.`,
        keywords: [`responsive web design ${location}`, `mobile-friendly website ${location}`]
      }
    ];
  }
};

/**
 * Location page content templates
 */
export const LOCATION_TEMPLATES: ContentTemplate = {
  generateTitle: (location?: string, service?: string): string => {
    if (!location) return escapeContent('Web Design Services - Creative Current');
    
    const locationName = location.charAt(0).toUpperCase() + location.slice(1);
    const serviceName = service || 'Web Design';
    
    return escapeContent(`${serviceName} ${locationName} - Professional Website Design Services`);
  },

  generateDescription: (location?: string, service?: string): string => {
    if (!location) return escapeContent('Professional web design services across Dorset');
    
    const locationName = location.charAt(0).toUpperCase() + location.slice(1);
    const serviceName = service || 'web design';
    
    return escapeContent(`Professional ${serviceName.toLowerCase()} services in ${locationName}, Dorset. Custom websites, responsive design, and digital solutions for local businesses. Free consultations available.`);
  },

  generateContent: (location?: string, service?: string, data?: DorsetLocation): string => {
    if (!location || !data) return '';
    
    const locationName = location.charAt(0).toUpperCase() + location.slice(1);
    const serviceName = service || 'web design';
    
    return escapeContent(`
      <h1>${serviceName.charAt(0).toUpperCase() + serviceName.slice(1)} Services in ${locationName}</h1>
      
      <p>Creative Current provides professional ${serviceName.toLowerCase()} services to businesses in ${locationName} and the surrounding Dorset area. ${data.description}</p>
      
      <h2>Why Choose Local ${serviceName} Services in ${locationName}?</h2>
      <p>Working with a local ${serviceName.toLowerCase()} agency in ${locationName} offers numerous advantages:</p>
      <ul>
        <li>Face-to-face meetings and local support</li>
        <li>Understanding of the local ${locationName} market</li>
        <li>Knowledge of local competitors and opportunities</li>
        <li>Support for local SEO and Google My Business</li>
        <li>Quick response times and ongoing support</li>
      </ul>
      
      <h2>${locationName} Business Landscape</h2>
      <p>${locationName} is home to approximately ${data.demographics.businessCount} businesses across key industries including ${data.keyIndustries.join(', ')}. Our ${serviceName.toLowerCase()} services help these businesses establish a strong online presence and compete effectively in the digital marketplace.</p>
      
      <h2>Local Landmarks and Areas We Serve</h2>
      <p>We provide ${serviceName.toLowerCase()} services throughout ${locationName}, including areas near ${data.seoData.localLandmarks.slice(0, 3).join(', ')}. Our team understands the local geography and can help optimize your website for location-based searches.</p>
      
      <h2>Get Started with ${serviceName} in ${locationName}</h2>
      <p>Ready to improve your online presence in ${locationName}? Contact Creative Current today for a free consultation. We'll discuss your ${serviceName.toLowerCase()} needs and provide a tailored quote for your project.</p>
    `);
  },

  generateFAQ: (location?: string, service?: string): FAQ[] => {
    if (!location) return [];
    
    const locationName = location.charAt(0).toUpperCase() + location.slice(1);
    const serviceName = service || 'web design';
    
    return [
      {
        question: `Why should I choose a local ${serviceName.toLowerCase()} company in ${locationName}?`,
        answer: `Choosing a local ${serviceName.toLowerCase()} company in ${locationName} provides several benefits: face-to-face meetings, better understanding of the local market, faster response times, and support for local SEO. We understand the ${locationName} business landscape and can help you connect with your local audience effectively.`,
        keywords: [`local web designer ${location}`, `${serviceName.toLowerCase()} company ${location}`]
      },
      {
        question: `Do you serve businesses outside of ${locationName}?`,
        answer: `Yes, while we're based in Dorset and have extensive experience serving ${locationName} businesses, we work with clients throughout Dorset and beyond. Our ${serviceName.toLowerCase()} services are available to businesses across the UK, with many clients choosing us for our local expertise and competitive pricing.`,
        keywords: [`web design near ${location}`, `${serviceName.toLowerCase()} dorset`]
      },
      {
        question: `Can you help with local SEO for my ${locationName} business?`,
        answer: `Absolutely! Local SEO is crucial for ${locationName} businesses wanting to attract local customers. We optimize your website for location-based searches, set up Google My Business, and ensure your site appears when people search for your services in ${locationName} and surrounding areas.`,
        keywords: [`local seo ${location}`, `google my business ${location}`]
      },
      {
        question: `What types of businesses in ${locationName} do you work with?`,
        answer: `We work with all types of businesses in ${locationName}, from small local shops and restaurants to larger professional services and manufacturing companies. Our ${serviceName.toLowerCase()} solutions are tailored to each business's unique needs and target audience.`,
        keywords: [`business website ${location}`, `${serviceName.toLowerCase()} for businesses ${location}`]
      }
    ];
  }
};

/**
 * Service page content templates
 */
export const SERVICE_TEMPLATES: ContentTemplate = {
  generateTitle: (location?: string, service?: string): string => {
    if (!service) return escapeContent('Web Design Services - Creative Current');
    
    const serviceName = service.charAt(0).toUpperCase() + service.slice(1);
    const locationSuffix = location ? ` in ${location.charAt(0).toUpperCase() + location.slice(1)}` : ' in Dorset';
    
    return escapeContent(`${serviceName}${locationSuffix} - Professional ${serviceName} Services`);
  },

  generateDescription: (location?: string, service?: string): string => {
    if (!service) return escapeContent('Professional web design services');
    
    const serviceName = service.toLowerCase();
    const locationSuffix = location ? ` in ${location.charAt(0).toUpperCase() + location.slice(1)}` : ' across Dorset';
    
    return escapeContent(`Professional ${serviceName} services${locationSuffix}. Expert ${serviceName} solutions with proven results. Free consultations and competitive pricing.`);
  },

  generateContent: (location?: string, service?: string, data?: WebDesignService): string => {
    if (!service || !data) return '';
    
    const locationName = location ? location.charAt(0).toUpperCase() + location.slice(1) : 'Dorset';
    const locationSuffix = location ? ` in ${locationName}` : ' across Dorset';
    
    return escapeContent(`
      <h1>${data.name}${locationSuffix}</h1>
      
      <p>${data.longDescription}</p>
      
      <h2>Our ${data.name} Process</h2>
      <p>We follow a proven ${data.name.toLowerCase()} process to ensure your project is delivered on time and exceeds expectations:</p>
      <ol>
        ${data.process.map(step => `<li><strong>${step.name}</strong> (${step.duration}): ${step.description}</li>`).join('')}
      </ol>
      
      <h2>Key Features of Our ${data.name} Service</h2>
      <ul>
        ${data.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
      
      <h2>Benefits of Professional ${data.name}</h2>
      <ul>
        ${data.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
      </ul>
      
      <h2>Who Is ${data.name} Ideal For?</h2>
      <p>Our ${data.name.toLowerCase()} service is perfect for:</p>
      <ul>
        ${data.idealFor.map(ideal => `<li>${ideal}</li>`).join('')}
      </ul>
      
      <h2>Get Started with ${data.name}${locationSuffix}</h2>
      <p>Ready to get started with ${data.name.toLowerCase()}${locationSuffix}? Contact Creative Current today for a free consultation and quote. We'll discuss your requirements and provide a tailored solution for your business.</p>
    `);
  },

  generateFAQ: (location?: string, service?: string): FAQ[] => {
    if (!service) return [];
    
    const locationName = location ? location.charAt(0).toUpperCase() + location.slice(1) : 'Dorset';
    const serviceName = service.toLowerCase();
    
    return [
      {
        question: `What makes your ${serviceName} different from competitors?`,
        answer: `Our ${serviceName} service stands out through our combination of creative design, technical expertise, and local knowledge. We focus on delivering results-driven solutions that help businesses in ${locationName} succeed online. Every project includes ongoing support and optimization.`,
        keywords: [`professional ${serviceName}`, `${serviceName} experts`, `best ${serviceName} ${location}`]
      },
      {
        question: `How do you ensure my ${serviceName} project stays on budget?`,
        answer: `We provide detailed quotes upfront with no hidden costs. Our ${serviceName} projects include clear milestones and regular communication to ensure everything stays on track and within budget. We believe in transparent pricing and will never surprise you with unexpected charges.`,
        keywords: [`${serviceName} cost`, `${serviceName} budget`, `${serviceName} pricing`]
      },
      {
        question: `What ongoing support do you provide after ${serviceName} completion?`,
        answer: `We provide comprehensive ongoing support for all ${serviceName} projects, including technical support, updates, security monitoring, and performance optimization. Our support packages are designed to keep your investment working effectively long-term.`,
        keywords: [`${serviceName} support`, `${serviceName} maintenance`, `ongoing ${serviceName} help`]
      },
      {
        question: `Can you integrate ${serviceName} with my existing systems?`,
        answer: `Yes, our ${serviceName} solutions can integrate with most existing business systems including CRM, inventory management, payment systems, and marketing tools. We'll assess your current setup and recommend the best integration approach during consultation.`,
        keywords: [`${serviceName} integration`, `${serviceName} systems`, `custom ${serviceName}`]
      }
    ];
  }
};

/**
 * Keyword mapping for location-service combinations
 */
export const KEYWORD_MAPPING: Record<string, Record<string, string[]>> = {
  'dorchester': {
    'web-design': [
      'web design dorchester',
      'website design dorchester',
      'dorchester web designer',
      'web development dorchester',
      'responsive design dorchester'
    ],
    'wordpress': [
      'wordpress dorchester',
      'wordpress development dorchester',
      'wordpress designer dorchester',
      'cms dorchester'
    ],
    'ecommerce': [
      'ecommerce dorchester',
      'online store dorchester',
      'ecommerce website dorchester',
      'online shop dorchester'
    ]
  },
  'weymouth': {
    'web-design': [
      'web design weymouth',
      'website design weymouth',
      'weymouth web designer',
      'web development weymouth',
      'tourism website weymouth'
    ],
    'wordpress': [
      'wordpress weymouth',
      'wordpress development weymouth',
      'hotel website weymouth',
      'restaurant website weymouth'
    ],
    'ecommerce': [
      'ecommerce weymouth',
      'online store weymouth',
      'tourism ecommerce weymouth',
      'booking system weymouth'
    ]
  },
  'bournemouth': {
    'web-design': [
      'web design bournemouth',
      'website design bournemouth',
      'bournemouth web designer',
      'digital agency bournemouth',
      'tech company website bournemouth'
    ],
    'wordpress': [
      'wordpress bournemouth',
      'wordpress development bournemouth',
      'business website bournemouth',
      'professional website bournemouth'
    ],
    'ecommerce': [
      'ecommerce bournemouth',
      'online store bournemouth',
      'retail website bournemouth',
      'b2b ecommerce bournemouth'
    ]
  }
};

/**
 * Generate content for location-service combination
 */
export function generateLocationServiceContent(
  location: string,
  service: string,
  locationData?: DorsetLocation,
  serviceData?: WebDesignService
): {
  title: string;
  description: string;
  content: string;
  faq: FAQ[];
  keywords: string[];
} {
  const title = SERVICE_TEMPLATES.generateTitle(location, service);
  const description = SERVICE_TEMPLATES.generateDescription(location, service);
  const content = SERVICE_TEMPLATES.generateContent(location, service);
  const faq = SERVICE_TEMPLATES.generateFAQ(location, service);
  
  // Get keywords from mapping or generate them
  const keywords = KEYWORD_MAPPING[location]?.[service] || [
    `${service} ${location}`,
    `${service} services ${location}`,
    `professional ${service} ${location}`,
    `${location} ${service} company`
  ];

  return {
    title,
    description,
    content,
    faq,
    keywords
  };
}

/**
 * Generate testimonials for location
 */
export function generateLocalTestimonials(location: string): LocalTestimonial[] {
  const locationName = location.charAt(0).toUpperCase() + location.slice(1);
  
  return [
    {
      name: 'Sarah Johnson',
      business: `${locationName} Boutique`,
      location: locationName,
      quote: `Creative Current transformed our online presence. Our new website has increased sales by 40% and we're getting customers from across Dorset.`,
      service: 'E-commerce Website',
      rating: 5
    },
    {
      name: 'Mike Thompson',
      business: `Thompson & Associates`,
      location: locationName,
      quote: `Professional, reliable, and excellent value. Our new website perfectly represents our ${locationName} business and has improved our credibility significantly.`,
      service: 'Professional Website',
      rating: 5
    },
    {
      name: 'Lisa Chen',
      business: `${locationName} Dental Practice`,
      location: locationName,
      quote: `The team understood our needs perfectly. Our website now attracts new patients and makes booking appointments so much easier.`,
      service: 'Healthcare Website',
      rating: 5
    }
  ];
}

/**
 * Generate service highlights for location
 */
export function generateServiceHighlights(): ServiceHighlight[] {
  return [
    {
      name: 'Responsive Web Design',
      description: 'Mobile-first websites that work perfectly on all devices',
      icon: 'responsive',
      link: `/services/responsive-web-design`
    },
    {
      name: 'WordPress Development',
      description: 'Custom WordPress websites with easy content management',
      icon: 'wordpress',
      link: `/services/wordpress-development`
    },
    {
      name: 'E-commerce Solutions',
      description: 'Professional online stores that drive sales and growth',
      icon: 'ecommerce',
      link: `/services/ecommerce-website`
    },
    {
      name: 'SEO Optimization',
      description: 'Improve search rankings and attract more customers',
      icon: 'seo',
      link: `/services/seo-optimization`
    }
  ];
}
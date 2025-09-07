// src/lib/content/locationContent.ts - Enhanced location-specific content generation

import { DorsetLocation, getLocationBySlug, getNearbyLocations } from '@/lib/data/locations';
import { getServicesByPopularity } from '@/lib/data/services';
import { escapeString, cleanString } from '@/lib/seo/metadata';

/**
 * Interface for location-specific content
 */
export interface LocationContent {
  breadcrumbs: Array<{
    name: string;
    href: string;
    url: string;
  }>;
  hero: {
    title: string;
    subtitle: string;
    description: string;
    keywords: string[];
  };
  services: {
    title: string;
    description: string;
    services: Array<{
      title: string;
      name: string;
      description: string;
      icon: string;
      link: string;
      localizedDescription: string;
    }>;
  };
  localBusiness: {
    title: string;
    content: string;
    industries: string[];
    landmarks: string[];
    demographics: {
      population: string;
      businessCount: string;
      keyIndustries: string[];
    };
  };
  testimonials: Array<{
    name: string;
    business: string;
    quote: string;
    rating: number;
    location: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
    schema?: {
      '@type': 'Question';
      name: string;
      acceptedAnswer: {
        '@type': 'Answer';
        text: string;
      };
    };
  }>;
  relatedLocations: Array<{
    name: string;
    slug: string;
    distance: string;
    description: string;
  }>;
}

/**
 * Generate comprehensive location-specific content with proper string escaping
 */
export function generateEnhancedLocationContent(townSlug: string): LocationContent | null {
  const location = getLocationBySlug(townSlug);
  if (!location) return null;

  const nearbyLocations = getNearbyLocations(townSlug, 3);
  const popularServices = getServicesByPopularity(4);

  // Clean location names for display content
  const cleanTownName = cleanString(location.name);
  const cleanCounty = cleanString(location.county);

  return {
    breadcrumbs: [
      {
        name: 'Home',
        href: '/',
        url: 'https://creativecurrent.co.uk/'
      },
      {
        name: 'Web Design',
        href: '/web-design',
        url: 'https://creativecurrent.co.uk/web-design'
      },
      {
        name: location.name,
        href: `/web-design/${townSlug}`,
        url: `https://creativecurrent.co.uk/web-design/${townSlug}`
      }
    ],

    hero: {
      title: `Web Design ${cleanTownName}`,
      subtitle: `Professional Website Design Services in ${cleanTownName}`,
      description: `Creative Current provides expert web design and development services to businesses in ${cleanTownName} and throughout ${cleanCounty}. We create modern, responsive websites that drive results and help local businesses succeed online.`,
      keywords: location.seoData.primaryKeywords
    },

    services: {
      title: `Our Web Design Services in ${cleanTownName}`,
      description: `We offer comprehensive web design and digital services tailored to ${cleanTownName} businesses, from small local shops to growing enterprises. Our services are specifically designed to help ${location.keyIndustries[0]?.toLowerCase()}, ${location.keyIndustries[1]?.toLowerCase()}, and other local businesses succeed online.`,
      services: popularServices.map(service => ({
        title: service.name,
        name: service.name,
        description: service.description,
        icon: service.slug,
        link: `/services/${service.slug}`,
        localizedDescription: generateLocalizedServiceDescription(service, location)
      }))
    },

    localBusiness: {
      title: `Supporting ${cleanTownName} Businesses Online`,
      content: generateLocalBusinessContent(location),
      industries: location.keyIndustries,
      landmarks: location.seoData.localLandmarks,
      demographics: {
        population: location.population.toLocaleString(),
        businessCount: location.demographics.businessCount.toString(),
        keyIndustries: location.keyIndustries
      }
    },

    testimonials: generateLocalTestimonials(location),

    faq: generateLocationFAQ(location),

    relatedLocations: nearbyLocations.map(nearby => ({
      name: nearby.name,
      slug: nearby.slug,
      distance: calculateDistance(location, nearby),
      description: `Web design services also available in ${cleanString(nearby.name)}`
    }))
  };
}

/**
 * Generate comprehensive local business content with landmarks, demographics, and local insights
 */
function generateLocalBusinessContent(location: DorsetLocation): string {
  const cleanName = cleanString(location.name);
  const cleanCounty = cleanString(location.county);

  let content = '';

  // Introduction with local context - correctly identify coastal vs inland
  let locationDescription = 'a thriving market town';
  if (location.demographics.touristDestination && location.demographics.isCoastal) {
    locationDescription = 'a vibrant coastal destination';
  } else if (location.demographics.touristDestination && !location.demographics.isCoastal) {
    locationDescription = 'a historic market town and popular tourist destination';
  }

  content += `${cleanName} is ${locationDescription} in ${cleanCounty}, `;
  content += `home to approximately ${location.population.toLocaleString()} residents and over ${location.demographics.businessCount} local businesses. `;

  // Local landmarks and character
  if (location.seoData.localLandmarks.length > 0) {
    const landmarks = location.seoData.localLandmarks.slice(0, 3);
    content += `The town is renowned for its historic landmarks including ${landmarks.slice(0, -1).join(', ')} and ${landmarks[landmarks.length - 1]}, `;
    content += `which attract both residents and visitors to the area. `;
  }

  // Business districts and commercial areas
  if (location.seoData.businessDistricts.length > 0) {
    const districts = location.seoData.businessDistricts;
    content += `The main commercial areas include ${districts.join(', ')}, where many local businesses have established their presence. `;
  }

  content += '\n\n';

  // Industry focus and economic context
  content += `The local economy in ${cleanName} is driven primarily by ${location.keyIndustries.slice(0, 3).join(', ').toLowerCase()} sectors. `;

  if (location.demographics.touristDestination && location.demographics.isCoastal) {
    content += `As a popular coastal destination, businesses in ${cleanName} benefit from both year-round residents and seasonal visitors, `;
    content += `creating unique opportunities for online marketing and customer engagement. `;
  } else if (location.demographics.touristDestination && !location.demographics.isCoastal) {
    content += `As a historic town with significant tourist appeal, businesses in ${cleanName} benefit from both local residents and visitors drawn to its heritage and attractions, `;
    content += `making a strong online presence essential for reaching both markets. `;
  } else {
    content += `As a key commercial center, ${cleanName} businesses serve both local customers and clients from surrounding areas, `;
    content += `making digital visibility crucial for attracting new customers. `;
  }

  content += '\n\n';

  // Digital challenges and opportunities
  content += `In today's competitive marketplace, ${cleanName} businesses face the challenge of standing out both locally and online. `;
  content += `Our web design services help local businesses establish a professional digital presence that reflects the quality and character of ${cleanName}. `;

  // Specific local benefits
  content += `We understand the unique needs of ${cleanName} businesses, from ${location.keyIndustries[0]?.toLowerCase()} companies looking to showcase their expertise, `;
  content += `to ${location.keyIndustries[1]?.toLowerCase()} businesses needing to attract local customers. `;

  if (location.demographics.touristDestination && location.demographics.isCoastal) {
    content += `For tourism and hospitality businesses, we create websites that capture the coastal appeal of ${cleanName} while making it easy for visitors to find and book services. `;
  } else if (location.demographics.touristDestination && !location.demographics.isCoastal) {
    content += `For heritage and tourism businesses, we create websites that showcase the historic character of ${cleanName} while making it easy for visitors to plan their visit. `;
  }

  content += `Our local knowledge of ${cleanName} and ${cleanCounty} ensures your website speaks directly to your target audience and ranks well in local search results.`;

  return content;
}

/**
 * Generate location-specific testimonials with proper escaping
 */
function generateLocalTestimonials(location: DorsetLocation): LocationContent['testimonials'] {
  const cleanName = cleanString(location.name);

  const testimonialTemplates = [
    {
      name: 'Sarah Mitchell',
      businessType: location.keyIndustries[0] || 'Local Business',
      quote: `Creative Current transformed our online presence. Since launching our new website, we've seen a 300% increase in enquiries from ${cleanName} customers.`,
      rating: 5
    },
    {
      name: 'James Thompson',
      businessType: location.keyIndustries[1] || 'Local Business',
      quote: `Professional service and great results. Our website now ranks well locally and has significantly improved our business. Highly recommended for ${cleanName} businesses.`,
      rating: 5
    }
  ];

  return testimonialTemplates.map(template => ({
    name: template.name,
    business: `${template.businessType} Business, ${location.name}`,
    quote: template.quote,
    rating: template.rating,
    location: cleanName
  }));
}

/**
 * Generate location-specific FAQ with schema markup
 */
function generateLocationFAQ(location: DorsetLocation): LocationContent['faq'] {
  const cleanName = cleanString(location.name);
  const avgCost = location.demographics.averageIncome > 30000 ? '£1,500 to £5,000' : '£800 to £3,500';

  const faqs = [
    {
      question: `How much does web design cost in ${cleanName}?`,
      answer: `Web design costs in ${cleanName} typically range from ${avgCost}. We offer free consultations and competitive pricing tailored to your specific needs.`
    },
    {
      question: `Will my website be mobile-friendly?`,
      answer: `Yes! All our websites are built mobile-first and work perfectly on all devices. This is essential for ${cleanName} businesses as most customers browse on mobile.`
    },
    {
      question: `Do you provide ongoing support?`,
      answer: `Absolutely. We provide comprehensive support for all ${cleanName} clients, including maintenance, updates, and technical support to keep your website running smoothly.`
    }
  ];

  return faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer,
    schema: {
      '@type': 'Question' as const,
      name: escapeString(faq.question), // Only escape for schema
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: escapeString(faq.answer) // Only escape for schema
      }
    }
  }));
}

/**
 * Generate localized service descriptions based on location characteristics
 */
function generateLocalizedServiceDescription(service: any, location: DorsetLocation): string {
  const cleanName = cleanString(location.name);
  const isTourist = location.demographics.touristDestination;
  const primaryIndustry = location.keyIndustries[0]?.toLowerCase() || 'business';

  const localizedDescriptions: Record<string, string> = {
    'responsive-web-design': isTourist
      ? `${service.description} Essential for ${cleanName} businesses targeting both local residents and tourists who browse on mobile devices.`
      : `${service.description} Perfect for ${cleanName} ${primaryIndustry} businesses needing to reach customers across all devices.`,

    'wordpress-development': isTourist
      ? `${service.description} Ideal for ${cleanName} hospitality and tourism businesses needing to update content regularly for seasonal offerings.`
      : `${service.description} Great for ${cleanName} ${primaryIndustry} companies wanting to manage their own content and news updates.`,

    'ecommerce-website': isTourist
      ? `${service.description} Perfect for ${cleanName} retailers and gift shops wanting to sell to visitors before, during, and after their stay.`
      : `${service.description} Excellent for ${cleanName} businesses looking to expand their market reach beyond the local area.`,

    'website-redesign': `${service.description} Many ${cleanName} businesses benefit from modernizing their online presence to better compete in today's digital marketplace.`,

    'seo-optimization': `${service.description} Crucial for ${cleanName} businesses wanting to appear in local search results and attract customers from across ${location.county}.`
  };

  return localizedDescriptions[service.slug] || `${service.description} Tailored for ${cleanName} businesses looking to grow their online presence.`;
}

/**
 * Get service benefit for localized descriptions
 */
function getServiceBenefit(serviceSlug: string): string {
  const benefits: Record<string, string> = {
    'responsive-web-design': 'reach customers on all devices',
    'wordpress-development': 'easily manage their own content',
    'ecommerce-website': 'sell products online 24/7',
    'website-redesign': 'modernize their online presence',
    'seo-optimization': 'attract more local customers'
  };

  return benefits[serviceSlug] || 'grow their business online';
}

/**
 * Calculate approximate distance between locations (simplified)
 */
function calculateDistance(location1: DorsetLocation, location2: DorsetLocation): string {
  // Simplified distance calculation - in a real app you'd use proper geolocation
  const distances: Record<string, Record<string, string>> = {
    'dorchester': {
      'weymouth': '8 miles',
      'bridport': '15 miles',
      'sherborne': '20 miles'
    },
    'weymouth': {
      'dorchester': '8 miles',
      'portland': '5 miles',
      'bridport': '18 miles'
    },
    'bournemouth': {
      'poole': '4 miles',
      'christchurch': '7 miles',
      'wimborne': '12 miles'
    },
    'poole': {
      'bournemouth': '4 miles',
      'wimborne': '8 miles',
      'wareham': '12 miles'
    }
  };

  return distances[location1.slug]?.[location2.slug] || '15 miles';
}

/**
 * Generate location-specific case studies
 */
export function generateLocationCaseStudies(townSlug: string): Array<{
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  image?: string;
}> {
  const location = getLocationBySlug(townSlug);
  if (!location) return [];

  const cleanName = cleanString(location.name);

  return [
    {
      title: `${location.keyIndustries[0]} Business Website Redesign`,
      client: `Local ${cleanName} Business`,
      industry: location.keyIndustries[0],
      challenge: `Outdated website not attracting local ${cleanName} customers`,
      solution: `Modern responsive design with local SEO optimization`,
      results: [
        '300% increase in local enquiries',
        'Top 3 Google rankings for local keywords',
        '50% improvement in mobile user experience'
      ]
    }
  ];
}
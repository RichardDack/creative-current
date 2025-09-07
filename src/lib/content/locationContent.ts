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

  // Enhanced local landmarks and character with more detail
  if (location.seoData.localLandmarks.length > 0) {
    const landmarks = location.seoData.localLandmarks;
    content += `The town is renowned for its distinctive landmarks including ${landmarks.slice(0, -1).join(', ')} and ${landmarks[landmarks.length - 1]}, `;
    content += `which not only define the town's character but also attract both residents and visitors to the area. `;
    
    // Add specific landmark context based on location
    if (location.demographics.isCoastal) {
      content += `These coastal landmarks make ${cleanName} a unique destination where businesses can leverage both maritime heritage and modern commerce. `;
    } else {
      content += `These historic landmarks create a distinctive setting where traditional businesses thrive alongside modern enterprises. `;
    }
  }

  // Enhanced business districts with more commercial context
  if (location.seoData.businessDistricts.length > 0) {
    const districts = location.seoData.businessDistricts;
    content += `The town's commercial heart beats strongest in ${districts[0]}, with additional business activity concentrated in ${districts.slice(1).join(', ')}. `;
    content += `These areas house everything from independent retailers and professional services to restaurants and specialist shops, `;
    content += `creating a diverse business ecosystem that benefits from strong local footfall and community support. `;
  }

  content += '\n\n';

  // Enhanced industry focus with specific business types
  content += `The local economy in ${cleanName} is driven primarily by ${location.keyIndustries.slice(0, 3).join(', ').toLowerCase()} sectors, `;
  content += `with the average household income of £${location.demographics.averageIncome.toLocaleString()} supporting a healthy local market. `;

  // Add specific business examples based on industries
  const industryExamples = generateIndustryExamples(location.keyIndustries, cleanName);
  if (industryExamples) {
    content += industryExamples;
  }

  if (location.demographics.touristDestination && location.demographics.isCoastal) {
    content += `As a popular coastal destination, businesses in ${cleanName} benefit from both year-round residents and seasonal visitors, `;
    content += `with peak tourism periods creating significant opportunities for hospitality, retail, and service businesses. `;
    content += `This dual market requires websites that can effectively communicate with both local customers and tourists planning their visit. `;
  } else if (location.demographics.touristDestination && !location.demographics.isCoastal) {
    content += `As a historic town with significant tourist appeal, businesses in ${cleanName} benefit from both local residents and visitors drawn to its heritage and attractions. `;
    content += `The town's cultural significance creates opportunities for businesses to serve both daily local needs and the tourism market, `;
    content += `making a strong online presence essential for reaching both customer segments effectively. `;
  } else {
    content += `As a key commercial center, ${cleanName} businesses serve both local customers and clients from surrounding areas, `;
    content += `with many companies drawing customers from across ${cleanCounty} and beyond. `;
    content += `This broader market reach makes digital visibility crucial for attracting new customers and competing effectively. `;
  }

  content += '\n\n';

  // Enhanced digital challenges with local market insights
  content += `In today's competitive marketplace, ${cleanName} businesses face unique challenges including competition from larger towns, `;
  content += `the need to maintain local customer loyalty while attracting new clients, and the challenge of standing out in an increasingly digital world. `;
  
  // Add postcode-specific targeting
  if (location.postcodes.length > 0) {
    content += `Serving the ${location.postcodes.join(', ')} postcode areas, local businesses need websites that rank well for location-specific searches `;
    content += `and clearly communicate their local expertise and community connections. `;
  }

  content += `Our web design services help local businesses establish a professional digital presence that reflects both the quality and character of ${cleanName}. `;

  // Enhanced specific local benefits with industry focus
  content += `We understand the unique needs of ${cleanName} businesses across all sectors. `;
  content += `From ${location.keyIndustries[0]?.toLowerCase()} companies needing to showcase their expertise and build trust with local clients, `;
  content += `to ${location.keyIndustries[1]?.toLowerCase()} businesses requiring effective online booking systems and customer engagement tools, `;
  content += `we tailor our approach to each industry's specific requirements. `;

  if (location.demographics.touristDestination && location.demographics.isCoastal) {
    content += `For tourism and hospitality businesses, we create websites that capture the coastal appeal of ${cleanName} while providing easy booking functionality, `;
    content += `local area information, and mobile-optimized experiences for visitors planning their stay. `;
  } else if (location.demographics.touristDestination && !location.demographics.isCoastal) {
    content += `For heritage and tourism businesses, we create websites that showcase the historic character of ${cleanName} while providing comprehensive visitor information, `;
    content += `event listings, and easy contact methods for tourists planning their visit. `;
  }

  // Add local SEO benefits
  content += `Our deep knowledge of ${cleanName} and the broader ${cleanCounty} market ensures your website not only looks professional `;
  content += `but also ranks well in local search results, helping you connect with customers who are actively looking for your services in the area.`;

  return content;
}

/**
 * Generate industry-specific examples for local content
 */
function generateIndustryExamples(industries: string[], townName: string): string {
  const examples: Record<string, string> = {
    'Tourism': `The town's tourism sector includes hotels, bed & breakfasts, restaurants, and attraction operators who rely on both repeat visitors and new customers discovering ${townName} online. `,
    'Marine': `The marine industry encompasses boat builders, yacht services, fishing operations, and water sports businesses that serve both local enthusiasts and visiting sailors. `,
    'Technology': `The growing tech sector includes software companies, digital agencies, and IT consultants who serve clients both locally and nationally from their ${townName} base. `,
    'Agriculture': `Local agricultural businesses include farms, agricultural suppliers, and food producers who serve both the local community and wider regional markets. `,
    'Retail': `The retail sector spans from independent boutiques and specialty shops to larger stores, all competing for both local customers and tourist spending. `,
    'Professional Services': `Professional services include solicitors, accountants, consultants, and other specialists who serve clients throughout ${townName} and surrounding areas. `,
    'Healthcare': `Healthcare providers include medical practices, dental surgeries, and specialist clinics serving the local population and surrounding communities. `,
    'Education': `Educational institutions and training providers serve students from ${townName} and the wider region, requiring strong online presence for recruitment and communication. `,
    'Hospitality': `The hospitality sector includes restaurants, pubs, cafes, and event venues that cater to both local residents and the many visitors to ${townName}. `,
    'Manufacturing': `Local manufacturing businesses produce goods for both regional and national markets, requiring professional websites to showcase capabilities and attract new clients. `,
    'Finance': `Financial services including banks, insurance brokers, and financial advisors serve the local business community and individual clients across the region. `,
    'Arts & Crafts': `The creative sector includes artists, craftspeople, galleries, and creative businesses that attract both local customers and tourists seeking unique ${townName} products. `,
    'Creative Industries': `Creative businesses including designers, photographers, and media companies serve clients locally while often working with customers across the UK and beyond. `
  };

  let result = '';
  industries.slice(0, 2).forEach(industry => {
    if (examples[industry]) {
      result += examples[industry];
    }
  });

  return result;
}

/**
 * Generate location-specific testimonials - returning empty array to avoid fake testimonials
 * Real testimonials should be added manually when available
 */
function generateLocalTestimonials(_location: DorsetLocation): LocationContent['testimonials'] {
  // Return empty array - fake testimonials are not ethical and can harm SEO
  // Real testimonials should be collected from actual clients and added manually
  return [];
}

// Fake testimonial generation functions removed
// Real testimonials should be collected from actual clients and added manually to maintain credibility and comply with ethical marketing practices

/**
 * Generate comprehensive location-specific FAQ with schema markup
 */
function generateLocationFAQ(location: DorsetLocation): LocationContent['faq'] {
  const cleanName = cleanString(location.name);
  const avgCost = location.demographics.averageIncome > 30000 ? '£1,500 to £5,000' : '£800 to £3,500';
  const primaryIndustry = location.keyIndustries[0]?.toLowerCase() || 'business';

  const baseFaqs = [
    {
      question: `How much does web design cost in ${cleanName}?`,
      answer: `Web design costs in ${cleanName} typically range from ${avgCost}, depending on your requirements. We understand the local market and offer competitive pricing tailored to ${cleanName} businesses. Our packages include everything from simple brochure websites to complex e-commerce solutions, with free consultations to discuss your specific needs and budget.`
    },
    {
      question: `Do you understand the ${cleanName} market?`,
      answer: `Absolutely! We have extensive experience working with businesses in ${cleanName} and throughout ${location.county}. We understand the local customer base, the competitive landscape, and what works for ${primaryIndustry} and other key industries in the area. Our local knowledge helps us create websites that resonate with your target audience.`
    },
    {
      question: `Will my website be mobile-friendly?`,
      answer: `Yes! All our websites are built mobile-first and work perfectly on all devices. This is essential for ${cleanName} businesses as most customers browse on mobile devices, especially when searching for local services. We ensure your website looks great and functions perfectly on smartphones, tablets, and desktops.`
    },
    {
      question: `Can you help with local SEO for ${cleanName}?`,
      answer: `Definitely! Local SEO is crucial for ${cleanName} businesses. We optimize your website to rank well for searches like "web design ${cleanName}" and other relevant local terms. This includes optimizing for the ${location.postcodes.join(', ')} postcode areas and ensuring your business appears in local search results when customers are looking for your services.`
    },
    {
      question: `Do you provide ongoing support after launch?`,
      answer: `Yes, we provide comprehensive ongoing support for all ${cleanName} clients. This includes regular updates, security monitoring, technical support, and help with content updates. We understand that local businesses need reliable support, so we're always available to help keep your website running smoothly and performing well.`
    },
    {
      question: `How long does it take to build a website?`,
      answer: `Most websites for ${cleanName} businesses take 4-8 weeks to complete, depending on complexity. We work efficiently while ensuring quality, and we keep you informed throughout the process. For urgent projects, we can often accommodate faster timelines to meet your business needs.`
    }
  ];

  // Add industry-specific FAQs
  const industryFaqs = generateIndustrySpecificFAQs(location, cleanName);
  
  // Add tourism-specific FAQs if applicable
  const tourismFaqs = location.demographics.touristDestination ? generateTourismFAQs(location, cleanName) : [];

  // Combine all FAQs
  const allFaqs = [...baseFaqs, ...industryFaqs, ...tourismFaqs];

  return allFaqs.map(faq => ({
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
 * Generate industry-specific FAQs based on location's key industries
 */
function generateIndustrySpecificFAQs(location: DorsetLocation, townName: string): Array<{question: string, answer: string}> {
  const faqs = [];
  const primaryIndustry = location.keyIndustries[0];

  const industryFAQs: Record<string, {question: string, answer: string}> = {
    'Tourism': {
      question: `Can you create booking systems for ${townName} tourism businesses?`,
      answer: `Yes! We specialize in creating booking systems for hotels, B&Bs, restaurants, and attractions in ${townName}. Our systems integrate with popular booking platforms and payment processors, making it easy for visitors to book your services online. This is especially important for ${townName} tourism businesses that need to capture bookings from visitors planning their trips.`
    },
    'Marine': {
      question: `Do you work with marine businesses in ${townName}?`,
      answer: `Absolutely! We have experience creating websites for marine businesses including boat builders, yacht services, marinas, and water sports operators in ${townName}. We understand the unique needs of marine businesses and can showcase your services to both local boat owners and visiting sailors.`
    },
    'Technology': {
      question: `Can you create professional websites for tech companies in ${townName}?`,
      answer: `Yes! We work with technology companies in ${townName} to create professional websites that showcase technical expertise and attract both local and national clients. We understand the tech industry and can create sites that demonstrate your capabilities while being accessible to your target audience.`
    },
    'Agriculture': {
      question: `Do you understand agricultural businesses in ${townName}?`,
      answer: `Yes! We work with farms, agricultural suppliers, and food producers in ${townName} and across ${location.county}. We understand the agricultural sector and can create websites that effectively communicate with farmers, suppliers, and consumers while showcasing your products and services.`
    },
    'Retail': {
      question: `Can you create e-commerce websites for ${townName} retailers?`,
      answer: `Absolutely! We create e-commerce websites for ${townName} retailers that want to sell online alongside their physical stores. Our solutions integrate with your existing systems and help you reach customers beyond your immediate local area while maintaining your connection to the ${townName} community.`
    },
    'Professional Services': {
      question: `Do you create websites for professional services in ${townName}?`,
      answer: `Yes! We specialize in creating professional, trustworthy websites for solicitors, accountants, consultants, and other professional services in ${townName}. We understand the importance of building credibility and trust online, especially for professional services where clients need to feel confident in your expertise.`
    },
    'Healthcare': {
      question: `Can you create websites for healthcare providers in ${townName}?`,
      answer: `Yes! We create professional websites for medical practices, dental surgeries, and healthcare providers in ${townName}. Our websites include appointment booking systems, patient information portals, and ensure compliance with healthcare regulations while providing an excellent user experience for your patients.`
    },
    'Hospitality': {
      question: `Do you create websites for restaurants and pubs in ${townName}?`,
      answer: `Absolutely! We create websites for restaurants, pubs, cafes, and event venues in ${townName}. Our solutions include online menus, reservation systems, event booking, and integration with delivery platforms. We help hospitality businesses attract both local customers and tourists visiting ${townName}.`
    }
  };

  if (primaryIndustry && industryFAQs[primaryIndustry]) {
    faqs.push(industryFAQs[primaryIndustry]);
  }

  return faqs;
}

/**
 * Generate tourism-specific FAQs for tourist destinations
 */
function generateTourismFAQs(location: DorsetLocation, townName: string): Array<{question: string, answer: string}> {
  const faqs = [];

  if (location.demographics.isCoastal) {
    faqs.push({
      question: `Can you help coastal businesses in ${townName} attract more tourists?`,
      answer: `Yes! We specialize in creating websites for coastal businesses in ${townName} that attract tourists throughout the year. Our websites showcase your location's coastal appeal, integrate with booking systems, and are optimized for searches by people planning visits to ${townName} and the ${location.county} coast.`
    });
  } else {
    faqs.push({
      question: `Can you help heritage businesses in ${townName} attract more visitors?`,
      answer: `Absolutely! We create websites for heritage attractions, historic venues, and cultural businesses in ${townName} that attract visitors interested in history and culture. Our websites effectively communicate your unique story and make it easy for tourists to plan their visit to ${townName}.`
    });
  }

  return faqs;
}

/**
 * Generate localized service descriptions based on location characteristics
 */
function generateLocalizedServiceDescription(service: { description: string; slug: string }, location: DorsetLocation): string {
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
 * Generate comprehensive location-specific case studies with detailed local context
 */
export function generateLocationCaseStudies(townSlug: string): Array<{
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  localContext: string;
  image?: string;
}> {
  const location = getLocationBySlug(townSlug);
  if (!location) return [];

  const cleanName = cleanString(location.name);
  const caseStudies = [];

  // Primary industry case study
  const primaryIndustry = location.keyIndustries[0];
  caseStudies.push({
    title: `${primaryIndustry} Business Digital Transformation in ${cleanName}`,
    client: `Established ${cleanName} ${primaryIndustry} Company`,
    industry: primaryIndustry,
    challenge: `This well-established ${primaryIndustry.toLowerCase()} business in ${cleanName} was struggling with an outdated website that didn't reflect their expertise or attract new customers. Despite being well-known locally around ${location.seoData.businessDistricts[0]}, they were losing potential clients to competitors with better online presence.`,
    solution: `We created a modern, responsive website optimized for "${primaryIndustry.toLowerCase()} ${cleanName}" and related local search terms. The site showcases their expertise, includes customer testimonials from ${cleanName} clients, and features clear calls-to-action. We also implemented local SEO targeting the ${location.postcodes.join(', ')} postcode areas.`,
    results: [
      `300% increase in enquiries from ${cleanName} and surrounding areas`,
      `First page Google rankings for "${primaryIndustry.toLowerCase()} ${cleanName}" and related terms`,
      '50% improvement in mobile user experience scores',
      `25% increase in conversion rate from website visitors to customers`,
      `Expanded customer base beyond ${cleanName} to serve clients across ${location.county}`
    ],
    localContext: `This case study demonstrates how local ${cleanName} businesses can leverage professional web design to compete effectively in the ${location.county} market while maintaining their strong local connections.`
  });

  // Secondary industry case study
  if (location.keyIndustries[1]) {
    const secondaryIndustry = location.keyIndustries[1];
    caseStudies.push({
      title: `${secondaryIndustry} Startup Success in ${cleanName}`,
      client: `Growing ${cleanName} ${secondaryIndustry} Business`,
      industry: secondaryIndustry,
      challenge: `A new ${secondaryIndustry.toLowerCase()} business in ${cleanName} needed to establish credibility and attract customers in a competitive market. Without an established reputation, they needed a professional online presence to compete with established ${cleanName} businesses.`,
      solution: `We developed a professional website that positioned them as experts in their field, included detailed service information, and optimized for local searches. The site features their ${cleanName} location prominently and includes content about serving the local community and nearby areas like ${location.nearbyTowns.slice(0, 2).join(' and ')}.`,
      results: [
        `200% increase in local customer enquiries within 6 months`,
        `Achieved top 5 rankings for "${secondaryIndustry.toLowerCase()} ${cleanName}"`,
        'Built strong online reputation with customer reviews and testimonials',
        `Successfully competed with established ${cleanName} businesses`,
        'Expanded service area to cover multiple Dorset locations'
      ],
      localContext: `This success story shows how new businesses can quickly establish themselves in the ${cleanName} market with the right digital strategy and local focus.`
    });
  }

  // Tourism case study if applicable
  if (location.demographics.touristDestination) {
    const tourismType = location.demographics.isCoastal ? 'Seaside Accommodation' : 'Heritage Tourism';
    caseStudies.push({
      title: `${tourismType} Business Boosts Bookings in ${cleanName}`,
      client: `${cleanName} ${tourismType} Provider`,
      industry: 'Tourism & Hospitality',
      challenge: `A ${tourismType.toLowerCase()} business in ${cleanName} was relying heavily on walk-in customers and word-of-mouth referrals. They were missing out on advance bookings from tourists planning visits to ${cleanName} and the wider ${location.county} area, especially during peak seasons.`,
      solution: `We created an attractive, mobile-optimized website featuring high-quality images of ${cleanName} and the local area, integrated booking system, and comprehensive visitor information. The site was optimized for searches like "accommodation ${cleanName}" and "things to do ${cleanName}".`,
      results: [
        `400% increase in advance online bookings`,
        `Extended average booking lead time from 2 days to 3 weeks`,
        `Improved occupancy rates during off-peak periods`,
        `Attracted visitors from across the UK who discovered ${cleanName} online`,
        `Increased average booking value through package deals and local partnerships`
      ],
      localContext: `This case study highlights how ${cleanName} tourism businesses can leverage their unique location and local attractions to attract visitors year-round through effective online marketing.`
    });
  }

  return caseStudies;
}

/**
 * Generate local business insights for enhanced content
 */
export function generateLocalBusinessInsights(townSlug: string): {
  marketAnalysis: string;
  opportunities: string[];
  challenges: string[];
  recommendations: string[];
} | null {
  const location = getLocationBySlug(townSlug);
  if (!location) return null;

  const cleanName = cleanString(location.name);

  return {
    marketAnalysis: `${cleanName} represents a ${location.demographics.touristDestination ? 'dynamic tourist destination and ' : ''}commercial center with ${location.demographics.businessCount} businesses serving a population of ${location.population.toLocaleString()}. The local economy is driven by ${location.keyIndustries.slice(0, 3).join(', ').toLowerCase()} sectors, with an average household income of £${location.demographics.averageIncome.toLocaleString()}.`,
    
    opportunities: [
      `Strong local search volume for "${location.seoData.primaryKeywords[0]}" and related terms`,
      `Growing digital adoption among ${cleanName} consumers`,
      `Opportunity to serve customers across ${location.postcodes.join(', ')} postcode areas`,
      location.demographics.touristDestination ? `Seasonal tourism market provides additional revenue opportunities` : `Stable local market with potential for regional expansion`,
      `Limited local competition in professional web design services`
    ],

    challenges: [
      `Competition from larger towns like ${location.nearbyTowns[0] || 'nearby areas'}`,
      `Need to balance local focus with broader market appeal`,
      `Seasonal variations in business activity${location.demographics.touristDestination ? ' due to tourism patterns' : ''}`,
      `Limited local digital marketing expertise among businesses`
    ],

    recommendations: [
      `Focus on local SEO targeting ${cleanName} and surrounding areas`,
      `Emphasize local knowledge and community connections`,
      `Develop industry-specific solutions for ${location.keyIndustries[0]?.toLowerCase()} and ${location.keyIndustries[1]?.toLowerCase()} sectors`,
      location.demographics.touristDestination ? `Create tourism-focused packages for hospitality businesses` : `Develop B2B solutions for local professional services`,
      `Build partnerships with other ${cleanName} business service providers`
    ]
  };
}
// src/lib/seo/metadata.ts - Dynamic SEO metadata generation with strict TypeScript types

import type { Metadata } from 'next';

/**
 * SEO metadata configuration and generation utilities
 * Provides dynamic metadata generation for all pages with proper string escaping
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  openGraph: OpenGraphData;
  twitterCard: TwitterCardData;
  schema: SchemaMarkup[];
}

export interface OpenGraphData {
  title: string;
  description: string;
  url: string;
  siteName: string;
  images: OpenGraphImage[];
  type: 'website' | 'article';
  locale: string;
}

export interface OpenGraphImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface TwitterCardData {
  card: 'summary' | 'summary_large_image';
  site: string;
  creator: string;
  title: string;
  description: string;
  images: string[];
}

export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

export interface PageContext {
  type: 'homepage' | 'web-design' | 'town' | 'service' | 'about' | 'contact' | 'work';
  location?: string;
  service?: string;
  path: string;
}

export interface MetadataTemplateConfig {
  siteName: string;
  siteUrl: string;
  businessName: string;
  defaultDescription: string;
  twitterHandle: string;
  defaultImage: string;
  locale: string;
}

// Default configuration for Creative Current
const DEFAULT_CONFIG: MetadataTemplateConfig = {
  siteName: 'Creative Current',
  siteUrl: 'https://creativecurrent.co.uk',
  businessName: 'Creative Current',
  defaultDescription: 'Professional web design services in Dorset. Custom websites, responsive design, and digital solutions for businesses across Dorset and beyond.',
  twitterHandle: '@creativecurrent',
  defaultImage: '/images/creative-current-og-image.jpg',
  locale: 'en_GB'
};

/**
 * Escape strings for safe use in HTML attributes and JSON-LD
 * Handles quotes, apostrophes, and other special characters
 */
export function escapeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * URL encode strings for safe use in URLs
 */
export function urlEncode(str: string): string {
  return encodeURIComponent(str);
}

/**
 * Generate SEO-optimized title with proper length and keyword placement
 */
export function generateTitle(
  pageTitle: string,
  location?: string,
  service?: string,
  config: MetadataTemplateConfig = DEFAULT_CONFIG
): string {
  let title = pageTitle;

  // Add location context
  if (location) {
    const locationFormatted = location.charAt(0).toUpperCase() + location.slice(1);
    title = `${pageTitle} in ${locationFormatted}`;
  }

  // Add service context
  if (service && !title.toLowerCase().includes(service.toLowerCase())) {
    title = `${service} - ${title}`;
  }

  // Add brand name if not already included and there's room
  if (!title.toLowerCase().includes(config.businessName.toLowerCase()) && title.length < 45) {
    title = `${title} | ${config.businessName}`;
  }

  // Ensure title is under 60 characters for optimal SEO
  if (title.length > 60) {
    // Try to trim while keeping important keywords
    const parts = title.split(' | ');
    if (parts.length > 1) {
      title = parts[0]; // Keep the main part
      if (title.length <= 60) {
        return escapeString(title);
      }
    }
    
    // If still too long, truncate intelligently
    title = title.substring(0, 57) + '...';
  }

  return escapeString(title);
}

/**
 * Generate SEO-optimized meta description with proper length and keywords
 */
export function generateDescription(
  baseDescription: string,
  location?: string,
  service?: string,
  keywords: string[] = []
): string {
  let description = baseDescription;

  // Add location context
  if (location) {
    const locationFormatted = location.charAt(0).toUpperCase() + location.slice(1);
    if (!description.toLowerCase().includes(location.toLowerCase())) {
      description = description.replace('Dorset', `${locationFormatted}, Dorset`);
    }
  }

  // Add service context
  if (service && !description.toLowerCase().includes(service.toLowerCase())) {
    description = `${service} services. ${description}`;
  }

  // Add relevant keywords naturally
  if (keywords.length > 0) {
    const keywordsToAdd = keywords.filter(keyword => 
      !description.toLowerCase().includes(keyword.toLowerCase())
    ).slice(0, 2); // Limit to 2 additional keywords

    if (keywordsToAdd.length > 0) {
      description = `${description} Specializing in ${keywordsToAdd.join(' and ')}.`;
    }
  }

  // Ensure description is between 150-160 characters for optimal SEO
  if (description.length > 160) {
    // Find the last complete sentence or phrase within limit
    const truncated = description.substring(0, 157);
    const lastPeriod = truncated.lastIndexOf('.');
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastPeriod > 140) {
      description = description.substring(0, lastPeriod + 1);
    } else if (lastSpace > 140) {
      description = description.substring(0, lastSpace) + '...';
    } else {
      description = truncated + '...';
    }
  }

  return escapeString(description);
}

/**
 * Generate keyword array for SEO optimization
 */
export function generateKeywords(
  baseKeywords: string[],
  location?: string,
  service?: string
): string[] {
  const keywords = [...baseKeywords];

  // Add location-based keywords
  if (location) {
    const locationFormatted = location.charAt(0).toUpperCase() + location.slice(1);
    keywords.push(
      `web design ${location}`,
      `website design ${locationFormatted}`,
      `${service || 'web design'} ${locationFormatted}`,
      `${locationFormatted} web designer`,
      `digital agency ${locationFormatted}`
    );
  }

  // Add service-based keywords
  if (service) {
    keywords.push(
      service,
      `${service} services`,
      `professional ${service}`,
      `${service} Dorset`
    );
  }

  // Remove duplicates and return
  return [...new Set(keywords)];
}

/**
 * Generate Open Graph metadata
 */
export function generateOpenGraph(
  title: string,
  description: string,
  url: string,
  config: MetadataTemplateConfig = DEFAULT_CONFIG
): OpenGraphData {
  return {
    title: escapeString(title),
    description: escapeString(description),
    url: urlEncode(url),
    siteName: escapeString(config.siteName),
    images: [
      {
        url: `${config.siteUrl}${config.defaultImage}`,
        width: 1200,
        height: 630,
        alt: escapeString(`${title} - ${config.businessName}`)
      }
    ],
    type: 'website',
    locale: config.locale
  };
}

/**
 * Generate Twitter Card metadata
 */
export function generateTwitterCard(
  title: string,
  description: string,
  config: MetadataTemplateConfig = DEFAULT_CONFIG
): TwitterCardData {
  return {
    card: 'summary_large_image',
    site: config.twitterHandle,
    creator: config.twitterHandle,
    title: escapeString(title),
    description: escapeString(description),
    images: [`${config.siteUrl}${config.defaultImage}`]
  };
}

/**
 * Generate canonical URL with proper encoding
 */
export function generateCanonicalUrl(
  path: string,
  config: MetadataTemplateConfig = DEFAULT_CONFIG
): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Remove trailing slash unless it's the root
  const cleanPath = normalizedPath === '/' ? '/' : normalizedPath.replace(/\/$/, '');
  
  return `${config.siteUrl}${urlEncode(cleanPath)}`;
}

/**
 * Generate complete SEO metadata for a page
 */
export function generateSEOMetadata(
  pageContext: PageContext,
  customTitle?: string,
  customDescription?: string,
  customKeywords: string[] = [],
  config: MetadataTemplateConfig = DEFAULT_CONFIG
): SEOMetadata {
  // Get base content based on page type
  const { baseTitle, baseDescription, baseKeywords } = getBaseContent(pageContext);
  
  // Use custom content or fall back to base content
  const title = generateTitle(
    customTitle || baseTitle,
    pageContext.location,
    pageContext.service,
    config
  );
  
  const description = generateDescription(
    customDescription || baseDescription,
    pageContext.location,
    pageContext.service,
    [...baseKeywords, ...customKeywords]
  );
  
  const keywords = generateKeywords(
    [...baseKeywords, ...customKeywords],
    pageContext.location,
    pageContext.service
  );
  
  const canonical = generateCanonicalUrl(pageContext.path, config);
  const openGraph = generateOpenGraph(title, description, canonical, config);
  const twitterCard = generateTwitterCard(title, description, config);

  return {
    title,
    description,
    keywords,
    canonical,
    openGraph,
    twitterCard,
    schema: [] // Will be populated by schema utilities
  };
}

/**
 * Get base content for different page types
 */
function getBaseContent(pageContext: PageContext): {
  baseTitle: string;
  baseDescription: string;
  baseKeywords: string[];
} {
  switch (pageContext.type) {
    case 'homepage':
      return {
        baseTitle: 'Professional Web Design Services in Dorset',
        baseDescription: 'Creative Current provides professional web design and development services across Dorset. Custom websites, responsive design, and digital solutions for businesses.',
        baseKeywords: ['web design', 'website development', 'Dorset', 'responsive design', 'digital agency']
      };
    
    case 'web-design':
      return {
        baseTitle: 'Web Design Services',
        baseDescription: 'Professional web design services including responsive websites, e-commerce solutions, and custom development. Serving businesses across Dorset with modern, effective web solutions.',
        baseKeywords: ['web design services', 'responsive websites', 'e-commerce', 'custom development', 'Dorset web design']
      };
    
    case 'town':
      return {
        baseTitle: 'Web Design Services',
        baseDescription: 'Professional web design and development services. Custom websites, responsive design, and digital solutions for local businesses.',
        baseKeywords: ['web design', 'website development', 'local web designer', 'responsive design', 'digital solutions']
      };
    
    case 'service':
      return {
        baseTitle: 'Professional Web Design Service',
        baseDescription: 'Expert web design and development service with focus on modern, responsive websites that drive business results.',
        baseKeywords: ['professional web design', 'web development', 'responsive websites', 'business websites']
      };
    
    case 'about':
      return {
        baseTitle: 'About Creative Current - Web Design Experts',
        baseDescription: 'Meet the Creative Current team. Experienced web designers and developers creating exceptional digital experiences for businesses across Dorset.',
        baseKeywords: ['about creative current', 'web design team', 'Dorset web designers', 'digital agency team']
      };
    
    case 'contact':
      return {
        baseTitle: 'Contact Creative Current - Get Your Quote',
        baseDescription: 'Get in touch with Creative Current for professional web design services. Free consultations and competitive quotes for your web project.',
        baseKeywords: ['contact web designer', 'web design quote', 'Dorset web design contact', 'free consultation']
      };
    
    case 'work':
      return {
        baseTitle: 'Our Web Design Portfolio',
        baseDescription: 'View our portfolio of professional websites and digital projects. See examples of our web design and development work for Dorset businesses.',
        baseKeywords: ['web design portfolio', 'website examples', 'Dorset web design work', 'digital portfolio']
      };
    
    default:
      return {
        baseTitle: 'Creative Current - Web Design Services',
        baseDescription: DEFAULT_CONFIG.defaultDescription,
        baseKeywords: ['web design', 'website development', 'Dorset', 'digital agency']
      };
  }
}

/**
 * Convert SEO metadata to Next.js Metadata format
 */
export function toNextMetadata(seoMetadata: SEOMetadata): Metadata {
  return {
    title: seoMetadata.title,
    description: seoMetadata.description,
    keywords: seoMetadata.keywords,
    alternates: {
      canonical: seoMetadata.canonical
    },
    openGraph: {
      title: seoMetadata.openGraph.title,
      description: seoMetadata.openGraph.description,
      url: seoMetadata.openGraph.url,
      siteName: seoMetadata.openGraph.siteName,
      images: seoMetadata.openGraph.images,
      type: seoMetadata.openGraph.type,
      locale: seoMetadata.openGraph.locale
    },
    twitter: {
      card: seoMetadata.twitterCard.card,
      site: seoMetadata.twitterCard.site,
      creator: seoMetadata.twitterCard.creator,
      title: seoMetadata.twitterCard.title,
      description: seoMetadata.twitterCard.description,
      images: seoMetadata.twitterCard.images
    }
  };
}

// Legacy exports for backward compatibility with existing code
// These will be replaced in future tasks but are needed for the build to work

/**
 * Legacy LocalSEOData interface for backward compatibility
 */
export interface LocalSEOData {
  town: string;
  county: string;
  landmarks: string[];
  keyBusinesses: Array<{
    name: string;
    type: string;
  }>;
  population?: string;
  postcode?: string;
}

/**
 * Legacy town data structure for backward compatibility
 */
export const dorseyTowns: Record<string, LocalSEOData> = {
  'dorchester': {
    town: 'Dorchester',
    county: 'Dorset',
    landmarks: ['Dorchester Town Centre', 'The Corn Exchange', 'Dorset County Museum'],
    keyBusinesses: [
      { name: 'Local Retail', type: 'Retail' },
      { name: 'Professional Services', type: 'Services' },
      { name: 'Tourism', type: 'Tourism' }
    ],
    population: '21,000',
    postcode: 'DT1'
  },
  'weymouth': {
    town: 'Weymouth',
    county: 'Dorset',
    landmarks: ['Weymouth Beach', 'Weymouth Harbour', 'The Esplanade'],
    keyBusinesses: [
      { name: 'Tourism & Hospitality', type: 'Tourism' },
      { name: 'Marine Services', type: 'Marine' },
      { name: 'Retail', type: 'Retail' }
    ],
    population: '65,000',
    postcode: 'DT4'
  },
  'bournemouth': {
    town: 'Bournemouth',
    county: 'Dorset',
    landmarks: ['Bournemouth Beach', 'Bournemouth Pier', 'The Square'],
    keyBusinesses: [
      { name: 'Technology', type: 'Tech' },
      { name: 'Finance', type: 'Finance' },
      { name: 'Tourism', type: 'Tourism' }
    ],
    population: '200,000',
    postcode: 'BH1'
  },
  'poole': {
    town: 'Poole',
    county: 'Dorset',
    landmarks: ['Poole Harbour', 'Sandbanks Beach', 'Poole Quay'],
    keyBusinesses: [
      { name: 'Marine Industry', type: 'Marine' },
      { name: 'Technology', type: 'Tech' },
      { name: 'Logistics', type: 'Logistics' }
    ],
    population: '150,000',
    postcode: 'BH15'
  },
  'bridport': {
    town: 'Bridport',
    county: 'Dorset',
    landmarks: ['Bridport Town Centre', 'West Bay', 'Bridport Arts Centre'],
    keyBusinesses: [
      { name: 'Arts & Crafts', type: 'Creative' },
      { name: 'Tourism', type: 'Tourism' },
      { name: 'Agriculture', type: 'Agriculture' }
    ],
    population: '14,000',
    postcode: 'DT6'
  },
  'sherborne': {
    town: 'Sherborne',
    county: 'Dorset',
    landmarks: ['Sherborne Abbey', 'Sherborne Castle', 'Sherborne School'],
    keyBusinesses: [
      { name: 'Education', type: 'Education' },
      { name: 'Tourism', type: 'Tourism' },
      { name: 'Professional Services', type: 'Services' }
    ],
    population: '10,000',
    postcode: 'DT9'
  },
  'swanage': {
    town: 'Swanage',
    county: 'Dorset',
    landmarks: ['Swanage Beach', 'Swanage Pier', 'Durlston Country Park'],
    keyBusinesses: [
      { name: 'Tourism', type: 'Tourism' },
      { name: 'Marine', type: 'Marine' },
      { name: 'Retail', type: 'Retail' }
    ],
    population: '10,000',
    postcode: 'BH19'
  },
  'blandford-forum': {
    town: 'Blandford Forum',
    county: 'Dorset',
    landmarks: ['Blandford Forum Market Place', 'The Crown Hotel', 'Blandford Fashion Museum'],
    keyBusinesses: [
      { name: 'Agriculture', type: 'Agriculture' },
      { name: 'Manufacturing', type: 'Manufacturing' },
      { name: 'Retail', type: 'Retail' }
    ],
    population: '12,000',
    postcode: 'DT11'
  }
};

/**
 * Legacy function to generate local metadata
 */
export function generateLocalMetadata(town: string): Metadata {
  const townData = dorseyTowns[town];
  if (!townData) {
    return {
      title: 'Page Not Found | Creative Current',
      description: 'The requested page could not be found.'
    };
  }

  const title = `Web Design ${townData.town} - Professional Website Design Services`;
  const description = `Professional web design services in ${townData.town}, ${townData.county}. Custom websites, responsive design, and digital solutions for local businesses.`;

  return {
    title,
    description,
    keywords: [
      `web design ${town}`,
      `website design ${townData.town}`,
      `${town} web designer`,
      `web development ${townData.town}`,
      `responsive design ${townData.town}`
    ],
    openGraph: {
      title,
      description,
      url: `https://creativecurrent.co.uk/web-design/${town}`,
      siteName: 'Creative Current',
      type: 'website',
      locale: 'en_GB'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@creativecurrent'
    },
    alternates: {
      canonical: `https://creativecurrent.co.uk/web-design/${town}`
    }
  };
}

/**
 * Legacy function to generate local content
 */
export function generateLocalContent(town: string): {
  breadcrumbs: Array<{ name: string; href: string; url: string }>;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  servicesSection: {
    title: string;
    services: Array<{
      title: string;
      name: string;
      description: string;
      icon: string;
      link: string;
    }>;
  };
  localBusinessSection: {
    title: string;
    content: string;
    industries: string[];
  };
  faqSection: Array<{
    question: string;
    answer: string;
  }>;
} {
  const townData = dorseyTowns[town];
  if (!townData) {
    throw new Error(`Town data not found for: ${town}`);
  }

  return {
    breadcrumbs: [
      { name: 'Home', href: '/', url: 'https://creativecurrent.co.uk/' },
      { name: 'Web Design', href: '/web-design', url: 'https://creativecurrent.co.uk/web-design' },
      { name: townData.town, href: `/web-design/${town}`, url: `https://creativecurrent.co.uk/web-design/${town}` }
    ],
    heroTitle: `Web Design ${townData.town}`,
    heroSubtitle: `Professional Website Design Services in ${townData.town}`,
    heroDescription: `Creative Current provides expert web design and development services to businesses in ${townData.town} and throughout ${townData.county}. We create modern, responsive websites that drive results.`,
    servicesSection: {
      title: `Our Web Design Services in ${townData.town}`,
      services: [
        {
          title: 'Responsive Web Design',
          name: 'Responsive Web Design',
          description: 'Mobile-first websites that work perfectly on all devices',
          icon: 'responsive',
          link: '/services/responsive-web-design'
        },
        {
          title: 'WordPress Development',
          name: 'WordPress Development',
          description: 'Custom WordPress websites with easy content management',
          icon: 'wordpress',
          link: '/services/wordpress-development'
        },
        {
          title: 'E-commerce Solutions',
          name: 'E-commerce Solutions',
          description: 'Professional online stores that drive sales',
          icon: 'ecommerce',
          link: '/services/ecommerce-website'
        },
        {
          title: 'SEO Optimization',
          name: 'SEO Optimization',
          description: 'Improve search rankings and attract more customers',
          icon: 'seo',
          link: '/services/seo-optimization'
        }
      ]
    },
    localBusinessSection: {
      title: `Supporting ${townData.town} Businesses Online`,
      content: `${townData.town} is home to a diverse range of businesses, from traditional retailers to modern service providers. Our web design services help these businesses establish a strong online presence and compete effectively in the digital marketplace.`,
      industries: ['Retail', 'Tourism', 'Professional Services', 'Hospitality', 'Healthcare']
    },
    faqSection: [
      {
        question: `How much does web design cost in ${townData.town}?`,
        answer: `Web design costs in ${townData.town} vary depending on your requirements. We offer competitive pricing starting from £800 for basic websites, with most projects ranging from £1,500 to £5,000. Contact us for a free, tailored quote.`
      },
      {
        question: `Do you provide ongoing support after the website is complete?`,
        answer: `Yes, we provide comprehensive ongoing support for all our ${townData.town} clients, including website maintenance, security updates, content updates, and technical support.`
      },
      {
        question: `Will my website be mobile-friendly?`,
        answer: `Absolutely! All our websites are built with a mobile-first approach, ensuring they look and function perfectly on smartphones, tablets, and desktop computers.`
      }
    ]
  };
}

/**
 * Legacy function to generate local business schema
 */
export function generateLocalBusinessSchema(town: string): object {
  const townData = dorseyTowns[town];
  if (!townData) {
    throw new Error(`Town data not found for: ${town}`);
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Creative Current',
    description: `Professional web design services in ${townData.town}, ${townData.county}`,
    url: 'https://creativecurrent.co.uk',
    telephone: '+44-1234-567890',
    address: {
      '@type': 'PostalAddress',
      addressLocality: townData.town,
      addressRegion: townData.county,
      addressCountry: 'GB'
    },
    areaServed: {
      '@type': 'Place',
      name: `${townData.town}, ${townData.county}`
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 50.7156,
        longitude: -2.4397
      },
      geoRadius: '50 km'
    }
  };
}
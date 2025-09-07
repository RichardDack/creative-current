// src/lib/seo/metadata.ts - Dynamic SEO metadata generation
import type { Metadata } from 'next';

/**
 * Utility functions for string handling
 */
export function escapeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function cleanString(str: string): string {
  return str.trim();
}

/**
 * Page context interface for SEO metadata generation
 */
export interface PageContext {
  type: 'homepage' | 'town' | 'service' | 'about' | 'contact' | 'work';
  location?: string;
  service?: string;
  path: string;
}

/**
 * SEO metadata interface
 */
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
    url: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
  };
}

/**
 * Generate comprehensive SEO metadata
 */
export function generateSEOMetadata(
  context: PageContext,
  title: string,
  description: string,
  keywords: string[]
): SEOMetadata {
  const baseUrl = 'https://creativecurrent.co.uk';
  const canonical = `${baseUrl}${context.path}`;
  
  return {
    title,
    description,
    keywords,
    canonical,
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      images: [{
        url: `${baseUrl}/images/creative-current-og-image.jpg`,
        width: 1200,
        height: 630,
        alt: title
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/creative-current-og-image.jpg`]
    }
  };
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
      type: 'website',
      url: seoMetadata.openGraph.url,
      images: seoMetadata.openGraph.images
    },
    twitter: {
      card: 'summary_large_image',
      title: seoMetadata.twitter.title,
      description: seoMetadata.twitter.description,
      images: seoMetadata.twitter.images
    }
  };
}

/**
 * Local SEO data interface (legacy support)
 */
export interface LocalSEOData {
  town: string;
  county: string;
  population: number;
  keyIndustries: string[];
  landmarks: string[];
  businessDistricts: string[];
  postcodes: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

/**
 * Legacy dorseyTowns data (for backward compatibility)
 * Note: This is maintained for existing components, but new code should use the enhanced location data
 */
export const dorseyTowns: Record<string, LocalSEOData> = {
  bournemouth: {
    town: 'Bournemouth',
    county: 'Dorset',
    population: 200000,
    keyIndustries: ['Technology', 'Finance', 'Tourism', 'Education'],
    landmarks: ['Bournemouth Beach', 'Bournemouth Pier', 'The Square'],
    businessDistricts: ['Town Centre', 'Lansdowne', 'Westbourne'],
    postcodes: ['BH1', 'BH2', 'BH3', 'BH4', 'BH5'],
    coordinates: { lat: 50.7192, lng: -1.8808 }
  },
  poole: {
    town: 'Poole',
    county: 'Dorset',
    population: 150000,
    keyIndustries: ['Marine', 'Technology', 'Logistics', 'Tourism'],
    landmarks: ['Poole Harbour', 'Sandbanks Beach', 'Poole Quay'],
    businessDistricts: ['Poole Town Centre', 'Poole Quay', 'Sandbanks'],
    postcodes: ['BH12', 'BH13', 'BH14', 'BH15'],
    coordinates: { lat: 50.7150, lng: -1.9872 }
  },
  weymouth: {
    town: 'Weymouth',
    county: 'Dorset',
    population: 65000,
    keyIndustries: ['Tourism', 'Marine', 'Retail', 'Hospitality'],
    landmarks: ['Weymouth Beach', 'Weymouth Harbour', 'The Esplanade'],
    businessDistricts: ['Town Centre', 'The Esplanade', 'Hope Square'],
    postcodes: ['DT4', 'DT3'],
    coordinates: { lat: 50.6139, lng: -2.4594 }
  },
  dorchester: {
    town: 'Dorchester',
    county: 'Dorset',
    population: 21000,
    keyIndustries: ['Agriculture', 'Tourism', 'Retail', 'Professional Services'],
    landmarks: ['Dorchester Town Centre', 'The Corn Exchange', 'Dorset County Museum'],
    businessDistricts: ['South Street', 'High West Street', 'Trinity Street'],
    postcodes: ['DT1', 'DT2'],
    coordinates: { lat: 50.7156, lng: -2.4397 }
  },
  swanage: {
    town: 'Swanage',
    county: 'Dorset',
    population: 10000,
    keyIndustries: ['Tourism', 'Marine', 'Retail', 'Hospitality'],
    landmarks: ['Swanage Beach', 'Swanage Pier', 'Durlston Country Park'],
    businessDistricts: ['High Street', 'Station Road', 'Shore Road'],
    postcodes: ['BH19'],
    coordinates: { lat: 50.6094, lng: -1.9594 }
  },
  bridport: {
    town: 'Bridport',
    county: 'Dorset',
    population: 14000,
    keyIndustries: ['Arts & Crafts', 'Tourism', 'Agriculture', 'Retail'],
    landmarks: ['Bridport Town Centre', 'West Bay', 'Bridport Arts Centre'],
    businessDistricts: ['South Street', 'East Street', 'West Street'],
    postcodes: ['DT6'],
    coordinates: { lat: 50.7342, lng: -2.7581 }
  },
  sherborne: {
    town: 'Sherborne',
    county: 'Dorset',
    population: 10000,
    keyIndustries: ['Education', 'Tourism', 'Professional Services', 'Retail'],
    landmarks: ['Sherborne Abbey', 'Sherborne Castle', 'Sherborne School'],
    businessDistricts: ['Cheap Street', 'Long Street', 'Half Moon Street'],
    postcodes: ['DT9'],
    coordinates: { lat: 50.9473, lng: -2.5169 }
  },
  'blandford-forum': {
    town: 'Blandford Forum',
    county: 'Dorset',
    population: 12000,
    keyIndustries: ['Agriculture', 'Manufacturing', 'Retail', 'Professional Services'],
    landmarks: ['Blandford Forum Market Place', 'The Crown Hotel', 'Blandford Fashion Museum'],
    businessDistricts: ['Market Place', 'East Street', 'West Street'],
    postcodes: ['DT11'],
    coordinates: { lat: 50.8558, lng: -2.1647 }
  }
};

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    type?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    images?: string[];
  };
  structuredData?: object[];
}

const baseUrl = 'https://creativecurrent.co.uk';
const defaultImage = `${baseUrl}/images/creative-current-og-image.jpg`;

/**
 * Generate optimized metadata for homepage
 */
export function generateHomepageMetadata(): Metadata {
  const title = "Web Design Dorset | Creative Current - Professional Web Development";
  const description = "Award-winning web design agency in Dorset. Specializing in responsive websites, UI/UX design, and digital solutions for businesses across Bournemouth, Poole, Weymouth & Dorchester.";
  
  return {
    title,
    description,
    keywords: [
      'web design dorset',
      'web development dorset',
      'website design bournemouth',
      'web design poole',
      'responsive web design',
      'ui ux design dorset',
      'professional web design',
      'creative current',
      'dorset web agency'
    ],
    authors: [{ name: "Creative Current" }],
    viewport: "width=device-width, initial-scale=1",
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: baseUrl,
      siteName: "Creative Current",
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: "Creative Current - Web Design Dorset"
        }
      ],
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage],
      creator: "@creativecurrent",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
      apple: "/favicon.svg",
    },
    other: {
      'geo.region': 'GB-DOR',
      'geo.placename': 'Dorset, England',
      'geo.position': '50.7156;-2.4372',
      'ICBM': '50.7156, -2.4372',
    },
  };
}

/**
 * Generate metadata for location-specific pages
 */
export function generateLocationMetadata(town: string): Metadata {
  const townName = town.charAt(0).toUpperCase() + town.slice(1);
  const title = `Web Design ${townName} | Creative Current - Local Web Development`;
  const description = `Professional web design services in ${townName}, Dorset. Custom websites, responsive design, and digital solutions for local businesses. Contact us for a free consultation.`;
  
  return {
    title,
    description,
    keywords: [
      `web design ${town}`,
      `website design ${town}`,
      `web development ${town}`,
      `${town} web design`,
      `responsive web design ${town}`,
      'dorset web design',
      'creative current'
    ],
    alternates: {
      canonical: `${baseUrl}/web-design/${town}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/web-design/${town}`,
      siteName: "Creative Current",
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: `Web Design ${townName} - Creative Current`
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage],
    },
    other: {
      'geo.region': 'GB-DOR',
      'geo.placename': `${townName}, Dorset, England`,
    },
  };
}

/**
 * Generate metadata for service pages
 */
export function generateServiceMetadata(service: string): Metadata {
  const serviceName = service.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  const title = `${serviceName} Services | Creative Current Dorset`;
  const description = `Professional ${serviceName.toLowerCase()} services in Dorset. Expert solutions for businesses across Bournemouth, Poole, Weymouth, and Dorchester.`;
  
  return {
    title,
    description,
    keywords: [
      `${service} dorset`,
      `${service} services`,
      `professional ${service}`,
      'dorset digital agency',
      'creative current'
    ],
    alternates: {
      canonical: `${baseUrl}/services/${service}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/services/${service}`,
      siteName: "Creative Current",
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: `${serviceName} Services - Creative Current`
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage],
    },
  };
}

/**
 * Generate metadata for about page
 */
export function generateAboutMetadata(): Metadata {
  const title = "About Creative Current | Web Design Team Dorset";
  const description = "Meet the Creative Current team - passionate web designers and developers based in Dorset. Learn about our mission to create exceptional digital experiences for local businesses.";
  
  return {
    title,
    description,
    keywords: [
      'about creative current',
      'web design team dorset',
      'dorset web designers',
      'creative current team',
      'web development company dorset'
    ],
    alternates: {
      canonical: `${baseUrl}/about`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/about`,
      siteName: "Creative Current",
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: "About Creative Current Team"
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage],
    },
  };
}

/**
 * Generate metadata for contact page
 */
export function generateContactMetadata(): Metadata {
  const title = "Contact Creative Current | Web Design Dorset - Get Your Quote";
  const description = "Contact Creative Current for professional web design services in Dorset. Free consultations, competitive quotes, and exceptional customer service. Call us today!";
  
  return {
    title,
    description,
    keywords: [
      'contact creative current',
      'web design quote dorset',
      'web design consultation',
      'dorset web design contact',
      'get web design quote'
    ],
    alternates: {
      canonical: `${baseUrl}/contact`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/contact`,
      siteName: "Creative Current",
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: "Contact Creative Current"
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage],
    },
  };
}

/**
 * Generate metadata for work/portfolio page
 */
export function generateWorkMetadata(): Metadata {
  const title = "Our Work | Creative Current Portfolio - Web Design Examples Dorset";
  const description = "Explore Creative Current's portfolio of stunning websites and digital projects. See examples of our web design work for businesses across Dorset and beyond.";
  
  return {
    title,
    description,
    keywords: [
      'creative current portfolio',
      'web design examples',
      'dorset web design portfolio',
      'website examples',
      'creative current work'
    ],
    alternates: {
      canonical: `${baseUrl}/work`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/work`,
      siteName: "Creative Current",
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: "Creative Current Portfolio"
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage],
    },
  };
}/*
*
 * Generate metadata for terms page
 */
export function generateTermsMetadata(): Metadata {
  const title = "Terms of Service | Creative Current - Web Design Terms & Conditions";
  const description = "Terms of service and conditions for Creative Current web design services in Dorset. Read our terms before engaging our services.";
  
  return {
    title,
    description,
    keywords: [
      'terms of service',
      'web design terms',
      'creative current terms',
      'web design conditions',
      'service agreement'
    ],
    alternates: {
      canonical: `${baseUrl}/terms`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/terms`,
      siteName: "Creative Current",
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: "Creative Current Terms of Service"
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generate metadata for privacy page
 */
export function generatePrivacyMetadata(): Metadata {
  const title = "Privacy Policy | Creative Current - Data Protection & GDPR Compliance";
  const description = "Privacy policy and data protection information for Creative Current. Learn how we protect your personal information in compliance with GDPR and UK data protection laws.";
  
  return {
    title,
    description,
    keywords: [
      'privacy policy',
      'data protection',
      'gdpr compliance',
      'creative current privacy',
      'data security',
      'personal information'
    ],
    alternates: {
      canonical: `${baseUrl}/privacy`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/privacy`,
      siteName: "Creative Current",
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: "Creative Current Privacy Policy"
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generate metadata for any page with custom parameters
 */
export function generatePageMetadata(config: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const { title, description, path, keywords = [], noIndex = false } = config;
  
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}${path}`,
      siteName: "Creative Current",
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}
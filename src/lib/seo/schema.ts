// src/lib/seo/schema.ts - Schema markup generation with strict TypeScript types

import { DorsetLocation, getLocationBySlug } from '@/lib/data/locations';
import { WebDesignService } from '@/lib/data/services';
import { escapeString } from './metadata';

/**
 * Base schema markup interface
 */
export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

/**
 * Local Business schema interface
 */
export interface LocalBusinessSchema extends SchemaMarkup {
  '@type': 'LocalBusiness';
  name: string;
  description: string;
  url: string;
  telephone: string;
  email?: string;
  address: PostalAddressSchema;
  geo: GeoCoordinatesSchema;
  areaServed: PlaceSchema[];
  serviceArea: GeoCircleSchema;
  openingHours?: string[];
  priceRange?: string;
  paymentAccepted?: string[];
  currenciesAccepted?: string[];
  sameAs?: string[];
  foundingDate?: string;
  numberOfEmployees?: string;
  knowsAbout?: string[];
  makesOffer?: OfferSchema[];
}

/**
 * Postal Address schema interface
 */
export interface PostalAddressSchema {
  '@type': 'PostalAddress';
  streetAddress?: string;
  addressLocality: string;
  addressRegion: string;
  postalCode?: string;
  addressCountry: string;
}

/**
 * Geo Coordinates schema interface
 */
export interface GeoCoordinatesSchema {
  '@type': 'GeoCoordinates';
  latitude: number;
  longitude: number;
}

/**
 * Place schema interface
 */
export interface PlaceSchema {
  '@type': 'Place';
  name: string;
  geo?: GeoCoordinatesSchema;
}

/**
 * Geo Circle schema interface
 */
export interface GeoCircleSchema {
  '@type': 'GeoCircle';
  geoMidpoint: GeoCoordinatesSchema;
  geoRadius: string;
}

/**
 * Service schema interface
 */
export interface ServiceSchema extends SchemaMarkup {
  '@type': 'Service';
  name: string;
  description: string;
  provider: OrganizationSchema;
  areaServed: PlaceSchema[];
  offers?: OfferSchema[];
  serviceType: string;
  category?: string;
}

/**
 * Organization schema interface
 */
export interface OrganizationSchema {
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  contactPoint?: ContactPointSchema[];
  address?: PostalAddressSchema;
  sameAs?: string[];
}

/**
 * Contact Point schema interface
 */
export interface ContactPointSchema {
  '@type': 'ContactPoint';
  telephone: string;
  contactType: string;
  areaServed?: string;
  availableLanguage?: string;
}

/**
 * Offer schema interface
 */
export interface OfferSchema {
  '@type': 'Offer';
  name: string;
  description?: string;
  price?: string;
  priceCurrency?: string;
  availability?: string;
  validFrom?: string;
  validThrough?: string;
  areaServed?: PlaceSchema;
}

/**
 * FAQ Page schema interface
 */
export interface FAQPageSchema extends SchemaMarkup {
  '@type': 'FAQPage';
  mainEntity: QuestionSchema[];
}

/**
 * Question schema interface
 */
export interface QuestionSchema {
  '@type': 'Question';
  name: string;
  acceptedAnswer: AnswerSchema;
}

/**
 * Answer schema interface
 */
export interface AnswerSchema {
  '@type': 'Answer';
  text: string;
}

/**
 * Breadcrumb List schema interface
 */
export interface BreadcrumbListSchema extends SchemaMarkup {
  '@type': 'BreadcrumbList';
  itemListElement: ListItemSchema[];
}

/**
 * List Item schema interface
 */
export interface ListItemSchema {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

/**
 * Website schema interface
 */
export interface WebsiteSchema extends SchemaMarkup {
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  publisher?: OrganizationSchema;
  potentialAction?: SearchActionSchema;
}

/**
 * Search Action schema interface
 */
export interface SearchActionSchema {
  '@type': 'SearchAction';
  target: string;
  'query-input': string;
}

/**
 * Generate comprehensive Local Business schema for location pages
 */
export function generateLocalBusinessSchema(
  location: DorsetLocation,
  townSlug: string
): LocalBusinessSchema {
  const escapedName = escapeString(location.name);
  const escapedCounty = escapeString(location.county);
  
  // Generate comprehensive area served including nearby locations with coordinates
  const areaServed: PlaceSchema[] = [
    {
      '@type': 'Place',
      name: `${escapedName}, ${escapedCounty}`,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng
      }
    }
  ];

  // Add nearby towns with their coordinates if available
  location.nearbyTowns.forEach(nearbySlug => {
    const nearbyLocation = getLocationBySlug ? getLocationBySlug(nearbySlug) : null;
    if (nearbyLocation) {
      areaServed.push({
        '@type': 'Place',
        name: `${escapeString(nearbyLocation.name)}, ${escapedCounty}`,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: nearbyLocation.coordinates.lat,
          longitude: nearbyLocation.coordinates.lng
        }
      });
    } else {
      // Fallback for towns without full data
      areaServed.push({
        '@type': 'Place',
        name: nearbySlug.charAt(0).toUpperCase() + nearbySlug.slice(1).replace('-', ' ')
      });
    }
  });

  // Determine service radius based on location type
  const serviceRadius = location.demographics.touristDestination ? '30 km' : '25 km';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Creative Current',
    description: `Professional web design services in ${escapedName}, ${escapedCounty}. Custom websites, responsive design, and digital solutions for local businesses. Serving ${escapedName} and surrounding areas with expert web development, SEO optimization, and digital marketing services.`,
    url: 'https://creativecurrent.co.uk',
    telephone: '+44-1234-567890',
    email: 'hello@creativecurrent.co.uk',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `Creative Current, Business Centre, ${escapedName}`,
      addressLocality: escapedName,
      addressRegion: escapedCounty,
      postalCode: location.postcodes[0],
      addressCountry: 'GB'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng
    },
    areaServed,
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng
      },
      geoRadius: serviceRadius
    },
    openingHours: [
      'Mo-Fr 09:00-17:30',
      'Sa 10:00-16:00'
    ],
    priceRange: location.demographics.averageIncome > 30000 ? '£1200-£8000' : '£800-£5000',
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer', 'PayPal'],
    currenciesAccepted: ['GBP'],
    sameAs: [
      'https://www.facebook.com/creativecurrent',
      'https://www.linkedin.com/company/creative-current',
      'https://twitter.com/creativecurrent',
      'https://www.instagram.com/creativecurrent'
    ],
    // Add business-specific properties
    foundingDate: '2020-01-01',
    numberOfEmployees: '2-10',
    knowsAbout: [
      'Web Design',
      'Website Development',
      'Responsive Design',
      'WordPress Development',
      'E-commerce Websites',
      'SEO Optimization',
      'Digital Marketing',
      `${escapedName} Business Services`,
      `${escapedCounty} Web Design`
    ],
    // Add service-specific offers
    makesOffer: [
      {
        '@type': 'Offer',
        name: 'Website Design Consultation',
        description: `Free website design consultation for ${escapedName} businesses`,
        price: '0',
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
        validFrom: new Date().toISOString().split('T')[0],
        areaServed: {
          '@type': 'Place',
          name: `${escapedName}, ${escapedCounty}`
        }
      },
      {
        '@type': 'Offer',
        name: 'Professional Website Design',
        description: `Custom website design services for ${escapedName} businesses`,
        price: location.demographics.averageIncome > 30000 ? '1200' : '800',
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
        areaServed: {
          '@type': 'Place',
          name: `${escapedName}, ${escapedCounty}`
        }
      }
    ]
  };
}



/**
 * Generate Service schema for service pages
 */
export function generateServiceSchema(
  service: WebDesignService,
  location?: DorsetLocation
): ServiceSchema {
  const escapedServiceName = escapeString(service.name);
  const escapedDescription = escapeString(service.longDescription);
  
  const areaServed: PlaceSchema[] = location ? [
    {
      '@type': 'Place',
      name: `${escapeString(location.name)}, ${escapeString(location.county)}`,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng
      }
    }
  ] : [
    {
      '@type': 'Place',
      name: 'Dorset, UK'
    }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: escapedServiceName,
    description: escapedDescription,
    provider: {
      '@type': 'Organization',
      name: 'Creative Current',
      url: 'https://creativecurrent.co.uk',
      logo: 'https://creativecurrent.co.uk/images/creative-current-logo.svg',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+44-1234-567890',
          contactType: 'Customer Service',
          areaServed: 'GB',
          availableLanguage: 'English'
        }
      ]
    },
    areaServed,
    offers: [
      {
        '@type': 'Offer',
        name: escapedServiceName,
        description: escapedDescription,
        price: service.pricing.starting.toString(),
        priceCurrency: service.pricing.currency,
        availability: 'https://schema.org/InStock'
      }
    ],
    serviceType: escapedServiceName,
    category: service.category
  };
}

/**
 * Generate FAQ Page schema
 */
export function generateFAQPageSchema(
  faqs: Array<{
    question: string;
    answer: string;
  }>
): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: escapeString(faq.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: escapeString(faq.answer)
      }
    }))
  };
}

/**
 * Generate Breadcrumb List schema
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{
    name: string;
    url: string;
  }>
): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: escapeString(breadcrumb.name),
      item: breadcrumb.url
    }))
  };
}

/**
 * Generate Website schema
 */
export function generateWebsiteSchema(): WebsiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Creative Current',
    url: 'https://creativecurrent.co.uk',
    description: 'Professional web design services in Dorset. Custom websites, responsive design, and digital solutions for businesses.',
    publisher: {
      '@type': 'Organization',
      name: 'Creative Current',
      url: 'https://creativecurrent.co.uk',
      logo: 'https://creativecurrent.co.uk/images/creative-current-logo.svg'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://creativecurrent.co.uk/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@type': 'Organization',
    name: 'Creative Current',
    url: 'https://creativecurrent.co.uk',
    logo: 'https://creativecurrent.co.uk/images/creative-current-logo.svg',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+44-1234-567890',
        contactType: 'Customer Service',
        areaServed: 'GB',
        availableLanguage: 'English'
      }
    ],
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Dorset',
      addressCountry: 'GB'
    },
    sameAs: [
      'https://www.facebook.com/creativecurrent',
      'https://www.linkedin.com/company/creative-current',
      'https://twitter.com/creativecurrent'
    ]
  };
}

/**
 * Combine multiple schema markups into a single JSON-LD script
 */
export function combineSchemas(schemas: SchemaMarkup[]): string {
  if (schemas.length === 0) return '';
  
  if (schemas.length === 1) {
    return JSON.stringify(schemas[0], null, 2);
  }
  
  // Multiple schemas - wrap in array
  return JSON.stringify(schemas, null, 2);
}

/**
 * Validate schema markup (basic validation)
 */
export function validateSchema(schema: SchemaMarkup): boolean {
  try {
    // Check required fields
    if (!schema['@context'] || !schema['@type']) {
      return false;
    }
    
    // Ensure JSON serializable
    JSON.stringify(schema);
    
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate all schemas for a location page
 */
export function generateLocationPageSchemas(
  location: DorsetLocation,
  townSlug: string,
  faqs: Array<{ question: string; answer: string }>,
  breadcrumbs: Array<{ name: string; url: string }>
): SchemaMarkup[] {
  const schemas: SchemaMarkup[] = [];
  
  // Local Business schema
  schemas.push(generateLocalBusinessSchema(location, townSlug));
  
  // FAQ schema if FAQs exist
  if (faqs.length > 0) {
    schemas.push(generateFAQPageSchema(faqs));
  }
  
  // Breadcrumb schema
  if (breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }
  
  // Website schema
  schemas.push(generateWebsiteSchema());
  
  return schemas.filter(validateSchema);
}
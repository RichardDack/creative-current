// src/lib/seo/schema.ts - Schema markup components with strict TypeScript interfaces

/**
 * Schema.org structured data components for SEO optimization
 * Provides type-safe JSON-LD generation for various schema types
 */

// Base schema interfaces
export interface BaseSchema {
  '@context': 'https://schema.org';
  '@type': string;
}

export interface PostalAddress extends BaseSchema {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface GeoCoordinates extends BaseSchema {
  '@type': 'GeoCoordinates';
  latitude: number;
  longitude: number;
}

export interface ContactPoint extends BaseSchema {
  '@type': 'ContactPoint';
  telephone: string;
  contactType: string;
  availableLanguage: string[];
}

export interface OpeningHoursSpecification extends BaseSchema {
  '@type': 'OpeningHoursSpecification';
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

// Business schema interfaces
export interface LocalBusinessSchema extends BaseSchema {
  '@type': 'LocalBusiness';
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: PostalAddress;
  geo: GeoCoordinates;
  contactPoint: ContactPoint[];
  openingHoursSpecification: OpeningHoursSpecification[];
  areaServed: Place[];
  serviceArea: GeoCircle;
  priceRange: string;
  paymentAccepted: string[];
  currenciesAccepted: string[];
  foundingDate: string;
  founder: Person;
  employee: Person[];
  sameAs: string[];
}

export interface OrganizationSchema extends BaseSchema {
  '@type': 'Organization';
  name: string;
  description: string;
  url: string;
  logo: ImageObject;
  contactPoint: ContactPoint[];
  address: PostalAddress;
  sameAs: string[];
  foundingDate: string;
  founder: Person;
  numberOfEmployees: string;
}

export interface WebSiteSchema extends BaseSchema {
  '@type': 'WebSite';
  name: string;
  description: string;
  url: string;
  potentialAction: SearchAction;
  publisher: Organization;
  copyrightYear: number;
  inLanguage: string;
}

// Service schema interfaces
export interface ServiceSchema extends BaseSchema {
  '@type': 'Service';
  name: string;
  description: string;
  provider: Organization;
  areaServed: Place[];
  serviceType: string;
  offers: Offer[];
  category: string;
  hasOfferCatalog: OfferCatalog;
}

export interface ProfessionalServiceSchema extends BaseSchema {
  '@type': 'ProfessionalService';
  name: string;
  description: string;
  provider: Organization;
  areaServed: Place[];
  serviceType: string;
  offers: Offer[];
  category: string;
  priceRange: string;
}

// Supporting interfaces
export interface Place extends BaseSchema {
  '@type': 'Place';
  name: string;
  address?: PostalAddress;
  geo?: GeoCoordinates;
}

export interface GeoCircle extends BaseSchema {
  '@type': 'GeoCircle';
  geoMidpoint: GeoCoordinates;
  geoRadius: string;
}

export interface Person extends BaseSchema {
  '@type': 'Person';
  name: string;
  jobTitle?: string;
  email?: string;
  telephone?: string;
  url?: string;
}

export interface Organization extends BaseSchema {
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: ImageObject;
  contactPoint?: ContactPoint[];
  address?: PostalAddress;
}

export interface ImageObject extends BaseSchema {
  '@type': 'ImageObject';
  url: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface SearchAction extends BaseSchema {
  '@type': 'SearchAction';
  target: string;
  'query-input': string;
}

export interface Offer extends BaseSchema {
  '@type': 'Offer';
  name: string;
  description: string;
  price: string;
  priceCurrency: string;
  availability: string;
  validFrom: string;
  validThrough?: string;
  seller: Organization;
  category: string;
}

export interface OfferCatalog extends BaseSchema {
  '@type': 'OfferCatalog';
  name: string;
  itemListElement: Offer[];
}

export interface BreadcrumbList extends BaseSchema {
  '@type': 'BreadcrumbList';
  itemListElement: ListItem[];
}

export interface ListItem extends BaseSchema {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

/**
 * Escape strings for safe use in JSON-LD schema markup
 */
function escapeSchemaString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

/**
 * URL encode for schema URLs
 */
function encodeSchemaUrl(url: string): string {
  try {
    return new URL(url).toString();
  } catch {
    return encodeURI(url);
  }
}

/**
 * Generate LocalBusiness schema for Creative Current
 */
export function generateLocalBusinessSchema(
  location?: string,
  customData?: Partial<LocalBusinessSchema>
): LocalBusinessSchema {
  const businessName = 'Creative Current';
  const baseUrl = 'https://creativecurrent.co.uk';
  
  // Default Dorset location (can be overridden)
  const defaultAddress: PostalAddress = {
    '@context': 'https://schema.org',
    '@type': 'PostalAddress',
    streetAddress: 'Dorset Business Centre',
    addressLocality: location || 'Dorchester',
    addressRegion: 'Dorset',
    postalCode: 'DT1 1XX',
    addressCountry: 'GB'
  };

  const defaultGeo: GeoCoordinates = {
    '@context': 'https://schema.org',
    '@type': 'GeoCoordinates',
    latitude: 50.7156,
    longitude: -2.4397
  };

  const contactPoint: ContactPoint = {
    '@context': 'https://schema.org',
    '@type': 'ContactPoint',
    telephone: '+44-1234-567890',
    contactType: 'customer service',
    availableLanguage: ['English']
  };

  const openingHours: OpeningHoursSpecification = {
    '@context': 'https://schema.org',
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00'
  };

  const areaServed: Place[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Place',
      name: 'Dorset, England'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Place',
      name: 'Bournemouth'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Place',
      name: 'Poole'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Place',
      name: 'Weymouth'
    }
  ];

  const serviceArea: GeoCircle = {
    '@context': 'https://schema.org',
    '@type': 'GeoCircle',
    geoMidpoint: defaultGeo,
    geoRadius: '50 km'
  };

  const founder: Person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Creative Current Team',
    jobTitle: 'Web Design Specialists'
  };

  const schema: LocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: escapeSchemaString(businessName),
    description: escapeSchemaString('Professional web design and development services in Dorset. Custom websites, responsive design, and digital solutions for businesses.'),
    url: encodeSchemaUrl(baseUrl),
    telephone: '+44-1234-567890',
    email: 'hello@creativecurrent.co.uk',
    address: defaultAddress,
    geo: defaultGeo,
    contactPoint: [contactPoint],
    openingHoursSpecification: [openingHours],
    areaServed,
    serviceArea,
    priceRange: '££',
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
    currenciesAccepted: ['GBP'],
    foundingDate: '2020-01-01',
    founder,
    employee: [founder],
    sameAs: [
      'https://www.facebook.com/creativecurrent',
      'https://www.linkedin.com/company/creativecurrent',
      'https://twitter.com/creativecurrent'
    ],
    ...customData
  };

  return schema;
}

/**
 * Generate Service schema for web design services
 */
export function generateServiceSchema(
  serviceName: string,
  serviceDescription: string,
  location?: string,
  customData?: Partial<ServiceSchema>
): ServiceSchema {
  const provider: Organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: escapeSchemaString('Creative Current'),
    url: encodeSchemaUrl('https://creativecurrent.co.uk')
  };

  const areaServed: Place[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Place',
      name: location ? escapeSchemaString(location) : 'Dorset, England'
    }
  ];

  const offers: Offer[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Offer',
      name: escapeSchemaString(`${serviceName} Service`),
      description: escapeSchemaString(serviceDescription),
      price: 'Contact for Quote',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
      seller: provider,
      category: escapeSchemaString('Web Design Services')
    }
  ];

  const schema: ServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: escapeSchemaString(serviceName),
    description: escapeSchemaString(serviceDescription),
    provider,
    areaServed,
    serviceType: escapeSchemaString('Web Design'),
    offers,
    category: escapeSchemaString('Professional Services'),
    hasOfferCatalog: {
      '@context': 'https://schema.org',
      '@type': 'OfferCatalog',
      name: escapeSchemaString(`${serviceName} Packages`),
      itemListElement: offers
    },
    ...customData
  };

  return schema;
}

/**
 * Generate Organization schema for Creative Current
 */
export function generateOrganizationSchema(
  customData?: Partial<OrganizationSchema>
): OrganizationSchema {
  const logo: ImageObject = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: encodeSchemaUrl('https://creativecurrent.co.uk/images/creative-current-logo.png'),
    width: 300,
    height: 100,
    caption: escapeSchemaString('Creative Current Logo')
  };

  const contactPoint: ContactPoint = {
    '@context': 'https://schema.org',
    '@type': 'ContactPoint',
    telephone: '+44-1234-567890',
    contactType: 'customer service',
    availableLanguage: ['English']
  };

  const address: PostalAddress = {
    '@context': 'https://schema.org',
    '@type': 'PostalAddress',
    streetAddress: 'Dorset Business Centre',
    addressLocality: 'Dorchester',
    addressRegion: 'Dorset',
    postalCode: 'DT1 1XX',
    addressCountry: 'GB'
  };

  const founder: Person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Creative Current Team',
    jobTitle: 'Web Design Specialists'
  };

  const schema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: escapeSchemaString('Creative Current'),
    description: escapeSchemaString('Professional web design and development agency specializing in custom websites, responsive design, and digital solutions for businesses across Dorset.'),
    url: encodeSchemaUrl('https://creativecurrent.co.uk'),
    logo,
    contactPoint: [contactPoint],
    address,
    sameAs: [
      'https://www.facebook.com/creativecurrent',
      'https://www.linkedin.com/company/creativecurrent',
      'https://twitter.com/creativecurrent'
    ],
    foundingDate: '2020-01-01',
    founder,
    numberOfEmployees: '2-10',
    ...customData
  };

  return schema;
}

/**
 * Generate WebSite schema with search functionality
 */
export function generateWebSiteSchema(
  customData?: Partial<WebSiteSchema>
): WebSiteSchema {
  const searchAction: SearchAction = {
    '@context': 'https://schema.org',
    '@type': 'SearchAction',
    target: encodeSchemaUrl('https://creativecurrent.co.uk/search?q={search_term_string}'),
    'query-input': 'required name=search_term_string'
  };

  const publisher: Organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: escapeSchemaString('Creative Current'),
    url: encodeSchemaUrl('https://creativecurrent.co.uk')
  };

  const schema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: escapeSchemaString('Creative Current - Professional Web Design Services'),
    description: escapeSchemaString('Professional web design and development services in Dorset. Custom websites, responsive design, and digital solutions for businesses.'),
    url: encodeSchemaUrl('https://creativecurrent.co.uk'),
    potentialAction: searchAction,
    publisher,
    copyrightYear: new Date().getFullYear(),
    inLanguage: 'en-GB',
    ...customData
  };

  return schema;
}

/**
 * Generate BreadcrumbList schema for navigation
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; href: string }>,
  baseUrl: string = 'https://creativecurrent.co.uk'
): BreadcrumbList {
  const itemListElement: ListItem[] = breadcrumbs.map((crumb, index) => ({
    '@context': 'https://schema.org',
    '@type': 'ListItem',
    position: index + 1,
    name: escapeSchemaString(crumb.name),
    item: encodeSchemaUrl(crumb.href.startsWith('http') ? crumb.href : `${baseUrl}${crumb.href}`)
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  };
}

/**
 * Generate ProfessionalService schema for specific services
 */
export function generateProfessionalServiceSchema(
  serviceName: string,
  serviceDescription: string,
  priceRange: string = '££',
  location?: string,
  customData?: Partial<ProfessionalServiceSchema>
): ProfessionalServiceSchema {
  const provider: Organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: escapeSchemaString('Creative Current'),
    url: encodeSchemaUrl('https://creativecurrent.co.uk')
  };

  const areaServed: Place[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Place',
      name: location ? escapeSchemaString(`${location}, Dorset`) : 'Dorset, England'
    }
  ];

  const offers: Offer[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Offer',
      name: escapeSchemaString(`Professional ${serviceName}`),
      description: escapeSchemaString(serviceDescription),
      price: 'Contact for Quote',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
      seller: provider,
      category: escapeSchemaString('Web Design Services')
    }
  ];

  const schema: ProfessionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: escapeSchemaString(serviceName),
    description: escapeSchemaString(serviceDescription),
    provider,
    areaServed,
    serviceType: escapeSchemaString('Web Design & Development'),
    offers,
    category: escapeSchemaString('Digital Services'),
    priceRange,
    ...customData
  };

  return schema;
}

/**
 * Convert schema object to JSON-LD script tag content
 */
export function schemaToJsonLd(schema: BaseSchema): string {
  return JSON.stringify(schema, null, 0);
}

/**
 * Generate multiple schema types for a page
 */
export function generatePageSchemas(
  pageType: 'homepage' | 'service' | 'location' | 'about' | 'contact',
  options: {
    serviceName?: string;
    serviceDescription?: string;
    location?: string;
    breadcrumbs?: Array<{ name: string; href: string }>;
  } = {}
): BaseSchema[] {
  const schemas: BaseSchema[] = [];

  // Always include Organization and WebSite schemas
  schemas.push(generateOrganizationSchema());
  schemas.push(generateWebSiteSchema());

  // Add page-specific schemas
  switch (pageType) {
    case 'homepage':
      schemas.push(generateLocalBusinessSchema());
      break;
    
    case 'service':
      if (options.serviceName && options.serviceDescription) {
        schemas.push(generateServiceSchema(
          options.serviceName,
          options.serviceDescription,
          options.location
        ));
        schemas.push(generateProfessionalServiceSchema(
          options.serviceName,
          options.serviceDescription,
          '££',
          options.location
        ));
      }
      break;
    
    case 'location':
      schemas.push(generateLocalBusinessSchema(options.location));
      if (options.serviceName && options.serviceDescription) {
        schemas.push(generateServiceSchema(
          options.serviceName,
          options.serviceDescription,
          options.location
        ));
      }
      break;
    
    case 'about':
    case 'contact':
      schemas.push(generateLocalBusinessSchema());
      break;
  }

  // Add breadcrumb schema if provided
  if (options.breadcrumbs && options.breadcrumbs.length > 1) {
    schemas.push(generateBreadcrumbSchema(options.breadcrumbs));
  }

  return schemas;
}
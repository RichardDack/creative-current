// src/lib/seo/schema.ts - Structured data schema markup utilities

export type SchemaMarkup = object;

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  logo: string;
  image: string;
  telephone: string;
  email: string;
  address: {
    "@type": string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo: {
    "@type": string;
    latitude: number;
    longitude: number;
  };
  areaServed: Array<{
    "@type": string;
    name: string;
  }>;
  serviceArea: {
    "@type": string;
    name: string;
  };
  sameAs: string[];
}

export interface WebsiteSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  description: string;
  publisher: {
    "@type": string;
    name: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
  potentialAction: {
    "@type": string;
    target: string;
    "query-input": string;
  };
}

export interface LocalBusinessSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    "@type": string;
    latitude: number;
    longitude: number;
  };
  openingHours: string[];
  contactPoint?: Array<{
    "@type": string;
    telephone?: string;
    email?: string;
    contactType: string;
    areaServed: string;
    availableLanguage?: string;
  }>;
  priceRange: string;
  areaServed: Array<{
    "@type": string;
    name: string;
  }>;
  serviceArea: {
    "@type": string;
    name: string;
  };
  hasOfferCatalog: {
    "@type": string;
    name: string;
    itemListElement: Array<{
      "@type": string;
      itemOffered: {
        "@type": string;
        name: string;
        description: string;
      };
    }>;
  };
  aggregateRating?: {
    "@type": string;
    ratingValue: string;
    reviewCount: string;
    bestRating: string;
    worstRating: string;
  };
  review?: Array<{
    "@type": string;
    reviewRating: {
      "@type": string;
      ratingValue: string;
      bestRating: string;
    };
    author: {
      "@type": string;
      name: string;
    };
    reviewBody: string;
  }>;
}

const baseUrl = 'https://creativecurrent.co.uk';

/**
 * Generate Organization schema for homepage
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Creative Current",
    description: "Professional web design and development agency specializing in responsive websites, UI/UX design, and digital solutions for businesses across Dorset.",
    url: baseUrl,
    logo: `${baseUrl}/creative-current-logo.svg`,
    image: `${baseUrl}/images/creative-current-og-image.jpg`,
    telephone: "+44-1234-567890", // Replace with actual phone
    email: "hello@creativecurrent.co.uk", // Replace with actual email
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dorset",
      addressRegion: "England",
      addressCountry: "GB"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.7156,
      longitude: -2.4372
    },
    areaServed: [
      { "@type": "Place", name: "Dorset" },
      { "@type": "Place", name: "Bournemouth" },
      { "@type": "Place", name: "Poole" },
      { "@type": "Place", name: "Weymouth" },
      { "@type": "Place", name: "Dorchester" },
      { "@type": "Place", name: "Swanage" }
    ],
    serviceArea: {
      "@type": "Place",
      name: "Dorset, England"
    },
    sameAs: [
      "https://www.linkedin.com/company/creative-current",
      "https://twitter.com/creativecurrent",
      "https://www.instagram.com/creativecurrent"
    ]
  };
}

/**
 * Generate Website schema for homepage
 */
export function generateWebsiteSchema(): WebsiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Creative Current",
    url: baseUrl,
    description: "Professional web design and development services in Dorset. Creating stunning, responsive websites for businesses across Bournemouth, Poole, Weymouth, and Dorchester.",
    publisher: {
      "@type": "Organization",
      name: "Creative Current",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/creative-current-logo.svg`
      }
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate enhanced LocalBusiness schema for location pages with comprehensive data
 */
export function generateLocalBusinessSchema(town: string, locationData?: {
  coordinates?: { lat: number; lng: number };
  postcodes?: string[];
  nearbyTowns?: string[];
  keyIndustries?: string[];
  description?: string;
}): LocalBusinessSchema {
  const townName = town.charAt(0).toUpperCase() + town.slice(1);
  
  // Use location data if provided, otherwise fall back to basic coordinates
  const coordinates = locationData?.coordinates || getTownCoordinates(town);
  const postcodes = locationData?.postcodes || [getPostalCode(town)];
  const nearbyTowns = locationData?.nearbyTowns || [];
  const keyIndustries = locationData?.keyIndustries || [];
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Creative Current - Web Design ${townName}`,
    description: `Professional web design and development services in ${townName}, Dorset. Specializing in responsive websites, e-commerce solutions, and digital marketing for local businesses. ${locationData?.description || ''}`,
    url: `${baseUrl}/web-design/${town}`,
    telephone: "+44-1234-567890", // Replace with actual phone
    email: "hello@creativecurrent.co.uk", // Replace with actual email
    address: {
      "@type": "PostalAddress",
      streetAddress: "Service Area", // Replace with actual address if applicable
      addressLocality: townName,
      addressRegion: "Dorset",
      postalCode: postcodes[0],
      addressCountry: "GB"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: coordinates.lat,
      longitude: coordinates.lng
    },
    openingHours: [
      "Mo-Fr 09:00-17:00",
      "Sa 10:00-16:00"
    ],
    // Add business contact information
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+44-1234-567890",
        contactType: "customer service",
        areaServed: "GB",
        availableLanguage: "English"
      },
      {
        "@type": "ContactPoint",
        email: "hello@creativecurrent.co.uk",
        contactType: "customer service",
        areaServed: "GB"
      }
    ],
    priceRange: "££",
    // Enhanced areaServed with comprehensive coverage
    areaServed: [
      { "@type": "Place", name: townName },
      { "@type": "Place", name: "Dorset" },
      // Add nearby towns
      ...nearbyTowns.slice(0, 3).map((nearbyTown: string) => ({
        "@type": "Place",
        name: nearbyTown.charAt(0).toUpperCase() + nearbyTown.slice(1)
      })),
      // Add postcode areas
      ...postcodes.map((postcode: string) => ({
        "@type": "Place",
        name: `${postcode} postcode area`
      }))
    ],
    serviceArea: {
      "@type": "Place",
      name: `${townName} and surrounding Dorset areas`
    },
    // Enhanced service catalog with industry-specific offerings
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Design Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Responsive Web Design",
            description: `Custom responsive websites for ${townName} businesses that work perfectly on all devices`
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-commerce Development",
            description: `Professional online stores and e-commerce solutions for ${townName} retailers`
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Local SEO Optimization",
            description: `Search engine optimization to help ${townName} businesses rank higher in local searches`
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Maintenance",
            description: `Ongoing support and maintenance for ${townName} business websites`
          }
        },
        // Add industry-specific services if available
        ...(keyIndustries.includes('Tourism') ? [{
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tourism Website Design",
            description: `Specialized websites for ${townName} tourism and hospitality businesses with booking systems`
          }
        }] : []),
        ...(keyIndustries.includes('Marine') ? [{
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Marine Business Websites",
            description: `Professional websites for ${townName} marine and maritime businesses`
          }
        }] : [])
      ]
    },
    // Note: aggregateRating and review schemas removed to avoid fake reviews
    // Real reviews should be added when available from actual clients
  };
}

/**
 * Generate Service schema
 */
export function generateServiceSchema(serviceName: string, description: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: description,
    provider: {
      "@type": "Organization",
      name: "Creative Current",
      url: baseUrl
    },
    areaServed: {
      "@type": "Place",
      name: "Dorset, England"
    },
    serviceType: "Web Design and Development",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceRange: "££",
      priceCurrency: "GBP"
    }
  };
}

/**
 * Generate Breadcrumb schema
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

/**
 * Get town coordinates (approximate)
 */
function getTownCoordinates(town: string): { lat: number; lng: number } {
  const coordinates: Record<string, { lat: number; lng: number }> = {
    bournemouth: { lat: 50.7192, lng: -1.8808 },
    poole: { lat: 50.7150, lng: -1.9872 },
    weymouth: { lat: 50.6139, lng: -2.4578 },
    dorchester: { lat: 50.7156, lng: -2.4372 },
    swanage: { lat: 50.6094, lng: -1.9594 },
    bridport: { lat: 50.7342, lng: -2.7581 },
    sherborne: { lat: 50.9486, lng: -2.5158 },
    blandford: { lat: 50.8558, lng: -2.1647 }
  };
  
  return coordinates[town] || { lat: 50.7156, lng: -2.4372 }; // Default to Dorchester
}

/**
 * Get postal code for town (approximate)
 */
function getPostalCode(town: string): string {
  const postalCodes: Record<string, string> = {
    bournemouth: "BH1",
    poole: "BH15",
    weymouth: "DT4",
    dorchester: "DT1",
    swanage: "BH19",
    bridport: "DT6",
    sherborne: "DT9",
    blandford: "DT11"
  };
  
  return postalCodes[town] || "DT1";
}

/**
 * Generate ImageObject schema for portfolio images
 */
export function generateImageSchema(
  imageUrl: string,
  title: string,
  description: string,
  width?: number,
  height?: number
): object {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    url: imageUrl,
    name: title,
    description: description,
    ...(width && { width }),
    ...(height && { height }),
    creator: {
      "@type": "Organization",
      name: "Creative Current"
    },
    copyrightHolder: {
      "@type": "Organization",
      name: "Creative Current"
    }
  };
}

/**
 * Generate CreativeWork schema for portfolio projects
 */
export function generateCreativeWorkSchema(
  project: {
    title: string;
    description: string;
    image: string;
    category: string;
    url?: string;
  }
): object {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.image,
    genre: project.category,
    creator: {
      "@type": "Organization",
      name: "Creative Current",
      url: baseUrl
    },
    ...(project.url && { url: project.url }),
    dateCreated: new Date().getFullYear().toString(),
    inLanguage: "en-GB"
  };
}

/**
 * Generate comprehensive location page schemas with enhanced data
 */
export function generateLocationPageSchemas(
  locationData: {
    name: string;
    description: string;
    coordinates: { lat: number; lng: number };
    postcodes: string[];
    county: string;
    seoData?: {
      localLandmarks?: string[];
    };
  },
  townSlug: string,
  faqs: Array<{ question: string; answer: string }>,
  breadcrumbs: Array<{ name: string; href: string; url: string }>
): object[] {
  const schemas: object[] = [];

  // Enhanced LocalBusiness schema with full location data
  schemas.push(generateLocalBusinessSchema(townSlug, locationData));

  // Breadcrumb schema
  if (breadcrumbs && breadcrumbs.length > 1) {
    schemas.push(generateBreadcrumbSchema(
      breadcrumbs.map(crumb => ({ name: crumb.name, url: crumb.url }))
    ));
  }

  // FAQ schema with location-specific questions
  if (faqs && faqs.length > 0) {
    schemas.push(generateFAQSchema(faqs));
  }

  // Add WebPage schema for better page understanding
  schemas.push(generateWebPageSchema(locationData.name, townSlug, locationData.description));

  // Add Place schema for the location itself
  schemas.push(generatePlaceSchema(locationData));

  return schemas;
}

/**
 * Generate WebPage schema for location pages
 */
export function generateWebPageSchema(townName: string, townSlug: string, description: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Web Design ${townName} - Creative Current`,
    description: `Professional web design services in ${townName}, Dorset. ${description}`,
    url: `${baseUrl}/web-design/${townSlug}`,
    mainEntity: {
      "@type": "LocalBusiness",
      name: `Creative Current - Web Design ${townName}`
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Web Design",
          item: `${baseUrl}/web-design`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: townName,
          item: `${baseUrl}/web-design/${townSlug}`
        }
      ]
    },
    inLanguage: "en-GB",
    isPartOf: {
      "@type": "WebSite",
      name: "Creative Current",
      url: baseUrl
    }
  };
}

/**
 * Generate Place schema for the location
 */
export function generatePlaceSchema(locationData: {
  name: string;
  description: string;
  coordinates: { lat: number; lng: number };
  postcodes: string[];
  county: string;
  seoData?: {
    localLandmarks?: string[];
  };
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: locationData.name,
    description: locationData.description,
    geo: {
      "@type": "GeoCoordinates",
      latitude: locationData.coordinates.lat,
      longitude: locationData.coordinates.lng
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: locationData.name,
      addressRegion: locationData.county,
      addressCountry: "GB",
      postalCode: locationData.postcodes[0]
    },
    containedInPlace: {
      "@type": "Place",
      name: locationData.county
    },
    // Add local landmarks as points of interest
    ...(locationData.seoData?.localLandmarks && {
      hasMap: `https://www.google.com/maps/search/${encodeURIComponent(locationData.name + ', ' + locationData.county)}`,
      additionalProperty: locationData.seoData.localLandmarks.slice(0, 3).map((landmark: string) => ({
        "@type": "PropertyValue",
        name: "Local Landmark",
        value: landmark
      }))
    })
  };
}

/**
 * Generate enhanced FAQ schema with better structure
 */
export function generateEnhancedFAQSchema(faqs: Array<{ 
  question: string; 
  answer: string; 
  schema?: Record<string, unknown> 
}>): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
        inLanguage: "en-GB"
      }
    })),
    inLanguage: "en-GB",
    about: {
      "@type": "Service",
      name: "Web Design Services",
      provider: {
        "@type": "Organization",
        name: "Creative Current"
      }
    }
  };
}

/**
 * Generate combined schema markup for a page
 */
export function generatePageSchema(
  pageType: 'homepage' | 'location' | 'service' | 'about' | 'contact' | 'work' | 'terms' | 'privacy',
  options?: {
    town?: string;
    service?: string;
    breadcrumbs?: Array<{ name: string; url: string }>;
    faqs?: Array<{ question: string; answer: string }>;
    projects?: Array<{
      title: string;
      description: string;
      image: string;
      category: string;
      url?: string;
    }>;
    locationData?: {
      name: string;
      description: string;
      coordinates: { lat: number; lng: number };
      postcodes: string[];
      county: string;
      seoData?: {
        localLandmarks?: string[];
      };
    };
  }
): object[] {
  const schemas: object[] = [];
  
  switch (pageType) {
    case 'homepage':
      schemas.push(generateOrganizationSchema());
      schemas.push(generateWebsiteSchema());
      break;
      
    case 'location':
      if (options?.town && options?.locationData) {
        // Use the new comprehensive location schema generation
        return generateLocationPageSchemas(
          options.locationData,
          options.town,
          options.faqs || [],
          options.breadcrumbs?.map(b => ({ name: b.name, href: b.url, url: b.url })) || []
        );
      } else if (options?.town) {
        schemas.push(generateLocalBusinessSchema(options.town));
      }
      break;
      
    case 'service':
      if (options?.service) {
        const serviceName = options.service.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        schemas.push(generateServiceSchema(serviceName, `Professional ${serviceName.toLowerCase()} services in Dorset`));
      }
      break;
      
    case 'work':
      // Add portfolio/creative work schemas
      if (options?.projects) {
        options.projects.forEach(project => {
          schemas.push(generateCreativeWorkSchema(project));
        });
      }
      break;
      
    case 'terms':
      schemas.push(generateTermsSchema());
      break;
      
    case 'privacy':
      schemas.push(generatePrivacySchema());
      break;
  }
  
  // Add breadcrumbs if provided
  if (options?.breadcrumbs && options.breadcrumbs.length > 1) {
    schemas.push(generateBreadcrumbSchema(options.breadcrumbs));
  }
  
  // Add FAQs if provided
  if (options?.faqs && options.faqs.length > 0) {
    schemas.push(generateFAQSchema(options.faqs));
  }
  
  return schemas;
}

/**
 * Generate schema for terms page
 */
export function generateTermsSchema(): object {
  return {
    '@type': 'WebPage',
    '@id': `${baseUrl}/terms#webpage`,
    url: `${baseUrl}/terms`,
    name: 'Terms of Service - Creative Current',
    description: 'Terms of service and conditions for Creative Current web design services in Dorset.',
    isPartOf: {
      '@id': `${baseUrl}#website`
    },
    about: {
      '@id': `${baseUrl}#organization`
    },
    datePublished: '2024-01-01T00:00:00+00:00',
    dateModified: new Date().toISOString(),
    breadcrumb: {
      '@id': `${baseUrl}/terms#breadcrumb`
    },
    inLanguage: 'en-GB',
    potentialAction: [
      {
        '@type': 'ReadAction',
        target: [`${baseUrl}/terms`]
      }
    ]
  };
}

/**
 * Generate schema for privacy page
 */
export function generatePrivacySchema(): object {
  return {
    '@type': 'WebPage',
    '@id': `${baseUrl}/privacy#webpage`,
    url: `${baseUrl}/privacy`,
    name: 'Privacy Policy - Creative Current',
    description: 'Privacy policy and data protection information for Creative Current web design services.',
    isPartOf: {
      '@id': `${baseUrl}#website`
    },
    about: {
      '@id': `${baseUrl}#organization`
    },
    datePublished: '2024-01-01T00:00:00+00:00',
    dateModified: new Date().toISOString(),
    breadcrumb: {
      '@id': `${baseUrl}/privacy#breadcrumb`
    },
    inLanguage: 'en-GB',
    potentialAction: [
      {
        '@type': 'ReadAction',
        target: [`${baseUrl}/privacy`]
      }
    ]
  };
}
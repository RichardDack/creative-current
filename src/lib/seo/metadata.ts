// src/lib/seo/metadata.ts
import { Metadata } from 'next';

export interface LocalSEOData {
  town: string;
  county: string;
  population?: string;
  keyBusinesses?: string[];
  landmarks?: string[];
  postcode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const dorseyTowns: Record<string, LocalSEOData> = {
  bournemouth: {
    town: 'Bournemouth',
    county: 'Dorset',
    population: '183,500',
    keyBusinesses: ['Tourism', 'Financial Services', 'Digital Media', 'Healthcare'],
    landmarks: ['Bournemouth Pier', 'Russell-Cotes Museum', 'Bournemouth Gardens'],
    postcode: 'BH1-BH12',
    coordinates: { lat: 50.7192, lng: -1.8808 }
  },
  poole: {
    town: 'Poole',
    county: 'Dorset',
    population: '151,500',
    keyBusinesses: ['Marine Industry', 'Tourism', 'Technology', 'Retail'],
    landmarks: ['Poole Harbour', 'Sandbanks Beach', 'Brownsea Island'],
    postcode: 'BH13-BH17',
    coordinates: { lat: 50.7150, lng: -2.0060 }
  },
  weymouth: {
    town: 'Weymouth',
    county: 'Dorset',
    population: '52,300',
    keyBusinesses: ['Tourism', 'Fishing', 'Marine Services', 'Retail'],
    landmarks: ['Weymouth Beach', 'Nothe Fort', 'Sea Life Centre'],
    postcode: 'DT3-DT4',
    coordinates: { lat: 50.6139, lng: -2.4517 }
  },
  christchurch: {
    town: 'Christchurch',
    county: 'Dorset',
    population: '48,400',
    keyBusinesses: ['Tourism', 'Aerospace', 'Technology', 'Retail'],
    landmarks: ['Christchurch Priory', 'Mudeford Quay', 'Place Mill'],
    postcode: 'BH23',
    coordinates: { lat: 50.7357, lng: -1.7786 }
  },
  ferndown: {
    town: 'Ferndown',
    county: 'Dorset',
    population: '26,500',
    keyBusinesses: ['Technology', 'Manufacturing', 'Retail', 'Professional Services'],
    landmarks: ['Ferndown Town Centre', 'King George V Playing Fields'],
    postcode: 'BH22',
    coordinates: { lat: 50.8000, lng: -1.9000 }
  },
  dorchester: {
    town: 'Dorchester',
    county: 'Dorset',
    population: '21,400',
    keyBusinesses: ['Agriculture', 'Tourism', 'Professional Services', 'Education'],
    landmarks: ['Maiden Castle', 'Roman Town House', 'Thomas Hardy Statue'],
    postcode: 'DT1',
    coordinates: { lat: 50.7120, lng: -2.4410 }
  },
  'wimborne-minster': {
    town: 'Wimborne Minster',
    county: 'Dorset',
    population: '15,500',
    keyBusinesses: ['Tourism', 'Retail', 'Professional Services', 'Agriculture'],
    landmarks: ['Wimborne Minster Church', 'Priest\'s House Museum'],
    postcode: 'BH21',
    coordinates: { lat: 50.7997, lng: -1.9847 }
  },
  bridport: {
    town: 'Bridport',
    county: 'Dorset',
    population: '13,600',
    keyBusinesses: ['Tourism', 'Creative Industries', 'Retail', 'Agriculture'],
    landmarks: ['West Bay', 'Bridport Arts Centre', 'Historic Rope Walk'],
    postcode: 'DT6',
    coordinates: { lat: 50.7342, lng: -2.7583 }
  },
  verwood: {
    town: 'Verwood',
    county: 'Dorset',
    population: '13,800',
    keyBusinesses: ['Manufacturing', 'Retail', 'Professional Services'],
    landmarks: ['Verwood Town Centre', 'Three Legged Cross'],
    postcode: 'BH31',
    coordinates: { lat: 50.8800, lng: -1.8700 }
  },
  'blandford-forum': {
    town: 'Blandford Forum',
    county: 'Dorset',
    population: '11,700',
    keyBusinesses: ['Agriculture', 'Tourism', 'Retail', 'Manufacturing'],
    landmarks: ['Georgian Market Town', 'Blandford Fashion Museum'],
    postcode: 'DT11',
    coordinates: { lat: 50.8558, lng: -2.1650 }
  },
  gillingham: {
    town: 'Gillingham',
    county: 'Dorset',
    population: '11,300',
    keyBusinesses: ['Manufacturing', 'Agriculture', 'Retail', 'Professional Services'],
    landmarks: ['Gillingham Town Bridge', 'Royal Forest of Blackmore'],
    postcode: 'SP8',
    coordinates: { lat: 51.0386, lng: -2.2733 }
  },
  swanage: {
    town: 'Swanage',
    county: 'Dorset',
    population: '9,600',
    keyBusinesses: ['Tourism', 'Marine Services', 'Retail'],
    landmarks: ['Swanage Railway', 'Jurassic Coast', 'Swanage Pier'],
    postcode: 'BH19',
    coordinates: { lat: 50.6094, lng: -1.9581 }
  },
  sherborne: {
    town: 'Sherborne',
    county: 'Dorset',
    population: '9,500',
    keyBusinesses: ['Education', 'Tourism', 'Professional Services', 'Retail'],
    landmarks: ['Sherborne Abbey', 'Sherborne Castle', 'Sherborne School'],
    postcode: 'DT9',
    coordinates: { lat: 50.9464, lng: -2.5172 }
  },
  shaftesbury: {
    town: 'Shaftesbury',
    county: 'Dorset',
    population: '7,300',
    keyBusinesses: ['Tourism', 'Agriculture', 'Retail', 'Professional Services'],
    landmarks: ['Gold Hill', 'Shaftesbury Abbey', 'Abbey Museum'],
    postcode: 'SP7',
    coordinates: { lat: 51.0042, lng: -2.1953 }
  },
  wareham: {
    town: 'Wareham',
    county: 'Dorset',
    population: '5,500',
    keyBusinesses: ['Tourism', 'Marine Services', 'Agriculture', 'Retail'],
    landmarks: ['Saxon Town Walls', 'RSPB Arne', 'Wareham Quay'],
    postcode: 'BH20',
    coordinates: { lat: 50.6878, lng: -2.1108 }
  },
  'lyme-regis': {
    town: 'Lyme Regis',
    county: 'Dorset',
    population: '3,700',
    keyBusinesses: ['Tourism', 'Fossil Hunting', 'Marine Services', 'Retail'],
    landmarks: ['The Cobb', 'Lyme Regis Museum', 'Jurassic Coast'],
    postcode: 'DT7',
    coordinates: { lat: 50.7258, lng: -2.9378 }
  }
};

export const generateLocalMetadata = (
  town: string,
  service: string = 'web design'
): Metadata => {
  const townData = dorseyTowns[town.toLowerCase().replace(/\s+/g, '-')];
  
  if (!townData) {
    throw new Error(`Town data not found for: ${town}`);
  }

  const townName = townData.town;
  const county = townData.county;
  
  return {
    title: `Professional Web Design ${townName} | Creative Current - ${county} Web Developers`,
    description: `Expert web design and development services in ${townName}, ${county}. Creative Current delivers stunning, responsive websites for businesses across ${townName}. Get a quote today!`,
    keywords: [
      `web design ${townName.toLowerCase()}`,
      `website design ${townName.toLowerCase()}`,
      `web development ${townName.toLowerCase()}`,
      `${townName.toLowerCase()} web designers`,
      `website developers ${townName.toLowerCase()}`,
      `responsive design ${townName.toLowerCase()}`,
      `${county.toLowerCase()} web design`,
      `local web design ${townName.toLowerCase()}`,
      `small business websites ${townName.toLowerCase()}`,
      `ecommerce ${townName.toLowerCase()}`,
      `SEO ${townName.toLowerCase()}`,
      `digital marketing ${townName.toLowerCase()}`
    ].join(', '),
    authors: [{ name: 'Creative Current' }],
    creator: 'Creative Current',
    publisher: 'Creative Current',
    
    // Open Graph
    openGraph: {
      title: `Web Design ${townName} | Creative Current - Professional ${county} Web Developers`,
      description: `Transform your ${townName} business with professional web design. Creative Current creates stunning, mobile-responsive websites that drive results.`,
      url: `https://creativecurrent.co.uk/web-design/${town.toLowerCase().replace(/\s+/g, '-')}`,
      siteName: 'Creative Current',
      locale: 'en_GB',
      type: 'website',
      images: [
        {
          url: '/images/og/web-design-og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Web Design Services in ${townName}, ${county}`
        }
      ]
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: `Web Design ${townName} | Creative Current`,
      description: `Professional web design services in ${townName}, ${county}. Custom websites that convert visitors into customers.`,
      creator: '@creativecurrent',
      images: ['/images/twitter/web-design-twitter-card.jpg']
    },

    // Robots and indexing
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },

    // Canonical URL
    alternates: {
      canonical: `https://creativecurrent.co.uk/web-design/${town.toLowerCase().replace(/\s+/g, '-')}`
    },

    // Additional metadata
    category: 'Web Design Services',
    classification: 'Business Services',
    
    // Geo-targeting
    other: {
      'geo.region': 'GB-DOR',
      'geo.placename': `${townName}, ${county}`,
      'geo.position': townData.coordinates ? `${townData.coordinates.lat};${townData.coordinates.lng}` : undefined,
      'ICBM': townData.coordinates ? `${townData.coordinates.lat}, ${townData.coordinates.lng}` : undefined,
      'DC.title': `Web Design ${townName} | Creative Current`,
      'DC.creator': 'Creative Current',
      'DC.subject': `Web Design, Website Development, ${townName}, ${county}`,
      'DC.description': `Professional web design and development services in ${townName}, ${county}`,
      'DC.publisher': 'Creative Current',
      'DC.contributor': 'Creative Current Team',
      'DC.date': new Date().toISOString().split('T')[0],
      'DC.type': 'Service',
      'DC.format': 'text/html',
      'DC.identifier': `https://creativecurrent.co.uk/web-design/${town.toLowerCase().replace(/\s+/g, '-')}`,
      'DC.source': 'Creative Current',
      'DC.language': 'en-GB',
      'DC.relation': 'https://creativecurrent.co.uk',
      'DC.coverage': `${townName}, ${county}, England`
    }
  };
};

// Generate schema.org structured data for local business
export const generateLocalBusinessSchema = (townKey: string, service: string = 'web design') => {
  const townData = dorseyTowns[townKey];
  
  if (!townData) {
    throw new Error(`Town data not found for: ${townKey}`);
  }

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://creativecurrent.co.uk/web-design/${townKey}`,
    "name": "Creative Current",
    "alternateName": "Creative Current Web Design",
    "description": `Professional web design and development services in ${townData.town}, ${townData.county}`,
    "url": `https://creativecurrent.co.uk/web-design/${townKey}`,
    "telephone": "+44 1305 584997",
    "email": "hello@creativecurrent.co.uk",
    "foundingDate": "2019",
    "founder": {
      "@type": "Person",
      "name": "Richard Dack"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dorchester",
      "addressRegion": "Dorset",
      "addressCountry": "GB",
      "postalCode": "DT1"
    },
    "geo": townData.coordinates ? {
      "@type": "GeoCoordinates",
      "latitude": townData.coordinates.lat,
      "longitude": townData.coordinates.lng
    } : undefined,
    "areaServed": [
      {
        "@type": "City",
        "name": townData.town,
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": townData.county
        }
      },
      {
        "@type": "AdministrativeArea",
        "name": "Dorset"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": townData.coordinates ? {
        "@type": "GeoCoordinates",
        "latitude": townData.coordinates.lat,
        "longitude": townData.coordinates.lng
      } : undefined,
      "geoRadius": "50000"
    },
    "priceRange": "££",
    "openingHours": [
      "Mo-Fr 09:00-17:30"
    ],
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "currenciesAccepted": "GBP",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Design Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Website Design & Development",
            "description": `Custom website design and development for businesses in ${townData.town}`,
            "provider": {
              "@type": "LocalBusiness",
              "name": "Creative Current"
            },
            "areaServed": townData.town,
            "category": "Web Design"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce Development",
            "description": `Online shop development for ${townData.town} businesses`,
            "provider": {
              "@type": "LocalBusiness",
              "name": "Creative Current"
            },
            "areaServed": townData.town,
            "category": "E-commerce"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO Services",
            "description": `Search engine optimization for ${townData.town} businesses`,
            "provider": {
              "@type": "LocalBusiness",
              "name": "Creative Current"
            },
            "areaServed": townData.town,
            "category": "SEO"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Local Business Owner"
        },
        "reviewBody": `Exceptional web design service. Creative Current transformed our ${townData.town} business with a stunning website that has significantly increased our online presence.`,
        "publisher": {
          "@type": "Organization",
          "name": "Google"
        }
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/creative-current",
      "https://twitter.com/creativecurrent",
      "https://www.facebook.com/creativecurrent"
    ]
  };
};

// SEO content generation helper
export const generateLocalContent = (townKey: string) => {
  const townData = dorseyTowns[townKey];
  
  if (!townData) {
    throw new Error(`Town data not found for: ${townKey}`);
  }

  return {
    heroTitle: `Professional Web Design in ${townData.town}`,
    heroSubtitle: `Transform Your ${townData.town} Business with Stunning, Results-Driven Websites`,
    heroDescription: `Creative Current specializes in creating beautiful, responsive websites for businesses across ${townData.town} and ${townData.county}. From small local shops to large enterprises, we deliver web solutions that drive real results.`,
    
    aboutSection: {
      title: `Why Choose Creative Current for ${townData.town} Web Design?`,
      content: `As a leading web design agency serving ${townData.town} and the wider ${townData.county} area, we understand the unique challenges and opportunities facing local businesses. ${townData.population ? `With ${townData.population} residents` : 'As a vibrant community'}, ${townData.town} has a diverse business landscape that deserves professional web presence.`
    },
    
    servicesSection: {
      title: `Our ${townData.town} Web Design Services`,
      services: [
        {
          title: `Custom Website Design`,
          description: `Bespoke websites tailored to ${townData.town} businesses and their target audience.`
        },
        {
          title: `Local SEO Optimization`,
          description: `Help your ${townData.town} business rank higher in local search results.`
        },
        {
          title: `E-commerce Solutions`,
          description: `Online stores that help ${townData.town} retailers sell more effectively.`
        },
        {
          title: `Mobile Responsive Design`,
          description: `Websites that work perfectly on all devices for ${townData.town} customers.`
        }
      ]
    },
    
    localBusinessSection: townData.keyBusinesses ? {
      title: `Web Design for ${townData.town} Industries`,
      content: `We've worked with businesses across ${townData.town}'s key industries including ${townData.keyBusinesses.join(', ')}. Whether you're in ${townData.keyBusinesses[0]?.toLowerCase()} or ${townData.keyBusinesses[1]?.toLowerCase()}, we understand your market and customers.`,
      industries: townData.keyBusinesses
    } : null,
    
    landmarksSection: townData.landmarks ? {
      title: `Serving Businesses Near ${townData.town}'s Landmarks`,
      content: `From ${townData.landmarks[0]} to ${townData.landmarks[1]}, we've helped businesses throughout ${townData.town} establish their online presence. Our local knowledge helps us create websites that resonate with ${townData.town} residents and visitors.`,
      landmarks: townData.landmarks
    } : null,
    
    contactSection: {
      title: `Get Your ${townData.town} Web Design Quote`,
      content: `Ready to transform your ${townData.town} business with professional web design? Contact Creative Current today for a free consultation and quote. We're proud to serve businesses throughout ${townData.town} and ${townData.county}.`,
      localPhone: `Call us on 01305 584997`,
      coverage: `Serving ${townData.town}${townData.postcode ? ` (${townData.postcode})` : ''} and surrounding areas`
    },
    
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Web Design', url: '/web-design' },
      { name: `${townData.town}`, url: `/web-design/${townKey}` }
    ],
    
    faqSection: [
      {
        question: `How much does web design cost in ${townData.town}?`,
        answer: `Web design costs in ${townData.town} typically range from £2,500 to £12,000 depending on your requirements. We offer transparent pricing and free consultations for all ${townData.town} businesses.`
      },
      {
        question: `Do you provide ongoing support for ${townData.town} websites?`,
        answer: `Yes, we provide comprehensive ongoing support and maintenance for all websites we create in ${townData.town}. This includes security updates, content changes, and technical support.`
      },
      {
        question: `How long does it take to build a website for my ${townData.town} business?`,
        answer: `Most ${townData.town} business websites are completed within 4-8 weeks, depending on complexity. We'll provide a detailed timeline during your free consultation.`
      },
      {
        question: `Can you help with SEO for my ${townData.town} business?`,
        answer: `Absolutely! We specialize in local SEO to help ${townData.town} businesses rank higher in Google searches. All our websites include basic SEO optimization, with advanced packages available.`
      }
    ]
  };
};

// Meta keywords generator
export const generateMetaKeywords = (townKey: string): string[] => {
  const townData = dorseyTowns[townKey];
  
  if (!townData) {
    return [];
  }

  const baseKeywords = [
    `web design ${townData.town.toLowerCase()}`,
    `website design ${townData.town.toLowerCase()}`,
    `web development ${townData.town.toLowerCase()}`,
    `${townData.town.toLowerCase()} web designers`,
    `website developers ${townData.town.toLowerCase()}`,
    `responsive design ${townData.town.toLowerCase()}`,
    `local web design ${townData.town.toLowerCase()}`,
    `small business websites ${townData.town.toLowerCase()}`,
    `professional web design ${townData.town.toLowerCase()}`,
    `custom websites ${townData.town.toLowerCase()}`,
    `mobile web design ${townData.town.toLowerCase()}`,
    `SEO ${townData.town.toLowerCase()}`,
    `digital marketing ${townData.town.toLowerCase()}`,
    `${townData.county.toLowerCase()} web design`,
    `web designers near me ${townData.town.toLowerCase()}`,
    `website company ${townData.town.toLowerCase()}`
  ];

  // Add postcode-based keywords
  if (townData.postcode) {
    baseKeywords.push(
      `web design ${townData.postcode}`,
      `website design ${townData.postcode}`,
      `${townData.postcode} web developers`
    );
  }

  // Add industry-specific keywords
  if (townData.keyBusinesses) {
    townData.keyBusinesses.forEach(business => {
      baseKeywords.push(
        `${business.toLowerCase()} website design ${townData.town.toLowerCase()}`,
        `${business.toLowerCase()} web development`,
        `websites for ${business.toLowerCase()} ${townData.town.toLowerCase()}`
      );
    });
  }

  // Add landmark-based keywords
  if (townData.landmarks) {
    townData.landmarks.forEach(landmark => {
      baseKeywords.push(
        `web design near ${landmark}`,
        `website design ${landmark} area`
      );
    });
  }

  return baseKeywords;
};
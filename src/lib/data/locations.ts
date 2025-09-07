// src/lib/data/locations.ts - Dorset town data for location-based SEO

/**
 * Location data structures for Dorset towns and areas
 * Provides comprehensive data for location-based SEO optimization
 */

export interface DorsetLocation {
  slug: string;           // URL-friendly name
  name: string;           // Display name
  county: string;         // Always "Dorset"
  population: number;     // Approximate population
  coordinates: {
    lat: number;
    lng: number;
  };
  searchVolume: {
    [keyword: string]: number;
  };
  nearbyTowns: string[];
  keyIndustries: string[];
  demographics: {
    businessCount: number;
    averageIncome: number;
    touristDestination: boolean;
    isCoastal: boolean;
  };
  seoData: {
    primaryKeywords: string[];
    secondaryKeywords: string[];
    localLandmarks: string[];
    businessDistricts: string[];
  };
  postcodes: string[];
  description: string;
}

/**
 * Comprehensive Dorset location data
 */
export const DORSET_LOCATIONS: Record<string, DorsetLocation> = {
  'dorchester': {
    slug: 'dorchester',
    name: 'Dorchester',
    county: 'Dorset',
    population: 21000,
    coordinates: {
      lat: 50.7156,
      lng: -2.4397
    },
    searchVolume: {
      'web design dorchester': 50,
      'website design dorchester': 30,
      'dorchester web designer': 25,
      'web development dorchester': 20
    },
    nearbyTowns: ['weymouth', 'bridport', 'sherborne'],
    keyIndustries: ['Agriculture', 'Tourism', 'Retail', 'Professional Services'],
    demographics: {
      businessCount: 850,
      averageIncome: 28000,
      touristDestination: true,
      isCoastal: false
    },
    seoData: {
      primaryKeywords: [
        'web design dorchester',
        'website design dorchester',
        'dorchester web designer',
        'web development dorchester'
      ],
      secondaryKeywords: [
        'responsive design dorchester',
        'ecommerce website dorchester',
        'wordpress dorchester',
        'digital marketing dorchester'
      ],
      localLandmarks: [
        'Dorchester Town Centre',
        'The Corn Exchange',
        'Dorset County Museum',
        'Roman Town House',
        'Borough Gardens'
      ],
      businessDistricts: [
        'South Street',
        'High West Street',
        'Trinity Street',
        'Dorchester Business Park'
      ]
    },
    postcodes: ['DT1', 'DT2'],
    description: 'The historic county town of Dorset, Dorchester combines rich Roman heritage with modern business opportunities. Home to thriving local businesses and a growing digital economy.'
  },

  'weymouth': {
    slug: 'weymouth',
    name: 'Weymouth',
    county: 'Dorset',
    population: 65000,
    coordinates: {
      lat: 50.6139,
      lng: -2.4594
    },
    searchVolume: {
      'web design weymouth': 80,
      'website design weymouth': 45,
      'weymouth web designer': 35,
      'web development weymouth': 30
    },
    nearbyTowns: ['dorchester', 'portland', 'bridport'],
    keyIndustries: ['Tourism', 'Marine', 'Retail', 'Hospitality', 'Healthcare'],
    demographics: {
      businessCount: 1200,
      averageIncome: 26000,
      touristDestination: true,
      isCoastal: true
    },
    seoData: {
      primaryKeywords: [
        'web design weymouth',
        'website design weymouth',
        'weymouth web designer',
        'web development weymouth'
      ],
      secondaryKeywords: [
        'tourism website weymouth',
        'hotel website design weymouth',
        'restaurant website weymouth',
        'ecommerce weymouth'
      ],
      localLandmarks: [
        'Weymouth Beach',
        'Weymouth Harbour',
        'The Esplanade',
        'Nothe Fort',
        'Weymouth Pavilion'
      ],
      businessDistricts: [
        'Town Centre',
        'The Esplanade',
        'Hope Square',
        'Weymouth Quay'
      ]
    },
    postcodes: ['DT4', 'DT3'],
    description: 'A vibrant seaside resort and major port town, Weymouth attracts millions of visitors annually. The local economy thrives on tourism, marine industries, and growing digital businesses.'
  },

  'bournemouth': {
    slug: 'bournemouth',
    name: 'Bournemouth',
    county: 'Dorset',
    population: 200000,
    coordinates: {
      lat: 50.7192,
      lng: -1.8808
    },
    searchVolume: {
      'web design bournemouth': 200,
      'website design bournemouth': 120,
      'bournemouth web designer': 90,
      'web development bournemouth': 80
    },
    nearbyTowns: ['poole', 'christchurch', 'wimborne'],
    keyIndustries: ['Technology', 'Finance', 'Tourism', 'Education', 'Digital Media'],
    demographics: {
      businessCount: 3500,
      averageIncome: 32000,
      touristDestination: true,
      isCoastal: true
    },
    seoData: {
      primaryKeywords: [
        'web design bournemouth',
        'website design bournemouth',
        'bournemouth web designer',
        'web development bournemouth'
      ],
      secondaryKeywords: [
        'digital agency bournemouth',
        'ecommerce bournemouth',
        'app development bournemouth',
        'seo bournemouth'
      ],
      localLandmarks: [
        'Bournemouth Beach',
        'Bournemouth Pier',
        'The Square',
        'Russell-Cotes Museum',
        'Bournemouth Gardens'
      ],
      businessDistricts: [
        'Town Centre',
        'Lansdowne',
        'Westbourne',
        'Boscombe',
        'Winton'
      ]
    },
    postcodes: ['BH1', 'BH2', 'BH3', 'BH4', 'BH5', 'BH6', 'BH7', 'BH8', 'BH9', 'BH10', 'BH11'],
    description: 'A major coastal resort and commercial center, Bournemouth is home to a thriving tech sector and digital economy. The town combines beautiful beaches with a strong business community.'
  },

  'poole': {
    slug: 'poole',
    name: 'Poole',
    county: 'Dorset',
    population: 150000,
    coordinates: {
      lat: 50.7150,
      lng: -1.9872
    },
    searchVolume: {
      'web design poole': 120,
      'website design poole': 70,
      'poole web designer': 55,
      'web development poole': 45
    },
    nearbyTowns: ['bournemouth', 'wimborne', 'wareham'],
    keyIndustries: ['Marine', 'Technology', 'Logistics', 'Tourism', 'Manufacturing'],
    demographics: {
      businessCount: 2800,
      averageIncome: 35000,
      touristDestination: true,
      isCoastal: true
    },
    seoData: {
      primaryKeywords: [
        'web design poole',
        'website design poole',
        'poole web designer',
        'web development poole'
      ],
      secondaryKeywords: [
        'marine website design poole',
        'logistics website poole',
        'ecommerce poole',
        'digital marketing poole'
      ],
      localLandmarks: [
        'Poole Harbour',
        'Sandbanks Beach',
        'Poole Quay',
        'Compton Acres',
        'Brownsea Island'
      ],
      businessDistricts: [
        'Poole Town Centre',
        'Poole Quay',
        'Sandbanks',
        'Canford Heath',
        'Broadstone'
      ]
    },
    postcodes: ['BH12', 'BH13', 'BH14', 'BH15', 'BH16', 'BH17', 'BH18', 'BH19'],
    description: 'Home to one of the world\'s largest natural harbours, Poole is a major commercial and tourist destination with a strong marine industry and growing tech sector.'
  },

  'bridport': {
    slug: 'bridport',
    name: 'Bridport',
    county: 'Dorset',
    population: 14000,
    coordinates: {
      lat: 50.7342,
      lng: -2.7581
    },
    searchVolume: {
      'web design bridport': 25,
      'website design bridport': 15,
      'bridport web designer': 12,
      'web development bridport': 10
    },
    nearbyTowns: ['dorchester', 'lyme-regis', 'beaminster'],
    keyIndustries: ['Arts & Crafts', 'Tourism', 'Agriculture', 'Retail', 'Creative Industries'],
    demographics: {
      businessCount: 450,
      averageIncome: 27000,
      touristDestination: true,
      isCoastal: false
    },
    seoData: {
      primaryKeywords: [
        'web design bridport',
        'website design bridport',
        'bridport web designer',
        'creative website design bridport'
      ],
      secondaryKeywords: [
        'arts website bridport',
        'tourism website bridport',
        'local business website bridport',
        'craft website design bridport'
      ],
      localLandmarks: [
        'Bridport Town Centre',
        'West Bay',
        'Bridport Arts Centre',
        'The Electric Palace',
        'Bridport Market'
      ],
      businessDistricts: [
        'South Street',
        'East Street',
        'West Street',
        'West Bay'
      ]
    },
    postcodes: ['DT6'],
    description: 'A historic market town known for its vibrant arts scene and proximity to the Jurassic Coast. Bridport attracts creative businesses and independent retailers.'
  },

  'sherborne': {
    slug: 'sherborne',
    name: 'Sherborne',
    county: 'Dorset',
    population: 10000,
    coordinates: {
      lat: 50.9473,
      lng: -2.5169
    },
    searchVolume: {
      'web design sherborne': 20,
      'website design sherborne': 12,
      'sherborne web designer': 10,
      'web development sherborne': 8
    },
    nearbyTowns: ['yeovil', 'dorchester', 'shaftesbury'],
    keyIndustries: ['Education', 'Tourism', 'Professional Services', 'Retail'],
    demographics: {
      businessCount: 380,
      averageIncome: 31000,
      touristDestination: true,
      isCoastal: false
    },
    seoData: {
      primaryKeywords: [
        'web design sherborne',
        'website design sherborne',
        'sherborne web designer',
        'professional website sherborne'
      ],
      secondaryKeywords: [
        'school website sherborne',
        'education website sherborne',
        'tourism website sherborne',
        'heritage website sherborne'
      ],
      localLandmarks: [
        'Sherborne Abbey',
        'Sherborne Castle',
        'Sherborne School',
        'Cheap Street',
        'Abbey Close'
      ],
      businessDistricts: [
        'Cheap Street',
        'Long Street',
        'Half Moon Street',
        'Newland'
      ]
    },
    postcodes: ['DT9'],
    description: 'A beautiful historic town famous for its abbey, castle, and prestigious schools. Sherborne combines heritage tourism with a strong professional services sector.'
  },

  'swanage': {
    slug: 'swanage',
    name: 'Swanage',
    county: 'Dorset',
    population: 10000,
    coordinates: {
      lat: 50.6094,
      lng: -1.9594
    },
    searchVolume: {
      'web design swanage': 15,
      'website design swanage': 10,
      'swanage web designer': 8,
      'tourism website swanage': 12
    },
    nearbyTowns: ['wareham', 'corfe-castle', 'poole'],
    keyIndustries: ['Tourism', 'Marine', 'Retail', 'Hospitality'],
    demographics: {
      businessCount: 320,
      averageIncome: 25000,
      touristDestination: true,
      isCoastal: true
    },
    seoData: {
      primaryKeywords: [
        'web design swanage',
        'website design swanage',
        'swanage web designer',
        'tourism website swanage'
      ],
      secondaryKeywords: [
        'hotel website swanage',
        'b&b website swanage',
        'restaurant website swanage',
        'purbeck web design'
      ],
      localLandmarks: [
        'Swanage Beach',
        'Swanage Pier',
        'Durlston Country Park',
        'Swanage Railway',
        'The Mowlem'
      ],
      businessDistricts: [
        'High Street',
        'Station Road',
        'Shore Road',
        'Kings Road'
      ]
    },
    postcodes: ['BH19'],
    description: 'A charming Victorian seaside resort on the Isle of Purbeck, known for its beautiful bay, heritage railway, and thriving tourism industry.'
  },

  'blandford-forum': {
    slug: 'blandford-forum',
    name: 'Blandford Forum',
    county: 'Dorset',
    population: 12000,
    coordinates: {
      lat: 50.8558,
      lng: -2.1647
    },
    searchVolume: {
      'web design blandford': 18,
      'website design blandford forum': 12,
      'blandford web designer': 10,
      'web development blandford': 8
    },
    nearbyTowns: ['shaftesbury', 'wimborne', 'sturminster-newton'],
    keyIndustries: ['Agriculture', 'Manufacturing', 'Retail', 'Professional Services'],
    demographics: {
      businessCount: 420,
      averageIncome: 29000,
      touristDestination: false,
      isCoastal: false
    },
    seoData: {
      primaryKeywords: [
        'web design blandford',
        'website design blandford forum',
        'blandford web designer',
        'business website blandford'
      ],
      secondaryKeywords: [
        'agricultural website blandford',
        'manufacturing website blandford',
        'local business website blandford',
        'professional services website blandford'
      ],
      localLandmarks: [
        'Blandford Forum Market Place',
        'The Crown Hotel',
        'Blandford Fashion Museum',
        'River Stour',
        'Bryanston School'
      ],
      businessDistricts: [
        'Market Place',
        'East Street',
        'West Street',
        'Salisbury Street'
      ]
    },
    postcodes: ['DT11'],
    description: 'A Georgian market town in the heart of Dorset, serving as a commercial center for the surrounding rural area with a mix of traditional and modern businesses.'
  }
};

/**
 * Get location data by slug
 */
export function getLocationBySlug(slug: string): DorsetLocation | undefined {
  return DORSET_LOCATIONS[slug];
}

/**
 * Get all location slugs
 */
export function getAllLocationSlugs(): string[] {
  return Object.keys(DORSET_LOCATIONS);
}

/**
 * Get locations by search volume (for prioritizing SEO efforts)
 */
export function getLocationsBySearchVolume(keyword: string = 'web design'): DorsetLocation[] {
  return Object.values(DORSET_LOCATIONS)
    .filter(location => location.searchVolume[`${keyword} ${location.slug}`])
    .sort((a, b) => {
      const aVolume = a.searchVolume[`${keyword} ${a.slug}`] || 0;
      const bVolume = b.searchVolume[`${keyword} ${b.slug}`] || 0;
      return bVolume - aVolume;
    });
}

/**
 * Get nearby locations for cross-linking
 */
export function getNearbyLocations(slug: string, limit: number = 3): DorsetLocation[] {
  const location = getLocationBySlug(slug);
  if (!location) return [];

  return location.nearbyTowns
    .map(nearbySlug => getLocationBySlug(nearbySlug))
    .filter((loc): loc is DorsetLocation => loc !== undefined)
    .slice(0, limit);
}

/**
 * Get locations by industry for targeted content
 */
export function getLocationsByIndustry(industry: string): DorsetLocation[] {
  return Object.values(DORSET_LOCATIONS)
    .filter(location => 
      location.keyIndustries.some(ind => 
        ind.toLowerCase().includes(industry.toLowerCase())
      )
    );
}

/**
 * Get tourist destinations for tourism-focused content
 */
export function getTouristDestinations(): DorsetLocation[] {
  return Object.values(DORSET_LOCATIONS)
    .filter(location => location.demographics.touristDestination)
    .sort((a, b) => b.population - a.population);
}

/**
 * Generate location-specific keywords
 */
export function generateLocationKeywords(slug: string, service: string = 'web design'): string[] {
  const location = getLocationBySlug(slug);
  if (!location) return [];

  const keywords = [
    `${service} ${location.slug}`,
    `${service} ${location.name}`,
    `${location.slug} ${service}`,
    `${location.name} ${service}`,
    `${service} near ${location.name}`,
    `${service} in ${location.name}`,
    `${location.name} website design`,
    `${location.name} web designer`,
    `${location.name} digital agency`
  ];

  // Add postcode-based keywords
  location.postcodes.forEach(postcode => {
    keywords.push(`${service} ${postcode}`);
    keywords.push(`web designer ${postcode}`);
  });

  return keywords;
}

/**
 * Get location metadata for SEO
 */
export function getLocationSEOData(slug: string): {
  title: string;
  description: string;
  keywords: string[];
  schema: {
    name: string;
    address: string;
    coordinates: { lat: number; lng: number };
  };
} | null {
  const location = getLocationBySlug(slug);
  if (!location) return null;

  return {
    title: `Web Design ${location.name} - Professional Website Design Services`,
    description: `Professional web design services in ${location.name}, ${location.county}. ${location.description}`,
    keywords: location.seoData.primaryKeywords.concat(location.seoData.secondaryKeywords),
    schema: {
      name: location.name,
      address: `${location.name}, ${location.county}`,
      coordinates: location.coordinates
    }
  };
}
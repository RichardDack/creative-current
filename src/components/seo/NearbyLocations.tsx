// src/components/seo/NearbyLocations.tsx - Nearby locations component for internal linking
import Link from 'next/link';

interface Location {
  name: string;
  slug: string;
  distance?: string;
  description?: string;
}

interface NearbyLocationsProps {
  currentLocation: string;
  title?: string;
  className?: string;
}

// Location data with nearby relationships
const locationData: Record<string, Location[]> = {
  bournemouth: [
    { name: 'Poole', slug: 'poole', distance: '4 miles', description: 'Professional web design services in Poole' },
    { name: 'Christchurch', slug: 'christchurch', distance: '6 miles', description: 'Custom websites for Christchurch businesses' },
    { name: 'Wimborne', slug: 'wimborne', distance: '12 miles', description: 'Web development in Wimborne' },
    { name: 'Dorchester', slug: 'dorchester', distance: '25 miles', description: 'Web design services in Dorchester' }
  ],
  poole: [
    { name: 'Bournemouth', slug: 'bournemouth', distance: '4 miles', description: 'Web design services in Bournemouth' },
    { name: 'Wimborne', slug: 'wimborne', distance: '8 miles', description: 'Professional websites for Wimborne' },
    { name: 'Wareham', slug: 'wareham', distance: '12 miles', description: 'Web development in Wareham' },
    { name: 'Swanage', slug: 'swanage', distance: '18 miles', description: 'Custom web design in Swanage' }
  ],
  weymouth: [
    { name: 'Dorchester', slug: 'dorchester', distance: '8 miles', description: 'Web design services in Dorchester' },
    { name: 'Portland', slug: 'portland', distance: '5 miles', description: 'Professional websites for Portland' },
    { name: 'Bridport', slug: 'bridport', distance: '15 miles', description: 'Web development in Bridport' },
    { name: 'Wareham', slug: 'wareham', distance: '20 miles', description: 'Custom web design in Wareham' }
  ],
  dorchester: [
    { name: 'Weymouth', slug: 'weymouth', distance: '8 miles', description: 'Web design services in Weymouth' },
    { name: 'Sherborne', slug: 'sherborne', distance: '18 miles', description: 'Professional websites for Sherborne' },
    { name: 'Bridport', slug: 'bridport', distance: '15 miles', description: 'Web development in Bridport' },
    { name: 'Blandford', slug: 'blandford', distance: '20 miles', description: 'Custom web design in Blandford' }
  ],
  swanage: [
    { name: 'Wareham', slug: 'wareham', distance: '8 miles', description: 'Web design services in Wareham' },
    { name: 'Poole', slug: 'poole', distance: '18 miles', description: 'Professional websites for Poole' },
    { name: 'Bournemouth', slug: 'bournemouth', distance: '22 miles', description: 'Web development in Bournemouth' },
    { name: 'Dorchester', slug: 'dorchester', distance: '25 miles', description: 'Custom web design in Dorchester' }
  ]
};

export function NearbyLocations({ 
  currentLocation,
  title = 'Nearby Areas We Serve',
  className = ''
}: NearbyLocationsProps) {
  const nearbyLocations = locationData[currentLocation.toLowerCase()] || [];
  
  if (nearbyLocations.length === 0) return null;

  return (
    <section className={`nearby-locations ${className}`}>
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <p className="section-description">
          We also provide web design services to businesses in these nearby areas:
        </p>
        <div className="locations-grid">
          {nearbyLocations.map((location, index) => (
            <Link 
              key={index}
              href={`/web-design/${location.slug}`}
              className="location-card"
            >
              <div className="location-header">
                <h3 className="location-name">Web Design {location.name}</h3>
                {location.distance && (
                  <span className="location-distance">{location.distance}</span>
                )}
              </div>
              {location.description && (
                <p className="location-description">{location.description}</p>
              )}
              <span className="location-link">View Services →</span>
            </Link>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .nearby-locations {
          padding: 3rem 0;
          background: white;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-text-primary, #1f2937);
          text-align: center;
          margin-bottom: 1rem;
        }
        
        .section-description {
          text-align: center;
          color: var(--color-text-muted, #6b7280);
          margin-bottom: 2rem;
          font-size: 1.125rem;
        }
        
        .locations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .location-card {
          display: block;
          padding: 1.5rem;
          background: var(--color-background-lighter, #f8fafc);
          border: 1px solid var(--color-border, #e5e7eb);
          border-radius: 0.75rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .location-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-color: var(--color-primary, #31afb4);
        }
        
        .location-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }
        
        .location-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-text-primary, #1f2937);
          margin: 0;
        }
        
        .location-distance {
          font-size: 0.875rem;
          color: var(--color-text-muted, #6b7280);
          background: white;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          border: 1px solid var(--color-border, #e5e7eb);
        }
        
        .location-description {
          color: var(--color-text-muted, #6b7280);
          margin-bottom: 1rem;
          line-height: 1.5;
        }
        
        .location-link {
          color: var(--color-primary, #31afb4);
          font-weight: 500;
          font-size: 0.875rem;
        }
        
        .location-card:hover .location-link {
          color: var(--color-primary-dark, #2a9ca1);
        }
        
        @media (max-width: 768px) {
          .nearby-locations {
            padding: 2rem 0;
          }
          
          .section-title {
            font-size: 1.75rem;
          }
          
          .locations-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .location-card {
            padding: 1.25rem;
          }
          
          .location-header {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
}
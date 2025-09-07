// src/components/seo/RelatedServices.tsx - Related services component for internal linking
import Link from 'next/link';

interface Service {
  name: string;
  href: string;
  description: string;
}

interface RelatedServicesProps {
  title?: string;
  services: Service[];
  className?: string;
}

const defaultServices: Service[] = [
  {
    name: 'Responsive Web Design',
    href: '/services#responsive-design',
    description: 'Mobile-first websites that work on all devices'
  },
  {
    name: 'E-commerce Development',
    href: '/services#ecommerce',
    description: 'Online stores that drive sales and conversions'
  },
  {
    name: 'WordPress Development',
    href: '/services#wordpress',
    description: 'Custom WordPress sites with easy content management'
  },
  {
    name: 'UI/UX Design',
    href: '/services#ui-ux',
    description: 'User-centered design that converts visitors'
  }
];

export function RelatedServices({ 
  title = 'Our Services',
  services = defaultServices,
  className = ''
}: RelatedServicesProps) {
  return (
    <section className={`related-services ${className}`}>
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <Link 
              key={index}
              href={service.href}
              className="service-card"
            >
              <h3 className="service-name">{service.name}</h3>
              <p className="service-description">{service.description}</p>
              <span className="service-link">Learn More →</span>
            </Link>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .related-services {
          padding: 3rem 0;
          background: var(--color-background-lighter, #f8fafc);
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
          margin-bottom: 2rem;
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        
        .service-card {
          display: block;
          padding: 1.5rem;
          background: white;
          border: 1px solid var(--color-border, #e5e7eb);
          border-radius: 0.75rem;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .service-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border-color: var(--color-primary, #31afb4);
        }
        
        .service-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-text-primary, #1f2937);
          margin-bottom: 0.5rem;
        }
        
        .service-description {
          color: var(--color-text-muted, #6b7280);
          margin-bottom: 1rem;
          line-height: 1.5;
        }
        
        .service-link {
          color: var(--color-primary, #31afb4);
          font-weight: 500;
          font-size: 0.875rem;
        }
        
        .service-card:hover .service-link {
          color: var(--color-primary-dark, #2a9ca1);
        }
        
        @media (max-width: 768px) {
          .related-services {
            padding: 2rem 0;
          }
          
          .section-title {
            font-size: 1.75rem;
            margin-bottom: 1.5rem;
          }
          
          .services-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .service-card {
            padding: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}
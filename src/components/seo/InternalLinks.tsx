// src/components/seo/InternalLinks.tsx - Contextual internal linking component
import Link from 'next/link';

interface InternalLink {
  text: string;
  href: string;
  title?: string;
  description?: string;
}

interface InternalLinksProps {
  title?: string;
  links: InternalLink[];
  layout?: 'grid' | 'list' | 'inline';
  className?: string;
}

// Predefined link sets for common use cases
export const linkSets = {
  services: [
    {
      text: 'Web Design Services',
      href: '/services',
      title: 'Professional Web Design Services in Dorset',
      description: 'Comprehensive web design and development services'
    },
    {
      text: 'Responsive Web Design',
      href: '/services#responsive-design',
      title: 'Mobile-First Responsive Web Design',
      description: 'Websites that work perfectly on all devices'
    },
    {
      text: 'E-commerce Development',
      href: '/services#ecommerce',
      title: 'Professional E-commerce Solutions',
      description: 'Online stores that drive sales and conversions'
    },
    {
      text: 'WordPress Development',
      href: '/services#wordpress',
      title: 'Custom WordPress Development',
      description: 'Easy-to-manage WordPress websites'
    }
  ],
  locations: [
    {
      text: 'Web Design Bournemouth',
      href: '/web-design/bournemouth',
      title: 'Professional Web Design Services in Bournemouth',
      description: 'Custom websites for Bournemouth businesses'
    },
    {
      text: 'Web Design Poole',
      href: '/web-design/poole',
      title: 'Web Design Services in Poole',
      description: 'Professional web development in Poole'
    },
    {
      text: 'Web Design Weymouth',
      href: '/web-design/weymouth',
      title: 'Web Design Services in Weymouth',
      description: 'Custom websites for Weymouth businesses'
    },
    {
      text: 'Web Design Dorchester',
      href: '/web-design/dorchester',
      title: 'Web Design Services in Dorchester',
      description: 'Professional web development in Dorchester'
    }
  ],
  company: [
    {
      text: 'About Creative Current',
      href: '/about',
      title: 'About Our Web Design Team',
      description: 'Meet the Creative Current team'
    },
    {
      text: 'Our Portfolio',
      href: '/work',
      title: 'View Our Web Design Portfolio',
      description: 'Examples of our web design work'
    },
    {
      text: 'Contact Us',
      href: '/contact',
      title: 'Get in Touch for Your Project',
      description: 'Free consultations and quotes'
    }
  ]
};

export function InternalLinks({ 
  title,
  links,
  layout = 'grid',
  className = ''
}: InternalLinksProps) {
  if (!links || links.length === 0) return null;

  return (
    <section className={`internal-links ${layout} ${className}`}>
      {title && <h2 className="links-title">{title}</h2>}
      
      <div className="links-container">
        {links.map((link, index) => (
          <Link 
            key={index}
            href={link.href}
            className="internal-link"
            title={link.title}
          >
            <span className="link-text">{link.text}</span>
            {link.description && layout !== 'inline' && (
              <span className="link-description">{link.description}</span>
            )}
            <span className="link-arrow">→</span>
          </Link>
        ))}
      </div>
      
      <style jsx>{`
        .internal-links {
          padding: 2rem 0;
        }
        
        .links-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--color-text-primary, #1f2937);
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        /* Grid Layout */
        .internal-links.grid .links-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
        }
        
        .internal-links.grid .internal-link {
          display: flex;
          flex-direction: column;
          padding: 1.25rem;
          background: var(--color-background-lighter, #f8fafc);
          border: 1px solid var(--color-border, #e5e7eb);
          border-radius: 0.5rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .internal-links.grid .internal-link:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border-color: var(--color-primary, #31afb4);
        }
        
        /* List Layout */
        .internal-links.list .links-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .internal-links.list .internal-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: white;
          border: 1px solid var(--color-border, #e5e7eb);
          border-radius: 0.375rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .internal-links.list .internal-link:hover {
          border-color: var(--color-primary, #31afb4);
          background: var(--color-background-lighter, #f8fafc);
        }
        
        /* Inline Layout */
        .internal-links.inline .links-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }
        
        .internal-links.inline .internal-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--color-primary-100, #e6fffa);
          color: var(--color-primary, #31afb4);
          border-radius: 2rem;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        
        .internal-links.inline .internal-link:hover {
          background: var(--color-primary, #31afb4);
          color: white;
        }
        
        /* Link Elements */
        .link-text {
          font-weight: 500;
          color: var(--color-text-primary, #1f2937);
          margin-bottom: 0.25rem;
        }
        
        .link-description {
          font-size: 0.875rem;
          color: var(--color-text-muted, #6b7280);
          line-height: 1.4;
        }
        
        .link-arrow {
          color: var(--color-primary, #31afb4);
          font-weight: 600;
          transition: transform 0.2s ease;
        }
        
        .internal-link:hover .link-arrow {
          transform: translateX(2px);
        }
        
        .internal-links.inline .link-text {
          color: inherit;
          margin-bottom: 0;
        }
        
        .internal-links.inline .link-arrow {
          color: inherit;
        }
        
        @media (max-width: 768px) {
          .internal-links.grid .links-container {
            grid-template-columns: 1fr;
          }
          
          .internal-links.inline .links-container {
            justify-content: flex-start;
          }
          
          .links-title {
            font-size: 1.25rem;
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
}
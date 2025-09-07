// src/components/seo/Breadcrumbs.tsx - SEO-optimized breadcrumb navigation
'use client';

import Link from 'next/link';

// Simple chevron right icon component
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (items.length <= 1) return null;

  return (
    <nav 
      aria-label="Breadcrumb navigation"
      className={`breadcrumbs ${className}`}
    >
      <ol 
        className="breadcrumb-list"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li 
              key={index}
              className="breadcrumb-item"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <span 
                  className="breadcrumb-current"
                  itemProp="name"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link 
                  href={item.url}
                  className="breadcrumb-link"
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </Link>
              )}
              
              <meta itemProp="position" content={(index + 1).toString()} />
              
              {!isLast && (
                <ChevronRightIcon 
                  className="breadcrumb-separator" 
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
      
      <style jsx>{`
        .breadcrumbs {
          padding: 1rem 0;
          font-size: 0.875rem;
        }
        
        .breadcrumb-list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .breadcrumb-link {
          color: var(--color-primary, #31afb4);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .breadcrumb-link:hover {
          color: var(--color-primary-dark, #2a9ca1);
          text-decoration: underline;
        }
        
        .breadcrumb-current {
          color: var(--color-text-muted, #6b7280);
          font-weight: 500;
        }
        
        .breadcrumb-separator {
          width: 1rem;
          height: 1rem;
          color: var(--color-text-muted, #6b7280);
        }
        
        @media (max-width: 640px) {
          .breadcrumbs {
            font-size: 0.8125rem;
          }
          
          .breadcrumb-separator {
            width: 0.875rem;
            height: 0.875rem;
          }
        }
      `}</style>
    </nav>
  );
}
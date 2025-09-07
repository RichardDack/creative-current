// src/app/page.tsx - SEO Optimized Homepage
import Link from 'next/link';
import { Layout } from '@/components/global/Layout';
import { Hero } from '@/components/sections/Hero';
import { WorkSection } from '@/components/sections/WorkSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generatePageSchema } from '@/lib/seo/schema';
import { generateHomepageMetadata } from '@/lib/seo/metadata';
import type { Metadata } from 'next';

// Generate SEO metadata for homepage
export const metadata: Metadata = generateHomepageMetadata();

export default function Home() {
  // Generate structured data for homepage
  const schemaMarkup = generatePageSchema('homepage');

  return (
    <>
      <SchemaMarkup schema={schemaMarkup} />
      <Layout>
        <Hero />
        <WorkSection />
        <TeamSection />
        
        {/* Internal Links Section */}
        <section style={{ 
          padding: '4rem 0', 
          background: 'var(--color-background-lighter, #f8fafc)' 
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '0 1rem' 
          }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              textAlign: 'center', 
              marginBottom: '3rem',
              color: 'var(--color-text-primary, #1f2937)'
            }}>
              Web Design Services Across Dorset
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '1.5rem' 
            }}>
              <Link 
                href="/web-design/bournemouth" 
                style={{ 
                  display: 'block',
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s ease'
                }}
                className="location-link"
              >
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  color: 'var(--color-text-primary, #1f2937)'
                }}>
                  Web Design Bournemouth
                </h3>
                <p style={{ 
                  color: 'var(--color-text-muted, #6b7280)', 
                  marginBottom: '1rem' 
                }}>
                  Professional web design services for Bournemouth businesses
                </p>
                <span style={{ 
                  color: 'var(--color-primary, #31afb4)', 
                  fontWeight: '500' 
                }}>
                  View Services →
                </span>
              </Link>
              
              <Link 
                href="/web-design/poole" 
                style={{ 
                  display: 'block',
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s ease'
                }}
                className="location-link"
              >
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  color: 'var(--color-text-primary, #1f2937)'
                }}>
                  Web Design Poole
                </h3>
                <p style={{ 
                  color: 'var(--color-text-muted, #6b7280)', 
                  marginBottom: '1rem' 
                }}>
                  Custom websites and digital solutions for Poole businesses
                </p>
                <span style={{ 
                  color: 'var(--color-primary, #31afb4)', 
                  fontWeight: '500' 
                }}>
                  View Services →
                </span>
              </Link>
              
              <Link 
                href="/web-design/weymouth" 
                style={{ 
                  display: 'block',
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s ease'
                }}
                className="location-link"
              >
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  color: 'var(--color-text-primary, #1f2937)'
                }}>
                  Web Design Weymouth
                </h3>
                <p style={{ 
                  color: 'var(--color-text-muted, #6b7280)', 
                  marginBottom: '1rem' 
                }}>
                  Responsive web design and development in Weymouth
                </p>
                <span style={{ 
                  color: 'var(--color-primary, #31afb4)', 
                  fontWeight: '500' 
                }}>
                  View Services →
                </span>
              </Link>
              
              <Link 
                href="/web-design/dorchester" 
                style={{ 
                  display: 'block',
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s ease'
                }}
                className="location-link"
              >
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  color: 'var(--color-text-primary, #1f2937)'
                }}>
                  Web Design Dorchester
                </h3>
                <p style={{ 
                  color: 'var(--color-text-muted, #6b7280)', 
                  marginBottom: '1rem' 
                }}>
                  Professional web design services in Dorchester
                </p>
                <span style={{ 
                  color: 'var(--color-primary, #31afb4)', 
                  fontWeight: '500' 
                }}>
                  View Services →
                </span>
              </Link>
            </div>
          </div>
        </section>
        
        <ContactSection />
      </Layout>
    </>
  );
}
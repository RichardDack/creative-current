import type { Metadata } from 'next';
import { Layout } from '@/components/global/Layout';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateAboutMetadata } from '@/lib/seo/metadata';
import { generatePageSchema } from '@/lib/seo/schema';

export const metadata: Metadata = generateAboutMetadata();

export default function AboutPage() {
  // Generate structured data for about page
  const schemaMarkup = generatePageSchema('about', {
    breadcrumbs: [
      { name: 'Home', url: 'https://creativecurrent.co.uk' },
      { name: 'About', url: 'https://creativecurrent.co.uk/about' }
    ]
  });

  return (
    <>
      <SchemaMarkup schema={schemaMarkup} />
      <Layout>
      <div className="page-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div style={{ marginBottom: '4rem' }}>
              <h1 className="hero-title">
                About Creative Current - Web Design Team Dorset
              </h1>
              <p className="hero-description">
                We&apos;re a passionate team of web designers and developers based in Dorset, 
                dedicated to creating exceptional digital experiences that drive business growth.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="page-section-alt">
          <div className="container">
            <div className="grid-responsive grid-2-col" style={{ alignItems: 'center', gap: '3rem' }}>
              <div>
                <h2 style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'var(--font-size-3xl)', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--color-text-primary)', 
                  marginBottom: '1.5rem' 
                }}>
                  Our Story
                </h2>
                <p style={{ 
                  fontSize: 'var(--font-size-lg)', 
                  color: 'var(--color-text-muted)', 
                  marginBottom: '1.5rem',
                  lineHeight: 'var(--line-height-relaxed)'
                }}>
                  Founded in the heart of Dorset, Creative Current emerged from a simple belief: 
                  every business deserves a digital presence that truly represents their vision and values.
                </p>
                <p style={{ 
                  fontSize: 'var(--font-size-lg)', 
                  color: 'var(--color-text-muted)', 
                  marginBottom: '1.5rem',
                  lineHeight: 'var(--line-height-relaxed)'
                }}>
                  We&apos;ve grown from a small team with big dreams to a trusted partner for businesses 
                  across Swanage, Dorchester, Weymouth, Poole, Bournemouth, and beyond. Our local 
                  roots give us unique insight into the Dorset business landscape.
                </p>
                <p style={{ 
                  fontSize: 'var(--font-size-lg)', 
                  color: 'var(--color-text-muted)',
                  lineHeight: 'var(--line-height-relaxed)'
                }}>
                  Today, we combine cutting-edge technology with timeless design principles to 
                  create websites that not only look stunning but deliver real results for our clients.
                </p>
              </div>
              <div style={{ 
                background: 'var(--color-background-darker)', 
                padding: '2rem', 
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-primary-200)'
              }}>
                <h3 style={{ 
                  fontSize: 'var(--font-size-2xl)', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--color-text-primary)', 
                  marginBottom: '1rem' 
                }}>Our Mission</h3>
                <p style={{ 
                  color: 'var(--color-text-muted)', 
                  marginBottom: '1.5rem',
                  lineHeight: 'var(--line-height-relaxed)'
                }}>
                  To empower Dorset businesses with exceptional web design and development 
                  that drives growth, enhances user experience, and builds lasting digital success.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      background: 'var(--color-primary)', 
                      borderRadius: '50%', 
                      marginRight: '0.75rem' 
                    }}></div>
                    <span style={{ color: 'var(--color-text-primary)' }}>Local expertise, global standards</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      background: 'var(--color-primary)', 
                      borderRadius: '50%', 
                      marginRight: '0.75rem' 
                    }}></div>
                    <span style={{ color: 'var(--color-text-primary)' }}>User-centered design approach</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      background: 'var(--color-primary)', 
                      borderRadius: '50%', 
                      marginRight: '0.75rem' 
                    }}></div>
                    <span style={{ color: 'var(--color-text-primary)' }}>Results-driven solutions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="page-section">
          <div className="container">
            <div>
              <h2 className="section-title">
                Our Approach
              </h2>
              <p className="section-description">
                We believe great web design is more than just aesthetics. It&apos;s about creating 
                meaningful connections between businesses and their customers.
              </p>
            </div>
            
            <div className="grid-responsive grid-3-col">
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  background: 'var(--color-primary-200)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1.5rem' 
                }}>
                  <div style={{ 
                    width: '2rem', 
                    height: '2rem', 
                    background: 'var(--color-primary)', 
                    borderRadius: '50%' 
                  }}></div>
                </div>
                <h3 style={{ 
                  fontSize: 'var(--font-size-xl)', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--color-text-primary)', 
                  marginBottom: '1rem' 
                }}>Discovery & Strategy</h3>
                <p style={{ 
                  color: 'var(--color-text-muted)',
                  lineHeight: 'var(--line-height-relaxed)'
                }}>
                  We start by understanding your business, goals, and target audience to 
                  create a strategic foundation for your project.
                </p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  background: 'var(--color-primary-200)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1.5rem' 
                }}>
                  <div style={{ 
                    width: '2rem', 
                    height: '2rem', 
                    background: 'var(--color-primary)', 
                    borderRadius: '50%' 
                  }}></div>
                </div>
                <h3 style={{ 
                  fontSize: 'var(--font-size-xl)', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--color-text-primary)', 
                  marginBottom: '1rem' 
                }}>Design & Development</h3>
                <p style={{ 
                  color: 'var(--color-text-muted)',
                  lineHeight: 'var(--line-height-relaxed)'
                }}>
                  Our team crafts beautiful, functional designs and brings them to life 
                  with clean, efficient code and modern technologies.
                </p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  background: 'var(--color-primary-200)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1.5rem' 
                }}>
                  <div style={{ 
                    width: '2rem', 
                    height: '2rem', 
                    background: 'var(--color-primary)', 
                    borderRadius: '50%' 
                  }}></div>
                </div>
                <h3 style={{ 
                  fontSize: 'var(--font-size-xl)', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--color-text-primary)', 
                  marginBottom: '1rem' 
                }}>Launch & Support</h3>
                <p style={{ 
                  color: 'var(--color-text-muted)',
                  lineHeight: 'var(--line-height-relaxed)'
                }}>
                  We ensure a smooth launch and provide ongoing support to help your 
                  website continue performing at its best.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="page-section-alt">
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 className="section-title">
              Ready to Work Together?
            </h2>
            <p className="section-description" style={{ marginBottom: '2rem' }}>
              Let&apos;s discuss how we can help elevate your digital presence and grow your business.
            </p>
            <a 
              href="/contact" 
              className="cta-button-primary"
              style={{ 
                display: 'inline-block',
                background: 'var(--color-primary)', 
                color: 'white', 
                padding: '1rem 2rem', 
                borderRadius: 'var(--radius-lg)', 
                fontWeight: 'var(--font-weight-semibold)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Get In Touch
            </a>
          </div>
        </section>
      </div>
      </Layout>
    </>
  );
}
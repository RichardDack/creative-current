import type { Metadata } from 'next';
import { Layout } from '@/components/global/Layout';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateContactMetadata } from '@/lib/seo/metadata';
import { generatePageSchema } from '@/lib/seo/schema';

export const metadata: Metadata = generateContactMetadata();

// Local Business Schema
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Creative Current",
  "description": "Professional web design and development agency serving Dorset businesses",
  "url": "https://creativecurrent.co.uk",
  "telephone": "+44 1305 584997",
  "email": "hello@creativecurrent.co.uk",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dorchester",
    "addressRegion": "Dorset",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.7120,
    "longitude": -2.4410
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Swanage",
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Dorset"
      }
    },
    {
      "@type": "City", 
      "name": "Dorchester",
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Dorset"
      }
    },
    {
      "@type": "City",
      "name": "Weymouth", 
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Dorset"
      }
    },
    {
      "@type": "City",
      "name": "Poole",
      "containedInPlace": {
        "@type": "AdministrativeArea", 
        "name": "Dorset"
      }
    },
    {
      "@type": "City",
      "name": "Bournemouth",
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Dorset"
      }
    }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 50.6117,
      "longitude": -1.9594
    },
    "geoRadius": "50000"
  },
  "openingHours": "Mo-Fr 09:00-17:00",
  "priceRange": "££",
  "sameAs": [
    "https://www.linkedin.com/company/creative-current",
    "https://twitter.com/creativecurrent"
  ]
};

const contactInfo = [
  {
    title: 'Email',
    value: 'hello@creativecurrent.co.uk',
    subtitle: 'We typically respond within 24 hours',
    color: 'var(--color-primary)'
  },
  {
    title: 'Phone',
    value: '01305 584997',
    subtitle: 'Mon-Fri, 9:00 AM - 5:00 PM',
    color: 'var(--color-primary)'
  },
  {
    title: 'Location',
    value: 'Dorchester, England',
    subtitle: 'Serving all of Dorset and beyond',
    color: 'var(--color-primary)'
  }
];

const serviceAreas = [
  'Swanage', 'Dorchester', 'Weymouth', 'Poole', 
  'Bournemouth', 'Wareham', 'Blandford', 'Sherborne'
];

const whyChooseUs = [
  'Local Dorset expertise',
  'Free initial consultation', 
  'Transparent pricing',
  'Ongoing support included'
];

const faqs = [
  {
    question: 'How long does a typical web design project take?',
    answer: 'Most projects take 4-8 weeks from start to finish, depending on complexity and scope. We\'ll provide a detailed timeline during our initial consultation.'
  },
  {
    question: 'Do you work with businesses outside of Dorset?',
    answer: 'While we\'re based in Dorset and specialize in local businesses, we work with clients throughout the UK and internationally via video calls and digital collaboration.'
  },
  {
    question: 'What\'s included in your web design service?',
    answer: 'Our comprehensive service includes strategy, design, development, content optimization, SEO setup, testing, launch, and ongoing support. We handle everything from start to finish.'
  },
  {
    question: 'Do you provide ongoing maintenance?',
    answer: 'Yes! We offer comprehensive maintenance packages including security updates, backups, performance monitoring, and content updates to keep your website running smoothly.'
  }
];

export default function ContactPage() {
  // Generate structured data for contact page
  const schemaMarkup = generatePageSchema('contact', {
    breadcrumbs: [
      { name: 'Home', url: 'https://creativecurrent.co.uk' },
      { name: 'Contact', url: 'https://creativecurrent.co.uk/contact' }
    ],
    faqs: faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer
    }))
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
                Contact Creative Current - Web Design Dorset
              </h1>
              <p className="hero-description">
                Ready to start your web design project? We&apos;d love to hear from you. 
                Get in touch for a free consultation and quote.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="page-section">
          <div className="container">
            <div className="grid-responsive grid-auto-fit-large" style={{ gap: '3rem' }}>
              
              {/* Contact Form */}
              <div style={{ 
                background: 'var(--color-background-lighter)', 
                padding: '2rem', 
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-primary-200)'
              }}>
                <h2 style={{ 
                  fontSize: 'var(--font-size-2xl)', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--color-text-primary)', 
                  marginBottom: '1.5rem' 
                }}>Send Us A Message</h2>
                <form action="https://formspree.io/f/xnnbqpwa" method="POST" className="form-grid">
                  <div className="form-row">
                    <div>
                      <label htmlFor="name" style={{ 
                        display: 'block', 
                        fontSize: 'var(--font-size-sm)', 
                        fontWeight: 'var(--font-weight-medium)', 
                        color: 'var(--color-text-primary)', 
                        marginBottom: '0.5rem' 
                      }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: '1px solid var(--color-primary-300)',
                          borderRadius: 'var(--radius-lg)',
                          background: 'var(--color-background-darker)',
                          color: 'var(--color-text-primary)',
                          fontSize: 'var(--font-size-base)'
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" style={{ 
                        display: 'block', 
                        fontSize: 'var(--font-size-sm)', 
                        fontWeight: 'var(--font-weight-medium)', 
                        color: 'var(--color-text-primary)', 
                        marginBottom: '0.5rem' 
                      }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: '1px solid var(--color-primary-300)',
                          borderRadius: 'var(--radius-lg)',
                          background: 'var(--color-background-darker)',
                          color: 'var(--color-text-primary)',
                          fontSize: 'var(--font-size-base)'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" style={{ 
                      display: 'block', 
                      fontSize: 'var(--font-size-sm)', 
                      fontWeight: 'var(--font-weight-medium)', 
                      color: 'var(--color-text-primary)', 
                      marginBottom: '0.5rem' 
                    }}>
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '1px solid var(--color-primary-300)',
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--color-background-darker)',
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-base)'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" style={{ 
                      display: 'block', 
                      fontSize: 'var(--font-size-sm)', 
                      fontWeight: 'var(--font-weight-medium)', 
                      color: 'var(--color-text-primary)', 
                      marginBottom: '0.5rem' 
                    }}>
                      Tell us about your project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '1px solid var(--color-primary-300)',
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--color-background-darker)',
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-base)',
                        resize: 'vertical',
                        minHeight: '120px'
                      }}
                    ></textarea>
                  </div>
                  
                  {/* Hidden subject field for Formspree */}
                  <input type="hidden" name="_subject" value="New contact form submission from Creative Current website" />
                  
                  <button
                    type="submit"
                    className="cta-button-primary"
                    style={{
                      width: '100%',
                      background: 'var(--color-primary)',
                      color: 'white',
                      padding: '1rem 2rem',
                      borderRadius: 'var(--radius-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 'var(--font-size-base)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h2 style={{ 
                    fontSize: 'var(--font-size-2xl)', 
                    fontWeight: 'var(--font-weight-bold)', 
                    color: 'var(--color-text-primary)', 
                    marginBottom: '1.5rem' 
                  }}>Contact Information</h2>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {contactInfo.map((info, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <div style={{ 
                          width: '3rem', 
                          height: '3rem', 
                          background: 'var(--color-primary-200)', 
                          borderRadius: 'var(--radius-lg)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          marginRight: '1rem',
                          flexShrink: 0
                        }}>
                          <div style={{ 
                            width: '1.5rem', 
                            height: '1.5rem', 
                            background: info.color, 
                            borderRadius: 'var(--radius-sm)' 
                          }}></div>
                        </div>
                        <div>
                          <h3 style={{ 
                            fontWeight: 'var(--font-weight-semibold)', 
                            color: 'var(--color-text-primary)', 
                            marginBottom: '0.25rem' 
                          }}>{info.title}</h3>
                          <p style={{ 
                            color: 'var(--color-text-muted)',
                            marginBottom: '0.25rem'
                          }}>{info.value}</p>
                          <p style={{ 
                            fontSize: 'var(--font-size-sm)', 
                            color: 'var(--color-text-muted)' 
                          }}>{info.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Areas */}
                <div>
                  <h3 style={{ 
                    fontSize: 'var(--font-size-xl)', 
                    fontWeight: 'var(--font-weight-bold)', 
                    color: 'var(--color-text-primary)', 
                    marginBottom: '1rem' 
                  }}>Areas We Serve</h3>
                  <p style={{ 
                    color: 'var(--color-text-muted)', 
                    marginBottom: '1rem',
                    lineHeight: 'var(--line-height-relaxed)'
                  }}>
                    We&apos;re proud to serve businesses throughout Dorset and the surrounding areas:
                  </p>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                    gap: '0.75rem' 
                  }}>
                    {serviceAreas.map((area, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ 
                          width: '6px', 
                          height: '6px', 
                          background: 'var(--color-primary)', 
                          borderRadius: '50%', 
                          marginRight: '0.75rem' 
                        }}></span>
                        <span style={{ color: 'var(--color-text-primary)' }}>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why Choose Us */}
                <div>
                  <h3 style={{ 
                    fontSize: 'var(--font-size-xl)', 
                    fontWeight: 'var(--font-weight-bold)', 
                    color: 'var(--color-text-primary)', 
                    marginBottom: '1rem' 
                  }}>Why Choose Creative Current?</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {whyChooseUs.map((reason, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ 
                          width: '6px', 
                          height: '6px', 
                          background: 'var(--color-primary)', 
                          borderRadius: '50%', 
                          marginRight: '0.75rem' 
                        }}></span>
                        <span style={{ color: 'var(--color-text-primary)' }}>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ 
          paddingTop: '4rem', 
          paddingBottom: '4rem', 
          paddingLeft: 'var(--space-lg)', 
          paddingRight: 'var(--space-lg)',
          background: 'var(--color-background-lighter)'
        }}>
          <div className="container" style={{ maxWidth: '64rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'var(--font-size-3xl)', 
                fontWeight: 'var(--font-weight-bold)', 
                color: 'var(--color-text-primary)', 
                marginBottom: '1rem' 
              }}>Frequently Asked Questions</h2>
              <p style={{ 
                color: 'var(--color-text-muted)',
                lineHeight: 'var(--line-height-relaxed)'
              }}>Common questions about our web design services</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {faqs.map((faq, index) => (
                <div key={index} style={{ 
                  background: 'var(--color-background-darker)', 
                  padding: '1.5rem', 
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-primary-200)'
                }}>
                  <h3 style={{ 
                    fontWeight: 'var(--font-weight-semibold)', 
                    color: 'var(--color-text-primary)', 
                    marginBottom: '0.5rem' 
                  }}>{faq.question}</h3>
                  <p style={{ 
                    color: 'var(--color-text-muted)',
                    lineHeight: 'var(--line-height-relaxed)'
                  }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ 
          paddingTop: '4rem', 
          paddingBottom: '4rem', 
          paddingLeft: 'var(--space-lg)', 
          paddingRight: 'var(--space-lg)' 
        }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'var(--font-size-3xl)', 
              fontWeight: 'var(--font-weight-bold)', 
              color: 'var(--color-text-primary)', 
              marginBottom: '1.5rem' 
            }}>
              Ready to Start Your Project?
            </h2>
            <p style={{ 
              fontSize: 'var(--font-size-xl)', 
              color: 'var(--color-text-muted)', 
              marginBottom: '2rem',
              lineHeight: 'var(--line-height-relaxed)'
            }}>
              Get in touch today for a free consultation and discover how we can help grow your business online.
            </p>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem', 
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <a 
                href="tel:+441305584997" 
                className="cta-button-primary"
                style={{ 
                  display: 'inline-block',
                  background: 'var(--color-primary)', 
                  color: 'white', 
                  padding: '1rem 2rem', 
                  borderRadius: 'var(--radius-lg)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                Call Now: 01305 584997
              </a>
              <a 
                href="mailto:hello@creativecurrent.co.uk" 
                className="cta-button-secondary"
                style={{ 
                  display: 'inline-block',
                  border: '1px solid var(--color-primary)', 
                  color: 'var(--color-primary)', 
                  padding: '1rem 2rem', 
                  borderRadius: 'var(--radius-lg)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                Email Us
              </a>
            </div>
          </div>
        </section>
      </div>
      </Layout>
    </>
  );
}
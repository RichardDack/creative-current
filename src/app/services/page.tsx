import type { Metadata } from 'next';
import { Layout } from '@/components/global/Layout';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

import { generatePageSchema } from '@/lib/seo/schema';

// Generate enhanced SEO metadata for services page
export const metadata: Metadata = {
  title: 'Web Design Services Dorset | Creative Current - Professional Development',
  description: 'Comprehensive web design and development services in Dorset. Responsive websites, e-commerce, WordPress, UI/UX design for businesses in Bournemouth, Poole, Weymouth & Dorchester.',
  keywords: [
    'web design services dorset',
    'responsive web design dorset',
    'wordpress development dorset',
    'e-commerce websites dorset',
    'ui ux design dorset',
    'web development bournemouth',
    'website design poole',
    'professional web design'
  ],
  alternates: {
    canonical: 'https://creativecurrent.co.uk/services',
  },
  openGraph: {
    title: 'Web Design Services Dorset | Creative Current',
    description: 'Comprehensive web design and development services in Dorset. Responsive websites, e-commerce, WordPress, UI/UX design for businesses across Dorset.',
    type: 'website',
    url: 'https://creativecurrent.co.uk/services',
    siteName: 'Creative Current',
    images: [
      {
        url: 'https://creativecurrent.co.uk/images/creative-current-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Creative Current Web Design Services'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design Services Dorset | Creative Current',
    description: 'Comprehensive web design and development services in Dorset.',
    images: ['https://creativecurrent.co.uk/images/creative-current-og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'geo.region': 'GB-DOR',
    'geo.placename': 'Dorset, England',
  },
};

const services = [
  {
    title: 'Responsive Web Design',
    description: 'Beautiful, mobile-first websites that work perfectly on all devices. Optimized for user experience and search engines.',
    features: [
      'Mobile-first design approach',
      'Cross-browser compatibility', 
      'SEO-optimized structure',
      'Fast loading speeds'
    ],
    color: 'var(--color-primary)'
  },
  {
    title: 'WordPress Development',
    description: 'Custom WordPress websites with easy content management. Perfect for businesses that need to update their content regularly.',
    features: [
      'Custom theme development',
      'Plugin integration',
      'Content management training',
      'Security optimization'
    ],
    color: 'var(--color-primary)'
  },
  {
    title: 'E-commerce Solutions',
    description: 'Powerful online stores that drive sales. From product catalogs to secure payment processing, we build complete e-commerce experiences.',
    features: [
      'WooCommerce & Shopify',
      'Payment gateway integration',
      'Inventory management',
      'Mobile-optimized checkout'
    ],
    color: 'var(--color-primary)'
  },
  {
    title: 'UI/UX Design',
    description: 'User-centered design that converts visitors into customers. We create intuitive interfaces that users love to interact with.',
    features: [
      'User research & testing',
      'Wireframing & prototyping',
      'Conversion optimization',
      'Accessibility compliance'
    ],
    color: 'var(--color-primary)'
  },
  {
    title: 'Website Maintenance',
    description: 'Keep your website running smoothly with our comprehensive maintenance services. Security updates, backups, and performance optimization.',
    features: [
      'Regular security updates',
      'Automated backups',
      'Performance monitoring',
      'Content updates'
    ],
    color: 'var(--color-primary)'
  },
  {
    title: 'SEO Services',
    description: 'Improve your search engine rankings and drive more organic traffic. Local SEO expertise for Dorset businesses.',
    features: [
      'Local SEO optimization',
      'Keyword research',
      'Technical SEO audits',
      'Content optimization'
    ],
    color: 'var(--color-primary)'
  }
];

const processSteps = [
  { number: '1', title: 'Discovery', description: 'We learn about your business, goals, and target audience to create the perfect strategy.' },
  { number: '2', title: 'Design', description: 'Our team creates beautiful, functional designs that reflect your brand and engage users.' },
  { number: '3', title: 'Development', description: 'We bring your design to life with clean, efficient code and modern technologies.' },
  { number: '4', title: 'Launch', description: 'We ensure a smooth launch and provide ongoing support to keep your site performing.' }
];

const towns = [
  { name: 'Bournemouth', href: '/web-design/bournemouth' },
  { name: 'Poole', href: '/web-design/poole' },
  { name: 'Weymouth', href: '/web-design/weymouth' },
  { name: 'Dorchester', href: '/web-design/dorchester' },
  { name: 'Bridport', href: '/web-design/bridport' },
  { name: 'Sherborne', href: '/web-design/sherborne' },
  { name: 'Swanage', href: '/web-design/swanage' },
  { name: 'Blandford Forum', href: '/web-design/blandford-forum' }
];

export default function ServicesPage() {
  // Generate structured data for services page
  const schemaMarkup = generatePageSchema('service', {
    service: 'web-design',
    breadcrumbs: [
      { name: 'Home', url: 'https://creativecurrent.co.uk' },
      { name: 'Services', url: 'https://creativecurrent.co.uk/services' }
    ],
    faqs: [
      {
        question: 'What web design services do you offer in Dorset?',
        answer: 'We offer comprehensive web design services including responsive web design, WordPress development, e-commerce solutions, UI/UX design, website maintenance, and SEO services for businesses across Dorset.'
      },
      {
        question: 'How long does it take to build a website?',
        answer: 'Website development typically takes 4-8 weeks depending on complexity. We follow a proven process: Discovery (1 week), Design (2-3 weeks), Development (2-3 weeks), and Launch (1 week).'
      },
      {
        question: 'Do you provide ongoing website maintenance?',
        answer: 'Yes, we offer comprehensive website maintenance services including security updates, backups, performance monitoring, and content updates to keep your website running smoothly.'
      }
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
                Web Design Services Dorset
              </h1>
              <p className="hero-description">
                Comprehensive web design and development services tailored for Dorset businesses. 
                From concept to launch, we&apos;ve got you covered.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="page-section">
          <div className="container">
            <div className="grid-responsive grid-auto-fit">
              {services.map((service, index) => (
                <div key={index} className="service-card" style={{ 
                  background: 'var(--color-background-lighter)', 
                  border: '1px solid var(--color-primary-200)', 
                  borderRadius: 'var(--radius-lg)', 
                  padding: '2rem'
                }}>
                  <div style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    background: 'var(--color-primary-200)', 
                    borderRadius: 'var(--radius-lg)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: '1.5rem' 
                  }}>
                    <div style={{ 
                      width: '1.5rem', 
                      height: '1.5rem', 
                      background: service.color, 
                      borderRadius: 'var(--radius-sm)' 
                    }}></div>
                  </div>
                  <h3 style={{ 
                    fontSize: 'var(--font-size-2xl)', 
                    fontWeight: 'var(--font-weight-bold)', 
                    color: 'var(--color-text-primary)', 
                    marginBottom: '1rem' 
                  }}>{service.title}</h3>
                  <p style={{ 
                    color: 'var(--color-text-muted)', 
                    marginBottom: '1.5rem',
                    lineHeight: 'var(--line-height-relaxed)'
                  }}>
                    {service.description}
                  </p>
                  <ul style={{ marginBottom: '1.5rem' }}>
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '0.5rem',
                        color: 'var(--color-text-muted)'
                      }}>
                        <span style={{ 
                          width: '6px', 
                          height: '6px', 
                          background: service.color, 
                          borderRadius: '50%', 
                          marginRight: '0.75rem' 
                        }}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a href="/contact" className="link-hover" style={{ 
                    color: service.color, 
                    fontWeight: 'var(--font-weight-semibold)',
                    textDecoration: 'none'
                  }}>
                    Learn More →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="page-section-alt">
          <div className="container">
            <div>
              <h2 className="section-title">
                Our Process
              </h2>
              <p className="section-description">
                We follow a proven process to ensure your project is delivered on time, 
                on budget, and exceeds your expectations.
              </p>
            </div>
            
            <div className="grid-responsive grid-4-col">
              {processSteps.map((step, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    background: 'var(--color-primary)', 
                    color: 'white', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 1rem',
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-bold)'
                  }}>
                    {step.number}
                  </div>
                  <h3 style={{ 
                    fontSize: 'var(--font-size-lg)', 
                    fontWeight: 'var(--font-weight-bold)', 
                    color: 'var(--color-text-primary)', 
                    marginBottom: '0.75rem' 
                  }}>{step.title}</h3>
                  <p style={{ 
                    color: 'var(--color-text-muted)',
                    lineHeight: 'var(--line-height-relaxed)'
                  }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Focus Section */}
        <section className="page-section">
          <div className="container">
            <div>
              <h2 className="section-title">
                Serving Dorset Businesses
              </h2>
              <p className="section-description">
                We&apos;re proud to serve businesses across Dorset with our web design and development services.
              </p>
            </div>
            
            <div className="grid-responsive" style={{ 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              textAlign: 'center'
            }}>
              {towns.map((town, index) => (
                <div key={index} style={{ padding: '1rem' }}>
                  <h3 style={{ 
                    fontWeight: 'var(--font-weight-semibold)', 
                    color: 'var(--color-text-primary)', 
                    marginBottom: '0.5rem' 
                  }}>{town.name}</h3>
                  <a href={town.href} className="link-hover" style={{ 
                    color: 'var(--color-primary)', 
                    textDecoration: 'none'
                  }}>
                    Web Design Services →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="page-section-alt">
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 className="section-title">
              Ready to Get Started?
            </h2>
            <p className="section-description" style={{ marginBottom: '2rem' }}>
              Let&apos;s discuss your project and how we can help bring your vision to life.
            </p>
            <div className="cta-buttons">
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
                Get A Quote
              </a>
              <a 
                href="/work" 
                className="cta-button-secondary"
                style={{ 
                  display: 'inline-block',
                  border: '1px solid var(--color-primary)', 
                  color: 'var(--color-primary)', 
                  padding: '1rem 2rem', 
                  borderRadius: 'var(--radius-lg)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                View Our Work
              </a>
            </div>
          </div>
        </section>
      </div>
      </Layout>
    </>
  );
}
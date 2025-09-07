// src/app/terms/page.tsx
import { Layout } from '@/components/global/Layout';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generatePageSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  title: 'Terms of Service - Creative Current',
  description: 'Terms of service and conditions for Creative Current web design services in Dorset.',
  path: '/terms',
});

export default function TermsPage() {
  const schemaMarkup = generatePageSchema('terms');

  return (
    <>
      <SchemaMarkup schema={schemaMarkup} />
      <Layout>
        <div className="page-container">
          {/* Hero Section */}
          <section className="hero-section">
            <div className="container">
              <h1 className="hero-title">Terms of Service</h1>
              <p className="hero-description">
                Please read these terms and conditions carefully before using our services.
              </p>
            </div>
          </section>

          {/* Terms Content */}
          <section className="page-section">
            <div className="container">
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                
                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                    1. Agreement to Terms
                  </h2>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    By accessing and using Creative Current&apos;s services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                    2. Services Description
                  </h2>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    Creative Current provides web design, development, and digital marketing services to businesses across Dorset, including Bournemouth, Poole, Weymouth, and Dorchester.
                  </p>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    Our services include but are not limited to:
                  </p>
                  <ul style={{ marginBottom: '1rem', paddingLeft: '2rem', lineHeight: '1.7' }}>
                    <li>Website design and development</li>
                    <li>E-commerce solutions</li>
                    <li>Search engine optimization (SEO)</li>
                    <li>Digital marketing and branding</li>
                    <li>Website maintenance and support</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                    3. Payment Terms
                  </h2>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    Payment terms will be specified in individual project agreements. Generally, we require a 50% deposit before work begins, with the remainder due upon project completion.
                  </p>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    Late payments may incur additional charges as specified in the project agreement.
                  </p>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                    4. Intellectual Property
                  </h2>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    Upon full payment, clients will own the rights to their website design and content. Creative Current retains the right to showcase completed work in our portfolio and marketing materials.
                  </p>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    Any third-party assets, plugins, or frameworks used remain the property of their respective owners and are subject to their licensing terms.
                  </p>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                    5. Project Timeline and Revisions
                  </h2>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    Project timelines will be agreed upon at the start of each project. Delays caused by client feedback, content provision, or change requests may extend the timeline.
                  </p>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    We include up to 3 rounds of revisions in our standard packages. Additional revisions may incur extra charges.
                  </p>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                    6. Limitation of Liability
                  </h2>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    Creative Current&apos;s liability is limited to the amount paid for services. We are not liable for any indirect, incidental, or consequential damages.
                  </p>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    While we strive for 100% uptime, we cannot guarantee uninterrupted service and are not liable for temporary outages or technical issues beyond our control.
                  </p>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                    7. Termination
                  </h2>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    Either party may terminate services with 30 days written notice. Upon termination, payment is due for all work completed up to the termination date.
                  </p>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                    8. Privacy and Data Protection
                  </h2>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    We are committed to protecting your privacy and personal data in accordance with GDPR and UK data protection laws. Please see our <a href="/privacy" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Privacy Policy</a> for detailed information.
                  </p>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                    9. Changes to Terms
                  </h2>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated effective date.
                  </p>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                    10. Contact Information
                  </h2>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div style={{ 
                    background: 'var(--color-background-lighter)', 
                    padding: '2rem', 
                    borderRadius: '8px',
                    marginTop: '1.5rem'
                  }}>
                    <p style={{ marginBottom: '0.5rem' }}><strong>Creative Current</strong></p>
                    <p style={{ marginBottom: '0.5rem' }}>Email: hello@creativecurrent.co.uk</p>
                    <p style={{ marginBottom: '0.5rem' }}>Phone: +44 (0) 1234 567890</p>
                    <p>Address: Dorset, United Kingdom</p>
                  </div>
                </div>

                <div style={{ 
                  textAlign: 'center', 
                  padding: '2rem', 
                  borderTop: '1px solid var(--color-border)',
                  marginTop: '3rem',
                  color: 'var(--color-text-muted)'
                }}>
                  <p>Last updated: {new Date().toLocaleDateString('en-GB', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>

              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
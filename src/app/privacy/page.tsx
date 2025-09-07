// src/app/privacy/page.tsx
import { Layout } from '@/components/global/Layout';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generatePageSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy - Creative Current',
  description: 'Privacy policy and data protection information for Creative Current web design services.',
  path: '/privacy',
});

export default function PrivacyPage() {
  const schemaMarkup = generatePageSchema('privacy');

  return (
    <>
      <SchemaMarkup schema={schemaMarkup} />
      <Layout>
        <div className="page-container">
          {/* Hero Section */}
          <section className="hero-section">
            <div className="container">
              <h1 className="hero-title">Privacy Policy</h1>
              <p className="hero-description">
                Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
              </p>
            </div>
          </section>

          {/* Privacy Content */}
          <section className="page-section">
            <div className="container">
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                
                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                    1. Information We Collect
                  </h2>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    We collect information you provide directly to us when you contact us, request quotes, or engage with our services.
                  </p>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                    2. How We Use Your Information
                  </h2>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    We use your information to provide our web design services, respond to inquiries, and improve our offerings.
                  </p>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                    3. Data Protection
                  </h2>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    We implement appropriate security measures to protect your personal information in accordance with GDPR and UK data protection laws.
                  </p>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                    4. Contact Us
                  </h2>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                    For questions about this privacy policy, contact us at hello@creativecurrent.co.uk
                  </p>
                </div>

              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
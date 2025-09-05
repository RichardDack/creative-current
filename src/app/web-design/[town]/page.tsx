// src/app/web-design/[town]/page.tsx - Dynamic Town Page (Next.js 15 Fixed)
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Layout } from '@/components/global/Layout';
import { LocalHero } from '@/components/sections/LocalHero';
import { LocalServicesSection } from '@/components/sections/LocalServicesSection';
import { LocalIndustriesSection } from '@/components/sections/LocalIndustriesSection';
import { LocalTestimonialsSection } from '@/components/sections/LocalTestimonialsSection';
import { LocalFAQSection } from '@/components/sections/LocalFAQSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { LocalBreadcrumbs } from '@/components/ui/LocalBreadcrumbs';
import { LocalStructuredData } from '@/components/seo/LocalStructuredData';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { 
  dorseyTowns, 
  generateLocalMetadata, 
  generateLocalContent, 
  generateLocalBusinessSchema 
} from '@/lib/seo/metadata';

// FIXED: Updated PageProps for Next.js 15 - params is now a Promise
interface PageProps {
  params: Promise<{
    town: string;
  }>;
}

// Generate static params for all Dorset towns
export async function generateStaticParams() {
  return Object.keys(dorseyTowns).map((townKey) => ({
    town: townKey,
  }));
}

// FIXED: Generate metadata for each town - now async to handle Promise params
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { town } = await params; // FIXED: await the params promise
  
  if (!dorseyTowns[town]) {
    return {
      title: 'Page Not Found | Creative Current',
      description: 'The requested page could not be found.'
    };
  }

  return generateLocalMetadata(town, 'web design');
}

// FIXED: Main component is now async to handle Promise params
export default async function TownPage({ params }: PageProps) {
  const { town } = await params; // FIXED: await the params promise
  
  // Check if town exists and is valid
  if (!town || typeof town !== 'string' || !dorseyTowns[town]) {
    notFound();
  }

  const townData = dorseyTowns[town];
  
  // Add null checks for data generation
  if (!townData) {
    notFound();
  }

  const localContent = generateLocalContent(town);
  const schemaData = generateLocalBusinessSchema(town);

  // Validate that required content was generated
  if (!localContent || !schemaData) {
    console.error(`Failed to generate content for town: ${town}`);
    notFound();
  }

  return (
    <Layout>
      <LocalStructuredData schema={schemaData} />
      
      <ErrorBoundary 
        fallback={
          <div className="error-boundary-fallback">
            <div className="error-content">
              <h2>Unable to load page content</h2>
              <p>We're having trouble loading the content for {townData.town}. Please try refreshing the page.</p>
            </div>
          </div>
        }
        onError={(error, errorInfo) => {
          console.error(`Error in town page for ${town}:`, error, errorInfo);
        }}
      >
        {/* Breadcrumbs */}
        {localContent.breadcrumbs && localContent.breadcrumbs.length > 0 && (
          <LocalBreadcrumbs items={localContent.breadcrumbs} />
        )}
        
        {/* Hero Section */}
        {localContent.heroTitle && localContent.heroSubtitle && localContent.heroDescription && (
          <ErrorBoundary 
            key={`hero-${town}`}
            fallback={<div className="section-error">Unable to load hero section</div>}
            onError={(error) => console.error('Hero section error:', error)}
            resetKeys={[town]}
          >
            <LocalHero
              title={localContent.heroTitle}
              subtitle={localContent.heroSubtitle}
              description={localContent.heroDescription}
              townData={townData}
              ctaPrimary={{
                text: `Get Your ${townData.town} Quote`,
                href: '#contact'
              }}
              ctaSecondary={{
                text: 'View Our Work',
                href: '#work-section'
              }}
            />
          </ErrorBoundary>
        )}

        {/* Services Section */}
        {localContent.servicesSection && localContent.servicesSection.title && localContent.servicesSection.services && (
          <ErrorBoundary 
            key={`services-${town}`}
            fallback={<div className="section-error">Unable to load services section</div>}
            onError={(error) => console.error('Services section error:', error)}
            resetKeys={[town]}
          >
            <LocalServicesSection
              title={localContent.servicesSection.title}
              services={localContent.servicesSection.services}
              townName={townData.town}
              county={townData.county}
            />
          </ErrorBoundary>
        )}

        {/* Industries Section */}
        {localContent.localBusinessSection && 
         localContent.localBusinessSection.title && 
         localContent.localBusinessSection.content && 
         localContent.localBusinessSection.industries && (
          <ErrorBoundary 
            key={`industries-${town}`}
            fallback={<div className="section-error">Unable to load industries section</div>}
            onError={(error) => console.error('Industries section error:', error)}
            resetKeys={[town]}
          >
            <LocalIndustriesSection
              title={localContent.localBusinessSection.title}
              content={localContent.localBusinessSection.content}
              industries={localContent.localBusinessSection.industries}
              townName={townData.town}
              landmarks={townData.landmarks}
            />
          </ErrorBoundary>
        )}

        {/* Testimonials Section */}
        {townData.town && (
          <ErrorBoundary 
            key={`testimonials-${town}`}
            fallback={<div className="section-error">Unable to load testimonials section</div>}
            onError={(error) => console.error('Testimonials section error:', error)}
            resetKeys={[town]}
          >
            <LocalTestimonialsSection townName={townData.town} />
          </ErrorBoundary>
        )}

        {/* FAQ Section */}
        {localContent.faqSection && Array.isArray(localContent.faqSection) && localContent.faqSection.length > 0 && (
          <ErrorBoundary 
            key={`faq-${town}`}
            fallback={<div className="section-error">Unable to load FAQ section</div>}
            onError={(error) => console.error('FAQ section error:', error)}
            resetKeys={[town]}
          >
            <LocalFAQSection 
              faqs={localContent.faqSection}
              townName={townData.town}
            />
          </ErrorBoundary>
        )}

        {/* Contact Section */}
        <ErrorBoundary 
          key={`contact-${town}`}
          fallback={<div className="section-error">Unable to load contact section</div>}
          onError={(error) => console.error('Contact section error:', error)}
          resetKeys={[town]}
        >
          <ContactSection />
        </ErrorBoundary>
      </ErrorBoundary>
    </Layout>
  );
}
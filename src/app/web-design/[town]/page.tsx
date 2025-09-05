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
import { TownPageErrorBoundary } from '@/components/ui/TownPageErrorBoundary';
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

  return generateLocalMetadata(town);
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
      
      <TownPageErrorBoundary 
        town={town}
        sectionName="page"
        fallback={
          <div className="error-boundary-fallback">
            <div className="error-content">
              <h2>Unable to load page content</h2>
              <p>We&apos;re having trouble loading the content for {townData.town}. Please try refreshing the page.</p>
            </div>
          </div>
        }
      >
        {/* Breadcrumbs */}
        {localContent.breadcrumbs && localContent.breadcrumbs.length > 0 && (
          <LocalBreadcrumbs items={localContent.breadcrumbs} />
        )}
        
        {/* Hero Section */}
        {localContent.heroTitle && localContent.heroSubtitle && localContent.heroDescription && (
          <TownPageErrorBoundary 
            key={`hero-${town}`}
            town={town}
            sectionName="hero"
            fallback={<div className="section-error">Unable to load hero section</div>}
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
                href: '/#work-section'
              }}
            />
          </TownPageErrorBoundary>
        )}

        {/* Services Section */}
        {localContent.servicesSection && localContent.servicesSection.title && localContent.servicesSection.services && (
          <TownPageErrorBoundary 
            key={`services-${town}`}
            town={town}
            sectionName="services"
            fallback={<div className="section-error">Unable to load services section</div>}
          >
            <LocalServicesSection
              title={localContent.servicesSection.title}
              services={localContent.servicesSection.services}
              townName={townData.town}
              county={townData.county}
            />
          </TownPageErrorBoundary>
        )}

        {/* Industries Section */}
        {localContent.localBusinessSection && 
         localContent.localBusinessSection.title && 
         localContent.localBusinessSection.content && 
         localContent.localBusinessSection.industries && (
          <TownPageErrorBoundary 
            key={`industries-${town}`}
            town={town}
            sectionName="industries"
            fallback={<div className="section-error">Unable to load industries section</div>}
          >
            <LocalIndustriesSection
              title={localContent.localBusinessSection.title}
              content={localContent.localBusinessSection.content}
              industries={localContent.localBusinessSection.industries}
              townName={townData.town}
              landmarks={townData.landmarks}
            />
          </TownPageErrorBoundary>
        )}

        {/* Testimonials Section */}
        {townData.town && (
          <TownPageErrorBoundary 
            key={`testimonials-${town}`}
            town={town}
            sectionName="testimonials"
            fallback={<div className="section-error">Unable to load testimonials section</div>}
          >
            <LocalTestimonialsSection townName={townData.town} />
          </TownPageErrorBoundary>
        )}

        {/* FAQ Section */}
        {localContent.faqSection && Array.isArray(localContent.faqSection) && localContent.faqSection.length > 0 && (
          <TownPageErrorBoundary 
            key={`faq-${town}`}
            town={town}
            sectionName="faq"
            fallback={<div className="section-error">Unable to load FAQ section</div>}
          >
            <LocalFAQSection 
              faqs={localContent.faqSection}
              townName={townData.town}
            />
          </TownPageErrorBoundary>
        )}

        {/* Contact Section */}
        <TownPageErrorBoundary 
          key={`contact-${town}`}
          town={town}
          sectionName="contact"
          fallback={<div className="section-error">Unable to load contact section</div>}
        >
          <ContactSection />
        </TownPageErrorBoundary>
      </TownPageErrorBoundary>
    </Layout>
  );
}
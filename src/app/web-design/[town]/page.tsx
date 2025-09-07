// src/app/web-design/[town]/page.tsx - Enhanced Dynamic Town Page with SEO Optimization
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Layout } from '@/components/global/Layout';
import { LocalHero } from '@/components/sections/LocalHero';
import { LocalServicesSection } from '@/components/sections/LocalServicesSection';

import { LocalTestimonialsSection } from '@/components/sections/LocalTestimonialsSection';
import { LocalFAQSection } from '@/components/sections/LocalFAQSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { LocalBreadcrumbs } from '@/components/ui/LocalBreadcrumbs';
import { LocalStructuredData } from '@/components/seo/LocalStructuredData';
import { TownPageErrorBoundary } from '@/components/ui/TownPageErrorBoundary';

import { 
  getLocationBySlug,
  getAllLocationSlugs,
  generateLocationKeywords
} from '@/lib/data/locations';
import { 
  generateSEOMetadata,
  toNextMetadata,
  type PageContext
} from '@/lib/seo/metadata';
import { generateLocationPageSchemas } from '@/lib/seo/schema';
import { generateEnhancedLocationContent } from '@/lib/content/locationContent';

// FIXED: Updated PageProps for Next.js 15 - params is now a Promise
interface PageProps {
  params: Promise<{
    town: string;
  }>;
}

// Generate static params for all Dorset towns
export async function generateStaticParams() {
  return getAllLocationSlugs().map((townSlug) => ({
    town: townSlug,
  }));
}

// Generate enhanced SEO metadata for each town
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { town } = await params;
  
  // Get location data
  const locationData = getLocationBySlug(town);
  if (!locationData) {
    return {
      title: 'Page Not Found | Creative Current',
      description: 'The requested page could not be found.'
    };
  }

  // Create page context for SEO metadata generation
  const pageContext: PageContext = {
    type: 'town',
    location: town,
    path: `/web-design/${town}`
  };

  // Generate comprehensive SEO metadata (escapeString is used internally by generateSEOMetadata)
  const seoMetadata = generateSEOMetadata(
    pageContext,
    `Web Design ${locationData.name} - Professional Website Design Services`,
    `Professional web design services in ${locationData.name}, ${locationData.county}. ${locationData.description} Custom websites, responsive design, and digital solutions for local businesses.`,
    generateLocationKeywords(town, 'web design')
  );

  return toNextMetadata(seoMetadata);
}

// Enhanced main component with improved content generation
export default async function TownPage({ params }: PageProps) {
  const { town } = await params;
  
  // Get location data using new data structure
  const locationData = getLocationBySlug(town);
  if (!locationData) {
    notFound();
  }

  // Generate enhanced location content with proper escaping
  const enhancedContent = generateEnhancedLocationContent(town);
  if (!enhancedContent) {
    console.error(`Failed to generate enhanced content for town: ${town}`);
    notFound();
  }

  // Generate comprehensive schema markup
  const schemaMarkups = generateLocationPageSchemas(
    locationData,
    town,
    enhancedContent.faq,
    enhancedContent.breadcrumbs
  );

  return (
    <Layout>
      <LocalStructuredData schema={schemaMarkups} />
      
      <TownPageErrorBoundary 
        town={town}
        sectionName="page"
        fallback={
          <div className="error-boundary-fallback">
            <div className="error-content">
              <h2>Unable to load page content</h2>
              <p>We&apos;re having trouble loading the content for {locationData.name}. Please try refreshing the page.</p>
            </div>
          </div>
        }
      >
        {/* Breadcrumbs */}
        {enhancedContent.breadcrumbs && enhancedContent.breadcrumbs.length > 0 && (
          <LocalBreadcrumbs items={enhancedContent.breadcrumbs} />
        )}
        
        {/* Hero Section */}
        <TownPageErrorBoundary 
          key={`hero-${town}`}
          town={town}
          sectionName="hero"
          fallback={<div className="section-error">Unable to load hero section</div>}
        >
          <LocalHero
            title={enhancedContent.hero.title}
            subtitle={enhancedContent.hero.subtitle}
            description={enhancedContent.hero.description}
            townData={{
              town: locationData.name,
              county: locationData.county,
              landmarks: locationData.seoData.localLandmarks,
              keyIndustries: locationData.keyIndustries,
              businessDistricts: [],
              population: locationData.population,
              postcodes: locationData.postcodes,
              coordinates: {
                lat: 0,
                lng: 0
              }
            }}
            ctaPrimary={{
              text: `Get Your ${locationData.name} Quote`,
              href: '#contact'
            }}
            ctaSecondary={{
              text: 'View Our Work',
              href: '/#work-section'
            }}
          />
        </TownPageErrorBoundary>

        {/* Services Section */}
        <TownPageErrorBoundary 
          key={`services-${town}`}
          town={town}
          sectionName="services"
          fallback={<div className="section-error">Unable to load services section</div>}
        >
          <LocalServicesSection
            title={enhancedContent.services.title}
            services={enhancedContent.services.services}
            townName={locationData.name}
            county={locationData.county}
          />
        </TownPageErrorBoundary>

        {/* Enhanced Testimonials Section */}
        <TownPageErrorBoundary 
          key={`testimonials-${town}`}
          town={town}
          sectionName="testimonials"
          fallback={<div className="section-error">Unable to load testimonials section</div>}
        >
          <LocalTestimonialsSection townName={locationData.name} />
        </TownPageErrorBoundary>

        {/* Enhanced FAQ Section with Schema */}
        {enhancedContent.faq && enhancedContent.faq.length > 0 && (
          <TownPageErrorBoundary 
            key={`faq-${town}`}
            town={town}
            sectionName="faq"
            fallback={<div className="section-error">Unable to load FAQ section</div>}
          >
            <LocalFAQSection 
              faqs={enhancedContent.faq}
              townName={locationData.name}
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
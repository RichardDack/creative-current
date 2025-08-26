// src/app/web-design/[town]/page.tsx - Dynamic Town Page
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
import { 
  dorseyTowns, 
  generateLocalMetadata, 
  generateLocalContent, 
  generateLocalBusinessSchema 
} from '@/lib/seo/metadata';

interface PageProps {
  params: {
    town: string;
  };
}

// Generate static params for all Dorset towns
export async function generateStaticParams() {
  return Object.keys(dorseyTowns).map((townKey) => ({
    town: townKey,
  }));
}

// Generate metadata for each town
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { town } = params;
  
  if (!dorseyTowns[town]) {
    return {
      title: 'Page Not Found | Creative Current',
      description: 'The requested page could not be found.'
    };
  }

  return generateLocalMetadata(town, 'web design');
}

export default function TownPage({ params }: PageProps) {
  const { town } = params;
  
  // Check if town exists
  if (!dorseyTowns[town]) {
    notFound();
  }

  const townData = dorseyTowns[town];
  const localContent = generateLocalContent(town);
  const schemaData = generateLocalBusinessSchema(town);

  return (
    <Layout>
      <LocalStructuredData schema={schemaData} />
      
      {/* Breadcrumbs */}
      <LocalBreadcrumbs items={localContent.breadcrumbs} />
      
      {/* Hero Section */}
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

      {/* Services Section */}
      <LocalServicesSection
        title={localContent.servicesSection.title}
        services={localContent.servicesSection.services}
        townName={townData.town}
        county={townData.county}
      />

      {/* Industries Section */}
      {localContent.localBusinessSection && (
        <LocalIndustriesSection
          title={localContent.localBusinessSection.title}
          content={localContent.localBusinessSection.content}
          industries={localContent.localBusinessSection.industries}
          townName={townData.town}
          landmarks={townData.landmarks}
        />
      )}

      {/* Testimonials Section */}
      <LocalTestimonialsSection townName={townData.town} />

      {/* FAQ Section */}
      <LocalFAQSection 
        faqs={localContent.faqSection}
        townName={townData.town}
      />

      {/* Contact Section */}
      <ContactSection 
        title={localContent.contactSection.title}
        description={localContent.contactSection.content}
        localInfo={{
          phone: localContent.contactSection.localPhone,
          coverage: localContent.contactSection.coverage
        }}
      />
    </Layout>
  );
}


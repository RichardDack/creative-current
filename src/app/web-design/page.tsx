// src/app/web-design/page.tsx - Main web design landing page
import { Metadata } from 'next';
import { Layout } from '@/components/global/Layout';
import { WebDesignHero } from '@/components/sections/WebDesignHero';
import { TownLinksSection } from '@/components/sections/TownLinksSection';
import { WebDesignServicesSection } from '@/components/sections/WebDesignServicesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { dorseyTowns } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'Professional Web Design Dorset | Creative Current - Expert Web Developers',
  description: 'Leading web design and development services across Dorset. From Bournemouth to Weymouth, we create stunning, responsive websites that drive business results. Get your free quote today!',
  keywords: [
    'web design dorset',
    'website design dorset',
    'web development dorset',
    'dorset web designers',
    'responsive web design',
    'small business websites dorset',
    'professional web design',
    'custom websites dorset',
    'mobile web design',
    'SEO dorset',
    'digital marketing dorset',
    'web designers bournemouth',
    'web designers poole',
    'web designers weymouth',
    'web designers dorchester',
    'dorset website company'
  ].join(', '),
  authors: [{ name: 'Creative Current' }],
  creator: 'Creative Current',
  publisher: 'Creative Current',
  
  openGraph: {
    title: 'Web Design Dorset | Creative Current - Professional Website Development',
    description: 'Transform your Dorset business with professional web design. Creative Current creates stunning, mobile-responsive websites across Bournemouth, Poole, Weymouth and all of Dorset.',
    url: 'https://creativecurrent.co.uk/web-design',
    siteName: 'Creative Current',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/images/og/web-design-dorset-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Web Design Services across Dorset'
      }
    ]
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Web Design Dorset | Creative Current',
    description: 'Professional web design services across Dorset. Custom websites that convert visitors into customers.',
    creator: '@creativecurrent',
    images: ['/images/twitter/web-design-dorset-twitter.jpg']
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },

  alternates: {
    canonical: 'https://creativecurrent.co.uk/web-design'
  },

  other: {
    'geo.region': 'GB-DOR',
    'geo.placename': 'Dorset, England',
    'ICBM': '50.7120, -2.4410'
  }
};

export default function WebDesignPage() {
  return (
    <Layout>
      <WebDesignHero />
      <TownLinksSection towns={dorseyTowns} />
      <WebDesignServicesSection />
      <ContactSection />
    </Layout>
  );
}
// src/app/sitemap.ts - Dynamic sitemap generation
import { MetadataRoute } from 'next';
import { dorseyTowns } from '@/lib/seo/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://creativecurrent.co.uk';
  
  // Main site pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/web-design`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  ];

  // Generate town-specific pages
  const townPages: MetadataRoute.Sitemap = Object.keys(dorseyTowns).map((townKey) => ({
    url: `${baseUrl}/web-design/${townKey}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...townPages];
}
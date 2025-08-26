import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/private/',
        '/admin/',
        '/_next/',
        '/api/',
        '*.json',
        '*.xml',
      ],
    },
    sitemap: 'https://creativecurrent.co.uk/sitemap.xml',
  };
}
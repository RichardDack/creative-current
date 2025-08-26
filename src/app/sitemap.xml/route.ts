// src/app/sitemap.xml/route.ts - XML Route Handler
import { dorseyTowns } from '@/lib/seo/metadata';

export async function GET() {
  const baseUrl = 'https://creativecurrent.co.uk';
  const currentDate = new Date().toISOString();
  
  // Generate all URLs
  const staticPages = [
    { url: baseUrl, priority: '1.0', changefreq: 'weekly' },
    { url: `${baseUrl}/web-design`, priority: '0.9', changefreq: 'weekly' },
    { url: `${baseUrl}/contact`, priority: '0.8', changefreq: 'monthly' },
    { url: `${baseUrl}/about`, priority: '0.7', changefreq: 'monthly' },
    { url: `${baseUrl}/services`, priority: '0.8', changefreq: 'monthly' },
    { url: `${baseUrl}/portfolio`, priority: '0.8', changefreq: 'weekly' }
  ];

  const townPages = Object.keys(dorseyTowns).map(townKey => ({
    url: `${baseUrl}/web-design/${townKey}`,
    priority: '0.8',
    changefreq: 'monthly'
  }));

  const allPages = [...staticPages, ...townPages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  });
}
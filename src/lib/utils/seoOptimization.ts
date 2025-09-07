// src/lib/utils/seoOptimization.ts - SEO optimization utilities for navigation

/**
 * SEO optimization utilities for navigation links and structure
 */

export interface SEONavigationData {
  breadcrumbs: Array<{ name: string; url: string }>;
  structuredData: object;
  metaTags: Array<{ name: string; content: string }>;
  linkAttributes: Array<{ href: string; attributes: Record<string, string> }>;
}

/**
 * Generate comprehensive SEO data for navigation
 * @param currentPage - Current page type
 * @param townSlug - Town slug for town pages
 * @param navigationItems - Current navigation items
 * @returns SEO optimization data
 */
export function generateNavigationSEO(
  currentPage: string,
  townSlug?: string,
  navigationItems: Array<{ name: string; href: string }> = []
): SEONavigationData {
  const baseUrl = 'https://creativecurrent.co.uk';
  
  // Generate breadcrumbs
  const breadcrumbs = generateSEOBreadcrumbs(currentPage, townSlug, baseUrl);
  
  // Generate structured data
  const structuredData = generateNavigationStructuredData(navigationItems, baseUrl);
  
  // Generate meta tags
  const metaTags = generateNavigationMetaTags(currentPage, townSlug);
  
  // Generate link attributes for better SEO
  const linkAttributes = generateLinkAttributes(navigationItems);
  
  return {
    breadcrumbs,
    structuredData,
    metaTags,
    linkAttributes
  };
}

/**
 * Generate SEO-optimized breadcrumbs
 */
function generateSEOBreadcrumbs(
  currentPage: string,
  townSlug?: string,
  baseUrl: string = 'https://creativecurrent.co.uk'
): Array<{ name: string; url: string }> {
  const breadcrumbs = [
    { name: 'Home', url: baseUrl }
  ];

  if (currentPage === 'web-design') {
    breadcrumbs.push({ 
      name: 'Web Design Services', 
      url: `${baseUrl}/web-design` 
    });
  } else if (currentPage === 'town' && townSlug) {
    breadcrumbs.push({ 
      name: 'Web Design Services', 
      url: `${baseUrl}/web-design` 
    });
    
    const townName = townSlug.charAt(0).toUpperCase() + townSlug.slice(1);
    breadcrumbs.push({ 
      name: `Web Design ${townName}`, 
      url: `${baseUrl}/web-design/${townSlug}` 
    });
  }

  return breadcrumbs;
}

/**
 * Generate structured data for navigation
 */
function generateNavigationStructuredData(
  navigationItems: Array<{ name: string; href: string }>,
  baseUrl: string = 'https://creativecurrent.co.uk'
): object {
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Main Navigation",
    "url": navigationItems.map(item => {
      const fullUrl = item.href.startsWith('/') 
        ? `${baseUrl}${item.href}`
        : item.href.startsWith('#')
        ? `${baseUrl}${item.href}`
        : item.href;
        
      return {
        "@type": "WebPage",
        "name": item.name,
        "url": fullUrl
      };
    })
  };
}

/**
 * Generate navigation-related meta tags
 */
function generateNavigationMetaTags(
  currentPage: string,
  townSlug?: string
): Array<{ name: string; content: string }> {
  const metaTags: Array<{ name: string; content: string }> = [];

  // Add navigation-specific meta tags
  if (currentPage === 'homepage') {
    metaTags.push({
      name: 'robots',
      content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    });
  } else if (currentPage === 'web-design') {
    metaTags.push({
      name: 'robots',
      content: 'index, follow'
    });
    metaTags.push({
      name: 'geo.region',
      content: 'GB-DOR'
    });
    metaTags.push({
      name: 'geo.placename',
      content: 'Dorset, England'
    });
  } else if (currentPage === 'town' && townSlug) {
    metaTags.push({
      name: 'robots',
      content: 'index, follow'
    });
    metaTags.push({
      name: 'geo.region',
      content: 'GB-DOR'
    });
    metaTags.push({
      name: 'geo.placename',
      content: `${townSlug.charAt(0).toUpperCase() + townSlug.slice(1)}, Dorset, England`
    });
  }

  return metaTags;
}

/**
 * Generate optimized link attributes
 */
function generateLinkAttributes(
  navigationItems: Array<{ name: string; href: string }>
): Array<{ href: string; attributes: Record<string, string> }> {
  return navigationItems.map(item => {
    const attributes: Record<string, string> = {};

    // Add title attributes for better accessibility and SEO
    if (item.href === '/web-design') {
      attributes.title = 'Professional Web Design Services in Dorset';
    } else if (item.href.includes('#work-section')) {
      attributes.title = 'View Our Portfolio of Web Design Projects';
    } else if (item.href.includes('#meet-our-team')) {
      attributes.title = 'Meet the Creative Current Team';
    } else if (item.href.includes('#footer-background')) {
      attributes.title = 'Contact Creative Current for Your Project';
    }

    // Add rel attributes for external links
    if (item.href.startsWith('http') && !item.href.includes('creativecurrent.co.uk')) {
      attributes.rel = 'noopener noreferrer';
    }

    // Add aria-label for better accessibility
    if (item.name) {
      attributes['aria-label'] = `Navigate to ${item.name} section`;
    }

    return {
      href: item.href,
      attributes
    };
  });
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

/**
 * Optimize navigation for Core Web Vitals
 */
export function optimizeNavigationPerformance(): {
  preloadLinks: string[];
  prefetchLinks: string[];
  recommendations: string[];
} {
  const preloadLinks: string[] = [];
  const prefetchLinks: string[] = [];
  const recommendations: string[] = [];

  // Critical navigation resources to preload
  preloadLinks.push('/web-design'); // Most likely next page

  // Resources to prefetch based on user behavior
  prefetchLinks.push('/#work-section');
  prefetchLinks.push('/#footer-background');

  // Performance recommendations
  recommendations.push('Use CSS containment for navigation animations');
  recommendations.push('Implement intersection observer for scroll-based navigation');
  recommendations.push('Use passive event listeners for scroll events');
  recommendations.push('Minimize navigation reflows with transform-based animations');

  return {
    preloadLinks,
    prefetchLinks,
    recommendations
  };
}

/**
 * Validate navigation accessibility
 */
export function validateNavigationAccessibility(): {
  issues: Array<{ type: string; description: string; severity: 'error' | 'warning' | 'info' }>;
  score: number;
} {
  const issues: Array<{ type: string; description: string; severity: 'error' | 'warning' | 'info' }> = [];

  if (typeof document === 'undefined') {
    return { issues, score: 0 };
  }

  // Check for navigation landmarks
  const navElements = document.querySelectorAll('nav, [role="navigation"]');
  if (navElements.length === 0) {
    issues.push({
      type: 'missing-nav-landmark',
      description: 'No navigation landmarks found',
      severity: 'error'
    });
  }

  // Check for skip links
  const skipLinks = document.querySelectorAll('a[href="#main-content"], a[href^="#main"]');
  if (skipLinks.length === 0) {
    issues.push({
      type: 'missing-skip-link',
      description: 'No skip to main content link found',
      severity: 'warning'
    });
  }

  // Check for aria-labels on navigation
  const navWithoutLabels = document.querySelectorAll('nav:not([aria-label]):not([aria-labelledby])');
  if (navWithoutLabels.length > 0) {
    issues.push({
      type: 'missing-nav-labels',
      description: 'Navigation elements missing aria-label or aria-labelledby',
      severity: 'warning'
    });
  }

  // Check for keyboard navigation support
  const focusableNavItems = document.querySelectorAll('nav a, nav button, [role="navigation"] a, [role="navigation"] button');
  let keyboardAccessible = true;
  
  focusableNavItems.forEach(item => {
    const tabIndex = item.getAttribute('tabindex');
    if (tabIndex === '-1') {
      keyboardAccessible = false;
    }
  });

  if (!keyboardAccessible) {
    issues.push({
      type: 'keyboard-navigation',
      description: 'Some navigation items are not keyboard accessible',
      severity: 'error'
    });
  }

  // Calculate accessibility score
  const totalChecks = 4;
  const passedChecks = totalChecks - issues.filter(issue => issue.severity === 'error').length;
  const score = (passedChecks / totalChecks) * 100;

  return { issues, score };
}

/**
 * Generate navigation sitemap data
 */
export function generateNavigationSitemap(
  baseUrl: string = 'https://creativecurrent.co.uk'
): Array<{ url: string; priority: number; changefreq: string }> {
  return [
    {
      url: baseUrl,
      priority: 1.0,
      changefreq: 'weekly'
    },
    {
      url: `${baseUrl}/web-design`,
      priority: 0.9,
      changefreq: 'monthly'
    },
    {
      url: `${baseUrl}/web-design/bournemouth`,
      priority: 0.8,
      changefreq: 'monthly'
    },
    {
      url: `${baseUrl}/web-design/poole`,
      priority: 0.8,
      changefreq: 'monthly'
    },
    {
      url: `${baseUrl}/web-design/weymouth`,
      priority: 0.8,
      changefreq: 'monthly'
    },
    {
      url: `${baseUrl}/web-design/dorchester`,
      priority: 0.8,
      changefreq: 'monthly'
    }
  ];
}
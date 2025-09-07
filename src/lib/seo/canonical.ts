/**
 * Canonical URL utilities for SEO optimization
 */

const baseUrl = 'https://creativecurrent.co.uk';

/**
 * Generate canonical URL for a given path
 * @param path - The path to generate canonical URL for
 * @returns Canonical URL string
 */
export function generateCanonicalUrl(path: string): string {
  // Remove trailing slash except for root
  const cleanPath = path === '/' ? path : path.replace(/\/$/, '');
  
  // Ensure path starts with /
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  
  return `${baseUrl}${normalizedPath}`;
}

/**
 * Generate canonical URL for town pages
 * @param townSlug - The town slug
 * @returns Canonical URL for the town page
 */
export function generateTownCanonicalUrl(townSlug: string): string {
  return generateCanonicalUrl(`/web-design/${townSlug}`);
}

/**
 * Generate canonical URL for service pages
 * @param serviceSlug - The service slug
 * @returns Canonical URL for the service page
 */
export function generateServiceCanonicalUrl(serviceSlug: string): string {
  return generateCanonicalUrl(`/services/${serviceSlug}`);
}

/**
 * Normalize URL by removing trailing slashes and ensuring proper format
 * @param url - URL to normalize
 * @returns Normalized URL
 */
export function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    
    // Remove trailing slash except for root
    if (urlObj.pathname !== '/') {
      urlObj.pathname = urlObj.pathname.replace(/\/$/, '');
    }
    
    // Ensure lowercase hostname
    urlObj.hostname = urlObj.hostname.toLowerCase();
    
    return urlObj.toString();
  } catch {
    // If URL parsing fails, return the original URL
    return url;
  }
}

/**
 * Check if URL should be canonical (not a duplicate)
 * @param url - URL to check
 * @returns Boolean indicating if URL should be canonical
 */
export function shouldBeCanonical(url: string): boolean {
  try {
    const urlObj = new URL(url);
    
    // Check for common duplicate patterns
    const duplicatePatterns = [
      /\/index\.html?$/,
      /\/default\.html?$/,
      /\?utm_/,
      /\?ref=/,
      /\?source=/,
    ];
    
    return !duplicatePatterns.some(pattern => 
      pattern.test(urlObj.pathname + urlObj.search)
    );
  } catch {
    return true;
  }
}
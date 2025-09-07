// src/lib/utils/navigationUtils.ts - Enhanced navigation utilities with SEO optimization

/**
 * Navigation link validation and management utilities
 * Handles cross-page navigation, URL history, and SEO optimization
 */

export interface NavigationLinkValidation {
  isValid: boolean;
  targetExists: boolean;
  linkType: 'anchor' | 'page' | 'external';
  correctedHref?: string;
}

/**
 * Validate a navigation link and check if its target exists
 * @param href - The href to validate
 * @returns Validation result with recommendations
 */
export function validateNavigationLink(href: string): NavigationLinkValidation {
  const result: NavigationLinkValidation = {
    isValid: false,
    targetExists: false,
    linkType: 'anchor'
  };

  // Determine link type
  if (href.startsWith('http://') || href.startsWith('https://')) {
    result.linkType = 'external';
    result.isValid = true;
    result.targetExists = true; // Assume external links are valid
    return result;
  } else if (href.startsWith('/')) {
    result.linkType = 'page';
    result.isValid = true;
    result.targetExists = true; // Assume page routes are valid
    return result;
  } else if (href.startsWith('#')) {
    result.linkType = 'anchor';
    const targetId = href.substring(1);
    
    // Check if target element exists
    if (typeof document !== 'undefined') {
      const targetElement = document.getElementById(targetId);
      result.targetExists = !!targetElement;
      result.isValid = result.targetExists;
      
      // Provide correction suggestions for common mismatches
      if (!result.targetExists) {
        const corrections = getAnchorLinkCorrections(targetId);
        if (corrections.length > 0) {
          result.correctedHref = `#${corrections[0]}`;
        }
      }
    } else {
      // Server-side: assume valid for now
      result.isValid = true;
      result.targetExists = true;
    }
  }

  return result;
}

/**
 * Get suggested corrections for broken anchor links
 * @param targetId - The broken target ID
 * @returns Array of suggested corrections
 */
function getAnchorLinkCorrections(targetId: string): string[] {
  const corrections: string[] = [];
  
  // Common ID mappings
  const idMappings: Record<string, string> = {
    'about-section': 'meet-our-team',
    'about': 'meet-our-team',
    'services': 'web-design', // This would be a page link
    'contact': 'footer-background',
    'contact-section': 'footer-background',
    'hero': 'hero-section',
    'work': 'work-section',
    'team': 'meet-our-team'
  };

  if (idMappings[targetId]) {
    corrections.push(idMappings[targetId]);
  }

  // If no direct mapping, try to find similar IDs in the DOM
  if (typeof document !== 'undefined') {
    const allElements = document.querySelectorAll('[id]');
    const allIds = Array.from(allElements).map(el => el.id);
    
    // Find similar IDs using fuzzy matching
    const similarIds = allIds.filter(id => 
      id.toLowerCase().includes(targetId.toLowerCase()) ||
      targetId.toLowerCase().includes(id.toLowerCase())
    );
    
    corrections.push(...similarIds);
  }

  return corrections;
}

/**
 * Handle navigation click with proper URL history management
 * @param e - Click event
 * @param href - The href attribute
 * @param currentPage - Current page type for context
 */
export function handleNavigationClick(
  e: React.MouseEvent<HTMLAnchorElement>, 
  href: string,
  currentPage: string = 'homepage'
): void {
  const validation = validateNavigationLink(href);
  
  // Log validation issues in development
  if (process.env.NODE_ENV === 'development' && !validation.isValid) {
    console.warn(`Navigation link validation failed for "${href}":`, validation);
    if (validation.correctedHref) {
      console.warn(`Suggested correction: "${validation.correctedHref}"`);
    }
  }

  // Handle different link types
  if (validation.linkType === 'external') {
    // Let browser handle external links
    return;
  } else if (validation.linkType === 'page') {
    // Let browser handle page navigation
    return;
  } else if (validation.linkType === 'anchor') {
    e.preventDefault();
    
    const targetId = href.substring(1);
    
    // Handle cross-page navigation
    if (window.location.pathname !== '/') {
      // Navigate to homepage first, then scroll to anchor
      const newUrl = `/${href}`;
      
      // Update URL history properly
      window.location.href = newUrl;
      return;
    }
    
    // Same-page anchor scrolling with sticky nav awareness
    scrollToElementWithOffset(targetId);
  }
}

/**
 * Scroll to element with sticky navigation offset
 * @param targetId - The ID of the target element (without #)
 * @param additionalOffset - Additional offset beyond the sticky nav height
 */
export function scrollToElementWithOffset(targetId: string, additionalOffset: number = 20): void {
  const targetElement = document.getElementById(targetId);
  
  if (!targetElement) {
    console.warn(`Element with ID "${targetId}" not found`);
    return;
  }

  // Get sticky nav height dynamically
  const stickyNav = document.querySelector('[data-sticky-nav]') as HTMLElement;
  const stickyNavHeight = stickyNav ? stickyNav.offsetHeight : 60; // Fallback to 60px
  
  const totalOffset = stickyNavHeight + additionalOffset;
  const elementPosition = targetElement.offsetTop;
  const offsetPosition = elementPosition - totalOffset;
  
  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior: 'smooth'
  });
  
  // Update URL hash for proper history management
  if (window.history && window.history.pushState) {
    const newUrl = `${window.location.pathname}#${targetId}`;
    window.history.pushState(null, '', newUrl);
  }
}

/**
 * Generate SEO-friendly navigation links based on current page context
 * @param currentPage - Current page type
 * @param townSlug - Town slug for town pages
 * @returns Array of navigation items
 */
export function generateContextualNavigationLinks(
  currentPage: string,
  townSlug?: string
): Array<{ name: string; href: string; id: string; type: 'anchor' | 'page' }> {
  const baseLinks = [
    { name: 'WORK', href: '#work-section', id: 'work', type: 'anchor' as const },
    { name: 'ABOUT', href: '#meet-our-team', id: 'about', type: 'anchor' as const },
    { name: 'SERVICES', href: '/web-design', id: 'services', type: 'page' as const },
    { name: 'CONTACT', href: '#footer-background', id: 'contact', type: 'anchor' as const },
  ];

  if (currentPage === 'homepage') {
    return baseLinks;
  } else if (currentPage === 'web-design') {
    return [
      { name: 'HOME', href: '/', id: 'home', type: 'page' as const },
      { name: 'WORK', href: '/#work-section', id: 'work', type: 'page' as const },
      { name: 'ABOUT', href: '/#meet-our-team', id: 'about', type: 'page' as const },
      { name: 'CONTACT', href: '/#footer-background', id: 'contact', type: 'page' as const },
    ];
  } else if (currentPage === 'town') {
    return [
      { name: 'HOME', href: '/', id: 'home', type: 'page' as const },
      { name: 'WEB-DESIGN', href: '/web-design', id: 'web-design', type: 'page' as const },
      { name: 'WORK', href: '/#work-section', id: 'work', type: 'page' as const },
      { name: 'ABOUT', href: '/#meet-our-team', id: 'about', type: 'page' as const },
      { name: 'CONTACT', href: '/#footer-background', id: 'contact', type: 'page' as const },
    ];
  }

  return baseLinks;
}

/**
 * Generate town navigation links for Dorset towns
 * @returns Array of town navigation items
 */
export function generateTownNavigationLinks(): Array<{ name: string; href: string; id: string; type: 'page' }> {
  return [
    { name: 'Dorchester', href: '/web-design/dorchester', id: 'dorchester', type: 'page' as const },
    { name: 'Weymouth', href: '/web-design/weymouth', id: 'weymouth', type: 'page' as const },
    { name: 'Bridport', href: '/web-design/bridport', id: 'bridport', type: 'page' as const },
  ];
}

/**
 * Audit all navigation links on the current page
 * @returns Array of validation results for all found navigation links
 */
export function auditPageNavigationLinks(): Array<{ href: string; element: Element; validation: NavigationLinkValidation }> {
  if (typeof document === 'undefined') {
    return [];
  }

  const results: Array<{ href: string; element: Element; validation: NavigationLinkValidation }> = [];
  
  // Find all navigation links
  const navLinks = document.querySelectorAll('a[href^="#"], a[href^="/"], nav a, [role="navigation"] a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const validation = validateNavigationLink(href);
      results.push({ href, element: link, validation });
    }
  });

  return results;
}

/**
 * Fix broken navigation links on the current page
 * @param dryRun - If true, only log what would be fixed without making changes
 * @returns Number of links fixed
 */
export function fixBrokenNavigationLinks(dryRun: boolean = false): number {
  const auditResults = auditPageNavigationLinks();
  let fixedCount = 0;

  auditResults.forEach(({ href, element, validation }) => {
    if (!validation.isValid && validation.correctedHref) {
      if (dryRun) {
        console.log(`Would fix: "${href}" → "${validation.correctedHref}"`);
      } else {
        element.setAttribute('href', validation.correctedHref);
        console.log(`Fixed: "${href}" → "${validation.correctedHref}"`);
      }
      fixedCount++;
    }
  });

  return fixedCount;
}

/**
 * Generate structured data for navigation (SEO)
 * @param navigationItems - Array of navigation items
 * @returns Structured data object
 */
export function generateNavigationStructuredData(
  navigationItems: Array<{ name: string; href: string }>
): object {
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Main Navigation",
    "url": navigationItems.map(item => ({
      "@type": "WebPage",
      "name": item.name,
      "url": item.href.startsWith('/') ? `https://creativecurrent.co.uk${item.href}` : item.href
    }))
  };
}

/**
 * Check if current URL has a hash and scroll to it on page load
 * Useful for handling direct links to anchors
 */
export function handleInitialHashScroll(): void {
  if (typeof window === 'undefined') return;

  const hash = window.location.hash;
  if (hash) {
    // Wait for page to fully load
    setTimeout(() => {
      const targetId = hash.substring(1);
      scrollToElementWithOffset(targetId);
    }, 100);
  }
}

/**
 * Generate breadcrumb navigation for SEO
 * @param currentPage - Current page type
 * @param townSlug - Town slug for town pages
 * @returns Breadcrumb items
 */
export function generateBreadcrumbs(
  currentPage: string,
  townSlug?: string
): Array<{ name: string; href: string }> {
  const breadcrumbs = [
    { name: 'Home', href: '/' }
  ];

  if (currentPage === 'web-design') {
    breadcrumbs.push({ name: 'Web Design', href: '/web-design' });
  } else if (currentPage === 'town' && townSlug) {
    breadcrumbs.push({ name: 'Web Design', href: '/web-design' });
    breadcrumbs.push({ name: townSlug.charAt(0).toUpperCase() + townSlug.slice(1), href: `/web-design/${townSlug}` });
  }

  return breadcrumbs;
}

/**
 * Generate navigation links based on current page context
 * @param currentPage - Current page type
 * @param townSlug - Town slug for town pages
 * @returns Array of navigation items
 */
export function generateNavigationLinks(
  currentPage: string,
  townSlug?: string
): Array<{ name: string; href: string; id: string; type: 'anchor' | 'page'; isActive?: boolean }> {
  return generateContextualNavigationLinks(currentPage, townSlug).map(item => ({
    name: item.name,
    href: item.href,
    id: item.id,
    type: item.type,
    isActive: false // Will be set by markActiveNavigationItem
  }));
}

/**
 * Determine if sticky navigation should be shown
 * @param currentPage - Current page type
 * @param isScrolledPastHero - Whether user has scrolled past hero section
 * @param currentSection - Current section being viewed
 * @returns Whether sticky nav should be visible
 */
export function shouldShowStickyNav(
  currentPage: string,
  isScrolledPastHero: boolean,
  currentSection?: string
): boolean {
  // Always show on non-homepage pages
  if (currentPage !== 'homepage') {
    return true;
  }

  // On homepage, show only after scrolling past hero
  return isScrolledPastHero;
}

/**
 * Mark active navigation item based on current section
 * @param navigationItems - Array of navigation items
 * @param currentSection - Current section ID
 * @returns Updated navigation items with active states
 */
export function markActiveNavigationItem<T extends { id: string; href: string; isActive?: boolean }>(
  navigationItems: T[],
  currentSection?: string
): T[] {
  return navigationItems.map(item => ({
    ...item,
    isActive: currentSection ? item.href.includes(currentSection) : false
  }));
}

/**
 * Detect current section based on scroll position
 * @returns Current section ID or undefined
 */
export function detectCurrentSection(): string | undefined {
  if (typeof window === 'undefined') return undefined;

  const sections = [
    'hero-section',
    'work-section', 
    'meet-our-team',
    'footer-background'
  ];

  const stickyNavHeight = 60;
  const scrollPosition = window.scrollY + stickyNavHeight + 100; // Add buffer

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementBottom = elementTop + rect.height;

      if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
        return sectionId;
      }
    }
  }

  return undefined;
}
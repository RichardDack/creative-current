// src/lib/utils/navigationUtils.ts - Navigation utility functions

import { NavigationItem, PageType, PageContext, ViewportSize, NavigationType } from '@/types/navigation';

/**
 * Navigation configuration constants
 */
export const NAVIGATION_CONFIG = {
  homepage: {
    heroNavigation: [
      { id: 'work', name: 'WORK', href: '#work-section', type: 'anchor' as NavigationType },
      { id: 'about', name: 'ABOUT', href: '#meet-our-team', type: 'anchor' as NavigationType },
      { id: 'services', name: 'SERVICES', href: '/web-design', type: 'page' as NavigationType },
      { id: 'contact', name: 'CONTACT', href: '#footer-background', type: 'anchor' as NavigationType }
    ],
    stickyNavigation: [
      { id: 'work', name: 'WORK', href: '#work-section', type: 'anchor' as NavigationType },
      { id: 'about', name: 'ABOUT', href: '#meet-our-team', type: 'anchor' as NavigationType },
      { id: 'services', name: 'SERVICES', href: '/web-design', type: 'page' as NavigationType },
      { id: 'contact', name: 'CONTACT', href: '#footer-background', type: 'anchor' as NavigationType }
    ],
    showStickyAfterScroll: true
  },
  webDesign: {
    mainNavigation: [
      { id: 'home', name: 'HOME', href: '/', type: 'page' as NavigationType },
      { id: 'work', name: 'WORK', href: '/#work-section', type: 'page' as NavigationType },
      { id: 'about', name: 'ABOUT', href: '/#meet-our-team', type: 'page' as NavigationType },
      { id: 'contact', name: 'CONTACT', href: '/#footer-background', type: 'page' as NavigationType }
    ],
    townNavigation: [
      { id: 'town-1', name: 'DORCHESTER', href: '/web-design/dorchester', type: 'page' as NavigationType },
      { id: 'town-2', name: 'WEYMOUTH', href: '/web-design/weymouth', type: 'page' as NavigationType },
      { id: 'town-3', name: 'BRIDPORT', href: '/web-design/bridport', type: 'page' as NavigationType }
    ],
    showStickyImmediately: true
  },
  townPages: {
    mainNavigation: [
      { id: 'home', name: 'HOME', href: '/', type: 'page' as NavigationType },
      { id: 'web-design', name: 'WEB-DESIGN', href: '/web-design', type: 'page' as NavigationType },
      { id: 'work', name: 'WORK', href: '/#work-section', type: 'page' as NavigationType },
      { id: 'about', name: 'ABOUT', href: '/#meet-our-team', type: 'page' as NavigationType },
      { id: 'contact', name: 'CONTACT', href: '/#footer-background', type: 'page' as NavigationType }
    ],
    otherTowns: [
      { id: 'town-1', name: 'DORCHESTER', href: '/web-design/dorchester', type: 'page' as NavigationType },
      { id: 'town-2', name: 'WEYMOUTH', href: '/web-design/weymouth', type: 'page' as NavigationType },
      { id: 'town-3', name: 'BRIDPORT', href: '/web-design/bridport', type: 'page' as NavigationType }
    ],
    showStickyImmediately: true
  }
} as const;

/**
 * Detect current page context based on URL and other factors
 */
export function detectPageContext(): PageContext {
  if (typeof window === 'undefined') {
    return {
      pageType: 'homepage',
      isScrolledPastHero: false,
      viewportSize: 'desktop'
    };
  }

  const pathname = window.location.pathname;
  let pageType: PageType = 'homepage';
  let townSlug: string | undefined;

  // Determine page type from URL
  if (pathname === '/') {
    pageType = 'homepage';
  } else if (pathname === '/web-design') {
    pageType = 'web-design';
  } else if (pathname.startsWith('/web-design/')) {
    pageType = 'town';
    townSlug = pathname.split('/').pop();
  }

  // Detect viewport size
  const viewportSize: ViewportSize = 
    window.innerWidth < 768 ? 'mobile' :
    window.innerWidth < 1024 ? 'tablet' : 'desktop';

  // Detect scroll position (will be updated by scroll detection hook)
  const isScrolledPastHero = false;

  return {
    pageType,
    townSlug,
    isScrolledPastHero,
    viewportSize
  };
}

/**
 * Generate appropriate navigation links based on current page context
 */
export function generateNavigationLinks(currentPage: PageType, townSlug?: string): {
  navigationItems: NavigationItem[];
  subNavigationItems: NavigationItem[];
} {
  switch (currentPage) {
    case 'homepage':
      return {
        navigationItems: [...NAVIGATION_CONFIG.homepage.stickyNavigation],
        subNavigationItems: []
      };

    case 'web-design':
      return {
        navigationItems: [...NAVIGATION_CONFIG.webDesign.mainNavigation],
        subNavigationItems: [...NAVIGATION_CONFIG.webDesign.townNavigation]
      };

    case 'town':
      // Filter out current town from other towns list
      const otherTowns = NAVIGATION_CONFIG.townPages.otherTowns.filter(
        town => !town.href.includes(townSlug || '')
      );
      
      return {
        navigationItems: [...NAVIGATION_CONFIG.townPages.mainNavigation],
        subNavigationItems: [...otherTowns]
      };

    default:
      return {
        navigationItems: [...NAVIGATION_CONFIG.homepage.stickyNavigation],
        subNavigationItems: []
      };
  }
}

/**
 * Generate mobile navigation links with proper cross-page handling
 */
export function generateMobileNavigationLinks(currentPage: PageType, townSlug?: string): NavigationItem[] {
  switch (currentPage) {
    case 'homepage':
      // On homepage, use anchor links for same-page navigation
      return [
        { id: 'work', name: 'WORK', href: '#work-section', type: 'anchor' },
        { id: 'about', name: 'ABOUT', href: '#meet-our-team', type: 'anchor' },
        { id: 'services', name: 'SERVICES', href: '/web-design', type: 'page' },
        { id: 'contact', name: 'CONTACT', href: '#footer-background', type: 'anchor' }
      ];

    case 'web-design':
      // On web-design page, include town navigation as sub-items
      const webDesignLinks = [
        { id: 'home', name: 'HOME', href: '/', type: 'page' as NavigationType },
        { id: 'work', name: 'WORK', href: '/#work-section', type: 'page' as NavigationType },
        { id: 'about', name: 'ABOUT', href: '/#meet-our-team', type: 'page' as NavigationType },
        { id: 'contact', name: 'CONTACT', href: '/#footer-background', type: 'page' as NavigationType },
        // Add town navigation as a separator
        { id: 'towns-separator', name: '--- LOCATIONS ---', href: '#', type: 'anchor' as NavigationType, mobileOnly: true },
        ...NAVIGATION_CONFIG.webDesign.townNavigation.map(town => ({ ...town }))
      ];
      return webDesignLinks;

    case 'town':
      // On town pages, show navigation back to main sections and other towns
      const townLinks = [
        { id: 'home', name: 'HOME', href: '/', type: 'page' as NavigationType },
        { id: 'web-design', name: 'WEB-DESIGN', href: '/web-design', type: 'page' as NavigationType },
        { id: 'work', name: 'WORK', href: '/#work-section', type: 'page' as NavigationType },
        { id: 'about', name: 'ABOUT', href: '/#meet-our-team', type: 'page' as NavigationType },
        { id: 'contact', name: 'CONTACT', href: '/#footer-background', type: 'page' as NavigationType }
      ];

      // Add other towns if there are any
      const otherTowns = NAVIGATION_CONFIG.townPages.otherTowns.filter(
        town => !town.href.includes(townSlug || '')
      );
      
      if (otherTowns.length > 0) {
        townLinks.push(
          { id: 'other-towns-separator', name: '--- OTHER LOCATIONS ---', href: '#', type: 'anchor' as NavigationType, mobileOnly: true },
          ...otherTowns.map(town => ({ ...town }))
        );
      }

      return townLinks;

    default:
      return [...NAVIGATION_CONFIG.homepage.stickyNavigation];
  }
}

/**
 * Handle navigation click with proper cross-page and smooth scrolling logic
 */
export function handleNavigationClick(href: string): void {
  if (typeof window === 'undefined') return;

  // Handle anchor links on same page
  if (href.startsWith('#') && currentPage === 'homepage') {
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    return;
  }

  // Handle cross-page navigation with anchor
  if (href.includes('/#')) {
    const [path, anchor] = href.split('/#');
    
    if (window.location.pathname === path || (path === '' && window.location.pathname === '/')) {
      // Same page, just scroll to anchor
      const targetElement = document.getElementById(anchor);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Different page, navigate and let the page handle the anchor
      window.location.href = href;
    }
    return;
  }

  // Handle regular page navigation
  if (href.startsWith('/') || href.startsWith('http')) {
    window.location.href = href;
    return;
  }
}

/**
 * Validate navigation link exists and is accessible
 */
export function validateNavigationLink(href: string): boolean {
  if (typeof window === 'undefined') return true;

  // Validate anchor links have corresponding elements
  if (href.startsWith('#')) {
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    return !!targetElement;
  }

  // Validate cross-page anchor links
  if (href.includes('/#')) {
    // For cross-page links, we can't validate the target element
    // but we can validate the URL structure
    return href.match(/^\/?#?[\w-]+$/) !== null;
  }

  // For page links, assume they're valid (could implement route validation)
  if (href.startsWith('/') || href.startsWith('http')) {
    return true;
  }

  return false;
}

/**
 * Determine if sticky navigation should be shown based on page type and scroll state
 * 
 * Requirements addressed:
 * - 2.1: Show after hero scroll on homepage, immediately on sub-pages
 * - 4.1, 4.2, 4.3: Proper page-type aware visibility logic
 */
export function shouldShowStickyNav(
  currentPage: PageType, 
  isScrolledPastHero: boolean
): boolean {
  switch (currentPage) {
    case 'homepage':
      // On homepage, only show after scrolling past hero section
      return isScrolledPastHero;
      
    case 'web-design':
    case 'town':
      // On sub-pages, always show sticky navigation immediately
      return true;
      
    default:
      return false;
  }
}

/**
 * Enhanced sticky navigation visibility with scroll direction awareness
 * Provides smoother UX by considering scroll direction for show/hide behavior
 */
export function shouldShowStickyNavEnhanced(
  currentPage: PageType, 
  isScrolledPastHero: boolean,
  scrollDirection: 'up' | 'down' | 'none' = 'none',
  scrollY: number = 0
): boolean {
  const baseVisibility = shouldShowStickyNav(currentPage, isScrolledPastHero, scrollDirection);
  
  // For homepage, add scroll direction awareness for better UX
  if (currentPage === 'homepage' && baseVisibility) {
    // Hide sticky nav when scrolling down fast (aggressive scrolling)
    // Show when scrolling up or when near the top
    if (scrollDirection === 'down' && scrollY > 200) {
      // Could implement hide-on-scroll behavior here if desired
      // For now, keep it always visible once past hero
      return true;
    }
    
    return true;
  }
  
  return baseVisibility;
}

/**
 * Get contextual message for mobile navigation
 */
export function getContextualMessage(currentPage: PageType, townSlug?: string): string | undefined {
  switch (currentPage) {
    case 'web-design':
      return 'Navigate to main sections or select a location';
    case 'town':
      const formattedTownName = townSlug 
        ? townSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'this location';
      return `Navigate from ${formattedTownName}`;
    default:
      return undefined;
  }
}

/**
 * Get available towns for navigation (could be fetched from API in real implementation)
 */
export function getAvailableTowns(): NavigationItem[] {
  return [...NAVIGATION_CONFIG.webDesign.townNavigation];
}

/**
 * Check if a town slug is valid
 */
export function isValidTownSlug(townSlug: string): boolean {
  return NAVIGATION_CONFIG.webDesign.townNavigation.some(
    town => town.href.includes(townSlug)
  );
}

/**
 * Get town display name from slug
 */
export function getTownDisplayName(townSlug: string): string {
  const town = NAVIGATION_CONFIG.webDesign.townNavigation.find(
    town => town.href.includes(townSlug)
  );
  return town?.name || townSlug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

/**
 * Generate breadcrumb navigation for current page
 */
export function generateBreadcrumbNavigation(currentPage: PageType, townSlug?: string): NavigationItem[] {
  const breadcrumbs: NavigationItem[] = [
    { id: 'home-breadcrumb', name: 'Home', href: '/', type: 'page' }
  ];

  switch (currentPage) {
    case 'web-design':
      breadcrumbs.push({
        id: 'web-design-breadcrumb',
        name: 'Web Design',
        href: '/web-design',
        type: 'page',
        isActive: true
      });
      break;

    case 'town':
      breadcrumbs.push(
        {
          id: 'web-design-breadcrumb',
          name: 'Web Design',
          href: '/web-design',
          type: 'page'
        },
        {
          id: 'town-breadcrumb',
          name: getTownDisplayName(townSlug || ''),
          href: `/web-design/${townSlug}`,
          type: 'page',
          isActive: true
        }
      );
      break;

    default:
      // Homepage doesn't need breadcrumbs
      return [];
  }

  return breadcrumbs;
}

/**
 * Mark active navigation item based on current context
 */
export function markActiveNavigationItem(
  items: NavigationItem[], 
  currentPage: PageType, 
  currentSection?: string,
  currentPath?: string
): NavigationItem[] {
  return items.map(item => ({
    ...item,
    isActive: determineIfItemIsActive(item, currentPage, currentSection, currentPath)
  }));
}

/**
 * Determine if a navigation item should be marked as active
 */
function determineIfItemIsActive(
  item: NavigationItem, 
  currentPage: PageType, 
  currentSection?: string,
  currentPath?: string
): boolean {
  const currentPathname = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '/');

  // For page navigation
  if (item.type === 'page') {
    // Exact path match
    if (item.href === currentPathname) return true;
    
    // Homepage variations
    if ((item.href === '/' || item.href === '') && currentPage === 'homepage') return true;
    
    // Web-design page
    if (item.href === '/web-design' && currentPage === 'web-design') return true;
    
    // Town pages - check if current path matches the town href
    if (item.href.startsWith('/web-design/') && currentPage === 'town') {
      return currentPathname === item.href;
    }

    // Cross-page navigation (e.g., /#work-section from sub-pages)
    if (item.href.startsWith('/#')) {
      const [targetPage, targetAnchor] = item.href.split('/#');
      if (targetPage === '' && currentPage === 'homepage' && currentSection) {
        return targetAnchor === currentSection;
      }
    }
  }

  // For anchor navigation on homepage
  if (item.type === 'anchor' && currentPage === 'homepage' && currentSection) {
    const targetId = item.href.replace('#', '');
    return targetId === currentSection;
  }

  return false;
}

/**
 * Detect current section based on scroll position and visible elements
 */
export function detectCurrentSection(): string | undefined {
  if (typeof window === 'undefined') return undefined;

  // Get all sections that could be navigation targets
  const sectionIds = ['work-section', 'meet-our-team', 'footer-background'];
  const sections = sectionIds
    .map(id => ({ id, element: document.getElementById(id) }))
    .filter(section => section.element !== null);

  if (sections.length === 0) return undefined;

  // Find the section that's currently most visible in the viewport
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const viewportCenter = scrollY + viewportHeight / 2;

  let currentSection = sections[0].id;
  let minDistance = Infinity;

  sections.forEach(({ id, element }) => {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const elementTop = scrollY + rect.top;
    const elementCenter = elementTop + rect.height / 2;
    const distance = Math.abs(viewportCenter - elementCenter);

    if (distance < minDistance) {
      minDistance = distance;
      currentSection = id;
    }
  });

  return currentSection;
}

/**
 * Generate contextual sub-navigation based on current page and context
 */
export function generateContextualSubNavigation(
  currentPage: PageType, 
  townSlug?: string,
  showAllTowns: boolean = false
): NavigationItem[] {
  switch (currentPage) {
    case 'homepage':
      // No sub-navigation on homepage
      return [];

    case 'web-design':
      // Show town navigation with enhanced context
      const townNav = [...NAVIGATION_CONFIG.webDesign.townNavigation];
      
      // If we want to show all towns with additional context
      if (showAllTowns) {
        return townNav.map(town => ({
          ...town,
          name: `${town.name} WEB DESIGN`
        }));
      }
      
      return townNav;

    case 'town':
      // Show other towns and main navigation
      const otherTowns = NAVIGATION_CONFIG.townPages.otherTowns.filter(
        town => !town.href.includes(townSlug || '')
      );

      // Add contextual information to other towns
      return otherTowns.map(town => ({
        ...town,
        name: `${town.name} WEB DESIGN`
      }));

    default:
      return [];
  }
}
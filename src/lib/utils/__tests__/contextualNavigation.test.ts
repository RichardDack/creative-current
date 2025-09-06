// src/lib/utils/__tests__/contextualNavigation.test.ts - Tests for contextual navigation generation

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  generateNavigationLinks,
  generateMobileNavigationLinks,
  generateContextualSubNavigation,
  markActiveNavigationItem,
  detectCurrentSection,
  generateBreadcrumbNavigation,
  getContextualMessage,
  isValidTownSlug,
  getTownDisplayName
} from '../navigationUtils';
import { PageType } from '@/types/navigation';

// Mock window.location
const mockLocation = {
  pathname: '/',
  href: 'http://localhost:3000/'
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('Contextual Navigation Generation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocation.pathname = '/';
    mockLocation.href = 'http://localhost:3000/';
  });

  describe('Context Switching Scenarios', () => {
    it('should generate different navigation for homepage vs web-design page', () => {
      const homepageNav = generateNavigationLinks('homepage');
      const webDesignNav = generateNavigationLinks('web-design');

      // Homepage should have anchor links
      expect(homepageNav.navigationItems.find(item => item.id === 'work')?.href).toBe('#work-section');
      expect(homepageNav.subNavigationItems).toHaveLength(0);

      // Web-design should have page links and town sub-navigation
      expect(webDesignNav.navigationItems.find(item => item.id === 'work')?.href).toBe('/#work-section');
      expect(webDesignNav.subNavigationItems.length).toBeGreaterThan(0);
    });

    it('should generate contextual mobile navigation based on current page', () => {
      const homepageMobile = generateMobileNavigationLinks('homepage');
      const webDesignMobile = generateMobileNavigationLinks('web-design');
      const townMobile = generateMobileNavigationLinks('town', 'dorchester');

      // Homepage mobile should use anchor links
      expect(homepageMobile.find(item => item.id === 'about')?.href).toBe('#meet-our-team');

      // Web-design mobile should include town navigation
      expect(webDesignMobile.find(item => item.id === 'towns-separator')).toBeDefined();
      expect(webDesignMobile.length).toBeGreaterThan(homepageMobile.length);

      // Town mobile should exclude current town
      expect(townMobile.find(item => item.href.includes('dorchester'))).toBeUndefined();
      expect(townMobile.find(item => item.href.includes('weymouth'))).toBeDefined();
    });

    it('should generate appropriate sub-navigation for different contexts', () => {
      const homepageSubNav = generateContextualSubNavigation('homepage');
      const webDesignSubNav = generateContextualSubNavigation('web-design');
      const townSubNav = generateContextualSubNavigation('town', 'dorchester');

      expect(homepageSubNav).toHaveLength(0);
      expect(webDesignSubNav.length).toBeGreaterThan(0);
      expect(townSubNav.length).toBeGreaterThan(0);

      // Town sub-nav should not include current town
      expect(townSubNav.find(item => item.href.includes('dorchester'))).toBeUndefined();
    });
  });

  describe('Active State Detection', () => {
    it('should correctly mark active items for different page types', () => {
      const pageItems = [
        { id: 'home', name: 'HOME', href: '/', type: 'page' as const },
        { id: 'web-design', name: 'WEB DESIGN', href: '/web-design', type: 'page' as const },
        { id: 'town', name: 'DORCHESTER', href: '/web-design/dorchester', type: 'page' as const }
      ];

      // Test homepage active state
      const homepageMarked = markActiveNavigationItem(pageItems, 'homepage', undefined, '/');
      expect(homepageMarked.find(item => item.id === 'home')?.isActive).toBe(true);
      expect(homepageMarked.find(item => item.id === 'web-design')?.isActive).toBe(false);

      // Test web-design active state
      const webDesignMarked = markActiveNavigationItem(pageItems, 'web-design', undefined, '/web-design');
      expect(webDesignMarked.find(item => item.id === 'home')?.isActive).toBe(false);
      expect(webDesignMarked.find(item => item.id === 'web-design')?.isActive).toBe(true);

      // Test town active state
      const townMarked = markActiveNavigationItem(pageItems, 'town', undefined, '/web-design/dorchester');
      expect(townMarked.find(item => item.id === 'town')?.isActive).toBe(true);
      expect(townMarked.find(item => item.id === 'web-design')?.isActive).toBe(false);
    });

    it('should mark anchor items as active based on current section', () => {
      const anchorItems = [
        { id: 'work', name: 'WORK', href: '#work-section', type: 'anchor' as const },
        { id: 'about', name: 'ABOUT', href: '#meet-our-team', type: 'anchor' as const }
      ];

      const markedItems = markActiveNavigationItem(anchorItems, 'homepage', 'work-section', '/');
      
      expect(markedItems.find(item => item.id === 'work')?.isActive).toBe(true);
      expect(markedItems.find(item => item.id === 'about')?.isActive).toBe(false);
    });
  });

  describe('Town-specific Navigation', () => {
    it('should validate town slugs correctly', () => {
      expect(isValidTownSlug('dorchester')).toBe(true);
      expect(isValidTownSlug('weymouth')).toBe(true);
      expect(isValidTownSlug('bridport')).toBe(true);
      expect(isValidTownSlug('invalid-town')).toBe(false);
    });

    it('should format town display names correctly', () => {
      expect(getTownDisplayName('dorchester')).toBe('DORCHESTER');
      expect(getTownDisplayName('weymouth')).toBe('WEYMOUTH');
      expect(getTownDisplayName('new-york')).toBe('New York'); // Fallback formatting
    });

    it('should generate correct breadcrumbs for town pages', () => {
      const breadcrumbs = generateBreadcrumbNavigation('town', 'dorchester');
      
      expect(breadcrumbs).toHaveLength(3);
      expect(breadcrumbs[0].name).toBe('Home');
      expect(breadcrumbs[1].name).toBe('Web Design');
      expect(breadcrumbs[2].name).toBe('DORCHESTER');
      expect(breadcrumbs[2].isActive).toBe(true);
    });
  });

  describe('Contextual Messages', () => {
    it('should provide appropriate contextual messages', () => {
      expect(getContextualMessage('homepage')).toBeUndefined();
      expect(getContextualMessage('web-design')).toBe('Navigate to main sections or select a location');
      expect(getContextualMessage('town', 'dorchester')).toBe('Navigate from Dorchester');
      expect(getContextualMessage('town', 'new-york')).toBe('Navigate from New York');
    });
  });

  describe('Section Detection', () => {
    beforeEach(() => {
      // Mock document.getElementById for section detection
      // Note: getBoundingClientRect().top is relative to viewport, so we need to account for scroll
      const mockElements = {
        'work-section': { 
          getBoundingClientRect: () => ({ top: 100 - window.scrollY, height: 500 }) 
        },
        'meet-our-team': { 
          getBoundingClientRect: () => ({ top: 700 - window.scrollY, height: 400 }) 
        },
        'footer-background': { 
          getBoundingClientRect: () => ({ top: 1200 - window.scrollY, height: 300 }) 
        }
      };
      
      document.getElementById = vi.fn((id) => mockElements[id as keyof typeof mockElements] || null);
      
      // Mock window scroll properties
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
    });

    it('should detect current section based on scroll position', () => {
      // Viewport center at 400px (scrollY: 0 + innerHeight: 800 / 2) should detect work-section as closest
      // work-section center: 100 + 500/2 = 350px, distance = |400 - 350| = 50px
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      expect(detectCurrentSection()).toBe('work-section');

      // Viewport center at 900px (scrollY: 500 + innerHeight: 800 / 2) should detect meet-our-team as closest
      // meet-our-team center: 700 + 400/2 = 900px, distance = |900 - 900| = 0px
      Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
      expect(detectCurrentSection()).toBe('meet-our-team');
    });

    it('should handle missing sections gracefully', () => {
      document.getElementById = vi.fn().mockReturnValue(null);
      expect(detectCurrentSection()).toBeUndefined();
    });
  });

  describe('Navigation Item Filtering', () => {
    it('should filter out current town from other towns list', () => {
      const townNav = generateNavigationLinks('town', 'dorchester');
      
      expect(townNav.subNavigationItems.find(item => item.href.includes('dorchester'))).toBeUndefined();
      expect(townNav.subNavigationItems.find(item => item.href.includes('weymouth'))).toBeDefined();
      expect(townNav.subNavigationItems.find(item => item.href.includes('bridport'))).toBeDefined();
    });

    it('should include all towns for web-design page', () => {
      const webDesignNav = generateNavigationLinks('web-design');
      
      expect(webDesignNav.subNavigationItems.find(item => item.href.includes('dorchester'))).toBeDefined();
      expect(webDesignNav.subNavigationItems.find(item => item.href.includes('weymouth'))).toBeDefined();
      expect(webDesignNav.subNavigationItems.find(item => item.href.includes('bridport'))).toBeDefined();
    });
  });

  describe('Enhanced Sub-navigation', () => {
    it('should enhance town names when showAllTowns is true', () => {
      const enhancedSubNav = generateContextualSubNavigation('web-design', undefined, true);
      
      expect(enhancedSubNav[0].name).toContain('WEB DESIGN');
      expect(enhancedSubNav.every(item => item.name.includes('WEB DESIGN'))).toBe(true);
    });

    it('should provide contextual town navigation for town pages', () => {
      const townSubNav = generateContextualSubNavigation('town', 'dorchester');
      
      expect(townSubNav.every(item => item.name.includes('WEB DESIGN'))).toBe(true);
      expect(townSubNav.find(item => item.href.includes('dorchester'))).toBeUndefined();
    });
  });
});
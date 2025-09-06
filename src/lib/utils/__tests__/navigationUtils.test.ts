// src/lib/utils/__tests__/navigationUtils.test.ts

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  detectPageContext,
  generateNavigationLinks,
  generateMobileNavigationLinks,
  handleNavigationClick,
  validateNavigationLink,
  shouldShowStickyNav,
  shouldShowStickyNavEnhanced,
  getContextualMessage,
  markActiveNavigationItem,
  detectCurrentSection,
  generateContextualSubNavigation,
  getAvailableTowns,
  isValidTownSlug,
  getTownDisplayName,
  generateBreadcrumbNavigation,
  NAVIGATION_CONFIG
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

describe('navigationUtils', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    mockLocation.pathname = '/';
    mockLocation.href = 'http://localhost:3000/';
    
    // Reset window dimensions
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
  });

  describe('detectPageContext', () => {
    it('should detect homepage context correctly', () => {
      mockLocation.pathname = '/';
      
      const context = detectPageContext();
      
      expect(context.pageType).toBe('homepage');
      expect(context.townSlug).toBeUndefined();
      expect(context.viewportSize).toBe('desktop');
    });

    it('should detect web-design page context correctly', () => {
      mockLocation.pathname = '/web-design';
      
      const context = detectPageContext();
      
      expect(context.pageType).toBe('web-design');
      expect(context.townSlug).toBeUndefined();
    });

    it('should detect town page context correctly', () => {
      mockLocation.pathname = '/web-design/dorchester';
      
      const context = detectPageContext();
      
      expect(context.pageType).toBe('town');
      expect(context.townSlug).toBe('dorchester');
    });

    it('should detect mobile viewport correctly', () => {
      Object.defineProperty(window, 'innerWidth', { value: 600, writable: true });
      
      const context = detectPageContext();
      
      expect(context.viewportSize).toBe('mobile');
    });

    it('should detect tablet viewport correctly', () => {
      Object.defineProperty(window, 'innerWidth', { value: 800, writable: true });
      
      const context = detectPageContext();
      
      expect(context.viewportSize).toBe('tablet');
    });
  });

  describe('generateNavigationLinks', () => {
    it('should generate correct navigation for homepage', () => {
      const { navigationItems, subNavigationItems } = generateNavigationLinks('homepage');
      
      expect(navigationItems).toEqual(NAVIGATION_CONFIG.homepage.stickyNavigation);
      expect(subNavigationItems).toEqual([]);
    });

    it('should generate correct navigation for web-design page', () => {
      const { navigationItems, subNavigationItems } = generateNavigationLinks('web-design');
      
      expect(navigationItems).toEqual(NAVIGATION_CONFIG.webDesign.mainNavigation);
      expect(subNavigationItems).toEqual(NAVIGATION_CONFIG.webDesign.townNavigation);
    });

    it('should generate correct navigation for town page', () => {
      const { navigationItems, subNavigationItems } = generateNavigationLinks('town', 'dorchester');
      
      expect(navigationItems).toEqual(NAVIGATION_CONFIG.townPages.mainNavigation);
      // Should exclude current town from sub-navigation
      expect(subNavigationItems).not.toContainEqual(
        expect.objectContaining({ href: '/web-design/dorchester' })
      );
    });
  });

  describe('generateMobileNavigationLinks', () => {
    it('should generate anchor links for homepage', () => {
      const links = generateMobileNavigationLinks('homepage');
      
      expect(links.every(link => link.type === 'anchor' || link.href.startsWith('/'))).toBe(true);
      expect(links.find(link => link.id === 'about')?.href).toBe('#meet-our-team');
    });

    it('should generate page links with town navigation for web-design page', () => {
      const links = generateMobileNavigationLinks('web-design');
      
      expect(links.find(link => link.id === 'work')?.href).toBe('/#work-section');
      expect(links.find(link => link.id === 'about')?.href).toBe('/#meet-our-team');
      
      // Should include town navigation
      expect(links.find(link => link.id === 'towns-separator')).toBeDefined();
      expect(links.find(link => link.id === 'town-1')).toBeDefined();
    });

    it('should generate page links with other towns for town page', () => {
      const links = generateMobileNavigationLinks('town', 'dorchester');
      
      expect(links.find(link => link.id === 'home')?.href).toBe('/');
      expect(links.find(link => link.id === 'web-design')?.href).toBe('/web-design');
      
      // Should include other towns but not current town
      expect(links.find(link => link.href.includes('dorchester'))).toBeUndefined();
      expect(links.find(link => link.href.includes('weymouth'))).toBeDefined();
    });
  });

  describe('handleNavigationClick', () => {
    beforeEach(() => {
      // Mock document.getElementById
      const mockElement = {
        scrollIntoView: vi.fn()
      };
      
      document.getElementById = vi.fn().mockReturnValue(mockElement);
    });

    it('should handle anchor links on homepage', () => {
      const mockElement = { scrollIntoView: vi.fn() };
      document.getElementById = vi.fn().mockReturnValue(mockElement);
      
      handleNavigationClick('#work-section', 'homepage');
      
      expect(document.getElementById).toHaveBeenCalledWith('work-section');
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
    });

    it('should handle cross-page navigation', () => {
      const originalHref = mockLocation.href;
      
      handleNavigationClick('/web-design', 'homepage');
      
      expect(mockLocation.href).toBe('/web-design');
      
      // Restore original href
      mockLocation.href = originalHref;
    });

    it('should handle cross-page anchor navigation', () => {
      mockLocation.pathname = '/web-design';
      const originalHref = mockLocation.href;
      
      handleNavigationClick('/#work-section', 'web-design');
      
      expect(mockLocation.href).toBe('/#work-section');
      
      // Restore original href
      mockLocation.href = originalHref;
    });
  });

  describe('validateNavigationLink', () => {
    it('should validate anchor links with existing elements', () => {
      document.getElementById = vi.fn().mockReturnValue(document.createElement('div'));
      
      const isValid = validateNavigationLink('#work-section', 'homepage');
      
      expect(isValid).toBe(true);
      expect(document.getElementById).toHaveBeenCalledWith('work-section');
    });

    it('should invalidate anchor links without existing elements', () => {
      document.getElementById = vi.fn().mockReturnValue(null);
      
      const isValid = validateNavigationLink('#non-existent', 'homepage');
      
      expect(isValid).toBe(false);
    });

    it('should validate page links', () => {
      const isValid = validateNavigationLink('/web-design', 'homepage');
      
      expect(isValid).toBe(true);
    });

    it('should validate external links', () => {
      const isValid = validateNavigationLink('https://example.com', 'homepage');
      
      expect(isValid).toBe(true);
    });
  });

  describe('shouldShowStickyNav', () => {
    it('should show sticky nav on homepage only after scrolling past hero', () => {
      expect(shouldShowStickyNav('homepage', false)).toBe(false);
      expect(shouldShowStickyNav('homepage', true)).toBe(true);
    });

    it('should always show sticky nav on web-design page', () => {
      expect(shouldShowStickyNav('web-design', false)).toBe(true);
      expect(shouldShowStickyNav('web-design', true)).toBe(true);
    });

    it('should always show sticky nav on town pages', () => {
      expect(shouldShowStickyNav('town', false)).toBe(true);
      expect(shouldShowStickyNav('town', true)).toBe(true);
    });

    it('should handle scroll direction parameter', () => {
      expect(shouldShowStickyNav('homepage', true, 'down')).toBe(true);
      expect(shouldShowStickyNav('homepage', true, 'up')).toBe(true);
      expect(shouldShowStickyNav('web-design', false, 'down')).toBe(true);
    });

    it('should meet requirement 2.1: Show after hero scroll on homepage', () => {
      expect(shouldShowStickyNav('homepage', false)).toBe(false);
      expect(shouldShowStickyNav('homepage', true)).toBe(true);
    });

    it('should meet requirement 4.1, 4.2: Immediate visibility on sub-pages', () => {
      expect(shouldShowStickyNav('web-design', false)).toBe(true);
      expect(shouldShowStickyNav('town', false)).toBe(true);
    });

    it('should meet requirement 4.3: Proper page-type aware behavior', () => {
      const testCases = [
        { pageType: 'homepage' as const, scrolled: false, expected: false },
        { pageType: 'homepage' as const, scrolled: true, expected: true },
        { pageType: 'web-design' as const, scrolled: false, expected: true },
        { pageType: 'web-design' as const, scrolled: true, expected: true },
        { pageType: 'town' as const, scrolled: false, expected: true },
        { pageType: 'town' as const, scrolled: true, expected: true }
      ];
      
      testCases.forEach(({ pageType, scrolled, expected }) => {
        expect(shouldShowStickyNav(pageType, scrolled)).toBe(expected);
      });
    });
  });

  describe('shouldShowStickyNavEnhanced', () => {
    it('should return enhanced visibility logic for homepage', () => {
      expect(shouldShowStickyNavEnhanced('homepage', false, 'none', 0)).toBe(false);
      expect(shouldShowStickyNavEnhanced('homepage', true, 'down', 300)).toBe(true);
      expect(shouldShowStickyNavEnhanced('homepage', true, 'up', 300)).toBe(true);
    });

    it('should always return true for sub-pages', () => {
      expect(shouldShowStickyNavEnhanced('web-design', false, 'down', 0)).toBe(true);
      expect(shouldShowStickyNavEnhanced('town', false, 'up', 100)).toBe(true);
    });

    it('should handle aggressive scrolling behavior', () => {
      // Test that aggressive scrolling down still shows nav (current implementation)
      expect(shouldShowStickyNavEnhanced('homepage', true, 'down', 500)).toBe(true);
    });

    it('should provide smooth UX with scroll direction awareness', () => {
      // Test various scroll scenarios
      expect(shouldShowStickyNavEnhanced('homepage', true, 'up', 100)).toBe(true);
      expect(shouldShowStickyNavEnhanced('homepage', true, 'down', 50)).toBe(true);
      expect(shouldShowStickyNavEnhanced('homepage', false, 'down', 0)).toBe(false);
    });
  });

  describe('getContextualMessage', () => {
    it('should return appropriate message for web-design page', () => {
      const message = getContextualMessage('web-design');
      
      expect(message).toBe('Navigate to main sections or select a location');
    });

    it('should return appropriate message for town page', () => {
      const message = getContextualMessage('town', 'dorchester');
      
      expect(message).toBe('Navigate from Dorchester');
    });

    it('should return undefined for homepage', () => {
      const message = getContextualMessage('homepage');
      
      expect(message).toBeUndefined();
    });
  });

  describe('markActiveNavigationItem', () => {
    it('should mark homepage navigation item as active', () => {
      const items = [
        { id: 'home', name: 'HOME', href: '/', type: 'page' as const },
        { id: 'work', name: 'WORK', href: '#work-section', type: 'anchor' as const }
      ];
      
      const markedItems = markActiveNavigationItem(items, 'homepage', undefined, '/');
      
      expect(markedItems.find(item => item.id === 'home')?.isActive).toBe(true);
      expect(markedItems.find(item => item.id === 'work')?.isActive).toBe(false);
    });

    it('should mark web-design navigation item as active', () => {
      const items = [
        { id: 'home', name: 'HOME', href: '/', type: 'page' as const },
        { id: 'services', name: 'SERVICES', href: '/web-design', type: 'page' as const }
      ];
      
      const markedItems = markActiveNavigationItem(items, 'web-design', undefined, '/web-design');
      
      expect(markedItems.find(item => item.id === 'home')?.isActive).toBe(false);
      expect(markedItems.find(item => item.id === 'services')?.isActive).toBe(true);
    });

    it('should mark anchor navigation item as active based on current section', () => {
      const items = [
        { id: 'work', name: 'WORK', href: '#work-section', type: 'anchor' as const },
        { id: 'about', name: 'ABOUT', href: '#meet-our-team', type: 'anchor' as const }
      ];
      
      const markedItems = markActiveNavigationItem(items, 'homepage', 'work-section', '/');
      
      expect(markedItems.find(item => item.id === 'work')?.isActive).toBe(true);
      expect(markedItems.find(item => item.id === 'about')?.isActive).toBe(false);
    });

    it('should mark town page navigation item as active', () => {
      const items = [
        { id: 'dorchester', name: 'DORCHESTER', href: '/web-design/dorchester', type: 'page' as const },
        { id: 'weymouth', name: 'WEYMOUTH', href: '/web-design/weymouth', type: 'page' as const }
      ];
      
      const markedItems = markActiveNavigationItem(items, 'town', undefined, '/web-design/dorchester');
      
      expect(markedItems.find(item => item.id === 'dorchester')?.isActive).toBe(true);
      expect(markedItems.find(item => item.id === 'weymouth')?.isActive).toBe(false);
    });
  });

  describe('detectCurrentSection', () => {
    beforeEach(() => {
      // Mock document.getElementById
      const mockElements = {
        'work-section': { getBoundingClientRect: () => ({ top: 100, height: 500 }) },
        'meet-our-team': { getBoundingClientRect: () => ({ top: 700, height: 400 }) },
        'footer-background': { getBoundingClientRect: () => ({ top: 1200, height: 300 }) }
      };
      
      document.getElementById = vi.fn((id) => mockElements[id as keyof typeof mockElements] || null);
      
      // Mock window scroll properties
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
    });

    it('should detect current section based on viewport center', () => {
      // Set scroll position so viewport center is at 400px (scrollY: 0 + innerHeight: 800 / 2)
      // This should make work-section (top: 100, center: 350) the closest
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      
      const currentSection = detectCurrentSection();
      
      expect(currentSection).toBe('work-section');
    });

    it('should return undefined when no sections are found', () => {
      document.getElementById = vi.fn().mockReturnValue(null);
      
      const currentSection = detectCurrentSection();
      
      expect(currentSection).toBeUndefined();
    });
  });

  describe('generateContextualSubNavigation', () => {
    it('should return empty array for homepage', () => {
      const subNav = generateContextualSubNavigation('homepage');
      
      expect(subNav).toEqual([]);
    });

    it('should return town navigation for web-design page', () => {
      const subNav = generateContextualSubNavigation('web-design');
      
      expect(subNav).toEqual(NAVIGATION_CONFIG.webDesign.townNavigation);
    });

    it('should return enhanced town navigation when showAllTowns is true', () => {
      const subNav = generateContextualSubNavigation('web-design', undefined, true);
      
      expect(subNav[0].name).toContain('WEB DESIGN');
    });

    it('should return other towns for town page', () => {
      const subNav = generateContextualSubNavigation('town', 'dorchester');
      
      expect(subNav).not.toContainEqual(
        expect.objectContaining({ href: '/web-design/dorchester' })
      );
      expect(subNav[0].name).toContain('WEB DESIGN');
    });
  });

  describe('getAvailableTowns', () => {
    it('should return all available towns', () => {
      const towns = getAvailableTowns();
      
      expect(towns).toEqual(NAVIGATION_CONFIG.webDesign.townNavigation);
    });
  });

  describe('isValidTownSlug', () => {
    it('should return true for valid town slug', () => {
      expect(isValidTownSlug('dorchester')).toBe(true);
      expect(isValidTownSlug('weymouth')).toBe(true);
    });

    it('should return false for invalid town slug', () => {
      expect(isValidTownSlug('invalid-town')).toBe(false);
    });
  });

  describe('getTownDisplayName', () => {
    it('should return correct display name for valid town', () => {
      expect(getTownDisplayName('dorchester')).toBe('DORCHESTER');
    });

    it('should return formatted slug for invalid town', () => {
      expect(getTownDisplayName('new-york')).toBe('New York');
    });
  });

  describe('generateBreadcrumbNavigation', () => {
    it('should return empty array for homepage', () => {
      const breadcrumbs = generateBreadcrumbNavigation('homepage');
      
      expect(breadcrumbs).toEqual([]);
    });

    it('should return correct breadcrumbs for web-design page', () => {
      const breadcrumbs = generateBreadcrumbNavigation('web-design');
      
      expect(breadcrumbs).toHaveLength(2);
      expect(breadcrumbs[0].name).toBe('Home');
      expect(breadcrumbs[1].name).toBe('Web Design');
      expect(breadcrumbs[1].isActive).toBe(true);
    });

    it('should return correct breadcrumbs for town page', () => {
      const breadcrumbs = generateBreadcrumbNavigation('town', 'dorchester');
      
      expect(breadcrumbs).toHaveLength(3);
      expect(breadcrumbs[0].name).toBe('Home');
      expect(breadcrumbs[1].name).toBe('Web Design');
      expect(breadcrumbs[2].name).toBe('DORCHESTER');
      expect(breadcrumbs[2].isActive).toBe(true);
    });
  });

  describe('NAVIGATION_CONFIG', () => {
    it('should have correct structure for homepage', () => {
      expect(NAVIGATION_CONFIG.homepage).toHaveProperty('heroNavigation');
      expect(NAVIGATION_CONFIG.homepage).toHaveProperty('stickyNavigation');
      expect(NAVIGATION_CONFIG.homepage.showStickyAfterScroll).toBe(true);
    });

    it('should have correct structure for web-design', () => {
      expect(NAVIGATION_CONFIG.webDesign).toHaveProperty('mainNavigation');
      expect(NAVIGATION_CONFIG.webDesign).toHaveProperty('townNavigation');
      expect(NAVIGATION_CONFIG.webDesign.showStickyImmediately).toBe(true);
    });

    it('should have correct structure for town pages', () => {
      expect(NAVIGATION_CONFIG.townPages).toHaveProperty('mainNavigation');
      expect(NAVIGATION_CONFIG.townPages).toHaveProperty('otherTowns');
      expect(NAVIGATION_CONFIG.townPages.showStickyImmediately).toBe(true);
    });

    it('should have correct navigation items with required properties', () => {
      const allItems = [
        ...NAVIGATION_CONFIG.homepage.heroNavigation,
        ...NAVIGATION_CONFIG.webDesign.mainNavigation,
        ...NAVIGATION_CONFIG.townPages.mainNavigation
      ];

      allItems.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('href');
        expect(item).toHaveProperty('type');
        expect(['anchor', 'page', 'external']).toContain(item.type);
      });
    });
  });
});
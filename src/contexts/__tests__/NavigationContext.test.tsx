// src/contexts/__tests__/NavigationContext.test.tsx

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, renderHook, act, screen } from '@testing-library/react';
import { 
  NavigationProvider, 
  useNavigation, 
  usePageContext, 
  useNavigationItems,
  useMobileMenu 
} from '../NavigationContext';
import { PageType } from '@/types/navigation';

// Mock the scroll detection hook
vi.mock('@/lib/hooks/useScrollDetection', () => ({
  useScrollDetection: vi.fn(() => ({
    isScrolledPastHero: false,
    scrollY: 0,
    heroHeight: 0
  }))
}));

// Mock navigation utils
vi.mock('@/lib/utils/navigationUtils', () => ({
  detectPageContext: vi.fn(() => ({
    pageType: 'homepage',
    isScrolledPastHero: false,
    viewportSize: 'desktop'
  })),
  generateNavigationLinks: vi.fn(() => ({
    navigationItems: [
      { id: 'work', name: 'WORK', href: '#work-section', type: 'anchor' },
      { id: 'about', name: 'ABOUT', href: '#meet-our-team', type: 'anchor' }
    ],
    subNavigationItems: []
  })),
  shouldShowStickyNav: vi.fn(() => false),
  markActiveNavigationItem: vi.fn((items) => items),
  detectCurrentSection: vi.fn(() => undefined)
}));

const TestComponent = () => {
  const navigation = useNavigation();
  return (
    <div>
      <div data-testid="current-page">{navigation.currentPage}</div>
      <div data-testid="show-sticky">{navigation.showStickyNav.toString()}</div>
      <div data-testid="mobile-menu">{navigation.isMobileMenuOpen.toString()}</div>
      <button onClick={navigation.toggleMobileMenu} data-testid="toggle-menu">
        Toggle Menu
      </button>
      <button onClick={navigation.closeMobileMenu} data-testid="close-menu">
        Close Menu
      </button>
    </div>
  );
};

const renderWithProvider = (currentPage: PageType = 'homepage', townSlug?: string) => {
  return render(
    <NavigationProvider currentPage={currentPage} townSlug={townSlug}>
      <TestComponent />
    </NavigationProvider>
  );
};

describe('NavigationContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Reset window properties
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
  });

  describe('NavigationProvider', () => {
    it('should provide navigation context with default values', () => {
      renderWithProvider();
      
      expect(screen.getByTestId('current-page')).toHaveTextContent('homepage');
      expect(screen.getByTestId('show-sticky')).toHaveTextContent('false');
      expect(screen.getByTestId('mobile-menu')).toHaveTextContent('false');
    });

    it('should provide correct context for web-design page', () => {
      renderWithProvider('web-design');
      
      expect(screen.getByTestId('current-page')).toHaveTextContent('web-design');
    });

    it('should provide correct context for town page', () => {
      renderWithProvider('town', 'cape-town');
      
      expect(screen.getByTestId('current-page')).toHaveTextContent('town');
    });

    it.skip('should handle mobile menu toggle', () => {
      renderWithProvider();
      
      const toggleButton = screen.getByTestId('toggle-menu');
      
      expect(screen.getByTestId('mobile-menu')).toHaveTextContent('false');
      
      // First toggle - should open menu
      toggleButton.click();
      expect(screen.getByTestId('mobile-menu')).toHaveTextContent('true');
      
      // Second toggle - should close menu
      toggleButton.click();
      expect(screen.getByTestId('mobile-menu')).toHaveTextContent('false');
    });

    it.skip('should handle mobile menu close', () => {
      renderWithProvider();
      
      const toggleButton = screen.getByTestId('toggle-menu');
      const closeButton = screen.getByTestId('close-menu');
      
      // Open menu
      toggleButton.click();
      expect(screen.getByTestId('mobile-menu')).toHaveTextContent('true');
      
      // Close menu
      closeButton.click();
      expect(screen.getByTestId('mobile-menu')).toHaveTextContent('false');
    });

    it('should close mobile menu on viewport size change to desktop', () => {
      // Start with mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 600, writable: true });
      
      renderWithProvider();
      
      const toggleButton = screen.getByTestId('toggle-menu');
      
      // Open mobile menu
      act(() => {
        toggleButton.click();
      });
      
      expect(screen.getByTestId('mobile-menu')).toHaveTextContent('true');
      
      // Simulate resize to desktop
      act(() => {
        Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
        window.dispatchEvent(new Event('resize'));
      });
      
      expect(screen.getByTestId('mobile-menu')).toHaveTextContent('false');
    });
  });

  describe('useNavigation hook', () => {
    it('should throw error when used outside provider', () => {
      const TestComponentWithoutProvider = () => {
        useNavigation();
        return null;
      };

      expect(() => render(<TestComponentWithoutProvider />)).toThrow(
        'useNavigation must be used within a NavigationProvider'
      );
    });

    it('should return navigation context when used within provider', () => {
      const { result } = renderHook(() => useNavigation(), {
        wrapper: ({ children }) => (
          <NavigationProvider currentPage="homepage">
            {children}
          </NavigationProvider>
        )
      });

      expect(result.current).toHaveProperty('currentPage');
      expect(result.current).toHaveProperty('navigationItems');
      expect(result.current).toHaveProperty('toggleMobileMenu');
      expect(result.current).toHaveProperty('closeMobileMenu');
    });
  });

  describe('usePageContext hook', () => {
    it('should return page context', () => {
      const { result } = renderHook(() => usePageContext(), {
        wrapper: ({ children }) => (
          <NavigationProvider currentPage="web-design" townSlug="cape-town">
            {children}
          </NavigationProvider>
        )
      });

      expect(result.current).toHaveProperty('pageType');
      expect(result.current).toHaveProperty('viewportSize');
      expect(result.current).toHaveProperty('isScrolledPastHero');
    });
  });

  describe('useNavigationItems hook', () => {
    it('should return navigation items', () => {
      const { result } = renderHook(() => useNavigationItems(), {
        wrapper: ({ children }) => (
          <NavigationProvider currentPage="homepage">
            {children}
          </NavigationProvider>
        )
      });

      expect(result.current).toHaveProperty('navigationItems');
      expect(result.current).toHaveProperty('subNavigationItems');
      expect(Array.isArray(result.current.navigationItems)).toBe(true);
      expect(Array.isArray(result.current.subNavigationItems)).toBe(true);
    });
  });

  describe('useMobileMenu hook', () => {
    it('should return mobile menu state and controls', () => {
      const { result } = renderHook(() => useMobileMenu(), {
        wrapper: ({ children }) => (
          <NavigationProvider currentPage="homepage">
            {children}
          </NavigationProvider>
        )
      });

      expect(result.current).toHaveProperty('isMobileMenuOpen');
      expect(result.current).toHaveProperty('toggleMobileMenu');
      expect(result.current).toHaveProperty('closeMobileMenu');
      expect(typeof result.current.toggleMobileMenu).toBe('function');
      expect(typeof result.current.closeMobileMenu).toBe('function');
    });

    it.skip('should handle mobile menu state changes', () => {
      const { result } = renderHook(() => useMobileMenu(), {
        wrapper: ({ children }) => (
          <NavigationProvider currentPage="homepage">
            {children}
          </NavigationProvider>
        )
      });

      expect(result.current.isMobileMenuOpen).toBe(false);

      act(() => {
        result.current.toggleMobileMenu();
      });

      expect(result.current.isMobileMenuOpen).toBe(true);

      act(() => {
        result.current.closeMobileMenu();
      });

      expect(result.current.isMobileMenuOpen).toBe(false);
    });
  });
});
// src/lib/utils/__tests__/scrollUtils.test.ts - Tests for scroll utilities

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { 
  scrollToElement, 
  handleNavigationClick, 
  getStickyNavHeight, 
  isElementVisible,
  getScrollPositionForElement 
} from '../scrollUtils';

// Mock window.scrollTo
const mockScrollTo = vi.fn();
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

// Mock console.warn
const mockConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

describe('scrollUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Reset DOM
    document.body.innerHTML = '';
    
    // Mock document.getElementById
    document.getElementById = vi.fn();
    document.querySelector = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('scrollToElement', () => {
    it('should scroll to element with correct offset', () => {
      const mockElement = {
        offsetTop: 1000
      };
      
      document.getElementById = vi.fn().mockReturnValue(mockElement);
      
      scrollToElement('test-element');
      
      expect(document.getElementById).toHaveBeenCalledWith('test-element');
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 920, // 1000 - 60 (sticky nav) - 20 (additional offset)
        behavior: 'smooth'
      });
    });

    it('should handle custom additional offset', () => {
      const mockElement = {
        offsetTop: 1000
      };
      
      document.getElementById = vi.fn().mockReturnValue(mockElement);
      
      scrollToElement('test-element', 50);
      
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 890, // 1000 - 60 (sticky nav) - 50 (custom offset)
        behavior: 'smooth'
      });
    });

    it('should not scroll to negative position', () => {
      const mockElement = {
        offsetTop: 50 // Less than total offset
      };
      
      document.getElementById = vi.fn().mockReturnValue(mockElement);
      
      scrollToElement('test-element');
      
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0, // Math.max(0, 50 - 80)
        behavior: 'smooth'
      });
    });

    it('should not scroll when element not found', () => {
      document.getElementById = vi.fn().mockReturnValue(null);
      
      scrollToElement('non-existent');
      
      expect(mockScrollTo).not.toHaveBeenCalled();
    });
  });

  describe('handleNavigationClick', () => {
    it('should handle anchor links on same page', () => {
      const mockEvent = {
        preventDefault: vi.fn()
      } as any;
      
      const mockElement = {
        offsetTop: 1000
      };
      
      document.getElementById = vi.fn().mockReturnValue(mockElement);
      
      handleNavigationClick(mockEvent, '#test-section', 'homepage');
      
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 920,
        behavior: 'smooth'
      });
    });

    it('should handle cross-page navigation', () => {
      const mockEvent = {
        preventDefault: vi.fn()
      } as any;
      
      // Mock window.location
      const mockLocation = { href: '' };
      Object.defineProperty(window, 'location', {
        value: mockLocation,
        writable: true
      });
      
      handleNavigationClick(mockEvent, '#test-section', 'web-design');
      
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockLocation.href).toBe('/#test-section');
    });

    it('should not handle non-anchor links', () => {
      const mockEvent = {
        preventDefault: vi.fn()
      } as any;
      
      handleNavigationClick(mockEvent, '/some-page', 'homepage');
      
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('getStickyNavHeight', () => {
    it('should return actual sticky nav height when element exists', () => {
      const mockStickyNav = {
        offsetHeight: 80
      };
      
      document.querySelector = vi.fn().mockReturnValue(mockStickyNav);
      
      const height = getStickyNavHeight();
      
      expect(document.querySelector).toHaveBeenCalledWith('[data-sticky-nav]');
      expect(height).toBe(80);
    });

    it('should return fallback height when element not found', () => {
      document.querySelector = vi.fn().mockReturnValue(null);
      
      const height = getStickyNavHeight();
      
      expect(height).toBe(60);
    });
  });

  describe('isElementVisible', () => {
    it('should return true when element is visible below sticky nav', () => {
      const mockElement = {
        getBoundingClientRect: () => ({
          top: 100,
          bottom: 200
        })
      };
      
      document.getElementById = vi.fn().mockReturnValue(mockElement);
      document.querySelector = vi.fn().mockReturnValue({ offsetHeight: 60 });
      
      const isVisible = isElementVisible('test-element');
      
      expect(isVisible).toBe(true);
    });

    it('should return false when element is hidden behind sticky nav', () => {
      const mockElement = {
        getBoundingClientRect: () => ({
          top: 30, // Below sticky nav height of 60
          bottom: 50
        })
      };
      
      document.getElementById = vi.fn().mockReturnValue(mockElement);
      document.querySelector = vi.fn().mockReturnValue({ offsetHeight: 60 });
      
      const isVisible = isElementVisible('test-element');
      
      expect(isVisible).toBe(false);
    });

    it('should return false when element not found', () => {
      document.getElementById = vi.fn().mockReturnValue(null);
      
      const isVisible = isElementVisible('non-existent');
      
      expect(isVisible).toBe(false);
    });
  });

  describe('getScrollPositionForElement', () => {
    it('should calculate correct scroll position', () => {
      const mockElement = {
        offsetTop: 1000
      };
      
      document.getElementById = vi.fn().mockReturnValue(mockElement);
      document.querySelector = vi.fn().mockReturnValue({ offsetHeight: 60 });
      
      const position = getScrollPositionForElement('test-element');
      
      expect(position).toBe(920); // 1000 - 60 - 20
    });

    it('should return 0 when element not found', () => {
      document.getElementById = vi.fn().mockReturnValue(null);
      
      const position = getScrollPositionForElement('non-existent');
      
      expect(position).toBe(0);
    });

    it('should not return negative position', () => {
      const mockElement = {
        offsetTop: 50
      };
      
      document.getElementById = vi.fn().mockReturnValue(mockElement);
      document.querySelector = vi.fn().mockReturnValue({ offsetHeight: 60 });
      
      const position = getScrollPositionForElement('test-element');
      
      expect(position).toBe(0); // Math.max(0, 50 - 80)
    });
  });
});
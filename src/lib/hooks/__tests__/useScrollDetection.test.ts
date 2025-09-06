// src/lib/hooks/__tests__/useScrollDetection.test.ts - Enhanced tests for scroll detection hook

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollDetection } from '../useScrollDetection';

// Mock requestAnimationFrame and cancelAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => {
  cb();
  return 1;
});
global.cancelAnimationFrame = vi.fn();

describe('useScrollDetection', () => {
  beforeEach(() => {
    // Reset window properties
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
    
    // Mock document.getElementById
    document.getElementById = vi.fn();
    
    // Clear all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up event listeners
    vi.restoreAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useScrollDetection());
    
    expect(result.current.isScrolledPastHero).toBe(false);
    expect(result.current.scrollY).toBe(0);
    expect(result.current.heroHeight).toBe(0);
    expect(result.current.heroBottom).toBe(0);
    expect(result.current.scrollDirection).toBe('none');
    expect(result.current.scrollProgress).toBe(0);
  });

  it('should detect scroll past hero when hero element exists', async () => {
    // Mock hero element
    const mockHeroElement = {
      offsetTop: 0,
      offsetHeight: 800
    };
    
    document.getElementById = vi.fn().mockReturnValue(mockHeroElement);
    
    const { result } = renderHook(() => useScrollDetection({
      heroElementId: 'hero-section'
    }));
    
    // Simulate scroll past hero
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 750, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    
    // Wait for the effect to run
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });
    
    expect(result.current.isScrolledPastHero).toBe(true);
    expect(result.current.scrollY).toBe(750);
    expect(result.current.heroHeight).toBe(800);
  });

  it('should use fallback threshold when hero element does not exist', async () => {
    document.getElementById = vi.fn().mockReturnValue(null);
    
    const { result } = renderHook(() => useScrollDetection({
      fallbackThreshold: 500
    }));
    
    // Simulate scroll past fallback threshold
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });
    
    expect(result.current.isScrolledPastHero).toBe(true);
    expect(result.current.scrollY).toBe(600);
  });

  it('should not trigger when scroll is below threshold', async () => {
    const mockHeroElement = {
      offsetTop: 0,
      offsetHeight: 800
    };
    
    document.getElementById = vi.fn().mockReturnValue(mockHeroElement);
    
    const { result } = renderHook(() => useScrollDetection());
    
    // Simulate scroll below threshold
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });
    
    expect(result.current.isScrolledPastHero).toBe(false);
    expect(result.current.scrollY).toBe(500);
  });

  it('should handle resize events', async () => {
    const mockHeroElement = {
      offsetTop: 0,
      offsetHeight: 600
    };
    
    document.getElementById = vi.fn().mockReturnValue(mockHeroElement);
    
    const { result } = renderHook(() => useScrollDetection());
    
    // Initial scroll position
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });
    
    expect(result.current.isScrolledPastHero).toBe(false);
    
    // Simulate hero height change due to resize
    mockHeroElement.offsetHeight = 300;
    
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 120)); // Wait for resize delay
    });
    
    expect(result.current.isScrolledPastHero).toBe(true);
    expect(result.current.heroHeight).toBe(300);
  });

  it('should handle errors gracefully', async () => {
    // Mock getElementById to throw an error
    document.getElementById = vi.fn().mockImplementation(() => {
      throw new Error('Test error');
    });
    
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    const { result } = renderHook(() => useScrollDetection({
      fallbackThreshold: 400
    }));
    
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });
    
    expect(consoleSpy).toHaveBeenCalledWith('Scroll detection error:', expect.any(Error));
    expect(result.current.isScrolledPastHero).toBe(true); // Should use fallback
    
    consoleSpy.mockRestore();
  });

  it('should use custom hero element ID', async () => {
    const mockHeroElement = {
      offsetTop: 100,
      offsetHeight: 500
    };
    
    document.getElementById = vi.fn().mockReturnValue(mockHeroElement);
    
    renderHook(() => useScrollDetection({
      heroElementId: 'custom-hero'
    }));
    
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });
    
    expect(document.getElementById).toHaveBeenCalledWith('custom-hero');
  });

  it('should clean up event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    
    const { unmount } = renderHook(() => useScrollDetection());
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    
    removeEventListenerSpy.mockRestore();
  });

  it('should throttle scroll events', async () => {
    const mockHeroElement = {
      offsetTop: 0,
      offsetHeight: 800
    };
    
    document.getElementById = vi.fn().mockReturnValue(mockHeroElement);
    
    const { result } = renderHook(() => useScrollDetection());
    
    // Trigger multiple scroll events rapidly
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('scroll'));
    });
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });
    
    // Should only process once due to throttling
    expect(result.current.scrollY).toBe(100);
  });

  describe('Enhanced scroll direction detection', () => {
    it('should detect scroll direction correctly', async () => {
      const mockHeroElement = {
        offsetTop: 0,
        offsetHeight: 800,
        getBoundingClientRect: () => ({
          top: 0,
          height: 800,
          bottom: 800,
          left: 0,
          right: 0,
          width: 0,
        }),
      };
      
      document.getElementById = vi.fn().mockReturnValue(mockHeroElement);
      
      const { result } = renderHook(() => useScrollDetection());
      
      // Initial state
      expect(result.current.scrollDirection).toBe('none');
      
      // Scroll down
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
        window.dispatchEvent(new Event('scroll'));
      });
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 20));
      });
      
      expect(result.current.scrollDirection).toBe('down');
      
      // Scroll up
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
        window.dispatchEvent(new Event('scroll'));
      });
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 20));
      });
      
      expect(result.current.scrollDirection).toBe('up');
    });

    it('should calculate scroll progress correctly', async () => {
      const mockHeroElement = {
        offsetTop: 0,
        offsetHeight: 800,
        getBoundingClientRect: () => ({
          top: 0,
          height: 800,
          bottom: 800,
          left: 0,
          right: 0,
          width: 0,
        }),
      };
      
      document.getElementById = vi.fn().mockReturnValue(mockHeroElement);
      
      const { result } = renderHook(() => useScrollDetection());
      
      // Scroll to middle of hero
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
        window.dispatchEvent(new Event('scroll'));
      });
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 20));
      });
      
      expect(result.current.scrollProgress).toBe(0.5);
      expect(result.current.heroBottom).toBe(800);
    });
  });

  describe('Page type awareness', () => {
    it('should always return true for web-design pages', () => {
      const { result } = renderHook(() => 
        useScrollDetection({ 
          currentPageType: 'web-design',
          enableOnPageTypes: ['homepage', 'web-design', 'town']
        })
      );
      
      expect(result.current.isScrolledPastHero).toBe(true);
    });

    it('should always return true for town pages', () => {
      const { result } = renderHook(() => 
        useScrollDetection({ 
          currentPageType: 'town',
          enableOnPageTypes: ['homepage', 'web-design', 'town']
        })
      );
      
      expect(result.current.isScrolledPastHero).toBe(true);
    });

    it('should use scroll detection for homepage', async () => {
      const mockHeroElement = {
        offsetTop: 0,
        offsetHeight: 800,
        getBoundingClientRect: () => ({
          top: 0,
          height: 800,
          bottom: 800,
          left: 0,
          right: 0,
          width: 0,
        }),
      };
      
      document.getElementById = vi.fn().mockReturnValue(mockHeroElement);
      
      const { result } = renderHook(() => 
        useScrollDetection({ 
          currentPageType: 'homepage',
          enableOnPageTypes: ['homepage', 'web-design', 'town']
        })
      );
      
      expect(result.current.isScrolledPastHero).toBe(false);
      
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 750, writable: true });
        window.dispatchEvent(new Event('scroll'));
      });
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 20));
      });
      
      expect(result.current.isScrolledPastHero).toBe(true);
    });

    it('should disable scroll detection for non-enabled page types', () => {
      const { result } = renderHook(() => 
        useScrollDetection({ 
          currentPageType: 'homepage',
          enableOnPageTypes: ['web-design'] // Homepage not enabled
        })
      );
      
      expect(result.current.isScrolledPastHero).toBe(false);
    });
  });

  describe('Enhanced fallback strategies', () => {
    it('should try multiple fallback strategies when hero element not found', async () => {
      document.getElementById = vi.fn().mockReturnValue(null);
      
      // Mock querySelector to return a hero element on second try
      const mockFallbackElement = {
        clientHeight: 600,
        getBoundingClientRect: () => ({
          top: 0,
          height: 600,
          bottom: 600,
          left: 0,
          right: 0,
          width: 0,
        }),
      };
      
      document.querySelector = vi.fn()
        .mockReturnValueOnce(null) // First selector fails
        .mockReturnValueOnce(mockFallbackElement); // Second selector succeeds
      
      const { result } = renderHook(() => useScrollDetection());
      
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 550, writable: true });
        window.dispatchEvent(new Event('scroll'));
      });
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 20));
      });
      
      expect(result.current.isScrolledPastHero).toBe(true);
      expect(result.current.heroHeight).toBe(600);
    });

    it('should use viewport height as fallback strategy', async () => {
      document.getElementById = vi.fn().mockReturnValue(null);
      document.querySelector = vi.fn().mockReturnValue(null);
      
      const { result } = renderHook(() => useScrollDetection());
      
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 950, writable: true });
        window.dispatchEvent(new Event('scroll'));
      });
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 20));
      });
      
      expect(result.current.isScrolledPastHero).toBe(true);
      expect(result.current.heroHeight).toBe(768); // viewport height
    });
  });

  describe('Hero section awareness requirements', () => {
    it('should meet requirement 2.1: Show after hero scroll on homepage', async () => {
      const mockHeroElement = {
        offsetTop: 0,
        offsetHeight: 800,
        getBoundingClientRect: () => ({
          top: 0,
          height: 800,
          bottom: 800,
          left: 0,
          right: 0,
          width: 0,
        }),
      };
      
      document.getElementById = vi.fn().mockReturnValue(mockHeroElement);
      
      const { result } = renderHook(() => 
        useScrollDetection({ currentPageType: 'homepage' })
      );
      
      // Before hero scroll
      expect(result.current.isScrolledPastHero).toBe(false);
      
      // After hero scroll (past threshold)
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 750, writable: true });
        window.dispatchEvent(new Event('scroll'));
      });
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 20));
      });
      
      expect(result.current.isScrolledPastHero).toBe(true);
    });

    it('should meet requirement 4.1, 4.2: Immediate visibility on sub-pages', () => {
      // Web-design page
      const { result: webDesignResult } = renderHook(() => 
        useScrollDetection({ currentPageType: 'web-design' })
      );
      
      expect(webDesignResult.current.isScrolledPastHero).toBe(true);
      
      // Town page
      const { result: townResult } = renderHook(() => 
        useScrollDetection({ currentPageType: 'town' })
      );
      
      expect(townResult.current.isScrolledPastHero).toBe(true);
    });

    it('should meet requirement 4.3: Proper page-type aware behavior', () => {
      const testCases = [
        { pageType: 'homepage' as const, expectedImmediate: false },
        { pageType: 'web-design' as const, expectedImmediate: true },
        { pageType: 'town' as const, expectedImmediate: true }
      ];
      
      testCases.forEach(({ pageType, expectedImmediate }) => {
        const { result } = renderHook(() => 
          useScrollDetection({ currentPageType: pageType })
        );
        
        expect(result.current.isScrolledPastHero).toBe(expectedImmediate);
      });
    });

    it('should use custom offset for threshold calculation', async () => {
      const mockHeroElement = {
        offsetTop: 0,
        offsetHeight: 800,
        getBoundingClientRect: () => ({
          top: 0,
          height: 800,
          bottom: 800,
          left: 0,
          right: 0,
          width: 0,
        }),
      };
      
      document.getElementById = vi.fn().mockReturnValue(mockHeroElement);
      
      const { result } = renderHook(() => useScrollDetection({ offset: 200 }));
      
      // Scroll to position that would trigger with 200px offset
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 650, writable: true });
        window.dispatchEvent(new Event('scroll'));
      });
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 20));
      });
      
      expect(result.current.isScrolledPastHero).toBe(true); // 650 > (800 - 200)
    });
  });

  describe('Performance and cleanup', () => {
    it('should handle orientation change events', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      
      renderHook(() => useScrollDetection());
      
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'orientationchange',
        expect.any(Function)
      );
      
      addEventListenerSpy.mockRestore();
    });

    it('should cancel animation frames on unmount', () => {
      const { unmount } = renderHook(() => useScrollDetection());
      
      unmount();
      
      expect(global.cancelAnimationFrame).toHaveBeenCalled();
    });
  });
});
// src/lib/hooks/useScrollDetection.ts - Enhanced scroll detection hook for navigation

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface ScrollDetectionOptions {
  heroElementId?: string;
  fallbackThreshold?: number;
  throttleMs?: number;
  offset?: number;
  enableOnPageTypes?: ('homepage' | 'web-design' | 'town')[];
  currentPageType?: 'homepage' | 'web-design' | 'town';
}

interface ScrollDetectionResult {
  isScrolledPastHero: boolean;
  scrollY: number;
  heroHeight: number;
  heroBottom: number;
  scrollDirection: 'up' | 'down' | 'none';
  scrollProgress: number; // 0-1 representing progress through hero section
}

/**
 * Enhanced hook to detect when user has scrolled past the hero section
 * Used to determine when to show sticky navigation with improved hero awareness
 * 
 * Features:
 * - Accurate hero section detection with multiple fallback strategies
 * - Scroll direction detection for enhanced UX
 * - Progress tracking through hero section
 * - Page-type aware behavior
 * - Performance optimized with RAF throttling
 */
export function useScrollDetection(options: ScrollDetectionOptions = {}): ScrollDetectionResult {
  const {
    heroElementId = 'hero-section',
    fallbackThreshold = 800,
    throttleMs = 16, // ~60fps
    offset = 100, // Show sticky nav 100px before hero ends
    enableOnPageTypes = ['homepage', 'web-design', 'town'],
    currentPageType = 'homepage'
  } = options;

  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [heroHeight, setHeroHeight] = useState(0);
  const [heroBottom, setHeroBottom] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'none'>('none');
  const [scrollProgress, setScrollProgress] = useState(0);

  const lastScrollY = useRef(0);
  const rafId = useRef<number>();

  // Enhanced scroll handler with hero section awareness
  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;

    const currentScrollY = window.scrollY;
    
    // Determine scroll direction
    const direction = currentScrollY > lastScrollY.current ? 'down' : 
                     currentScrollY < lastScrollY.current ? 'up' : 'none';
    
    setScrollY(currentScrollY);
    setScrollDirection(direction);
    lastScrollY.current = currentScrollY;

    try {
      const heroElement = document.getElementById(heroElementId);
      
      if (heroElement) {
        // Try to use getBoundingClientRect for more accurate positioning
        let heroTop = 0;
        let heroElementHeight = 0;
        let heroElementBottom = 0;
        
        try {
          if (heroElement.getBoundingClientRect) {
            const rect = heroElement.getBoundingClientRect();
            heroTop = currentScrollY + rect.top;
            heroElementHeight = rect.height;
            heroElementBottom = heroTop + heroElementHeight;
          } else {
            // Fallback to offset properties
            heroTop = heroElement.offsetTop;
            heroElementHeight = heroElement.offsetHeight;
            heroElementBottom = heroTop + heroElementHeight;
          }
        } catch {
          // Final fallback to offset properties
          heroTop = heroElement.offsetTop || 0;
          heroElementHeight = heroElement.offsetHeight || 0;
          heroElementBottom = heroTop + heroElementHeight;
        }
        
        setHeroHeight(heroElementHeight);
        setHeroBottom(heroElementBottom);

        // Calculate scroll progress through hero section (0-1)
        const progress = heroElementHeight > 0 ? Math.min(Math.max(currentScrollY / heroElementHeight, 0), 1) : 0;
        setScrollProgress(progress);

        // Determine if scrolled past hero with offset
        // Show sticky nav earlier to prevent content from being covered
        const earlyShowOffset = offset + 60; // Show 60px earlier than the original offset
        const threshold = heroElementBottom - earlyShowOffset;
        const shouldShowSticky = currentScrollY > threshold;
        
        setIsScrolledPastHero(shouldShowSticky);
      } else {
        // Enhanced fallback strategies
        const fallbackStrategies = [
          // Strategy 1: Look for common hero selectors
          () => {
            const heroSelectors = [
              '[data-hero]',
              '.hero',
              '.hero-section',
              'section:first-of-type',
              'header + section'
            ];
            
            for (const selector of heroSelectors) {
              const element = document.querySelector(selector);
              if (element) {
                const rect = element.getBoundingClientRect();
                const elementTop = currentScrollY + rect.top;
                const elementHeight = element.clientHeight;
                const elementBottom = elementTop + elementHeight;
                
                setHeroHeight(elementHeight);
                setHeroBottom(elementBottom);
                
                const progress = Math.min(Math.max(currentScrollY / elementHeight, 0), 1);
                setScrollProgress(progress);
                
                return currentScrollY > (elementBottom - offset);
              }
            }
            return null;
          },
          
          // Strategy 2: Use viewport height as hero approximation
          () => {
            const viewportHeight = window.innerHeight;
            setHeroHeight(viewportHeight);
            setHeroBottom(viewportHeight);
            
            const progress = Math.min(Math.max(currentScrollY / viewportHeight, 0), 1);
            setScrollProgress(progress);
            
            return currentScrollY > (viewportHeight - offset);
          },
          
          // Strategy 3: Use custom threshold
          () => {
            setHeroHeight(fallbackThreshold);
            setHeroBottom(fallbackThreshold);
            
            const progress = Math.min(Math.max(currentScrollY / fallbackThreshold, 0), 1);
            setScrollProgress(progress);
            
            return currentScrollY > (fallbackThreshold - offset);
          }
        ];

        // Try fallback strategies in order
        let shouldShowSticky = false;
        for (const strategy of fallbackStrategies) {
          const result = strategy();
          if (result !== null) {
            shouldShowSticky = result;
            break;
          }
        }

        setIsScrolledPastHero(shouldShowSticky);
      }
    } catch (error) {
      console.warn('Scroll detection error:', error);
      
      // Final fallback to simple scroll threshold
      const progress = Math.min(Math.max(currentScrollY / fallbackThreshold, 0), 1);
      setScrollProgress(progress);
      setHeroHeight(fallbackThreshold);
      setHeroBottom(fallbackThreshold);
      setIsScrolledPastHero(currentScrollY > fallbackThreshold);
    }
  }, [heroElementId, fallbackThreshold, offset]);

  // Performance-optimized scroll handler using RAF
  const throttledHandleScroll = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    rafId.current = requestAnimationFrame(() => {
      handleScroll();
    });
  }, [handleScroll]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if scroll detection should be enabled for current page type
    if (!enableOnPageTypes.includes(currentPageType)) {
      // For pages where scroll detection is disabled, set appropriate defaults
      if (currentPageType === 'web-design' || currentPageType === 'town') {
        setIsScrolledPastHero(true); // Always show sticky nav on sub-pages
      } else {
        setIsScrolledPastHero(false);
      }
      return;
    }

    // Initial check
    handleScroll();

    // Add scroll listener with passive option for better performance
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    // Handle resize events that might change hero dimensions
    const handleResize = () => {
      // Use RAF to ensure layout has settled after resize
      requestAnimationFrame(() => {
        setTimeout(handleScroll, 50); // Small delay for layout stability
      });
    };
    
    window.addEventListener('resize', handleResize, { passive: true });

    // Handle orientation change on mobile devices
    const handleOrientationChange = () => {
      setTimeout(handleScroll, 200); // Longer delay for orientation change
    };
    
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [throttledHandleScroll, handleScroll, enableOnPageTypes, currentPageType]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return {
    isScrolledPastHero,
    scrollY,
    heroHeight,
    heroBottom,
    scrollDirection,
    scrollProgress
  };
}
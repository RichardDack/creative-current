// src/contexts/NavigationContext.tsx - Navigation context provider

'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  NavigationContextType, 
  NavigationProviderProps, 
  PageContext, 
  NavigationItem
} from '@/types/navigation';
import { useScrollDetection } from '@/lib/hooks/useScrollDetection';
import { 
  generateNavigationLinks, 
  shouldShowStickyNav,
  markActiveNavigationItem,
  detectCurrentSection
} from '@/lib/utils/navigationUtils';

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

/**
 * Navigation Provider Component
 * Manages navigation state and context across the application
 */
export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
  currentPage,
  townSlug
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pageContext, setPageContext] = useState<PageContext>(() => ({
    pageType: currentPage,
    townSlug,
    isScrolledPastHero: false,
    viewportSize: 'desktop'
  }));

  // Use enhanced scroll detection hook with page-type awareness
  const { 
    isScrolledPastHero
  } = useScrollDetection({
    heroElementId: 'hero-section',
    fallbackThreshold: 800,
    throttleMs: 16,
    offset: 100,
    enableOnPageTypes: ['homepage'], // Only enable scroll detection on homepage
    currentPageType: currentPage
  });

  // Update page context when scroll position changes
  useEffect(() => {
    setPageContext(prev => ({
      ...prev,
      isScrolledPastHero,
      pageType: currentPage,
      townSlug
    }));
  }, [isScrolledPastHero, currentPage, townSlug]);

  // Update viewport size on resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateViewportSize = () => {
      const viewportSize = 
        window.innerWidth < 768 ? 'mobile' :
        window.innerWidth < 1024 ? 'tablet' : 'desktop';
      
      setPageContext(prev => ({
        ...prev,
        viewportSize
      }));

      // Auto-close mobile menu when transitioning to desktop
      if (viewportSize !== 'mobile' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    updateViewportSize();
    window.addEventListener('resize', updateViewportSize, { passive: true });

    return () => window.removeEventListener('resize', updateViewportSize);
  }, [isMobileMenuOpen]);

  // Generate navigation items based on current context
  const { navigationItems: baseNavigationItems, subNavigationItems: baseSubNavigationItems } = generateNavigationLinks(
    pageContext.pageType, 
    pageContext.townSlug
  );

  // Detect current section for active state (in a real implementation, this could use Intersection Observer)
  const [currentSection, setCurrentSection] = useState<string | undefined>();

  // Update current section detection
  useEffect(() => {
    if (typeof window === 'undefined' || pageContext.pageType !== 'homepage') return;

    const detectSection = () => {
      const section = detectCurrentSection();
      setCurrentSection(section);
    };

    // Initial detection
    detectSection();

    // Listen for scroll events to update current section
    const handleScroll = () => {
      detectSection();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageContext.pageType]);

  // Mark active navigation items with current section context
  const navigationItems = markActiveNavigationItem(
    baseNavigationItems, 
    pageContext.pageType, 
    currentSection,
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  // Mark active sub-navigation items
  const subNavigationItems = markActiveNavigationItem(
    baseSubNavigationItems,
    pageContext.pageType,
    currentSection,
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  // Determine if sticky navigation should be shown
  const showStickyNav = shouldShowStickyNav(pageContext.pageType, pageContext.isScrolledPastHero);

  // Mobile menu handlers
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Close mobile menu on route changes (would be handled by Next.js router in real implementation)
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
    };

    // In a real implementation, this would listen to Next.js router events
    // For now, we'll close on any navigation
    window.addEventListener('beforeunload', handleRouteChange);

    return () => window.removeEventListener('beforeunload', handleRouteChange);
  }, []);

  const contextValue: NavigationContextType = {
    currentPage: pageContext.pageType,
    townSlug: pageContext.townSlug,
    isScrolledPastHero: pageContext.isScrolledPastHero,
    showStickyNav,
    navigationItems,
    subNavigationItems,
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    pageContext
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

/**
 * Hook to use navigation context
 * Throws error if used outside of NavigationProvider
 */
export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  
  return context;
};

/**
 * Hook to get current page context
 */
export const usePageContext = (): PageContext => {
  const { pageContext } = useNavigation();
  return pageContext;
};

/**
 * Hook to get navigation items for current context
 */
export const useNavigationItems = (): {
  navigationItems: NavigationItem[];
  subNavigationItems: NavigationItem[];
} => {
  const { navigationItems, subNavigationItems } = useNavigation();
  return { navigationItems, subNavigationItems };
};

/**
 * Hook to get mobile menu state and controls
 */
export const useMobileMenu = (): {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
} => {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useNavigation();
  return { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu };
};
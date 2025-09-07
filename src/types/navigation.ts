// src/types/navigation.ts - Navigation system type definitions

export type PageType = 'homepage' | 'web-design' | 'town';
export type ViewportSize = 'mobile' | 'tablet' | 'desktop';
export type NavigationType = 'anchor' | 'page' | 'external';

export interface NavigationItem {
  id: string;
  name: string;
  href: string;
  type: NavigationType;
  isActive?: boolean;
  subItems?: NavigationItem[];
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

export interface PageContext {
  pageType: PageType;
  townSlug?: string;
  isScrolledPastHero: boolean;
  viewportSize: ViewportSize;
}

export interface NavigationContextType {
  currentPage: PageType;
  townSlug?: string;
  isScrolledPastHero: boolean;
  showStickyNav: boolean;
  navigationItems: NavigationItem[];
  subNavigationItems: NavigationItem[];
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  pageContext: PageContext;
}

export interface NavigationProviderProps {
  children: React.ReactNode;
  currentPage: PageType;
  townSlug?: string;
}

export interface StickyNavigationBarProps {
  isVisible: boolean;
  navigationItems: NavigationItem[];
  subNavigationItems?: NavigationItem[];
  className?: string;
  isLoading?: boolean;
  isContextChanging?: boolean;
}

export interface NavigationConfig {
  homepage: {
    heroNavigation: NavigationItem[];
    stickyNavigation: NavigationItem[];
    showStickyAfterScroll: boolean;
  };
  webDesign: {
    mainNavigation: NavigationItem[];
    townNavigation: NavigationItem[];
    showStickyImmediately: true;
  };
  townPages: {
    mainNavigation: NavigationItem[];
    otherTowns: NavigationItem[];
    showStickyImmediately: true;
  };
}

export interface EnhancedMobileNavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  variant: 'light' | 'dark';
  currentPage: PageType;
  navigationItems: NavigationItem[];
  contextualMessage?: string;
}
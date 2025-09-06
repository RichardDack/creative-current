// src/lib/navigation/index.ts - Navigation system exports

// Context and hooks
export {
  NavigationProvider,
  useNavigation,
  usePageContext,
  useNavigationItems,
  useMobileMenu
} from '@/contexts/NavigationContext';

// Utilities
export {
  detectPageContext,
  generateNavigationLinks,
  generateMobileNavigationLinks,
  handleNavigationClick,
  validateNavigationLink,
  shouldShowStickyNav,
  getContextualMessage,
  markActiveNavigationItem,
  NAVIGATION_CONFIG
} from '@/lib/utils/navigationUtils';

// Hooks
export { useScrollDetection } from '@/lib/hooks/useScrollDetection';

// Types
export type {
  NavigationItem,
  PageType,
  ViewportSize,
  NavigationType,
  PageContext,
  NavigationContextType,
  NavigationProviderProps,
  StickyNavigationBarProps,
  NavigationConfig,
  EnhancedMobileNavOverlayProps
} from '@/types/navigation';
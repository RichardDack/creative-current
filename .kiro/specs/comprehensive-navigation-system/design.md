# Design Document

## Overview

The comprehensive navigation system will create a unified, intelligent navigation experience across all pages and device sizes. The system addresses the current fragmentation where the homepage relies on hero navigation buttons, while sub-pages (/web-design and town pages) have no persistent navigation, creating a disconnected user experience.

The solution implements a context-aware sticky navigation menu that appears immediately on sub-pages but only after scrolling past the hero on the homepage, preserving the existing hero navigation experience while ensuring users are never without navigation options.

## Architecture

### Navigation Context System

The navigation system uses a context-aware architecture that adapts based on:

1. **Current Page Type** (homepage, web-design, town page)
2. **Scroll Position** (above/below hero section)
3. **Viewport Size** (mobile, tablet, desktop)
4. **User Interaction State** (menu open/closed, hover states)

### Component Hierarchy

```
NavigationProvider (Context)
├── StickyNavigationBar (Desktop/Tablet)
│   ├── NavigationLogo
│   ├── MainNavigationItems
│   ├── ContextualSubNavigation
│   └── NavigationIndicators
├── MobileNavigationSystem
│   ├── BurgerMenuIcon (existing)
│   ├── MobileNavOverlay (enhanced)
│   └── ContextualMobileMenu
└── NavigationUtils
    ├── ScrollDetection
    ├── PageContextDetection
    └── LinkGeneration
```

## Components and Interfaces

### 1. NavigationProvider Component

**Purpose**: Provides navigation context and state management across the application.

**Props Interface**:
```typescript
interface NavigationProviderProps {
  children: React.ReactNode;
  currentPage: 'homepage' | 'web-design' | 'town';
  townSlug?: string;
}

interface NavigationContextType {
  currentPage: string;
  isScrolledPastHero: boolean;
  showStickyNav: boolean;
  navigationItems: NavigationItem[];
  subNavigationItems: NavigationItem[];
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}
```

### 2. StickyNavigationBar Component

**Purpose**: Main desktop/tablet navigation that appears contextually based on page and scroll position.

**Props Interface**:
```typescript
interface StickyNavigationBarProps {
  isVisible: boolean;
  currentPage: string;
  navigationItems: NavigationItem[];
  subNavigationItems?: NavigationItem[];
  className?: string;
}

interface NavigationItem {
  name: string;
  href: string;
  isExternal?: boolean;
  isActive?: boolean;
  subItems?: NavigationItem[];
}
```

**Key Features**:
- Smooth slide-in animation from top
- Semi-transparent background with backdrop blur
- Contextual navigation items based on current page
- Hover states and active indicators
- Responsive typography and spacing

### 3. Enhanced MobileNavigationSystem

**Purpose**: Intelligent mobile navigation that adapts based on current page context.

**Enhanced Props Interface**:
```typescript
interface MobileNavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  variant: 'light' | 'dark';
  currentPage: string;
  navigationItems: NavigationItem[];
  contextualMessage?: string;
}
```

### 4. NavigationUtils

**Purpose**: Utility functions for navigation logic and link generation.

**Key Functions**:
```typescript
// Detect current page context
function detectPageContext(): PageContext;

// Generate appropriate navigation links based on context
function generateNavigationLinks(currentPage: string, townSlug?: string): NavigationItem[];

// Handle smooth scrolling with cross-page navigation
function handleNavigationClick(href: string, currentPage: string): void;

// Detect scroll position relative to hero section
function useScrollDetection(): { isScrolledPastHero: boolean };
```

## Data Models

### Navigation Configuration

```typescript
interface NavigationConfig {
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

interface PageContext {
  pageType: 'homepage' | 'web-design' | 'town';
  townSlug?: string;
  isScrolledPastHero: boolean;
  viewportSize: 'mobile' | 'tablet' | 'desktop';
}
```

### Navigation Items Structure

```typescript
interface NavigationItem {
  id: string;
  name: string;
  href: string;
  type: 'anchor' | 'page' | 'external';
  isActive?: boolean;
  subItems?: NavigationItem[];
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

// Example navigation configurations
const HOMEPAGE_NAVIGATION: NavigationItem[] = [
  { id: 'work', name: 'WORK', href: '#work-section', type: 'anchor' },
  { id: 'about', name: 'ABOUT', href: '#meet-our-team', type: 'anchor' },
  { id: 'services', name: 'SERVICES', href: '/web-design', type: 'page' },
  { id: 'contact', name: 'CONTACT', href: '#footer-background', type: 'anchor' }
];

const WEB_DESIGN_NAVIGATION: NavigationItem[] = [
  { id: 'home', name: 'HOME', href: '/', type: 'page' },
  { id: 'work', name: 'WORK', href: '/#work-section', type: 'page' },
  { id: 'about', name: 'ABOUT', href: '/#meet-our-team', type: 'page' },
  { id: 'contact', name: 'CONTACT', href: '/#footer-background', type: 'page' }
];
```

## Styling and Visual Design

### Sticky Navigation Bar Styling

```css
.stickyNavigationBar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  
  /* Glass morphism effect */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  /* Smooth transitions */
  transform: translateY(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stickyNavigationBar.visible {
  transform: translateY(0);
}

.navigationItems {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.navigationItem {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.navigationItem:hover {
  background: rgba(49, 175, 180, 0.2);
  color: #31afb4;
}

.navigationItem.active {
  background: rgba(49, 175, 180, 0.3);
  color: #31afb4;
}
```

### Responsive Behavior

```css
/* Desktop and Tablet */
@media (min-width: 768px) {
  .stickyNavigationBar {
    display: block;
  }
  
  .mobileNavigationSystem {
    display: none;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .stickyNavigationBar {
    display: none;
  }
  
  .mobileNavigationSystem {
    display: block;
  }
}
```

### Work Section Height Adjustment

```css
.workSection {
  /* Default full viewport height */
  min-height: 100vh;
}

.workSection.withStickyNav {
  /* Adjust for sticky navigation bar */
  min-height: calc(100vh - var(--sticky-nav-height, 60px));
}

.workProject {
  height: 100vh;
}

.workProject.withStickyNav {
  height: calc(100vh - var(--sticky-nav-height, 60px));
}
```

## Error Handling

### Navigation Link Validation

```typescript
function validateNavigationLink(href: string, currentPage: string): boolean {
  // Validate anchor links have corresponding elements
  if (href.startsWith('#')) {
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    return !!targetElement;
  }
  
  // Validate page links exist
  if (href.startsWith('/')) {
    // Could implement route validation here
    return true;
  }
  
  return false;
}
```

### Fallback Navigation

```typescript
function handleNavigationError(href: string, error: Error): void {
  console.warn(`Navigation failed for ${href}:`, error);
  
  // Fallback to homepage if navigation fails
  if (href !== '/') {
    window.location.href = '/';
  }
}
```

### Scroll Detection Fallbacks

```typescript
function useScrollDetection(): { isScrolledPastHero: boolean } {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      try {
        const heroElement = document.getElementById('hero-section');
        if (heroElement) {
          const heroBottom = heroElement.offsetTop + heroElement.offsetHeight;
          setIsScrolledPastHero(window.scrollY > heroBottom - 100);
        } else {
          // Fallback: show after 100vh scroll
          setIsScrolledPastHero(window.scrollY > window.innerHeight);
        }
      } catch (error) {
        console.warn('Scroll detection error:', error);
        // Fallback to simple scroll threshold
        setIsScrolledPastHero(window.scrollY > 800);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return { isScrolledPastHero };
}
```

## Testing Strategy

### Unit Tests

1. **Navigation Context Tests**
   - Test page context detection
   - Test navigation item generation
   - Test scroll detection logic

2. **Component Tests**
   - Test StickyNavigationBar visibility logic
   - Test mobile menu functionality
   - Test navigation link generation

3. **Integration Tests**
   - Test cross-page navigation
   - Test smooth scrolling behavior
   - Test responsive breakpoint behavior

### E2E Tests

1. **Navigation Flow Tests**
   - Test homepage to web-design navigation
   - Test web-design to town page navigation
   - Test return navigation to homepage

2. **Responsive Tests**
   - Test mobile burger menu functionality
   - Test desktop sticky navigation
   - Test viewport size transitions

3. **Accessibility Tests**
   - Test keyboard navigation
   - Test screen reader compatibility
   - Test focus management

### Performance Tests

1. **Scroll Performance**
   - Test sticky navigation animation performance
   - Test scroll event throttling
   - Test work section height adjustments

2. **Bundle Size**
   - Test navigation component bundle impact
   - Test code splitting effectiveness

## Implementation Phases

### Phase 1: Core Navigation Infrastructure
- Implement NavigationProvider context
- Create basic StickyNavigationBar component
- Add scroll detection utilities

### Phase 2: Page Context Integration
- Implement page context detection
- Add navigation item generation logic
- Integrate with existing Header component

### Phase 3: Mobile Navigation Enhancement
- Enhance existing MobileNavOverlay
- Add contextual mobile navigation
- Implement intelligent link generation

### Phase 4: Visual Polish and Animation
- Add smooth animations and transitions
- Implement glass morphism styling
- Add hover states and active indicators

### Phase 5: Work Section Integration
- Implement height adjustment logic
- Test with existing work showcase
- Ensure smooth project transitions

### Phase 6: Testing and Optimization
- Comprehensive testing across devices
- Performance optimization
- Accessibility improvements
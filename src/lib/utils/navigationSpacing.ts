// src/lib/utils/navigationSpacing.ts
// Utility functions for handling navigation spacing and positioning

/**
 * Get the current sticky navigation height
 */
export function getStickyNavHeight(): number {
  if (typeof window === 'undefined') return 60; // Default for SSR
  
  const stickyNav = document.querySelector('[data-sticky-nav="true"]') as HTMLElement;
  if (stickyNav) {
    return stickyNav.offsetHeight;
  }
  
  // Fallback to CSS custom property
  const rootStyles = getComputedStyle(document.documentElement);
  const navHeight = rootStyles.getPropertyValue('--sticky-nav-height');
  return navHeight ? parseInt(navHeight.replace('px', '')) : 60;
}

/**
 * Check if sticky navigation is currently visible
 */
export function isStickyNavVisible(): boolean {
  if (typeof window === 'undefined') return false;
  
  const stickyNav = document.querySelector('[data-sticky-nav="true"]') as HTMLElement;
  if (!stickyNav) return false;
  
  const styles = getComputedStyle(stickyNav);
  return styles.display !== 'none' && styles.visibility !== 'hidden' && styles.opacity !== '0';
}

/**
 * Calculate the total offset needed for elements to clear navigation
 */
export function getNavigationOffset(): number {
  if (typeof window === 'undefined') return 60;
  
  let offset = 0;
  
  // Add sticky navigation height if visible
  if (isStickyNavVisible()) {
    offset += getStickyNavHeight();
  }
  
  // Add breadcrumb height if present
  const breadcrumbs = document.querySelector('[aria-label="Breadcrumb navigation"]') as HTMLElement;
  if (breadcrumbs && getComputedStyle(breadcrumbs).display !== 'none') {
    offset += breadcrumbs.offsetHeight;
  }
  
  return offset;
}

/**
 * Scroll to element accounting for navigation height
 */
export function scrollToElementWithNavOffset(elementId: string, additionalOffset: number = 20): void {
  if (typeof window === 'undefined') return;
  
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const navOffset = getNavigationOffset();
  const elementPosition = element.offsetTop;
  const scrollPosition = elementPosition - navOffset - additionalOffset;
  
  window.scrollTo({
    top: Math.max(0, scrollPosition),
    behavior: 'smooth'
  });
}

/**
 * Debug function to log navigation spacing information
 */
export function debugNavigationSpacing(): void {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;
  
  console.group('🧭 Navigation Spacing Debug');
  console.log('Sticky Nav Height:', getStickyNavHeight());
  console.log('Sticky Nav Visible:', isStickyNavVisible());
  console.log('Total Navigation Offset:', getNavigationOffset());
  
  const breadcrumbs = document.querySelector('[aria-label="Breadcrumb navigation"]') as HTMLElement;
  if (breadcrumbs) {
    console.log('Breadcrumbs Height:', breadcrumbs.offsetHeight);
    console.log('Breadcrumbs Display:', getComputedStyle(breadcrumbs).display);
  } else {
    console.log('Breadcrumbs: Not found');
  }
  
  const stickyNav = document.querySelector('[data-sticky-nav="true"]') as HTMLElement;
  if (stickyNav) {
    const rect = stickyNav.getBoundingClientRect();
    console.log('Sticky Nav Position:', { top: rect.top, height: rect.height });
  }
  
  console.groupEnd();
}

/**
 * Add visual debugging overlay for navigation spacing
 */
export function addNavigationDebugOverlay(): void {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;
  
  // Remove existing overlay
  const existing = document.getElementById('nav-debug-overlay');
  if (existing) existing.remove();
  
  const overlay = document.createElement('div');
  overlay.id = 'nav-debug-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: ${getNavigationOffset()}px;
    background: rgba(255, 0, 0, 0.2);
    border-bottom: 2px solid red;
    z-index: 9999;
    pointer-events: none;
    font-family: monospace;
    font-size: 12px;
    color: white;
    padding: 4px;
    box-sizing: border-box;
  `;
  overlay.textContent = `Navigation Offset: ${getNavigationOffset()}px`;
  
  document.body.appendChild(overlay);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    overlay.remove();
  }, 5000);
}

// Auto-debug in development when this module is imported
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Wait for page to load before debugging
  window.addEventListener('load', () => {
    setTimeout(debugNavigationSpacing, 1000);
  });
}
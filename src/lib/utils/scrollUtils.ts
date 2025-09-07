// src/lib/utils/scrollUtils.ts - Utility functions for smooth scrolling with sticky nav awareness

/**
 * Smooth scroll to an element with sticky navigation offset
 * @param targetId - The ID of the target element (without #)
 * @param additionalOffset - Additional offset beyond the sticky nav height
 */
export function scrollToElement(targetId: string, additionalOffset: number = 20): void {
  const targetElement = document.getElementById(targetId);
  
  if (!targetElement) {
    console.warn(`Element with ID "${targetId}" not found`);
    return;
  }

  // Use the actual sticky nav height from CSS
  const stickyNavHeight = 60; // Match the CSS --sticky-nav-height
  const totalOffset = stickyNavHeight + additionalOffset;
  
  const elementPosition = targetElement.offsetTop;
  const offsetPosition = elementPosition - totalOffset;
  
  window.scrollTo({
    top: Math.max(0, offsetPosition), // Ensure we don't scroll to negative position
    behavior: 'smooth'
  });
}

/**
 * Handle navigation click with proper offset for sticky nav
 * @param e - Click event
 * @param href - The href attribute (e.g., "#work-section")
 * @param currentPage - Current page type for cross-page navigation
 */
export function handleNavigationClick(
  e: React.MouseEvent<HTMLAnchorElement>, 
  href: string
): void {
  // Only handle anchor links
  if (!href.startsWith('#')) {
    return; // Let the browser handle regular links
  }

  e.preventDefault();
  
  const targetId = href.substring(1);
  
  // Handle cross-page navigation to homepage anchors
  if (href.startsWith('#') && window.location.pathname !== '/') {
    // Navigate to homepage first, then scroll to anchor
    window.location.href = `/${href}`;
    return;
  }
  
  // Handle same-page anchor scrolling with URL history update
  scrollToElement(targetId);
  
  // Update URL hash for proper history management
  if (window.history && window.history.pushState) {
    const newUrl = `${window.location.pathname}#${targetId}`;
    window.history.pushState(null, '', newUrl);
  }
}

/**
 * Get the current sticky navigation height
 * @returns The height of the sticky navigation in pixels
 */
export function getStickyNavHeight(): number {
  const stickyNav = document.querySelector('[data-sticky-nav]') as HTMLElement;
  
  if (stickyNav) {
    return stickyNav.offsetHeight;
  }
  
  // Fallback to CSS constant
  return 60;
}

/**
 * Check if an element is currently visible in the viewport
 * accounting for sticky navigation
 * @param elementId - The ID of the element to check
 * @returns Whether the element is visible
 */
export function isElementVisible(elementId: string): boolean {
  const element = document.getElementById(elementId);
  
  if (!element) {
    return false;
  }
  
  const rect = element.getBoundingClientRect();
  const stickyNavHeight = getStickyNavHeight();
  
  // Element is visible if its top is below the sticky nav and its bottom is above the viewport top
  return rect.top >= stickyNavHeight && rect.bottom >= stickyNavHeight;
}

/**
 * Get the scroll position needed to show an element properly
 * accounting for sticky navigation
 * @param elementId - The ID of the target element
 * @param additionalOffset - Additional offset beyond the sticky nav height
 * @returns The scroll position in pixels
 */
export function getScrollPositionForElement(elementId: string, additionalOffset: number = 20): number {
  const element = document.getElementById(elementId);
  
  if (!element) {
    return 0;
  }
  
  const stickyNavHeight = getStickyNavHeight();
  const totalOffset = stickyNavHeight + additionalOffset;
  const elementPosition = element.offsetTop;
  
  return Math.max(0, elementPosition - totalOffset);
}
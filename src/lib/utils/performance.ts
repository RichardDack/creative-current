// src/lib/utils/performance.ts
'use client';

/**
 * Performance optimization utilities for Core Web Vitals
 */

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;

  // Preload critical fonts
  const fontPreloads = [
    '/fonts/ClashDisplay-Bold.woff2',
    '/fonts/ClashGrotesk-Regular.woff2',
    '/fonts/ClashGrotesk-Medium.woff2',
  ];

  fontPreloads.forEach((fontUrl) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = fontUrl;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Optimize images for better LCP
export const optimizeImageLoading = () => {
  if (typeof window === 'undefined') return;

  // Add loading="eager" to above-the-fold images
  const aboveFoldImages = document.querySelectorAll('img[data-priority="true"]');
  aboveFoldImages.forEach((img) => {
    (img as HTMLImageElement).loading = 'eager';
    (img as HTMLImageElement).fetchPriority = 'high';
  });

  // Add loading="lazy" to below-the-fold images
  const belowFoldImages = document.querySelectorAll('img:not([data-priority="true"])');
  belowFoldImages.forEach((img) => {
    (img as HTMLImageElement).loading = 'lazy';
  });
};

// Prevent Cumulative Layout Shift (CLS)
export const preventLayoutShift = () => {
  if (typeof window === 'undefined') return;

  // Add aspect ratio containers for images without explicit dimensions
  const images = document.querySelectorAll('img:not([width]):not([height])');
  images.forEach((img) => {
    const container = img.parentElement;
    if (container && !container.style.aspectRatio) {
      // Default aspect ratio for images without dimensions
      container.style.aspectRatio = '16/9';
      container.style.overflow = 'hidden';
    }
  });
};

// Monitor Core Web Vitals
export const monitorCoreWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Only load web-vitals in production
  if (process.env.NODE_ENV === 'production') {
    import('web-vitals').then((webVitals) => {
      // Use type assertion to avoid TypeScript errors with dynamic imports
      const vitals = webVitals as any;
      
      // Try modern API first (onXXX functions)
      if (vitals.onCLS) vitals.onCLS(console.log);
      else if (vitals.getCLS) vitals.getCLS(console.log);
      
      if (vitals.onFID) vitals.onFID(console.log);
      else if (vitals.getFID) vitals.getFID(console.log);
      
      if (vitals.onFCP) vitals.onFCP(console.log);
      else if (vitals.getFCP) vitals.getFCP(console.log);
      
      if (vitals.onLCP) vitals.onLCP(console.log);
      else if (vitals.getLCP) vitals.getLCP(console.log);
      
      if (vitals.onTTFB) vitals.onTTFB(console.log);
      else if (vitals.getTTFB) vitals.getTTFB(console.log);
    }).catch((error) => {
      console.warn('Failed to load web-vitals:', error);
    });
  }
};

// Optimize third-party scripts
export const optimizeThirdPartyScripts = () => {
  if (typeof window === 'undefined') return;

  // Defer non-critical scripts
  const scripts = document.querySelectorAll('script[data-defer="true"]');
  scripts.forEach((script) => {
    (script as HTMLScriptElement).defer = true;
  });
};

// Initialize all performance optimizations
export const initializePerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Run immediately
  preloadCriticalResources();
  
  // Run after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      optimizeImageLoading();
      preventLayoutShift();
      optimizeThirdPartyScripts();
    });
  } else {
    optimizeImageLoading();
    preventLayoutShift();
    optimizeThirdPartyScripts();
  }

  // Run after page is fully loaded
  window.addEventListener('load', () => {
    monitorCoreWebVitals();
  });
};

// Intersection Observer for lazy loading optimization
export const createLazyLoadObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px', // Start loading 50px before element enters viewport
    threshold: 0.1,
  });
};

// Debounce function for performance
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
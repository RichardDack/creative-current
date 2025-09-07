// src/lib/utils/mobilePerformance.ts
'use client';

/**
 * Mobile-specific performance optimization utilities
 */

// Test mobile Core Web Vitals
export const testMobileCoreWebVitals = () => {
  if (typeof window === 'undefined') return;

  const isMobile = window.innerWidth <= 768;
  if (!isMobile) return;

  // Mobile-specific performance monitoring
  const performanceObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('Mobile LCP:', entry.startTime);
        // Good: < 2.5s, Needs Improvement: 2.5s - 4s, Poor: > 4s
        if (entry.startTime > 4000) {
          console.warn('Mobile LCP is poor (>4s)');
        } else if (entry.startTime > 2500) {
          console.warn('Mobile LCP needs improvement (>2.5s)');
        } else {
          console.log('Mobile LCP is good (<2.5s)');
        }
      }
      
      if (entry.entryType === 'first-input') {
        const fidEntry = entry as any; // Type assertion for first-input entries
        console.log('Mobile FID:', fidEntry.processingStart - fidEntry.startTime);
        const fid = fidEntry.processingStart - fidEntry.startTime;
        // Good: < 100ms, Needs Improvement: 100ms - 300ms, Poor: > 300ms
        if (fid > 300) {
          console.warn('Mobile FID is poor (>300ms)');
        } else if (fid > 100) {
          console.warn('Mobile FID needs improvement (>100ms)');
        } else {
          console.log('Mobile FID is good (<100ms)');
        }
      }
    });
  });

  performanceObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
};

// Optimize mobile touch interactions
export const optimizeMobileTouchInteractions = () => {
  if (typeof window === 'undefined') return;

  // Add passive event listeners for better scroll performance
  const passiveEvents = ['touchstart', 'touchmove', 'wheel'];
  passiveEvents.forEach((event) => {
    document.addEventListener(event, () => {}, { passive: true });
  });

  // Optimize button interactions for mobile
  const buttons = document.querySelectorAll('button, a[role="button"]');
  buttons.forEach((button) => {
    // Ensure minimum touch target size (44px)
    const rect = button.getBoundingClientRect();
    if (rect.width < 44 || rect.height < 44) {
      (button as HTMLElement).style.minWidth = '44px';
      (button as HTMLElement).style.minHeight = '44px';
    }

    // Add touch feedback
    button.addEventListener('touchstart', () => {
      button.classList.add('touch-active');
    }, { passive: true });

    button.addEventListener('touchend', () => {
      setTimeout(() => {
        button.classList.remove('touch-active');
      }, 150);
    }, { passive: true });
  });
};

// Test mobile responsiveness
export const testMobileResponsiveness = () => {
  if (typeof window === 'undefined') return;

  const issues: string[] = [];

  // Check viewport meta tag
  const viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    issues.push('Missing viewport meta tag');
  } else {
    const content = viewport.getAttribute('content');
    if (!content?.includes('width=device-width')) {
      issues.push('Viewport meta tag missing width=device-width');
    }
  }

  // Check for horizontal scrolling
  if (document.body.scrollWidth > window.innerWidth) {
    issues.push('Horizontal scrolling detected');
  }

  // Check touch target sizes
  const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
  interactiveElements.forEach((element, index) => {
    const rect = element.getBoundingClientRect();
    if (rect.width < 44 || rect.height < 44) {
      issues.push(`Touch target ${index} is too small (${rect.width}x${rect.height}px)`);
    }
  });

  // Check font sizes
  const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
  textElements.forEach((element, index) => {
    const styles = window.getComputedStyle(element);
    const fontSize = parseInt(styles.fontSize);
    if (fontSize < 16) {
      issues.push(`Text element ${index} has small font size (${fontSize}px)`);
    }
  });

  if (issues.length > 0) {
    console.warn('Mobile responsiveness issues:', issues);
  } else {
    console.log('Mobile responsiveness check passed');
  }

  return issues;
};

// Optimize mobile images
export const optimizeMobileImages = () => {
  if (typeof window === 'undefined') return;

  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    // Add loading="lazy" to images below the fold
    const rect = img.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      img.loading = 'lazy';
    }

    // Optimize image sizes for mobile
    if (window.innerWidth <= 768) {
      // Ensure images don't exceed viewport width
      if (img.naturalWidth > window.innerWidth) {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
      }
    }

    // Add error handling
    img.addEventListener('error', () => {
      console.warn('Image failed to load:', img.src);
      // Optionally replace with placeholder
      img.style.backgroundColor = '#f3f4f6';
      img.style.minHeight = '200px';
    });
  });
};

// Monitor mobile network conditions
export const monitorMobileNetwork = () => {
  if (typeof window === 'undefined' || !('navigator' in window)) return;

  // @ts-expect-error - NetworkInformation is experimental
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (connection) {
    const logNetworkInfo = () => {
      console.log('Mobile Network Info:', {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
      });

      // Optimize for slow connections
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        console.warn('Slow network detected, consider reducing image quality');
        // Reduce image quality for slow connections
        const images = document.querySelectorAll('img[data-src]');
        images.forEach((img) => {
          const src = img.getAttribute('data-src');
          if (src && src.includes('?')) {
            img.setAttribute('data-src', src + '&quality=50');
          }
        });
      }

      // Respect data saver mode
      if (connection.saveData) {
        console.log('Data saver mode detected');
        // Disable autoplay videos, reduce image quality, etc.
        const videos = document.querySelectorAll('video[autoplay]');
        videos.forEach((video) => {
          (video as HTMLVideoElement).autoplay = false;
        });
      }
    };

    logNetworkInfo();
    connection.addEventListener('change', logNetworkInfo);
  }
};

// Initialize all mobile performance optimizations
export const initializeMobilePerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  const isMobile = window.innerWidth <= 768;
  if (!isMobile) return;

  // Run immediately
  optimizeMobileTouchInteractions();
  optimizeMobileImages();
  monitorMobileNetwork();

  // Run after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      testMobileResponsiveness();
    });
  } else {
    testMobileResponsiveness();
  }

  // Run after page is fully loaded
  window.addEventListener('load', () => {
    testMobileCoreWebVitals();
  });
};
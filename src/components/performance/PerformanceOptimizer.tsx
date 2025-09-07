// src/components/performance/PerformanceOptimizer.tsx
'use client';

import { useEffect } from 'react';
import { initializePerformanceOptimizations } from '@/lib/utils/performance';

export const PerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    // Initialize performance optimizations
    initializePerformanceOptimizations();

    // Add critical CSS for preventing layout shift
    const style = document.createElement('style');
    style.textContent = `
      /* Prevent layout shift for images */
      img {
        max-width: 100%;
        height: auto;
      }
      
      /* Ensure containers have proper aspect ratios */
      [data-image-container] {
        position: relative;
        overflow: hidden;
      }
      
      /* Optimize font loading */
      .font-loading {
        font-display: swap;
        visibility: hidden;
      }
      
      .font-loaded {
        visibility: visible;
      }
      
      /* Reduce layout shift for hero content */
      .hero-content {
        min-height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      
      /* Optimize button interactions */
      button, a[role="button"] {
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
      
      /* Improve scroll performance */
      * {
        -webkit-overflow-scrolling: touch;
      }
      
      /* Optimize animations for performance */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return null;
};
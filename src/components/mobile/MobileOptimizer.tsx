// src/components/mobile/MobileOptimizer.tsx
'use client';

import { useEffect, useState } from 'react';
import { initializeMobilePerformanceOptimizations } from '@/lib/utils/mobilePerformance';

interface MobileOptimizerProps {
  children: React.ReactNode;
}

export const MobileOptimizer: React.FC<MobileOptimizerProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [touchDevice, setTouchDevice] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setIsMobile(mobile);
      setTouchDevice(touch);
      
      // Add mobile class to body
      if (mobile) {
        document.body.classList.add('mobile-device');
      } else {
        document.body.classList.remove('mobile-device');
      }
      
      // Add touch class to body
      if (touch) {
        document.body.classList.add('touch-device');
      } else {
        document.body.classList.remove('touch-device');
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Optimize mobile interactions
    if (touchDevice) {
      // Improve touch responsiveness
      document.addEventListener('touchstart', () => {}, { passive: true });
      
      // Optimize scroll performance on mobile
      let ticking = false;
      const optimizeScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            // Mobile scroll optimizations can go here
            ticking = false;
          });
          ticking = true;
        }
      };
      
      document.addEventListener('scroll', optimizeScroll, { passive: true });
      
      return () => {
        document.removeEventListener('scroll', optimizeScroll);
      };
    }

    // Initialize mobile performance optimizations
    initializeMobilePerformanceOptimizations();

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [touchDevice]);

  useEffect(() => {
    // Mobile-specific optimizations
    if (isMobile) {
      // Optimize viewport for mobile
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no');
      }

      // Add mobile-specific styles
      const mobileStyles = document.createElement('style');
      mobileStyles.textContent = `
        /* Mobile-specific optimizations */
        .mobile-device {
          -webkit-text-size-adjust: 100%;
          -webkit-tap-highlight-color: transparent;
        }
        
        .mobile-device * {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }
        
        .mobile-device input,
        .mobile-device textarea,
        .mobile-device [contenteditable] {
          -webkit-user-select: text;
          user-select: text;
        }
        
        /* Optimize mobile buttons */
        .mobile-device button,
        .mobile-device a[role="button"] {
          min-height: 44px;
          min-width: 44px;
          touch-action: manipulation;
        }
        
        /* Optimize mobile forms */
        .mobile-device input,
        .mobile-device textarea,
        .mobile-device select {
          font-size: 16px; /* Prevent zoom on iOS */
          border-radius: 0; /* Remove iOS styling */
          -webkit-appearance: none;
          appearance: none;
        }
        
        /* Optimize mobile navigation */
        .mobile-device .nav-item {
          padding: 12px 16px;
          min-height: 44px;
          display: flex;
          align-items: center;
        }
        
        /* Optimize mobile images */
        .mobile-device img {
          -webkit-user-drag: none;
          -webkit-touch-callout: none;
        }
        
        /* Optimize mobile scrolling */
        .mobile-device .scroll-container {
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }
        
        /* Mobile-specific animations */
        .mobile-device .animate-on-mobile {
          transition: transform 0.2s ease;
        }
        
        .mobile-device .animate-on-mobile:active {
          transform: scale(0.95);
        }
      `;
      
      document.head.appendChild(mobileStyles);
      
      return () => {
        if (mobileStyles.parentNode) {
          mobileStyles.parentNode.removeChild(mobileStyles);
        }
      };
    }
  }, [isMobile]);

  return <>{children}</>;
};
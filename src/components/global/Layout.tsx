// src/components/global/Layout.tsx - UPDATED WITH NAVIGATION SYSTEM
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { NavigationProvider } from '@/contexts/NavigationContext';
import { StickyNavigationBar } from '@/components/global/StickyNavigationBar';
import { useNavigation } from '@/contexts/NavigationContext';
import styles from '@/styles/components/Layout.module.css';
import { PageType } from '@/types/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

// Inner layout component that uses navigation context
const LayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showStickyNav, navigationItems, subNavigationItems } = useNavigation();

  // Handle initial hash scrolling on page load
  useEffect(() => {
    const handleInitialHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        // Wait for page to fully load and sticky nav to be positioned
        setTimeout(() => {
          const targetId = hash.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const stickyNavHeight = 60; // Match CSS constant
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - stickyNavHeight - 20;
            
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: 'smooth'
            });
          }
        }, 500); // Longer delay to ensure everything is loaded
      }
    };

    // Handle initial load
    handleInitialHashScroll();

    // Handle browser back/forward navigation
    const handlePopState = () => {
      handleInitialHashScroll();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Run navigation audit and tests in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Wait for page to fully load before auditing
      const timer = setTimeout(async () => {
        const { logNavigationAudit } = await import('@/lib/utils/navigationAudit');
        const { runAllNavigationTests } = await import('@/lib/utils/navigationTest');
        
        logNavigationAudit();
        runAllNavigationTests();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <Header fixed={true} variant="dark" />
      
      {/* Sticky Navigation Bar */}
      <StickyNavigationBar
        isVisible={showStickyNav}
        navigationItems={navigationItems}
        subNavigationItems={subNavigationItems}
      />
      
      <main id="main-content" className={styles.mainContent}>
        {children}
      </main>
      <Footer />
    </>
  );
};

// Helper function to detect page type from pathname
function detectPageTypeFromPath(pathname: string): { pageType: PageType; townSlug?: string } {
  if (pathname === '/') {
    return { pageType: 'homepage' };
  } else if (pathname === '/web-design') {
    return { pageType: 'web-design' };
  } else if (pathname.startsWith('/web-design/')) {
    const townSlug = pathname.split('/').pop();
    return { pageType: 'town', townSlug };
  }
  
  // Default to homepage for unknown routes
  return { pageType: 'homepage' };
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { pageType, townSlug } = detectPageTypeFromPath(pathname);

  return (
    <NavigationProvider currentPage={pageType} townSlug={townSlug}>
      <LayoutContent>
        {children}
      </LayoutContent>
    </NavigationProvider>
  );
};
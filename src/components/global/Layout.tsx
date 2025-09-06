// src/components/global/Layout.tsx - UPDATED WITH NAVIGATION SYSTEM
'use client';

import { usePathname } from 'next/navigation';
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
  const { showStickyNav, navigationItems, subNavigationItems, currentPage } = useNavigation();

  return (
    <>
      <Header fixed={true} variant="dark" />
      
      {/* Sticky Navigation Bar */}
      <StickyNavigationBar
        isVisible={showStickyNav}
        currentPage={currentPage}
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
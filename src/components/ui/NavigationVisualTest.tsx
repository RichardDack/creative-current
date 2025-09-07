// src/components/ui/NavigationVisualTest.tsx
'use client';

import React, { useState } from 'react';
import { StickyNavigationBar } from '@/components/global/StickyNavigationBar';
import { MobileNavOverlay } from '@/components/global/MobileNavOverlay';
import { NavigationItem } from '@/types/navigation';
import styles from '@/styles/components/NavigationVisualTest.module.css';

/**
 * NavigationVisualTest Component
 * 
 * A test component to verify navigation styling consistency across different
 * background colors and content types. Used for visual testing and refinement.
 */
export const NavigationVisualTest: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentBackground, setCurrentBackground] = useState('dark');
  const [isLoading, setIsLoading] = useState(false);
  const [isContextChanging, setIsContextChanging] = useState(false);

  const testNavigationItems: NavigationItem[] = [
    { id: 'work', name: 'WORK', href: '#work-section', type: 'anchor', isActive: false },
    { id: 'about', name: 'ABOUT', href: '#meet-our-team', type: 'anchor', isActive: true },
    { id: 'services', name: 'SERVICES', href: '/web-design', type: 'page', isActive: false },
    { id: 'contact', name: 'CONTACT', href: '#footer-background', type: 'anchor', isActive: false },
  ];

  const testSubNavigationItems: NavigationItem[] = [
    { id: 'town1', name: 'MELBOURNE', href: '/web-design/melbourne', type: 'page', isActive: false },
    { id: 'town2', name: 'SYDNEY', href: '/web-design/sydney', type: 'page', isActive: false },
  ];

  const backgrounds = [
    { id: 'dark', name: 'Dark', class: styles.backgroundDark },
    { id: 'light', name: 'Light', class: styles.backgroundLight },
    { id: 'gradient', name: 'Gradient', class: styles.backgroundGradient },
    { id: 'image', name: 'Image', class: styles.backgroundImage },
    { id: 'teal', name: 'Teal', class: styles.backgroundTeal },
  ];

  const handleLoadingTest = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleContextChangeTest = () => {
    setIsContextChanging(true);
    setTimeout(() => setIsContextChanging(false), 1000);
  };

  return (
    <div className={styles.testContainer}>
      <div className={`${styles.backgroundContainer} ${backgrounds.find(bg => bg.id === currentBackground)?.class}`}>
        {/* Test Controls */}
        <div className={styles.controls}>
          <h2>Navigation Visual Test</h2>
          
          <div className={styles.controlGroup}>
            <label>Background:</label>
            <select 
              value={currentBackground} 
              onChange={(e) => setCurrentBackground(e.target.value)}
              className={styles.select}
            >
              {backgrounds.map(bg => (
                <option key={bg.id} value={bg.id}>{bg.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.controlGroup}>
            <button onClick={handleLoadingTest} className={styles.button}>
              Test Loading State
            </button>
            <button onClick={handleContextChangeTest} className={styles.button}>
              Test Context Change
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className={styles.button}
            >
              Open Mobile Menu
            </button>
          </div>
        </div>

        {/* Sticky Navigation Bar */}
        <StickyNavigationBar
          isVisible={true}
          navigationItems={testNavigationItems}
          subNavigationItems={testSubNavigationItems}
          isLoading={isLoading}
          isContextChanging={isContextChanging}
          className={currentBackground === 'light' ? styles.lightTheme : ''}
        />

        {/* Content to test navigation over */}
        <div className={styles.content}>
          <div className={styles.contentSection}>
            <h3>Test Content Section 1</h3>
            <p>This content tests how the navigation appears over different backgrounds.</p>
          </div>
          
          <div className={styles.contentSection}>
            <h3>Test Content Section 2</h3>
            <p>The navigation should maintain readability and visual hierarchy.</p>
          </div>
          
          <div className={styles.contentSection}>
            <h3>Test Content Section 3</h3>
            <p>Glass morphism effects should adapt to different background colors.</p>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <MobileNavOverlay
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          variant={currentBackground === 'light' ? 'light' : 'dark'}
          currentPage="homepage"
          navigationItems={testNavigationItems}
          contextualMessage="Testing navigation visual consistency"
        />
      </div>
    </div>
  );
};
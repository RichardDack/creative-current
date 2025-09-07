// src/components/global/StickyNavigationBar.tsx
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { StickyNavigationBarProps, NavigationItem } from '@/types/navigation';
import styles from '@/styles/components/StickyNavigationBar.module.css';
import transitionStyles from '@/styles/components/NavigationTransitions.module.css';
import { NavbarLogo } from '@/components/ui/NavbarLogo';
import { handleNavigationClick } from '@/lib/utils/scrollUtils';

/**
 * StickyNavigationBar Component
 * 
 * A persistent navigation bar that appears contextually based on page type and scroll position.
 * Features glass morphism styling, smooth animations, and responsive behavior.
 * 
 * Requirements addressed:
 * - 2.1: Shows after hero scroll on homepage, immediately on sub-pages
 * - 2.2: Adjusts for work showcase height
 * - 2.3: Contextual navigation items based on page
 * - 2.10: Hidden on mobile, shown on desktop/tablet
 * - 5.1, 5.2, 5.3: Visual design and feedback
 */
export const StickyNavigationBar: React.FC<StickyNavigationBarProps> = ({
  isVisible,
  navigationItems,
  subNavigationItems = [],
  className = '',
  isLoading = false,
  isContextChanging = false
}) => {
  
  /**
   * Handle navigation click with smooth scrolling for anchor links
   */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavigationItem) => {
    handleNavigationClick(e, item.href);
  };

  /**
   * Render navigation item with appropriate link handling and enhanced styling
   */
  const renderNavigationItem = (item: NavigationItem, isSubItem = false) => {
    const itemClasses = `
      ${styles.navigationItem} 
      ${item.isActive ? styles.active : ''} 
      ${isSubItem ? styles.subItem : ''}
      ${isContextChanging ? transitionStyles.contextTransition : ''}
      ${transitionStyles.focusRing}
      ${transitionStyles.hoverMicroInteraction}
    `.trim();

    const content = (
      <span className={styles.itemText}>
        {item.name}
      </span>
    );

    // Handle different navigation types
    if (item.type === 'page' || item.type === 'external') {
      return (
        <Link
          key={item.id}
          href={item.href}
          className={itemClasses}
          aria-current={item.isActive ? 'page' : undefined}
        >
          {content}
        </Link>
      );
    }

    // Handle anchor links
    return (
      <a
        key={item.id}
        href={item.href}
        className={itemClasses}
        onClick={(e) => handleNavClick(e, item)}
        aria-current={item.isActive ? 'page' : undefined}
      >
        {content}
      </a>
    );
  };

  // Enhanced animation variants for smooth sticky navigation transitions
  const stickyNavVariants = {
    hidden: {
      y: -100,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      y: -100,
      opacity: 0,
      scale: 0.95,
    },
  };

  // Enhanced transition configuration for smoother animations
  const transitionConfig = {
    duration: 0.4,
    ease: "easeOut" as const,
    opacity: { duration: 0.3 },
    scale: { duration: 0.2 }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className={`
            ${styles.stickyNavigationBar} 
            ${className}
            ${isLoading ? transitionStyles.navigationLoading : ''}
            ${transitionStyles.backgroundTransition}
          `.trim()}
          variants={stickyNavVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={transitionConfig}
          role="navigation"
          aria-label="Main navigation"
          data-sticky-nav="true"
          style={{
            // Ensure proper stacking and performance
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
          }}
        >
          <div className={styles.navigationContent}>
            {/* Logo section */}
            <div className={styles.logoSection}>
              <Link 
                href="/" 
                className={styles.logoLink}
                aria-label="Creative Current - Go to homepage"
              >
                <NavbarLogo 
                  size={32} 
                  variant="dark"
                  className={styles.logo}
                />
              </Link>
            </div>

            {/* Main navigation items */}
            <div className={styles.mainNavigation}>
              {navigationItems.map((item) => renderNavigationItem(item, false))}
            </div>

            {/* Sub-navigation items (for town pages, etc.) */}
            {subNavigationItems.length > 0 && (
              <div className={styles.subNavigation}>
                <div className={styles.subNavigationDivider} />
                {subNavigationItems.map((item) => renderNavigationItem(item, true))}
              </div>
            )}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
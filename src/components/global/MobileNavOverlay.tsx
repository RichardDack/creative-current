// src/components/global/MobileNavOverlay.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import styles from '@/styles/components/MobileNavOverlay.module.css';
import transitionStyles from '@/styles/components/NavigationTransitions.module.css';

interface NavigationItem {
  name: string;
  href: string;
  id: string;
}

interface MobileNavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'light' | 'dark';
  currentPage?: string;
  navigationItems?: NavigationItem[];
  contextualMessage?: string;
}

export const MobileNavOverlay: React.FC<MobileNavOverlayProps> = ({
  isOpen,
  onClose,
  variant = 'dark',
  currentPage = 'homepage',
  navigationItems: propNavigationItems,
  contextualMessage
}) => {
  // Default navigation items for homepage
  const defaultNavigationItems: NavigationItem[] = [
    { name: 'WORK', href: '#work-section', id: 'work' },
    { name: 'ABOUT', href: '#meet-our-team', id: 'about' },
    { name: 'SERVICES', href: '/web-design', id: 'services' },
    { name: 'CONTACT', href: '#footer-background', id: 'contact' },
  ];

  // Use provided navigation items or generate contextual ones
  const navigationItems = propNavigationItems || (() => {
    if (currentPage === 'web-design') {
      return [
        { name: 'HOME', href: '/', id: 'home' },
        { name: 'WORK', href: '/#work-section', id: 'work' },
        { name: 'ABOUT', href: '/#meet-our-team', id: 'about' },
        { name: 'CONTACT', href: '/#footer-background', id: 'contact' },
      ];
    } else if (currentPage === 'town') {
      return [
        { name: 'HOME', href: '/', id: 'home' },
        { name: 'WEB-DESIGN', href: '/web-design', id: 'web-design' },
        { name: 'WORK', href: '/#work-section', id: 'work' },
        { name: 'ABOUT', href: '/#meet-our-team', id: 'about' },
        { name: 'CONTACT', href: '/#footer-background', id: 'contact' },
      ];
    }
    return defaultNavigationItems;
  })();

  // Handle navigation with proper cross-page support
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Close menu first
    onClose();

    // Handle different types of links
    if (href.startsWith('/')) {
      // Page navigation - let the browser handle it
      return;
    } else if (href.startsWith('#')) {
      e.preventDefault();
      
      // Check if we're on the homepage
      if (window.location.pathname === '/') {
        // Same page anchor scrolling
        setTimeout(() => {
          const targetId = href.substring(1);
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
        }, 200);
      } else {
        // Cross-page navigation to homepage anchor
        window.location.href = `/${href}`;
      }
    } else if (href.startsWith('/#')) {
      e.preventDefault();
      // Cross-page navigation to homepage anchor
      window.location.href = href;
    }
  };

  // Handle click outside to close menu
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus management - focus first navigation item when menu opens
  useEffect(() => {
    if (isOpen) {
      const firstNavItem = document.querySelector(`.${styles.navItem}`) as HTMLElement;
      if (firstNavItem) {
        firstNavItem.focus();
      }
    }
  }, [isOpen]);

  const overlayVariants = {
    hidden: {
      opacity: 0,
      x: '100%',
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      x: '100%',
      scale: 0.95,
    },
  };

  const backgroundVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      x: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: -20,
      x: 30,
      scale: 0.9,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`${styles.overlay} ${variant === 'light' ? styles.light : styles.dark}`}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            duration: 0.4,
            ease: 'easeOut',
          }}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <motion.div
            className={styles.overlayBackground}
            variants={backgroundVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: 0.4,
              ease: 'easeOut',
            }}
          />

          <motion.nav
            className={styles.navigationContainer}
            role="navigation"
            aria-label="Main navigation"
          >
            {contextualMessage && (
              <motion.div
                className={styles.contextualMessage}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {contextualMessage}
              </motion.div>
            )}
            
            <motion.ul
              className={styles.navigationList}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{
                staggerChildren: 0.08,
                delayChildren: 0.15,
              }}
            >
              {navigationItems.map((item: NavigationItem) => (
                <motion.li
                  key={item.id}
                  variants={itemVariants}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  <a
                    href={item.href}
                    className={`
                      ${styles.navItem} 
                      ${transitionStyles.focusRing}
                      ${transitionStyles.hoverMicroInteraction}
                    `.trim()}
                    onClick={(e) => handleNavigation(e, item.href)}
                    tabIndex={0}
                    role="menuitem"
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
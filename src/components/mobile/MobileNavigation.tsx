// src/components/mobile/MobileNavigation.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/styles/components/MobileNavigation.module.css';

interface MobileNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  navigationItems: Array<{
    name: string;
    href: string;
  }>;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onToggle,
  navigationItems,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  if (!mounted) return null;

  const handleLinkClick = (href: string) => {
    onToggle(); // Close menu
    
    // Handle smooth scrolling for anchor links
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to page
      window.location.href = href;
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className={`${styles.menuButton} ${isOpen ? styles.menuButtonOpen : ''}`}
        onClick={onToggle}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span className={styles.menuButtonLine} />
        <span className={styles.menuButtonLine} />
        <span className={styles.menuButtonLine} />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onToggle}
          >
            <motion.nav
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 30 
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.mobileMenuHeader}>
                <h2 className={styles.mobileMenuTitle}>Menu</h2>
                <button
                  className={styles.closeButton}
                  onClick={onToggle}
                  aria-label="Close menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <ul className={styles.mobileMenuList}>
                {navigationItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    className={styles.mobileMenuItem}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.3 
                    }}
                  >
                    <button
                      className={styles.mobileMenuLink}
                      onClick={() => handleLinkClick(item.href)}
                    >
                      {item.name}
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none"
                        className={styles.linkIcon}
                      >
                        <path
                          d="M7 17L17 7M17 7H8M17 7V16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className={styles.mobileMenuFooter}>
                <p className={styles.mobileMenuContact}>
                  Ready to start your project?
                </p>
                <button
                  className={styles.mobileMenuCTA}
                  onClick={() => handleLinkClick('#footer-background')}
                >
                  Get In Touch
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
// src/components/global/Header.tsx - Mobile Navigation with Hamburger
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/styles/components/Header.module.css';

interface HeaderProps {
  fixed?: boolean;
  variant?: 'light' | 'dark';
}

const navigationItems = [
  { name: 'WORK', href: '#work-section' },
  { name: 'ABOUT', href: '#about-section' },
  { name: 'SERVICES', href: '#services' },
  { name: 'CONTACT', href: '#footer-background' },
];

export const Header: React.FC<HeaderProps> = ({ 
  fixed = true, 
  variant = 'dark' 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile/Tablet Header - Only visible on smaller screens */}
      <motion.header 
        className={`${styles.header} ${fixed ? styles.fixed : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.headerContent}>
          {/* HOME Link */}
          <motion.div 
            className={styles.logoArea}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <a href="#hero-section" className={styles.homeLink}>
              HOME
            </a>
          </motion.div>

          {/* Hamburger Menu Button */}
          <motion.button
            className={`${styles.hamburgerButton} ${isMobileMenuOpen ? styles.active : ''}`}
            onClick={toggleMobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            aria-label="Toggle navigation menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.mobileMenuBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
            >
              <div className={styles.mobileMenuContent}>
                {/* Close Button */}
                <button 
                  className={styles.mobileCloseButton}
                  onClick={closeMobileMenu}
                  aria-label="Close navigation menu"
                >
                  <svg viewBox="0 0 24 24" className={styles.closeIcon}>
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>

                {/* Navigation Items */}
                <nav className={styles.mobileNavigation}>
                  {navigationItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className={styles.mobileNavLink}
                      onClick={closeMobileMenu}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.1 + (index * 0.1), 
                        duration: 0.4 
                      }}
                      whileHover={{ x: 10 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>

                {/* Optional: CTA Buttons in Mobile Menu */}
                <motion.div 
                  className={styles.mobileCTAContainer}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <a 
                    href="#contact" 
                    className={styles.mobileCTAPrimary}
                    onClick={closeMobileMenu}
                  >
                    Discuss Your Vision
                  </a>
                  <a 
                    href="#work-section" 
                    className={styles.mobileCTASecondary}
                    onClick={closeMobileMenu}
                  >
                    Browse Projects
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
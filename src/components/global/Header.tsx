// src/components/global/Header.tsx - Mobile Navigation with Hamburger
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from '@/styles/components/Header.module.css';
import { HeaderProps } from '@/types/components';
import { BurgerIcon } from '@/components/icons/BurgerIcon';
import { MobileNavOverlay } from '@/components/global/MobileNavOverlay';
import { NavbarLogo } from '@/components/ui/NavbarLogo';

// Navigation items for future use
// const navigationItems = [
//   { name: 'WORK', href: '#work-section' },
//   { name: 'ABOUT', href: '#about-section' },
//   { name: 'SERVICES', href: '#services' },
//   { name: 'CONTACT', href: '#footer-background' },
// ];

export const Header: React.FC<HeaderProps> = ({ 
  fixed = true, 
  variant = 'dark' 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle viewport changes and auto-close menu on desktop
  useEffect(() => {
    const handleResize = () => {
      // Close mobile menu when transitioning to desktop (768px breakpoint)
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setIsAnimating(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Toggle function for opening/closing mobile menu
  const toggleMobileMenu = () => {
    // Prevent rapid toggling by checking animation state
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 400); // Match animation duration from design
  };

  // Close mobile menu function
  const closeMobileMenu = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsMobileMenuOpen(false);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300); // Slightly shorter for close animation
  };

  return (
    <motion.div 
      className={`${styles.header} ${fixed ? styles.fixed : ''} ${variant === 'light' ? styles.light : styles.dark} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      role="banner"
    >
      <div className={styles.headerContent}>
        {/* Logo/HOME link */}
        <motion.div 
          className={styles.logoContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <a 
            href="/" 
            className={styles.homeLink}
            aria-label="Creative Current - Go to homepage"
          >
            <NavbarLogo 
              size={36} 
              variant={variant}
              className={styles.navbarLogo}
            />
            <span className={styles.homeText}>HOME</span>
          </a>
        </motion.div>

        {/* Burger Menu Icon - Mobile Only */}
        <motion.div 
          className={styles.burgerMenuContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <BurgerIcon
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
            variant={variant}
            size={24}
            className={styles.burgerMenuIcon}
          />
        </motion.div>
      </div>

      {/* Mobile Navigation Overlay */}
      <MobileNavOverlay
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        variant={variant}
      />
    </motion.div>
  );
};
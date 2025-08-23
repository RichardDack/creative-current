// src/components/global/Header.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from '@/styles/components/Header.module.css';
import { HeaderProps } from '@/types/components';

export const Header: React.FC<HeaderProps> = ({ 
  fixed = true, 
  variant = 'dark' 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            href="#hero-section" 
            className={styles.homeLink}
            onClick={(e) => handleSmoothScroll(e, '#hero-section')}
          >
            HOME
          </a>
        </motion.div>

        {/* Logo/QR Code placeholder (top-right) */}
        <motion.div 
          className={styles.logoArea}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className={styles.qrCodePlaceholder}>
            <span>CC</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
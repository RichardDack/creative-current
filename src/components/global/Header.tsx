// src/components/global/Header.tsx
'use client';

import { motion } from 'framer-motion';
import styles from '@/styles/components/Header.module.css';

interface HeaderProps {
  fixed?: boolean;
  variant?: 'light' | 'dark';
}

export const Header: React.FC<HeaderProps> = ({ 
  fixed = true, 
  variant = 'dark' 
}) => {
  return (
    <>
      {/* Small Logo/HOME in top-left corner (like Agentic) */}
      <motion.header 
        className={`${styles.topHeader} ${fixed ? styles.fixed : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className={styles.logoContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <a href="#hero" className={styles.homeLink}>
            HOME
          </a>
        </motion.div>

        {/* QR Code placeholder (top-right like Agentic) */}
        <motion.div 
          className={styles.qrCode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className={styles.qrPlaceholder}>
            {/* Your logo or QR code here */}
            <span>CC</span>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Navigation */}
      <motion.div 
        className={styles.mobileNav}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {/* Mobile menu implementation */}
        <button className={styles.mobileMenuButton}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </motion.div>
    </>
  );
};
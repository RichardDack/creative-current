// src/components/sections/WebDesignHero.tsx - Main web design hero
'use client';

import { motion } from 'framer-motion';
import styles from '@/styles/components/WebDesignHero.module.css';

export const WebDesignHero = () => {
  return (
    <motion.section 
      className={styles.webDesignHero}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <div className={styles.heroContent}>
          <motion.div 
            className={styles.locationBadge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className={styles.locationIcon}>📍</span>
            <span>Serving All of Dorset</span>
          </motion.div>

          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Professional Web Design Across Dorset
          </motion.h1>

          <motion.h2 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            From Bournemouth to Weymouth - Stunning Websites That Drive Results
          </motion.h2>

          <motion.p 
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Creative Current specializes in creating beautiful, responsive websites for businesses 
            throughout Dorset. Whether you&apos;re in Bournemouth, Poole, Weymouth, or any town across 
            the county, we deliver web solutions that attract customers and grow your business.
          </motion.p>

          <motion.div 
            className={styles.ctaButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <motion.a
              href="#contact"
              className={styles.ctaButtonPrimary}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Your Free Quote
            </motion.a>
            
            <motion.a
              href="#towns"
              className={styles.ctaButtonSecondary}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Find Your Town
            </motion.a>
          </motion.div>

          <motion.div 
            className={styles.trustIndicators}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <span className={styles.trustItem}>✓ 47+ Projects Completed</span>
            <span className={styles.trustItem}>✓ 5★ Average Rating</span>
            <span className={styles.trustItem}>✓ 90 Days Support</span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
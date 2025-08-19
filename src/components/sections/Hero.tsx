// src/components/sections/Hero.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/components/Hero.module.css';

const navigationItems = [
  { name: 'WORK', href: '#work', active: true },
  { name: 'ABOUT', href: '#about', active: false },
];

export const Hero = () => {
  const [activeNav, setActiveNav] = useState('WORK');

  const navVariants = {
    initial: { x: -100, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 30 
      }
    }
  };

  const brandVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: 0.3,
        type: "spring", 
        stiffness: 150, 
        damping: 40 
      }
    }
  };

  const contentVariants = {
    initial: { x: 50, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: { 
        delay: 0.5,
        type: "spring", 
        stiffness: 200, 
        damping: 30 
      }
    }
  };

  return (
    <motion.section 
      className={styles.hero}
      initial="initial"
      animate="animate"
    >
      {/* Large Typographic Navigation (left side) */}
      <motion.nav 
        className={styles.typographicNav}
        variants={navVariants}
      >
        {navigationItems.map((item, index) => (
          <motion.div
            key={item.name}
            className={`${styles.navItem} ${activeNav === item.name ? styles.active : ''}`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + (index * 0.1), duration: 0.6 }}
            onMouseEnter={() => setActiveNav(item.name)}
          >
            <a href={item.href} className={styles.navLink}>
              {/* Active state background bar */}
              {activeNav === item.name && (
                <motion.div 
                  className={styles.activeBar}
                  layoutId="activeBar"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              )}
              
              <span className={styles.navText}>{item.name}</span>
              
              {/* Down arrow for active item */}
              {activeNav === item.name && (
                <motion.div 
                  className={styles.downArrow}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  ↓
                </motion.div>
              )}
            </a>
          </motion.div>
        ))}
      </motion.nav>

      {/* Main Content Area */}
      <motion.div 
        className={styles.contentArea}
        variants={contentVariants}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Elevating Digital Excellence.
          </h1>
          <p className={styles.heroDescription}>
            We specialize in web design, development, UI/UX, and product design.
          </p>
        </div>
      </motion.div>

      {/* Massive Brand Typography (bottom) */}
      <motion.div 
        className={styles.brandSection}
        variants={brandVariants}
      >
        <h2 className={styles.brandTitle}>
          <span className={styles.creative}>CREATIVE</span>
          <span className={styles.current}>CURRENT</span>
        </h2>
      </motion.div>

      {/* Decorative elements */}
      <motion.div 
        className={styles.decorativeElements}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <div className={styles.blurElement1}></div>
        <div className={styles.blurElement2}></div>
        <div className={styles.blurElement3}></div>
      </motion.div>
    </motion.section>
  );
};
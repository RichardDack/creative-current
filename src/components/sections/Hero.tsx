// src/components/sections/Hero.tsx - EXACT FRAMER MATCH
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/components/Hero.module.css';

const navigationItems = [
  { name: 'WORK', href: '#work-section' },
  { name: 'ABOUT', href: '#about-section' },
  { name: 'SERVICES', href: '#services' },
  { name: 'SERVICES', href: '#services-2' }, // Duplicate as shown in Framer
  { name: 'CONTACT', href: '#footer-background' },
];

export const Hero = () => {
  const [activeNav, setActiveNav] = useState('WORK');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleNavClick = (navName: string) => {
    setActiveNav(navName);
  };

  const isActive = (itemName: string, index: number) => {
    // Only the first WORK item should be active initially
    return itemName === 'WORK' && index === 0;
  };

  return (
    <motion.header 
      className={styles.heroSection}
      id="hero-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header - HOME only */}
      <motion.div 
        className={styles.headerTop}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.a 
          href="#hero-section" 
          className={styles.homeLink}
          whileHover={{ color: 'var(--color-primary)' }}
        >
          HOME
        </motion.a>
      </motion.div>

      {/* Main Content Container */}
      <div className={styles.mainContent}>
        {/* Left Navigation Menu */}
        <motion.nav 
          className={styles.navigationMenu}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 200 }}
        >
          {navigationItems.map((item, index) => {
            const itemIsActive = isActive(item.name, index);
            const isHovered = hoveredItem === `${item.name}-${index}`;
            
            return (
              <motion.div
                key={`${item.name}-${index}`}
                className={styles.navItemContainer}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  delay: 0.6 + (index * 0.1), 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 150
                }}
              >
                <motion.a 
                  href={item.href} 
                  className={styles.navLink}
                  onClick={() => handleNavClick(item.name)}
                  onMouseEnter={() => setHoveredItem(`${item.name}-${index}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Teal Background - Active or Hover */}
                  <motion.div 
                    className={styles.tealBackground}
                    initial={{ scaleX: itemIsActive ? 1 : 0 }}
                    animate={{ 
                      scaleX: (itemIsActive || isHovered) ? 1 : 0 
                    }}
                    transition={{ 
                      duration: 0.4, 
                      ease: "easeOut"
                    }}
                    style={{
                      transformOrigin: 'left center'
                    }}
                  />
                  
                  {/* Navigation Text */}
                  <span className={`${styles.navText} ${itemIsActive ? styles.active : ''}`}>
                    {item.name}
                  </span>

                  {/* Down Arrow - Appears on hover or active */}
                  <motion.div 
                    className={styles.downArrow}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: (isHovered || itemIsActive) ? 1 : 0,
                      x: (isHovered || itemIsActive) ? 0 : -20
                    }}
                    transition={{ 
                      duration: 0.3, 
                      ease: "easeOut",
                      delay: (isHovered || itemIsActive) ? 0.2 : 0
                    }}
                  >
                    <svg viewBox="0 0 256 256" className={styles.arrowIcon}>
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/>
                    </svg>
                  </motion.div>
                </motion.a>
              </motion.div>
            );
          })}
        </motion.nav>

        {/* Right Content Area */}
        <motion.div 
          className={styles.rightContent}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 200 }}
        >
          {/* Hero Content */}
          <div className={styles.heroContent}>
            <motion.h1 
              className={styles.heroTitle}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              Elevating Digital Excellence.
            </motion.h1>
            
            <motion.p 
              className={styles.heroDescription}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              We specialize in web design, development, UI/UX, and product design. Transform your online presence with our creative expertise.
            </motion.p>
          </div>

          {/* Red Decorative Square with Arrows */}
          <motion.div 
            className={styles.redSquare}
            initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
            animate={{ opacity: 1, scale: 1, rotate: 15 }}
            transition={{ delay: 1.4, duration: 0.8, type: "spring" }}
          >
            <motion.div 
              className={styles.arrowContainer}
              animate={{ y: [-5, 5] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              {/* Multiple arrows stacked */}
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 256 256" className={styles.arrow}>
                  <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/>
                </svg>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Brand Text with Gradient */}
      <motion.div 
        className={styles.brandContainer}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8, type: "spring" }}
      >
        <h1 className={styles.brandText}>
          CREATIVE CURRENT
        </h1>
      </motion.div>

      {/* Framer "Made in Framer" Badge */}
      <motion.div 
        className={styles.framerBadge}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <span>F Made in Framer</span>
      </motion.div>
    </motion.header>
  );
};
// src/components/sections/Hero.tsx - UPDATED WITH NEW TEXT & PROMINENT SIZING
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/components/Hero.module.css';

const navigationItems = [
  { name: 'WORK', href: '#work-section' },
  { name: 'ABOUT', href: '#about-section' },
  { name: 'SERVICES', href: '#services' },
  { name: 'CONTACT', href: '#footer-background' },
];

export const Hero = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
    <motion.header 
      className={styles.heroSection}
      id="hero-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Keep all floating background elements the same */}
      <motion.div 
        className={styles.floatingBlur1}
        animate={{ 
          y: [-10, 10, -10],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className={styles.floatingBlur2}
        animate={{ 
          y: [15, -15, 15],
          x: [-5, 5, -5],
          scale: [1, 1.08, 1]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className={styles.floatingBlur3}
        animate={{ 
          y: [8, -8, 8],
          x: [5, -5, 5],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      <motion.div 
        className={styles.floatingBlur4}
        animate={{ 
          y: [12, -12, 12],
          scale: [1, 1.15, 1]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

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
          onClick={(e) => handleSmoothScroll(e, '#hero-section')}
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
            const isHovered = hoveredItem === `${item.name}-${index}`;
            
            return (
              <motion.div
                key={`${item.name}-${index}`}
                className={`${styles.navItemContainer} ${isHovered ? styles.expanded : ''}`}
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
                  onMouseEnter={() => setHoveredItem(`${item.name}-${index}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                >
                  {/* Teal background inside link but link fills container */}
                  <div className={styles.tealBackground} />
                  
                  {/* Navigation Text */}
                  <span className={`${styles.navText} ${isHovered ? styles.hovered : ''}`}>
                    {item.name}
                  </span>

                  {/* Down Arrow - Part of link so it expands together */}
                  <motion.div 
                    className={styles.downArrow}
                    initial={{ opacity: 0, x: 15, y: 15 }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0,
                      x: isHovered ? 0 : 15,
                      y: isHovered ? 0 : 15
                    }}
                    transition={{ 
                      duration: 0.3, 
                      ease: "easeOut",
                      delay: isHovered ? 0.3 : 0
                    }}
                  >
                    <svg viewBox="0 0 24 24" className={styles.arrowIcon}>
                      <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                      <polyline points="19,12 12,19 5,12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </motion.div>
                </motion.a>
              </motion.div>
            );
          })}
        </motion.nav>

        {/* Right Content Area - UPDATED TEXT */}
        <motion.div 
          className={styles.rightContent}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 200 }}
        >
          {/* Hero Content - NEW TEXT */}
          <div className={styles.heroContent}>
            <motion.h1 
              className={styles.heroTitle}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              Where Ideas Take Shape
            </motion.h1>
            
            <motion.p 
              className={styles.heroDescription}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              We navigate the digital realm to build stunning websites, intuitive interfaces, and memorable brand experiences that flow seamlessly with your business goals.
            </motion.p>
          </div>

          {/* Red Decorative Square with Arrows - NOW SPINS WITH CSS */}
          <motion.div 
            className={styles.redSquare}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.8, type: "spring" }}
          >
            <div className={styles.arrowContainer}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 256 256" className={styles.arrow}>
                  <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/>
                </svg>
              ))}
            </div>
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
    </motion.header>
  );
};
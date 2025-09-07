// src/components/sections/Hero.tsx - COMPLETE WITH CTA BUTTON
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/components/Hero.module.css';
import { LogoComponent } from '@/components/ui/LogoComponent';
import { handleNavigationClick } from '@/lib/utils/scrollUtils';
import { MobileNavigation } from '@/components/mobile/MobileNavigation';

const navigationItems = [
  { name: 'WORK', href: '#work-section' },
  { name: 'ABOUT', href: '#meet-our-team' },
  { name: 'SERVICES', href: '/web-design' },
  { name: 'CONTACT', href: '#footer-background' },
];

export const Hero = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleNavigationClick(e, href);
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
          ease: [0.4, 0, 0.6, 1]
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
          ease: [0.4, 0, 0.6, 1]
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
          ease: [0.4, 0, 0.6, 1]
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
          ease: [0.4, 0, 0.6, 1]
        }}
      />

      {/* Header - HOME only */}
      <motion.div
        className={styles.headerTop}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Logo only - no HOME text */}
        <LogoComponent
          className={styles.logoHeader}
          size="medium"
          variant="default"
          showTagline={true}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{ filter: 'brightness(1.1)' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        />
        
        {/* Mobile Navigation */}
        <div className={styles.mobileNavContainer}>
          <MobileNavigation
            isOpen={mobileMenuOpen}
            onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
            navigationItems={navigationItems}
          />
        </div>
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
                      ease: [0.4, 0, 0.2, 1],
                      delay: isHovered ? 0.3 : 0
                    }}
                  >
                    <svg viewBox="0 0 24 24" className={styles.arrowIcon}>
                      <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      <polyline points="19,12 12,19 5,12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </motion.div>
                </motion.a>
              </motion.div>
            );
          })}
        </motion.nav>

        {/* Right Content Area - WITH CTA BUTTON */}
        <motion.div
          className={styles.rightContent}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 200 }}
        >
          {/* Hero Content - SEO Optimized with LCP Priority */}
          <div className={styles.heroContent}>
            {/* Load critical content immediately without animation delay for LCP */}
            <h1 className={styles.heroTitle}>
              Professional Web Design Dorset
            </h1>

            <motion.h2
              className={styles.heroSubtitle}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Where Ideas Take Shape
            </motion.h2>

            <motion.p
              className={styles.heroDescription}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              We create stunning, responsive websites and digital experiences for businesses across <a href="/web-design/bournemouth" className={styles.internalLink}>Bournemouth</a>, <a href="/web-design/poole" className={styles.internalLink}>Poole</a>, <a href="/web-design/weymouth" className={styles.internalLink}>Weymouth</a>, and <a href="/web-design/dorchester" className={styles.internalLink}>Dorchester</a>. Our expert team specializes in modern web design, UI/UX, and digital solutions that drive results.
            </motion.p>

            {/* Call-to-Action Buttons - Two Options */}
            <motion.div
              className={styles.ctaContainer}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <motion.a
                href="#footer-background"
                className={styles.ctaButtonPrimary}
                onClick={(e) => handleSmoothScroll(e, "#footer-background")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Discuss Your Vision
              </motion.a>

              <motion.a
                href="#work-section"
                className={styles.ctaButtonSecondary}
                onClick={(e) => handleSmoothScroll(e, "#work-section")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Browse Projects
              </motion.a>
            </motion.div>
          </div>

          {/* Red Decorative Square with Arrows - POSITIONED ON LEFT */}
          <motion.div
            className={styles.redSquare}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.8, type: "spring" }}
          >
            <div className={styles.arrowContainer}>
              {[...Array(4)].map((_, i) => (
                <svg key={i} viewBox="0 0 256 256" className={styles.arrow}>
                  <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
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
        transition={{ delay: 1.8, duration: 0.8, type: "spring" }}
      >
        <h1 className={styles.brandText}>
          CREATIVE CURRENT
        </h1>
      </motion.div>
    </motion.header>
  );
};
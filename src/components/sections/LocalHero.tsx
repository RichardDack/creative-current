// src/components/sections/LocalHero.tsx - Local Hero Component
'use client';

import { motion } from 'framer-motion';
import { LocalSEOData } from '@/lib/seo/metadata';
import { LocationIcon, StarIcon, CheckIcon } from '@/components/icons';
import styles from '@/styles/components/LocalHero.module.css';

interface LocalHeroProps {
  title: string;
  subtitle: string;
  description: string;
  townData: LocalSEOData;
  ctaPrimary: {
    text: string;
    href: string;
  };
  ctaSecondary: {
    text: string;
    href: string;
  };
}

export const LocalHero: React.FC<LocalHeroProps> = ({
  title,
  subtitle,
  description,
  townData,
  ctaPrimary,
  ctaSecondary
}) => {
  // Add null checks for required props
  if (!title || !subtitle || !description || !townData || !ctaPrimary || !ctaSecondary) {
    console.error('LocalHero: Missing required props', { title, subtitle, description, townData, ctaPrimary, ctaSecondary });
    return null;
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href || typeof window === 'undefined') return;
    
    // If it's an external link (starts with / or http), don't prevent default
    if (href.startsWith('/') || href.startsWith('http')) {
      return;
    }
    
    // Handle local anchors
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
    <motion.section 
      className={styles.localHero}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Elements */}
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

      <div className="container">
        <div className={styles.heroContent}>
          {/* Location Badge */}
          <motion.div 
            className={styles.locationBadge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <LocationIcon size={16} className={styles.locationIcon} />
            <span>Serving {townData.town}, {townData.county}</span>
            {townData.postcodes?.[0] && <span className={styles.postcode}>{townData.postcodes[0]}</span>}
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.h2 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {subtitle}
          </motion.h2>

          {/* Description */}
          <motion.p 
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {description}
          </motion.p>

          {/* Local Stats */}
          <motion.div 
            className={styles.localStats}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            {townData.population && (
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{townData.population}</span>
                <span className={styles.statLabel}>Residents</span>
              </div>
            )}
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                5<StarIcon size={16} color="#FFD700" />
              </span>
              <span className={styles.statLabel}>Rating</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>47+</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className={styles.ctaButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.a
              href={ctaPrimary.href}
              className={styles.ctaButtonPrimary}
              onClick={(e) => handleSmoothScroll(e, ctaPrimary.href)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {ctaPrimary.text}
            </motion.a>
            
            <motion.a
              href={ctaSecondary.href}
              className={styles.ctaButtonSecondary}
              onClick={(e) => handleSmoothScroll(e, ctaSecondary.href)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {ctaSecondary.text}
            </motion.a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className={styles.trustIndicators}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <span className={styles.trustItem}>
              <CheckIcon size={16} color="#31afb4" /> Free Consultation
            </span>
            <span className={styles.trustItem}>
              <CheckIcon size={16} color="#31afb4" /> Local {townData.county} Team
            </span>
            <span className={styles.trustItem}>
              <CheckIcon size={16} color="#31afb4" /> 90 Day Support
            </span>
          </motion.div>
        </div>

        {/* Right Side Info Panel */}
        <motion.div 
          className={styles.infoPanel}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className={styles.infoPanelContent}>
            <h3 className={styles.infoPanelTitle}>Quick Facts</h3>
            
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Location:</span>
              <span className={styles.infoValue}>{townData.town}, {townData.county}</span>
            </div>
            
            {townData.population && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Population:</span>
                <span className={styles.infoValue}>{townData.population}</span>
              </div>
            )}
            
            {townData.postcodes?.[0] && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Postcode:</span>
                <span className={styles.infoValue}>{townData.postcodes[0]}</span>
              </div>
            )}
            
            {townData.keyIndustries && Array.isArray(townData.keyIndustries) && townData.keyIndustries.length > 0 && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Key Industries:</span>
                <div className={styles.industriesList}>
                  {townData.keyIndustries.slice(0, 3).map((industry, index) => (
                    <span key={`${townData.town}-industry-${index}-${industry}`} className={styles.industryTag}>
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
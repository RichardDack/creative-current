// src/components/sections/LocalHero.tsx - Local Hero Component
'use client';

import { motion } from 'framer-motion';
import { LocalSEOData } from '@/lib/seo/metadata';
import { ClientOnly } from '@/components/ui/ClientOnly';
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

  // Static fallback content for SSR
  const staticContent = (
    <section className={styles.localHero}>
      <div className={styles.floatingBlur1} />
      <div className={styles.floatingBlur2} />
      
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.locationBadge}>
            <span className={styles.locationIcon}>📍</span>
            <span>Serving {townData.town}, {townData.county}</span>
            {townData.postcode && <span className={styles.postcode}>{townData.postcode}</span>}
          </div>

          <h1 className={styles.heroTitle}>{title}</h1>
          <h2 className={styles.heroSubtitle}>{subtitle}</h2>
          <p className={styles.heroDescription}>{description}</p>

          <div className={styles.localStats}>
            {townData.population && (
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{townData.population}</span>
                <span className={styles.statLabel}>Residents</span>
              </div>
            )}
            <div className={styles.statItem}>
              <span className={styles.statNumber}>5★</span>
              <span className={styles.statLabel}>Rating</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>47+</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
          </div>

          <div className={styles.ctaButtons}>
            <a
              href={ctaPrimary.href}
              className={styles.ctaButtonPrimary}
              onClick={(e) => handleSmoothScroll(e, ctaPrimary.href)}
            >
              {ctaPrimary.text}
            </a>
            
            <a
              href={ctaSecondary.href}
              className={styles.ctaButtonSecondary}
              onClick={(e) => handleSmoothScroll(e, ctaSecondary.href)}
            >
              {ctaSecondary.text}
            </a>
          </div>

          <div className={styles.trustIndicators}>
            <span className={styles.trustItem}>✓ Free Consultation</span>
            <span className={styles.trustItem}>✓ Local {townData.county} Team</span>
            <span className={styles.trustItem}>✓ 90 Day Support</span>
          </div>
        </div>

        <div className={styles.infoPanel}>
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
            
            {townData.postcode && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Postcode:</span>
                <span className={styles.infoValue}>{townData.postcode}</span>
              </div>
            )}
            
            {townData.keyBusinesses && Array.isArray(townData.keyBusinesses) && townData.keyBusinesses.length > 0 && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Key Industries:</span>
                <div className={styles.industriesList}>
                  {townData.keyBusinesses.slice(0, 3).map((business, index) => (
                    <span key={`${townData.town}-business-${index}-${business}`} className={styles.industryTag}>
                      {business}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  // Animated content for client-side
  const animatedContent = (
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
            <span className={styles.locationIcon}>📍</span>
            <span>Serving {townData.town}, {townData.county}</span>
            {townData.postcode && <span className={styles.postcode}>{townData.postcode}</span>}
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
              <span className={styles.statNumber}>5★</span>
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
            <span className={styles.trustItem}>✓ Free Consultation</span>
            <span className={styles.trustItem}>✓ Local {townData.county} Team</span>
            <span className={styles.trustItem}>✓ 90 Day Support</span>
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
            
            {townData.postcode && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Postcode:</span>
                <span className={styles.infoValue}>{townData.postcode}</span>
              </div>
            )}
            
            {townData.keyBusinesses && Array.isArray(townData.keyBusinesses) && townData.keyBusinesses.length > 0 && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Key Industries:</span>
                <div className={styles.industriesList}>
                  {townData.keyBusinesses.slice(0, 3).map((business, index) => (
                    <span key={`${townData.town}-business-${index}-${business}`} className={styles.industryTag}>
                      {business}
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

  return (
    <ClientOnly fallback={staticContent}>
      {animatedContent}
    </ClientOnly>
  );
};


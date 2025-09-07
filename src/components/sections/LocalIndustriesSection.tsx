// src/components/sections/LocalIndustriesSection.tsx - Industries Section (FIXED)
'use client';

import React from 'react'; // ADDED: Import React for ReactElement type
import { motion, Variants } from 'framer-motion';
import styles from '@/styles/components/LocalIndustriesSection.module.css';

interface LocalIndustriesSectionProps {
  title: string;
  content: string;
  industries: string[];
  townName: string;
  landmarks?: string[];
}

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 30
    }
  }
};

// FIXED: Helper function to get industry icons - moved above component
const getIndustryIcon = (industry: string): React.ReactElement => {
  const iconMap: Record<string, React.ReactElement> = { // FIXED: JSX.Element -> React.ReactElement
    'Tourism': <span>🏖️</span>,
    'Technology': <span>💻</span>,
    'Healthcare': <span>🏥</span>,
    'Education': <span>🎓</span>,
    'Retail': <span>🛒</span>,
    'Manufacturing': <span>🏭</span>,
    'Agriculture': <span>🌾</span>,
    'Marine Industry': <span>⚓</span>,
    'Financial Services': <span>💰</span>,
    'Digital Media': <span>📱</span>,
    'Creative Industries': <span>🎨</span>,
    'Professional Services': <span>💼</span>,
    'Fishing': <span>🎣</span>,
    'Marine Services': <span>🚤</span>,
    'Aerospace': <span>✈️</span>
  };

  return iconMap[industry] || <span>🏢</span>;
};

export const LocalIndustriesSection: React.FC<LocalIndustriesSectionProps> = ({
  title,
  content,
  industries,
  townName,
  landmarks
}) => {
  // Add null checks for required props
  if (!title || !content || !industries || !Array.isArray(industries) || !townName) {
    console.error('LocalIndustriesSection: Missing required props', { title, content, industries, townName });
    return null;
  }
  return (
    <motion.section 
      className={styles.industriesSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container">
        <div className={styles.industriesGrid}>
          <motion.div className={styles.industriesContent} variants={itemVariants}>
            <span className={styles.sectionLabel}>({townName.toUpperCase()} INDUSTRIES)</span>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <p className={styles.sectionDescription}>{content}</p>

            {landmarks && Array.isArray(landmarks) && landmarks.length > 0 && (
              <motion.div className={styles.landmarksSection} variants={itemVariants}>
                <h3 className={styles.landmarksTitle}>Serving businesses near:</h3>
                <div className={styles.landmarksList}>
                  {landmarks.filter(landmark => landmark && typeof landmark === 'string').map((landmark, index) => (
                    <span key={`${townName}-landmark-${index}-${landmark}`} className={styles.landmarkTag}>
                      {landmark}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div className={styles.ctaSection} variants={itemVariants}>
              <p className={styles.ctaText}>
                Ready to elevate your {townName} business online?
              </p>
              <motion.a
                href="#footer-background"
                className={styles.ctaButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Your Free Quote
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div className={styles.industriesVisual} variants={itemVariants}>
            <div className={styles.industriesGrid}>
              {industries.filter(industry => industry && typeof industry === 'string').map((industry, index) => (
                <motion.div
                  key={`${townName}-industry-${index}-${industry}`}
                  className={styles.industryCard}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className={styles.industryIcon}>
                    {getIndustryIcon(industry)}
                  </div>
                  <span className={styles.industryName}>{industry}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
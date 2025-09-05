// src/components/sections/TownLinksSection.tsx - Town links grid
'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { LocalSEOData } from '@/lib/seo/metadata';
import styles from '@/styles/components/TownLinksSection.module.css';

interface TownLinksSectionProps {
  towns: Record<string, LocalSEOData>;
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 30
    }
  }
};

export const TownLinksSection: React.FC<TownLinksSectionProps> = ({ towns }) => {
  // Sort towns by population (largest first)
  const sortedTowns = Object.entries(towns).sort((a, b) => {
    const popA = parseInt(a[1].population?.replace(/,/g, '') || '0');
    const popB = parseInt(b[1].population?.replace(/,/g, '') || '0');
    return popB - popA;
  });

  return (
    <motion.section 
      id="towns"
      className={styles.townLinksSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container">
        <motion.div className={styles.sectionHeader} variants={itemVariants}>
          <span className={styles.sectionLabel}>(DORSET COVERAGE)</span>
          <h2 className={styles.sectionTitle}>Web Design Services Across Dorset</h2>
          <p className={styles.sectionDescription}>
            Click on your town to learn about our specialized web design services 
            in your local area. We understand each Dorset community and create 
            websites that resonate with your local customers.
          </p>
        </motion.div>

        <motion.div className={styles.townGrid} variants={itemVariants}>
          {sortedTowns.map(([townKey, townData]) => (
            <motion.div
              key={townKey}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Link 
                href={`/web-design/${townKey}`}
                className={styles.townCard}
              >
                <div className={styles.townCardInner}>
                  <div className={styles.townHeader}>
                    <h3 className={styles.townName}>{townData.town}</h3>
                    {townData.population && (
                      <span className={styles.townPopulation}>
                        {townData.population} residents
                      </span>
                    )}
                  </div>
                  
                  {townData.postcode && (
                    <div className={styles.townPostcode}>{townData.postcode}</div>
                  )}
                  
                  {townData.keyBusinesses && townData.keyBusinesses.length > 0 && (
                    <div className={styles.townIndustries}>
                      <span className={styles.industriesLabel}>Key Industries:</span>
                      <div className={styles.industriesTags}>
                        {townData.keyBusinesses.slice(0, 2).map((business, idx) => (
                          <span key={idx} className={styles.industryTag}>
                            {business}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className={styles.townCta}>
                    <span className={styles.ctaText}>View {townData.town} Services</span>
                    <svg className={styles.ctaIcon} width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path 
                        d="M7 17L17 7M17 7H8M17 7V16" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Coverage Area Map */}
        <motion.div className={styles.coverageInfo} variants={itemVariants}>
          <h3 className={styles.coverageTitle}>Complete Dorset Coverage</h3>
          <p className={styles.coverageDescription}>
            From the bustling coastal towns of Bournemouth and Poole to the historic 
            market towns of Dorchester and Sherborne, we provide professional web design 
            services throughout Dorset. Our team understands the unique character and 
            business needs of each community.
          </p>
          
          <div className={styles.coverageStats}>
            <div className={styles.coverageStat}>
              <span className={styles.statNumber}>16+</span>
              <span className={styles.statLabel}>Towns Served</span>
            </div>
            <div className={styles.coverageStat}>
              <span className={styles.statNumber}>500k+</span>
              <span className={styles.statLabel}>Potential Customers</span>
            </div>
            <div className={styles.coverageStat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Dorset Coverage</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
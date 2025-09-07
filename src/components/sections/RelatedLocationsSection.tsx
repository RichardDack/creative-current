// src/components/sections/RelatedLocationsSection.tsx - Related Locations Section
'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import styles from '@/styles/components/RelatedLocationsSection.module.css';

interface RelatedLocation {
  name: string;
  slug: string;
  distance: string;
  description: string;
}

interface RelatedLocationsSectionProps {
  currentLocation: string;
  relatedLocations: RelatedLocation[];
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
  hidden: { opacity: 0, y: 20 },
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

export const RelatedLocationsSection: React.FC<RelatedLocationsSectionProps> = ({
  currentLocation,
  relatedLocations
}) => {
  if (!relatedLocations || relatedLocations.length === 0) {
    return null;
  }

  return (
    <motion.section 
      className={styles.relatedLocationsSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container">
        <motion.div className={styles.sectionHeader} variants={itemVariants}>
          <span className={styles.sectionLabel}>(NEARBY AREAS)</span>
          <h2 className={styles.sectionTitle}>
            Web Design Services in Areas Near {currentLocation}
          </h2>
          <p className={styles.sectionDescription}>
            We also provide professional web design services to businesses in these nearby locations.
          </p>
        </motion.div>

        <div className={styles.locationsGrid}>
          {relatedLocations.map((location) => (
            <motion.div
              key={`related-location-${location.slug}`}
              className={styles.locationCard}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Link href={`/web-design/${location.slug}`} className={styles.locationLink}>
                <div className={styles.locationContent}>
                  <h3 className={styles.locationName}>{location.name}</h3>
                  <p className={styles.locationDistance}>{location.distance} from {currentLocation}</p>
                  <p className={styles.locationDescription}>{location.description}</p>
                  
                  <div className={styles.locationCTA}>
                    <span className={styles.ctaText}>View {location.name} Services</span>
                    <svg 
                      className={styles.ctaIcon}
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
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
        </div>

        <motion.div className={styles.allLocationsLink} variants={itemVariants}>
          <Link href="/web-design" className={styles.viewAllButton}>
            View All Dorset Locations
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};
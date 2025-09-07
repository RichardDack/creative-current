// src/components/sections/CollapsibleSEOContent.tsx - SEO content that's collapsible for UX
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { LocalIndustriesSection } from './LocalIndustriesSection';
import { LocalPricingCalculator } from './LocalPricingSection';
import { RelatedLocationsSection } from './RelatedLocationsSection';
import { DorsetLocation } from '@/lib/data/locations';
import { LocationContent } from '@/lib/content/locationContent';
import styles from '@/styles/components/CollapsibleSEOContent.module.css';

interface CollapsibleSEOContentProps {
  locationData: DorsetLocation;
  enhancedContent: LocationContent;
  town: string;
}

export const CollapsibleSEOContent: React.FC<CollapsibleSEOContentProps> = ({
  locationData,
  enhancedContent,
  town
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    industries: false,
    pricing: false,
    locations: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sectionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  return (
    <div className={styles.seoContentContainer}>
      {/* Industries Section - Collapsible */}
      <div className={styles.collapsibleSection}>
        <button 
          className={styles.sectionToggle}
          onClick={() => toggleSection('industries')}
          aria-expanded={expandedSections.industries}
        >
          <span>Learn About {locationData.name} Business Landscape</span>
          <motion.svg
            className={styles.toggleIcon}
            animate={{ rotate: expandedSections.industries ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </button>
        
        <AnimatePresence>
          {expandedSections.industries && (
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={styles.collapsibleContent}
            >
              <LocalIndustriesSection
                title={enhancedContent.localBusiness.title}
                content={enhancedContent.localBusiness.content}
                industries={enhancedContent.localBusiness.industries}
                townName={locationData.name}
                landmarks={enhancedContent.localBusiness.landmarks}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pricing Calculator - Collapsible */}
      <div className={styles.collapsibleSection}>
        <button 
          className={styles.sectionToggle}
          onClick={() => toggleSection('pricing')}
          aria-expanded={expandedSections.pricing}
        >
          <span>Get Instant {locationData.name} Pricing Estimate</span>
          <motion.svg
            className={styles.toggleIcon}
            animate={{ rotate: expandedSections.pricing ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </button>
        
        <AnimatePresence>
          {expandedSections.pricing && (
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={styles.collapsibleContent}
            >
              <LocalPricingCalculator location={locationData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Related Locations - Collapsible */}
      {enhancedContent.relatedLocations && enhancedContent.relatedLocations.length > 0 && (
        <div className={styles.collapsibleSection}>
          <button 
            className={styles.sectionToggle}
            onClick={() => toggleSection('locations')}
            aria-expanded={expandedSections.locations}
          >
            <span>Web Design in Areas Near {locationData.name}</span>
            <motion.svg
              className={styles.toggleIcon}
              animate={{ rotate: expandedSections.locations ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>
          
          <AnimatePresence>
            {expandedSections.locations && (
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={styles.collapsibleContent}
              >
                <RelatedLocationsSection
                  currentLocation={locationData.name}
                  relatedLocations={enhancedContent.relatedLocations}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
// src/components/sections/LocalPricingCalculator.tsx - Interactive pricing calculator
'use client';

import { motion, Variants } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { DorsetLocation } from '@/lib/data/locations';
import styles from '@/styles/components/LocalPricingCalculator.module.css';

interface LocalPricingCalculatorProps {
  location: DorsetLocation;
}

interface PricingOptions {
  pages: number;
  features: string[];
  complexity: 'basic' | 'standard' | 'premium';
  timeline: 'standard' | 'rush';
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

export const LocalPricingCalculator: React.FC<LocalPricingCalculatorProps> = ({ location }) => {
  const [options, setOptions] = useState<PricingOptions>({
    pages: 5,
    features: [],
    complexity: 'standard',
    timeline: 'standard'
  });

  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

  // Adjust base pricing based on local demographics
  const isHigherIncome = location.demographics.averageIncome > 30000;
  const isTouristArea = location.demographics.touristDestination;
  
  const basePrices = useMemo(() => ({
    basic: isHigherIncome ? 800 : 600,
    standard: isHigherIncome ? 1500 : 1200,
    premium: isHigherIncome ? 3000 : 2500
  }), [isHigherIncome]);

  const availableFeatures = useMemo(() => [
    { id: 'cms', name: 'Content Management System', price: 300 },
    { id: 'ecommerce', name: 'E-commerce Functionality', price: 800 },
    { id: 'booking', name: isTouristArea ? 'Online Booking System' : 'Appointment Booking', price: 500 },
    { id: 'seo', name: 'Advanced SEO Package', price: 400 },
    { id: 'analytics', name: 'Analytics & Reporting Setup', price: 200 },
    { id: 'social', name: 'Social Media Integration', price: 150 },
    { id: 'forms', name: 'Custom Forms & Automation', price: 250 },
    { id: 'multilingual', name: 'Multi-language Support', price: 600 }
  ], [isTouristArea]);

  // Calculate price based on selections
  useEffect(() => {
    let basePrice = basePrices[options.complexity];
    
    // Page multiplier
    const pageMultiplier = Math.max(1, options.pages / 5);
    basePrice *= pageMultiplier;
    
    // Add feature costs
    const featureCost = options.features.reduce((total, featureId) => {
      const feature = availableFeatures.find(f => f.id === featureId);
      return total + (feature?.price || 0);
    }, 0);
    
    // Timeline multiplier
    const timelineMultiplier = options.timeline === 'rush' ? 1.3 : 1;
    
    const totalPrice = (basePrice + featureCost) * timelineMultiplier;
    setCalculatedPrice(Math.round(totalPrice));
    
    // Set price range (±20%)
    setPriceRange({
      min: Math.round(totalPrice * 0.8),
      max: Math.round(totalPrice * 1.2)
    });
  }, [options, basePrices, availableFeatures]);

  const handleFeatureToggle = (featureId: string) => {
    setOptions(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(id => id !== featureId)
        : [...prev.features, featureId]
    }));
  };

  return (
    <motion.section 
      className={styles.calculatorSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container">
        <motion.div className={styles.sectionHeader} variants={itemVariants}>
          <span className={styles.sectionLabel}>({location.name.toUpperCase()} PRICING CALCULATOR)</span>
          <h2 className={styles.sectionTitle}>
            Get an Instant Quote for Your {location.name} Website
          </h2>
          <p className={styles.sectionDescription}>
            Use our interactive calculator to get a personalized estimate for your website project. 
            Pricing is tailored to the {location.name} market.
          </p>
        </motion.div>

        <div className={styles.calculatorContainer}>
          <motion.div className={styles.calculatorPanel} variants={itemVariants}>
            
            {/* Pages Slider */}
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>
                Number of Pages: <span className={styles.optionValue}>{options.pages}</span>
              </label>
              <input
                type="range"
                min="3"
                max="20"
                value={options.pages}
                onChange={(e) => setOptions(prev => ({ ...prev, pages: parseInt(e.target.value) }))}
                className={styles.slider}
              />
              <div className={styles.sliderLabels}>
                <span>3</span>
                <span>20+</span>
              </div>
            </div>

            {/* Complexity Selection */}
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>Website Complexity</label>
              <div className={styles.buttonGroup}>
                {(['basic', 'standard', 'premium'] as const).map((complexity) => (
                  <button
                    key={complexity}
                    className={`${styles.optionButton} ${options.complexity === complexity ? styles.active : ''}`}
                    onClick={() => setOptions(prev => ({ ...prev, complexity }))}
                  >
                    {complexity.charAt(0).toUpperCase() + complexity.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Features Checklist */}
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>Additional Features</label>
              <div className={styles.featuresGrid}>
                {availableFeatures.map((feature) => (
                  <label key={feature.id} className={styles.featureOption}>
                    <input
                      type="checkbox"
                      checked={options.features.includes(feature.id)}
                      onChange={() => handleFeatureToggle(feature.id)}
                      className={styles.featureCheckbox}
                    />
                    <span className={styles.featureName}>{feature.name}</span>
                    <span className={styles.featurePrice}>+£{feature.price}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Timeline Selection */}
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>Project Timeline</label>
              <div className={styles.buttonGroup}>
                <button
                  className={`${styles.optionButton} ${options.timeline === 'standard' ? styles.active : ''}`}
                  onClick={() => setOptions(prev => ({ ...prev, timeline: 'standard' }))}
                >
                  Standard (4-6 weeks)
                </button>
                <button
                  className={`${styles.optionButton} ${options.timeline === 'rush' ? styles.active : ''}`}
                  onClick={() => setOptions(prev => ({ ...prev, timeline: 'rush' }))}
                >
                  Rush (+30%)
                </button>
              </div>
            </div>

          </motion.div>

          {/* Price Display */}
          <motion.div className={styles.pricePanel} variants={itemVariants}>
            <div className={styles.priceDisplay}>
              <div className={styles.estimatedPrice}>
                <span className={styles.priceLabel}>Estimated Investment</span>
                <span className={styles.mainPrice}>£{calculatedPrice.toLocaleString()}</span>
                <span className={styles.priceRange}>
                  Range: £{priceRange.min.toLocaleString()} - £{priceRange.max.toLocaleString()}
                </span>
              </div>
              
              <div className={styles.priceIncludes}>
                <h4>This estimate includes:</h4>
                <ul>
                  <li>Professional responsive design</li>
                  <li>Mobile optimization</li>
                  <li>Basic SEO setup</li>
                  <li>3 months support</li>
                  <li>Free {location.name} consultation</li>
                </ul>
              </div>

              <motion.button
                className={styles.getQuoteButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Detailed Quote
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div className={styles.calculatorFooter} variants={itemVariants}>
          <p className={styles.footerText}>
            This is an estimate based on typical {location.name} projects. 
            Final pricing may vary based on specific requirements and complexity.
          </p>
          <div className={styles.guarantees}>
            <div className={styles.guarantee}>
              <span className={styles.guaranteeIcon}>✓</span>
              <span>No obligation quote</span>
            </div>
            <div className={styles.guarantee}>
              <span className={styles.guaranteeIcon}>✓</span>
              <span>Free consultation</span>
            </div>
            <div className={styles.guarantee}>
              <span className={styles.guaranteeIcon}>✓</span>
              <span>Local {location.name} expertise</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
// src/components/sections/LocalServicesSection.tsx - Local Services Section
'use client';

import { motion, Variants } from 'framer-motion';
import { Icons } from '@/components/icons';
import styles from '@/styles/components/LocalServicesSection.module.css';

interface ServiceItem {
  title: string;
  description: string;
  icon?: string;
}

interface LocalServicesSectionProps {
  title: string;
  services: ServiceItem[];
  townName: string;
  county: string;
}

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
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

export const LocalServicesSection: React.FC<LocalServicesSectionProps> = ({
  title,
  services,
  townName,
  county
}) => {
  // Add null checks for required props
  if (!title || !services || !Array.isArray(services) || !townName || !county) {
    console.error('LocalServicesSection: Missing required props', { title, services, townName, county });
    return null;
  }
  return (
    <motion.section 
      className={styles.servicesSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container">
        <motion.div className={styles.sectionHeader} variants={itemVariants}>
          <span className={styles.sectionLabel}>({townName.toUpperCase()} SERVICES)</span>
          <h2 className={styles.sectionTitle}>{title}</h2>
          <p className={styles.sectionDescription}>
            Comprehensive web design and digital services tailored for {townName} businesses. 
            From concept to launch, we handle every aspect of your online presence.
          </p>
        </motion.div>

        <div className={styles.servicesGrid}>
          {services.filter(service => service && service.title && service.description).map((service, index) => (
            <motion.div
              key={`${townName}-service-${index}-${service.title}`}
              className={styles.serviceCard}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className={styles.serviceIcon}>
                <Icons.Browser size={32} color="var(--color-primary)" />
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              
              <motion.button 
                className={styles.serviceButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M7 17L17 7M17 7H8M17 7V16" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Local Business Focus */}
        <motion.div className={styles.localFocus} variants={itemVariants}>
          <h3 className={styles.localFocusTitle}>
            Specialized for {townName} Businesses
          </h3>
          <p className={styles.localFocusDescription}>
            We understand the unique market dynamics of {townName} and {county}. 
            Our websites are designed to attract local customers and compete effectively 
            in your specific market area.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};


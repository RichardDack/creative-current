// src/components/sections/WebDesignServicesSection.tsx - Services overview
'use client';

import { motion, Variants } from 'framer-motion';
import { Icons } from '@/components/icons';
import styles from '@/styles/components/WebDesignServicesSection.module.css';

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

export const WebDesignServicesSection = () => {
  const services = [
    {
      icon: <Icons.Browser size={40} />,
      title: 'Custom Website Design',
      description: 'Bespoke websites tailored to your Dorset business and target audience. We create unique designs that reflect your brand and engage your local customers.',
      features: ['Responsive Design', 'Brand Integration', 'User Experience Focus']
    },
    {
      icon: <Icons.Window size={40} />,
      title: 'E-commerce Development',
      description: 'Online stores that help Dorset retailers and service providers sell effectively. From product catalogs to secure payment processing.',
      features: ['Shopping Cart', 'Payment Gateway', 'Inventory Management']
    },
    {
      icon: <Icons.Megaphone size={40} />,
      title: 'Local SEO Optimization',
      description: 'Help your Dorset business rank higher in local search results. We optimize for location-based searches across all Dorset towns.',
      features: ['Local Keywords', 'Google My Business', 'Local Citations']
    },
    {
      icon: <Icons.Flag size={40} />,
      title: 'Ongoing Support',
      description: 'Comprehensive support and maintenance for your Dorset business. We keep your website secure, updated, and performing optimally.',
      features: ['Security Updates', 'Content Changes', 'Performance Monitoring']
    }
  ];

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
          <span className={styles.sectionLabel}>(OUR SERVICES)</span>
          <h2 className={styles.sectionTitle}>Comprehensive Web Design Solutions</h2>
          <p className={styles.sectionDescription}>
            Everything your Dorset business needs to succeed online. From initial design 
            to ongoing support, we provide complete web solutions for businesses across the county.
          </p>
        </motion.div>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={styles.serviceCard}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className={styles.serviceIcon}>
                {service.icon}
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              
              <ul className={styles.serviceFeatures}>
                {service.features.map((feature, idx) => (
                  <li key={idx} className={styles.serviceFeature}>
                    <Icons.Check size={16} color="var(--color-primary)" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div className={styles.ctaSection} variants={itemVariants}>
          <h3 className={styles.ctaTitle}>Ready to Get Started?</h3>
          <p className={styles.ctaDescription}>
            Contact us today for a free consultation about your Dorset web design project.
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
      </div>
    </motion.section>
  );
};
        
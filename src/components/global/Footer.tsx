// src/components/global/Footer.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import styles from '@/styles/components/Footer.module.css';

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className={styles.footer}
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="container">
        <div className={styles.footerContent}>
          {/* Brand Section */}
          <motion.div 
            className={styles.brandSection}
            variants={itemVariants}
          >
            <Link href="/" className={styles.logo}>
              <span className={styles.logoText}>Agentic</span>
            </Link>
            <p className={styles.brandDescription}>
              Elevating digital experiences through innovative design and development.
            </p>
            <div className={styles.socialLinks}>
              <motion.a
                href="https://linkedin.com/company/agentic"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
              
              <motion.a
                href="https://twitter.com/agentic"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </motion.a>
              
              <motion.a
                href="https://dribbble.com/agentic"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm9.568 7.375c.53 1.104.846 2.342.846 3.652 0 .469-.04.926-.115 1.372-.145-.013-.29-.024-.437-.033-2.33-.145-4.73.07-6.61.57-.145-.35-.29-.7-.44-1.05 2.16-.93 4.17-2.284 5.756-4.511zm-1.415-1.415c-1.415 1.415-3.315 2.315-5.315 2.715-.7-1.3-1.5-2.5-2.4-3.6 1.8-.6 3.8-.9 5.8-.9.63 0 1.25.05 1.85.15.02.21.04.42.065.635zm-2.568-2.568c-.6-.1-1.2-.15-1.85-.15-2.2 0-4.3.35-6.2 1-1.1-1.1-2.4-2-3.9-2.6C7.374 1.026 9.6.374 12 .374c2.4 0 4.626.652 6.585 1.818zm-8.585 1.818c1.9-.65 4-.95 6.2-.95.65 0 1.25.05 1.85.15-.025.215-.045.425-.065.635-1.585 2.227-3.596 3.581-5.756 4.511-.95-1.8-2.1-3.4-3.4-4.8.39-.18.79-.35 1.17-.546zm-1.17.546c1.3 1.4 2.45 3 3.4 4.8-2.16.93-4.17 2.284-5.756 4.511-.53-1.104-.846-2.342-.846-3.652 0-2.4.652-4.626 1.818-6.585.128.042.256.084.384.126zm-.384 8.126c1.585-2.227 3.596-3.581 5.756-4.511.15.35.295.7.44 1.05-1.88.5-4.28.715-6.61.57-.147.009-.292.02-.437.033-.075-.446-.115-.903-.115-1.372 0-.469.04-.926.115-1.372.145.013.29.024.437.033 2.33.145 4.73-.07 6.61-.57.145.35.29.7.44 1.05-2.16.93-4.17 2.284-5.756 4.511-.53-1.104-.846-2.342-.846-3.652s.316-2.548.846-3.652z"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className={styles.linksSection}
            variants={itemVariants}
          >
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <nav className={styles.linksList}>
              <Link href="#work-section" className={styles.footerLink}>Work</Link>
              <Link href="#contact" className={styles.footerLink}>Contact</Link>
              <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
              <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
            </nav>
          </motion.div>

          {/* Services */}
          <motion.div 
            className={styles.servicesSection}
            variants={itemVariants}
          >
            <h4 className={styles.sectionTitle}>Services</h4>
            <div className={styles.servicesList}>
              <span className={styles.serviceItem}>Web Design</span>
              <span className={styles.serviceItem}>Development</span>
              <span className={styles.serviceItem}>UI/UX Design</span>
              <span className={styles.serviceItem}>Branding</span>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className={styles.contactSection}
            variants={itemVariants}
          >
            <h4 className={styles.sectionTitle}>Get In Touch</h4>
            <div className={styles.contactInfo}>
              <p className={styles.contactItem}>hello@agentic.design</p>
              <p className={styles.contactItem}>+1 (555) 123-4567</p>
              <p className={styles.contactItem}>San Francisco, CA</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className={styles.bottomBar}
          variants={itemVariants}
        >
          <p className={styles.copyright}>
            © {currentYear} Agentic. All rights reserved.
          </p>
          <p className={styles.madeWith}>
            Made with ❤️ in San Francisco
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};
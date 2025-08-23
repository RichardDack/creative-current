// src/components/sections/ContactSection.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import styles from '@/styles/components/ContactSection.module.css';

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

const formVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 25,
      delay: 0.3
    }
  }
};

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <motion.section 
      id="contact"
      className={styles.contactSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container">
        <div className={styles.contactGrid}>
          {/* Contact Info */}
          <motion.div 
            className={styles.contactInfo}
            variants={itemVariants}
          >
            <motion.h2 
              className={styles.sectionTitle}
              variants={itemVariants}
            >
              Let&apos;s Create Something Amazing Together
            </motion.h2>
            
            <motion.p 
              className={styles.sectionDescription}
              variants={itemVariants}
            >
              Ready to transform your digital presence? We&apos;d love to hear about your project and explore how we can bring your vision to life.
            </motion.p>

            <motion.div 
              className={styles.contactDetails}
              variants={itemVariants}
            >
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div className={styles.contactText}>
                  <h4>Email Us</h4>
                  <p>hello@agentic.design</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div className={styles.contactText}>
                  <h4>Call Us</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className={styles.contactText}>
                  <h4>Visit Us</h4>
                  <p>San Francisco, CA</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className={styles.contactForm}
            variants={formVariants}
          >
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="company"
                  placeholder="Company (Optional)"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  rows={5}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className={styles.submitButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
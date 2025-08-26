// src/components/sections/ContactSection.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
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

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

// Extend the Window interface to include grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  // Environment variables - Add these to your .env.local file
  const FORMSPREE_URL = 'https://formspree.io/f/xnnbqpwa'; // Your existing endpoint
  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
  const RECAPTCHA_THRESHOLD = 0.5; // Adjust based on your spam tolerance (0.0-1.0)

  // Load reCAPTCHA script
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      console.warn('reCAPTCHA site key not found. Please add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your environment variables.');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setRecaptchaLoaded(true);
    };

    script.onerror = () => {
      console.error('Failed to load reCAPTCHA script');
      setStatus({
        type: 'error',
        message: 'Failed to load security verification. Please try again.'
      });
    };

    document.head.appendChild(script);

    // Cleanup
    return () => {
      const existingScript = document.querySelector(`script[src*="recaptcha"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [RECAPTCHA_SITE_KEY]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const executeRecaptcha = async (): Promise<string | null> => {
    if (!recaptchaLoaded || !RECAPTCHA_SITE_KEY) {
      return null;
    }

    try {
      return await new Promise((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(RECAPTCHA_SITE_KEY, { action: 'contact_form' })
            .then(resolve)
            .catch(reject);
        });
      });
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading' });

    try {
      // Execute reCAPTCHA
      let recaptchaToken = null;
      if (recaptchaLoaded && RECAPTCHA_SITE_KEY) {
        recaptchaToken = await executeRecaptcha();
        
        if (!recaptchaToken) {
          throw new Error('Security verification failed');
        }
      }

      // Prepare form data
      const submitData: any = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
        _subject: `New contact form submission from ${formData.name}`,
      };

      // Add reCAPTCHA token if available
      if (recaptchaToken) {
        submitData['g-recaptcha-response'] = recaptchaToken;
        submitData._recaptcha_threshold = RECAPTCHA_THRESHOLD;
      }

      // Submit to Formspree
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: 'Thank you! Your message has been sent successfully.' 
        });
        // Reset form
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        // Handle different error responses
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 422 && errorData.errors?.some((e: any) => e.field === 'g-recaptcha-response')) {
          throw new Error('Security verification failed. Please try again.');
        } else {
          throw new Error('Form submission failed');
        }
      }
    } catch (error) {
      let errorMessage = 'Sorry, there was an error sending your message. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('Security verification')) {
          errorMessage = 'Security verification failed. Please refresh the page and try again.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        }
      }
      
      setStatus({ 
        type: 'error', 
        message: errorMessage
      });
    }
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
                  <p>hello@creativecurrent.co.uk</p>
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
                  <p>01305 584997</p>
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
                  <p>Dorchester, England, GB</p>
                </div>
              </div>
            </motion.div>

            {/* reCAPTCHA Privacy Notice */}
            {RECAPTCHA_SITE_KEY && (
              <motion.div 
                className={styles.privacyNotice}
                variants={itemVariants}
              >
                <p className={styles.privacyText}>
                  This site is protected by reCAPTCHA and the Google{' '}
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.privacyLink}
                  >
                    Privacy Policy
                  </a>
                  {' '}and{' '}
                  <a 
                    href="https://policies.google.com/terms" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.privacyLink}
                  >
                    Terms of Service
                  </a>
                  {' '}apply.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className={styles.contactForm}
            variants={formVariants}
          >
            {/* Status Messages */}
            {status.type !== 'idle' && (
              <motion.div 
                className={`${styles.statusMessage} ${styles[status.type]}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {status.type === 'success' && (
                  <div className={styles.successIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                )}
                {status.type === 'error' && (
                  <div className={styles.errorIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                )}
                <p>{status.message}</p>
              </motion.div>
            )}

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
                  disabled={status.type === 'loading'}
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
                  disabled={status.type === 'loading'}
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
                  disabled={status.type === 'loading'}
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
                  disabled={status.type === 'loading'}
                />
              </div>

              <motion.button
                type="submit"
                className={`${styles.submitButton} ${status.type === 'loading' ? styles.loading : ''}`}
                whileHover={status.type !== 'loading' ? { scale: 1.02 } : {}}
                whileTap={status.type !== 'loading' ? { scale: 0.98 } : {}}
                disabled={status.type === 'loading'}
              >
                {status.type === 'loading' ? (
                  <>
                    <div className={styles.spinner} />
                    {recaptchaLoaded ? 'Verifying & Sending...' : 'Sending...'}
                  </>
                ) : (
                  'Send Message'
                )}
              </motion.button>

              {/* reCAPTCHA Status Indicator */}
              {RECAPTCHA_SITE_KEY && (
                <div className={styles.recaptchaStatus}>
                  {recaptchaLoaded ? (
                    <span className={styles.recaptchaReady}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      Security verification ready
                    </span>
                  ) : (
                    <span className={styles.recaptchaLoading}>
                      <div className={styles.miniSpinner} />
                      Loading security verification...
                    </span>
                  )}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
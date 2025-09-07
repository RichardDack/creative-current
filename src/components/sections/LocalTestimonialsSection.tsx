// src/components/sections/LocalTestimonialsSection.tsx - Testimonials Section
'use client';

import { motion, Variants } from 'framer-motion';
import styles from '@/styles/components/LocalTestimonialsSection.module.css';

interface LocalTestimonialsSectionProps {
  townName: string;
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

export const LocalTestimonialsSection: React.FC<LocalTestimonialsSectionProps> = ({
  townName
}) => {
  // Add null check for required props
  if (!townName || typeof townName !== 'string') {
    console.error('LocalTestimonialsSection: Missing or invalid townName prop', { townName });
    return null;
  }

  // No fake testimonials - real testimonials should be added when available
  const testimonials: Array<{
    name: string;
    business: string;
    quote: string;
    rating: number;
  }> = [];

  return (
    <motion.section 
      className={styles.testimonialsSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container">
        <motion.div className={styles.sectionHeader} variants={itemVariants}>
          <span className={styles.sectionLabel}>({townName.toUpperCase()} PARTNERSHIP)</span>
          <h2 className={styles.sectionTitle}>
            Building Relationships with {townName} Businesses
          </h2>
          <p className={styles.sectionDescription}>
            We&apos;re committed to helping {townName} businesses succeed online through 
            professional web design and ongoing support.
          </p>
        </motion.div>

        {testimonials.length > 0 ? (
          <div className={styles.testimonialsGrid}>
            {testimonials.filter(testimonial => testimonial && testimonial.name && testimonial.quote).map((testimonial, index) => (
              <motion.div
                key={`${townName}-testimonial-${index}-${testimonial.name}`}
                className={styles.testimonialCard}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className={styles.testimonialContent}>
                  <div className={styles.rating}>
                    {testimonial.rating && typeof testimonial.rating === 'number' && 
                     [...Array(Math.min(testimonial.rating, 5))].map((_, i) => (
                      <span key={`${testimonial.name}-star-${i}`} className={styles.star}>★</span>
                    ))}
                  </div>
                  <blockquote className={styles.quote}>
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <div className={styles.author}>
                    <strong className={styles.authorName}>{testimonial.name}</strong>
                    <span className={styles.authorBusiness}>{testimonial.business}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div className={styles.noTestimonials} variants={itemVariants}>
            <p className={styles.noTestimonialsText}>
              We&apos;re building relationships with {townName} businesses every day. 
              Contact us to discuss how we can help your business succeed online.
            </p>
            <motion.a 
              href="#contact" 
              className={styles.ctaButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Free Consultation
            </motion.a>
          </motion.div>
        )}

        <motion.div className={styles.statsSection} variants={itemVariants}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>5+</span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Responsive Design</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Website Uptime</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>90</span>
              <span className={styles.statLabel}>Days Free Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};


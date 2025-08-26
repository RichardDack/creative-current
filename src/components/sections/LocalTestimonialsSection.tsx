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
  const testimonials = [
    {
      name: "Sarah Mitchell",
      business: `${townName} Boutique`,
      quote: `Creative Current transformed our online presence completely. Since launching our new website, we've seen a 300% increase in online enquiries from local ${townName} customers.`,
      rating: 5
    },
    {
      name: "James Thompson",
      business: `Local ${townName} Services`,
      quote: `The team's understanding of the ${townName} market was impressive. They created a website that truly speaks to our local customers and has dramatically improved our search rankings.`,
      rating: 5
    },
    {
      name: "Emma Roberts",
      business: `${townName} Restaurant`,
      quote: `Professional, reliable, and results-driven. Our new website has helped us attract more diners and streamline our booking process. Highly recommended for any ${townName} business.`,
      rating: 5
    }
  ];

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
          <span className={styles.sectionLabel}>({townName.toUpperCase()} TESTIMONIALS)</span>
          <h2 className={styles.sectionTitle}>
            What {townName} Businesses Say About Us
          </h2>
          <p className={styles.sectionDescription}>
            Don't just take our word for it. Here's what local {townName} business owners 
            have to say about working with Creative Current.
          </p>
        </motion.div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={styles.testimonialCard}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className={styles.testimonialContent}>
                <div className={styles.rating}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className={styles.star}>★</span>
                  ))}
                </div>
                <blockquote className={styles.quote}>
                  "{testimonial.quote}"
                </blockquote>
                <div className={styles.author}>
                  <strong className={styles.authorName}>{testimonial.name}</strong>
                  <span className={styles.authorBusiness}>{testimonial.business}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className={styles.statsSection} variants={itemVariants}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>47+</span>
              <span className={styles.statLabel}>Projects Completed</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>5.0</span>
              <span className={styles.statLabel}>Average Rating</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Client Satisfaction</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>90+</span>
              <span className={styles.statLabel}>Days Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};


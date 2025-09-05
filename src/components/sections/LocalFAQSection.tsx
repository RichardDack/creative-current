// src/components/sections/LocalFAQSection.tsx - FAQ Section
'use client';

import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import styles from '@/styles/components/LocalFAQSection.module.css';

interface FAQ {
  question: string;
  answer: string;
}

interface LocalFAQSectionProps {
  faqs: FAQ[];
  townName: string;
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

export const LocalFAQSection: React.FC<LocalFAQSectionProps> = ({
  faqs,
  townName
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Add null checks for required props - moved after hooks
  if (!faqs || !Array.isArray(faqs) || !townName || typeof townName !== 'string') {
    console.error('LocalFAQSection: Missing or invalid props', { faqs, townName });
    return null;
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section 
      className={styles.faqSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container">
        <motion.div className={styles.sectionHeader} variants={itemVariants}>
          <span className={styles.sectionLabel}>({townName.toUpperCase()} FAQ)</span>
          <h2 className={styles.sectionTitle}>
            Frequently Asked Questions
          </h2>
          <p className={styles.sectionDescription}>
            Common questions about our web design services in {townName} and the surrounding area.
          </p>
        </motion.div>

        <div className={styles.faqList}>
          {faqs.filter(faq => faq && faq.question && faq.answer).map((faq, index) => (
            <motion.div
              key={`${townName}-faq-${index}-${faq.question.slice(0, 20)}`}
              className={styles.faqItem}
              variants={itemVariants}
            >
              <motion.button
                className={`${styles.faqQuestion} ${openIndex === index ? styles.active : ''}`}
                onClick={() => toggleFAQ(index)}
                whileHover={{ backgroundColor: 'rgba(49, 175, 180, 0.05)' }}
              >
                <span>{faq.question}</span>
                <motion.svg
                  className={styles.faqIcon}
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
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
              </motion.button>
              
              <motion.div
                className={styles.faqAnswer}
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className={styles.faqAnswerContent}>
                  <p>{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div className={styles.contactCTA} variants={itemVariants}>
          <h3 className={styles.ctaTitle}>Still Have Questions?</h3>
          <p className={styles.ctaDescription}>
            Get in touch with our team for a free consultation about your {townName} web design project.
          </p>
          <motion.a
            href="#contact"
            className={styles.ctaButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Us Today
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};


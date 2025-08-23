// src/components/sections/WorkSection.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { WorkProject } from '@/types/data';
// import { staggerContainer } from '@/lib/animations/variants';
import styles from '@/styles/components/WorkSection.module.css';

interface WorkSectionProps {
  projects: WorkProject[];
  title?: string;
}

const workCardVariants = {
  hidden: { 
    opacity: 0,
    y: 100,
    scale: 0.8
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: index * 0.2
    }
  })
};

export const WorkSection: React.FC<WorkSectionProps> = ({ projects }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to match the number of projects
  const progressValue = useTransform(
    scrollYProgress,
    [0, 1],
    [0, projects.length || 1]
  );

  // Track visibility of work section
  const sectionVisibility = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  useEffect(() => {
    const unsubscribe = progressValue.onChange((latest) => {
      const newIndex = Math.min(Math.floor(latest), projects.length - 1);
      setActiveIndex(Math.max(0, newIndex));
    });

    return unsubscribe;
  }, [progressValue, projects.length]);

  useEffect(() => {
    const unsubscribe = sectionVisibility.onChange((latest) => {
      setIsInView(latest > 0.1);
    });

    return unsubscribe;
  }, [sectionVisibility]);

  // Defensive check for projects array
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <motion.section 
      ref={sectionRef}
      id="work-section"
      className={styles.workSection}
    >
      {/* Scroll Progress Indicator */}
      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : 20
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        <div className={styles.scrollTrack}>
          <motion.div 
            className={styles.scrollProgress}
            style={{
              scaleY: sectionVisibility
            }}
          />
        </div>
        <div className={styles.scrollDots}>
          {projects.map((_, index) => (
            <motion.div
              key={index}
              className={`${styles.scrollDot} ${
                index === activeIndex ? styles.scrollDotActive : ''
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: isInView ? 1 : 0 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </motion.div>

      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          className={styles.workItem}
          id={`work-${index + 1}`}
        >
          <div className={styles.workItemContainer}>
            <motion.div 
              className={styles.workCard}
              variants={workCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
              custom={index}
            >
              <div className={styles.workCardInner}>
                <div className={styles.workContent}>
                  <div className={styles.workMeta}>
                    <span className={styles.workLabel}>(WORK)</span>
                    <h2 className={styles.workTitle}>{project.title}</h2>
                    <div className={styles.workDetails}>
                      <div className={styles.workDetailItem}>
                        <span className={styles.workDetailLabel}>Category:</span>
                        <span className={styles.workDetailValue}>{project.category}</span>
                      </div>
                      <div className={styles.workDetailItem}>
                        <span className={styles.workDetailLabel}>Client:</span>
                        <span className={styles.workDetailValue}>{project.client}</span>
                      </div>
                      <div className={styles.workDetailItem}>
                        <span className={styles.workDetailLabel}>Duration:</span>
                        <span className={styles.workDetailValue}>{project.duration}</span>
                      </div>
                    </div>
                    <motion.button 
                      className={styles.viewProjectButton}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Project
                    </motion.button>
                  </div>
                </div>
                
                <div className={styles.workImage}>
                  <div className={styles.workImageContainer}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={styles.projectImage}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
};

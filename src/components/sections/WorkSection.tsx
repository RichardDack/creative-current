// src/components/sections/WorkSection.tsx - HOOKS RULE COMPLIANT
'use client';

import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { WorkProject } from '@/types/data';
import { workProjects } from '@/lib/data/work-projects';
import styles from '@/styles/components/WorkSection.module.css';

interface WorkSectionProps {
  projects?: WorkProject[];
  title?: string;
}

const cardEnterVariants: Variants = {
  initial: { 
    opacity: 0,
    scale: 0.9,
    y: 60
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 30,
      duration: 0.6
    }
  }
};

export const WorkSection: React.FC<WorkSectionProps> = ({ projects: propProjects }) => {
  // Use the full workProjects array by default
  const projects = propProjects || workProjects;
  
  // ALL hooks must be called in same order every render - NO conditional logic before this
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Simple progress calculation - handle empty array case safely
  const progressValue = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    [0, Math.max(0, (projects?.length || 1) - 1)]
  );

  // Enhanced visibility tracking
  const sectionVisibility = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  // Progress bar scale transform - MUST be at top level
  const progressBarScale = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    [0, 1]
  );

  // Smooth active index updates with debouncing
  useEffect(() => {
    if (!projects || projects.length === 0) return;
    
    let timeoutId: NodeJS.Timeout;
    
    const unsubscribe = progressValue.onChange((latest) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newIndex = Math.min(Math.max(0, Math.round(latest)), projects.length - 1);
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
      }, 50);
    });

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [progressValue, projects, activeIndex]); // Fixed dependency array

  useEffect(() => {
    const unsubscribe = sectionVisibility.onChange((latest) => {
      setIsInView(latest > 0.1);
    });

    return unsubscribe;
  }, [sectionVisibility]);

  // Scroll to project function
  const scrollToProject = (index: number) => {
    const projectElement = document.getElementById(`work-${index + 1}`);
    if (projectElement) {
      projectElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  // Handle empty state in JSX return without early return
  const isEmpty = !projects || projects.length === 0;

  return (
    <>
      {isEmpty ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
          No projects found. Make sure workProjects data is available.
        </div>
      ) : (
    <motion.section 
      ref={sectionRef}
      id="work-section"
      className={styles.workSection}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8 }}
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
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        <div className={styles.scrollTrack}>
          <motion.div 
            className={styles.scrollProgress}
            style={{
              scaleY: progressBarScale
            }}
          />
        </div>
        <div className={styles.scrollDots}>
          {projects.map((_, index) => (
            <motion.button
              key={index}
              className={`${styles.scrollDot} ${
                index === activeIndex ? styles.scrollDotActive : ''
              }`}
              onClick={() => scrollToProject(index)}
              initial={{ scale: 0 }}
              animate={{ scale: isInView ? 1 : 0 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ 
                delay: index * 0.05,
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              aria-label={`Go to ${projects[index].title}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Section Header */}
      <motion.div 
        className={styles.sectionHeader}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 30,
          delay: 0.2
        }}
      >
        <span className={styles.sectionLabel}>(SELECTED WORK)</span>
        <h2 className={styles.sectionTitle}>Crafting Digital Excellence</h2>
        <p className={styles.sectionDescription}>
          Each project represents our commitment to innovative design, 
          seamless functionality, and measurable results.
        </p>
      </motion.div>

      {/* Work Items */}
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          className={styles.workItem}
          id={`work-${index + 1}`}
          style={{
            zIndex: 10 + index,
          }}
        >
          <div className={styles.workItemContainer}>
            <motion.div 
              className={`${styles.workCard} ${project.isCTA ? styles.ctaCard : ''}`}
              variants={cardEnterVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-30%" }}
              transition={{
                delay: index * 0.1
              }}
              style={{
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div className={styles.workCardInner}>
                <motion.div 
                  className={styles.workContent}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 25,
                    delay: 0.2
                  }}
                >
                  <div className={styles.workMeta}>
                    <motion.span 
                      className={styles.workLabel}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      ({String(index + 1).padStart(2, '0')}) {project.isCTA ? 'OPPORTUNITY' : 'PROJECT'}
                    </motion.span>
                    
                    <motion.h3 
                      className={styles.workTitle}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 100,
                        damping: 25,
                        delay: 0.4
                      }}
                    >
                      {project.title}
                    </motion.h3>
                    
                    <motion.div 
                      className={styles.workDetails}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className={styles.workDetailItem}>
                        <span className={styles.workDetailLabel}>Category:</span>
                        <span className={styles.workDetailValue}>{project.category}</span>
                      </div>
                      <div className={styles.workDetailItem}>
                        <span className={styles.workDetailLabel}>Client:</span>
                        <span className={styles.workDetailValue}>{project.client}</span>
                      </div>
                      <div className={styles.workDetailItem}>
                        <span className={styles.workDetailLabel}>Timeline:</span>
                        <span className={styles.workDetailValue}>{project.duration}</span>
                      </div>
                      {project.tags && project.tags.length > 0 && (
                        <div className={styles.workDetailItem}>
                          <span className={styles.workDetailLabel}>Focus:</span>
                          <span className={styles.workDetailValue}>
                            {project.tags.slice(0, 2).join(', ')}
                          </span>
                        </div>
                      )}
                    </motion.div>
                    
                    <motion.button 
                      className={styles.viewProjectButton}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 8px 24px rgba(49, 175, 180, 0.3)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      onClick={() => {
                        if (project.isCTA) {
                          // Scroll to contact section for CTA card
                          const contactSection = document.getElementById('contact');
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            console.log('Contact section not found - scrolling to bottom');
                            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                          }
                        } else if (project.link) {
                          // Open project link for regular cards
                          window.open(project.link, '_blank');
                        }
                      }}
                    >
                      <span>{project.isCTA ? 'Start Your Project' : 'View Project'}</span>
                      <motion.svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none"
                        className={styles.buttonIcon}
                      >
                        <path 
                          d="M7 17L17 7M17 7H8M17 7V16" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    </motion.button>
                  </div>
                </motion.div>
                
                <motion.div 
                  className={styles.workImage}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 25,
                    delay: 0.3
                  }}
                >
                  <div className={styles.workImageContainer}>
 <Image
  src={project.image}
  alt={`${project.title} - ${project.category} project`}
fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className={styles.projectImage}
  priority={index < 2}
/>
                    
                    {/* Image overlay with project type */}
                    <motion.div 
                      className={styles.imageOverlay}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className={styles.projectType}>{project.category}</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.section>
      )}
    </>
  );
};
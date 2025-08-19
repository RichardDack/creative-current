// src/components/sections/WorkSection.tsx
'use client';

import { motion } from 'framer-motion';
import { WorkCard } from '@/components/ui/WorkCard';
import { workProjects } from '@/lib/data/work-projects';
import { staggerContainer, slideInUp } from '@/lib/animations/variants';
import styles from '@/styles/components/WorkSection.module.css';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export const WorkSection = () => {
  return (
    <motion.section 
      id="work"
      className={styles.workSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <div className="container">
        <motion.div 
          className={styles.header}
          variants={slideInUp}
        >
          <motion.span 
            className={styles.label}
            variants={slideInUp}
          >
            Our Portfolio
          </motion.span>
          <motion.h2 
            className={styles.title}
            variants={slideInUp}
          >
            Featured Work
          </motion.h2>
          <motion.p 
            className={styles.description}
            variants={slideInUp}
          >
            Discover our latest projects where creativity meets functionality. 
            Each piece represents our commitment to delivering exceptional digital experiences.
          </motion.p>
        </motion.div>

        <motion.div 
          className={styles.projectGrid}
          variants={staggerContainer}
        >
          {workProjects.map((project, index) => (
            <WorkCard 
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div 
          className={styles.footer}
          variants={slideInUp}
        >
          <motion.button 
            className={styles.viewAllButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

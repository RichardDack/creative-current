// src/components/ui/WorkCard.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { WorkProject } from '@/types/data';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import styles from '@/styles/components/WorkCard.module.css';

interface WorkCardProps {
  project: WorkProject;
  index: number;
}

const cardVariants: Variants = {
  initial: { scale: 0.9, opacity: 0, y: 60 },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 90
    }
  },
  hover: {
    scale: 1.02,
    y: -8,
    transition: { 
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const imageVariants: Variants = {
  initial: { scale: 1.2 },
  animate: { scale: 1 },
  hover: { scale: 1.1 }
};

export const WorkCard: React.FC<WorkCardProps> = ({ project, index }) => {
  return (
    <motion.article 
      className={styles.workCard}
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 90,
        delay: index * 0.1
      }}
    >
      <div className={styles.imageContainer}>
        <motion.div 
          className={styles.imageWrapper}
          variants={imageVariants}
        >
          <OptimizedImage 
            src={project.image}
            alt={`${project.title} - ${project.category} project by Creative Current`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            priority={false}
            placeholder="blur"
            quality={80}
          />
        </motion.div>
        <div className={styles.overlay}>
          <motion.button 
            className={styles.viewButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Project
          </motion.button>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{project.category}</span>
          <span className={styles.duration}>{project.duration}</span>
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.client}>{project.client}</p>
      </div>
    </motion.article>
  );
};

// src/components/ui/WorkCard.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { WorkProject } from '@/types/data';
import styles from '@/styles/components/WorkCard.module.css';

interface WorkCardProps {
  project: WorkProject;
  index: number;
}

const cardVariants = {
  initial: { scale: 0.9, opacity: 0, y: 60 },
  animate: (index: number) => ({
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 90,
      delay: index * 0.1
    }
  }),
  hover: {
    scale: 1.02,
    y: -8,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const imageVariants = {
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
      custom={index}
    >
      <div className={styles.imageContainer}>
        <motion.div 
          className={styles.imageWrapper}
          variants={imageVariants}
        >
          <Image 
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
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

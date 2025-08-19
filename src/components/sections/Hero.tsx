// src/components/sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { slideInLeft, slideInRight, fadeIn } from '@/lib/animations/variants';
import styles from '@/styles/components/Hero.module.css';

export const Hero = () => {
  return (
    <motion.section 
      className={styles.hero}
      initial="initial"
      animate="animate"
    >
      <div className="container">
        <motion.h1 
          className="h1"
          variants={slideInLeft}
        >
          CREATIVE CURRENT
        </motion.h1>
        
        <motion.p 
          className={styles.heroDescription}
          variants={slideInRight}
        >
          We craft digital experiences that connect brands with their audiences. 
          From web development to mobile apps, we bring your vision to life with 
          cutting-edge technology and creative excellence.
        </motion.p>
        
        <motion.div 
          className={styles.heroBlurElement}
          variants={fadeIn}
        />
      </div>
    </motion.section>
  );
};

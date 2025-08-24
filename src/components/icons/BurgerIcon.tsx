import React from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/components/BurgerIcon.module.css';

export interface BurgerIconProps {
  isOpen: boolean;
  onClick: () => void;
  variant?: 'dark' | 'light';
  size?: number;
  className?: string;
}

export const BurgerIcon: React.FC<BurgerIconProps> = ({
  isOpen,
  onClick,
  variant = 'dark',
  size = 24,
  className = ''
}) => {
  // Enhanced animation variants for smoother transitions
  const topLineVariants = {
    closed: {
      rotate: 0,
      y: 0,
    },
    open: {
      rotate: 45,
      y: 8,
    }
  };

  const middleLineVariants = {
    closed: {
      opacity: 1,
      x: 0,
    },
    open: {
      opacity: 0,
      x: -10,
    }
  };

  const bottomLineVariants = {
    closed: {
      rotate: 0,
      y: 0,
    },
    open: {
      rotate: -45,
      y: -8,
    }
  };

  const buttonVariants = {
    closed: {
      scale: 1,
      rotate: 0,
    },
    open: {
      scale: 1,
      rotate: 0,
    },
  };

  return (
    <motion.button
      className={`${styles.burgerButton} ${styles[variant]} ${className}`}
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      type="button"
      style={{ width: size, height: size }}
      variants={buttonVariants}
      animate={isOpen ? 'open' : 'closed'}
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.95,
      }}
    >
      <div className={styles.burgerIcon}>
        <motion.span
          className={`${styles.line} ${styles.topLine}`}
          variants={topLineVariants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
            delay: isOpen ? 0.1 : 0,
          }}
        />
        <motion.span
          className={`${styles.line} ${styles.middleLine}`}
          variants={middleLineVariants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{
            duration: 0.2,
            ease: isOpen ? 'easeIn' : 'easeOut',
            delay: isOpen ? 0 : 0.1,
          }}
        />
        <motion.span
          className={`${styles.line} ${styles.bottomLine}`}
          variants={bottomLineVariants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
            delay: isOpen ? 0.1 : 0,
          }}
        />
      </div>
    </motion.button>
  );
};
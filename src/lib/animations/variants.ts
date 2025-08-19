import { Variants } from 'framer-motion';

// Hero animations (based on original Framer data)
export const slideInLeft: Variants = {
  initial: { x: -192, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 200, 
      damping: 30 
    }
  }
};

export const slideInRight: Variants = {
  initial: { x: 192, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 200, 
      damping: 30 
    }
  }
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export const slideInUp: Variants = {
  initial: { y: 40, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 150, 
      damping: 40 
    }
  }
};

// Section stagger animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Work card animations
export const cardVariants: Variants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: (index: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 450,
      damping: 90,
      delay: index * 0.1
    }
  }),
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

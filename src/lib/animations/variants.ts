import { Variants } from 'framer-motion';

// Spring configuration matching original Framer settings
export const springConfig = {
  type: "spring" as const,
  stiffness: 200,
  damping: 30
};

export const quickSpring = {
  type: "spring" as const,
  stiffness: 450,
  damping: 90
};

// Accessibility helper for reduced motion
export const getAnimationProps = () => {
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return {
    initial: prefersReducedMotion ? false : "initial",
    animate: prefersReducedMotion ? false : "animate",
    transition: prefersReducedMotion ? { duration: 0 } : undefined
  };
};

// Primary slide animations extracted from Framer appear data
export const slideInLeft: Variants = {
  initial: { 
    x: -192, 
    opacity: 0 
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: springConfig
  }
};

export const slideInRight: Variants = {
  initial: { 
    x: 192, 
    opacity: 0 
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: springConfig
  }
};

// Scroll-triggered slide up animation
export const slideInUp: Variants = {
  initial: { 
    y: -40, 
    opacity: 0.001 
  },
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

// Complex scale and slide animation for about section
export const scaleAndSlide: Variants = {
  initial: { 
    scale: 0.1, 
    x: -96, 
    opacity: 0 
  },
  animate: {
    scale: 1,
    x: 0,
    opacity: 1,
    transition: springConfig
  }
};

// Stagger container for work cards and other grid items
export const staggerContainer: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Individual stagger item (for use with staggerContainer)
export const staggerItem: Variants = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: springConfig
  }
};

// Hover animations for interactive elements
export const hoverScale: Variants = {
  initial: { 
    scale: 1 
  },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

// Fade in animation for general use
export const fadeIn: Variants = {
  initial: { 
    opacity: 0 
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Background blur element animation
export const blurElement: Variants = {
  initial: { 
    opacity: 0,
    scale: 0.8,
    rotate: 0
  },
  animate: {
    opacity: 0.3,
    scale: 1,
    rotate: 20,
    transition: {
      duration: 2,
      ease: "easeOut",
      delay: 0.5
    }
  }
};

// Viewport-based animation configuration
export const viewportConfig = {
  once: true,
  margin: "-100px 0px -100px 0px"
};

// Animation presets for common use cases
export const animationPresets = {
  // Hero section animations
  heroTitle: {
    ...slideInLeft,
    animate: {
      ...slideInLeft.animate,
      transition: {
        ...springConfig,
        delay: 0.2
      }
    }
  },
  heroSubtitle: {
    ...slideInRight,
    animate: {
      ...slideInRight.animate,
      transition: {
        ...springConfig,
        delay: 0.4
      }
    }
  },
  
  // Work section animations
  workGrid: staggerContainer,
  workCard: {
    ...staggerItem,
    hover: hoverScale.hover
  },
  
  // About section animations
  aboutContent: scaleAndSlide,
  
  // General scroll animations
  scrollFadeUp: {
    ...slideInUp,
    viewport: viewportConfig
  }
};

const variantDefaults = {
  slideInLeft,
  slideInRight,
  slideInUp,
  scaleAndSlide,
  staggerContainer,
  staggerItem,
  hoverScale,
  fadeIn,
  blurElement,
  animationPresets,
  springConfig,
  quickSpring,
  getAnimationProps,
  viewportConfig
};

export default variantDefaults;
// Transition configurations for consistent animation timing

export const transitions = {
  // Spring transitions matching Framer settings
  spring: {
    type: "spring" as const,
    stiffness: 200,
    damping: 30
  },
  
  quickSpring: {
    type: "spring" as const,
    stiffness: 450,
    damping: 90
  },
  
  gentleSpring: {
    type: "spring" as const,
    stiffness: 150,
    damping: 40
  },
  
  // Easing transitions
  easeOut: {
    duration: 0.6,
    ease: "easeOut"
  },
  
  easeInOut: {
    duration: 0.4,
    ease: "easeInOut"
  },
  
  // Quick transitions for hover states
  quick: {
    duration: 0.2,
    ease: "easeOut"
  },
  
  // Slow transitions for dramatic effects
  slow: {
    duration: 1.2,
    ease: "easeOut"
  }
};

// Stagger configurations
export const staggerConfig = {
  // Default stagger for work cards
  workCards: {
    staggerChildren: 0.1,
    delayChildren: 0.1
  },
  
  // Faster stagger for smaller elements
  fast: {
    staggerChildren: 0.05,
    delayChildren: 0.05
  },
  
  // Slower stagger for dramatic effect
  slow: {
    staggerChildren: 0.2,
    delayChildren: 0.3
  }
};

// Delay configurations
export const delays = {
  none: 0,
  short: 0.1,
  medium: 0.2,
  long: 0.4,
  heroTitle: 0.2,
  heroSubtitle: 0.4,
  heroBackground: 0.5
};

export default {
  transitions,
  staggerConfig,
  delays
};
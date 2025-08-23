import { Variants, MotionProps } from 'framer-motion';

// Utility to create motion props with reduced motion support
export const createMotionProps = (
  variants: Variants,
  options?: {
    viewport?: boolean;
    delay?: number;
    custom?: unknown;
  }
): MotionProps => {
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return {
      initial: false,
      animate: false,
      transition: { duration: 0 }
    };
  }

  const baseProps: MotionProps = {
    variants,
    initial: "initial",
    animate: "animate"
  };

  if (options?.viewport) {
    baseProps.whileInView = "animate";
    baseProps.viewport = {
      once: true,
      margin: "-100px 0px -100px 0px"
    };
  }

  if (options?.delay) {
    baseProps.transition = {
      delay: options.delay
    };
  }

  if (options?.custom !== undefined) {
    baseProps.custom = options.custom;
  }

  return baseProps;
};

// Utility to create stagger motion props
export const createStaggerProps = (
  containerVariants: Variants,
  itemVariants: Variants,
  options?: {
    viewport?: boolean;
    staggerDelay?: number;
  }
) => {
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return {
      container: {
        initial: false,
        animate: false
      },
      item: {
        initial: false,
        animate: false
      }
    };
  }

  const containerProps: MotionProps = {
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  };

  const itemProps: MotionProps = {
    variants: itemVariants
  };

  if (options?.viewport) {
    containerProps.whileInView = "visible";
    containerProps.viewport = {
      once: true,
      margin: "-50px 0px -50px 0px"
    };
  }

  return {
    container: containerProps,
    item: itemProps
  };
};

// Utility to check if animations should be enabled
export const shouldAnimate = (): boolean => {
  if (typeof window === 'undefined') return true;
  
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Utility to create hover props with reduced motion support
export const createHoverProps = (
  hoverVariant: unknown,
  options?: {
    scale?: number;
    duration?: number;
  }
): MotionProps => {
  if (!shouldAnimate()) {
    return {};
  }

  return {
    whileHover: hoverVariant,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      duration: options?.duration || 0.2
    }
  };
};

const utilDefaults = {
  createMotionProps,
  createStaggerProps,
  shouldAnimate,
  createHoverProps
};

export default utilDefaults;
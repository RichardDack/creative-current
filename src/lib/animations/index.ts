// Animation system exports for easy importing

export {
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
} from './variants';

export {
  transitions,
  staggerConfig,
  delays
} from './transitions';

// Re-export default variants for convenience
export { default as variants } from './variants';
export { default as transitionConfig } from './transitions';
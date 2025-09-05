import React from 'react';
import { motion } from 'framer-motion';

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
  const color = variant === 'light' ? '#14212D' : '#31AFB4';

  return (
    <motion.button
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      type="button"
      className={className}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        position: 'relative',
        zIndex: 1003,
        minWidth: '44px',
        minHeight: '44px',
      }}
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(49, 175, 180, 0.1)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {isOpen ? (
          // X Icon
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          // Hamburger Icon
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
};
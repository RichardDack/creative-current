// src/components/global/MobileNavOverlay.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import styles from '@/styles/components/MobileNavOverlay.module.css';

interface NavigationItem {
  name: string;
  href: string;
  id: string;
}

interface MobileNavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'light' | 'dark';
}

const navigationItems: NavigationItem[] = [
  { name: 'WORK', href: '#work-section', id: 'work' },
  { name: 'ABOUT', href: '#about-section', id: 'about' },
  { name: 'SERVICES', href: '#services', id: 'services' },
  { name: 'CONTACT', href: '#footer-background', id: 'contact' },
];

export const MobileNavOverlay: React.FC<MobileNavOverlayProps> = ({
  isOpen,
  onClose,
  variant = 'dark'
}) => {
  // Handle smooth scrolling functionality for navigation links
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // Close menu before scrolling with enhanced timing
    onClose();

    // Delay to allow menu close animation to complete before scrolling
    setTimeout(() => {
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 200); // Increased delay to match exit animation timing
  };

  // Handle click outside to close menu
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus management - focus first navigation item when menu opens
  useEffect(() => {
    if (isOpen) {
      const firstNavItem = document.querySelector(`.${styles.navItem}`) as HTMLElement;
      if (firstNavItem) {
        firstNavItem.focus();
      }
    }
  }, [isOpen]);

  const overlayVariants = {
    hidden: {
      opacity: 0,
      x: '100%',
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      x: '100%',
      scale: 0.95,
    },
  };

  const backgroundVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      x: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: -20,
      x: 30,
      scale: 0.9,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`${styles.overlay} ${variant === 'light' ? styles.light : styles.dark}`}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            duration: 0.4,
            ease: 'easeOut',
          }}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <motion.div
            className={styles.overlayBackground}
            variants={backgroundVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: 0.4,
              ease: 'easeOut',
            }}
          />

          <motion.nav
            className={styles.navigationContainer}
            role="navigation"
            aria-label="Main navigation"
          >
            <motion.ul
              className={styles.navigationList}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{
                staggerChildren: 0.08,
                delayChildren: 0.15,
              }}
            >
              {navigationItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={itemVariants}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  <a
                    href={item.href}
                    className={styles.navItem}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    tabIndex={0}
                    role="menuitem"
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
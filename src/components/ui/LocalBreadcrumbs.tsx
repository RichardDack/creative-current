// src/components/ui/LocalBreadcrumbs.tsx - Breadcrumbs Component
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import styles from '@/styles/components/LocalBreadcrumbs.module.css';
import { debugNavigationSpacing } from '@/lib/utils/navigationSpacing';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface LocalBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const LocalBreadcrumbs: React.FC<LocalBreadcrumbsProps> = ({ items }) => {
  // Debug navigation spacing in development - MUST be called before any early returns
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(debugNavigationSpacing, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Add null checks for required props
  if (!items || !Array.isArray(items) || items.length === 0) {
    console.error('LocalBreadcrumbs: Missing or invalid items prop', { items });
    return null;
  }

  return (
    <motion.nav 
      className={styles.breadcrumbs}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      aria-label="Breadcrumb navigation"
    >
      <div className="container">
        <ol className={styles.breadcrumbList}>
          {items.filter(item => item && item.name && item.url).map((item, index) => (
            <li key={`breadcrumb-${index}-${item.name}`} className={styles.breadcrumbItem}>
              {index < items.length - 1 ? (
                <>
                  <Link href={item.url} className={styles.breadcrumbLink}>
                    {item.name}
                  </Link>
                  <span className={styles.breadcrumbSeparator}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </>
              ) : (
                <span className={styles.breadcrumbCurrent} aria-current="page">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </motion.nav>
  );
};


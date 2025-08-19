// src/components/global/Layout.tsx - UPDATED
import styles from '@/styles/components/Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className={styles.mainContent}>
      {children}
    </main>
  );
};
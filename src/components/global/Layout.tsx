// src/components/global/Layout.tsx - UPDATED
import { Footer } from '@/components/global/Footer';
import styles from '@/styles/components/Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <main id="main-content" className={styles.mainContent}>
        {children}
      </main>
      <Footer />
    </>
  );
};
// src/components/global/Layout.tsx
import { Header } from './Header';
import styles from '@/styles/components/Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header fixed={true} variant="dark" />
      <main className={styles.mainContent}>
        {children}
      </main>
    </>
  );
};
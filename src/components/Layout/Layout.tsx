import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.pageContainer}>
            {title && (
              <div className={styles.pageHeader}>
                <h1>{title}</h1>
              </div>
            )}
            <div className={styles.pageContent}>
              {children}
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; 2025 Uligames Store. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}; 
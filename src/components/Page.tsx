import React from 'react';
import styles from './Page.module.css';

interface PageProps {
  children: React.ReactNode;
  alignCenter?: boolean;
}

export function Page({ children, alignCenter }: PageProps) {
  return (
    <div className={styles.pageWrapper}>
      <div className={`${styles.pageContainer}`} style={{
        alignContent: alignCenter ? 'center' : 'inherit'
      }}>
        {children}
      </div>
    </div>
  );
}
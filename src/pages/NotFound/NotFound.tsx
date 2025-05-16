import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.message}>
          Oops! The page you're looking for seems to have vanished into thin air.
          Maybe it's playing hide and seek?
        </p>
        <div className={styles.actions}>
          <button
            className={styles.primaryButton}
            onClick={() => navigate('/')}
          >
            Return Home
          </button>
          <button
            className={styles.secondaryButton}
            onClick={() => navigate('/catalog')}
          >
            Browse Games
          </button>
        </div>
      </div>
    </div>
  );
}; 
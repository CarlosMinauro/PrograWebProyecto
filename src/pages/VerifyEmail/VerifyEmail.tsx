import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './VerifyEmail.module.css';

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { verifyEmail, resendVerificationEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    const oobCode = searchParams.get('oobCode');
    if (!oobCode) {
      setError('Invalid or expired verification link');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      await verifyEmail(oobCode);
      setMessage('Email verified successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login', {
          state: { message: 'Email verified successfully. Please sign in.' }
        });
      }, 3000);
    } catch (err) {
      setError('Failed to verify email. The link may have expired.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      await resendVerificationEmail();
      setMessage('Verification email sent! Please check your inbox.');
    } catch (err) {
      setError('Failed to send verification email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <h1>Verify Your Email</h1>
          <p>Please verify your email address to continue</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {message && <div className={styles.message}>{message}</div>}

        <div className={styles.content}>
          <p className={styles.description}>
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </p>

          <div className={styles.actions}>
            {searchParams.has('oobCode') ? (
              <button
                onClick={handleVerify}
                className={styles.verifyButton}
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify Email'}
              </button>
            ) : (
              <button
                onClick={handleResend}
                className={styles.resendButton}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Resend Verification Email'}
              </button>
            )}
          </div>

          <div className={styles.footer}>
            <p>
              Didn't receive the email? Check your spam folder or{' '}
              <button
                onClick={handleResend}
                className={styles.resendLink}
                disabled={isLoading}
              >
                click here to resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 
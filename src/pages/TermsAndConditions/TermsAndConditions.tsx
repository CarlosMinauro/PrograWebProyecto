import React from 'react';
import styles from './TermsAndConditions.module.css';

export const TermsAndConditions = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Terms and Conditions</h1>
        <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>

        <section className={styles.section}>
          <h2>1. Introduction</h2>
          <p>
            Welcome to GameStore. These terms and conditions outline the rules and regulations for the use of our website and services.
            By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use GameStore if you do not accept all of the terms and conditions stated on this page.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. License to Use</h2>
          <p>
            Unless otherwise stated, GameStore and/or its licensors own the intellectual property rights for all material on GameStore.
            All intellectual property rights are reserved. You may view and/or print pages from GameStore for your own personal use subject to restrictions set in these terms and conditions.
          </p>
          <p>You must not:</p>
          <ul>
            <li>Republish material from GameStore</li>
            <li>Sell, rent or sub-license material from GameStore</li>
            <li>Reproduce, duplicate or copy material from GameStore</li>
            <li>Redistribute content from GameStore (unless content is specifically made for redistribution)</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. User Account</h2>
          <p>
            To access certain features of the website, you must register for an account. You agree to provide accurate, current, and complete information during the registration process.
            You are responsible for safeguarding your password and for all activities that occur under your account.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Purchases and Payments</h2>
          <p>
            All purchases through our website are subject to these terms and conditions. Prices for our products are subject to change without notice.
            We reserve the right to modify or discontinue any product without notice at any time.
          </p>
          <p>Payment terms:</p>
          <ul>
            <li>All payments must be made in full at the time of purchase</li>
            <li>We accept various payment methods as indicated during checkout</li>
            <li>Prices are inclusive of applicable taxes</li>
            <li>Digital products are non-refundable unless required by law</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>5. Digital Products</h2>
          <p>
            When you purchase a digital product from GameStore, you are purchasing a license to use that product.
            The license is non-transferable and may be subject to additional terms and conditions from the game publisher.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the website for any illegal purpose</li>
            <li>Violate any laws in your jurisdiction</li>
            <li>Infringe upon the rights of others</li>
            <li>Interfere with the proper functioning of the website</li>
            <li>Attempt to gain unauthorized access to any portion of the website</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>7. Privacy Policy</h2>
          <p>
            Your use of GameStore is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the website and informs users of our data collection practices.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Limitation of Liability</h2>
          <p>
            In no event shall GameStore, nor any of its officers, directors, and employees, be liable to you for anything arising out of or in any way connected with your use of this website.
            GameStore, including its officers, directors, and employees shall not be liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms and conditions at any time. We will notify users of any changes by updating the "Last updated" date at the top of this page.
            Your continued use of the website following the posting of revised terms means that you accept and agree to the changes.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Contact Information</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <ul>
            <li>Email: support@gamestore.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Gaming Street, Digital City, 12345</li>
          </ul>
        </section>
      </div>
    </div>
  );
}; 
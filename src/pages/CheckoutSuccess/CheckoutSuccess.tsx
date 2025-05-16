import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import styles from './CheckoutSuccess.module.css';

export const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const { items, totalPrice } = useCart();

  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.container}>
      <div className={styles.successCard}>
        <div className={styles.header}>
          <div className={styles.checkmark}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1>Thank You for Your Order!</h1>
          <p className={styles.message}>
            Your order has been successfully placed and is being processed.
          </p>
        </div>

        <div className={styles.orderInfo}>
          <div className={styles.infoRow}>
            <span>Order Number:</span>
            <span className={styles.value}>{orderNumber}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Date:</span>
            <span className={styles.value}>{currentDate}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Total Amount:</span>
            <span className={styles.value}>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>
          <div className={styles.items}>
            {items.map(item => (
              <div key={item.game.id} className={styles.item}>
                <img
                  src={item.game.imageUrl}
                  alt={item.game.title}
                  className={styles.gameImage}
                />
                <div className={styles.itemDetails}>
                  <h3>{item.game.title}</h3>
                  <span className={styles.platform}>{item.game.platform}</span>
                  <div className={styles.price}>
                    {item.game.discountPrice ? (
                      <>
                        <span className={styles.originalPrice}>
                          ${item.game.price}
                        </span>
                        <span className={styles.discountPrice}>
                          ${item.game.discountPrice}
                        </span>
                      </>
                    ) : (
                      <span>${item.game.price}</span>
                    )}
                  </div>
                </div>
                <div className={styles.quantity}>
                  x{item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.nextSteps}>
          <h2>What's Next?</h2>
          <ul>
            <li>
              <span className={styles.stepNumber}>1</span>
              <div>
                <h3>Order Confirmation</h3>
                <p>A confirmation email has been sent to your registered email address.</p>
              </div>
            </li>
            <li>
              <span className={styles.stepNumber}>2</span>
              <div>
                <h3>Order Processing</h3>
                <p>Your order will be processed and prepared for delivery.</p>
              </div>
            </li>
            <li>
              <span className={styles.stepNumber}>3</span>
              <div>
                <h3>Delivery</h3>
                <p>You will receive updates about your order's delivery status.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.continueShopping}
            onClick={() => navigate('/catalog')}
          >
            Continue Shopping
          </button>
          <button
            className={styles.viewOrder}
            onClick={() => navigate('/profile')}
          >
            View Order in Profile
          </button>
        </div>
      </div>
    </div>
  );
}; 
// Responsable: Sergio (IDs 10, 11, 12)
// ID 10: "Como usuario autenticado, debo poder agregar un juego a mi carrito de compras, seleccionando el botón de comprar."
// ID 11: "Como usuario autenticado, deseo eliminar ítems de mi carrito de compras, en caso me arrepienta de la selección."
// ID 12: "Como usuario autenticado, debo poder realizar el pago de los ítems que se encuentren en mi carrito de compras."

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import styles from './Cart.module.css';

export const Cart = () => {
  const { items, removeFromCart, getTotal, checkout } = useCart();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsCheckingOut(true);
    try {
      await checkout();
      setShowSuccess(true);
      showNotification('Purchase successful! Your game keys have been sent to your email.', 'success');
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Checkout failed:', error);
      showNotification('Failed to process checkout. Please try again.', 'error');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Your cart is empty</h2>
        <p>Add some games to your cart to start shopping!</p>
        <button 
          className={styles.continueShopping}
          onClick={() => navigate('/catalog')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Shopping Cart</h1>
      
      {showSuccess && (
        <div className={styles.successMessage}>
          <h3>Purchase Successful!</h3>
          <p>Your game keys have been sent to your email: {user?.email}</p>
        </div>
      )}

      <div className={styles.cartItems}>
        {items.map(item => (
          <div key={item.gameId} className={styles.cartItem}>
            <div className={styles.itemInfo}>
              <h3>{item.title}</h3>
              <p className={styles.platform}>{item.platform}</p>
              <p className={styles.price}>${item.price.toFixed(2)}</p>
            </div>
            <div className={styles.itemActions}>
              <button
                className={styles.removeButton}
                onClick={() => removeFromCart(item.gameId)}
                disabled={isCheckingOut}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.cartSummary}>
        <div className={styles.total}>
          <span>Total:</span>
          <span>${getTotal().toFixed(2)}</span>
        </div>
        <button
          className={styles.checkoutButton}
          onClick={handleCheckout}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
        </button>
      </div>
    </div>
  );
}; 
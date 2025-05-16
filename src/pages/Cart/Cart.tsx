// Responsable: Sergio (IDs 10, 11, 12)
// ID 10: "Como usuario autenticado, debo poder agregar un juego a mi carrito de compras, seleccionando el botón de comprar."
// ID 11: "Como usuario autenticado, deseo eliminar ítems de mi carrito de compras, en caso me arrepienta de la selección."
// ID 12: "Como usuario autenticado, debo poder realizar el pago de los ítems que se encuentren en mi carrito de compras."

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import styles from './Cart.module.css';

export const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Your cart is empty</h2>
        <p>Add some games to your cart to start shopping!</p>
        <button onClick={() => navigate('/catalog')} className={styles.continueShopping}>
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // In a real app, this would redirect to a payment processor
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      navigate('/checkout-success');
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <h1>Shopping Cart</h1>

      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          {items.map(item => (
            <div key={item.game.id} className={styles.cartItem}>
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
                <button
                  onClick={() => updateQuantity(item.game.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.game.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className={styles.subtotal}>
                ${((item.game.discountPrice || item.game.price) * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(item.game.id)}
                className={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Tax</span>
            <span>${(totalPrice * 0.1).toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.total}>Total</span>
            <span className={styles.total}>
              ${(totalPrice * 1.1).toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className={styles.checkoutButton}
          >
            {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
          </button>
          <button
            onClick={() => navigate('/catalog')}
            className={styles.continueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}; 
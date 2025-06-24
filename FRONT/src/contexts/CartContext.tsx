import React, { createContext, useContext, useState, useEffect } from 'react';
import { gameService } from '../services/api/gameService';
import { orderService } from '../services/api/orderService';
import type { Game } from '../types';

interface CartItem {
  gameId: string;
  quantity: number;
  price: number;
  title: string;
  platform: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (gameId: string) => void;
  removeFromCart: (gameId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  checkout: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = async (gameId: string) => {
    try {
      // Get game details from API
      const response = await gameService.getGameById(gameId);
      const game = response.data;
      
      if (!game) return;

      setItems(currentItems => {
        const existingItem = currentItems.find(item => item.gameId === gameId);
        if (existingItem) {
          return currentItems.map(item =>
            item.gameId === gameId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...currentItems, {
          gameId,
          quantity: 1,
          price: game.price,
          title: game.title,
          platform: game.platform
        }];
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = (gameId: string) => {
    setItems(currentItems => currentItems.filter(item => item.gameId !== gameId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const checkout = async () => {
    try {
      // Convert cart items to the format expected by the API
      const orderItems = items.map(item => ({
        gameId: item.gameId,
        quantity: item.quantity,
        price: item.price
      }));

      // Process checkout through the API
      const result = await orderService.checkout(orderItems);
      
      if (result.success) {
        // Clear cart after successful checkout
        clearCart();
        
        // You could show success message with game codes
        console.log('Checkout successful! Game codes:', result.data.sales);
      } else {
        throw new Error(result.message || 'Checkout failed');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      clearCart,
      getTotal,
      checkout
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 
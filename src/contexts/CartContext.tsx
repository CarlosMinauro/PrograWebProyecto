import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockGames } from '../data/mockData';

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

  const addToCart = (gameId: string) => {
    const game = mockGames.find(g => g.id === gameId);
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
    // Simular proceso de pago
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generar claves de juego (simuladas)
    const gameKeys = items.map(item => ({
      gameId: item.gameId,
      title: item.title,
      key: `GAME-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    }));

    // Enviar email con las claves (simulado)
    console.log('Enviando email con las siguientes claves:', gameKeys);
    
    // Limpiar el carrito después de la compra
    clearCart();
    
    return Promise.resolve();
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
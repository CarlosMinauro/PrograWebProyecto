import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  purchasedGames: string[];
  emailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPurchasedGame: (gameId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const login = async (email: string, password: string) => {
    // Simulación: busca usuario por email
    const found = users.find(u => u.email === email);
    if (!found) throw new Error("No existe una cuenta con este correo.");
    setUser(found);
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulación: no permite correos repetidos
    if (users.some(u => u.email === email)) {
      throw new Error("Ya existe una cuenta con este correo electrónico.");
    }
    const newUser: User = {
      id: Math.random().toString(36).substring(2),
      email,
      name,
      purchasedGames: [],
      emailVerified: true, // Siempre true en modo local
    };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const hasPurchasedGame = (gameId: string) => {
    return user?.purchasedGames.includes(gameId) || false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      hasPurchasedGame
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
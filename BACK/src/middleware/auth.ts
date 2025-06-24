import { Request, Response, NextFunction } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { query } from '../config/database';
import { Usuario } from '../types';
import { createError } from './errorHandler';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: Omit<Usuario, 'password'>;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(createError('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    
    // Get user from database
    const result = await query(
      'SELECT id, correo, nombre, estado FROM usuario WHERE id = $1 AND estado = true',
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return next(createError('User not found or inactive', 401));
    }

    req.user = result.rows[0];
    next();
  } catch (error) {
    return next(createError('Not authorized to access this route', 401));
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(createError('User not authenticated', 401));
    }

    // For now, we'll use a simple admin check based on email
    // You can extend this to include role-based authorization
    const isAdmin = req.user.correo === process.env.ADMIN_EMAIL;
    
    if (!isAdmin && roles.includes('admin')) {
      return next(createError('User role is not authorized to access this route', 403));
    }

    next();
  };
};

export const generateToken = (userId: number): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as any
  };
  
  return jwt.sign({ id: userId }, secret, options);
}; 
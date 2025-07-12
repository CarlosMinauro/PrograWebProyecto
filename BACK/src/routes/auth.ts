import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import { query } from '../config/database';
import { generateToken } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';
import { emailService } from '../services/emailService';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', [
  body('nombre').notEmpty().withMessage('Name is required'),
  body('correo').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array()[0].msg
      });
    }

    const { nombre, correo, password }: RegisterRequest = req.body;

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM usuario WHERE correo = $1',
      [correo]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const result = await query(
      'INSERT INTO usuario (nombre, correo, password, estado) VALUES ($1, $2, $3, $4) RETURNING id, nombre, correo, estado',
      [nombre, correo, hashedPassword, true]
    );

    const user = result.rows[0];
    const token = generateToken(user.id);

    const response: AuthResponse = {
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        estado: user.estado
      }
    };

    // Send welcome email
    try {
      await emailService.sendWelcomeEmail(user.correo, user.nombre);
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      // Don't fail registration if email fails
    }

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', [
  body('correo').isEmail().withMessage('Please include a valid email'),
  body('password').exists().withMessage('Password is required')
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array()[0].msg
      });
    }

    const { correo, password }: LoginRequest = req.body;

    // Check for user
    const result = await query(
      'SELECT id, nombre, correo, password, estado FROM usuario WHERE correo = $1',
      [correo]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const user = result.rows[0];

    // Check if user is active
    if (!user.estado) {
      return res.status(400).json({
        success: false,
        error: 'Account is deactivated'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const token = generateToken(user.id);

    const response: AuthResponse = {
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        estado: user.estado
      }
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized'
      });
    }

    res.json({
      success: true,
      data: req.user
    });
  } catch (error) {
    next(error);
  }
});

export default router; 
import express, { Request, Response, NextFunction } from 'express';
import { query } from '../config/database';
import { protect, authorize } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', protect, async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized'
      });
    }

    // Get user's purchase history
    const purchasesResult = await query(`
      SELECT 
        v.id, v.fecha, v.codigo, v.monto_pagado,
        j.nombre as juego_nombre, j.precio as juego_precio
      FROM venta v
      JOIN juego j ON v.juego_id = j.id
      WHERE v.usuario_id = $1
      ORDER BY v.fecha DESC
    `, [req.user.id]);

    // Get user's ratings
    const ratingsResult = await query(`
      SELECT 
        cal.id, cal.valoracion, cal.comentario, cal.juego_id,
        j.nombre as juego_nombre
      FROM calificacion cal
      JOIN juego j ON cal.juego_id = j.id
      WHERE cal.usuario_id = $1
      ORDER BY cal.id DESC
    `, [req.user.id]);

    res.json({
      success: true,
      data: {
        user: req.user,
        purchases: purchasesResult.rows,
        ratings: ratingsResult.rows
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized'
      });
    }

    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({
        success: false,
        error: 'Name is required'
      });
    }

    const result = await query(
      'UPDATE usuario SET nombre = $1 WHERE id = $2 RETURNING id, nombre, correo, estado',
      [nombre, req.user.id]
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/users (Admin only)
// @desc    Get all users
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await query(
      'SELECT id, nombre, correo, estado FROM usuario ORDER BY id DESC',
      []
    );

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/users/:id (Admin only)
// @desc    Update user status
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const result = await query(
      'UPDATE usuario SET estado = $1 WHERE id = $2 RETURNING id, nombre, correo, estado',
      [estado, id]
    );

    if (result.rows.length === 0) {
      return next(createError('User not found', 404));
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
});

export default router; 
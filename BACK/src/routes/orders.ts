import express, { Request, Response, NextFunction } from 'express';
import { query } from '../config/database';
import { protect } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';
import { emailService } from '../services/emailService';

const router = express.Router();

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', protect, async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized'
      });
    }

    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Items are required'
      });
    }

    const client = await query('BEGIN');

    try {
      const sales = [];

      for (const item of items) {
        const { juego_id, cantidad, precio } = item;

        // Check if game exists and is active
        const gameResult = await query(
          'SELECT id, nombre, precio, estado FROM juego WHERE id = $1 AND estado = true',
          [juego_id]
        );

        if (gameResult.rows.length === 0) {
          throw new Error(`Game with id ${juego_id} not found or inactive`);
        }

        const game = gameResult.rows[0];

        // Create sale record for each item
        for (let i = 0; i < cantidad; i++) {
          const codigo = `GAME-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
          
          const saleResult = await query(
            'INSERT INTO venta (fecha, usuario_id, juego_id, codigo, monto_pagado) VALUES (NOW(), $1, $2, $3, $4) RETURNING id, codigo, monto_pagado',
            [req.user.id, juego_id, codigo, precio]
          );

          sales.push({
            id: saleResult.rows[0].id,
            codigo: saleResult.rows[0].codigo,
            juego_nombre: game.nombre,
            monto_pagado: saleResult.rows[0].monto_pagado
          });
        }
      }

      await query('COMMIT');

      // Send email with game keys
      try {
        const total = sales.reduce((sum, sale) => sum + Number(sale.monto_pagado), 0);
        await emailService.sendGameKeys({
          userEmail: req.user.correo,
          userName: req.user.nombre,
          gameKeys: sales,
          total
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the order if email fails
      }

      const total = sales.reduce((sum, sale) => sum + Number(sale.monto_pagado), 0);
      
      res.status(201).json({
        success: true,
        message: 'Order created successfully. Game keys have been sent to your email.',
        data: {
          sales,
          total
        }
      });
    } catch (error) {
      await query('ROLLBACK');
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/orders
// @desc    Get user orders
// @access  Private
router.get('/', protect, async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized'
      });
    }

    const result = await query(`
      SELECT 
        v.id, v.fecha, v.codigo, v.monto_pagado, v.juego_id,
        j.nombre as juego_nombre, j.precio as juego_precio
      FROM venta v
      JOIN juego j ON v.juego_id = j.id
      WHERE v.usuario_id = $1
      ORDER BY v.fecha DESC
    `, [req.user.id]);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', protect, async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized'
      });
    }

    const { id } = req.params;

    const result = await query(`
      SELECT 
        v.id, v.fecha, v.codigo, v.monto_pagado, v.juego_id,
        j.nombre as juego_nombre, j.precio as juego_precio
      FROM venta v
      JOIN juego j ON v.juego_id = j.id
      WHERE v.id = $1 AND v.usuario_id = $2
    `, [id, req.user.id]);

    if (result.rows.length === 0) {
      return next(createError('Order not found', 404));
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
});

export default router; 
import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { query } from '../config/database';
import { protect } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';

const router = express.Router();

// @route   POST /api/reviews
// @desc    Create a review for a purchased game
// @access  Private
router.post('/', protect, [
  body('juego_id').isInt().withMessage('Game ID is required'),
  body('valoracion').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comentario').optional().isString().withMessage('Comment must be a string')
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array()[0].msg
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized'
      });
    }

    const { juego_id, valoracion, comentario } = req.body;

    // Check if user has purchased the game
    const purchaseCheck = await query(
      'SELECT id FROM venta WHERE usuario_id = $1 AND juego_id = $2',
      [req.user.id, juego_id]
    );

    if (purchaseCheck.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'You can only review games you have purchased'
      });
    }

    // Check if user already reviewed this game
    const existingReview = await query(
      'SELECT id FROM calificacion WHERE usuario_id = $1 AND juego_id = $2',
      [req.user.id, juego_id]
    );

    if (existingReview.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'You have already reviewed this game'
      });
    }

    // Create review
    const result = await query(
      'INSERT INTO calificacion (valoracion, comentario, juego_id, usuario_id) VALUES ($1, $2, $3, $4) RETURNING id, valoracion, comentario, juego_id, usuario_id',
      [valoracion, comentario, juego_id, req.user.id]
    );

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/reviews/game/:gameId
// @desc    Get all reviews for a specific game
// @access  Public
router.get('/game/:gameId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId } = req.params;

    const result = await query(`
      SELECT 
        c.id, c.valoracion, c.comentario, c.juego_id,
        u.nombre as usuario_nombre,
        u.correo as usuario_email
      FROM calificacion c
      JOIN usuario u ON c.usuario_id = u.id
      WHERE c.juego_id = $1
      ORDER BY c.id DESC
    `, [gameId]);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/reviews/:id
// @desc    Update a review
// @access  Private
router.put('/:id', protect, [
  body('valoracion').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comentario').optional().isString().withMessage('Comment must be a string')
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array()[0].msg
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized'
      });
    }

    const { id } = req.params;
    const { valoracion, comentario } = req.body;

    // Check if review exists and belongs to user
    const existingReview = await query(
      'SELECT id FROM calificacion WHERE id = $1 AND usuario_id = $2',
      [id, req.user.id]
    );

    if (existingReview.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Review not found or not authorized'
      });
    }

    // Update review
    const result = await query(
      'UPDATE calificacion SET valoracion = $1, comentario = $2 WHERE id = $3 RETURNING id, valoracion, comentario, juego_id, usuario_id',
      [valoracion, comentario, id]
    );

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete a review
// @access  Private
router.delete('/:id', protect, async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized'
      });
    }

    const { id } = req.params;

    // Check if review exists and belongs to user
    const existingReview = await query(
      'SELECT id FROM calificacion WHERE id = $1 AND usuario_id = $2',
      [id, req.user.id]
    );

    if (existingReview.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Review not found or not authorized'
      });
    }

    // Delete review
    await query('DELETE FROM calificacion WHERE id = $1', [id]);

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router; 
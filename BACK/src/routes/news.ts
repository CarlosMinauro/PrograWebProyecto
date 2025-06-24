import express, { Request, Response, NextFunction } from 'express';
import { query } from '../config/database';
import { protect, authorize } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';

const router = express.Router();

// @route   GET /api/news
// @desc    Get all active news
// @access  Public
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await query(
      'SELECT id, titulo, texto, activo FROM noticia WHERE activo = true ORDER BY id DESC',
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

// @route   GET /api/news/:id
// @desc    Get single news
// @access  Public
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT id, titulo, texto, activo FROM noticia WHERE id = $1 AND activo = true',
      [id]
    );

    if (result.rows.length === 0) {
      return next(createError('News not found', 404));
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/news
// @desc    Create new news
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { titulo, texto } = req.body;

    if (!titulo || !texto) {
      return res.status(400).json({
        success: false,
        error: 'Title and text are required'
      });
    }

    const result = await query(
      'INSERT INTO noticia (titulo, texto, activo) VALUES ($1, $2, $3) RETURNING id, titulo, texto, activo',
      [titulo, texto, true]
    );

    res.status(201).json({
      success: true,
      message: 'News created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/news/:id
// @desc    Update news
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { titulo, texto, activo } = req.body;

    const result = await query(
      'UPDATE noticia SET titulo = COALESCE($1, titulo), texto = COALESCE($2, texto), activo = COALESCE($3, activo) WHERE id = $4 RETURNING id, titulo, texto, activo',
      [titulo, texto, activo, id]
    );

    if (result.rows.length === 0) {
      return next(createError('News not found', 404));
    }

    res.json({
      success: true,
      message: 'News updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/news/:id
// @desc    Delete news
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await query(
      'DELETE FROM noticia WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return next(createError('News not found', 404));
    }

    res.json({
      success: true,
      message: 'News deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router; 
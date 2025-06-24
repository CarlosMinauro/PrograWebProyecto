import express, { Request, Response, NextFunction } from 'express';
import { query } from '../config/database';
import { protect, authorize } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';

const router = express.Router();

// @route   GET /api/games
// @desc    Get all games
// @access  Public
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoria, plataforma, busqueda, ordenar } = req.query;
    
    let sql = `
      SELECT 
        j.id, j.nombre, j.precio, j.esta_oferta, j.estado,
        c.nombre as categoria_nombre,
        array_agg(p.nombre) as plataformas
      FROM juego j
      LEFT JOIN categoria c ON j.categoria_id = c.id
      LEFT JOIN juego_plataforma jp ON j.id = jp.juego_id
      LEFT JOIN plataforma p ON jp.plataforma_id = p.id
      WHERE j.estado = true
    `;
    
    const params: any[] = [];
    let paramCount = 0;

    if (categoria) {
      paramCount++;
      sql += ` AND c.nombre = $${paramCount}`;
      params.push(categoria);
    }

    if (busqueda) {
      paramCount++;
      sql += ` AND j.nombre ILIKE $${paramCount}`;
      params.push(`%${busqueda}%`);
    }

    sql += ` GROUP BY j.id, j.nombre, j.precio, j.esta_oferta, j.estado, c.nombre`;

    if (ordenar === 'precio_asc') {
      sql += ' ORDER BY j.precio ASC';
    } else if (ordenar === 'precio_desc') {
      sql += ' ORDER BY j.precio DESC';
    } else if (ordenar === 'nombre') {
      sql += ' ORDER BY j.nombre ASC';
    } else {
      sql += ' ORDER BY j.id DESC';
    }

    const result = await query(sql, params);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/games/:id
// @desc    Get single game
// @access  Public
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await query(`
      SELECT 
        j.id, j.nombre, j.precio, j.esta_oferta, j.estado,
        c.nombre as categoria_nombre,
        array_agg(p.nombre) as plataformas,
        AVG(cal.valoracion) as calificacion_promedio,
        COUNT(cal.id) as total_calificaciones
      FROM juego j
      LEFT JOIN categoria c ON j.categoria_id = c.id
      LEFT JOIN juego_plataforma jp ON j.id = jp.juego_id
      LEFT JOIN plataforma p ON jp.plataforma_id = p.id
      LEFT JOIN calificacion cal ON j.id = cal.juego_id
      WHERE j.id = $1 AND j.estado = true
      GROUP BY j.id, j.nombre, j.precio, j.esta_oferta, j.estado, c.nombre
    `, [id]);

    if (result.rows.length === 0) {
      return next(createError('Game not found', 404));
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/games
// @desc    Create new game
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nombre, precio, categoria_id, plataformas } = req.body;

    // Validate required fields
    if (!nombre || !precio || !categoria_id) {
      return res.status(400).json({
        success: false,
        error: 'Name, price and category are required'
      });
    }

    // Check if category exists
    const categoryResult = await query(
      'SELECT id FROM categoria WHERE id = $1',
      [categoria_id]
    );

    if (categoryResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Category not found'
      });
    }

    // Create game
    const gameResult = await query(
      'INSERT INTO juego (nombre, precio, categoria_id, esta_oferta, estado) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [nombre, precio, categoria_id, false, true]
    );

    const gameId = gameResult.rows[0].id;

    // Add platforms if provided
    if (plataformas && Array.isArray(plataformas)) {
      for (const plataformaId of plataformas) {
        await query(
          'INSERT INTO juego_plataforma (juego_id, plataforma_id) VALUES ($1, $2)',
          [gameId, plataformaId]
        );
      }
    }

    res.status(201).json({
      success: true,
      message: 'Game created successfully',
      data: { id: gameId }
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/games/:id
// @desc    Update game
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { nombre, precio, categoria_id, esta_oferta, estado, plataformas } = req.body;

    // Check if game exists
    const existingGame = await query(
      'SELECT id FROM juego WHERE id = $1',
      [id]
    );

    if (existingGame.rows.length === 0) {
      return next(createError('Game not found', 404));
    }

    // Update game
    await query(
      'UPDATE juego SET nombre = COALESCE($1, nombre), precio = COALESCE($2, precio), categoria_id = COALESCE($3, categoria_id), esta_oferta = COALESCE($4, esta_oferta), estado = COALESCE($5, estado) WHERE id = $6',
      [nombre, precio, categoria_id, esta_oferta, estado, id]
    );

    // Update platforms if provided
    if (plataformas && Array.isArray(plataformas)) {
      // Remove existing platforms
      await query('DELETE FROM juego_plataforma WHERE juego_id = $1', [id]);
      
      // Add new platforms
      for (const plataformaId of plataformas) {
        await query(
          'INSERT INTO juego_plataforma (juego_id, plataforma_id) VALUES ($1, $2)',
          [id, plataformaId]
        );
      }
    }

    res.json({
      success: true,
      message: 'Game updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/games/:id
// @desc    Delete game
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await query(
      'DELETE FROM juego WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return next(createError('Game not found', 404));
    }

    res.json({
      success: true,
      message: 'Game deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router; 
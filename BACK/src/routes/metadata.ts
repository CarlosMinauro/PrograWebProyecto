import express, { Request, Response, NextFunction } from 'express';
import { query } from '../config/database';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/categories', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await query('SELECT id, nombre FROM categoria ORDER BY id ASC');
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/platforms
// @desc    Get all platforms
// @access  Public
router.get('/platforms', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await query('SELECT id, nombre FROM plataforma ORDER BY id ASC');
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/analytics/summary
// @desc    Get sales and revenue summary for dashboard
// @access  Private/Admin
router.get('/analytics/summary', protect, authorize('admin'), async (req, res, next) => {
  try {
    const year = parseInt(req.query.year as string) || new Date().getFullYear();

    // Ingresos totales y ventas totales
    const totalResult = await query(
      `SELECT 
        COALESCE(SUM(monto_pagado), 0) AS ingresos_totales,
        COUNT(*) AS ventas_totales
      FROM venta
      WHERE EXTRACT(YEAR FROM fecha) = $1`,
      [year]
    );
    const ingresosTotales = parseFloat(totalResult.rows[0].ingresos_totales);
    const ventasTotales = parseInt(totalResult.rows[0].ventas_totales);
    const valorPromedioOrden = ventasTotales > 0 ? ingresosTotales / ventasTotales : 0;

    // Ingresos y ventas mensuales
    const monthlyResult = await query(
      `SELECT 
        EXTRACT(MONTH FROM fecha) AS mes,
        COALESCE(SUM(monto_pagado), 0) AS ingresos,
        COUNT(*) AS ventas
      FROM venta
      WHERE EXTRACT(YEAR FROM fecha) = $1
      GROUP BY mes
      ORDER BY mes ASC`,
      [year]
    );
    // Formatear a un array de 12 meses
    const monthlyData = Array.from({ length: 12 }, (_, i) => {
      const found = monthlyResult.rows.find((row) => parseInt(row.mes) === i + 1);
      return {
        mes: i + 1,
        ingresos: found ? parseFloat(found.ingresos) : 0,
        ventas: found ? parseInt(found.ventas) : 0,
      };
    });

    res.json({
      success: true,
      data: {
        ingresosTotales,
        ventasTotales,
        valorPromedioOrden,
        monthlyData,
        year
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router; 
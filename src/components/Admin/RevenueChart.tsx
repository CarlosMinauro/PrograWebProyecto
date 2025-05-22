import React, { useState } from 'react';
import styles from './RevenueChart.module.css';

// Datos simulados para visualización frontend
const mockRevenueData = [
  { year: 2024, month: 'Ene', revenue: 15000, sales: 120 },
  { year: 2024, month: 'Feb', revenue: 18000, sales: 150 },
  { year: 2024, month: 'Mar', revenue: 22000, sales: 180 },
  { year: 2024, month: 'Abr', revenue: 25000, sales: 200 },
  { year: 2024, month: 'May', revenue: 28000, sales: 220 },
  { year: 2024, month: 'Jun', revenue: 32000, sales: 250 },
  { year: 2024, month: 'Jul', revenue: 35000, sales: 280 },
  { year: 2024, month: 'Ago', revenue: 38000, sales: 300 },
  { year: 2024, month: 'Sep', revenue: 42000, sales: 330 },
  { year: 2024, month: 'Oct', revenue: 45000, sales: 350 },
  { year: 2024, month: 'Nov', revenue: 48000, sales: 380 },
  { year: 2024, month: 'Dic', revenue: 52000, sales: 400 },
  // Datos para 2023
  { year: 2023, month: 'Ene', revenue: 12000, sales: 100 },
  { year: 2023, month: 'Feb', revenue: 14000, sales: 110 },
  { year: 2023, month: 'Mar', revenue: 16000, sales: 130 },
  { year: 2023, month: 'Abr', revenue: 17000, sales: 140 },
  { year: 2023, month: 'May', revenue: 19000, sales: 150 },
  { year: 2023, month: 'Jun', revenue: 21000, sales: 170 },
  { year: 2023, month: 'Jul', revenue: 23000, sales: 180 },
  { year: 2023, month: 'Ago', revenue: 25000, sales: 190 },
  { year: 2023, month: 'Sep', revenue: 27000, sales: 200 },
  { year: 2023, month: 'Oct', revenue: 29000, sales: 210 },
  { year: 2023, month: 'Nov', revenue: 31000, sales: 220 },
  { year: 2023, month: 'Dic', revenue: 33000, sales: 230 },
];

const years = Array.from(new Set(mockRevenueData.map(d => d.year))).sort((a, b) => b - a);

const periods = [
  { value: 'all', label: 'Todo el tiempo' },
  { value: 'year', label: 'Este año' },
  { value: 'month', label: 'Este mes' },
  { value: 'week', label: 'Esta semana' }
];

function getFilteredData(year: number, period: string) {
  let data = mockRevenueData.filter(d => d.year === year);

  if (period === 'month') {
    // Solo el último mes
    const lastMonth = data[data.length - 1]?.month;
    data = data.filter(d => d.month === lastMonth);
  } else if (period === 'week') {
    // Simula la última semana como el último mes dividido entre 4
    const lastMonth = data[data.length - 1];
    if (lastMonth) {
      data = [{
        ...lastMonth,
        revenue: Math.round(lastMonth.revenue / 4),
        sales: Math.round(lastMonth.sales / 4),
        month: `${lastMonth.month} (sem)`
      }];
    }
  }
  // 'all' y 'year' muestran todo el año seleccionado
  return data;
}

export const RevenueChart = () => {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const filteredData = getFilteredData(selectedYear, selectedPeriod);

  // Cálculos de estadísticas
  const totalRevenue = filteredData.reduce((sum, d) => sum + d.revenue, 0);
  const totalSales = filteredData.reduce((sum, d) => sum + d.sales, 0);
  const avgOrderValue = totalSales ? (totalRevenue / totalSales) : 0;

  // Simulación de tendencias (comparación con año anterior)
  const prevYearData = getFilteredData(selectedYear - 1, selectedPeriod);
  const prevRevenue = prevYearData.reduce((sum, d) => sum + d.revenue, 0);
  const prevSales = prevYearData.reduce((sum, d) => sum + d.sales, 0);
  const prevAvgOrderValue = prevSales ? (prevRevenue / prevSales) : 0;

  const revenueTrend = prevRevenue ? (((totalRevenue - prevRevenue) / prevRevenue) * 100).toFixed(1) : '0';
  const salesTrend = prevSales ? (((totalSales - prevSales) / prevSales) * 100).toFixed(1) : '0';
  const avgOrderTrend = prevAvgOrderValue ? (((avgOrderValue - prevAvgOrderValue) / prevAvgOrderValue) * 100).toFixed(1) : '0';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Resumen de Ingresos</h2>
        <div className={styles.filters}>
          <select
            className={styles.select}
            value={selectedYear}
            onChange={e => setSelectedYear(Number(e.target.value))}
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select
            className={styles.select}
            value={selectedPeriod}
            onChange={e => setSelectedPeriod(e.target.value)}
          >
            {periods.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Ingresos Totales</h3>
          <p className={styles.value}>${totalRevenue.toLocaleString()}</p>
          <span className={`${styles.trend} ${Number(revenueTrend) >= 0 ? styles.positive : styles.negative}`}>
            {Number(revenueTrend) >= 0 ? '+' : ''}
            {revenueTrend}% respecto al año pasado
          </span>
        </div>
        <div className={styles.statCard}>
          <h3>Ventas Totales</h3>
          <p className={styles.value}>{totalSales.toLocaleString()}</p>
          <span className={`${styles.trend} ${Number(salesTrend) >= 0 ? styles.positive : styles.negative}`}>
            {Number(salesTrend) >= 0 ? '+' : ''}
            {salesTrend}% respecto al año pasado
          </span>
        </div>
        <div className={styles.statCard}>
          <h3>Valor Promedio de Orden</h3>
          <p className={styles.value}>${avgOrderValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          <span className={`${styles.trend} ${Number(avgOrderTrend) >= 0 ? styles.positive : styles.negative}`}>
            {Number(avgOrderTrend) >= 0 ? '+' : ''}
            {avgOrderTrend}% respecto al año pasado
          </span>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <div className={styles.chartHeader}>
          <h3>Ingresos Mensuales</h3>
          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={`${styles.legendColor} ${styles.revenue}`}></span>
              Ingresos
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.legendColor} ${styles.sales}`}></span>
              Ventas
            </span>
          </div>
        </div>
        <div className={styles.barChart}>
          {filteredData.map((item) => (
            <div key={item.month} className={styles.barGroup}>
              <div className={styles.bars}>
                <div 
                  className={`${styles.bar} ${styles.revenueBar}`}
                  style={{ height: `${(item.revenue / 52000) * 100}%` }}
                  title={`Ingresos: $${item.revenue.toLocaleString()}`}
                />
                <div 
                  className={`${styles.bar} ${styles.salesBar}`}
                  style={{ height: `${(item.sales / 400) * 100}%` }}
                  title={`Ventas: ${item.sales.toLocaleString()}`}
                />
              </div>
              <span className={styles.barLabel}>{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import styles from './RevenueChart.module.css';

// Datos simulados para visualización frontend
const mockRevenueData = [
  { month: 'Ene', revenue: 15000, sales: 120 },
  { month: 'Feb', revenue: 18000, sales: 150 },
  { month: 'Mar', revenue: 22000, sales: 180 },
  { month: 'Abr', revenue: 25000, sales: 200 },
  { month: 'May', revenue: 28000, sales: 220 },
  { month: 'Jun', revenue: 32000, sales: 250 },
  { month: 'Jul', revenue: 35000, sales: 280 },
  { month: 'Ago', revenue: 38000, sales: 300 },
  { month: 'Sep', revenue: 42000, sales: 330 },
  { month: 'Oct', revenue: 45000, sales: 350 },
  { month: 'Nov', revenue: 48000, sales: 380 },
  { month: 'Dic', revenue: 52000, sales: 400 },
];

export const RevenueChart = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Resumen de Ingresos</h2>
        <div className={styles.filters}>
          <select className={styles.select}>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <select className={styles.select}>
            <option value="all">Todo el tiempo</option>
            <option value="year">Este año</option>
            <option value="month">Este mes</option>
            <option value="week">Esta semana</option>
          </select>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Ingresos Totales</h3>
          <p className={styles.value}>$358,000</p>
          <span className={`${styles.trend} ${styles.positive}`}>+15% respecto al año pasado</span>
        </div>
        <div className={styles.statCard}>
          <h3>Ventas Totales</h3>
          <p className={styles.value}>2,960</p>
          <span className={`${styles.trend} ${styles.positive}`}>+12% respecto al año pasado</span>
        </div>
        <div className={styles.statCard}>
          <h3>Valor Promedio de Orden</h3>
          <p className={styles.value}>$120.95</p>
          <span className={`${styles.trend} ${styles.positive}`}>+3% respecto al año pasado</span>
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
          {mockRevenueData.map((item) => (
            <div key={item.month} className={styles.barGroup}>
              <div className={styles.bars}>
                <div 
                  className={`${styles.bar} ${styles.revenueBar}`}
                  style={{ height: `${(item.revenue / 52000) * 100}%` }}
                />
                <div 
                  className={`${styles.bar} ${styles.salesBar}`}
                  style={{ height: `${(item.sales / 400) * 100}%` }}
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
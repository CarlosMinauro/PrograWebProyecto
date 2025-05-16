import React from 'react';
import styles from './RevenueChart.module.css';

// Mock data for frontend visualization
const mockRevenueData = [
  { month: 'Jan', revenue: 15000, sales: 120 },
  { month: 'Feb', revenue: 18000, sales: 150 },
  { month: 'Mar', revenue: 22000, sales: 180 },
  { month: 'Apr', revenue: 25000, sales: 200 },
  { month: 'May', revenue: 28000, sales: 220 },
  { month: 'Jun', revenue: 32000, sales: 250 },
  { month: 'Jul', revenue: 35000, sales: 280 },
  { month: 'Aug', revenue: 38000, sales: 300 },
  { month: 'Sep', revenue: 42000, sales: 330 },
  { month: 'Oct', revenue: 45000, sales: 350 },
  { month: 'Nov', revenue: 48000, sales: 380 },
  { month: 'Dec', revenue: 52000, sales: 400 },
];

export const RevenueChart = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Revenue Overview</h2>
        <div className={styles.filters}>
          <select className={styles.select}>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <select className={styles.select}>
            <option value="all">All Time</option>
            <option value="year">This Year</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
          </select>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Total Revenue</h3>
          <p className={styles.value}>$358,000</p>
          <span className={`${styles.trend} ${styles.positive}`}>+15% from last year</span>
        </div>
        <div className={styles.statCard}>
          <h3>Total Sales</h3>
          <p className={styles.value}>2,960</p>
          <span className={`${styles.trend} ${styles.positive}`}>+12% from last year</span>
        </div>
        <div className={styles.statCard}>
          <h3>Average Order Value</h3>
          <p className={styles.value}>$120.95</p>
          <span className={`${styles.trend} ${styles.positive}`}>+3% from last year</span>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <div className={styles.chartHeader}>
          <h3>Monthly Revenue</h3>
          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={`${styles.legendColor} ${styles.revenue}`}></span>
              Revenue
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.legendColor} ${styles.sales}`}></span>
              Sales
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
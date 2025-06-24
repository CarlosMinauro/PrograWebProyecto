// Responsable: Fernando (IDs 17, 19, 25, 26)
// ID 17: "Como administrador, quiero poder ver el catálogo de juegos disponible en la página."
// ID 19: "Como administrador, quiero poder filtrar los juegos por categoría, fecha de lanzamiento y precios."
// ID 25: "Como administrador, quiero agregar, editar y eliminar noticias."
// ID 26: "Como administrador, deseo tener una barra de navegación que me facilite la navegación por la aplicación, con los siguientes apartados: Usuarios, Juegos, Noticias y Estadísticas."

// Responsable: Alejandro (ID 23)
// ID 23: "Como administrador, deseo ver un gráfico con las ganancias recaudadas por mes."

// Responsable: Jean (ID 24)
// ID 24: "Como administrador, debo poder ver una lista de noticias que se mostrarán en la página."

import { useState } from 'react';
import { mockGames } from '../../services/mockGames';
import { mockNews } from '../../services/mockNews';
import styles from './Dashboard.module.css';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'games' | 'news' | 'stats'>('games');
  const [games, setGames] = useState(mockGames);
  const [news, setNews] = useState<NewsItem[]>(mockNews);
  const [filters, setFilters] = useState({
    category: '',
    dateRange: { start: '', end: '' },
    priceRange: { min: 0, max: 100 }
  });

  // Mock monthly revenue data
  const monthlyRevenue = [
    { month: 'Jan', revenue: 15000 },
    { month: 'Feb', revenue: 18000 },
    { month: 'Mar', revenue: 22000 },
    { month: 'Apr', revenue: 19000 },
    { month: 'May', revenue: 25000 },
    { month: 'Jun', revenue: 28000 }
  ];

  const handleNewsDelete = (id: number) => {
    setNews(prev => prev.filter(item => item.id !== id));
  };

  const handleNewsEdit = (id: number) => {
    // Mock edit functionality
    console.log('Editing news item:', id);
  };

  const handleNewsAdd = () => {
    // Mock add functionality
    console.log('Adding new news item');
  };

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'games' ? styles.active : ''}`}
          onClick={() => setActiveTab('games')}
        >
          Games
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'news' ? styles.active : ''}`}
          onClick={() => setActiveTab('news')}
        >
          News
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'stats' ? styles.active : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
      </div>

      {activeTab === 'games' && (
        <div className={styles.section}>
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label>Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">All Categories</option>
                <option value="Action">Action</option>
                <option value="RPG">RPG</option>
                <option value="Strategy">Strategy</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Date Range</label>
              <div className={styles.dateRange}>
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => setFilters({
                    ...filters,
                    dateRange: { ...filters.dateRange, start: e.target.value }
                  })}
                />
                <span>to</span>
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => setFilters({
                    ...filters,
                    dateRange: { ...filters.dateRange, end: e.target.value }
                  })}
                />
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label>Price Range</label>
              <div className={styles.priceRange}>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.priceRange.min}
                  onChange={(e) => setFilters({
                    ...filters,
                    priceRange: { ...filters.priceRange, min: Number(e.target.value) }
                  })}
                />
                <span>to</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.priceRange.max}
                  onChange={(e) => setFilters({
                    ...filters,
                    priceRange: { ...filters.priceRange, max: Number(e.target.value) }
                  })}
                />
              </div>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Platform</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {games.map(game => (
                  <tr key={game.id}>
                    <td>{game.title}</td>
                    <td>{game.category}</td>
                    <td>{game.platform}</td>
                    <td>${game.price}</td>
                    <td>
                      <button className={styles.actionButton}>Edit</button>
                      <button className={`${styles.actionButton} ${styles.delete}`}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'news' && (
        <div className={styles.section}>
          <div className={styles.newsHeader}>
            <h2>News Management</h2>
            <button className={styles.addButton} onClick={handleNewsAdd}>
              Add News
            </button>
          </div>

          <div className={styles.newsGrid}>
            {news.map(item => (
              <div key={item.id} className={styles.newsCard}>
                <img src={item.imageUrl} alt={item.title} />
                <div className={styles.newsContent}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className={styles.newsFooter}>
                    <span>{item.date}</span>
                    <div className={styles.newsActions}>
                      <button onClick={() => handleNewsEdit(item.id)}>Edit</button>
                      <button onClick={() => handleNewsDelete(item.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className={styles.section}>
          <h2>Monthly Revenue</h2>
          <div className={styles.chart}>
            {monthlyRevenue.map(item => (
              <div key={item.month} className={styles.barContainer}>
                <div
                  className={styles.bar}
                  style={{ height: `${(item.revenue / 30000) * 100}%` }}
                />
                <span className={styles.barLabel}>{item.month}</span>
                <span className={styles.barValue}>${item.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 
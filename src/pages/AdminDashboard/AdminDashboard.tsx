import React from 'react';
import { RevenueChart } from '../../components/Admin/RevenueChart';
import { NewsManager } from '../../components/Admin/NewsManager';
import styles from './AdminDashboard.module.css';

// Mock data for frontend visualization only
const mockGames = [
  {
    id: '1',
    title: 'Cyber Adventure 2077',
    platform: 'PC',
    price: 59.99,
    category: 'RPG',
    imageUrl: 'https://via.placeholder.com/100'
  },
  {
    id: '2',
    title: 'Space Warriors',
    platform: 'PS5',
    price: 49.99,
    category: 'Action',
    imageUrl: 'https://via.placeholder.com/100'
  }
];

const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-03-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-03-14'
  }
];

export const AdminDashboard = () => {
  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`}>
          Products
        </button>
        <button className={styles.tab}>
          Users
        </button>
        <button className={styles.tab}>
          News
        </button>
        <button className={styles.tab}>
          Statistics
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search products..."
            />
          </div>
          <button className={styles.addButton}>
            Add Product
          </button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Platform</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockGames.map(game => (
                <tr key={game.id}>
                  <td>
                    <img
                      src={game.imageUrl}
                      alt={game.title}
                      className={styles.productImage}
                    />
                  </td>
                  <td>{game.title}</td>
                  <td>{game.platform}</td>
                  <td>${game.price}</td>
                  <td>{game.category}</td>
                  <td>
                    <button className={styles.editButton}>
                      Edit
                    </button>
                    <button className={styles.deleteButton}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select className={styles.roleSelect}>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </td>
                  <td>
                    <button className={`${styles.statusButton} ${styles.active}`}>
                      {user.status}
                    </button>
                  </td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <button className={styles.editButton}>Edit</button>
                    <button className={styles.deleteButton}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <NewsManager />
        <RevenueChart />
      </div>
    </div>
  );
}; 
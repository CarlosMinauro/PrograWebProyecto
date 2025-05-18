import React from 'react';
import { RevenueChart } from '../../components/Admin/RevenueChart';
import { NewsManager } from '../../components/Admin/NewsManager';
import styles from './AdminDashboard.module.css';

// Datos simulados solo para visualización frontend
const mockGames = [
  {
    id: '1',
    title: 'Aventura Cibernética 2077',
    platform: 'PC',
    price: 59.99,
    category: 'RPG',
    imageUrl: 'https://via.placeholder.com/100'
  },
  {
    id: '2',
    title: 'Guerreros Espaciales',
    platform: 'PS5',
    price: 49.99,
    category: 'Acción',
    imageUrl: 'https://via.placeholder.com/100'
  }
];

const mockUsers = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@ejemplo.com',
    role: 'admin',
    status: 'activo',
    lastLogin: '2024-03-15'
  },
  {
    id: '2',
    name: 'Ana García',
    email: 'ana@ejemplo.com',
    role: 'usuario',
    status: 'activo',
    lastLogin: '2024-03-14'
  }
];

export const AdminDashboard = () => {
  return (
    <div className={styles.container}>
      <h1>Panel de Administración</h1>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`}>
          Productos
        </button>
        <button className={styles.tab}>
          Usuarios
        </button>
        <button className={styles.tab}>
          Noticias
        </button>
        <button className={styles.tab}>
          Estadísticas
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Buscar productos..."
            />
          </div>
          <button className={styles.addButton}>
            Agregar producto
          </button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Título</th>
                <th>Plataforma</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Acciones</th>
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
                      Editar
                    </button>
                    <button className={styles.deleteButton}>
                      Eliminar
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
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Último acceso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select className={styles.roleSelect}>
                      <option value="admin">Administrador</option>
                      <option value="usuario">Usuario</option>
                    </select>
                  </td>
                  <td>
                    <button className={`${styles.statusButton} ${styles.active}`}>
                      {user.status}
                    </button>
                  </td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <button className={styles.editButton}>Editar</button>
                    <button className={styles.deleteButton}>Eliminar</button>
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
// Responsable: Fernando (ID 17, 19)
// "Como administrador, quiero poder ver y filtrar el catálogo de juegos."

import styles from './Games.module.css';

export const AdminGames = () => {
  return (
    <div className={styles.container}>
      <h1>Admin - Games Management</h1>
      <p>This section will allow admins to view, filter, add, edit, and delete games.</p>
      {/* Aquí irá la funcionalidad de gestión de juegos para el admin */}
    </div>
  );
};

export default AdminGames; 
import React, { useState } from 'react';
import styles from './GameManager.module.css'; // Reutiliza el CSS para mantener coherencia

// Mock data para usuarios
const mockUsers = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    role: 'admin',
    status: 'activo'
  },
  {
    id: '2',
    name: 'Ana Gómez',
    email: 'ana.gomez@email.com',
    role: 'usuario',
    status: 'inactivo'
  }
];

export const UserManager = () => {
  const [users, setUsers] = useState(mockUsers);
  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    role: 'usuario',
    status: 'activo'
  });
  const [editing, setEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setUsers(users.map(u => (u.id === form.id ? { ...form } : u)));
      setEditing(false);
    } else {
      setUsers([...users, { ...form, id: (Date.now()).toString() }]);
    }
    setForm({ id: '', name: '', email: '', role: 'usuario', status: 'activo' });
  };

  const handleEdit = (id: string) => {
    const user = users.find(u => u.id === id);
    if (user) {
      setForm(user);
      setEditing(true);
    }
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
    if (editing && form.id === id) {
      setForm({ id: '', name: '', email: '', role: 'usuario', status: 'activo' });
      setEditing(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Gestión de Usuarios</h2>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleAddUser}>
          <h3>{editing ? 'Editar Usuario' : 'Agregar Usuario'}</h3>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              name="name"
              required
              value={form.name}
              onChange={handleInputChange}
              placeholder="Nombre completo"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="role">Rol</label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleInputChange}
              required
            >
              <option value="usuario">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="status">Estado</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleInputChange}
              required
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              {editing ? 'Guardar Cambios' : 'Agregar Usuario'}
            </button>
            {editing && (
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => {
                  setForm({ id: '', name: '', email: '', role: 'usuario', status: 'activo' });
                  setEditing(false);
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className={styles.gamesList}>
        {users.map(user => (
          <div key={user.id} className={styles.gameCard}>
            <div className={styles.gameContent}>
              <div className={styles.gameHeader}>
                <h3>{user.name}</h3>
                <span className={`${styles.status} ${user.status === 'activo' ? styles.published : styles.draft}`}>
                  {user.status}
                </span>
              </div>
              <div className={styles.meta}>
                <span>Correo: {user.email}</span>
                <span>Rol: {user.role}</span>
              </div>
              <div className={styles.actions}>
                <button className={styles.editButton} onClick={() => handleEdit(user.id)}>
                  Editar
                </button>
                <button className={styles.deleteButton} onClick={() => handleDelete(user.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div style={{ padding: '1rem', color: '#888' }}>
            No hay usuarios registrados.
          </div>
        )}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import styles from './GameManager.module.css';

// Mock data para visualización frontend
const mockGames = [
  {
    id: '1',
    title: 'Cyberpunk 2077',
    platform: 'PC',
    price: 59.99,
    category: 'RPG',
    imageUrl: 'https://via.placeholder.com/100',
    status: 'published'
  },
  {
    id: '2',
    title: 'Guerreros Espaciales',
    platform: 'PlayStation 5',
    price: 49.99,
    category: 'Acción',
    imageUrl: 'https://wccftech.com/cyberpunk-2077-sequel-new-chicago-city/',
    status: 'draft'
  }
];

export const GameManager = () => {
  const [games, setGames] = useState(mockGames);

  // Handlers mock
  const handleAddGame = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica real para agregar un juego
    alert('Juego agregado (mock)');
  };

  const handleEdit = (id: string) => {
    alert(`Editar juego ${id} (mock)`);
  };

  const handleDelete = (id: string) => {
    setGames(games.filter(game => game.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Gestión de Juegos</h2>
        <button className={styles.addButton}>
          Agregar Juego
        </button>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleAddGame}>
          <h3>Agregar Juego</h3>
          <div className={styles.formGroup}>
            <label htmlFor="title">Título</label>
            <input id="title" name="title" required placeholder="Título del juego" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="platform">Plataforma</label>
            <input id="platform" name="platform" required placeholder="Ej: PC, PS5" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="price">Precio</label>
            <input id="price" name="price" type="number" step="0.01" required placeholder="Precio" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="category">Categoría</label>
            <input id="category" name="category" required placeholder="Categoría" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="imageUrl">URL de la imagen</label>
            <input id="imageUrl" name="imageUrl" required placeholder="URL de la imagen" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="status">Estado</label>
            <select id="status" name="status" required>
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              Agregar Juego
            </button>
          </div>
        </form>
      </div>

      <div className={styles.gamesList}>
        {games.map(game => (
          <div key={game.id} className={styles.gameCard}>
            <div className={styles.gameImage}>
              <img src={game.imageUrl} alt={game.title} />
            </div>
            <div className={styles.gameContent}>
              <div className={styles.gameHeader}>
                <h3>{game.title}</h3>
                <span className={`${styles.status} ${styles[game.status]}`}>
                  {game.status === 'published' ? 'Publicado' : 'Borrador'}
                </span>
              </div>
              <div className={styles.meta}>
                <span>Plataforma: {game.platform}</span>
                <span>Categoría: {game.category}</span>
                <span>Precio: ${game.price}</span>
              </div>
              <div className={styles.actions}>
                <button className={styles.editButton} onClick={() => handleEdit(game.id)}>
                  Editar
                </button>
                <button className={styles.deleteButton} onClick={() => handleDelete(game.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
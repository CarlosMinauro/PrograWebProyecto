import React from 'react';
import styles from './NewsManager.module.css';

// Mock data for frontend visualization only
const mockNews = [
  {
    id: '1',
    title: 'New Game Release: Cyber Adventure 2077',
    description: 'Experience the future of gaming with our latest release...',
    imageUrl: 'https://via.placeholder.com/300x200',
    date: '2024-03-15',
    author: 'John Doe',
    status: 'published'
  },
  {
    id: '2',
    title: 'Summer Sale Coming Soon!',
    description: 'Get ready for our biggest sale of the year...',
    imageUrl: 'https://via.placeholder.com/300x200',
    date: '2024-03-14',
    author: 'Jane Smith',
    status: 'draft'
  }
];

export const NewsManager = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Gestión de Noticias</h2>
        <button className={styles.addButton}>
          Agregar Noticia
        </button>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.form}>
          <h3>Agregar Noticia</h3>
          
          <div className={styles.formGroup}>
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Ingresa el título de la noticia"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              placeholder="Ingresa la descripción de la noticia"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="imageUrl">URL de la imagen</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              required
              placeholder="Ingresa la URL de la imagen"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status">Estado</label>
            <select
              id="status"
              name="status"
              required
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.submitButton}>
              Agregar Noticia
            </button>
          </div>
        </form>
      </div>

      <div className={styles.newsList}>
        {mockNews.map(item => (
          <div key={item.id} className={styles.newsCard}>
            <div className={styles.newsImage}>
              <img src={item.imageUrl} alt={item.title} />
            </div>
            <div className={styles.newsContent}>
              <div className={styles.newsHeader}>
                <h3>{item.title}</h3>
                <span className={`${styles.status} ${styles[item.status]}`}>
                  {item.status === 'published' ? 'Publicado' : 'Borrador'}
                </span>
              </div>
              <p className={styles.description}>{item.description}</p>
              <div className={styles.newsMeta}>
                <span>Por {item.author}</span>
                <span>•</span>
                <span>{item.date}</span>
              </div>
              <div className={styles.actions}>
                <button className={styles.editButton}>
                  Editar
                </button>
                <button className={styles.deleteButton}>
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
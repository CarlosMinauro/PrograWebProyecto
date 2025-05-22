import React, { useState } from 'react';
import styles from './NewsManager.module.css';
import { auto } from '@popperjs/core';
import { AuthProvider } from '../../contexts/AuthContext';

// Mock data for frontend visualization only
const initialNews = [
  {
    id: '1',
    title: 'New Game Release: Cyber Adventure 2077',
    description: 'Experience the future of gaming with our latest release...',
    imageUrl: 'https://variety.com/wp-content/uploads/2023/10/cyberpunk.jpeg?w=1000&h=667&crop=1&resize=910%2C607',
    date: '2024-03-15',
    author: 'John Doe',
    status: 'published'
  },
  {
    id: '2',
    title: 'Summer Sale Coming Soon!',
    description: 'Get ready for our biggest sale of the year...',
    imageUrl: 'https://img.freepik.com/vector-gratis/proximamente-fondo-diseno-efecto-luz-enfoque_1017-27277.jpg?semt=ais_hybrid&w=740',
    date: '2024-03-14',
    author: 'Jane Smith',
    status: 'draft'
  },
  {
    id: '3',
    title: 'Nuevos juegos de playstation 5 llegan este mes',
    description: 'Descubre los nuevos lanzamientos de juegos para PS5 que llegarán este mes...',
    imageUrl: 'https://www.playstation.com/cdn/cdn/ps5/ps5-games.jpg',
    date: '2024-03-13',
    autor: 'john doe',
    status: 'published'
  },
  {
    id: '4',
    title: 'Rumores sobre Nintendo Switch Pro: Lo que sabemos',
    description: 'Los últimos rumores sobre la próxima Nintendo Switch Pro y lo que podría significar para la comunidad gamer.',
    imageUrl: 'https://www.nintendo.com/content/dam/noa/en_US/games/switch/nintendo-switch-pro/hero.jpg',
    date: '2024-03-12',
    autor : 'Jane Smith',
    status: 'published'
  },
  {
    id: '5',
    title: 'PC Gaming: El auge de los juegos indie',
    description: 'Cómo los juegos indie están moldeando el futuro del gaming en PC y qué esperar en los próximos meses',    
    imageUrl: '../public/images/news/pc new.png',
    date: '2024-03-11',
    autor : 'John Doe',
    status: 'published'
  }
];

export const NewsManager = () => {
  const [news, setNews] = useState(initialNews);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    status: 'draft',
    author: '',
    date: ''
  });

  // Centrar el formulario
  const centerFormStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrEditNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.imageUrl || !form.status) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    if (editingId) {
      setNews(news.map(n =>
        n.id === editingId
          ? { ...n, ...form }
          : n
      ));
      setEditingId(null);
    } else {
      setNews([
        ...news,
        {
          id: (Date.now() + Math.random()).toString(),
          ...form,
          author: form.author || 'Admin',
          date: new Date().toISOString().slice(0, 10)
        }
      ]);
    }
    setForm({
      title: '',
      description: '',
      imageUrl: '',
      status: 'draft',
      author: '',
      date: ''
    });
    setShowForm(false);
  };

  const handleEdit = (id: string) => {
    const noticia = news.find(n => n.id === id);
    if (noticia) {
      setForm({
        title: noticia.title,
        description: noticia.description,
        imageUrl: noticia.imageUrl,
        status: noticia.status,
        author: noticia.author,
        date: noticia.date
      });
      setEditingId(id);
      setShowForm(true);
    }
  };

  const handleDelete = (id: string) => {
    setNews(news.filter(n => n.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm({
        title: '',
        description: '',
        imageUrl: '',
        status: 'draft',
        author: '',
        date: ''
      });
      setShowForm(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Gestión de Noticias</h2>
        <button
          className={styles.addButton}
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setForm({
              title: '',
              description: '',
              imageUrl: '',
              status: 'draft',
              author: '',
              date: ''
            });
          }}
        >
          Agregar Noticia
        </button>
      </div>

      {showForm && (
        <div style={centerFormStyle}>
          <form className={styles.form} onSubmit={handleAddOrEditNews}>
            <h3>{editingId ? 'Editar Noticia' : 'Agregar Noticia'}</h3>
            <div className={styles.formGroup}>
              <label htmlFor="title">Título</label>
              <input
                type="text"
                id="title"
                name="title"
                required
                placeholder="Ingresa el título de la noticia"
                value={form.title}
                onChange={handleFormChange}
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
                value={form.description}
                onChange={handleFormChange}
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
                value={form.imageUrl}
                onChange={handleFormChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="status">Estado</label>
              <select
                id="status"
                name="status"
                required
                value={form.status}
                onChange={handleFormChange}
              >
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
              </select>
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setForm({
                    title: '',
                    description: '',
                    imageUrl: '',
                    status: 'draft',
                    author: '',
                    date: ''
                  });
                }}
              >
                Cancelar
              </button>
              <button type="submit" className={styles.submitButton}>
                {editingId ? 'Guardar Cambios' : 'Agregar Noticia'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.newsList}>
        {news.map(item => (
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
                <button className={styles.editButton} onClick={() => handleEdit(item.id)}>
                  Editar
                </button>
                <button className={styles.deleteButton} onClick={() => handleDelete(item.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
        {news.length === 0 && (
          <div style={{ padding: '1rem', color: '#888' }}>
            No hay noticias registradas.
          </div>
        )}
      </div>
    </div>
  );
};
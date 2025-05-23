import React, { useState } from 'react';
import styles from './GameManager.module.css';

// Mock data para visualización frontend
const initialGames = [
  {
    id: '1',
    title: 'Cyberpunk 2077',
    platform: 'PC',
    price: 59.99,
    category: 'RPG',
    releaseDate: '2020-12-10',
    imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202008/0416/6Bo40lnWU0BhgrOUm7Cb6by3.png?w=780&thumb=false',
    status: 'published'
  },
  {
    id: '2',
    title: 'Guerreros Espaciales',
    platform: 'PS5',
    price: 49.99,
    category: 'Acción',
    releaseDate: '2023-05-01',
    imageUrl: 'https://wccftech.com/cyberpunk-2077-sequel-new-chicago-city/',
    status: 'draft'
  },
  {
    id: '3',
    title: 'Aventura Mística',
    platform: 'Switch',
    price: 39.99,
    category: 'Aventura',
    releaseDate: '2022-08-15',
    imageUrl: 'https://via.placeholder.com/100',
    status: 'published'
  },
  {
    id: '4',
    title: 'Uncharted 5',
    platform: 'PS5',
    price: 69.99,
    category: 'Aventura',
    releaseDate: '2025-03-10',
    imageUrl: 'https://alfabetajuega.com/hero/2025/05/uncharted-5-fan-art.jpg?width=1200&aspect_ratio=16:9',
    status: 'published'
  },
  {
    id: '5',
    title: 'Formula 1 2025',
    platform: 'PC',
    price: 59.99,
    category: 'Deportes',
    releaseDate: '2025-06-15',
    imageUrl: 'https://drop-assets.ea.com/images/4V5si2O8AjStpUbM4u2pbo/42f53716766ef6a4c43c4d49102ec17e/EAS_F1_25_LH_ICONIC_ED_w_STANDING_POSE_02_9000x9000_RGB_CLEAN_Opti.jpg?w=160',
    status: 'draft'
  },
  {
    id: '6',
    title: 'Street Fighter 6',
    platform: 'PS5',
    price: 49.99,
    category: 'Lucha',
    releaseDate: '2023-06-02',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1364780/header.jpg',
    status: 'published'
  },
  {
    id: '7',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    platform: 'Switch',
    price: 69.99,
    category: 'Aventura',
    releaseDate: '2023-05-12',
    imageUrl: 'https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/c_scale,w_400/ncom/en_US/games/switch/t/the-legend-of-zelda-tears-of-the-kingdom-switch/hero',
    status: 'published'
  },
  {
    id: '8',
    title: "Marvel's Spider-Man Remastered",
    platform: 'PC',
    price: 49.99,
    category: 'Acción',
    releaseDate: '2022-08-12',
    imageUrl: 'https://sm.ign.com/t/ign_latam/cover/m/marvels-sp/marvels-spider-man-remastered_mx15.1200.jpg',
    status: 'published'
  },
  {
    id: '9',
    title: 'Halo Infinite',
    platform: 'Xbox',
    price: 59.99,
    category: 'Shooter',
    releaseDate: '2021-12-08',
    imageUrl: 'https://images.cdn3.buscalibre.com/fit-in/360x360/5c/ff/5cff0805ea0e661ff9da3efc6a84ac5f.jpg',
    status: 'published'
  },
  {
    id: '10',
    title: 'The Last of Us Parte 2',
    platform: 'PS4',
    price: 39.99,
    category: 'Aventura',
    releaseDate: '2020-06-19',
    imageUrl: 'https://gmedia.playstation.com/is/image/SIEPDC/The-last-of-us-part-ii-remastered-hero-banner-desktop-02-en-16mar23?$2400px$',
    status: 'published'
  },
  {
    id: '11',
    title: 'Star Wars Jedi: Fallen Order',
    platform: 'PC',
    price: 29.99,
    category: 'Aventura',
    releaseDate: '2019-11-15',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172380/header.jpg',
    status: 'published'
  },
  {
    id: '12',
    title: 'Red Dead Redemption 2',
    platform: 'PC',
    price: 59.99,
    category: 'Acción',
    releaseDate: '2018-10-26',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg',
    status: 'published'
  },
  {
    id: '13',
    title: 'GTA 5',
    platform: 'PC',
    price: 29.99,
    category: 'Acción',
    releaseDate: '2015-04-14',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg',
    status: 'published'
  },
  {
    id: '14',
    title: 'GTA Vice City',
    platform: 'PC',
    price: 19.99,
    category: 'Acción',
    releaseDate: '2003-05-12',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/12110/header.jpg',
    status: 'published'
  }
];

const uniqueCategories = Array.from(new Set(initialGames.map(g => g.category)));

export const GameManager = () => {
  const [games, setGames] = useState(initialGames);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    releaseDate: ''
  });
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    platform: '',
    price: '',
    category: '',
    releaseDate: '',
    imageUrl: '',
    status: 'draft'
  });

  // Filtrado según los filtros seleccionados y búsqueda
  const filteredGames = games.filter(game => {
    const matchCategory = filters.category ? game.category === filters.category : true;
    const matchMinPrice = filters.minPrice ? game.price >= parseFloat(filters.minPrice) : true;
    const matchMaxPrice = filters.maxPrice ? game.price <= parseFloat(filters.maxPrice) : true;
    const matchReleaseDate = filters.releaseDate ? game.releaseDate === filters.releaseDate : true;
    const matchSearch = search
      ? game.title.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchCategory && matchMinPrice && matchMaxPrice && matchReleaseDate && matchSearch;
  });

  // Handlers
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.title ||
      !form.platform ||
      !form.price ||
      !form.category ||
      !form.releaseDate ||
      !form.imageUrl
    ) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    if (editingId) {
      setGames(games.map(g =>
        g.id === editingId
          ? { ...g, ...form, price: parseFloat(form.price) }
          : g
      ));
      setEditingId(null);
    } else {
      setGames([
        ...games,
        {
          id: (Date.now() + Math.random()).toString(),
          ...form,
          price: parseFloat(form.price)
        }
      ]);
    }
    setForm({
      title: '',
      platform: '',
      price: '',
      category: '',
      releaseDate: '',
      imageUrl: '',
      status: 'draft'
    });
    setShowForm(false);
  };

  const handleEdit = (id: string) => {
    const game = games.find(g => g.id === id);
    if (game) {
      setForm({
        title: game.title,
        platform: game.platform,
        price: game.price.toString(),
        category: game.category,
        releaseDate: game.releaseDate,
        imageUrl: game.imageUrl,
        status: game.status
      });
      setEditingId(id);
      setShowForm(true);
    }
  };

  const handleDelete = (id: string) => {
    setGames(games.filter(game => game.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm({
        title: '',
        platform: '',
        price: '',
        category: '',
        releaseDate: '',
        imageUrl: '',
        status: 'draft'
      });
      setShowForm(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Gestión de Juegos</h2>
        <button
          className={styles.addButton}
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setForm({
              title: '',
              platform: '',
              price: '',
              category: '',
              releaseDate: '',
              imageUrl: '',
              status: 'draft'
            });
          }}
        >
          Agregar Juego
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className={styles.formContainer}>
        <input
          type="text"
          placeholder="Buscar por nombre de juego..."
          value={search}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            padding: '0.7rem',
            borderRadius: '6px',
            border: '1px solid #cfd8dc',
            marginBottom: '1.5rem'
          }}
        />
      </div>

      {/* Filtros */}
      <div className={styles.formContainer}>
        <form className={styles.form} style={{ marginBottom: '1.5rem' }}>
          <h3>Filtrar Juegos</h3>
          <div className={styles.formGroup}>
            <label htmlFor="category">Categoría</label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">Todas</option>
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="releaseDate">Fecha de lanzamiento</label>
            <input
              id="releaseDate"
              name="releaseDate"
              type="date"
              value={filters.releaseDate}
              onChange={handleFilterChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="minPrice">Precio mínimo</label>
            <input
              id="minPrice"
              name="minPrice"
              type="number"
              step="0.01"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="maxPrice">Precio máximo</label>
            <input
              id="maxPrice"
              name="maxPrice"
              type="number"
              step="0.01"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="100"
            />
          </div>
        </form>
      </div>

      {/* Formulario para agregar/editar juegos */}
      {showForm && (
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleAddGame}>
            <h3>{editingId ? 'Editar Juego' : 'Agregar Juego'}</h3>
            <div className={styles.formGroup}>
              <label htmlFor="title">Título</label>
              <input
                id="title"
                name="title"
                required
                placeholder="Título del juego"
                value={form.title}
                onChange={handleFormChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="platform">Plataforma</label>
              <input
                id="platform"
                name="platform"
                required
                placeholder="Ej: PC, PS5"
                value={form.platform}
                onChange={handleFormChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="price">Precio</label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                required
                placeholder="Precio"
                value={form.price}
                onChange={handleFormChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="category">Categoría</label>
              <input
                id="category"
                name="category"
                required
                placeholder="Categoría"
                value={form.category}
                onChange={handleFormChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="releaseDate">Fecha de lanzamiento</label>
              <input
                id="releaseDate"
                name="releaseDate"
                type="date"
                required
                value={form.releaseDate}
                onChange={handleFormChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="imageUrl">URL de la imagen</label>
              <input
                id="imageUrl"
                name="imageUrl"
                required
                placeholder="URL de la imagen"
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
              <button type="submit" className={styles.submitButton}>
                {editingId ? 'Guardar Cambios' : 'Agregar Juego'}
              </button>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setForm({
                    title: '',
                    platform: '',
                    price: '',
                    category: '',
                    releaseDate: '',
                    imageUrl: '',
                    status: 'draft'
                  });
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.gamesList}>
        {filteredGames.map(game => (
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
                <span>Lanzamiento: {game.releaseDate}</span>
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
        {filteredGames.length === 0 && (
          <div style={{ padding: '1rem', color: '#888' }}>
            No se encontraron juegos con los filtros o búsqueda seleccionados.
          </div>
        )}
      </div>
    </div>
  );
};
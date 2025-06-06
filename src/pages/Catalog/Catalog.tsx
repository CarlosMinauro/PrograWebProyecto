import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockGames } from '../../data/mockData';
import type { Game } from '../../types';
import styles from './Catalog.module.css';

export const Catalog = () => {
  const [games, setGames] = useState<Game[]>(mockGames);
  const [filters, setFilters] = useState({
    priceRange: [0, 100],
    genre: '',
    platform: '',
    onSale: false,
    searchQuery: ''
  });

  const genres = Array.from(new Set(mockGames.flatMap(game => game.genre)));
  const platforms = Array.from(new Set(mockGames.map(game => game.platform)));

  useEffect(() => {
    let filteredGames = [...mockGames];

    // Apply search filter
    if (filters.searchQuery) {
      filteredGames = filteredGames.filter(game =>
        game.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Apply price range filter
    filteredGames = filteredGames.filter(game =>
      game.price >= filters.priceRange[0] && game.price <= filters.priceRange[1]
    );

    // Apply genre filter
    if (filters.genre) {
      filteredGames = filteredGames.filter(game => game.genre.includes(filters.genre));
    }

    // Apply platform filter
    if (filters.platform) {
      filteredGames = filteredGames.filter(game => game.platform === filters.platform);
    }

    // Apply sale filter
    if (filters.onSale) {
      filteredGames = filteredGames.filter(game => game.discountPrice !== undefined);
    }

    setGames(filteredGames);
  }, [filters]);

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <>
      <div className={styles.content}>
        <aside className={styles.filters}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search games..."
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <h3>Price Range</h3>
            <div className={styles.priceRange}>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
              />
              <span>${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3>Platform</h3>
            <select
              value={filters.platform}
              onChange={(e) => handleFilterChange('platform', e.target.value)}
            >
              <option value="">All Platforms</option>
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <h3>Genre</h3>
            <select
              value={filters.genre}
              onChange={(e) => handleFilterChange('genre', e.target.value)}
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <h3>Sort By</h3>
            <select>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </aside>

        <main className={styles.gamesGrid}>
          {games.map(game => (
            <Link to={`/game/${game.id}`} key={game.id} className={styles.gameCard}>
              <div className={styles.gameImageContainer}>
                <img src={game.imageUrl} alt={game.title} className={styles.gameImage} />
                {game.discountPrice && (
                  <span className={styles.saleBadge}>
                    {Math.round(((game.price - game.discountPrice) / game.price) * 100)}% OFF
                  </span>
                )}
              </div>
              <div className={styles.gameInfo}>
                <h3>{game.title}</h3>
                <div className={styles.gameMeta}>
                  <span className={styles.platform}>{game.platform}</span>
                  <span className={styles.rating}>★ {game.rating}</span>
                </div>
                <div className={styles.gamePrice}>
                  {game.discountPrice ? (
                    <>
                      <span className={styles.originalPrice}>${game.price}</span>
                      <span className={styles.discountPrice}>${game.discountPrice}</span>
                    </>
                  ) : (
                    <span>${game.price}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </>
  );
}; 
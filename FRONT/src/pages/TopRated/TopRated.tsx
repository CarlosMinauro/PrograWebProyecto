// Responsable: Jean (ID 8)
// "Como usuario, debo poder ver una lista con los juegos mejor valorados."

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockGames } from '../../data/mockData';
import type { Game } from '../../types';
import styles from './TopRated.module.css';

export const TopRated = () => {
  const [topRatedGames, setTopRatedGames] = useState<Game[]>(mockGames);

  // In a real application, this would be fetched from an API
  // and sorted by actual ratings
  useEffect(() => {
    // Sort by rating and number of reviews
    const sortedGames = [...mockGames].sort((a, b) => {
      // First sort by rating
      const ratingDiff = (b.rating || 0) - (a.rating || 0);
      if (ratingDiff !== 0) return ratingDiff;
      
      // Then by number of reviews (if available)
      const aReviews = a.reviews?.length || 0;
      const bReviews = b.reviews?.length || 0;
      return bReviews - aReviews;
    });
    setTopRatedGames(sortedGames);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Juegos Mejor Valorados</h1>
      <p className={styles.description}>
        Descubre nuestros juegos con mejores calificaciones, elegidos por la comunidad.
      </p>

      <div className={styles.gameGrid}>
        {topRatedGames.map((game, index) => (
          <Link to={`/game/${game.id}`} key={game.id} className={styles.gameCard}>
            <div className={styles.rank}>{index + 1}</div>
            <div className={styles.gameImageContainer}>
              <img src={game.imageUrl} alt={game.title} className={styles.gameImage} />
              {game.discountPrice && (
                <span className={styles.saleBadge}>
                  {Math.round(((game.price - game.discountPrice) / game.price) * 100)}% DTO
                </span>
              )}
            </div>
            <div className={styles.gameInfo}>
              <h3>{game.title}</h3>
              <div className={styles.gameMeta}>
                <span className={styles.platform}>{game.platform}</span>
                <span className={styles.rating}>★ {game.rating}</span>
              </div>
              <div className={styles.reviews}>
                {game.reviews?.length || 0} reseñas
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
      </div>
    </div>
  );
};
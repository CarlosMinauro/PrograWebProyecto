import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockGames } from '../../data/mockData';
import type { Game } from '../../types';
import styles from './BestSellers.module.css';

export const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState<Game[]>(mockGames);

  // En una aplicación real, esto se obtendría de una API
  // y se ordenaría por datos reales de ventas
  useEffect(() => {
    // Implementación mock: ordenar por calificación y descuento
    const sortedGames = [...mockGames].sort((a, b) => {
      // Primero por calificación
      const ratingDiff = (b.rating || 0) - (a.rating || 0);
      if (ratingDiff !== 0) return ratingDiff;
      
      // Luego por descuento (si hay)
      const aDiscount = a.discountPrice ? ((a.price - a.discountPrice) / a.price) : 0;
      const bDiscount = b.discountPrice ? ((b.price - b.discountPrice) / b.price) : 0;
      return bDiscount - aDiscount;
    });
    setBestSellers(sortedGames);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Más Vendidos</h1>
      <p className={styles.description}>
        Descubre nuestros juegos más populares, elegidos por nuestra comunidad de jugadores.
      </p>

      <div className={styles.gameGrid}>
        {bestSellers.map((game, index) => (
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
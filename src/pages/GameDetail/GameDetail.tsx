// Responsable: Carlos (ID 9)
// "Como usuario, al hacer clic en alguno de los juegos, debo poder ver el detalle del juego, una descripción, tráiler, fotos del mismo, estrellas y reseñas del mismo."

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockGames } from '../../services/mockGames';
import styles from './GameDetail.module.css';

interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState(mockGames.find(g => g.id === Number(id)));
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      userId: 1,
      userName: "John Doe",
      rating: 5,
      comment: "Amazing game! The graphics are stunning and the gameplay is smooth.",
      date: "2024-03-15"
    },
    {
      id: 2,
      userId: 2,
      userName: "Jane Smith",
      rating: 4,
      comment: "Great game overall, but could use some improvements in the multiplayer mode.",
      date: "2024-03-14"
    }
  ]);

  if (!game) {
    return <div className={styles.notFound}>Game not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{game.title}</h1>
        <div className={styles.rating}>
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < game.rating ? styles.star : styles.starEmpty}>
              ★
            </span>
          ))}
          <span className={styles.ratingCount}>({game.rating} / 5)</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mediaSection}>
          <div className={styles.mainImage}>
            <img src={game.imageUrl} alt={game.title} />
          </div>
          
          <div className={styles.thumbnailGrid}>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`${styles.thumbnail} ${selectedImage === i ? styles.selected : ''}`}
                onClick={() => setSelectedImage(i)}
              >
                <img src={game.imageUrl} alt={`${game.title} thumbnail ${i + 1}`} />
              </div>
            ))}
          </div>

          <div className={styles.trailer}>
            <h3>Game Trailer</h3>
            <div className={styles.videoContainer}>
              {/* Mock video player - in a real app, this would be a proper video player */}
              <div className={styles.videoPlaceholder}>
                <span>Video Player</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.priceSection}>
            <div className={styles.price}>
              {game.isOnSale ? (
                <>
                  <span className={styles.originalPrice}>${game.price}</span>
                  <span className={styles.salePrice}>${game.salePrice}</span>
                </>
              ) : (
                <span>${game.price}</span>
              )}
            </div>
            <button className={styles.buyButton}>Add to Cart</button>
          </div>

          <div className={styles.description}>
            <h3>Description</h3>
            <p>{game.description}</p>
          </div>

          <div className={styles.details}>
            <h3>Game Details</h3>
            <div className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Platform:</span>
                <span>{game.platform}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Category:</span>
                <span>{game.category}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Release Date:</span>
                <span>{game.releaseDate}</span>
              </div>
            </div>
          </div>

          <div className={styles.reviews}>
            <h3>Reviews</h3>
            {reviews.map(review => (
              <div key={review.id} className={styles.review}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewerName}>{review.userName}</span>
                  <div className={styles.reviewRating}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < review.rating ? styles.star : styles.starEmpty}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className={styles.reviewDate}>{review.date}</span>
                </div>
                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 
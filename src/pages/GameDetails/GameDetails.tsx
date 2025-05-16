import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockGames } from '../../data/mockData';
import { Game, Review } from '../../types';
import styles from './GameDetails.module.css';

export const GameDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    // In a real app, this would be an API call
    const foundGame = mockGames.find(g => g.id === id);
    setGame(foundGame || null);
  }, [id]);

  if (!game) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    const review: Review = {
      id: Date.now().toString(),
      userId: 'current-user', // In a real app, this would come from auth context
      userName: 'Current User', // In a real app, this would come from auth context
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString()
    };

    setGame(prev => prev ? {
      ...prev,
      reviews: [...prev.reviews, review]
    } : null);

    setNewReview({ rating: 5, comment: '' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{game.title}</h1>
        <div className={styles.meta}>
          <span className={styles.platform}>{game.platform}</span>
          <span className={styles.rating}>★ {game.rating}</span>
          {game.isNew && <span className={styles.badge}>New</span>}
          {game.isBestSeller && <span className={styles.badge}>Best Seller</span>}
          {game.isTopRated && <span className={styles.badge}>Top Rated</span>}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <img
              src={game.screenshots[selectedImage] || game.imageUrl}
              alt={game.title}
            />
          </div>
          <div className={styles.thumbnails}>
            <img
              src={game.imageUrl}
              alt="Main"
              className={selectedImage === -1 ? styles.selected : ''}
              onClick={() => setSelectedImage(-1)}
            />
            {game.screenshots.map((screenshot, index) => (
              <img
                key={index}
                src={screenshot}
                alt={`Screenshot ${index + 1}`}
                className={selectedImage === index ? styles.selected : ''}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.priceSection}>
            <div className={styles.price}>
              {game.discountPrice ? (
                <>
                  <span className={styles.originalPrice}>${game.price}</span>
                  <span className={styles.discountPrice}>${game.discountPrice}</span>
                </>
              ) : (
                <span>${game.price}</span>
              )}
            </div>
            <button className={styles.addToCart}>Add to Cart</button>
          </div>

          <div className={styles.description}>
            <h2>Description</h2>
            <p>{game.description}</p>
          </div>

          {game.trailerUrl && (
            <div className={styles.trailer}>
              <h2>Trailer</h2>
              <div className={styles.videoContainer}>
                <iframe
                  src={game.trailerUrl}
                  title="Game Trailer"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          <div className={styles.reviews}>
            <h2>Reviews</h2>
            <div className={styles.reviewForm}>
              <h3>Write a Review</h3>
              <form onSubmit={handleReviewSubmit}>
                <div className={styles.ratingInput}>
                  <label>Rating:</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview(prev => ({
                      ...prev,
                      rating: Number(e.target.value)
                    }))}
                  >
                    {[5, 4, 3, 2, 1].map(rating => (
                      <option key={rating} value={rating}>
                        {'★'.repeat(rating)}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({
                    ...prev,
                    comment: e.target.value
                  }))}
                  placeholder="Write your review..."
                  required
                />
                <button type="submit">Submit Review</button>
              </form>
            </div>

            <div className={styles.reviewList}>
              {game.reviews.map(review => (
                <div key={review.id} className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewer}>{review.userName}</span>
                    <span className={styles.reviewDate}>
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.reviewRating}>
                    {'★'.repeat(review.rating)}
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockGames } from '../../data/mockData';
import type { Game, Review } from '../../types/index';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useNotification } from '../../contexts/NotificationContext';
import styles from './GameDetails.module.css';

export const GameDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated, hasPurchasedGame } = useAuth();
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const [game, setGame] = useState<Game | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would be an API call
    const foundGame = mockGames.find(g => g.id === id);
    setGame(foundGame || null);
  }, [id]);

  if (!game) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const handlePurchase = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    addToCart(game.id);
    showNotification('Game added to cart!', 'success');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      showNotification('Please log in to submit a review', 'info');
      return;
    }

    if (!hasPurchasedGame(game.id)) {
      showNotification('You can only review games you have purchased', 'error');
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      userId: user!.id,
      userName: user!.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString(),
      helpful: 0,
      notHelpful: 0
    };

    setGame(prev => prev ? {
      ...prev,
      reviews: [...prev.reviews, review]
    } : null);

    setNewReview({ rating: 5, comment: '' });
    showNotification('Review submitted successfully!', 'success');
  };

  const renderStars = (rating: number) => {
    return (
      <div className={styles.stars}>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`${styles.star} ${index < rating ? styles.filled : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderPurchaseButton = () => {
    if (!isAuthenticated) {
      return (
        <button 
          className={`${styles.addToCart} ${styles.loginRequired}`}
          onClick={() => alert('Please log in to purchase games')}
        >
          Log in to Purchase
        </button>
      );
    }

    if (hasPurchasedGame(game.id)) {
      return (
        <button className={`${styles.addToCart} ${styles.purchased}`} disabled>
          Purchased
        </button>
      );
    }

    return (
      <button 
        className={`${styles.addToCart} ${styles[purchaseStatus]}`}
        onClick={handlePurchase}
        disabled={purchaseStatus === 'processing'}
      >
        {purchaseStatus === 'processing' ? 'Processing...' :
         purchaseStatus === 'success' ? 'Purchase Successful!' :
         purchaseStatus === 'error' ? 'Error - Try Again' :
         'Add to Cart'}
      </button>
    );
  };

  const renderReviewForm = () => {
    if (!isAuthenticated) {
      return (
        <div className={styles.reviewForm}>
          <h3>Write a Review</h3>
          <p className={styles.loginRequired}>Please log in to write a review</p>
        </div>
      );
    }

    if (!hasPurchasedGame(game.id)) {
      return (
        <div className={styles.reviewForm}>
          <h3>Write a Review</h3>
          <p className={styles.purchaseRequired}>You need to purchase this game to write a review</p>
        </div>
      );
    }

    return (
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
          <button type="submit" className={styles.submitReview}>
            Submit Review
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{game.title}</h1>
        <div className={styles.meta}>
          <span className={styles.platform}>{game.platform}</span>
          <div className={styles.rating}>
            {renderStars(Math.round(game.rating))}
            <span className={styles.ratingNumber}>{game.rating}</span>
          </div>
          <div className={styles.badges}>
            {game.discountPrice && (
              <span className={`${styles.badge} ${styles.discount}`}>
                {Math.round(((game.price - game.discountPrice) / game.price) * 100)}% OFF
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
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
              {renderPurchaseButton()}
            </div>

            <div className={styles.gameInfo}>
              <div className={styles.infoSection}>
                <h3>Game Information</h3>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Developer</span>
                    <span className={styles.infoValue}>{game.developer}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Publisher</span>
                    <span className={styles.infoValue}>{game.publisher}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Release Date</span>
                    <span className={styles.infoValue}>
                      {new Date(game.releaseDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Platform</span>
                    <span className={styles.infoValue}>{game.platform}</span>
                  </div>
                </div>
              </div>

              <div className={styles.genres}>
                <h3>Genres</h3>
                <div className={styles.genreTags}>
                  {game.genre.map((genre, index) => (
                    <span key={index} className={styles.genreTag}>
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.features}>
                <h3>Features</h3>
                <ul className={styles.featureList}>
                  {game.features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.description}>
                <h3>Description</h3>
                <p>{game.description}</p>
              </div>

              {game.videos && game.videos.length > 0 && (
                <div className={styles.trailer}>
                  <h3>Trailer</h3>
                  <div className={styles.videoContainer}>
                    <iframe
                      src={`https://www.youtube.com/embed/${game.videos[0]}`}
                      title={`${game.title} Trailer`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {game.requirements && (
                <div className={styles.requirements}>
                  <h3>System Requirements</h3>
                  <div className={styles.requirementsGrid}>
                    {game.requirements.minimum && (
                      <div className={styles.requirementSection}>
                        <h4>Minimum Requirements</h4>
                        <ul>
                          {game.requirements.minimum.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {game.requirements.recommended && (
                      <div className={styles.requirementSection}>
                        <h4>Recommended Requirements</h4>
                        <ul>
                          {game.requirements.recommended.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.reviews}>
          <h2>Reviews</h2>
          <div className={styles.reviewStats}>
            <div className={styles.overallRating}>
              <span className={styles.ratingNumber}>{game.rating}</span>
              {renderStars(Math.round(game.rating))}
              <span className={styles.reviewCount}>
                {game.reviews.length} reviews
              </span>
            </div>
          </div>

          {renderReviewForm()}

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
                  {renderStars(review.rating)}
                </div>
                <p className={styles.reviewComment}>{review.comment}</p>
                <div className={styles.reviewActions}>
                  <button className={styles.helpfulButton}>
                    Helpful ({review.helpful})
                  </button>
                  <button className={styles.notHelpfulButton}>
                    Not Helpful ({review.notHelpful})
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 
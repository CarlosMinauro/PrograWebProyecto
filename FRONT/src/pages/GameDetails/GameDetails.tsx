import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gameService } from '../../services/api/gameService';
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
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGame = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await gameService.getGameById(id);
        setGame(response.data);
      } catch (error) {
        console.error('Error fetching game:', error);
        showNotification('Error al cargar el juego', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id, showNotification]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando juego...</p>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Juego no encontrado</h2>
          <p>El juego que buscas no existe o ha sido removido.</p>
        </div>
      </div>
    );
  }

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    
    try {
      setPurchaseStatus('processing');
      await addToCart(game.id.toString());
      setPurchaseStatus('success');
      showNotification('Juego Agregado al Carrito!', 'success');
      
      // Reset status after 2 seconds
      setTimeout(() => setPurchaseStatus('idle'), 2000);
    } catch (error) {
      setPurchaseStatus('error');
      showNotification('Error al agregar al carrito', 'error');
      
      // Reset status after 2 seconds
      setTimeout(() => setPurchaseStatus('idle'), 2000);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      showNotification('Por favor inicia sesión para enviar una reseña', 'info');
      return;
    }

    if (!hasPurchasedGame(game.id.toString())) {
      showNotification('Solo puedes reseñar juegos que hayas comprado', 'error');
      return;
    }

    // TODO: Implement review submission to API
    const review: Review = {
      id: Date.now().toString(),
      userId: user!.id.toString(),
      userName: user!.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString(),
      helpful: 0,
      notHelpful: 0
    };

    setGame(prev => prev ? {
      ...prev,
      reviews: [...(prev.reviews || []), review]
    } : null);

    setNewReview({ rating: 5, comment: '' });
    showNotification('¡Reseña enviada con éxito!', 'success');
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
          onClick={() => navigate('/login', { state: { from: location.pathname } })}
        >
          Inicia sesión para comprar
        </button>
      );
    }

    if (hasPurchasedGame(game.id.toString())) {
      return (
        <button className={`${styles.addToCart} ${styles.purchased}`} disabled>
          Comprado
        </button>
      );
    }

    return (
      <button 
        className={`${styles.addToCart} ${styles[purchaseStatus]}`}
        onClick={handlePurchase}
        disabled={purchaseStatus === 'processing'}
      >
        {purchaseStatus === 'processing' ? 'Procesando...' :
         purchaseStatus === 'success' ? '¡Agregado al carrito!' :
         purchaseStatus === 'error' ? 'Error - Intenta de nuevo' :
         'Agregar al carrito'}
      </button>
    );
  };

  const renderReviewForm = () => {
    if (!isAuthenticated) {
      return (
        <div className={styles.reviewForm}>
          <h3>Escribe una reseña</h3>
          <p className={styles.loginRequired}>Por favor inicia sesión para escribir una reseña</p>
        </div>
      );
    }

    if (!hasPurchasedGame(game.id.toString())) {
      return (
        <div className={styles.reviewForm}>
          <h3>Escribe una reseña</h3>
          <p className={styles.purchaseRequired}>Debes comprar este juego para escribir una reseña</p>
        </div>
      );
    }

    return (
      <div className={styles.reviewForm}>
        <h3>Escribe una reseña</h3>
        <form onSubmit={handleReviewSubmit}>
          <div className={styles.ratingInput}>
            <label>Calificación:</label>
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
            placeholder="Escribe tu reseña..."
            required
          />
          <button type="submit" className={styles.submitReview}>
            Enviar Reseña
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{game.nombre}</h1>
        <div className={styles.meta}>
          <span className={styles.platform}>
            {game.plataformas?.[0] || 'PC'}
          </span>
          <div className={styles.rating}>
            {renderStars(Math.round(game.calificacion_promedio || 0))}
            <span className={styles.ratingNumber}>
              {game.calificacion_promedio?.toFixed(1) || 'N/A'}
            </span>
          </div>
          <div className={styles.badges}>
            {game.esta_oferta && (
              <span className={`${styles.badge} ${styles.discount}`}>
                OFERTA
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.gameImages}>
            <div className={styles.mainImage}>
              <img 
                src={`/images/games/covers/${game.nombre.toLowerCase().replace(/\s+/g, '')}.jpg`}
                alt={game.nombre}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/games/covers/default-game.jpg";
                }}
              />
            </div>
            {game.screenshots && game.screenshots.length > 0 && (
              <div className={styles.screenshots}>
                {game.screenshots.map((screenshot, index) => (
                  <img
                    key={index}
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    className={selectedImage === index ? styles.active : ''}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className={styles.gameInfo}>
            <div className={styles.priceSection}>
              <div className={styles.price}>
                <span className={styles.currentPrice}>${game.precio}</span>
              </div>
              {renderPurchaseButton()}
            </div>

            <div className={styles.description}>
              <h3>Descripción</h3>
              <p>{game.descripcion || 'Descripción no disponible.'}</p>
            </div>

            <div className={styles.details}>
              <h3>Detalles del Juego</h3>
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Desarrollador:</span>
                  <span className={styles.value}>{game.desarrollador || 'N/A'}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Publisher:</span>
                  <span className={styles.value}>{game.publisher || 'N/A'}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Plataformas:</span>
                  <span className={styles.value}>
                    {game.plataformas?.join(', ') || 'PC'}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Géneros:</span>
                  <span className={styles.value}>
                    {game.generos?.join(', ') || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.reviewsSection}>
          <h3>Reseñas ({game.reviews?.length || 0})</h3>
          {game.reviews && game.reviews.length > 0 ? (
            <div className={styles.reviews}>
              {game.reviews.map((review) => (
                <div key={review.id} className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewerName}>{review.userName}</span>
                    <div className={styles.reviewRating}>
                      {renderStars(review.rating)}
                    </div>
                    <span className={styles.reviewDate}>
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noReviews}>No hay reseñas aún. ¡Sé el primero en reseñar!</p>
          )}
          
          {renderReviewForm()}
        </div>
      </div>
    </div>
  );
};
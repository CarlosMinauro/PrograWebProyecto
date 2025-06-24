import type { GameCardProps } from '../../types/game';
import styles from './GameCard.module.css';

export const GameCard: React.FC<GameCardProps> = ({ game, onAddToCart }) => {
  // Construir la ruta de la imagen usando el ID del juego
  const thumbnailUrl = `/images/games/thumbnails/${game.id}-thumb.jpg`;
  const coverUrl = `/images/games/covers/${game.id}-cover.jpg`;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={thumbnailUrl} 
          alt={game.title} 
          className={styles.image}
          onError={(e) => {
            // Si la miniatura no existe, usar la portada
            const target = e.target as HTMLImageElement;
            target.src = coverUrl;
            target.onerror = () => {
              // Si ninguna imagen existe, usar una imagen por defecto
              target.src = '/images/games/placeholder.jpg';
            };
          }}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{game.title}</h3>
        <p className={styles.price}>${game.price.toFixed(2)}</p>
        <div className={styles.rating}>
          Rating: {game.rating}/5
        </div>
        {onAddToCart && (
          <button 
            className={styles.addToCart}
            onClick={() => onAddToCart(game)}
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </div>
  );
}; 
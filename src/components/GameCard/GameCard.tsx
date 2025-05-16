import type { GameCardProps } from '../../types/game';
import styles from './GameCard.module.css';

export const GameCard: React.FC<GameCardProps> = ({ game, onAddToCart }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={game.imageUrl} alt={game.title} className={styles.image} />
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
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}; 
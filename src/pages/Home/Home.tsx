import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGames } from '../../hooks/useGames';
import { mockGames, mockNews } from '../../data/mockData';
import styles from './Home.module.css';

export const Home = () => {
  const navigate = useNavigate();
  const { games } = useGames();
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [latestGames, setLatestGames] = useState(
    mockGames
      .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
      .slice(0, 10)
  );

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % mockNews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevNews = () => {
    setCurrentNewsIndex((prev) => (prev - 1 + mockNews.length) % mockNews.length);
  };

  const handleNextNews = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % mockNews.length);
  };

  return (
    <div className={styles.container}>
      {/* News Carousel Section */}
      <section className={styles.newsSection}>
        <h2 className={styles.sectionTitle}>Latest News</h2>
        <div className={styles.carousel}>
          <button 
            className={`${styles.carouselButton} ${styles.prevButton}`}
            onClick={handlePrevNews}
            aria-label="Previous news"
          >
            ‹
          </button>
          
          <div className={styles.carouselContent}>
            {mockNews.map((news, index) => (
              <div
                key={news.id}
                className={`${styles.newsCard} ${index === currentNewsIndex ? styles.active : ''}`}
                style={{
                  transform: `translateX(${(index - currentNewsIndex) * 100}%)`,
                }}
              >
                <div className={styles.newsImage}>
                  <img src={news.imageUrl} alt={news.title} />
                </div>
                <div className={styles.newsInfo}>
                  <span className={styles.newsDate}>{news.date}</span>
                  <h3 className={styles.newsTitle}>{news.title}</h3>
                  <p className={styles.newsDescription}>{news.content}</p>
                  <Link to={`/news/${news.id}`} className={styles.readMore}>
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <button 
            className={`${styles.carouselButton} ${styles.nextButton}`}
            onClick={handleNextNews}
            aria-label="Next news"
          >
            ›
          </button>

          <div className={styles.carouselIndicators}>
            {mockNews.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentNewsIndex ? styles.active : ''}`}
                onClick={() => setCurrentNewsIndex(index)}
                aria-label={`Go to news ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Games Section */}
      <section className={styles.gamesSection}>
        <div className={styles.sectionHeader}>
          <h2>Latest Releases</h2>
          <Link to="/catalog" className={styles.viewAll}>
            View All Games
          </Link>
        </div>
        <div className={styles.gamesGrid}>
          {latestGames.map((game) => (
            <Link to={`/game/${game.id}`} key={game.id} className={styles.gameCard}>
              <div className={styles.gameImage}>
                <img src={game.imageUrl} alt={game.title} />
                {game.discountPrice && (
                  <span className={styles.discountBadge}>
                    {Math.round(((game.price - game.discountPrice) / game.price) * 100)}% OFF
                  </span>
                )}
                <span className={styles.platform}>{game.platform}</span>
              </div>
              <div className={styles.gameInfo}>
                <h3 className={styles.gameTitle}>{game.title}</h3>
                <div className={styles.gameMeta}>
                  <span className={styles.gamePlatform}>{game.platform}</span>
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
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}; 
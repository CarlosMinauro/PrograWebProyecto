import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGames } from '../../hooks/useGames';
import { mockGames } from '../../data/mockData';
import type { NewsItem } from '../../types';
import styles from './Home.module.css';

// Mock news data - in a real app, this would come from an API
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'New Gaming Console Announced',
    description: 'The next generation of gaming is here with revolutionary features and stunning graphics.',
    imageUrl: '/images/news/console.jpg',
    date: '2024-03-15',
    content: 'Full article content here...',
    author: 'John Smith',
    tags: ['Hardware', 'Console', 'Announcement']
  },
  {
    id: '2',
    title: 'E-Sports Championship Finals',
    description: 'Watch the best players compete for the ultimate gaming glory and million-dollar prizes.',
    imageUrl: '/images/news/esports.jpg',
    date: '2024-03-14',
    content: 'Full article content here...',
    author: 'Jane Doe',
    tags: ['E-Sports', 'Tournament', 'Competition']
  },
  {
    id: '3',
    title: 'Game Development Conference',
    description: 'Join industry leaders as they discuss the future of gaming and showcase upcoming titles.',
    imageUrl: '/images/news/conference.jpg',
    date: '2024-03-13',
    content: 'Full article content here...',
    author: 'Mike Johnson',
    tags: ['Conference', 'Development', 'Industry']
  }
];

export const Home = () => {
  const navigate = useNavigate();
  const { games } = useGames();
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [latestGames, setLatestGames] = useState(mockGames.slice(0, 10));

  // Get featured games (newest and discounted)
  const featuredGames = games
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, 4);

  const discountedGames = games
    .filter(game => game.discountPrice)
    .sort((a, b) => {
      const discountA = ((a.price - a.discountPrice!) / a.price) * 100;
      const discountB = ((b.price - b.discountPrice!) / b.price) * 100;
      return discountB - discountA;
    })
    .slice(0, 4);

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
    <>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Welcome to Game Store</h1>
          <p>Discover the best games for your favorite platforms</p>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Featured Games</h2>
        </div>
        <div className={styles.gameGrid}>
          {/* Game cards will go here */}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>New Releases</h2>
        </div>
        <div className={styles.gameGrid}>
          {/* Game cards will go here */}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Special Offers</h2>
        </div>
        <div className={styles.gameGrid}>
          {/* Game cards will go here */}
        </div>
      </section>
    </>
  );
}; 
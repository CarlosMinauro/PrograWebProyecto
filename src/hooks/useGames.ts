import { useState, useEffect } from 'react';

interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  discount?: number;
  image: string;
  category: string;
  rating: number;
  releaseDate: string;
  publisher: string;
  platform: string[];
}

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulamos la carga de datos desde una API
    const fetchGames = async () => {
      try {
        // Aquí iría la llamada real a la API
        // Por ahora usamos datos de ejemplo
        const mockGames: Game[] = [
          {
            id: '1',
            title: 'The Witcher 3: Wild Hunt',
            description: 'An epic open-world RPG with a compelling story and memorable characters.',
            price: 29.99,
            discount: 50,
            image: '/images/games/witcher3.jpg',
            category: 'RPG',
            rating: 4.9,
            releaseDate: '2015-05-19',
            publisher: 'CD Projekt Red',
            platform: ['PC', 'PS4', 'Xbox One', 'Nintendo Switch']
          },
          {
            id: '2',
            title: 'Red Dead Redemption 2',
            description: 'A vast and atmospheric world that tells the story of Arthur Morgan and the Van der Linde gang.',
            price: 59.99,
            discount: 30,
            image: '/images/games/rdr2.jpg',
            category: 'Action',
            rating: 4.8,
            releaseDate: '2018-10-26',
            publisher: 'Rockstar Games',
            platform: ['PC', 'PS4', 'Xbox One']
          },
          {
            id: '3',
            title: 'Cyberpunk 2077',
            description: 'An open-world action-adventure story set in Night City, a megalopolis obsessed with power, glamour, and body modification.',
            price: 49.99,
            discount: 40,
            image: '/images/games/cyberpunk.jpg',
            category: 'RPG',
            rating: 4.5,
            releaseDate: '2020-12-10',
            publisher: 'CD Projekt Red',
            platform: ['PC', 'PS4', 'Xbox One', 'PS5', 'Xbox Series X']
          },
          {
            id: '4',
            title: 'God of War Ragnarök',
            description: 'Join Kratos and Atreus on a mythic journey for answers before Ragnarök arrives.',
            price: 69.99,
            image: '/images/games/gow.jpg',
            category: 'Action',
            rating: 4.9,
            releaseDate: '2022-11-09',
            publisher: 'Sony Interactive Entertainment',
            platform: ['PS4', 'PS5']
          }
        ];

        setGames(mockGames);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch games');
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const getFeaturedGames = () => {
    return games.filter(game => game.rating >= 4.8);
  };

  const getDiscountedGames = () => {
    return games.filter(game => game.discount && game.discount > 0);
  };

  const getGamesByCategory = (category: string) => {
    return games.filter(game => game.category === category);
  };

  const getGameById = (id: string) => {
    return games.find(game => game.id === id);
  };

  const searchGames = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return games.filter(game => 
      game.title.toLowerCase().includes(lowerQuery) ||
      game.description.toLowerCase().includes(lowerQuery) ||
      game.category.toLowerCase().includes(lowerQuery)
    );
  };

  return {
    games,
    loading,
    error,
    getFeaturedGames,
    getDiscountedGames,
    getGamesByCategory,
    getGameById,
    searchGames
  };
}; 
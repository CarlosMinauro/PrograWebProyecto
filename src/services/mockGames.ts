import type { Game } from '../types/game';

export const mockGames: Game[] = [
  {
    id: 1,
    title: "The Last Adventure",
    description: "An epic RPG adventure game with stunning graphics and immersive gameplay.",
    price: 59.99,
    imageUrl: "/assets/games/game1.jpg",
    platform: "PC",
    category: "RPG",
    rating: 4.8,
    releaseDate: "2024-03-15",
    developer: "Epic Games Studio",
    publisher: "GameWorld Publishing",
    inStock: true,
    featured: true
  },
  {
    id: 2,
    title: "Space Warriors",
    description: "A thrilling space combat game with multiplayer features.",
    price: 49.99,
    imageUrl: "/assets/games/game2.jpg",
    platform: "PlayStation 5",
    category: "Action",
    rating: 4.5,
    releaseDate: "2024-02-20",
    developer: "Space Games Inc",
    publisher: "Galaxy Publishing",
    inStock: true,
    discount: 10
  },
  {
    id: 3,
    title: "City Builder Pro",
    description: "Build and manage your own virtual city in this strategy game.",
    price: 39.99,
    imageUrl: "/assets/games/game3.jpg",
    platform: "Xbox Series X",
    category: "Strategy",
    rating: 4.7,
    releaseDate: "2024-01-10",
    developer: "Strategy Masters",
    publisher: "City Games Co",
    inStock: true
  }
];

export const getBestSellers = (): Game[] => {
  return mockGames.filter(game => game.featured);
};

export const getTopRated = (): Game[] => {
  return mockGames.filter(game => game.rating >= 4.5);
};

export const getGameById = (id: number): Game | undefined => {
  return mockGames.find(game => game.id === id);
}; 
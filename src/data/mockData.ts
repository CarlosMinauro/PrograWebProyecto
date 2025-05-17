import type { News, Game } from '../types';

export const mockNews: News[] = [
  {
    id: '1',
    title: 'New PlayStation 5 Games Coming This Month',
    content: 'Discover the exciting lineup of games coming to PlayStation 5 this month, including exclusive titles and major releases.',
    imageUrl: '/images/news/play5-news.jfif',
    date: '2024-03-15',
    author: 'Game Store Team'
  },
  {
    id: '2',
    title: 'Nintendo Switch Pro Rumors: What We Know',
    content: 'Latest rumors about the upcoming Nintendo Switch Pro and what it might mean for the gaming community.',
    imageUrl: '/images/news/nintendo.jfif',
    date: '2024-03-14',
    author: 'Tech Insider'
  },
  {
    id: '3',
    title: 'PC Gaming: The Rise of Indie Games',
    content: 'How indie games are shaping the future of PC gaming and what to expect in the coming months.',
    imageUrl: '/images/news/pc new.png',
    date: '2024-03-13',
    author: 'Gaming Trends'
  }
];

export const mockGames: Game[] = [
  {
    id: '1',
    title: 'Cyberpunk 2077',
    description: 'An open-world action role-playing game set in Night City, a megalopolis obsessed with power, glamour, and body modification.',
    price: 59.99,
    discountPrice: 29.99,
    imageUrl: '/images/games/covers/cyberpunkcover.jpg',
    thumbnailUrl: '/images/games/thumbnails/cyberpunk/thumb-1.jpg',
    platform: 'PC',
    releaseDate: '2020-12-10',
    rating: 4.5,
    genre: ['RPG', 'Action', 'Open World'],
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    features: [
      'Open World',
      'First Person',
      'RPG Elements',
      'Character Customization'
    ],
    requirements: {
      minimum: [
        'Windows 7 or 10 64-bit',
        'Intel Core i5-3570K or AMD FX-8310',
        '8GB RAM',
        'NVIDIA GTX 780 or AMD Radeon RX 470'
      ],
      recommended: [
        'Windows 10 64-bit',
        'Intel Core i7-4790 or AMD Ryzen 3 3200G',
        '12GB RAM',
        'NVIDIA GTX 1060 or AMD Radeon RX 590'
      ]
    },
    screenshots: [
      '/images/games/screenshots/cyberpunk/screen1.jfif',
      '/images/games/screenshots/cyberpunk/screen2.jfif',
      '/images/games/screenshots/cyberpunk/screen3.jpg'
    ],
    thumbnails: [
      '/images/games/thumbnails/cyberpunk/thumb-1.jpg',
      '/images/games/thumbnails/cyberpunk/thumb-2.jpg',
      '/images/games/thumbnails/cyberpunk/thumb-3.jpg'
    ],
    videos: [
      'qIcTM8WXFjk'
    ],
    reviews: [
      {
        id: '1',
        userId: 'user1',
        userName: 'John Doe',
        rating: 5,
        comment: 'Amazing game with stunning graphics and immersive gameplay!',
        date: '2024-03-15',
        helpful: 42,
        notHelpful: 3
      }
    ]
  },
  {
    id: '2',
    title: 'The Last of Us Part II',
    description: 'A post-apocalyptic action-adventure game that follows Ellie as she seeks revenge in a world ravaged by a fungal infection.',
    price: 69.99,
    imageUrl: '/images/games/covers/the last of us 2 cover.jfif',
    thumbnailUrl: '/images/games/thumbnails/last-of-us/thumb-1.jpg',
    platform: 'PlayStation',
    releaseDate: '2020-06-19',
    rating: 4.8,
    genre: ['Action', 'Adventure', 'Survival Horror'],
    developer: 'Naughty Dog',
    publisher: 'Sony Interactive Entertainment',
    features: [
      'Third Person',
      'Story Rich',
      'Survival Horror',
      'Stealth'
    ],
    screenshots: [
      '/images/games/screenshots/last-of-us/screen1.jfif',
      '/images/games/screenshots/last-of-us/screen2.avif',
      '/images/games/screenshots/last-of-us/screen3.jfif'
    ],
    thumbnails: [
      '/images/games/thumbnails/last-of-us/thumb-1.jpg',
      '/images/games/thumbnails/last-of-us/thumb-2.jpg',
      '/images/games/thumbnails/last-of-us/thumb-3.jpg'
    ],
    videos: [
      'qPNiIeKMHyg'
    ],
    reviews: [
      {
        id: '2',
        userId: 'user2',
        userName: 'Jane Smith',
        rating: 5,
        comment: 'A masterpiece in storytelling and character development.',
        date: '2024-03-14',
        helpful: 56,
        notHelpful: 2
      }
    ]
  },
  {
    id: '3',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    description: 'An action-adventure game that follows Link as he explores the vast land of Hyrule and the mysterious sky islands above.',
    price: 59.99,
    imageUrl: '/images/games/covers/zelda cover.jfif',
    thumbnailUrl: '/images/games/thumbnails/zelda/thumb-1.jpg',
    platform: 'Nintendo',
    releaseDate: '2023-05-12',
    rating: 4.9,
    genre: ['Action', 'Adventure', 'RPG'],
    developer: 'Nintendo EPD',
    publisher: 'Nintendo',
    features: [
      'Open World',
      'Action RPG',
      'Puzzle Solving',
      'Exploration'
    ],
    screenshots: [
      '/images/games/screenshots/zelda/screen1.jfif',
      '/images/games/screenshots/zelda/screen2.jfif',
      '/images/games/screenshots/zelda/screen3.jpg'
    ],
    thumbnails: [
      '/images/games/thumbnails/zelda/thumb-1.jpg',
      '/images/games/thumbnails/zelda/thumb-2.jpg',
      '/images/games/thumbnails/zelda/thumb-3.jpg'
    ],
    videos: [
      'RTmTThcO6oI'
    ],
    reviews: [
      {
        id: '3',
        userId: 'user3',
        userName: 'Mike Johnson',
        rating: 5,
        comment: 'A perfect sequel that builds upon everything that made Breath of the Wild great.',
        date: '2024-03-13',
        helpful: 78,
        notHelpful: 1
      }
    ]
  },
  {
    id: '4',
    title: 'Halo Infinite',
    description: 'A first-person shooter that continues the story of the Master Chief as he battles against the Banished on the ringworld Zeta Halo.',
    price: 59.99,
    discountPrice: 39.99,
    imageUrl: '/images/games/covers/halo infinite cover.jpg',
    thumbnailUrl: '/images/games/thumbnails/halo/thumb-1.jpg',
    platform: 'Xbox',
    releaseDate: '2021-12-08',
    rating: 4.3,
    genre: ['FPS', 'Action', 'Sci-Fi'],
    developer: '343 Industries',
    publisher: 'Xbox Game Studios',
    features: [
      'First Person Shooter',
      'Multiplayer',
      'Campaign',
      'Open World'
    ],
    screenshots: [
      '/images/games/screenshots/halo/screen1.jfif',
      '/images/games/screenshots/halo/screen2.jfif',
      '/images/games/screenshots/halo/screen3.jpg'
    ],
    thumbnails: [
      '/images/games/thumbnails/halo/thumb-1.jpg',
      '/images/games/thumbnails/halo/thumb-2.jpg',
      '/images/games/thumbnails/halo/thumb-3.jpg'
    ],
    videos: [
      'PyMlV5_HRWk'
    ],
    reviews: [
      {
        id: '4',
        userId: 'user4',
        userName: 'Sarah Wilson',
        rating: 4,
        comment: 'Great multiplayer experience with a solid campaign.',
        date: '2024-03-12',
        helpful: 34,
        notHelpful: 5
      }
    ]
  }
]; 
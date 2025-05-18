import type { News, Game } from '../types';

export const mockNews: News[] = [
  {
    id: '1',
    title: 'Nuevos juegos de PlayStation 5 llegan este mes',
    content: 'Descubre la emocionante lista de juegos que llegan a PlayStation 5 este mes, incluyendo títulos exclusivos y grandes lanzamientos.',
    imageUrl: '/images/news/play5-news.jfif',
    date: '2024-03-15',
    author: 'Equipo de Game Store'
  },
  {
    id: '2',
    title: 'Rumores sobre Nintendo Switch Pro: Lo que sabemos',
    content: 'Los últimos rumores sobre la próxima Nintendo Switch Pro y lo que podría significar para la comunidad gamer.',
    imageUrl: '/images/news/nintendo.jfif',
    date: '2024-03-14',
    author: 'Tech Insider'
  },
  {
    id: '3',
    title: 'PC Gaming: El auge de los juegos indie',
    content: 'Cómo los juegos indie están moldeando el futuro del gaming en PC y qué esperar en los próximos meses.',
    imageUrl: '/images/news/pc new.png',
    date: '2024-03-13',
    author: 'Tendencias Gaming'
  }
];

export const mockGames: Game[] = [
  {
    id: '1',
    title: 'Cyberpunk 2077',
    description: 'Un juego de rol y acción en mundo abierto ambientado en Night City, una megalópolis obsesionada con el poder, el glamour y la modificación corporal.',
    price: 59.99,
    discountPrice: 29.99,
    imageUrl: '/images/games/covers/cyberpunkcover.jpg',
    thumbnailUrl: '/images/games/thumbnails/cyberpunk/thumb-1.jpg',
    platform: 'PC',
    releaseDate: '2020-12-10',
    rating: 4.5,
    genre: ['RPG', 'Acción', 'Mundo Abierto'],
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    features: [
      'Mundo Abierto',
      'Primera Persona',
      'Elementos de RPG',
      'Personalización de Personaje'
    ],
    requirements: {
      minimum: [
        'Windows 7 o 10 64-bit',
        'Intel Core i5-3570K o AMD FX-8310',
        '8GB RAM',
        'NVIDIA GTX 780 o AMD Radeon RX 470'
      ],
      recommended: [
        'Windows 10 64-bit',
        'Intel Core i7-4790 o AMD Ryzen 3 3200G',
        '12GB RAM',
        'NVIDIA GTX 1060 o AMD Radeon RX 590'
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
        userName: 'Juan Pérez',
        rating: 5,
        comment: '¡Juego increíble con gráficos impresionantes y jugabilidad inmersiva!',
        date: '2024-03-15',
        helpful: 42,
        notHelpful: 3
      }
    ]
  },
  {
    id: '2',
    title: 'The Last of Us Parte II',
    description: 'Un juego de acción y aventura postapocalíptico que sigue a Ellie en su búsqueda de venganza en un mundo devastado por una infección fúngica.',
    price: 69.99,
    imageUrl: '/images/games/covers/the last of us 2 cover.jfif',
    thumbnailUrl: '/images/games/thumbnails/last-of-us/thumb-1.jpg',
    platform: 'PlayStation',
    releaseDate: '2020-06-19',
    rating: 4.8,
    genre: ['Acción', 'Aventura', 'Survival Horror'],
    developer: 'Naughty Dog',
    publisher: 'Sony Interactive Entertainment',
    features: [
      'Tercera Persona',
      'Historia Profunda',
      'Survival Horror',
      'Sigilo'
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
        userName: 'Ana García',
        rating: 5,
        comment: 'Una obra maestra en narrativa y desarrollo de personajes.',
        date: '2024-03-14',
        helpful: 56,
        notHelpful: 2
      }
    ]
  },
  {
    id: '3',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    description: 'Un juego de acción y aventura que sigue a Link mientras explora la vasta tierra de Hyrule y las misteriosas islas del cielo.',
    price: 59.99,
    imageUrl: '/images/games/covers/zelda cover.jfif',
    thumbnailUrl: '/images/games/thumbnails/zelda/thumb-1.jpg',
    platform: 'Nintendo',
    releaseDate: '2023-05-12',
    rating: 4.9,
    genre: ['Acción', 'Aventura', 'RPG'],
    developer: 'Nintendo EPD',
    publisher: 'Nintendo',
    features: [
      'Mundo Abierto',
      'Acción RPG',
      'Resolución de Puzzles',
      'Exploración'
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
        userName: 'Miguel López',
        rating: 5,
        comment: 'Una secuela perfecta que mejora todo lo que hizo grande a Breath of the Wild.',
        date: '2024-03-13',
        helpful: 78,
        notHelpful: 1
      }
    ]
  },
  {
    id: '4',
    title: 'Halo Infinite',
    description: 'Un shooter en primera persona que continúa la historia del Jefe Maestro mientras lucha contra los Desterrados en el anillo Zeta Halo.',
    price: 59.99,
    discountPrice: 39.99,
    imageUrl: '/images/games/covers/halo infinite cover.jpg',
    thumbnailUrl: '/images/games/thumbnails/halo/thumb-1.jpg',
    platform: 'Xbox',
    releaseDate: '2021-12-08',
    rating: 4.3,
    genre: ['FPS', 'Acción', 'Ciencia Ficción'],
    developer: '343 Industries',
    publisher: 'Xbox Game Studios',
    features: [
      'Disparos en Primera Persona',
      'Multijugador',
      'Campaña',
      'Mundo Abierto'
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
        userName: 'Sara Wilson',
        rating: 4,
        comment: 'Gran experiencia multijugador con una campaña sólida.',
        date: '2024-03-12',
        helpful: 34,
        notHelpful: 5
      }
    ]
  }
];
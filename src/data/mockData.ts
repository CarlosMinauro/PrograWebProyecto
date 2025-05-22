import type { News, Game } from '../types';

export const mockNews: News[] = [
  {
    id: '1',
    title: 'Nuevos juegos de PlayStation 5 llegan este mes',
    content: 'Descubre la emocionante lista de juegos que llegan a PlayStation 5 este mes, incluyendo títulos exclusivos y grandes lanzamientos.',
    imageUrl: '/images/news/play5-news.jfif',
    date: '2024-03-15',
    author: 'Equipo de UliGames Store'
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
    platform: 'Windows',
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
    imageUrl: '/images/games/covers/TLOU2.jpg',
    thumbnailUrl: '/images/games/thumbnails/last-of-us/thumb-1.jpg',
    platform: 'PlayStation 4',
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
      '/images/games/screenshots/last-of-us/screen2.avif',
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
    platform: 'Nintendo Swtich',
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
    imageUrl: '/images/games/covers/HALO.jpg',
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
  },
  {
    id: '5',
    title: 'Grand Theft Auto V',
    description: 'Explora Los Santos en este aclamado juego de mundo abierto lleno de acción, crimen y libertad total.',
    price: 49.99,
    discountPrice: 19.99,
    imageUrl: '/images/games/covers/GTAV.jpg',
    thumbnailUrl: '/images/games/thumbnails/gtav/thumb-1.jpg',
    platform: 'Windows',
    releaseDate: '2015-04-14',
    rating: 4.7,
    genre: ['Acción', 'Aventura', 'Mundo Abierto'],
    developer: 'Rockstar North',
    publisher: 'Rockstar Games',
    features: [
      'Mundo Abierto',
      'Multijugador Online',
      'Misiones de Historia',
      'Personalización de Vehículos'
    ],
    requirements: {
      minimum: [
        'Windows 7 64-bit',
        'Intel Core 2 Quad CPU Q6600',
        '4GB RAM',
        'NVIDIA 9800 GT 1GB'
      ],
      recommended: [
        'Windows 10 64-bit',
        'Intel Core i5 3470',
        '8GB RAM',
        'NVIDIA GTX 660 2GB'
      ]
    },
    screenshots: [
      '/images/games/screenshots/gtav/screen1.jpg',
      '/images/games/screenshots/gtav/screen2.jpg',
      '/images/games/screenshots/gtav/screen3.jpg'
    ],
    thumbnails: [
      '/images/games/thumbnails/gtav/thumb-1.jpg',
      '/images/games/thumbnails/gtav/thumb-2.jpg',
      '/images/games/thumbnails/gtav/thumb-3.jpg'
    ],
    videos: [
      'QkkoHAzjnUs'
    ],
    reviews: [
      {
        id: '5',
        userId: 'user5',
        userName: 'Carlos Mendoza',
        rating: 5,
        comment: 'El mejor sandbox de todos los tiempos, diversión sin límites.',
        date: '2024-03-10',
        helpful: 60,
        notHelpful: 4
      },
      {
        id: '6',
        userId: 'user6',
        userName: 'Lucía Torres',
        rating: 4,
        comment: 'Excelente historia y multijugador, pero algunos bugs.',
        date: '2024-03-09',
        helpful: 22,
        notHelpful: 3
      }
    ]
  },
  {
    id: '6',
    title: 'Red Dead Redemption 2',
    description: 'Vive el salvaje oeste en esta épica aventura de Rockstar, con un mundo abierto impresionante y una historia profunda.',
    price: 59.99,
    discountPrice: 39.99,
    imageUrl: '/images/games/covers/REDEADREDEMPTION.jpg',
    thumbnailUrl: '/images/games/covers/REDEADREDEMPTION.jpg',
    platform: 'Windows',
    releaseDate: '2019-11-05',
    rating: 4.9,
    genre: ['Acción', 'Aventura', 'Mundo Abierto'],
    developer: 'Rockstar Games',
    publisher: 'Rockstar Games',
    features: [
      'Mundo Abierto',
      'Historia Cinematográfica',
      'Caza y Pesca',
      'Personalización de Personaje'
    ],
    requirements: {
      minimum: [
        'Windows 7 64-bit',
        'Intel Core i5-2500K',
        '8GB RAM',
        'NVIDIA GTX 770 2GB'
      ],
      recommended: [
        'Windows 10 64-bit',
        'Intel Core i7-4770K',
        '12GB RAM',
        'NVIDIA GTX 1060 6GB'
      ]
    },
    screenshots: [
      '/images/games/screenshots/reddead2/screen1.jpg',
      '/images/games/screenshots/reddead2/screen2.jpg',
      '/images/games/screenshots/reddead2/screen3.jpg'
    ],
    thumbnails: [
      '/images/games/thumbnails/reddead2/thumb-1.jpg',
      '/images/games/thumbnails/reddead2/thumb-2.jpg',
      '/images/games/thumbnails/reddead2/thumb-3.jpg'
    ],
    videos: [
      'eaW0tYpxyp0'
    ],
    reviews: [
      {
        id: '7',
        userId: 'user7',
        userName: 'Pedro Ramírez',
        rating: 5,
        comment: 'Una obra maestra, el mejor juego de vaqueros jamás hecho.',
        date: '2024-03-08',
        helpful: 80,
        notHelpful: 2
      },
      {
        id: '8',
        userId: 'user8',
        userName: 'Marina López',
        rating: 5,
        comment: 'Gráficos y narrativa impresionantes, totalmente recomendado.',
        date: '2024-03-07',
        helpful: 45,
        notHelpful: 1
      }
    ]
  },
  {
    id: '7',
    title: 'Marvel’s Spider-Man Remastered',
    description: 'Conviértete en Spider-Man y recorre Nueva York en este emocionante juego de acción y aventura.',
    price: 49.99,
    discountPrice: 29.99,
    imageUrl: '/images/games/covers/SPIDERMAN.jpg',
    thumbnailUrl: '/images/games/thumbnails/spiderman/thumb-1.jpg',
    platform: 'Windows',
    releaseDate: '2022-08-12',
    rating: 4.8,
    genre: ['Acción', 'Aventura', 'Superhéroes'],
    developer: 'Insomniac Games',
    publisher: 'Sony Interactive Entertainment',
    features: [
      'Mundo Abierto',
      'Combate Ágil',
      'Historia Original',
      'Trajes Desbloqueables'
    ],
    requirements: {
      minimum: [
        'Windows 10 64-bit',
        'Intel Core i3-4160',
        '8GB RAM',
        'NVIDIA GTX 950'
      ],
      recommended: [
        'Windows 10 64-bit',
        'Intel Core i5-4670',
        '16GB RAM',
        'NVIDIA GTX 1060 6GB'
      ]
    },
    screenshots: [
      '/images/games/screenshots/spiderman/screen1.jpg',
      '/images/games/screenshots/spiderman/screen2.jpg',
      '/images/games/screenshots/spiderman/screen3.jpg'
    ],
    thumbnails: [
      '/images/games/thumbnails/spiderman/thumb-1.jpg',
      '/images/games/thumbnails/spiderman/thumb-2.jpg',
      '/images/games/thumbnails/spiderman/thumb-3.jpg'
    ],
    videos: [
      'qIQ3xNqkVC4'
    ],
    reviews: [
      {
        id: '9',
        userId: 'user9',
        userName: 'Elena Ruiz',
        rating: 5,
        comment: 'Balancearse por Nueva York nunca fue tan divertido.',
        date: '2024-03-06',
        helpful: 38,
        notHelpful: 0
      },
      {
        id: '10',
        userId: 'user10',
        userName: 'David Gómez',
        rating: 4,
        comment: 'Gran historia y jugabilidad, pero algo corto.',
        date: '2024-03-05',
        helpful: 19,
        notHelpful: 2
      }
    ]
  },
  {
  id: '8',
  title: 'Street Fighter 6',
  description: 'La última entrega de la legendaria saga de peleas, con nuevos luchadores, modos de juego y gráficos espectaculares.',
  price: 59.99,
  discountPrice: 49.99,
  imageUrl: '/images/games/covers/STREETFIGHTER6LOGO.jpg',
  thumbnailUrl: '/images/games/thumbnails/streetfighter6/thumb-1.jpg',
  platform: 'Windows',
  releaseDate: '2023-06-02',
  rating: 4.6,
  genre: ['Lucha', 'Competitivo', 'Acción'],
  developer: 'Capcom',
  publisher: 'Capcom',
  features: [
    'Multijugador Online',
    'Modo Historia',
    'Torneos',
    'Gráficos de Nueva Generación'
  ],
  requirements: {
    minimum: [
      'Windows 10 64-bit',
      'Intel Core i5-7500',
      '8GB RAM',
      'NVIDIA GTX 1060'
    ],
    recommended: [
      'Windows 10 64-bit',
      'Intel Core i7-8700',
      '16GB RAM',
      'NVIDIA RTX 2070'
    ]
  },
  screenshots: [
    '/images/games/screenshots/streetfighter6/screen1.jpg',
    '/images/games/screenshots/streetfighter6/screen2.jpg',
    '/images/games/screenshots/streetfighter6/screen3.jpg'
  ],
  thumbnails: [
    '/images/games/thumbnails/streetfighter6/thumb-1.jpg'
  ],
  videos: [
    '1INU3FOJsTw'
  ],
  reviews: [
    {
      id: '11',
      userId: 'user11',
      userName: 'Luis Ortega',
      rating: 5,
      comment: 'El mejor Street Fighter hasta la fecha, jugabilidad pulida y mucho contenido.',
      date: '2024-03-04',
      helpful: 27,
      notHelpful: 1
    }
  ]
},
{
  id: '9',
  title: 'Grand Theft Auto: Vice City',
  description: 'Vuelve a los años 80 en Vice City, una ciudad llena de acción, música y crimen en este clásico de Rockstar.',
  price: 19.99,
  discountPrice: 9.99,
  imageUrl: '/images/games/covers/vicecitylogo.jpg',
  thumbnailUrl: '/images/games/thumbnails/vicecity/thumb-1.jpg',
  platform: 'Windows',
  releaseDate: '2003-05-12',
  rating: 4.5,
  genre: ['Acción', 'Aventura', 'Mundo Abierto'],
  developer: 'Rockstar North',
  publisher: 'Rockstar Games',
  features: [
    'Mundo Abierto',
    'Historia de Crimen',
    'Estilo Retro',
    'Música Icónica'
  ],
  requirements: {
    minimum: [
      'Windows 98/ME/2000/XP',
      'Intel Pentium III 800 MHz',
      '128MB RAM',
      '32MB Video Card'
    ],
    recommended: [
      'Windows XP',
      'Intel Pentium IV 1.4 GHz',
      '256MB RAM',
      '64MB Video Card'
    ]
  },
  screenshots: [
    '/images/games/screenshots/vicecity/screen1.jpg',
    '/images/games/screenshots/vicecity/screen2.jpg',
    '/images/games/screenshots/vicecity/screen3.jpg'
  ],
  thumbnails: [
    '/images/games/thumbnails/vicecity/thumb-1.jpg'
  ],
  videos: [
    'dR7f2U8Cr3k'
  ],
  reviews: [
    {
      id: '12',
      userId: 'user12',
      userName: 'Mario Díaz',
      rating: 5,
      comment: 'Un clásico atemporal, la ambientación ochentera es perfecta.',
      date: '2024-03-03',
      helpful: 33,
      notHelpful: 0
    }
  ]
},
{
  id: '10',
  title: 'Uncharted 5',
  description: 'Nathan Drake regresa en una nueva aventura llena de acción, misterio y paisajes impresionantes.',
  price: 69.99,
  discountPrice: 59.99,
  imageUrl: '/images/games/covers/uncharted-5-pc-jogo-cover.jpg',
  thumbnailUrl: '/images/games/thumbnails/uncharted5/thumb-1.jpg',
  platform: 'PlayStation 5',
  releaseDate: '2024-02-20',
  rating: 4.9,
  genre: ['Acción', 'Aventura', 'Exploración'],
  developer: 'Naughty Dog',
  publisher: 'Sony Interactive Entertainment',
  features: [
    'Historia Cinematográfica',
    'Exploración',
    'Puzzles',
    'Gráficos de Última Generación'
  ],
  requirements: {
    minimum: [
      'PlayStation 5',
      '50GB Espacio Libre'
    ],
    recommended: [
      'PlayStation 5',
      'SSD'
    ]
  },
  screenshots: [
    '/images/games/screenshots/uncharted5/screen1.jpg',
    '/images/games/screenshots/uncharted5/screen2.jpg',
    '/images/games/screenshots/uncharted5/screen3.jpg'
  ],
  thumbnails: [
    '/images/games/thumbnails/uncharted5/thumb-1.jpg'
  ],
  videos: [
    '3hE2lLFGk5U'
  ],
  reviews: [
    {
      id: '13',
      userId: 'user13',
      userName: 'Patricia Herrera',
      rating: 5,
      comment: 'Una aventura épica, Naughty Dog nunca decepciona.',
      date: '2024-03-02',
      helpful: 41,
      notHelpful: 2
    }
  ]
},
{
  id: '11',
  title: 'Star Wars Jedi: Fallen Order',
  description: 'Vive una nueva historia en el universo Star Wars como Cal Kestis, un joven padawan que debe sobrevivir tras la Orden 66.',
  price: 39.99,
  discountPrice: 19.99,
  imageUrl: '/images/games/covers/STARWARS.jpg',
  thumbnailUrl: '/images/games/thumbnails/starwars/thumb-1.jpg',
  platform: 'Windows',
  releaseDate: '2019-11-15',
  rating: 4.7,
  genre: ['Acción', 'Aventura', 'Star Wars'],
  developer: 'Respawn Entertainment',
  publisher: 'Electronic Arts',
  features: [
    'Historia Original',
    'Combate con Sable de Luz',
    'Exploración de Planetas',
    'Poderes de la Fuerza'
  ],
  requirements: {
    minimum: [
      'Windows 7/8.1/10 64-bit',
      'AMD FX-6100/Intel i3-3220',
      '8GB RAM',
      'AMD Radeon HD 7750/NVIDIA GeForce GTX 650'
    ],
    recommended: [
      'Windows 10 64-bit',
      'AMD Ryzen 7 1700/Intel i7-6700K',
      '16GB RAM',
      'AMD RX Vega 56/NVIDIA GTX 1070'
    ]
  },
  screenshots: [
    '/images/games/screenshots/starwars/screen1.jpg',
    '/images/games/screenshots/starwars/screen2.jpg',
    '/images/games/screenshots/starwars/screen3.jpg'
  ],
  thumbnails: [
    '/images/games/thumbnails/starwars/thumb-1.jpg'
  ],
  videos: [
    '0GLbwkfhYZk'
  ],
  reviews: [
    {
      id: '14',
      userId: 'user14',
      userName: 'Sergio Campos',
      rating: 5,
      comment: 'Una historia de Star Wars emocionante y jugabilidad desafiante.',
      date: '2024-03-01',
      helpful: 36,
      notHelpful: 1
    }
  ]
},
{
  id: '12',
  title: 'Formula 1 2025',
  description: 'Vive la emoción de la Fórmula 1 con todos los equipos, pilotos y circuitos oficiales de la temporada 2023.',
  price: 69.99,
  discountPrice: 54.99,
  imageUrl: '/images/games/covers/F1LOGO.jpg',
  thumbnailUrl: '/images/games/thumbnails/f1/thumb-1.jpg',
  platform: 'Windows',
  releaseDate: '2023-06-16',
  rating: 4.4,
  genre: ['Carreras', 'Deportes', 'Simulación'],
  developer: 'Codemasters',
  publisher: 'EA Sports',
  features: [
    'Modo Carrera',
    'Multijugador Online',
    'Todos los Circuitos Oficiales',
    'Personalización de Escudería'
  ],
  requirements: {
    minimum: [
      'Windows 10 64-bit',
      'Intel Core i3-2130',
      '8GB RAM',
      'NVIDIA GTX 950'
    ],
    recommended: [
      'Windows 10 64-bit',
      'Intel Core i5-9600K',
      '16GB RAM',
      'NVIDIA GTX 1660 Ti'
    ]
  },
  screenshots: [
    '/images/games/screenshots/f1/screen1.jpg',
    '/images/games/screenshots/f1/screen2.jpg',
    '/images/games/screenshots/f1/screen3.jpg'
  ],
  thumbnails: [
    '/images/games/thumbnails/f1/thumb-1.jpg'
  ],
  videos: [
    'QJv1kBz4F6g'
  ],
  reviews: [
    {
      id: '15',
      userId: 'user15',
      userName: 'Fernando Alonso',
      rating: 5,
      comment: 'La simulación de manejo es excelente y el modo carrera es muy adictivo.',
      date: '2024-03-01',
      helpful: 25,
      notHelpful: 0
    },
    {
      id: '16',
      userId: 'user16',
      userName: 'Sofía Martínez',
      rating: 4,
      comment: 'Muy divertido, aunque el online podría mejorar.',
      date: '2024-02-27',
      helpful: 12,
      notHelpful: 2
    }
  ]
},


];
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
    platform: [' PC '],
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
    imageUrl: 'public/images/games/covers/TLOU2.jpg',
    thumbnailUrl: '/images/games/thumbnails/last-of-us/thumb-1.jpg',
    platform: [' PlayStation '],
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
      'public/images/games/screenshots/last-of-us/screen2.avif',
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
    platform: [' Nintendo '],
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
    imageUrl: 'public/images/games/covers/HALO.jpg',
    thumbnailUrl: '/images/games/thumbnails/halo/thumb-1.jpg',
    platform: [' Xbox '],
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
    imageUrl: 'public/images/games/covers/GTAV.jpg',
    thumbnailUrl: '/images/games/thumbnails/gtav/thumb-1.jpg',
    platform: [' PC '],
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
    imageUrl: 'public/images/games/covers/REDEADREDEMPTION.jpg',
    thumbnailUrl: 'public/images/games/covers/REDEADREDEMPTION.jpg',
    platform: [' PC '],
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
    imageUrl: 'public/images/games/covers/SPIDERMAN.jpg',
    thumbnailUrl: '/images/games/thumbnails/spiderman/thumb-1.jpg',
    platform: [' PC '],
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
  platform: [' PC ', ' PlayStation ', ' Xbox '],
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
    '/images/games/screenshots/streetfighter6/screen2.jpg'
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
  platform: [' PC '],
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
    '/images/games/screenshots/vicecity/screen2.jpg'
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
  platform: [' PlayStation ', ' PC '],
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
    '/images/games/screenshots/uncharted5/screen2.jpg'
  ],
  thumbnails: [
    '/images/games/thumbnails/uncharted5/thumb-1.jpg'
  ],
  videos: [
    '5Fp3v4aKWkc'
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
  id: '14',
  title: 'Plants vs Zombies: Garden Warfare 2',
  description: 'La batalla por Suburbia alcanza nuevas alturas en este shooter multijugador lleno de acción y humor entre plantas y zombis.',
  price: 29.99,
  discountPrice: 14.99,
  imageUrl: '/images/games/covers/PVSZ.jpg', // Guarda la imagen y usa esta ruta
  thumbnailUrl: '/images/games/thumbnails/pvz-gw2/thumb-1.jpg',
  platform: [' PC '],
  releaseDate: '2016-02-23',
  rating: 4.4,
  genre: ['Shooter', 'Multijugador', 'Acción'],
  developer: 'PopCap Games',
  publisher: 'Electronic Arts',
  features: [
    'Multijugador Online',
    'Cooperativo',
    'Personajes Personalizables',
    'Modos de Juego Variados'
  ],
  requirements: {
    minimum: [
      'Windows 7 64-bit',
      'Intel i5 650, AMD Phenom X4 9850',
      '4GB RAM',
      'NVIDIA GeForce GT 640, AMD Radeon HD 7730'
    ],
    recommended: [
      'Windows 10 64-bit',
      'Intel i5 750, AMD Phenom II X4 965',
      '8GB RAM',
      'NVIDIA GeForce GTX 970, AMD Radeon R9 270X'
    ]
  },
  screenshots: [
    '/images/games/screenshots/pvz-gw2/screen1.jpg',
    '/images/games/screenshots/pvz-gw2/screen2.jpg'
  ],
  thumbnails: [
    '/images/games/thumbnails/pvz-gw2/thumb-1.jpg'
  ],
  videos: [
    '5b6ZvzF4FjY'
  ],
  reviews: [
    {
      id: '17',
      userId: 'user17',
      userName: 'Andrea Flores',
      rating: 5,
      comment: 'Muy divertido para jugar con amigos, muchas clases y modos.',
      date: '2024-03-01',
      helpful: 18,
      notHelpful: 0
    },
    {
      id: '18',
      userId: 'user18',
      userName: 'Jorge Pérez',
      rating: 4,
      comment: 'Gran variedad de personajes, aunque el online puede tardar.',
      date: '2024-02-28',
      helpful: 7,
      notHelpful: 1
    }
  ]
},
{
  id: '15',
  title: 'MultiVersus',
  description: 'Pelea con tus personajes favoritos de Warner Bros. en este juego de lucha multijugador lleno de acción y diversión.',
  price: 24.99,
  discountPrice: 17.99,
  imageUrl: '/images/games/covers/multiversuslogo.jpg', // Guarda la imagen y usa esta ruta
  thumbnailUrl: '/images/games/covers/multiversuslogo.jpg',
  platform: [' PC '],
  releaseDate: '2024-05-28',
  rating: 4.2,
  genre: ['Lucha', 'Plataformas', 'Multijugador'],
  developer: 'Player First Games',
  publisher: 'Warner Bros. Games',
  features: [
    'Multijugador Online',
    'Personajes de Warner Bros.',
    'Batallas 2v2',
    'Crossplay'
  ],
  requirements: {
    minimum: [
      'Windows 10 64-bit',
      'Intel Core i5-2300',
      '4GB RAM',
      'NVIDIA GeForce GTX 550 Ti'
    ],
    recommended: [
      'Windows 10 64-bit',
      'Intel Core i5-3470',
      '8GB RAM',
      'NVIDIA GeForce GTX 660'
    ]
  },
  screenshots: [
    '/images/games/screenshots/multiversus/multivsSS.jpg',
    '/images/games/screenshots/multiversus/MultiVersus-Season-1-Artwork.jpg'
  ],
  thumbnails: [
    'public/images/games/covers/multiversuslogo.jpg'
  ],
  videos: [
    'VDNhDe4eo9g'
  ],
  reviews: [
    {
      id: '19',
      userId: 'user19',
      userName: 'Valeria Torres',
      rating: 4,
      comment: 'Muy entretenido y fácil de jugar con amigos, personajes icónicos.',
      date: '2024-05-29',
      helpful: 10,
      notHelpful: 1
    },
    {
      id: '20',
      userId: 'user20',
      userName: 'Samuel Díaz',
      rating: 5,
      comment: 'Excelente juego gratuito, el sistema de combate es muy divertido.',
      date: '2024-05-29',
      helpful: 8,
      notHelpful: 0
    }
  ]
},
{
    id: '16',
    title: 'Days Gone',
    description: 'Un juego de acción y supervivencia en mundo abierto ambientado en un duro entorno postapocalíptico, protagonizado por el motociclista Deacon St. John.',
    price: 49.99,
    discountPrice: 19.99,
    imageUrl: '/images/games/covers/days-gonelogo.jpg',
    thumbnailUrl: '/images/games/thumbnails/days-gone/thumb-1.jpg',
    platform: [' PlayStation '],
    releaseDate: '2019-04-26',
    rating: 4.2,
    genre: ['Action', 'Adventure', 'Survival'],
    developer: 'Bend Studio',
    publisher: 'Sony Interactive Entertainment',
    features: [
      'Open World',
      'Survival',
      'Motorcycle Exploration',
      'Dynamic Weather'
    ],
    requirements: {
      minimum: [
        'Windows 10 64-bit',
        'Intel Core i5-2500K@3.3GHz o AMD FX 6300@3.5GHz',
        '8GB RAM',
        'Nvidia GeForce GTX 780 (3 GB) o AMD Radeon R9 290 (4 GB)'
      ],
      recommended: [
        'Windows 10 64-bit',
        'Intel Core i7-4770K@3.5GHz o Ryzen 5 1500X@3.5GHz',
        '16GB RAM',
        'Nvidia GeForce GTX 1060 (6 GB) o AMD Radeon RX 580 (8 GB)'
      ]
    },
    screenshots: [
      '/images/games/screenshots/daysgone/screen1.jpg',
      '/images/games/screenshots/daysgone/screen2.jpg',
      '/images/games/screenshots/daysgone/screen3.jpg'
    ],
    thumbnails: [
      '/images/games/thumbnails/daysgone/thumb-1.jpg',
      '/images/games/thumbnails/daysgone/thumb-2.jpg'
    ],
    videos: [
      'yGZGSdgJVPM'
    ],
    reviews: [
      {
        id: '21',
        userId: 'user21',
        userName: 'Alex Torres',
        rating: 4,
        comment: 'Muy buen juego, la historia es atrapante y el ambiente postapocalíptico está muy logrado.',
        date: '2024-03-11',
        helpful: 10,
        notHelpful: 1
      }
    ]
  },
  {
    id: '17',
    title: 'Elden Ring',
    description: 'Un juego de rol y acción en mundo abierto creado por FromSoftware y George R. R. Martin, famoso por su dificultad y su extenso mundo de fantasía.',
    price: 69.99,
    discountPrice: 49.99,
    imageUrl: '/images/games/covers/eldenringlogo.jpg',
    thumbnailUrl: '/images/games/thumbnails/eldenring/thumb-1.jpg',
    platform: [' PC '],
    releaseDate: '2022-02-25',
    rating: 4.9,
    genre: ['RPG', 'Action', 'Open World'],
    developer: 'FromSoftware',
    publisher: 'Bandai Namco',
    features: [
      'Open World',
      'Challenging Combat',
      'Multiplayer',
      'Character Customization'
    ],
    requirements: {
      minimum: [
        'Windows 10',
        'Intel Core i5-8400 o AMD Ryzen 3 3300X',
        '12GB RAM',
        'NVIDIA GeForce GTX 1060 3GB o AMD Radeon RX 580 4GB'
      ],
      recommended: [
        'Windows 11/10',
        'Intel Core i7-8700K o AMD Ryzen 5 3600X',
        '16GB RAM',
        'NVIDIA GeForce GTX 1070 8GB o AMD Radeon RX VEGA 56 8GB'
      ]
    },
    screenshots: [
      '/images/games/screenshots/eldenring/screen1.jpg',
      '/images/games/screenshots/eldenring/screen2.jpg',
      '/images/games/screenshots/eldenring/screen3.jpg'
    ],
    thumbnails: [
      '/images/games/thumbnails/eldenring/thumb-1.jpg',
      '/images/games/thumbnails/eldenring/thumb-2.jpg',
      '/images/games/thumbnails/eldenring/thumb-3.jpg'
    ],
    videos: [
      'E3Huy2cdih0'
    ],
    reviews: [
      {
        id: '22',
        userId: 'user22',
        userName: 'Lucía Mendoza',
        rating: 5,
        comment: 'Una obra maestra, desafiante y con un mundo impresionante por explorar.',
        date: '2024-03-10',
        helpful: 24,
        notHelpful: 0
      }
    ]
  },
  // ... (código anterior)

  {
    id: '18',
    title: 'God of War: Ragnarok',
    description: 'Kratos y Atreus se embarcan en una épica aventura mientras enfrentan el fin de los tiempos en la mitología nórdica. Lucha contra dioses y monstruos en este aclamado juego de acción y aventura.',
    price: 69.99,
    discountPrice: 54.99,
    imageUrl: '/images/games/covers/GOWLOGO.jpg',
    thumbnailUrl: '/images/games/thumbnails/gowragnarok/thumb-1.jpg',
    platform: [' PlayStation '],
    releaseDate: '2022-11-09',
    rating: 4.9,
    genre: ['Action', 'Adventure'],
    developer: 'Santa Monica Studio',
    publisher: 'Sony Interactive Entertainment',
    features: [
      'Story Rich',
      'Single Player',
      'Action Combat',
      'Mythological Setting'
    ],
    requirements: {
      minimum: [
        'PlayStation 4 o PlayStation 5'
      ],
      recommended: [
        'PlayStation 5'
      ]
    },
    screenshots: [
      '/images/games/screenshots/gowragnarok/screen1.jpg',
      '/images/games/screenshots/gowragnarok/screen2.jpg',
      '/images/games/screenshots/gowragnarok/screen3.jpg'
    ],
    thumbnails: [
      '/images/games/thumbnails/gowragnarok/thumb-1.jpg',
      '/images/games/thumbnails/gowragnarok/thumb-2.jpg'
    ],
    videos: [
      'EE-4GvjKcfs'
    ],
    reviews: [
      {
        id: '7-1',
        userId: 'user7',
        userName: 'Carlos Pérez',
        rating: 5,
        comment: 'Una obra maestra, la narrativa y los combates son increíbles.',
        date: '2024-03-09',
        helpful: 21,
        notHelpful: 0
      },
      {
        id: '7-2',
        userId: 'user8',
        userName: 'Marta Gómez',
        rating: 5,
        comment: 'El mejor God of War de la saga, gráficos impresionantes y gameplay adictivo.',
        date: '2024-03-08',
        helpful: 17,
        notHelpful: 1
      }
    ]
  },
  {
    id: '19',
    title: 'FIFA 25',
    description: 'La experiencia de fútbol definitiva regresa con FIFA 25, con nuevas mecánicas de juego, gráficos mejorados y modos competitivos tanto online como offline.',
    price: 69.99,
    discountPrice: 59.99,
    imageUrl: 'public/images/games/covers/fifa25logo.jpg',
    thumbnailUrl: '/images/games/thumbnails/fifa25/thumb-1.jpg',
    platform: [' Xbox ', ' PC ', ' PlayStation '],
    releaseDate: '2024-09-27',
    rating: 4.4,
    genre: ['Sports', 'Simulation'],
    developer: 'EA Sports',
    publisher: 'Electronic Arts',
    features: [
      'Multiplayer',
      'Career Mode',
      'Online Competitions',
      'Licensed Teams'
    ],
    requirements: {
      minimum: [
        'Windows 10 64-bit',
        'Intel Core i5-6600k o AMD Ryzen 5 1600',
        '8GB RAM',
        'NVIDIA GeForce GTX 1050 Ti o AMD Radeon RX 570'
      ],
      recommended: [
        'Windows 10/11 64-bit',
        'Intel Core i7-6700 o AMD Ryzen 7 2700X',
        '12GB RAM',
        'NVIDIA GeForce GTX 1660 o AMD Radeon RX 5600 XT'
      ]
    },
    screenshots: [
      '/images/games/screenshots/fifa25/screen1.jpg',
      '/images/games/screenshots/fifa25/screen2.jpg',
      '/images/games/screenshots/fifa25/screen3.jpg'
    ],
    thumbnails: [
      '/images/games/thumbnails/fifa25/thumb-1.jpg',
      '/images/games/thumbnails/fifa25/thumb-2.jpg'
    ],
    videos: [
      'dQw4w9WgXcQ'
    ],
    reviews: [
      {
        id: '8-1',
        userId: 'user9',
        userName: 'Diego Herrera',
        rating: 4,
        comment: 'Muy divertido, aunque me gustaría que mejoraran el modo carrera.',
        date: '2024-03-07',
        helpful: 8,
        notHelpful: 0
      },
      {
        id: '8-2',
        userId: 'user10',
        userName: 'Sofía Ruiz',
        rating: 5,
        comment: 'El mejor FIFA hasta ahora, los gráficos y la jugabilidad son top.',
        date: '2024-03-06',
        helpful: 11,
        notHelpful: 2
      }
    ]
  }
// ... (cierre del array y archivo)

];
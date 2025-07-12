import { query } from '../config/database';
import bcrypt from 'bcryptjs';

async function seedData() {
  try {
    console.log('🌱 Starting database seeding...');

    // Insert categories
    console.log('📂 Inserting categories...');
    await query('INSERT INTO categoria (nombre) VALUES ($1) ON CONFLICT DO NOTHING', ['Acción']);
    await query('INSERT INTO categoria (nombre) VALUES ($1) ON CONFLICT DO NOTHING', ['RPG']);
    await query('INSERT INTO categoria (nombre) VALUES ($1) ON CONFLICT DO NOTHING', ['Estrategia']);
    await query('INSERT INTO categoria (nombre) VALUES ($1) ON CONFLICT DO NOTHING', ['Deportes']);
    await query('INSERT INTO categoria (nombre) VALUES ($1) ON CONFLICT DO NOTHING', ['Aventura']);
    await query('INSERT INTO categoria (nombre) VALUES ($1) ON CONFLICT DO NOTHING', ['Lucha']);
    await query('INSERT INTO categoria (nombre) VALUES ($1) ON CONFLICT DO NOTHING', ['Shooter']);

    // Insert platforms
    console.log('🎮 Inserting platforms...');
    await query('INSERT INTO plataforma (nombre) VALUES ($1) ON CONFLICT DO NOTHING', ['PC']);
    await query('INSERT INTO plataforma (nombre) VALUES ($1) ON CONFLICT DO NOTHING', ['PlayStation 5']);
    await query('INSERT INTO plataforma (nombre) VALUES ($1) ON CONFLICT DO NOTHING', ['PlayStation 4']);
    await query('INSERT INTO plataforma (nombre) VALUES ($1) ON CONFLICT DO NOTHING', ['Xbox Series X']);
    await query('INSERT INTO plataforma (nombre) VALUES ($1) ON CONFLICT DO NOTHING', ['Xbox One']);
    await query('INSERT INTO plataforma (nombre) VALUES ($1) ON CONFLICT DO NOTHING', ['Nintendo Switch']);

    // Insert admin user
    console.log('👤 Inserting admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await query(
      'INSERT INTO usuario (nombre, correo, password, estado) VALUES ($1, $2, $3, $4) ON CONFLICT (correo) DO NOTHING',
      ['Admin', 'admin@uligames.com', hashedPassword, true]
    );

    // Insert test user
    console.log('👤 Inserting test user...');
    const testPassword = await bcrypt.hash('test123', 10);
    await query(
      'INSERT INTO usuario (nombre, correo, password, estado) VALUES ($1, $2, $3, $4) ON CONFLICT (correo) DO NOTHING',
      ['Test User', 'test@uligames.com', testPassword, true]
    );

    // Get category and platform IDs
    const categories = await query('SELECT id, nombre FROM categoria');
    const platforms = await query('SELECT id, nombre FROM plataforma');

    // Insert games with more realistic data
    console.log('🎮 Inserting games...');
    const games = [
      {
        nombre: 'Cyberpunk 2077',
        precio: 59.99,
        categoria_id: categories.rows.find(c => c.nombre === 'RPG')?.id,
        esta_oferta: true,
        estado: true,
        plataformas: ['PC', 'PlayStation 5', 'Xbox Series X']
      },
      {
        nombre: 'The Last of Us Parte II',
        precio: 69.99,
        categoria_id: categories.rows.find(c => c.nombre === 'Acción')?.id,
        esta_oferta: true,
        estado: true,
        plataformas: ['PlayStation 4', 'PlayStation 5']
      },
      {
        nombre: 'Halo Infinite',
        precio: 59.99,
        categoria_id: categories.rows.find(c => c.nombre === 'Shooter')?.id,
        esta_oferta: false,
        estado: true,
        plataformas: ['Xbox Series X', 'Xbox One', 'PC']
      },
      {
        nombre: 'God of War Ragnarök',
        precio: 69.99,
        categoria_id: categories.rows.find(c => c.nombre === 'Acción')?.id,
        esta_oferta: false,
        estado: true,
        plataformas: ['PlayStation 5', 'PlayStation 4']
      },
      {
        nombre: 'Elden Ring',
        precio: 59.99,
        categoria_id: categories.rows.find(c => c.nombre === 'RPG')?.id,
        esta_oferta: false,
        estado: true,
        plataformas: ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X', 'Xbox One']
      },
      {
        nombre: 'FIFA 25',
        precio: 69.99,
        categoria_id: categories.rows.find(c => c.nombre === 'Deportes')?.id,
        esta_oferta: false,
        estado: true,
        plataformas: ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X', 'Xbox One', 'Nintendo Switch']
      },
      {
        nombre: 'Street Fighter 6',
        precio: 49.99,
        categoria_id: categories.rows.find(c => c.nombre === 'Lucha')?.id,
        esta_oferta: true,
        estado: true,
        plataformas: ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X']
      },
      {
        nombre: 'The Legend of Zelda: Tears of the Kingdom',
        precio: 69.99,
        categoria_id: categories.rows.find(c => c.nombre === 'Aventura')?.id,
        esta_oferta: false,
        estado: true,
        plataformas: ['Nintendo Switch']
      },
      {
        nombre: "Marvel's Spider-Man Remastered",
        precio: 49.99,
        categoria_id: categories.rows.find(c => c.nombre === 'Acción')?.id,
        esta_oferta: true,
        estado: true,
        plataformas: ['PC', 'PlayStation 5']
      },
      {
        nombre: 'Red Dead Redemption 2',
        precio: 59.99,
        categoria_id: categories.rows.find(c => c.nombre === 'Acción')?.id,
        esta_oferta: true,
        estado: true,
        plataformas: ['PC', 'PlayStation 4', 'Xbox One']
      },
      {
        nombre: 'GTA V',
        precio: 29.99,
        categoria_id: categories.rows.find(c => c.nombre === 'Acción')?.id,
        esta_oferta: true,
        estado: true,
        plataformas: ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X', 'Xbox One']
      },
      {
        nombre: 'Star Wars Jedi: Fallen Order',
        precio: 29.99,
        categoria_id: categories.rows.find(c => c.nombre === 'Aventura')?.id,
        esta_oferta: true,
        estado: true,
        plataformas: ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X', 'Xbox One']
      },
      {
        nombre: 'Uncharted 5',
        precio: 69.99,
        categoria_id: categories.rows.find(c => c.nombre === 'Aventura')?.id,
        esta_oferta: false,
        estado: true,
        plataformas: ['PlayStation 5']
      },
      {
        nombre: 'GTA Vice City',
        precio: 19.99,
        categoria_id: categories.rows.find(c => c.nombre === 'Acción')?.id,
        esta_oferta: true,
        estado: true,
        plataformas: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch']
      },
      {
        nombre: 'Days Gone',
        precio: 39.99,
        categoria_id: categories.rows.find(c => c.nombre === 'Acción')?.id,
        esta_oferta: true,
        estado: true,
        plataformas: ['PC', 'PlayStation 4']
      }
    ];

    for (const game of games) {
      const result = await query(
        'INSERT INTO juego (nombre, precio, categoria_id, esta_oferta, estado) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [game.nombre, game.precio, game.categoria_id, game.esta_oferta, game.estado]
      );

      // Add platforms to game
      for (const platformName of game.plataformas) {
        const platform = platforms.rows.find(p => p.nombre === platformName);
        if (platform) {
          await query(
            'INSERT INTO juego_plataforma (juego_id, plataforma_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [result.rows[0].id, platform.id]
          );
        }
      }
    }

    // Insert news
    console.log('📰 Inserting news...');
    const news = [
      {
        titulo: '¡Cyberpunk 2077: Phantom Liberty ya disponible!',
        texto: 'La expansión más esperada de Cyberpunk 2077 ya está disponible. Phantom Liberty trae una nueva historia protagonizada por Idris Elba, nuevas mecánicas de juego y mejoras significativas en el rendimiento. ¡No te pierdas esta experiencia única en Night City!'
      },
      {
        titulo: 'Nintendo Switch 2: Rumores y especulaciones',
        texto: 'Los últimos rumores sugieren que Nintendo podría anunciar la Switch 2 en 2024. Se espera que la nueva consola ofrezca gráficos 4K, mejor rendimiento y compatibilidad con juegos de la Switch original. ¿Estás listo para la próxima generación de Nintendo?'
      },
      {
        titulo: 'PlayStation 5: Los mejores juegos de 2024',
        texto: 'Descubre los juegos más esperados para PlayStation 5 en 2024. Desde God of War Ragnarök hasta Final Fantasy XVI, la consola de Sony sigue ofreciendo experiencias únicas y exclusivas que no encontrarás en ninguna otra plataforma.'
      },
      {
        titulo: 'PC Gaming: El auge de los juegos indie',
        texto: 'Los juegos indie están revolucionando la industria del gaming. Títulos como Hades, Hollow Knight y Celeste han demostrado que no necesitas un gran presupuesto para crear experiencias memorables. Descubre las mejores joyas indie del momento.'
      },
      {
        titulo: 'Xbox Game Pass: La mejor suscripción de gaming',
        texto: 'Xbox Game Pass sigue siendo la mejor opción para los jugadores que quieren acceso a cientos de juegos por una suscripción mensual. Con títulos de día uno y una biblioteca en constante crecimiento, Game Pass es imprescindible para cualquier gamer.'
      }
    ];

    for (const newsItem of news) {
      await query(
        'INSERT INTO noticia (titulo, texto, activo) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
        [newsItem.titulo, newsItem.texto, true]
      );
    }

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📋 Test Data Summary:');
    console.log('- Categories:', categories.rows.length);
    console.log('- Platforms:', platforms.rows.length);
    console.log('- Games:', games.length);
    console.log('- News:', news.length);
    console.log('\n🔑 Test Accounts:');
    console.log('- Admin: admin@uligames.com / admin123');
    console.log('- User: test@uligames.com / test123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedData().then(() => {
  console.log('🎉 Seeding process finished!');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Seeding failed:', error);
  process.exit(1);
}); 
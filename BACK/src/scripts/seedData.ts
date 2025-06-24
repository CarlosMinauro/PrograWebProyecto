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

    // Insert platforms
    console.log('🎮 Inserting platforms...');
    await query('INSERT INTO plataforma (nombre) VALUES ($1) ON CONFLICT DO NOTHING', ['PC']);
    await query('INSERT INTO plataforma (nombre) VALUES ($1) ON CONFLICT DO NOTHING', ['PlayStation 5']);
    await query('INSERT INTO plataforma (nombre) VALUES ($1) ON CONFLICT DO NOTHING', ['Xbox Series X']);
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

    // Insert games
    console.log('🎮 Inserting games...');
    const games = [
      {
        nombre: 'The Witcher 3: Wild Hunt',
        precio: 29.99,
        categoria_id: categories.rows.find(c => c.nombre === 'RPG')?.id,
        esta_oferta: true,
        estado: true
      },
      {
        nombre: 'Red Dead Redemption 2',
        precio: 59.99,
        categoria_id: categories.rows.find(c => c.nombre === 'Acción')?.id,
        esta_oferta: false,
        estado: true
      },
      {
        nombre: 'Cyberpunk 2077',
        precio: 49.99,
        categoria_id: categories.rows.find(c => c.nombre === 'RPG')?.id,
        esta_oferta: true,
        estado: true
      },
      {
        nombre: 'God of War Ragnarök',
        precio: 69.99,
        categoria_id: categories.rows.find(c => c.nombre === 'Acción')?.id,
        esta_oferta: false,
        estado: true
      },
      {
        nombre: 'Elden Ring',
        precio: 59.99,
        categoria_id: categories.rows.find(c => c.nombre === 'RPG')?.id,
        esta_oferta: false,
        estado: true
      }
    ];

    for (const game of games) {
      const result = await query(
        'INSERT INTO juego (nombre, precio, categoria_id, esta_oferta, estado) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [game.nombre, game.precio, game.categoria_id, game.esta_oferta, game.estado]
      );

      // Add platforms to game (PC for all games)
      const pcPlatform = platforms.rows.find(p => p.nombre === 'PC');
      if (pcPlatform) {
        await query(
          'INSERT INTO juego_plataforma (juego_id, plataforma_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
          [result.rows[0].id, pcPlatform.id]
        );
      }
    }

    // Insert news
    console.log('📰 Inserting news...');
    const news = [
      {
        titulo: 'Nuevos juegos de PlayStation 5 llegan este mes',
        texto: 'Descubre la emocionante lista de juegos que llegan a PlayStation 5 este mes, incluyendo títulos exclusivos y grandes lanzamientos. La consola sigue demostrando su poder con gráficos increíbles y experiencias inmersivas.'
      },
      {
        titulo: 'Rumores sobre Nintendo Switch Pro: Lo que sabemos',
        texto: 'Los últimos rumores sobre la próxima Nintendo Switch Pro y lo que podría significar para la comunidad gamer. Se espera que la nueva consola ofrezca mejor rendimiento y gráficos mejorados.'
      },
      {
        titulo: 'PC Gaming: El auge de los juegos indie',
        texto: 'Cómo los juegos indie están moldeando el futuro del gaming en PC y qué esperar en los próximos meses. Los desarrolladores independientes están creando experiencias únicas y creativas.'
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
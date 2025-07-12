import { query } from '../config/database';

async function testBackend() {
  try {
    console.log('🧪 Testing backend functionality...\n');

    // Test database connection
    console.log('1. Testing database connection...');
    const dbTest = await query('SELECT NOW() as current_time');
    console.log('✅ Database connected:', dbTest.rows[0].current_time);

    // Test games endpoint data
    console.log('\n2. Testing games data...');
    const games = await query(`
      SELECT 
        j.id, j.nombre, j.precio, j.esta_oferta, j.estado,
        c.nombre as categoria_nombre,
        array_agg(p.nombre) as plataformas
      FROM juego j
      LEFT JOIN categoria c ON j.categoria_id = c.id
      LEFT JOIN juego_plataforma jp ON j.id = jp.juego_id
      LEFT JOIN plataforma p ON jp.plataforma_id = p.id
      WHERE j.estado = true
      GROUP BY j.id, j.nombre, j.precio, j.esta_oferta, j.estado, c.nombre
      LIMIT 5
    `);
    
    console.log(`✅ Found ${games.rows.length} games in database`);
    games.rows.forEach(game => {
      console.log(`   - ${game.nombre} ($${game.precio}) - ${game.categoria_nombre}`);
    });

    // Test categories
    console.log('\n3. Testing categories...');
    const categories = await query('SELECT * FROM categoria');
    console.log(`✅ Found ${categories.rows.length} categories`);
    categories.rows.forEach(cat => {
      console.log(`   - ${cat.nombre}`);
    });

    // Test platforms
    console.log('\n4. Testing platforms...');
    const platforms = await query('SELECT * FROM plataforma');
    console.log(`✅ Found ${platforms.rows.length} platforms`);
    platforms.rows.forEach(plat => {
      console.log(`   - ${plat.nombre}`);
    });

    // Test users
    console.log('\n5. Testing users...');
    const users = await query('SELECT id, nombre, correo, estado FROM usuario');
    console.log(`✅ Found ${users.rows.length} users`);
    users.rows.forEach(user => {
      console.log(`   - ${user.nombre} (${user.correo}) - ${user.estado ? 'Active' : 'Inactive'}`);
    });

    console.log('\n🎉 Backend test completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`- Games: ${games.rows.length}`);
    console.log(`- Categories: ${categories.rows.length}`);
    console.log(`- Platforms: ${platforms.rows.length}`);
    console.log(`- Users: ${users.rows.length}`);

  } catch (error) {
    console.error('❌ Backend test failed:', error);
    process.exit(1);
  }
}

testBackend().then(() => {
  console.log('\n✅ All tests passed!');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Tests failed:', error);
  process.exit(1);
}); 
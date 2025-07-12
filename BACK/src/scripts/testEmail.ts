import dotenv from 'dotenv';
import { emailService } from '../services/emailService';

// Load environment variables
dotenv.config();

async function testEmailService() {
  console.log('🧪 Testing Email Service...\n');

  try {
    // Test welcome email
    console.log('📧 Testing welcome email...');
    await emailService.sendWelcomeEmail(
      'test@example.com',
      'Test User'
    );
    console.log('✅ Welcome email test completed\n');

    // Test game keys email
    console.log('📧 Testing game keys email...');
    await emailService.sendGameKeys({
      userEmail: 'test@example.com',
      userName: 'Test User',
      gameKeys: [
        {
          codigo: 'TEST-GAME-12345',
          juego_nombre: 'Test Game',
          monto_pagado: 29.99
        }
      ],
      total: 29.99
    });
    console.log('✅ Game keys email test completed\n');

    console.log('🎉 All email tests passed!');
  } catch (error) {
    console.error('❌ Email test failed:', error);
    process.exit(1);
  }
}

// Run the test
testEmailService(); 
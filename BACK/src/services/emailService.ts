import nodemailer from 'nodemailer';

interface GameKey {
  codigo: string;
  juego_nombre: string;
  monto_pagado: number;
}

interface EmailData {
  userEmail: string;
  userName: string;
  gameKeys: GameKey[];
  total: number | string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Log email configuration for debugging
    console.log('📧 Email Service Configuration:');
    console.log('  SMTP_HOST:', process.env.SMTP_HOST || 'smtp.gmail.com');
    console.log('  SMTP_PORT:', process.env.SMTP_PORT || '587');
    console.log('  SMTP_USER:', process.env.SMTP_USER ? 'Configured' : 'NOT CONFIGURED');
    console.log('  SMTP_PASS:', process.env.SMTP_PASS ? 'Configured' : 'NOT CONFIGURED');

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('❌ Email configuration missing! Please set SMTP_USER and SMTP_PASS in your .env file');
      console.error('📝 For Gmail, you need to:');
      console.error('   1. Enable 2-factor authentication');
      console.error('   2. Generate an App Password');
      console.error('   3. Use the App Password as SMTP_PASS');
    }

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendGameKeys(data: EmailData): Promise<void> {
    const { userEmail, userName, gameKeys, total } = data;
    
    // Ensure total is a number
    const numericTotal = Number(total) || 0;

    const gameKeysHtml = gameKeys.map(key => `
      <div style="margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h3 style="margin: 0 0 10px 0; color: #333;">${key.juego_nombre}</h3>
        <p style="margin: 5px 0; color: #666;">Precio: $${key.monto_pagado}</p>
        <div style="margin: 10px 0;">
          <strong style="color: #2c3e50;">Clave del juego:</strong>
          <div style="background-color: #ecf0f1; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 16px; margin-top: 5px;">
            ${key.codigo}
          </div>
        </div>
      </div>
    `).join('');

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: userEmail,
      subject: '¡Tu compra en UliGames ha sido procesada! 🎮',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50; margin: 0;">🎮 UliGames</h1>
            <p style="color: #7f8c8d; margin: 5px 0;">Tu tienda de videojuegos favorita</p>
          </div>
          
          <div style="background-color: #ecf0f1; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #27ae60; margin: 0 0 10px 0;">¡Compra exitosa!</h2>
            <p style="margin: 5px 0; color: #2c3e50;">Hola <strong>${userName}</strong>,</p>
            <p style="margin: 5px 0; color: #2c3e50;">Tu compra ha sido procesada correctamente. A continuación encontrarás las claves de los juegos que adquiriste:</p>
          </div>
          
          ${gameKeysHtml}
          
          <div style="background-color: #3498db; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0;">Total de la compra: $${numericTotal.toFixed(2)}</h3>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin: 0 0 10px 0; color: #2c3e50;">Instrucciones:</h4>
            <ul style="margin: 0; padding-left: 20px; color: #2c3e50;">
              <li>Copia la clave del juego que deseas activar</li>
              <li>Abre la plataforma correspondiente (Steam, Epic Games, etc.)</li>
              <li>Ve a la sección "Activar producto" o "Redeem code"</li>
              <li>Pega la clave y sigue las instrucciones</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #7f8c8d; margin: 5px 0;">Gracias por tu compra en UliGames</p>
            <p style="color: #7f8c8d; margin: 5px 0;">Si tienes alguna pregunta, no dudes en contactarnos</p>
          </div>
        </div>
      `,
    };

    try {
      console.log(`📧 Attempting to send email to ${userEmail}...`);
      console.log(`📧 Email data:`, { userEmail, userName, gameKeysCount: gameKeys.length, total: numericTotal });
      
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Email sent successfully to ${userEmail} with ${gameKeys.length} game keys`);
    } catch (error) {
      console.error('❌ Error sending email:', error);
      console.error('❌ Email configuration check:');
      console.error('  - SMTP_USER:', process.env.SMTP_USER ? 'Set' : 'Missing');
      console.error('  - SMTP_PASS:', process.env.SMTP_PASS ? 'Set' : 'Missing');
      console.error('  - SMTP_HOST:', process.env.SMTP_HOST || 'smtp.gmail.com');
      console.error('  - SMTP_PORT:', process.env.SMTP_PORT || '587');
      
      if (error instanceof Error) {
        throw new Error(`Failed to send email with game keys: ${error.message}`);
      } else {
        throw new Error('Failed to send email with game keys: Unknown error');
      }
    }
  }

  async sendWelcomeEmail(userEmail: string, userName: string): Promise<void> {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: userEmail,
      subject: '¡Bienvenido a UliGames! 🎮',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50; margin: 0;">🎮 UliGames</h1>
            <p style="color: #7f8c8d; margin: 5px 0;">Tu tienda de videojuegos favorita</p>
          </div>
          
          <div style="background-color: #ecf0f1; padding: 20px; border-radius: 8px;">
            <h2 style="color: #27ae60; margin: 0 0 10px 0;">¡Bienvenido a la comunidad!</h2>
            <p style="margin: 5px 0; color: #2c3e50;">Hola <strong>${userName}</strong>,</p>
            <p style="margin: 5px 0; color: #2c3e50;">¡Gracias por registrarte en UliGames! Ya puedes disfrutar de:</p>
            <ul style="margin: 10px 0; padding-left: 20px; color: #2c3e50;">
              <li>🎮 Amplio catálogo de juegos</li>
              <li>💰 Ofertas exclusivas</li>
              <li>📧 Claves instantáneas por email</li>
              <li>⭐ Sistema de reseñas</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" 
               style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Explorar juegos
            </a>
          </div>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Welcome email sent to ${userEmail}`);
    } catch (error) {
      console.error('❌ Error sending welcome email:', error);
    }
  }
}

export const emailService = new EmailService(); 
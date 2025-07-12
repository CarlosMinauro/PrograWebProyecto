# Configuración del Servicio de Email - UliGames

## Problema
El sistema de envío de claves de juegos por correo electrónico no está funcionando correctamente.

## Solución

### 1. Configuración de Gmail

Para usar Gmail como servidor SMTP, necesitas configurar una "Contraseña de aplicación":

1. **Habilitar autenticación de dos factores**:
   - Ve a tu cuenta de Google
   - Seguridad → Verificación en dos pasos
   - Activa la verificación en dos pasos

2. **Generar contraseña de aplicación**:
   - Ve a Seguridad → Contraseñas de aplicación
   - Selecciona "Correo" como aplicación
   - Copia la contraseña generada (16 caracteres)

### 2. Configurar variables de entorno

Crea un archivo `.env` en el directorio `BACK/` con el siguiente contenido:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pw_2025_1
DB_USER=postgres
DB_PASSWORD=

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# Admin Configuration
ADMIN_EMAIL=admin@uligames.com
n

# Frontend URL
FRONTEND_URL=http://localhost:5173
# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicació
```

**Importante**: 
- Reemplaza `tu-email@gmail.com` con tu dirección de Gmail
- Reemplaza `tu-contraseña-de-aplicación` con la contraseña de 16 caracteres generada en el paso 1

### 3. Probar la configuración

Ejecuta el siguiente comando para probar la configuración del email:

```bash
cd BACK
npm run test:email
```

Este comando enviará emails de prueba a `test@example.com` para verificar que todo funciona correctamente.

### 4. Verificar en la consola

Cuando inicies el servidor backend, deberías ver en la consola:

```
📧 Email Service Configuration:
  SMTP_HOST: smtp.gmail.com
  SMTP_PORT: 587
  SMTP_USER: Configured
  SMTP_PASS: Configured
```

Si ves "NOT CONFIGURED" en lugar de "Configured", significa que las variables de entorno no están configuradas correctamente.

### 5. Solución de problemas

#### Error: "Invalid login"
- Verifica que la contraseña de aplicación sea correcta
- Asegúrate de que la autenticación de dos factores esté habilitada

#### Error: "Connection timeout"
- Verifica tu conexión a internet
- Asegúrate de que el puerto 587 no esté bloqueado por tu firewall

#### Error: "Authentication failed"
- Verifica que el email y la contraseña sean correctos
- Asegúrate de usar la contraseña de aplicación, no tu contraseña normal de Gmail

### 6. Alternativas

Si no quieres usar Gmail, puedes configurar otros proveedores:

#### Outlook/Hotmail:
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

#### Yahoo:
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

### 7. Notas importantes

- **Nunca** subas el archivo `.env` a Git (ya está en `.gitignore`)
- Las contraseñas de aplicación son específicas para cada aplicación
- Si cambias tu contraseña de Gmail, necesitarás generar una nueva contraseña de aplicación 
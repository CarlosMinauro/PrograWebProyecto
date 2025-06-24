# UliGames Backend API

Backend API para la tienda de videojuegos UliGames desarrollado con Node.js, Express, TypeScript y PostgreSQL.

## 🚀 Características

- **Autenticación JWT**: Sistema de login/registro seguro
- **Base de datos PostgreSQL**: Esquema optimizado para tienda de juegos
- **API RESTful**: Endpoints bien estructurados
- **Validación de datos**: Express-validator para validaciones
- **Manejo de errores**: Middleware centralizado
- **TypeScript**: Tipado estático para mayor seguridad
- **CORS configurado**: Para comunicación con frontend

## 📋 Prerrequisitos

- Node.js (v16 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
cd BACK
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp env.example .env
```

Editar `.env` con tus configuraciones:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pw_2025_1
DB_USER=postgres
DB_PASSWORD=tu_password_postgres

# JWT
JWT_SECRET=tu-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

4. **Configurar base de datos**
Asegúrate de que PostgreSQL esté corriendo y que la base de datos `pw_2025_1` esté creada con las tablas necesarias.

5. **Ejecutar el servidor**
```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## 📚 Endpoints de la API

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual

### Juegos
- `GET /api/games` - Obtener todos los juegos
- `GET /api/games/:id` - Obtener juego específico
- `POST /api/games` - Crear juego (Admin)
- `PUT /api/games/:id` - Actualizar juego (Admin)
- `DELETE /api/games/:id` - Eliminar juego (Admin)

### Noticias
- `GET /api/news` - Obtener todas las noticias
- `GET /api/news/:id` - Obtener noticia específica
- `POST /api/news` - Crear noticia (Admin)
- `PUT /api/news/:id` - Actualizar noticia (Admin)
- `DELETE /api/news/:id` - Eliminar noticia (Admin)

### Usuarios
- `GET /api/users/profile` - Obtener perfil del usuario
- `PUT /api/users/profile` - Actualizar perfil
- `GET /api/users` - Obtener todos los usuarios (Admin)
- `PUT /api/users/:id` - Actualizar estado de usuario (Admin)

### Órdenes
- `POST /api/orders` - Crear nueva orden
- `GET /api/orders` - Obtener órdenes del usuario
- `GET /api/orders/:id` - Obtener orden específica

## 🔐 Autenticación

La API usa JWT (JSON Web Tokens) para autenticación. Para acceder a rutas protegidas, incluye el token en el header:

```
Authorization: Bearer <tu_token_jwt>
```

## 📊 Estructura de la Base de Datos

### Tablas principales:
- **usuario**: Información de usuarios
- **juego**: Catálogo de juegos
- **categoria**: Categorías de juegos
- **plataforma**: Plataformas disponibles
- **juego_plataforma**: Relación muchos a muchos entre juegos y plataformas
- **venta**: Registro de ventas
- **calificacion**: Reseñas de usuarios
- **noticia**: Noticias del sitio

## 🛡️ Seguridad

- **Helmet**: Headers de seguridad
- **CORS**: Configuración de origen permitido
- **bcryptjs**: Hash de contraseñas
- **JWT**: Tokens de autenticación
- **Validación**: Express-validator para validar datos

## 🧪 Testing

```bash
npm test
```

## 📝 Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo con nodemon
- `npm run build` - Compilar TypeScript
- `npm start` - Ejecutar en modo producción
- `npm test` - Ejecutar tests

## 🔧 Configuración de Desarrollo

El servidor se ejecuta por defecto en `http://localhost:5000`

Para desarrollo, asegúrate de que:
1. PostgreSQL esté corriendo
2. La base de datos esté creada y configurada
3. Las variables de entorno estén correctamente configuradas
4. El frontend esté configurado para apuntar a `http://localhost:5000`

## 📞 Soporte

Para problemas o preguntas, revisa los logs del servidor o contacta al equipo de desarrollo. 
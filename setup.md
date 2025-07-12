# 🎮 UliGames - Configuración Completa

## 📋 Funcionalidades Implementadas

### ✅ **Usuario**
- [x] **Registro**: Crear cuenta con nombre, email y contraseña
- [x] **Página Principal**: Carrusel de noticias + 10 juegos más recientes
- [x] **Detalles del Juego**: Descripción, trailer, fotos, estrellas y reseñas
- [x] **Carrito de Compras**: Agregar/eliminar juegos
- [x] **Proceso de Pago**: Comprar juegos del carrito
- [x] **Email con Claves**: Recibir claves por email después de la compra
- [x] **Sistema de Reseñas**: Dejar reseñas de juegos comprados

### ✅ **Administrador**
- [x] **Navegación**: Barra con Usuarios, Juegos, Noticias y Estadísticas
- [x] **Gestión de Usuarios**: Ver y administrar usuarios
- [x] **Gestión de Juegos**: CRUD completo de juegos
- [x] **Gestión de Noticias**: CRUD completo de noticias
- [x] **Dashboard**: Estadísticas y métricas

## 🚀 Configuración del Proyecto

### 1. **Base de Datos PostgreSQL**

```sql
-- Conectar a PostgreSQL
psql -U postgres

-- Crear base de datos
CREATE DATABASE uligames_db;

-- Conectar a la base de datos
\c uligames_db

-- Ejecutar el script de esquema
\i BACK/database/schema.sql

-- Ejecutar el script de datos de prueba
\i BACK/database/seed.sql
```

### 2. **Backend (Node.js + Express + TypeScript)**

```bash
cd BACK

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env

# Editar .env con tus credenciales
# DB_PASSWORD=tu_password_postgres
# JWT_SECRET=tu_jwt_secret
# SMTP_USER=tu_email@gmail.com
# SMTP_PASS=tu_app_password_gmail

# Compilar TypeScript
npm run build

# Ejecutar en desarrollo
npm run dev

# O ejecutar en producción
npm start
```

### 3. **Frontend (React + TypeScript + Vite)**

```bash
cd FRONT

# Instalar dependencias
npm install

# Crear archivo .env
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Ejecutar en desarrollo
npm run dev
```

## 📧 Configuración de Email

### Para Gmail:
1. Activar autenticación de 2 factores
2. Generar contraseña de aplicación
3. Usar esa contraseña en `SMTP_PASS`

### Variables de entorno necesarias:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_app_password
```

## 🗄️ Estructura de la Base de Datos

### Tablas principales:
- `usuario`: Usuarios del sistema
- `juego`: Catálogo de juegos
- `noticia`: Noticias del sitio
- `venta`: Registro de compras
- `calificacion`: Reseñas de usuarios

### Relaciones:
- Usuario → Ventas (1:N)
- Juego → Ventas (1:N)
- Usuario → Calificaciones (1:N)
- Juego → Calificaciones (1:N)

## 🔧 Comandos Útiles

### Base de Datos:
```bash
# Ver tablas
\dt

# Ver estructura de tabla
\d nombre_tabla

# Ver datos
SELECT * FROM usuario LIMIT 5;
SELECT * FROM juego LIMIT 5;
SELECT * FROM venta LIMIT 5;

# Estadísticas
SELECT COUNT(*) FROM usuario;
SELECT COUNT(*) FROM juego;
SELECT COUNT(*) FROM venta;
```

### Backend:
```bash
# Ejecutar seed de datos
npm run seed

# Ver logs
npm run dev

# Verificar salud de la API
curl http://localhost:5000/api/health
```

### Frontend:
```bash
# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build
npm run preview
```

## 🌐 URLs de la Aplicación

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 🔐 Credenciales de Prueba

### Usuario Normal:
- Email: user@example.com
- Password: password123

### Administrador:
- Email: admin@example.com
- Password: admin123

## 📱 Funcionalidades por Página

### Páginas de Usuario:
- **Home** (`/`): Carrusel de noticias + juegos recientes
- **Catalog** (`/catalog`): Catálogo completo de juegos
- **Game Details** (`/game/:id`): Detalles, compra y reseñas
- **Cart** (`/cart`): Carrito de compras
- **Profile** (`/profile`): Perfil del usuario
- **Settings** (`/settings`): Configuración

### Páginas de Administrador:
- **Dashboard** (`/admin/dashboard`): Estadísticas generales
- **Users** (`/admin/users`): Gestión de usuarios
- **Games** (`/admin/games`): Gestión de juegos
- **News** (`/admin/news`): Gestión de noticias

## 🎯 Flujo de Compra

1. **Usuario navega** al catálogo
2. **Selecciona un juego** y ve detalles
3. **Agrega al carrito** (requiere login)
4. **Va al carrito** y revisa items
5. **Procede al pago** (simulado)
6. **Recibe email** con claves del juego
7. **Puede dejar reseña** del juego comprado

## 🔍 Troubleshooting

### Error de CORS:
- Verificar que el backend esté corriendo en puerto 5000
- Verificar configuración de CORS en `BACK/src/index.ts`

### Error de Base de Datos:
- Verificar que PostgreSQL esté corriendo
- Verificar credenciales en `.env`
- Ejecutar `npm run seed` para poblar datos

### Error de Email:
- Verificar configuración SMTP en `.env`
- Verificar que el email tenga autenticación de 2 factores
- Usar contraseña de aplicación, no la contraseña normal

### Error de Frontend:
- Verificar que la API esté corriendo
- Verificar `VITE_API_URL` en `.env`
- Limpiar cache del navegador

## 📞 Soporte

Si encuentras problemas:
1. Verificar logs del backend
2. Verificar consola del navegador
3. Verificar que todas las dependencias estén instaladas
4. Verificar configuración de variables de entorno 
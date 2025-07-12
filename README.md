# UliGames - Proyecto Web

## Requisitos
- Node.js >= 16.x
- PostgreSQL >= 12.x

## 1. Clonar el repositorio
```sh
git clone https://github.com/CarlosMinauro/PrograWebProyecto
```

## 2. Configuración de la base de datos

### Crear la base de datos y tablas
Conéctate a PostgreSQL y ejecuta lo siguiente:

```sql
-- Crear la base de datos
CREATE DATABASE pw_2025_1;

-- Conectarse a la base de datos
\c pw_2025_1;

-- Tabla Usuario
CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    token TEXT,
    estado BOOLEAN NOT NULL
);

-- Tabla Noticia
CREATE TABLE Noticia (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    texto TEXT NOT NULL,
    activo BOOLEAN NOT NULL
);

-- Tabla Categoria
CREATE TABLE Categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla Plataforma
CREATE TABLE Plataforma (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla Juego
CREATE TABLE Juego (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(10,2) NOT NULL,
    categoria_id INTEGER REFERENCES Categoria(id),
    esta_oferta BOOLEAN NOT NULL,
    estado BOOLEAN NOT NULL
);

-- Tabla intermedia Juego_Plataforma (relación muchos a muchos)
CREATE TABLE Juego_Plataforma (
    juego_id INTEGER REFERENCES Juego(id) ON DELETE CASCADE,
    plataforma_id INTEGER REFERENCES Plataforma(id) ON DELETE CASCADE,
    PRIMARY KEY (juego_id, plataforma_id)
);

-- Tabla Venta
CREATE TABLE Venta (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL,
    usuario_id INTEGER REFERENCES Usuario(id) ON DELETE CASCADE,
    juego_id INTEGER REFERENCES Juego(id) ON DELETE CASCADE,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    monto_pagado NUMERIC(10,2) NOT NULL
);

-- Tabla Calificacion
CREATE TABLE Calificacion (
    id SERIAL PRIMARY KEY,
    valoracion INTEGER CHECK (valoracion >= 1 AND valoracion <= 5),
    comentario TEXT,
    juego_id INTEGER REFERENCES Juego(id) ON DELETE CASCADE,
    usuario_id INTEGER REFERENCES Usuario(id) ON DELETE CASCADE
);
```

### Insertar datos de ejemplo (opcional pero recomendado)
```sql
-- Plataformas
INSERT INTO Plataforma (nombre) VALUES (' Windows '), (' PlayStation 4 '), (' Xbox '), (' Nintendo Swtich '), (' MacOS '), (' PlayStation 5 ');

-- Categorías
INSERT INTO Categoria (nombre) VALUES ('Acción'), ('Aventura'), ('RPG'), ('Deportes');

-- Juegos
INSERT INTO Juego (nombre, precio, categoria_id, esta_oferta, estado)
VALUES 
('Cyberpunk 2077', 59.99, 3, false, true),
('The Last of Us Parte II', 69.99, 2, true, true),
('Halo Infinite', 59.99, 1, false, true);

-- Relacionar juegos con plataformas
INSERT INTO Juego_Plataforma (juego_id, plataforma_id) VALUES
(1, 1), -- Cyberpunk 2077 en Windows
(2, 2), -- The Last of Us Parte II en PlayStation 4
(3, 3); -- Halo Infinite en Xbox

-- Usuario de prueba (la contraseña debe ser hasheada si vas a usar login real)
INSERT INTO Usuario (correo, password, nombre, estado) VALUES
('test@correo.com', '123456', 'Usuario Prueba', true);

-- Noticia de prueba
INSERT INTO Noticia (titulo, texto, activo) VALUES
('¡Bienvenido a la tienda!', 'Disfruta de los mejores juegos.', true);
```

## 3. Configuración del archivo `.env`
Crea un archivo `.env` en la carpeta `BACK/` con el siguiente contenido (ajusta los valores según tu entorno):

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
```

## 4. Instalación de dependencias

### Backend
```sh
cd BACK
npm install
```

### Frontend
```sh
cd ../FRONT
npm install
```

## 5. Ejecución del proyecto

### Backend
```sh
cd BACK
npm run dev
```

### Frontend
```sh
cd ../FRONT
npm run dev
```

- El backend estará en: [http://localhost:5000](http://localhost:5000)
- El frontend estará en: [http://localhost:5173](http://localhost:5173)

## 6. Estado del Proyecto

### ✅ Funcionalidades Completadas:
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript + PostgreSQL
- **Autenticación**: JWT con login/registro
- **Carrito de Compras**: Funcional con persistencia en localStorage
- **API RESTful**: Endpoints para juegos, usuarios, órdenes y noticias
- **Base de Datos**: Esquema completo con relaciones
- **CORS**: Configurado para comunicación frontend-backend

### 🔧 Funcionalidades del Carrito:
- ✅ Agregar juegos al carrito
- ✅ Remover juegos del carrito
- ✅ Calcular total
- ✅ Persistencia en localStorage
- ✅ Checkout con simulación de pago
- ✅ Fallback offline si el backend no está disponible

### 🚀 Configuración Completa (Datos Reales):

#### **1. Configurar Base de Datos:**
```bash
# Crear base de datos PostgreSQL
CREATE DATABASE pw_2025_1;

# Ejecutar el esquema SQL del README principal
```

#### **2. Configurar Backend:**
```bash
cd BACK
cp env.example .env
# Editar .env con credenciales de PostgreSQL

npm install
npm run seed    # Poblar datos de prueba
npm run test    # Verificar que todo funciona
npm run dev     # Iniciar servidor
```

#### **3. Configurar Frontend:**
```bash
cd FRONT
npm install
npm run dev     # Iniciar aplicación
```

#### **4. Verificar Funcionamiento:**
- Backend: http://localhost:5000/api/health
- Frontend: http://localhost:5173
- Datos reales de la base de datos se cargarán automáticamente

### 📝 Notas:
- **Datos Reales**: El frontend ahora usa datos reales de la base de datos PostgreSQL
- **Sin Datos Mock**: Eliminados todos los fallbacks a datos simulados
- **API Completa**: Todos los endpoints funcionan con datos reales
- **Carrito Real**: El carrito usa precios y datos reales de la base de datos
- **Checkout Real**: El proceso de pago crea órdenes reales en la base de datos
- **Autenticación Real**: Login/registro funciona con usuarios reales de la base de datos

### 🔧 Comandos Útiles:
```bash
# Verificar backend
cd BACK && npm run test

# Poblar datos de prueba
cd BACK && npm run seed

# Verificar frontend
cd FRONT && npm run dev
```

---

¡Listo! Ahora puedes desarrollar y probar UliGames en tu máquina local. 
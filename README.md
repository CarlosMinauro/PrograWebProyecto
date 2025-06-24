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

```
# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=pw_2025_1

# JWT
JWT_SECRET=un_secreto_super_seguro
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:5174

# Otros
NODE_ENV=development
PORT=5000
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
- El frontend estará en: [http://localhost:5174](http://localhost:5174)

## 6. Notas adicionales
- Si cambias el puerto del frontend, actualiza también el valor de `CORS_ORIGIN` en el `.env` del backend.
- Si necesitas más datos de prueba, puedes agregarlos usando SQL o creando scripts de seed.
- Para producción, recuerda cambiar los valores sensibles y restringir los orígenes de CORS.

---

¡Listo! Ahora puedes desarrollar y probar UliGames en tu máquina local. 
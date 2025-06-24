// Database Types based on PostgreSQL schema

export interface Usuario {
  id: number;
  correo: string;
  password: string;
  nombre: string;
  token?: string;
  estado: boolean;
}

export interface Noticia {
  id: number;
  titulo: string;
  texto: string;
  activo: boolean;
}

export interface Categoria {
  id: number;
  nombre: string;
}

export interface Plataforma {
  id: number;
  nombre: string;
}

export interface Juego {
  id: number;
  nombre: string;
  precio: number;
  categoria_id: number;
  esta_oferta: boolean;
  estado: boolean;
  // Additional fields for API responses
  categoria?: Categoria;
  plataformas?: Plataforma[];
}

export interface JuegoPlataforma {
  juego_id: number;
  plataforma_id: number;
}

export interface Venta {
  id: number;
  fecha: Date;
  usuario_id: number;
  juego_id: number;
  codigo: string;
  monto_pagado: number;
  // Additional fields for API responses
  usuario?: Usuario;
  juego?: Juego;
}

export interface Calificacion {
  id: number;
  valoracion: number; // 1-5
  comentario?: string;
  juego_id: number;
  usuario_id: number;
  // Additional fields for API responses
  usuario?: Usuario;
  juego?: Juego;
}

// API Request/Response Types

export interface LoginRequest {
  correo: string;
  password: string;
}

export interface RegisterRequest {
  correo: string;
  password: string;
  nombre: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: Omit<Usuario, 'password'>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Extended types for frontend compatibility
export interface GameWithDetails extends Juego {
  descripcion?: string;
  imagen_url?: string;
  fecha_lanzamiento?: Date;
  desarrollador?: string;
  publisher?: string;
  generos?: string[];
  caracteristicas?: string[];
  capturas?: string[];
  videos?: string[];
  calificacion_promedio?: number;
  total_calificaciones?: number;
}

export interface NewsWithDetails extends Noticia {
  imagen_url?: string;
  fecha?: Date;
  autor?: string;
  etiquetas?: string[];
}

// Cart and Order types
export interface CartItem {
  juego_id: number;
  cantidad: number;
  precio: number;
  nombre: string;
}

export interface OrderRequest {
  items: CartItem[];
  metodo_pago: string;
}

export interface OrderResponse {
  id: number;
  usuario_id: number;
  items: Venta[];
  total: number;
  estado: 'pendiente' | 'procesando' | 'completado' | 'cancelado';
  fecha: Date;
} 
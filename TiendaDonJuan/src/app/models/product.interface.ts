// src/app/models/product.interface.ts

export interface Product {
  _id?: string;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
  disponible?: boolean;
  stock?: number;
}
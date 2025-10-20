// src/app/app.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './models/product.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TechStore - Tu Tienda de Tecnología';

  // Catálogo de productos disponibles
  productos: Product[] = [
    {
      id: 1,
      nombre: 'Laptop Gaming',
      precio: 1299.99,
      imagen: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=200&fit=crop',
      descripcion: 'Laptop potente para gaming'
    },
    {
      id: 2,
      nombre: 'Auriculares Bluetooth',
      precio: 89.99,
      imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
      descripcion: 'Sonido premium inalámbrico'
    },
    {
      id: 3,
      nombre: 'Teclado Mecánico',
      precio: 129.99,
      imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=200&fit=crop',
      descripcion: 'RGB con switches Cherry MX'
    },
    {
      id: 4,
      nombre: 'Mouse Gamer',
      precio: 59.99,
      imagen: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=200&fit=crop',
      descripcion: 'Alta precisión 16000 DPI'
    },
    {
      id: 5,
      nombre: 'Monitor 4K',
      precio: 449.99,
      imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop',
      descripcion: '27 pulgadas Ultra HD'
    },
    {
      id: 6,
      nombre: 'Webcam HD',
      precio: 79.99,
      imagen: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=300&h=200&fit=crop',
      descripcion: '1080p con micrófono integrado'
    }
  ];

  // Carrito de compras con cantidades
  carrito: Map<number, { producto: Product; cantidad: number }> = new Map();

  // Agregar producto al carrito
  agregarAlCarrito(producto: Product): void {
    const itemExistente = this.carrito.get(producto.id);
    
    if (itemExistente) {
      // Si ya existe, incrementar la cantidad
      itemExistente.cantidad++;
    } else {
      // Si no existe, agregarlo con cantidad 1
      this.carrito.set(producto.id, { producto, cantidad: 1 });
    }
  }

  // Eliminar una unidad del producto
  eliminarDelCarrito(productId: number): void {
    const item = this.carrito.get(productId);
    
    if (item) {
      if (item.cantidad > 1) {
        // Si hay más de uno, reducir la cantidad
        item.cantidad--;
      } else {
        // Si solo hay uno, eliminar del carrito
        this.carrito.delete(productId);
      }
    }
  }

  // Eliminar completamente un producto del carrito
  eliminarProductoCompleto(productId: number): void {
    this.carrito.delete(productId);
  }

  // Obtener items del carrito como array
  obtenerItemsCarrito(): { producto: Product; cantidad: number }[] {
    return Array.from(this.carrito.values());
  }

  // Calcular el total del carrito
  calcularTotal(): number {
    let total = 0;
    this.carrito.forEach(item => {
      total += item.producto.precio * item.cantidad;
    });
    return total;
  }

  // Verificar si el carrito está vacío
  carritoVacio(): boolean {
    return this.carrito.size === 0;
  }

  // Obtener cantidad total de productos
  cantidadTotalProductos(): number {
    let total = 0;
    this.carrito.forEach(item => {
      total += item.cantidad;
    });
    return total;
  }
}
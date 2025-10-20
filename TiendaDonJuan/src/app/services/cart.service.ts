// src/app/services/cart.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface CartItem {
  producto: any;
  cantidad: number;
  precio: number;
}

export interface Cart {
  _id?: string;
  userId: string;
  items: CartItem[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cart';
  private userId = 'user123'; // ID fijo para este ejemplo
  
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  // Cargar el carrito del usuario
  loadCart(): void {
    this.getCart(this.userId).subscribe(
      cart => this.cartSubject.next(cart),
      error => console.error('Error al cargar carrito:', error)
    );
  }

  // Obtener el carrito
  getCart(userId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/${userId}`);
  }

  // Agregar producto al carrito
  addToCart(productoId: string, cantidad: number = 1): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, {
      userId: this.userId,
      productoId,
      cantidad
    }).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  // Actualizar cantidad de un producto
  updateCartItem(productoId: string, cantidad: number): Observable<Cart> {
    return this.http.patch<Cart>(this.apiUrl, {
      userId: this.userId,
      productoId,
      cantidad
    }).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  // Eliminar un producto del carrito
  removeFromCart(productoId: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/${this.userId}/${productoId}`).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  // Vaciar el carrito
  clearCart(): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/${this.userId}`).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }
}
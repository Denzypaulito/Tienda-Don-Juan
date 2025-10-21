// src/cart/cart.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { Product, ProductDocument } from '../products/schemas/product.schema';
import { AddToCartDto, UpdateCartItemDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getCart(userId: string): Promise<Cart> {
    let cart = await this.cartModel
      .findOne({ userId })
      .populate('items.producto')
      .exec();

    if (!cart) {
      cart = await this.cartModel.create({
        userId,
        items: [],
        total: 0,
      });
    }

    return cart;
  }

  async addToCart(addToCartDto: AddToCartDto): Promise<Cart> {
    const { userId, productoId, cantidad } = addToCartDto;

    const product = await this.productModel.findById(productoId).exec();
    if (!product) {
      throw new NotFoundException(`Producto con ID ${productoId} no encontrado`);
    }

    let cart = await this.cartModel.findOne({ userId }).exec();

    if (!cart) {
      cart = new this.cartModel({
        userId,
        items: [],
        total: 0,
      });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.producto.toString() === productoId,
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].cantidad += cantidad;
    } else {
      cart.items.push({
        producto: product._id,
        cantidad,
        precio: product.precio,
      } as any);
    }

    cart.total = this.calculateTotal(cart);
    await cart.save();

    const updatedCart = await this.cartModel.findById(cart._id).populate('items.producto').exec();
    if (!updatedCart) {
      throw new NotFoundException('Error al actualizar el carrito');
    }
    return updatedCart;
  }

  async updateCartItem(updateCartItemDto: UpdateCartItemDto): Promise<Cart> {
    const { userId, productoId, cantidad } = updateCartItemDto;

    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new NotFoundException(`Carrito no encontrado`);
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.producto.toString() === productoId,
    );

    if (itemIndex === -1) {
      throw new NotFoundException(`Producto no encontrado en el carrito`);
    }

    if (cantidad === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].cantidad = cantidad;
    }

    cart.total = this.calculateTotal(cart);
    await cart.save();

    const updatedCart = await this.cartModel.findById(cart._id).populate('items.producto').exec();
    if (!updatedCart) {
      throw new NotFoundException('Error al actualizar el carrito');
    }
    return updatedCart;
  }

  async removeFromCart(userId: string, productoId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new NotFoundException(`Carrito no encontrado`);
    }

    cart.items = cart.items.filter(
      (item) => item.producto.toString() !== productoId,
    );

    cart.total = this.calculateTotal(cart);
    await cart.save();

    const updatedCart = await this.cartModel.findById(cart._id).populate('items.producto').exec();
    if (!updatedCart) {
      throw new NotFoundException('Error al actualizar el carrito');
    }
    return updatedCart;
  }

  async clearCart(userId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new NotFoundException(`Carrito no encontrado`);
    }

    cart.items = [];
    cart.total = 0;
    await cart.save();

    return cart;
  }

  private calculateTotal(cart: Cart): number {
    return cart.items.reduce((total, item) => {
      return total + item.precio * item.cantidad;
    }, 0);
  }
}
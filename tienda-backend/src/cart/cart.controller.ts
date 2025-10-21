// src/cart/cart.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/add-to-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Post()
  addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(addToCartDto);
  }

  @Patch()
  updateCartItem(@Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartService.updateCartItem(updateCartItemDto);
  }

  @Delete(':userId/:productoId')
  removeFromCart(
    @Param('userId') userId: string,
    @Param('productoId') productoId: string,
  ) {
    return this.cartService.removeFromCart(userId, productoId);
  }

  @Delete(':userId')
  clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }
}
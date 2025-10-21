// src/cart/dto/add-to-cart.dto.ts

import { IsString, IsNumber, Min } from 'class-validator';

export class AddToCartDto {
  @IsString()
  userId: string;

  @IsString()
  productoId: string;

  @IsNumber()
  @Min(1)
  cantidad: number;
}

export class UpdateCartItemDto {
  @IsString()
  userId: string;

  @IsString()
  productoId: string;

  @IsNumber()
  @Min(0)
  cantidad: number;
}
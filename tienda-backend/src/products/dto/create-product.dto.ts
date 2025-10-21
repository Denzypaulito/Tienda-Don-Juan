// src/products/dto/create-product.dto.ts

import { IsString, IsNumber, IsBoolean, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  nombre: string;

  @IsNumber()
  @Min(0)
  precio: number;

  @IsString()
  imagen: string;

  @IsString()
  descripcion: string;

  @IsBoolean()
  @IsOptional()
  disponible?: boolean;

  @IsNumber()
  @IsOptional()
  @Min(0)
  stock?: number;
}
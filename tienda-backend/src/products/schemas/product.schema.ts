// src/products/schemas/product.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  precio: number;

  @Prop({ required: true })
  imagen: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ default: true })
  disponible: boolean;

  @Prop({ default: 0 })
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
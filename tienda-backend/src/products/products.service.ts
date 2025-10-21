// src/products/products.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find({ disponible: true }).exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async update(id: string, updateProductDto: Partial<CreateProductDto>): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    
    if (!updatedProduct) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  }

  async seedProducts(): Promise<Product[]> {
    const count = await this.productModel.countDocuments();
    if (count > 0) {
      return this.findAll();
    }

    const products = [
      {
        nombre: 'Laptop Gaming',
        precio: 1299.99,
        imagen: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=200&fit=crop',
        descripcion: 'Laptop potente para gaming',
        disponible: true,
        stock: 10,
      },
      {
        nombre: 'Auriculares Bluetooth',
        precio: 89.99,
        imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
        descripcion: 'Sonido premium inalámbrico',
        disponible: true,
        stock: 25,
      },
      {
        nombre: 'Teclado Mecánico',
        precio: 129.99,
        imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=200&fit=crop',
        descripcion: 'RGB con switches Cherry MX',
        disponible: true,
        stock: 15,
      },
      {
        nombre: 'Mouse Gamer',
        precio: 59.99,
        imagen: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=200&fit=crop',
        descripcion: 'Alta precisión 16000 DPI',
        disponible: true,
        stock: 30,
      },
      {
        nombre: 'Monitor 4K',
        precio: 449.99,
        imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop',
        descripcion: '27 pulgadas Ultra HD',
        disponible: true,
        stock: 8,
      },
      {
        nombre: 'Webcam HD',
        precio: 79.99,
        imagen: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=300&h=200&fit=crop',
        descripcion: '1080p con micrófono integrado',
        disponible: true,
        stock: 20,
      },
    ];

    return this.productModel.insertMany(products);
  }
}
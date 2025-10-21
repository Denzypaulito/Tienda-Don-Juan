// src/main.ts

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para el frontend de Angular
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  // Habilitar validación global
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📦 Productos: http://localhost:${port}/products`);
  console.log(`🛒 Carrito: http://localhost:${port}/cart`);
}
bootstrap();
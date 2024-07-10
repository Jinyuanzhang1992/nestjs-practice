import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
};

bootstrap();

// app.setGlobalPrefix('api');
//添加全局前缀api

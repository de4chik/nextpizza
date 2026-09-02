import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Next-pizza')
  .setDescription('The next-pizza API description')
  .setVersion('1.0.0')
  .build();
export const swaggerConfig = (app: INestApplication) =>
  SwaggerModule.createDocument(app, config);

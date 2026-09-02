import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //SERVER
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.setGlobalPrefix('api');

  // SWAGGER
  SwaggerModule.setup('docs', app, swaggerConfig(app));

  await app.listen(process.env.SERVER_PORT!);
}
bootstrap();

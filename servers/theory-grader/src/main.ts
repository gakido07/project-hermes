import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeEnvironmentVariables } from '@projecthermes/core/server-libs/dot-env';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { CORS_ORIGINS } from '@projecthermes/common/constants';
initializeEnvironmentVariables();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: CORS_ORIGINS,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', ' DELETE'],
  });
  await app.listen(process.env.PORT || 8080);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    routeConflictPolicy: { duplicate: 'error', shadow: 'warn' },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);

  const port = Number(configService.get('PORT') || 3000);

  await app.listen(port, '0.0.0.0');

  console.log(`Application running on port ${port}`);
}

await bootstrap();

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { AppModule } from './app.module.js';
import { SeedService } from './seed/seed.service.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ── CORS ────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: process.env['CORS_ORIGIN'] ?? '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: false,
  });

  // ── Static files: serve uploaded images at /uploads/<filename> ──────────
  app.useStaticAssets(join(process.cwd(), 'data', 'user-images'), {
    prefix: '/uploads',
  });


  // Seed on first boot
  const seedService = app.get(SeedService);
  await seedService.seedIfFresh();

  // ── Listen ───────────────────────────────────────────────────────────────
  const port = parseInt(process.env['PORT'] ?? '3000', 10);
  await app.listen(port);
  console.log(`🐾  Pet Heaven API running on http://localhost:${port}`);
}

await bootstrap();

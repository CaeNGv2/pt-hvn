/**
 * emit openapi.json without starting a real server.
 * Run after `nest build`
 * It creates a NestJS application context without connecting to the database,
 * generates the Swagger document, writes it to dist/openapi.json, then exits.
 */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

// We import a lightweight "spec-only" module that registers all controllers
// but skips the TypeORM connection (not available in CI).
import { SpecModule } from './swaggerspec.module.js';

async function generate() {
  const app = await NestFactory.create(SpecModule, { });

  const config = new DocumentBuilder()
    .setTitle('Pet Heaven Society API')
    .setDescription(
      'REST API for Pet Heaven Society — pet listings, member registration, ' +
      'adoption applications, and pet surrender forms.',
    )
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const outPath = join(process.cwd(), 'dist', 'openapi.json');
  writeFileSync(outPath, JSON.stringify(document, null, 2));
  console.log(`OpenAPI spec written to ${outPath}`);
  await app.close();
}

await generate();

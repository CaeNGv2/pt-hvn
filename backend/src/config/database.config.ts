import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PetType } from '../entities/pet-type.entity.js';
import { Tag } from '../entities/tag.entity.js';
import { Pet } from '../entities/pet.entity.js';
import { Member } from '../entities/member.entity.js';
import { ReleasedPet } from '../entities/released-pet.entity.js';
import { AdoptionApplication } from '../entities/adoption-application.entity.js';

export function getDatabaseConfig(): TypeOrmModuleOptions {
  return {
    type: 'mysql',
    host: process.env['DB_HOST'] ?? 'localhost',
    port: parseInt(process.env['DB_PORT'] ?? '3306', 10),
    username: process.env['DB_USER'] ?? 'pethaven',
    password: process.env['DB_PASS'] ?? 'pethaven',
    database: process.env['DB_NAME'] ?? 'pethaven',
    entities: [PetType, Tag, Pet, Member, ReleasedPet, AdoptionApplication],
    synchronize: process.env['TYPEORM_DISABLE_SYNC'] !== 'true',
    logging: process.env['DB_LOGGING'] === 'true',
    charset: 'utf8mb4',
  };
}

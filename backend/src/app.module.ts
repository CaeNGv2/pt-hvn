import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config.js';
import { AuthModule } from './auth/auth.module.js';
import { MembersModule } from './members/members.module.js';
import { PetsModule } from './pets/pets.module.js';
import { ReleasesModule } from './releases/releases.module.js';
import { AdoptionsModule } from './adoptions/adoptions.module.js';
import { UploadModule } from './upload/upload.module.js';
import { SeedModule } from './seed/seed.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot(getDatabaseConfig()),
    AuthModule,
    MembersModule,
    PetsModule,
    ReleasesModule,
    AdoptionsModule,
    UploadModule,
    SeedModule,
  ],
})
export class AppModule {}

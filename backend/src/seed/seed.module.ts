import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetType } from '../entities/pet-type.entity.js';
import { Tag } from '../entities/tag.entity.js';
import { Pet } from '../entities/pet.entity.js';
import { Member } from '../entities/member.entity.js';
import { SeedService } from './seed.service.js';
import { SeedController } from './seed.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([PetType, Tag, Pet, Member])],
  controllers: [SeedController],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}

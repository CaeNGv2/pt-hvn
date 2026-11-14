import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from '../entities/pet.entity.js';
import { PetType } from '../entities/pet-type.entity.js';
import { Tag } from '../entities/tag.entity.js';
import { PetsService } from './pets.service.js';
import { PetsController } from './pets.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, PetType, Tag])],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService],
})
export class PetsModule {}

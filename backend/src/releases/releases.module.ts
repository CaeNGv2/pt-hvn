import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReleasedPet } from '../entities/released-pet.entity.js';
import { PetType } from '../entities/pet-type.entity.js';
import { Member } from '../entities/member.entity.js';
import { Tag } from '../entities/tag.entity.js';
import { Pet } from '../entities/pet.entity.js';
import { ReleasesService } from './releases.service.js';
import { ReleasesController } from './releases.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([ReleasedPet, PetType, Member, Tag, Pet])],
  controllers: [ReleasesController],
  providers: [ReleasesService],
})
export class ReleasesModule {}

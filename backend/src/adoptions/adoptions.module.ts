import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdoptionApplication } from '../entities/adoption-application.entity.js';
import { Member } from '../entities/member.entity.js';
import { Pet } from '../entities/pet.entity.js';
import { AdoptionsService } from './adoptions.service.js';
import { AdoptionsController } from './adoptions.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([AdoptionApplication, Member, Pet])],
  controllers: [AdoptionsController],
  providers: [AdoptionsService],
})
export class AdoptionsModule {}

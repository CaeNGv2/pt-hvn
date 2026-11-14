import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdoptionApplication } from '../entities/adoption-application.entity.js';
import { Member } from '../entities/member.entity.js';
import { Pet } from '../entities/pet.entity.js';
import type { CreateAdoptionDto, ReviewAdoptionDto } from './adoptions.dto.js';

@Injectable()
export class AdoptionsService {
  constructor(
    @InjectRepository(AdoptionApplication)
    private readonly appRepo: Repository<AdoptionApplication>,
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
    @InjectRepository(Pet)
    private readonly petRepo: Repository<Pet>,
  ) {}

  async create(memberId: number, dto: CreateAdoptionDto): Promise<AdoptionApplication> {
    const member = await this.memberRepo.findOne({ where: { id: memberId } });
    if (!member) throw new NotFoundException('Member not found');

    const pet = await this.petRepo.findOne({ where: { id: dto.petId } });
    if (!pet) throw new NotFoundException('Pet not found');
    if (!pet.isAvailable) throw new BadRequestException('Pet is not available for adoption');

    const application = this.appRepo.create({
      member,
      pet,
      livingSituation: dto.livingSituation ?? null,
      experienceDesc: dto.experienceDesc ?? null,
      message: dto.message ?? null,
    });
    return this.appRepo.save(application);
  }

  findAll(status?: string): Promise<AdoptionApplication[]> {
    const where = status ? { status: status as AdoptionApplication['status'] } : {};
    return this.appRepo.find({
      where,
      relations: ['member', 'pet', 'pet.type', 'pet.tags'],
      order: { submittedAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<AdoptionApplication> {
    const app = await this.appRepo.findOne({
      where: { id },
      relations: ['member', 'pet', 'pet.type', 'pet.tags'],
    });
    if (!app) throw new NotFoundException('Application not found');
    return app;
  }

  async findByMember(memberId: number): Promise<AdoptionApplication[]> {
    return this.appRepo.find({
      where: { member: { id: memberId } },
      relations: ['pet', 'pet.type', 'pet.tags'],
      order: { submittedAt: 'DESC' },
    });
  }

  async review(id: number, dto: ReviewAdoptionDto): Promise<AdoptionApplication> {
    const app = await this.findOne(id);
    app.status = dto.status;
    app.adminNotes = dto.adminNotes ?? null;
    app.reviewedAt = new Date();
    return this.appRepo.save(app);
  }
}

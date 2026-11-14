import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReleasedPet } from '../entities/released-pet.entity.js';
import { PetType } from '../entities/pet-type.entity.js';
import { Member } from '../entities/member.entity.js';
import type { SubmitReleaseDto, ReviewReleaseDto } from './releases.dto.js';

@Injectable()
export class ReleasesService {
  constructor(
    @InjectRepository(ReleasedPet)
    private readonly releaseRepo: Repository<ReleasedPet>,
    @InjectRepository(PetType)
    private readonly typeRepo: Repository<PetType>,
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
  ) {}

  async submit(memberId: number, dto: SubmitReleaseDto): Promise<ReleasedPet> {
    const member = await this.memberRepo.findOne({ where: { id: memberId } });
    if (!member) throw new NotFoundException('Member not found');

    const release = this.releaseRepo.create({
      member,
      petName: dto.petName,
      breed: dto.breed ?? null,
      ageYears: dto.ageYears ?? null,
      gender: dto.gender ?? 'unknown',
      summaryDesc: dto.summaryDesc ?? null,
      petDesc: dto.petDesc ?? null,
      reasonDesc: dto.reasonDesc ?? null,
    });
    release.photo = dto.photo ?? null;

    if (dto.petTypeId) {
      const type = await this.typeRepo.findOne({ where: { id: dto.petTypeId } });
      release.petType = type ?? null;
    }

    return this.releaseRepo.save(release);
  }

  findAll(status?: string): Promise<ReleasedPet[]> {
    const where = status ? { status: status as ReleasedPet['status'] } : {};
    return this.releaseRepo.find({
      where,
      relations: ['petType', 'member'],
      order: { submittedAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ReleasedPet> {
    const release = await this.releaseRepo.findOne({
      where: { id },
      relations: ['petType', 'member'],
    });
    if (!release) throw new NotFoundException('Release request not found');
    return release;
  }

  async findByMember(memberId: number): Promise<ReleasedPet[]> {
    return this.releaseRepo.find({
      where: { member: { id: memberId } },
      relations: ['petType'],
      order: { submittedAt: 'DESC' },
    });
  }

  async review(id: number, dto: ReviewReleaseDto): Promise<ReleasedPet> {
    const release = await this.findOne(id);
    release.status = dto.status;
    release.adminNotes = dto.adminNotes ?? null;
    release.reviewedAt = new Date();
    return this.releaseRepo.save(release);
  }
}

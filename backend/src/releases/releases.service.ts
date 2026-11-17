import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ReleasedPet } from '../entities/released-pet.entity.js';
import { PetType } from '../entities/pet-type.entity.js';
import { Member } from '../entities/member.entity.js';
import { Tag } from '../entities/tag.entity.js';
import { Pet } from '../entities/pet.entity.js';
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
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
    @InjectRepository(Pet)
    private readonly petRepo: Repository<Pet>,
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
    if (dto.tagIds?.length) {
      release.tags = await this.tagRepo.findBy({ id: In(dto.tagIds) });
    }

    return this.releaseRepo.save(release);
  }

  findAll(status?: string): Promise<ReleasedPet[]> {
    const where = status ? { status: status as ReleasedPet['status'] } : {};
    return this.releaseRepo.find({
      where,
      relations: ['petType', 'member', 'tags'],
      order: { submittedAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ReleasedPet> {
    const release = await this.releaseRepo.findOne({
      where: { id },
      relations: ['petType', 'member', 'tags'],
    });
    if (!release) throw new NotFoundException('Release request not found');
    return release;
  }

  async findByMember(memberId: number): Promise<ReleasedPet[]> {
    return this.releaseRepo.find({
      where: { member: { id: memberId } },
      relations: ['petType', 'tags'],
      order: { submittedAt: 'DESC' },
    });
  }

  async review(id: number, dto: ReviewReleaseDto): Promise<ReleasedPet> {
    const release = await this.findOne(id);
    const wasAccepted = release.status === 'accepted';

    release.status = dto.status;
    release.adminNotes = dto.adminNotes ?? null;
    release.reviewedAt = new Date();
    const saved = await this.releaseRepo.save(release);

    // On first transition into "accepted", promote the surrendered pet into
    // the main adoptable pool.
    if (dto.status === 'accepted' && !wasAccepted) {
      await this.promoteToPet(saved);
    }

    return saved;
  }

  /** Create an adoptable Pet from an accepted surrender (copies tags/photo). */
  private async promoteToPet(release: ReleasedPet): Promise<void> {
    const pet = this.petRepo.create({
      name: release.petName,
      type: release.petType ?? null,
      breed: release.breed,
      ageYears: release.ageYears,
      gender: release.gender,
      summaryDesc: release.summaryDesc,
      fullDesc: release.petDesc,
      isAvailable: true,
      tags: release.tags ?? [],
    });
    pet.photo = release.photo;
    await this.petRepo.save(pet);
  }
}

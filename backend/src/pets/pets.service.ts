import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Pet } from '../entities/pet.entity.js';
import { PetType } from '../entities/pet-type.entity.js';
import { Tag } from '../entities/tag.entity.js';
import type { CreatePetDto, UpdatePetDto, PetFilterQuery } from './pets.dto.js';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepo: Repository<Pet>,
    @InjectRepository(PetType)
    private readonly typeRepo: Repository<PetType>,
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
  ) {}

  async findAll(query: PetFilterQuery): Promise<Pet[]> {
    const qb = this.petRepo
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.type', 'type')
      .leftJoinAndSelect('pet.tags', 'tag');

    if (query.available !== undefined) {
      qb.andWhere('pet.isAvailable = :avail', { avail: query.available === 'true' });
    }

    if (query.typeId) {
      qb.andWhere('type.id = :typeId', { typeId: parseInt(query.typeId, 10) });
    }

    if (query.search) {
      qb.andWhere('pet.name LIKE :search', { search: `%${query.search}%` });
    }

    if (query.tagIds) {
      const ids = query.tagIds.split(',').map((s) => parseInt(s.trim(), 10));
      // sub-query: pets that have ALL requested tags
      qb.andWhere((sub) => {
        const sq = sub
          .subQuery()
          .select('pt.pet_id')
          .from('pet_tag', 'pt')
          .where('pt.tag_id IN (:...ids)', { ids })
          .groupBy('pt.pet_id')
          .having('COUNT(DISTINCT pt.tag_id) >= :cnt', { cnt: ids.length })
          .getQuery();
        return 'pet.id IN ' + sq;
      });
    }

    qb.orderBy('pet.createdAt', 'DESC');
    return qb.getMany();
  }

  async findOne(id: number): Promise<Pet> {
    const pet = await this.petRepo.findOne({
      where: { id },
      relations: ['type', 'tags'],
    });
    if (!pet) throw new NotFoundException('Pet not found');
    return pet;
  }

  async create(dto: CreatePetDto): Promise<Pet> {
    const pet = this.petRepo.create({
      name: dto.name,
      breed: dto.breed ?? null,
      ageYears: dto.ageYears ?? null,
      gender: dto.gender ?? 'unknown',
      summaryDesc: dto.summaryDesc ?? null,
      fullDesc: dto.fullDesc ?? null,
      photoUrl: dto.photoUrl ?? null,
    });

    if (dto.typeId) {
      const type = await this.typeRepo.findOne({ where: { id: dto.typeId } });
      pet.type = type ?? null;
    }

    if (dto.tagIds?.length) {
      pet.tags = await this.tagRepo.findBy({ id: In(dto.tagIds) });
    }

    return this.petRepo.save(pet);
  }

  async update(id: number, dto: UpdatePetDto): Promise<Pet> {
    const pet = await this.findOne(id);

    if (dto.name !== undefined) pet.name = dto.name;
    if (dto.breed !== undefined) pet.breed = dto.breed ?? null;
    if (dto.ageYears !== undefined) pet.ageYears = dto.ageYears ?? null;
    if (dto.gender !== undefined) pet.gender = dto.gender;
    if (dto.summaryDesc !== undefined) pet.summaryDesc = dto.summaryDesc ?? null;
    if (dto.fullDesc !== undefined) pet.fullDesc = dto.fullDesc ?? null;
    if (dto.photoUrl !== undefined) pet.photoUrl = dto.photoUrl ?? null;
    if (dto.isAvailable !== undefined) pet.isAvailable = dto.isAvailable;

    if (dto.typeId !== undefined) {
      const type = dto.typeId
        ? await this.typeRepo.findOne({ where: { id: dto.typeId } })
        : null;
      pet.type = type ?? null;
    }

    if (dto.tagIds !== undefined) {
      pet.tags = dto.tagIds.length
        ? await this.tagRepo.findBy({ id: In(dto.tagIds) })
        : [];
    }

    return this.petRepo.save(pet);
  }

  async remove(id: number): Promise<void> {
    const pet = await this.findOne(id);
    await this.petRepo.remove(pet);
  }

  // ── Types ──────────────────────────────────────────────────────────────────

  findAllTypes(): Promise<PetType[]> {
    return this.typeRepo.find({ order: { name: 'ASC' } });
  }

  // ── Tags ───────────────────────────────────────────────────────────────────

  findAllTags(): Promise<Tag[]> {
    return this.tagRepo.find({ order: { name: 'ASC' } });
  }
}

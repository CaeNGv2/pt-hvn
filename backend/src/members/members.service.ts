import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Member } from '../entities/member.entity.js';
import type { RegisterMemberDto } from './members.dto.js';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
  ) {}

  async register(dto: RegisterMemberDto): Promise<Omit<Member, 'passwordHash'>> {
    const existing = await this.memberRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already registered');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const member = this.memberRepo.create({
      fullName: dto.fullName,
      email: dto.email,
      passwordHash,
      phone: dto.phone ?? null,
      address: dto.address ?? null,
    });
    const saved = await this.memberRepo.save(member);
    return this.sanitize(saved);
  }

  async findAll(): Promise<Omit<Member, 'passwordHash'>[]> {
    const members = await this.memberRepo.find({ order: { joinedAt: 'DESC' } });
    return members.map((m) => this.sanitize(m));
  }

  async findOne(id: number): Promise<Omit<Member, 'passwordHash'>> {
    const member = await this.memberRepo.findOne({ where: { id } });
    if (!member) throw new NotFoundException('Member not found');
    return this.sanitize(member);
  }

  private sanitize(member: Member): Omit<Member, 'passwordHash'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...rest } = member;
    return rest as Omit<Member, 'passwordHash'>;
  }
}

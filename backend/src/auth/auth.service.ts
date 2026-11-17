import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Member } from '../entities/member.entity.js';
import { ADMIN_USERNAME, ADMIN_PASSWORD_HASH } from './admin.constants.js';
import type { MemberJwtPayload, AdminJwtPayload } from './jwt.payload.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
    private readonly jwtService: JwtService,
  ) {}

  async loginMember(email: string, password: string): Promise<{ accessToken: string }> {
    const member = await this.memberRepo.findOne({ where: { email, isActive: true } });
    if (!member) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, member.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const payload: MemberJwtPayload = { sub: member.id, email: member.email, role: 'member' };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async loginAdmin(username: string, password: string): Promise<{ accessToken: string }> {
    if (username !== ADMIN_USERNAME) throw new UnauthorizedException('Invalid asmcredentials');
    const valid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const payload: AdminJwtPayload = { sub: 'admin', role: 'admin' };
    return { accessToken: this.jwtService.sign(payload) };
  }
}

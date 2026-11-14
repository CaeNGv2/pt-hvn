import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { MembersService } from './members.service.js';
import { RegisterMemberDto } from './members.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { AdminAuthGuard } from '../auth/admin-auth.guard.js';
import { MemberAuthGuard } from '../auth/member-auth.guard.js';
import type { MemberJwtPayload } from '../auth/jwt.payload.js';
import type { Request as Req } from 'express';

interface AuthRequest extends Req {
  user: MemberJwtPayload;
}

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  /** POST /members/register  – public registration */
  @Post('register')
  @ApiOperation({ summary: 'Register as a member / supporter' })
  register(@Body() dto: RegisterMemberDto) {
    return this.membersService.register(dto);
  }

  /** GET /members/me  – authenticated member: own profile */
  @Get('me')
  @UseGuards(JwtAuthGuard, MemberAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get own member profile' })
  getMe(@Request() req: AuthRequest) {
    return this.membersService.findOne(req.user.sub);
  }

  /** GET /members  – admin only: list all members */
  @Get()
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] List all members' })
  findAll() {
    return this.membersService.findAll();
  }

  /** GET /members/:id  – admin only */
  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Get one member' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.membersService.findOne(id);
  }
}

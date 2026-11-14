import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AdoptionsService } from './adoptions.service.js';
import { CreateAdoptionDto, ReviewAdoptionDto } from './adoptions.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { AdminAuthGuard } from '../auth/admin-auth.guard.js';
import { MemberAuthGuard } from '../auth/member-auth.guard.js';
import type { MemberJwtPayload } from '../auth/jwt.payload.js';
import type { Request as Req } from 'express';

interface AuthRequest extends Req {
  user: MemberJwtPayload;
}

@ApiTags('adoptions')
@Controller('adoptions')
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService) {}

  /** POST /adoptions  – authenticated member: apply for adoption */
  @Post()
  @UseGuards(JwtAuthGuard, MemberAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit an adoption application (member only)' })
  create(@Request() req: AuthRequest, @Body() dto: CreateAdoptionDto) {
    return this.adoptionsService.create(req.user.sub, dto);
  }

  /** GET /adoptions/mine  – authenticated member: own applications */
  @Get('mine')
  @UseGuards(JwtAuthGuard, MemberAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get own adoption applications' })
  findMine(@Request() req: AuthRequest) {
    return this.adoptionsService.findByMember(req.user.sub);
  }

  /** GET /adoptions?status=pending  – admin only */
  @Get()
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] List all adoption applications' })
  @ApiQuery({ name: 'status', required: false, enum: ['pending', 'approved', 'rejected'] })
  findAll(@Query('status') status?: string) {
    return this.adoptionsService.findAll(status);
  }

  /** GET /adoptions/:id  – admin only */
  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Get one adoption application' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adoptionsService.findOne(id);
  }

  /** PATCH /adoptions/:id/review  – admin only */
  @Patch(':id/review')
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Review an adoption application' })
  review(@Param('id', ParseIntPipe) id: number, @Body() dto: ReviewAdoptionDto) {
    return this.adoptionsService.review(id, dto);
  }
}

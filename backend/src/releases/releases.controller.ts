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
import { ReleasesService } from './releases.service.js';
import { SubmitReleaseDto, ReviewReleaseDto } from './releases.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { AdminAuthGuard } from '../auth/admin-auth.guard.js';
import { MemberAuthGuard } from '../auth/member-auth.guard.js';
import type { MemberJwtPayload } from '../auth/jwt.payload.js';
import type { Request as Req } from 'express';

interface AuthRequest extends Req {
  user: MemberJwtPayload;
}

@ApiTags('releases')
@Controller('releases')
export class ReleasesController {
  constructor(private readonly releasesService: ReleasesService) {}

  /** POST /releases  – authenticated member: submit surrender form */
  @Post()
  @UseGuards(JwtAuthGuard, MemberAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit a pet surrender form (member only)' })
  submit(@Request() req: AuthRequest, @Body() dto: SubmitReleaseDto) {
    return this.releasesService.submit(req.user.sub, dto);
  }

  /** GET /releases/mine  – authenticated member: own releases */
  @Get('mine')
  @UseGuards(JwtAuthGuard, MemberAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get own surrender submissions' })
  findMine(@Request() req: AuthRequest) {
    return this.releasesService.findByMember(req.user.sub);
  }

  /** GET /releases?status=pending  – admin only */
  @Get()
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] List all surrender requests' })
  @ApiQuery({ name: 'status', required: false, enum: ['pending', 'accepted', 'rejected'] })
  findAll(@Query('status') status?: string) {
    return this.releasesService.findAll(status);
  }

  /** GET /releases/:id  – admin only */
  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Get one surrender request' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.releasesService.findOne(id);
  }

  /** PATCH /releases/:id/review  – admin only */
  @Patch(':id/review')
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Review a surrender request' })
  review(@Param('id', ParseIntPipe) id: number, @Body() dto: ReviewReleaseDto) {
    return this.releasesService.review(id, dto);
  }
}

import { Controller, Post, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SeedService } from './seed.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { AdminAuthGuard } from '../auth/admin-auth.guard.js';

@ApiTags('admin')
@Controller('admin')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  /** POST /admin/reset-database – admin only: wipe & re-seed demo data. */
  @Post('reset-database')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '[Admin] [DEMO] Force-reset the database back to seeded demo data',
  })
  async reset(): Promise<{ status: string }> {
    await this.seedService.resetToSeed();
    return { status: 'ok' };
  }
}

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PetsService } from './pets.service.js';
import { CreatePetDto, UpdatePetDto, PetFilterQuery } from './pets.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { AdminAuthGuard } from '../auth/admin-auth.guard.js';

@ApiTags('pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  /** GET /pets?typeId=&tagIds=1,2&search=&available=true */
  @Get()
  @ApiOperation({ summary: 'List pets (filterable by type, tags, name search)' })
  @ApiQuery({ name: 'typeId', required: false })
  @ApiQuery({ name: 'tagIds', required: false, description: 'Comma-separated tag IDs' })
  @ApiQuery({ name: 'search', required: false, description: 'Name substring search' })
  @ApiQuery({ name: 'available', required: false, enum: ['true', 'false'] })
  findAll(@Query() query: PetFilterQuery) {
    return this.petsService.findAll(query);
  }

  /** GET /pets/types */
  @Get('types')
  @ApiOperation({ summary: 'List all pet types' })
  findAllTypes() {
    return this.petsService.findAllTypes();
  }

  /** GET /pets/tags */
  @Get('tags')
  @ApiOperation({ summary: 'List all tags' })
  findAllTags() {
    return this.petsService.findAllTags();
  }

  /** GET /pets/:id */
  @Get(':id')
  @ApiOperation({ summary: 'Get one pet by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.petsService.findOne(id);
  }

  /** POST /pets  – admin only */
  @Post()
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Add a pet' })
  create(@Body() dto: CreatePetDto) {
    return this.petsService.create(dto);
  }

  /** PATCH /pets/:id  – admin only */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Update a pet' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePetDto) {
    return this.petsService.update(id, dto);
  }

  /** DELETE /pets/:id  – admin only */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Delete a pet' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.petsService.remove(id);
  }
}

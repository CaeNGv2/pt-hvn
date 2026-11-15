import { IsString, IsOptional, IsInt, IsIn, Min, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { ApplicationStatus } from '../entities/adoption-application.entity.js';

const APPLICATION_STATUSES: ApplicationStatus[] = ['pending', 'approved', 'rejected'];

export class CreateAdoptionDto {
  @ApiProperty({ description: 'Pet id to apply for' })
  @IsInt()
  @Min(1)
  petId!: number;

  @ApiPropertyOptional({ maxLength: 256 })
  @IsOptional()
  @IsString()
  @MaxLength(256)
  livingSituation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  experienceDesc?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  message?: string;
}

export class ReviewAdoptionDto {
  @ApiProperty({ enum: APPLICATION_STATUSES })
  @IsIn(APPLICATION_STATUSES)
  status!: ApplicationStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  adminNotes?: string;
}

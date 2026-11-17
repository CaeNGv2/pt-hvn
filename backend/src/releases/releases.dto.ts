import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsNumber,
  IsIn,
  IsArray,
  Min,
  Max,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { PetGender, ReleaseStatus } from '../entities/released-pet.entity.js';
import { PhotoRefDto } from '../shared/photo-ref.dto.js';
import type { PhotoRef } from '../shared/photo-ref.js';

const GENDERS: PetGender[] = ['male', 'female', 'unknown'];
const RELEASE_STATUSES: ReleaseStatus[] = ['pending', 'accepted', 'rejected'];

/** Submitted by an authenticated member. Owner identity comes from their account. */
export class SubmitReleaseDto {
  @ApiProperty({ example: 'Buddy' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  petName!: string;

  @ApiPropertyOptional({ description: 'Pet type id' })
  @IsOptional()
  @IsInt()
  petTypeId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(128)
  breed?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(999)
  ageYears?: number;

  @ApiPropertyOptional({ enum: GENDERS })
  @IsOptional()
  @IsIn(GENDERS)
  gender?: PetGender;

  @ApiPropertyOptional({ type: PhotoRefDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => PhotoRefDto)
  photo?: PhotoRef;

  @ApiPropertyOptional({ maxLength: 128, description: 'Short summary (max 128 chars)' })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  summaryDesc?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  petDesc?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reasonDesc?: string;

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tagIds?: number[];
}

export class ReviewReleaseDto {
  @ApiProperty({ enum: RELEASE_STATUSES })
  @IsIn(RELEASE_STATUSES)
  status!: ReleaseStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  adminNotes?: string;
}

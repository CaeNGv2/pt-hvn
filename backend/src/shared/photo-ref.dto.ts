import { IsIn, IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { PhotoRefType } from './photo-ref.js';

/**
 * Validated request shape for a photo reference.
 * Mirrors the plain `PhotoRef` union but is a concrete class so it can be
 * validated with class-validator and nested via @ValidateNested().
 */
export class PhotoRefDto {
  @ApiProperty({ enum: ['api', 'external', 'site'] })
  @IsIn(['api', 'external', 'site'])
  type!: PhotoRefType;

  @ApiProperty({
    description:
      'For "api": the upload image id. For "external": full URL. For "site": /public relative path.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(512)
  uri!: string;
}

import type { PetGender } from '../entities/pet.entity.js';

export class CreatePetDto {
  name: string = '';
  typeId?: number;
  breed?: string;
  ageYears?: number;
  gender?: PetGender;
  summaryDesc?: string;
  fullDesc?: string;
  photoUrl?: string;
  tagIds?: number[];
}

export class UpdatePetDto {
  name?: string;
  typeId?: number;
  breed?: string;
  ageYears?: number;
  gender?: PetGender;
  summaryDesc?: string;
  fullDesc?: string;
  photoUrl?: string;
  isAvailable?: boolean;
  tagIds?: number[];
}

export class PetFilterQuery {
  typeId?: string;
  tagIds?: string;   // comma-separated tag ids
  search?: string;   // name search
  available?: string; // 'true' | 'false' | undefined = all
}

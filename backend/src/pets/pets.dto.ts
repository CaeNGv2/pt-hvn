import type { PetGender } from '../entities/pet.entity.js';
import type { PhotoRef } from '../shared/photo-ref.js';

export type { PhotoRef };

export class CreatePetDto {
  name: string = '';
  typeId?: number;
  breed?: string;
  ageYears?: number;
  gender?: PetGender;
  summaryDesc?: string;
  fullDesc?: string;
  /**
   * Photo reference. Send as a JSON object:
   * - `{ type: "api", uri: "<imageId>" }`         – uploaded via /upload/image
   * - `{ type: "external", uri: "https://…" }`    – remote URL
   * - `{ type: "site", uri: "pets/dog.jpg" }`     – /public relative path
   */
  photo?: PhotoRef;
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
  photo?: PhotoRef;
  isAvailable?: boolean;
  tagIds?: number[];
}

export class PetFilterQuery {
  typeId?: string;
  tagIds?: string;    // comma-separated tag ids
  search?: string;    // name substring search
  available?: string; // 'true' | 'false' | undefined = all
}

import type { PetTypeModel } from './pet-type.model.js';
import type { TagModel } from './tag.model.js';

export type PetGender = 'male' | 'female' | 'unknown';

export class PetModel {
  id: number;
  name: string;
  type: PetTypeModel | null;
  breed: string | null;
  ageYears: number | null;
  gender: PetGender;
  summaryDesc: string | null;
  fullDesc: string | null;
  photoUrl: string | null;
  isAvailable: boolean;
  tags: TagModel[];
  createdAt: string;

  constructor(data: Partial<PetModel> = {}) {
    this.id = data.id ?? 0;
    this.name = data.name ?? '';
    this.type = data.type ?? null;
    this.breed = data.breed ?? null;
    this.ageYears = data.ageYears ?? null;
    this.gender = data.gender ?? 'unknown';
    this.summaryDesc = data.summaryDesc ?? null;
    this.fullDesc = data.fullDesc ?? null;
    this.photoUrl = data.photoUrl ?? null;
    this.isAvailable = data.isAvailable ?? true;
    this.tags = data.tags ?? [];
    this.createdAt = data.createdAt ?? new Date().toISOString();
  }

  /** Convenience: returns tag names as a simple string array */
  get tagNames(): string[] {
    return this.tags.map((t) => t.name);
  }

  static fromJson(json: Record<string, unknown>): PetModel {
    return new PetModel({
      id: json['id'] as number,
      name: json['name'] as string,
      type: json['type'] as PetTypeModel | null,
      breed: json['breed'] as string | null,
      ageYears: json['ageYears'] as number | null,
      gender: json['gender'] as PetGender,
      summaryDesc: json['summaryDesc'] as string | null,
      fullDesc: json['fullDesc'] as string | null,
      photoUrl: json['photoUrl'] as string | null,
      isAvailable: json['isAvailable'] as boolean,
      tags: (json['tags'] as TagModel[]) ?? [],
      createdAt: json['createdAt'] as string,
    });
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      breed: this.breed,
      ageYears: this.ageYears,
      gender: this.gender,
      summaryDesc: this.summaryDesc,
      fullDesc: this.fullDesc,
      photoUrl: this.photoUrl,
      isAvailable: this.isAvailable,
      tags: this.tags,
      createdAt: this.createdAt,
    };
  }
}

import type { PetTypeModel } from './pet-type.model.js';
import type { MemberModel } from './member.model.js';

export type ReleaseStatus = 'pending' | 'accepted' | 'rejected';
export type PetGender = 'male' | 'female' | 'unknown';

export class ReleasedPetModel {
  id: number;
  member: MemberModel | null;
  petName: string;
  petType: PetTypeModel | null;
  breed: string | null;
  ageYears: number | null;
  gender: PetGender;
  photoUrl: string | null;
  summaryDesc: string | null;
  petDesc: string | null;
  reasonDesc: string | null;
  status: ReleaseStatus;
  submittedAt: string;
  reviewedAt: string | null;
  adminNotes: string | null;

  constructor(data: Partial<ReleasedPetModel> = {}) {
    this.id = data.id ?? 0;
    this.member = data.member ?? null;
    this.petName = data.petName ?? '';
    this.petType = data.petType ?? null;
    this.breed = data.breed ?? null;
    this.ageYears = data.ageYears ?? null;
    this.gender = data.gender ?? 'unknown';
    this.photoUrl = data.photoUrl ?? null;
    this.summaryDesc = data.summaryDesc ?? null;
    this.petDesc = data.petDesc ?? null;
    this.reasonDesc = data.reasonDesc ?? null;
    this.status = data.status ?? 'pending';
    this.submittedAt = data.submittedAt ?? new Date().toISOString();
    this.reviewedAt = data.reviewedAt ?? null;
    this.adminNotes = data.adminNotes ?? null;
  }

  get isPending(): boolean {
    return this.status === 'pending';
  }

  static fromJson(json: Record<string, unknown>): ReleasedPetModel {
    return new ReleasedPetModel({
      id: json['id'] as number,
      member: json['member'] as MemberModel | null,
      petName: json['petName'] as string,
      petType: json['petType'] as PetTypeModel | null,
      breed: json['breed'] as string | null,
      ageYears: json['ageYears'] as number | null,
      gender: json['gender'] as PetGender,
      photoUrl: json['photoUrl'] as string | null,
      summaryDesc: json['summaryDesc'] as string | null,
      petDesc: json['petDesc'] as string | null,
      reasonDesc: json['reasonDesc'] as string | null,
      status: json['status'] as ReleaseStatus,
      submittedAt: json['submittedAt'] as string,
      reviewedAt: json['reviewedAt'] as string | null,
      adminNotes: json['adminNotes'] as string | null,
    });
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      member: this.member,
      petName: this.petName,
      petType: this.petType,
      breed: this.breed,
      ageYears: this.ageYears,
      gender: this.gender,
      photoUrl: this.photoUrl,
      summaryDesc: this.summaryDesc,
      petDesc: this.petDesc,
      reasonDesc: this.reasonDesc,
      status: this.status,
      submittedAt: this.submittedAt,
      reviewedAt: this.reviewedAt,
      adminNotes: this.adminNotes,
    };
  }
}

import type { MemberModel } from './member.model.js';
import type { PetModel } from './pet.model.js';

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export class AdoptionApplicationModel {
  id: number;
  member: MemberModel | null;
  pet: PetModel | null;
  livingSituation: string | null;
  experienceDesc: string | null;
  message: string | null;
  status: ApplicationStatus;
  submittedAt: string;
  reviewedAt: string | null;
  adminNotes: string | null;

  constructor(data: Partial<AdoptionApplicationModel> = {}) {
    this.id = data.id ?? 0;
    this.member = data.member ?? null;
    this.pet = data.pet ?? null;
    this.livingSituation = data.livingSituation ?? null;
    this.experienceDesc = data.experienceDesc ?? null;
    this.message = data.message ?? null;
    this.status = data.status ?? 'pending';
    this.submittedAt = data.submittedAt ?? new Date().toISOString();
    this.reviewedAt = data.reviewedAt ?? null;
    this.adminNotes = data.adminNotes ?? null;
  }

  get isPending(): boolean {
    return this.status === 'pending';
  }

  static fromJson(json: Record<string, unknown>): AdoptionApplicationModel {
    return new AdoptionApplicationModel({
      id: json['id'] as number,
      member: json['member'] as MemberModel | null,
      pet: json['pet'] as PetModel | null,
      livingSituation: json['livingSituation'] as string | null,
      experienceDesc: json['experienceDesc'] as string | null,
      message: json['message'] as string | null,
      status: json['status'] as ApplicationStatus,
      submittedAt: json['submittedAt'] as string,
      reviewedAt: json['reviewedAt'] as string | null,
      adminNotes: json['adminNotes'] as string | null,
    });
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      member: this.member,
      pet: this.pet,
      livingSituation: this.livingSituation,
      experienceDesc: this.experienceDesc,
      message: this.message,
      status: this.status,
      submittedAt: this.submittedAt,
      reviewedAt: this.reviewedAt,
      adminNotes: this.adminNotes,
    };
  }
}

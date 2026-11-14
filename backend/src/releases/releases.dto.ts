import type { PetGender, ReleaseStatus } from '../entities/released-pet.entity.js';

/** Submitted by an authenticated member. ownerName/email is derived from their account. */
export class SubmitReleaseDto {
  petName: string = '';
  petTypeId?: number;
  breed?: string;
  ageYears?: number;
  gender?: PetGender;
  photoUrl?: string;
  summaryDesc?: string;
  petDesc?: string;
  reasonDesc?: string;
}

export class ReviewReleaseDto {
  status: ReleaseStatus = 'pending';
  adminNotes?: string;
}

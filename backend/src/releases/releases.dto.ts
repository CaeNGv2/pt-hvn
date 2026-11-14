import type { PetGender, ReleaseStatus } from '../entities/released-pet.entity.js';
import type { PhotoRef } from '../shared/photo-ref.js';

/** Submitted by an authenticated member. ownerName/email is derived from their account. */
export class SubmitReleaseDto {
  petName: string = '';
  petTypeId?: number;
  breed?: string;
  ageYears?: number;
  gender?: PetGender;
  /**
   * Optional photo. Same PhotoRef union as pets:
   * `{ type: "api"|"external"|"site", uri: "…" }`
   */
  photo?: PhotoRef;
  summaryDesc?: string;
  petDesc?: string;
  reasonDesc?: string;
}

export class ReviewReleaseDto {
  status: ReleaseStatus = 'pending';
  adminNotes?: string;
}

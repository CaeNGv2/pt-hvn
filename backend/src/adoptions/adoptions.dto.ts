import type { ApplicationStatus } from '../entities/adoption-application.entity.js';

export class CreateAdoptionDto {
  petId: number = 0;
  livingSituation?: string;
  experienceDesc?: string;
  message?: string;
}

export class ReviewAdoptionDto {
  status: ApplicationStatus = 'pending';
  adminNotes?: string;
}

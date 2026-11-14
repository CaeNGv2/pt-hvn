import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { PetType } from './pet-type.entity.js';
import { Member } from './member.entity.js';
import { parsePhotoRef, serialisePhotoRef } from '../shared/photo-ref.js';
import type { PhotoRef } from '../shared/photo-ref.js';

export type ReleaseStatus = 'pending' | 'accepted' | 'rejected';
export type PetGender = 'male' | 'female' | 'unknown';

@Entity('released_pet')
export class ReleasedPet {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 128, name: 'pet_name' })
  petName: string;

  @ManyToOne(() => PetType, (pt) => pt.releasedPets, { nullable: true, eager: true })
  @JoinColumn({ name: 'pet_type_id' })
  petType?: PetType;

  @ManyToOne(() => Member, { nullable: false, eager: true })
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @Column({ length: 128, nullable: true })
  breed?: string;

  @Column({ type: 'decimal', precision: 4, scale: 1, nullable: true, name: 'age_years' })
  ageYears?: number;

  @Column({
    type: 'enum',
    enum: ['male', 'female', 'unknown'],
    default: 'unknown',
  })
  gender: PetGender;

  @Column({ type: 'text', nullable: true, name: 'photo_ref' })
  photoRef?: string;

  get photo(): PhotoRef | null {
    return parsePhotoRef(this.photoRef);
  }

  set photo(ref: PhotoRef | null) {
    this.photoRef = ref ? serialisePhotoRef(ref) : undefined;
  }

  @Column({ length: 128, nullable: true, name: 'summary_desc' })
  summaryDesc?: string;

  @Column({ type: 'text', nullable: true, name: 'pet_desc' })
  petDesc?: string;

  @Column({ type: 'text', nullable: true, name: 'reason_desc' })
  reasonDesc?: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  })
  status: ReleaseStatus;

  @CreateDateColumn({ name: 'submitted_at' })
  submittedAt: Date;

  @Column({ type: 'datetime', nullable: true, name: 'reviewed_at' })
  reviewedAt?: Date;

  @Column({ type: 'text', nullable: true, name: 'admin_notes' })
  adminNotes?: string;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Member } from './member.entity.js';
import { Pet } from './pet.entity.js';

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

@Entity('adoption_application')
export class AdoptionApplication {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ManyToOne(() => Member, { eager: true })
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @ManyToOne(() => Pet, { eager: true })
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @Column({ length: 256, nullable: true, name: 'living_situation' })
  livingSituation?: string;

  @Column({ type: 'text', nullable: true, name: 'experience_desc' })
  experienceDesc?: string;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status: ApplicationStatus;

  @CreateDateColumn({ name: 'submitted_at' })
  submittedAt: Date;

  @Column({ type: 'datetime', nullable: true, name: 'reviewed_at' })
  reviewedAt?: Date;

  @Column({ type: 'text', nullable: true, name: 'admin_notes' })
  adminNotes?: string;
}

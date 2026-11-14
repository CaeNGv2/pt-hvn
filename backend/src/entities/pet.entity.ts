import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { PetType } from './pet-type.entity.js';
import { Tag } from './tag.entity.js';
import type { AdoptionApplication } from './adoption-application.entity.js';

export type PetGender = 'male' | 'female' | 'unknown';

@Entity('pet')
export class Pet {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 128 })
  name: string;

  @ManyToOne(() => PetType, (pt) => pt.pets, { nullable: true, eager: false })
  @JoinColumn({ name: 'type_id' })
  type: PetType | null;

  @Column({ length: 128, nullable: true })
  breed: string | null;

  @Column({ type: 'decimal', precision: 4, scale: 1, nullable: true, name: 'age_years' })
  ageYears: number | null;

  @Column({
    type: 'enum',
    enum: ['male', 'female', 'unknown'],
    default: 'unknown',
  })
  gender: PetGender;

  @Column({ length: 128, nullable: true, name: 'summary_desc' })
  summaryDesc: string | null;

  @Column({ type: 'text', nullable: true, name: 'full_desc' })
  fullDesc: string | null;

  @Column({ length: 512, nullable: true, name: 'photo_url' })
  photoUrl: string | null;

  @Column({ default: true, name: 'is_available' })
  isAvailable: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToMany(() => Tag, (tag) => tag.pets, { eager: true, cascade: true })
  @JoinTable({
    name: 'pet_tag',
    joinColumn: { name: 'pet_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];

  @OneToMany('AdoptionApplication', (app: AdoptionApplication) => app.pet)
  adoptionApplications: AdoptionApplication[];
}

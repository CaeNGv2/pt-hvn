import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { PetType } from './pet-type.entity.js';
import { Tag } from './tag.entity.js';
import { parsePhotoRef, serialisePhotoRef } from '../shared/photo-ref.js';
import type { PhotoRef } from '../shared/photo-ref.js';

export type PetGender = 'male' | 'female' | 'unknown';

@Entity('pet')
export class Pet {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 128 })
  name: string;

  @ManyToOne(() => PetType, { nullable: true, eager: false })
  @JoinColumn({ name: 'type_id' })
  type: PetType | null;

  @Column({ type: 'varchar', length: 128, nullable: true })
  breed: string | null;

  @Column({ type: 'decimal', precision: 4, scale: 1, nullable: true, name: 'age_years' })
  ageYears: number | null;

  @Column({
    type: 'enum',
    enum: ['male', 'female', 'unknown'],
    default: 'unknown',
  })
  gender: PetGender;

  @Column({ type: 'varchar', length: 128, nullable: true, name: 'summary_desc' })
  summaryDesc: string | null;

  @Column({ type: 'text', nullable: true, name: 'full_desc' })
  fullDesc: string | null;

  /**
   * Stored as a JSON string: `{"type":"api"|"external"|"site","uri":"…"}`.
   * Use the `photo` getter/setter for typed access.
   */
  @Column({ type: 'text', nullable: true, name: 'photo_ref' })
  photoRef: string | null;

  get photo(): PhotoRef | null {
    return parsePhotoRef(this.photoRef);
  }

  set photo(ref: PhotoRef | null) {
    this.photoRef = ref ? serialisePhotoRef(ref) : null;
  }

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
}

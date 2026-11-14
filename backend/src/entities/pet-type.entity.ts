import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import type { Pet } from './pet.entity.js';
import type { ReleasedPet } from './released-pet.entity.js';

@Entity('pet_type')
export class PetType {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 64, unique: true })
  name: string;

  @OneToMany('Pet', (pet: Pet) => pet.type)
  pets: Pet[];

  @OneToMany('ReleasedPet', (rp: ReleasedPet) => rp.petType)
  releasedPets: ReleasedPet[];
}

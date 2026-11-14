import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import type { Pet } from './pet.entity.js';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 64, unique: true })
  name: string;

  @ManyToMany('Pet', (pet: Pet) => pet.tags)
  pets: Pet[];
}

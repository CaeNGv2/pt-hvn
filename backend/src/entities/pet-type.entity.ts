import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('pet_type')
export class PetType {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 64, unique: true })
  name: string;
}

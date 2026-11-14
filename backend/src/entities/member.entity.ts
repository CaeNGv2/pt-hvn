import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('member')
export class Member {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 128, name: 'full_name' })
  fullName: string;

  @Column({ length: 256, unique: true })
  email: string;

  @Column({ length: 256, name: 'password_hash' })
  passwordHash: string;

  @Column({ length: 32, nullable: true })
  phone?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;
}

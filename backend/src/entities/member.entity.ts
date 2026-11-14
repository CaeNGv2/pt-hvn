import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
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

  @Column({ type: 'varchar', length: 32, nullable: true })
  phone: string | null;

  @Column({ type: 'text', nullable: true })
  address: string | null;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;
}

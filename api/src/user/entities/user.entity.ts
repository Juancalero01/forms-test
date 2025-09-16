import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from 'src/role/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  @ManyToOne(() => Role, (role) => role.rolePermissions, { nullable: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}

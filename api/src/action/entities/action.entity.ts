import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Permission } from 'src/permission/entities/permission.entity';

@Entity('actions')
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  groupName: string;

  @OneToMany(() => Permission, (p) => p.action)
  permissions: Permission[];
}

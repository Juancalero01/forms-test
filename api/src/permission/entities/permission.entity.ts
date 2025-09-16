import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Action } from 'src/action/entities/action.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { RolePermission } from 'src/role-permission/entities/role-permission.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Action, (a) => a.permissions)
  @JoinColumn({ name: 'action_id' })
  action: Action;

  @ManyToOne(() => Subject, (s) => s.permissions)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @OneToMany(() => RolePermission, (rp) => rp.permission)
  rolePermissions: RolePermission[];
}

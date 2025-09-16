import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { FormField } from 'src/form-field/entities/form-field.entity';
import { Action } from 'src/action/entities/action.entity';

@Entity('field_permissions')
export class FieldPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => FormField, (field) => field.fieldPermissions)
  @JoinColumn({ name: 'form_field_id' })
  formField: FormField;

  @ManyToOne(() => Action)
  @JoinColumn({ name: 'action_id' })
  action: Action;

  @Column({ default: true })
  isAllowed: boolean;
}

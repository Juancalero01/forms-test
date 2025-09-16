import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { FormField } from 'src/form-field/entities/form-field.entity';

@Entity('field_data_permissions')
export class FieldDataPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => FormField, (field) => field.dataPermissions)
  @JoinColumn({ name: 'form_field_id' })
  formField: FormField;

  @Column()
  allowedValue: string;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Form } from 'src/form/entities/form.entity';
import { FieldPermission } from 'src/field-permission/entities/field-permission.entity';
import { FieldDataPermission } from 'src/field-data-permission/entities/field-data-permission.entity';

@Entity('form_fields')
export class FormField {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Form, (form) => form.fields)
  @JoinColumn({ name: 'form_id' })
  form: Form;

  @Column()
  name: string;

  @Column({ nullable: true })
  label: string;

  @Column()
  type: string;

  @Column({ type: 'text', nullable: true })
  optionsJson: string;

  @Column({ default: false })
  isRequired: boolean;

  @Column({ nullable: true })
  orderIndex: number;

  @OneToMany(() => FieldPermission, (fp) => fp.formField)
  fieldPermissions: FieldPermission[];

  @OneToMany(() => FieldDataPermission, (fdp) => fdp.formField)
  dataPermissions: FieldDataPermission[];
}

import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FormGroup } from 'src/form-group/entities/form-group.entity';
import { Form } from 'src/form/entities/form.entity';

@Entity('form_group_membership')
export class FormGroupMembership {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FormGroup, (group) => group.memberships)
  @JoinColumn({ name: 'form_group_id' })
  formGroup: FormGroup;

  @ManyToOne(() => Form)
  @JoinColumn({ name: 'form_id' })
  form: Form;
}

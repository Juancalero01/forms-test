import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FormGroupMembership } from 'src/form-group-membership/entities/form-group-membership.entity';

@Entity('form_groups')
export class FormGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => FormGroupMembership, (membership) => membership.formGroup)
  memberships: FormGroupMembership[];
}

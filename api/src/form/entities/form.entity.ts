import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Subject } from 'src/subject/entities/subject.entity';
import { FormField } from 'src/form-field/entities/form-field.entity';

@Entity('forms')
export class Form {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Subject)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @OneToMany(() => FormField, (field) => field.form)
  fields: FormField[];
}

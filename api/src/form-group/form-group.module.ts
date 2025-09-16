import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormGroupService } from './form-group.service';
import { FormGroupController } from './form-group.controller';
import { FormGroup } from './entities/form-group.entity';
import { FormField } from 'src/form-field/entities/form-field.entity';
import { Role } from 'src/role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormGroup, FormField, Role])],
  controllers: [FormGroupController],
  providers: [FormGroupService],
})
export class FormGroupModule {}

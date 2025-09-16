import { PartialType } from '@nestjs/mapped-types';
import { CreateFormGroupDto } from './create-form-group.dto';

export class UpdateFormGroupDto extends PartialType(CreateFormGroupDto) {}

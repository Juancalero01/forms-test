import { PartialType } from '@nestjs/mapped-types';
import { CreateFieldPermissionDto } from './create-field-permission.dto';

export class UpdateFieldPermissionDto extends PartialType(CreateFieldPermissionDto) {}

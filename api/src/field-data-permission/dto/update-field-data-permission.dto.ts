import { PartialType } from '@nestjs/mapped-types';
import { CreateFieldDataPermissionDto } from './create-field-data-permission.dto';

export class UpdateFieldDataPermissionDto extends PartialType(
  CreateFieldDataPermissionDto,
) {}

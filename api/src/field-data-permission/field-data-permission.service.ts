import { Injectable } from '@nestjs/common';
import { CreateFieldDataPermissionDto } from './dto/create-field-data-permission.dto';
import { UpdateFieldDataPermissionDto } from './dto/update-field-data-permission.dto';

@Injectable()
export class FieldDataPermissionService {
  create(createFieldDataPermissionDto: CreateFieldDataPermissionDto) {
    return 'This action adds a new fieldDataPermission';
  }

  findAll() {
    return `This action returns all fieldDataPermission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fieldDataPermission`;
  }

  update(
    id: number,
    updateFieldDataPermissionDto: UpdateFieldDataPermissionDto,
  ) {
    return `This action updates a #${id} fieldDataPermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} fieldDataPermission`;
  }
}

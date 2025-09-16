import { Injectable } from '@nestjs/common';
import { CreateFieldPermissionDto } from './dto/create-field-permission.dto';
import { UpdateFieldPermissionDto } from './dto/update-field-permission.dto';

@Injectable()
export class FieldPermissionService {
  create(createFieldPermissionDto: CreateFieldPermissionDto) {
    return 'This action adds a new fieldPermission';
  }

  findAll() {
    return `This action returns all fieldPermission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fieldPermission`;
  }

  update(id: number, updateFieldPermissionDto: UpdateFieldPermissionDto) {
    return `This action updates a #${id} fieldPermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} fieldPermission`;
  }
}

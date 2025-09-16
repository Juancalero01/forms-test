import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FieldPermissionService } from './field-permission.service';
import { CreateFieldPermissionDto } from './dto/create-field-permission.dto';
import { UpdateFieldPermissionDto } from './dto/update-field-permission.dto';

@Controller('field-permission')
export class FieldPermissionController {
  constructor(private readonly fieldPermissionService: FieldPermissionService) {}

  @Post()
  create(@Body() createFieldPermissionDto: CreateFieldPermissionDto) {
    return this.fieldPermissionService.create(createFieldPermissionDto);
  }

  @Get()
  findAll() {
    return this.fieldPermissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldPermissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFieldPermissionDto: UpdateFieldPermissionDto) {
    return this.fieldPermissionService.update(+id, updateFieldPermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldPermissionService.remove(+id);
  }
}

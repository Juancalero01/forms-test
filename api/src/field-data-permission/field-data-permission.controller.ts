import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FieldDataPermissionService } from './field-data-permission.service';
import { CreateFieldDataPermissionDto } from './dto/create-field-data-permission.dto';
import { UpdateFieldDataPermissionDto } from './dto/update-field-data-permission.dto';

@Controller('field-data-permission')
export class FieldDataPermissionController {
  constructor(
    private readonly fieldDataPermissionService: FieldDataPermissionService,
  ) {}

  @Post()
  create(@Body() createFieldDataPermissionDto: CreateFieldDataPermissionDto) {
    return this.fieldDataPermissionService.create(createFieldDataPermissionDto);
  }

  @Get()
  findAll() {
    return this.fieldDataPermissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldDataPermissionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFieldDataPermissionDto: UpdateFieldDataPermissionDto,
  ) {
    return this.fieldDataPermissionService.update(
      +id,
      updateFieldDataPermissionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldDataPermissionService.remove(+id);
  }
}

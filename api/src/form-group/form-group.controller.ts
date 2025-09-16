import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { FormGroupService } from './form-group.service';
import { CreateFormGroupDto } from './dto/create-form-group.dto';
import { UpdateFormGroupDto } from './dto/update-form-group.dto';

@Controller('form-group')
export class FormGroupController {
  constructor(private readonly formGroupService: FormGroupService) {}

  @Post()
  create(@Body() createFormGroupDto: CreateFormGroupDto) {
    return this.formGroupService.create(createFormGroupDto);
  }

  @Get()
  findAll() {
    return this.formGroupService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) groupId: number,
    @Query('role') roleName: string,
  ) {
    return this.formGroupService.getGroupStructure(groupId, roleName);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormGroupDto: UpdateFormGroupDto,
  ) {
    return this.formGroupService.update(+id, updateFormGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formGroupService.remove(+id);
  }
}

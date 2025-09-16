import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormGroupMembershipService } from './form-group-membership.service';
import { CreateFormGroupMembershipDto } from './dto/create-form-group-membership.dto';
import { UpdateFormGroupMembershipDto } from './dto/update-form-group-membership.dto';

@Controller('form-group-membership')
export class FormGroupMembershipController {
  constructor(private readonly formGroupMembershipService: FormGroupMembershipService) {}

  @Post()
  create(@Body() createFormGroupMembershipDto: CreateFormGroupMembershipDto) {
    return this.formGroupMembershipService.create(createFormGroupMembershipDto);
  }

  @Get()
  findAll() {
    return this.formGroupMembershipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formGroupMembershipService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormGroupMembershipDto: UpdateFormGroupMembershipDto) {
    return this.formGroupMembershipService.update(+id, updateFormGroupMembershipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formGroupMembershipService.remove(+id);
  }
}

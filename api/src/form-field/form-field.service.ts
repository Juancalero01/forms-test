import { Injectable } from '@nestjs/common';
import { CreateFormFieldDto } from './dto/create-form-field.dto';
import { UpdateFormFieldDto } from './dto/update-form-field.dto';

@Injectable()
export class FormFieldService {
  create(createFormFieldDto: CreateFormFieldDto) {
    return 'This action adds a new formField';
  }

  findAll() {
    return `This action returns all formField`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formField`;
  }

  update(id: number, updateFormFieldDto: UpdateFormFieldDto) {
    return `This action updates a #${id} formField`;
  }

  remove(id: number) {
    return `This action removes a #${id} formField`;
  }
}

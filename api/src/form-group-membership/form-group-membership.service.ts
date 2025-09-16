import { Injectable } from '@nestjs/common';
import { CreateFormGroupMembershipDto } from './dto/create-form-group-membership.dto';
import { UpdateFormGroupMembershipDto } from './dto/update-form-group-membership.dto';

@Injectable()
export class FormGroupMembershipService {
  create(createFormGroupMembershipDto: CreateFormGroupMembershipDto) {
    return 'This action adds a new formGroupMembership';
  }

  findAll() {
    return `This action returns all formGroupMembership`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formGroupMembership`;
  }

  update(id: number, updateFormGroupMembershipDto: UpdateFormGroupMembershipDto) {
    return `This action updates a #${id} formGroupMembership`;
  }

  remove(id: number) {
    return `This action removes a #${id} formGroupMembership`;
  }
}

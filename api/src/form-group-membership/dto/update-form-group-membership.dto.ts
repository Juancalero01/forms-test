import { PartialType } from '@nestjs/mapped-types';
import { CreateFormGroupMembershipDto } from './create-form-group-membership.dto';

export class UpdateFormGroupMembershipDto extends PartialType(CreateFormGroupMembershipDto) {}

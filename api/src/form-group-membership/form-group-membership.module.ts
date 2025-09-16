import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormGroupMembershipService } from './form-group-membership.service';
import { FormGroupMembershipController } from './form-group-membership.controller';
import { FormGroupMembership } from './entities/form-group-membership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormGroupMembership])],
  controllers: [FormGroupMembershipController],
  providers: [FormGroupMembershipService],
})
export class FormGroupMembershipModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldPermissionService } from './field-permission.service';
import { FieldPermissionController } from './field-permission.controller';
import { FieldPermission } from './entities/field-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FieldPermission])],
  controllers: [FieldPermissionController],
  providers: [FieldPermissionService],
})
export class FieldPermissionModule {}

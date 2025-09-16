import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldDataPermissionService } from './field-data-permission.service';
import { FieldDataPermissionController } from './field-data-permission.controller';
import { FieldDataPermission } from './entities/field-data-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FieldDataPermission])],
  controllers: [FieldDataPermissionController],
  providers: [FieldDataPermissionService],
})
export class FieldDataPermissionModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ActionModule } from './action/action.module';
import { SubjectModule } from './subject/subject.module';
import { PermissionModule } from './permission/permission.module';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { FormModule } from './form/form.module';
import { FormFieldModule } from './form-field/form-field.module';
import { FieldPermissionModule } from './field-permission/field-permission.module';
import { FieldDataPermission } from './field-data-permission/entities/field-data-permission.entity';
import { FormGroupModule } from './form-group/form-group.module';
import { FormGroupMembershipModule } from './form-group-membership/form-group-membership.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'CNET2023',
      database: 'api_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UserModule,
    RoleModule,
    ActionModule,
    SubjectModule,
    PermissionModule,
    RolePermissionModule,
    FormModule,
    FormFieldModule,
    FieldPermissionModule,
    FieldDataPermission,
    FormGroupModule,
    FormGroupMembershipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

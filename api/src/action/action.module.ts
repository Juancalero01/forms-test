import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { Action } from './entities/action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Action])],
  controllers: [ActionController],
  providers: [ActionService],
})
export class ActionModule {}

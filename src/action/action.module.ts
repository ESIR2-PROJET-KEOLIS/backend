import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';

@Module({
  imports: [HttpModule],
  controllers: [ActionController],
  providers: [ActionService],
  exports: [ActionService]
})
export class ActionModule {}

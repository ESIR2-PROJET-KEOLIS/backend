import { Module } from '@nestjs/common';
import { redisModule } from 'src/modules.config'; 
import { BusController } from './bus.controller';
import { BusService } from './bus.service';

@Module({
  imports: [redisModule],
  controllers: [BusController],
  providers: [BusService],
  exports: [BusService]
})
export class BusModule {}

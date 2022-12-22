import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusModule } from './bus/bus.module';
import { PositionModule } from './position/position.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [BusModule, PositionModule],
})
export class AppModule {}

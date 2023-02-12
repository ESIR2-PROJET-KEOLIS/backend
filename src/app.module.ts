import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommunicationRabbitMqModule } from './communication-rabbit-mq/communication-rabbit-mq.module';
import { BusModule } from './bus/bus.module';
import { PositionModule } from './position/position.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [BusModule, PositionModule,ConfigModule.forRoot(),CommunicationRabbitMqModule],

})
export class AppModule {}

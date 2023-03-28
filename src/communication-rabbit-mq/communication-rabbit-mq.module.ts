import { Module } from '@nestjs/common';
import { BusModule } from 'src/bus/bus.module';
import { BusService } from 'src/bus/bus.service';
import { CommunicationRabbitMqController } from './communication-rabbit-mq.controller';
import { CommunicationRabbitMqService } from './communication-rabbit-mq.service';

@Module({
  imports: [BusModule],
  controllers: [CommunicationRabbitMqController],
  providers: [CommunicationRabbitMqService]
})
export class CommunicationRabbitMqModule {}

import { Module } from '@nestjs/common';
import { CommunicationRabbitMqController } from './communication-rabbit-mq.controller';
import { CommunicationRabbitMqService } from './communication-rabbit-mq.service';

@Module({
  controllers: [CommunicationRabbitMqController],
  providers: [CommunicationRabbitMqService]
})
export class CommunicationRabbitMqModule {}

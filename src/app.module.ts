import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommunicationRabbitMqModule } from './communication-rabbit-mq/communication-rabbit-mq.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [CommunicationRabbitMqModule, WebsocketModule],
})
export class AppModule {}

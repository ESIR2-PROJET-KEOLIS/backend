import { Controller,Get,Injectable, OnModuleInit } from '@nestjs/common';
import { CommunicationRabbitMqService } from './communication-rabbit-mq.service';

@Controller('communication-rabbit-mq')
@Injectable()
export class CommunicationRabbitMqController{
    constructor(private readonly myService: CommunicationRabbitMqService) {}

    @Get()
    async getMessages() {
      /*this.myService.listenToRabbitMQ();
  
      // Écoute des messages envoyés par le service
        this.myService.wsServer.addEventListener('connection', (ws: WebSocket) => {
            ws.addEventListener('message', (event: MessageEvent) => {
                console.log(`Message received: ${event.data}`);
            });
        });*/
    }
}

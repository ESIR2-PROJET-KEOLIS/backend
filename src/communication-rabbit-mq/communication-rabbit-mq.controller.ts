import { Controller,Get,Injectable, OnModuleInit } from '@nestjs/common';
import { CommunicationRabbitMqService } from './communication-rabbit-mq.service';

@Controller('communication-rabbit-mq')
@Injectable()
export class CommunicationRabbitMqController{
    constructor(private readonly myService: CommunicationRabbitMqService) {}
}

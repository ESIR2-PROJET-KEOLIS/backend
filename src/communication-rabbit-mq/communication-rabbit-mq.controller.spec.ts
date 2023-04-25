import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationRabbitMqController } from './communication-rabbit-mq.controller';
import { CommunicationRabbitMqService } from './communication-rabbit-mq.service';
import { BusService } from '../bus/bus.service';
import { redisModule } from '../modules.config';

describe('CommunicationRabbitMqController', () => {
  let controller: CommunicationRabbitMqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunicationRabbitMqController],
      providers: [CommunicationRabbitMqService,BusService],
      imports: [redisModule]
    }).compile();

    controller = module.get<CommunicationRabbitMqController>(CommunicationRabbitMqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

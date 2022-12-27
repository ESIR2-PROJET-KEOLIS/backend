import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationRabbitMqController } from './communication-rabbit-mq.controller';

describe('CommunicationRabbitMqController', () => {
  let controller: CommunicationRabbitMqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunicationRabbitMqController],
    }).compile();

    controller = module.get<CommunicationRabbitMqController>(CommunicationRabbitMqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

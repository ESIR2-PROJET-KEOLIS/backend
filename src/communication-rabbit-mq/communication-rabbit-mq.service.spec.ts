import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationRabbitMqService } from './communication-rabbit-mq.service';

describe('CommunicationRabbitMqService', () => {
  let service: CommunicationRabbitMqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunicationRabbitMqService],
    }).compile();

    service = module.get<CommunicationRabbitMqService>(CommunicationRabbitMqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

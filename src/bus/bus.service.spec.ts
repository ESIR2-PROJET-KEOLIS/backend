import { Test, TestingModule } from '@nestjs/testing';
import { BusService } from './bus.service';
import { redisModule } from '../modules.config';
import { Redis } from 'ioredis';
import { IORedisKey } from '../redis.modules';
import { RedisMock } from '../mocks/redis.mock';
import supertest from 'supertest';
import { InternalServerErrorException } from '@nestjs/common';

describe('BusService', () => {
  let service: BusService;
  let redisClient: Redis;
  let app: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusService,
        {
          provide: IORedisKey,
          useClass: RedisMock,
        },
      ],
      imports: [redisModule]
    }).compile();

    service = module.get<BusService>(BusService);
    redisClient = module.get<Redis>(IORedisKey);
    app = await module.createNestApplication().init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  afterEach(async () => {
    await app.close();
  });

  describe('addRedis', () => {
    /*it('should add data to Redis', async () => {
      const data = { name: "Pont d'Ohin", position: { latitude: 48.136816, longitude: -1.548448 } };
      const response = await service.addRedis(data);
      const storedData = await redisClient.get('0');
      expect(JSON.parse(storedData)).toEqual(data);
    });

    // vérifie que la méthode renvoie une exception InternalServerErrorException si une erreur Redis se produit.
    it('should throw InternalServerErrorException on redis error', async () => {
      // simulate redis error
      jest.spyOn(redisClient, 'multi').mockImplementation(() => {
        throw new Error('Redis error');
      });

      const data = { name: "Pont d'Ohin", position: { latitude: 48.136816, longitude: -1.548448 } };

      await expect(service.addRedis(data)).rejects.toThrow(InternalServerErrorException);
    });*/

  });

  describe('getRealTimeBus', () => {
    /*it('should return real-time bus data from Redis', async () => {
      const expectedData = {  name: "Pont d'Ohin", position: { latitude: 48.136816, longitude: -1.548448 } };
      const data = await service.getRealTimeBus();

      expect(redisClient.get).toHaveBeenCalledWith('0');
      expect(data).toEqual(expectedData);
    });

    // vérifie que la méthode lève une exception lorsque la clé "0" n'existe pas dans Redis.
    it('should throw an exception when there is no bus data', async () => {
      await expect(service.getRealTimeBus()).rejects.toThrowError('Failed to get Bus');
    });*/

  });
});


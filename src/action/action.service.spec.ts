import { Test, TestingModule } from '@nestjs/testing';
import { ActionService } from './action.service';
import { HttpModule } from '@nestjs/axios';

describe('ActionService', () => {
  let service: ActionService;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionService],
      imports: [HttpModule],
    }).compile();

    service = module.get<ActionService>(ActionService);
  });

  describe('getAllLineColor', () => {
    it('should return an array of line colors', async () => {
      const result = await service.getAllLineColor();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('line');
      expect(result[1]).toHaveProperty('lineColor');
    });
  });

  describe('getAllBusStation', () => {
    it('should return an array of bus stations', async () => {
      const result = await service.getAllBusStation();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('name');
      expect(result[0].position).toHaveProperty('latitude');
      expect(result[0].position).toHaveProperty('longitude');
    });
  });

  describe('getAllBusPicto', () => {
    it('should return an array of bus pictos', async () => {
      const result = await service.getAllBusPicto();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('format');
      expect(result[0]).toHaveProperty('height');
      expect(result[0]).toHaveProperty('nomImage');
      expect(result[0]).toHaveProperty('nomLigne');
      expect(result[0]).toHaveProperty('width');
    });
  });

  /*describe('getAllBusLocationTime', () => {
    it('should return an object of bus locations for a given time', async () => {
      const day = 'friday';
      const hours = 14;
      const minutes = 25;
      const result = await service.getAllBusLocationTime(day, hours, minutes);
      expect(result).toBeInstanceOf(Object);
      expect(Object.keys(result).length).toBeGreaterThan(0);
      expect(result['10']).toBeDefined(); 
      expect(result['10'][0]).toHaveProperty('lat');
      expect(result['10'][0]).toHaveProperty('long');
      expect(result['10'][0]).toHaveProperty('route');
      expect(result['10'][0]).toHaveProperty('theoretical_time');
    });
  });*/

  describe('getAllSubwayStation', () => {
    it('should return an array of subway stations', async () => {
      const result = await service.getAllSubwayStation();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('name');
      expect(result[0].position).toHaveProperty('latitude');
      expect(result[0].position).toHaveProperty('longitude');
    });
  });
});

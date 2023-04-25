import { Test, TestingModule } from '@nestjs/testing';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { HttpModule } from '@nestjs/axios';


describe('ActionController', () => {
  let controller: ActionController;
  let service: ActionService;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionController],
      providers: [ActionService],
      imports: [HttpModule],
    }).compile();

    controller = module.get<ActionController>(ActionController);
    service = module.get<ActionService>(ActionService);
  });

  describe('getLineColor', () => {
    it('should return all line colors', async () => {
      const colors = ['red', 'blue', 'green'];
      jest.spyOn(service, 'getAllLineColor').mockResolvedValue(colors);

      const result = await controller.getLineColor();

      expect(result).toEqual(colors);
    });
  });

  /*describe('getBusStation', () => {
    it('should return all bus stations', async () => {
      const stations = ['Station 1', 'Station 2', 'Station 3'];
      jest.spyOn(service, 'getAllBusStation').mockResolvedValue(stations);

      const result = await controller.getBusStation();

      expect(result).toEqual(stations);
    });
  });*/

  
  describe('getBusPicto', () => {
    it('should return all bus pictograms', async () => {
      const pictos = ['Picto 1', 'Picto 2', 'Picto 3'];
      jest.spyOn(service, 'getAllBusPicto').mockResolvedValue(pictos);

      const result = await controller.getBusPicto();

      expect(result).toEqual(pictos);
    });
  });

  describe('getBusAnyTimeLocationTime', () => {
    it('should return all bus locations for the given day, hour and minute', async () => {
      const day = 'monday';
      const hour = '10';
      const minute = '30';
      const locations = ['Location 1', 'Location 2', 'Location 3'];
      jest.spyOn(service, 'getAllBusLocationTime').mockResolvedValue(locations);

      const result = await controller.getBusAnyTimeLocationTime({ day, hour, minute });

      expect(result).toEqual(locations);
      expect(service.getAllBusLocationTime).toHaveBeenCalledWith(day, hour, minute);
    });
  });


});

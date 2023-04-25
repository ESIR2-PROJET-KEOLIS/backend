import { Test, TestingModule } from '@nestjs/testing';
import { LinesController } from './lines.controller';
import { LinesService } from './lines.service';

describe('LinesController', () => {
  let controller: LinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinesController],
      providers: [LinesService],
    }).compile();

    controller = module.get<LinesController>(LinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return lines from service', async () => {
    const lines = ['10', '11', '12', '13', '14'];
    jest.spyOn(controller['service'], 'getAll').mockReturnValue(Promise.resolve(lines));

    expect(await controller.getAll()).toBe(lines);
  });

  // vérifie que la méthode getAll est bien appelée avec le tableau de lignes en paramètre
  it('should call getAll with correct parameter', async () => {
    // Arrange
    const lines = ['10', '11', '12', '13', '14', '226', '32', '34', '39', '50', '51', '52', '53', '54', '55', '56', '59', '61', '62', '64', '65', '67', '68', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '91', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'];
    const service = new LinesService();
    const getAllSpy = jest.spyOn(service, 'getAll');
    const controller = new LinesController(service);

    // Act
    await controller.getAll();

    // Assert
    expect(getAllSpy).toHaveBeenCalledWith(lines);
  });
  
});

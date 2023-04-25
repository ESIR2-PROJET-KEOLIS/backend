import { Test, TestingModule } from '@nestjs/testing';
import { LinesService } from './lines.service';
import axios from "axios";

describe('LinesService', () => {
  let service: LinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinesService],
    }).compile();

    service = module.get<LinesService>(LinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  //Le test vérifie que la méthode getAll() du service effectue des requêtes HTTP pour chaque ligne, puis renvoie un objet avec les résultats pour chaque ligne.
  it('should return optimized paths for all lines', async () => {
    const lines = ['10', '11', '12', '13', '14'];
    const baseURL = 'http://localhost:8090/optimizedpath?line=';
    const expectedUrls = [
      baseURL + '10&sens=0',
      baseURL + '10&sens=1',
      baseURL + '11&sens=0',
      baseURL + '11&sens=1',
      baseURL + '12&sens=0',
      baseURL + '12&sens=1',
      baseURL + '13&sens=0',
      baseURL + '13&sens=1',
      baseURL + '14&sens=0',
      baseURL + '14&sens=1',
    ];
    const axiosResponse = {
      data: [[48.11706,-1.634049]],
      config: { url: baseURL + '10&sens=0' },
    };
    jest.spyOn(axios, 'all').mockReturnValueOnce(Promise.resolve([axiosResponse]));
    const expectedResult = {
      "10_0":[[48.11706,-1.634049]],
    };

    const result = await service.getAll(lines);

    expect(axios.all).toHaveBeenCalledWith(expectedUrls.map((url) => axios.get(url)));
    expect(result).toEqual(expectedResult);
  });

  //Ce test vérifie que la méthode getAll() du service lance une erreur si la méthode axios.all() échoue.
  it('should throw an error if axios.all() fails', async () => {
    const lines = ['10', '11', '12', '13', '14'];
    const baseURL = 'http://localhost:8090/optimizedpath?line=';
    const expectedUrls = [
      baseURL + '10&sens=0',
      baseURL + '10&sens=1',
      baseURL + '11&sens=0',
      baseURL + '11&sens=1',
      baseURL + '12&sens=0',
      baseURL + '12&sens=1',
      baseURL + '13&sens=0',
      baseURL + '13&sens=1',
      baseURL + '14&sens=0',
      baseURL + '14&sens=1',
    ];
    const axiosError = new Error('axios.all() failed');
    jest.spyOn(axios, 'all').mockReturnValueOnce(Promise.reject(axiosError));

    await expect(service.getAll(lines)).rejects.toThrow(axiosError);

    expect(axios.all).toHaveBeenCalledWith(expectedUrls.map((url) => axios.get(url)));
  });

  // vérifie que le résultat retourné par la méthode getAll est bien un objet avec les propriétés correspondantes
  it('should return an object with properties for each line and direction', async () => {
    // Arrange
    const lines = ['10', '11', '12'];
    const expectedProps = {"10_0":[[48.11706,-1.634049]],"10_1":[[48.11706,-1.634049]],"11_0":[[48.11706,-1.634049]],"11_1":[[48.11706,-1.634049]],"12_0":[[48.11706,-1.634049]],"12_1":[[48.11706,-1.634049]]}
    // Act
    const result = await service.getAll(lines);
  
    // Assert
    expect(result).toBeInstanceOf(Object);
    expect(Object.keys(result).length).toEqual(Object.keys(expectedProps).length);

    Object.keys(expectedProps).forEach(prop => {
      expect(result).toHaveProperty(prop);
    });
  });
  
});

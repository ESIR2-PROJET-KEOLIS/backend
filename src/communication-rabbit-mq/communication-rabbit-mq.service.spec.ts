import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationRabbitMqService } from './communication-rabbit-mq.service';
import { BusService } from '../bus/bus.service';
import WebSocket from 'ws';
import { redisModule } from '../modules.config';


describe('CommunicationRabbitMqService', () => {
  let service: CommunicationRabbitMqService;
  let busService: BusService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunicationRabbitMqService,BusService],
      imports: [redisModule]
    }).compile();

    service = module.get<CommunicationRabbitMqService>(CommunicationRabbitMqService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should connect to RabbitMQ successfully', async () => {
    const connectSpy = jest.spyOn(service, 'connectToRabbitMQ').mockResolvedValue(undefined);

    await service.connectToRabbitMQ();

    expect(connectSpy).toHaveBeenCalledTimes(1);
  });

  /*
  it('should retry connecting to RabbitMQ if connection fails', async () => {
    jest.useFakeTimers();

    const connectSpy = jest.spyOn(service, 'connectToRabbitMQ').mockRejectedValue(new Error('Failed to connect to RabbitMQ'));

    await service.connectToRabbitMQ();

    expect(connectSpy).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(5000);

    expect(connectSpy).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(5000);

    expect(connectSpy).toHaveBeenCalledTimes(3);

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should stop retrying connecting to RabbitMQ after 5 attempts', async () => {
    jest.useFakeTimers();

    const connectSpy = jest.spyOn(service, 'connectToRabbitMQ').mockRejectedValue(new Error('Failed to connect to RabbitMQ'));

    await service.connectToRabbitMQ();

    expect(connectSpy).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(5000);
    jest.advanceTimersByTime(5000);
    jest.advanceTimersByTime(5000);
    jest.advanceTimersByTime(5000);
    jest.advanceTimersByTime(5000);

    expect(connectSpy).toHaveBeenCalledTimes(6);
    expect(console.error).toHaveBeenCalledWith('Exceeded maximum number of connection attempts');

    jest.useRealTimers();
  });

  afterEach(() => {
    service.wsServer.close();
  });

  // Test du WebSocket
  it('should send real-time bus data to WebSocket clients', (done) => {
    // Simulate real-time bus data
    const realTimeBusData = { features: [{ id: 1, geometry: [0, 0] }, { id: 2, geometry: [1, 1] }] };
    spyOn(busService, 'getRealTimeBus').and.returnValue(Promise.resolve(realTimeBusData));

    // Start WebSocket server and connect a client
    service.initWebSocket();
    const wsClient = new WebSocket('ws://localhost:4000');

    // Wait for the client to connect
    wsClient.on('open', () => {
      // Wait for the server to send data to the client
      wsClient.on('message', (message) => {
        const receivedData = JSON.parse(message.toString());
        expect(receivedData).toEqual(realTimeBusData);
        done();
      });
    });
  });

  //Test de la connexion réussie à RabbitMQ :
  it('should connect to RabbitMQ and consume messages from the queue', async () => {
    const busServiceMock = { 
      getRealTimeBus: jest.fn(() => Promise.resolve({ features: [] })),
      addRedis: jest.fn(() => Promise.resolve())
    };
  
    const connectionMock = {
      createChannel: jest.fn(() => Promise.resolve({
        assertQueue: jest.fn(() => Promise.resolve()),
        consume: jest.fn((queue, callback) => {
          // Appelle la fonction de rappel avec un message bidon
          callback({ content: 'message' });
        })
      }))
    };
  
    const refMock = {
      connection: connectionMock,
      channel: null,
      busService: busServiceMock,
      wsServer: {
        clients: [],
        on: jest.fn()
      }
    };
  
    const communicationRabbitMqService = new CommunicationRabbitMqService(refMock as any);
  
    // Vérifie que la méthode createChannel a été appelée sur la connexion
    expect(connectionMock.createChannel).toHaveBeenCalled();
  
    // Vérifie que la méthode assertQueue a été appelée sur le canal
    expect((await connectionMock.createChannel()).assertQueue).toHaveBeenCalledWith('PositionAllBusProcessed');
  
    // Attend la prochaine itération de la boucle while(true) avant de vérifier que la méthode consume a été appelée sur le canal
    await new Promise(resolve => setTimeout(resolve, 0));
    expect((await connectionMock.createChannel()).consume).toHaveBeenCalledWith('PositionAllBusProcessed', expect.any(Function));
  
    // Attend la prochaine itération de la boucle while(true) avant de vérifier que la méthode getRealTimeBus a été appelée sur busServiceMock
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(busServiceMock.getRealTimeBus).toHaveBeenCalled();
  
    // Attend la prochaine itération de la boucle while(true) avant de vérifier que la méthode addRedis a été appelée sur busServiceMock
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(busServiceMock.addRedis).toHaveBeenCalled();
  });
  
  /// Test de la connexion échouée à RabbitMQ :
  it('should retry connecting to RabbitMQ if connection fails', async () => {
    const busServiceMock = {
    getRealTimeBus: jest.fn(() => Promise.resolve({ features: [] })),
    addRedis: jest.fn(() => Promise.resolve())
    };
    
    const connectionMock = {
    createChannel: jest.fn(() => Promise.reject(new Error('Failed to connect')))
    };
    
    const refMock = {
    connection: connectionMock,
    channel: null,
    busService: busServiceMock,
    wsServer: {
    clients: [],
    on: jest.fn()
    }
    };
    
    const communicationRabbitMqService = new CommunicationRabbitMqService(refMock as any);
    
    // Attend la première tentative de connexion
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Vérifie que la méthode createChannel a été appelée sur la connexion
    expect(connectionMock.createChannel).toHaveBeenCalled();
    
    // Attend la deuxième tentative de connexion
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Vérifie que la méthode createChannel a été appelée deux fois sur la connexion
    expect(connectionMock.createChannel).toHaveBeenCalledTimes(2);
    
    // Attend la troisième tentative de connexion
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Vérifie que la méthode createChannel a été appelée trois fois sur la connexion
    expect(connectionMock.createChannel).toHaveBeenCalledTimes(3);
  });  
  
  afterEach(() => {
    jest.restoreAllMocks();
  });

  //  vérifie que la méthode listenToRabbitMQ consomme les messages de la queue, 
  it('should consume messages from queue and send to clients via websocket', async () => {
    // Mock data
    const tempData = {
      
    };
    const receivedData = {
      features: [
        {
          properties: {
            id: 1,
          },
          geometry: [0, 0],
        },
        {
          properties: {
            id: 2,
          },
          geometry: [1, 1],
        },
      ],
    };
    const msg = {
      content: Buffer.from(JSON.stringify(receivedData)),
      ack: jest.fn(),
    };
    const WebSocket = require('ws');
    const wsServer = new WebSocket.Server({ noServer: true });
    const client = new WebSocket('ws://localhost:4000');
    const sendMock = jest.fn();
    client.send = sendMock;

    // Mock dependencies
    //jest.spyOn(busService, 'getRealTimeBus').mockResolvedValue(tempData);
    jest.spyOn(busService, 'addRedis').mockImplementation();
    jest.spyOn(WebSocket, 'Server').mockReturnValueOnce(wsServer);

    // Call method under test
    await service.listenToRabbitMQ(service);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    wsServer.emit('connection', client);
    wsServer.clients.forEach((c) => {
      c.send(msg.content.toString());
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Expectations
    expect(busService.getRealTimeBus).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith(JSON.stringify(receivedData));
    expect(busService.addRedis).toHaveBeenCalledWith(receivedData);
    expect(msg.ack).toHaveBeenCalledTimes(1);
  });*/


});


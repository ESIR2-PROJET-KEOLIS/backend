import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import * as amqp from 'amqplib';

let connectionAttempts = 0;

@Injectable()
export class CommunicationRabbitMqService {
  wsServer: WebSocket.Server;
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private data: object = {
    type: "FeatureCollection",
    features : []
  };

  async connectToRabbitMQ() {
    try {
      let url = process.env.AMQP_URL || 'amqp://guest:guest@localhost:5672';
      this.connection = await amqp.connect(url);
      console.log('Successfully connected to RabbitMQ');
      this.initWebSocket();
      this.listenToRabbitMQ(this);
    } catch (error) {
      console.error('Could not connect to RabbitMQ: ', error);
      if(true){
        connectionAttempts++;
        console.log(`Retrying in 5 seconds... (attempt ${connectionAttempts})`);
        setTimeout(this.connectToRabbitMQ.bind(this), 5000);
      } else {
        console.error('Exceeded maximum number of connection attempts');
      }
    }
  }

  constructor(){
    this.connectToRabbitMQ()    
  }

  initWebSocket(){
    let ws = new WebSocket.Server({ port: 4000, host: '0.0.0.0' });
    this.wsServer = ws;

    console.log("WebSocket server started on port 4000");

    let ref = this;
    ws.on('connection', function connection(wsclient) {
      console.log("Client connected");
      wsclient.on('message', function incoming(message) {
        console.log('received: %s', message);
      });

      // TODO getbyId redis
      wsclient.send(JSON.stringify(ref.data));
    });
  }

  async listenToRabbitMQ(ref) {
    //let url = process.env.AMQP_URL || 'amqp://guest:guest@localhost:5672';
    //ref.connection = await amqp.connect(url);
    ref.channel = await ref.connection.createChannel();

    // Déclaration de la queue
    const queue = 'PositionAllBusProcessed';
    while(true){
      await ref.channel.assertQueue(queue);

      // Consommer les messages de la queue
      ref.channel.consume(queue, (msg) => {
        console.log(new Date().toString() + ` : Bus data received from rabbitmq`);

        let receivedData = JSON.parse(msg.content.toString());
        if(receivedData != undefined
          && receivedData.features != undefined
          && ref.data != undefined){
          let diff = ref.data.features.length != receivedData.features.length;
          if(!diff) {
            for(let i = 0; i < ref.data.features.length; i++){
              if(ref.data.features[i].properties.id !== receivedData.features[i].properties.id
                || ref.data.features[i].geometry[0] !== receivedData.features[i].geometry[0]
                || ref.data.features[i].geometry[1] !== receivedData.features[i].geometry[1]){
                diff = true;
              }
            }
          }
          if(!diff){
            console.log("SAME DATA");
            return;
          }
        }

        // TODO envoyer sa a Redis avec le create
        ref.data = receivedData;

        // Envoi du message aux clients du websocket
        ref.wsServer.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(ref.data));
          }
        });

        ref.channel.ack(msg);
      });
    }
  }



  // Méthode qui se connecte à RabbitMQ et écoute les messages de la queue
  /**
   * listenToRabbitMQ() {
    amqp.connect('amqp://user:password@localhost', (error0, connection) => {
        if (error0) {
            throw error0;
        }

        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'queue_keolis';

            channel.assertQueue(queue, {
                durable: false
            });

            /* Sans nestJS
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.consume(queue, function(msg) {
                console.log(" [x] Received %s", msg.content.toString());
            }, {
                noAck: true
            });

            // Consommer les messages de la queue
            channel.consume(queue, function(msg) {
                this.wsServer = new Server({ port: 4000 });
                // Envoyer le message à l'application NestJS en utilisant le système de messages
                for (const client of this.wsServer.clients) {
                    client.send(msg.content.toString());
                }

                //process.send({ message: msg.content.toString() });
            }, {
                noAck: true
            });

        });
    });
  }*/

}



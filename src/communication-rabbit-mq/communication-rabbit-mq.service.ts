import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import * as amqp from 'amqplib';

@Injectable()
export class CommunicationRabbitMqService {
  wsServer: WebSocket.Server;
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private data: object = {
    type: "FeatureCollection",
    features : []
  };

  constructor(){
    this.initWebSocket();
    setTimeout(this.listenToRabbitMQ, 10000, this);
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

      wsclient.send(JSON.stringify(ref.data));
    });
  }

  async listenToRabbitMQ(ref) {
    let url = process.env.AMQP_URL || 'amqp://guest:guest@localhost:5672';
    ref.connection = await amqp.connect(url);
    ref.channel = await ref.connection.createChannel();

    // Déclaration de la queue
    const queue = 'PositionAllBusProcessed';
    while(true){
      await ref.channel.assertQueue(queue);

      // Consommer les messages de la queue
      ref.channel.consume(queue, (msg) => {
        console.log(new Date().toString() + ` : Bus data received from rabbitmq`);

        ref.data = JSON.parse(msg.content.toString());

        // Envoi du message aux clients du websocket
        ref.wsServer.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(ref.data));
          }
        });
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



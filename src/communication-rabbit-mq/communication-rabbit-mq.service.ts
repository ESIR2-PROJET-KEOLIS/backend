import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import * as amqp from 'amqplib';

@Injectable()
export class CommunicationRabbitMqService {
  wsServer: WebSocket.Server;
  private connection: amqp.Connection;
  private channel: amqp.Channel;

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
  async listenToRabbitMQ() {
    this.wsServer = new WebSocket.Server({ port: 4000 });
    this.connection = await amqp.connect('amqp://user:password@localhost');
    this.channel = await this.connection.createChannel();

    // Déclaration de la queue
    const queue = 'queue_keolis';
    await this.channel.assertQueue(queue);

    // Consommer les messages de la queue
    this.channel.consume(queue, (msg) => {
        console.log(`Message received: ${msg.content.toString()}`);

        // Envoi du message aux clients du websocket
        this.wsServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg.content.toString());
        }
        });
    });
  }
}



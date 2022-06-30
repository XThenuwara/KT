import { Injectable, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
@Injectable()
export class NotificationService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server;

  private logger: Logger = new Logger('NotificationGateway');

  afterInit() {
    this.logger.log('init');
  }

  handleDisconnect(client) {
    this.logger.log('disconnected : ' + client.id);
  }
  handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.log('connected : ' + client.id);
  }

  sendMessage(id, data) {
    this.server.to(id).emit('notify', data);
  }
}

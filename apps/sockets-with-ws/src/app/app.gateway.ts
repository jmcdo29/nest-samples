import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import * as WebSocket from 'ws';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  private readonly server: WebSocket.Server;
  @SubscribeMessage('message')
  handleMessage(client: WebSocket, payload: any): string {
    return 'Hello world!';
  }
}

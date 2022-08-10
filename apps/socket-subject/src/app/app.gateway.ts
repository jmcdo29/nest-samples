import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import * as ws from 'ws';
import { AppService } from './app.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {
  constructor(private readonly appService: AppService) {}

  afterInit(server: ws.WebSocketServer) {
    this.appService
      .getEventsToEmit()
      .asObservable()
      .subscribe({
        next: (event) => {
          server.emit(event.name, event.data);
        },
      });
  }
}

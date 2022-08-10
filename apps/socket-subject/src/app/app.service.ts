import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class AppService {
  private events$ = new Subject<{ name: string; data: unknown }>();

  getData(): { message: string } {
    this.addEvent('message', 'GET / hit');
    return { message: 'Welcome to socket-subject!' };
  }

  addEvent(name: string, data: unknown) {
    this.events$.next({ name, data });
  }

  getEventsToEmit() {
    return this.events$;
  }
}

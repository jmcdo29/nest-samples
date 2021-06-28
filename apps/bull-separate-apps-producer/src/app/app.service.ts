import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue('test') private queue: Queue) {}

  getData(): { message: string } {
    return { message: 'Welcome to bull-separate-apps-producer!' };
  }

  async produce(): Promise<string> {
    const job = await this.queue.add({
      foo: 'bar',
    });

    const message = `Enqueued Job ${job.id}`;
    console.log(message);
    return message;
  }
}

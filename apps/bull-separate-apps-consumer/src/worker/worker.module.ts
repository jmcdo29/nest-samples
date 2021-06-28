import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { WorkerService } from './worker.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_URL || '127.0.0.1',
        port: 6379,
        // password: process.env.REDIS_PWD,
        showFriendlyErrorStack: true,
      },
      settings: {
        lockDuration: 300000,
        stalledInterval: 300000,
      },
    }),
    BullModule.registerQueue({
      name: 'test',
      redis: {
        port: 6379,
      },
    }),
  ],
  providers: [WorkerService],
})
export class WorkerModule {}

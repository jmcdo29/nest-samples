import { Module } from '@nestjs/common';

import { TaskRunner } from './task.command';
import { TaskQuestions } from './task.questions';

@Module({
  providers: [TaskRunner, TaskQuestions],
})
export class AppModule {}

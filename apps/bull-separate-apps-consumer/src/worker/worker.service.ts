import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('test')
export class WorkerService {
  @Process()
  async transcode(job: Job<unknown>) {
    console.log(`Processing job ${job.id} with data:`);
    console.dir(job.data);
  }
}

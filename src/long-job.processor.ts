import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
@Processor('long-job')
export class LongJobProcessor {
  constructor(
    @InjectQueue('internal-jobs')
    private readonly internalJobsQueue: Queue,
  ) {}

  private async delay(timeMs: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeMs);
    });
  }

  @Process()
  //Runs for 10 seconds, adds a new job in "internal-jobs" queue every second.
  async process(): Promise<void> {
    for (let index = 0; index < 10; index++) {
      await this.delay(1000);

      try {
        await this.internalJobsQueue.add({});
        console.log('added internal job successfully.');
      } catch (e) {
        console.log('Error in adding a new job:', e);
        throw e;
      }
    }

    console.log('processed long job successfully');

    return Promise.resolve();
  }
}

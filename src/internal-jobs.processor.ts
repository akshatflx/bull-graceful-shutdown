import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

@Injectable()
@Processor('internal-jobs')
export class InternalJobsProcessor {
  @Process()
  async process(): Promise<void> {
    console.log('processed internal job successfully');
    return Promise.resolve();
  }
}

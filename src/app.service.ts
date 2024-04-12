import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('long-job')
    private readonly longJobQueue: Queue,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async publishLongQueueJob(): Promise<void> {
    await this.longJobQueue.add({});
    return Promise.resolve();
  }
}

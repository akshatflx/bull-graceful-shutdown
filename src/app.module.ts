import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LongJobProcessor } from './long-job.processor';
import { InternalJobsProcessor } from './internal-jobs.processor';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({ name: 'internal-jobs' }),
    BullModule.registerQueue({ name: 'long-job' }),
  ],
  controllers: [AppController],
  providers: [AppService, LongJobProcessor, InternalJobsProcessor],
})
export class AppModule {}

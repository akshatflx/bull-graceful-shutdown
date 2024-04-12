import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { pid } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`process listening on ${pid}`);
  await app.listen(3000);

  app.enableShutdownHooks();

  process.on('SIGTERM', () => {
    console.log('SIGTERM Received');
  });
}
bootstrap();

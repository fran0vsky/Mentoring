import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (origin, callback) => {
      const allowed = !origin || /^https?:\/\/localhost(:\d+)?$/.test(origin);
      callback(null, allowed ? origin ?? true : false);
    },
  });
  await app.listen(3000);
}
bootstrap();

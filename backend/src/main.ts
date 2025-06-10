import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:3000", // or '*' during development
    credentials: true, // if using cookies
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  //NOTEN: Lắng nghe port port :6969 từ file env
  await app.listen(configService.get<string>('PORT'));
  // await app.listen(3000);
}
bootstrap();

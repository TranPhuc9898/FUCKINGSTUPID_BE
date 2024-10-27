import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => {
          const constraints = error.constraints
            ? Object.values(error.constraints)
            : [];
          console.log('🚀 ~ formattedErrors ~ constraints:', constraints);

          return {
            field: error.property,
            message: constraints[0], // Lấy thông báo lỗi đầu tiên
          };
        });
        return new BadRequestException(formattedErrors);
      },
    }),
  );

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { Logger } from 'nestjs-pino';
import { type ConfigType } from '@nestjs/config';
import appConfig from '@/config/app.config';
import { RequestLoggingInterceptor } from '@/common/interceptors/request-logging.interceptor';
import { LoggerService } from '@/common/logger/logger.service';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const logger = app.get(LoggerService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(new RequestLoggingInterceptor(logger));
  app.useGlobalFilters(new HttpExceptionFilter());

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.useLogger(app.get(Logger));
  const port = config.app.port ?? 3000;
  await app.listen(port);
  logger.info(`Server started on port ${port}`);
}
void bootstrap();

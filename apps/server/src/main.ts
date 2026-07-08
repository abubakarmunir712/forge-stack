import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { Logger } from 'nestjs-pino';
import { type ConfigType } from '@nestjs/config';
import appConfig from '@/config/app.config';
import { RequestLoggingInterceptor } from '@/common/interceptors/request-logging.interceptor';
import { LoggerService } from '@/common/logger/logger.service';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const logger = app.get(LoggerService);
  app.useGlobalInterceptors(new RequestLoggingInterceptor(logger));

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.useLogger(app.get(Logger));
  const port = config.app.port ?? 3000;
  await app.listen(port);
  console.log('Server started on port', port);
}
void bootstrap();

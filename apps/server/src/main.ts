import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { Logger } from 'nestjs-pino';
import { type ConfigType } from '@nestjs/config';
import appConfig from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.useLogger(app.get(Logger));
  const port = config.app.port ?? 3000;
  await app.listen(port);
  console.log('Server started on port', port);
}
void bootstrap();

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from '@/schema/env.schema';
import { HealthModule } from './modules/health/health.module';
import appConfig from '@/config/app.config';
import { LoggerModule } from '@/common/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV ?? 'development'}.local`,
        `.env.${process.env.NODE_ENV ?? 'development'}`,
      ],
      load: [appConfig],
      isGlobal: true,
      validate,
    }),
    HealthModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

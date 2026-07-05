import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from '@/schema/env.schema';
import { HealthModule } from './modules/health/health.module';
import appConfig from '@/config/app.config';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

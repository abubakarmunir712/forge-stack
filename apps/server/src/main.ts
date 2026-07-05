import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api', { exclude: ['/health'] });
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log('Server started on port', port);
}
void bootstrap();

import { Injectable, Inject } from '@nestjs/common';
import appConf from '@/config/app.config';
import { type ConfigType } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject(appConf.KEY)
    private readonly appConfig: ConfigType<typeof appConf>,
  ) {}
  getHello(): string {
    return `Hello World from ${this.appConfig.app.name}`;
  }
}

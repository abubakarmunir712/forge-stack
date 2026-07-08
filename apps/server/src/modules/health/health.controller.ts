import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { HealthService } from './health.service';
import { SuccessMessage } from '@/common/decorators/success-message.decorator';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @SuccessMessage('All Systems Operational')
  @HttpCode(HttpStatus.OK)
  @Get()
  check() {
    return this.healthService.checkHealth();
  }
}

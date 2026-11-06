import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class HealthcheckController {
  @Get()
  checkHealth() {
    return {
      success: true,
      message: 'Service is healthy.',
      timestamp: new Date().toISOString(),
    };
  }
}

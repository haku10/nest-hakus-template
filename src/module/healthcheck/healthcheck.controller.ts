import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@ApiTags('Healthceck')
@Controller('healthcheck')
export class HealthcheckController {
  constructor(private readonly health: HealthCheckService) {}
  @HealthCheck()
  @Get()
  healthCheck(): string {
    return 'OK';
  }
}

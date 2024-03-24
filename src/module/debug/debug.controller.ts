import { Controller, Get } from '@nestjs/common';
import { DebugService } from './debug.service';

@Controller()
export class DebugController {
  constructor(private readonly appService: DebugService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

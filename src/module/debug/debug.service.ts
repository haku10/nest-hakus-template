import { Injectable } from '@nestjs/common';

@Injectable()
export class DebugService {
  getHello(): string {
    return 'Hello World!';
  }
}

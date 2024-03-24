import { Test, TestingModule } from '@nestjs/testing';
import { DebugController } from './debug.controller';
import { DebugService } from './debug.service';

describe('DebugController', () => {
  let appController: DebugController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DebugController],
      providers: [DebugService],
    }).compile();

    appController = app.get<DebugController>(DebugController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

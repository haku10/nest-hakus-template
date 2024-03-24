import { DeepPartial } from '@/type/object';
import { AppConfig } from '../app-config.interface';

export const testAppConfig: DeepPartial<AppConfig> = {
  global: {
    env: 'test',
    envShort: 'tst',
  },
};

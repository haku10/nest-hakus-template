import { DeepPartial } from '@/type/object';
import { AppConfig } from './app-config.interface';
import { defaultAppConfig } from './environment/default';
import { localAppConfig } from './environment/local';
import { testAppConfig } from './environment/test';
import { configMerger } from './helper';

let config: AppConfig;

try {
  const baseConfig: AppConfig = defaultAppConfig;
  let override: DeepPartial<AppConfig>;

  switch (process.env.NODE_ENV) {
    // NOTE 必要に応じて環境を追加していく
    case 'local':
      override = localAppConfig;
      break;
    case 'test':
      override = testAppConfig;
      break;
    default:
      console.warn(`NODE_ENV unknown: ${process.env.NODE_ENV}`);
      override = localAppConfig;
      break;
  }
  config = configMerger(baseConfig, override);
} catch (e) {
  console.error(e);
  console.error('Failed to initialize appConfig');
}

export const appConfig = config;

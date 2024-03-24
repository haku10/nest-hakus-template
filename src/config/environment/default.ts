import { AppConfig, LogLevel, ServerRoles } from '../app-config.interface';

export const defaultAppConfig: AppConfig = {
  // Global
  global: {
    env: 'local',
    envShort: 'loc',
  },
  // Api
  api: {
    serverRoles: process.env.API_SERVER_ROLES?.split(',') as ServerRoles[],
    port: parseInt(process.env.API_PORT) || 3000,
    logLevel: (process.env.LOG_LEVEL as LogLevel) || 'info',
    baseUrl: '',
    allowedUrls: [''],
    globalPrefix: 'api',
    frontendBaseUrl:
      process.env.API_FRONTEND_BASE_URL || 'http://host.docker.internal:3000',
    bcryptSalt: process.env.API_BCRYPT_SALT,
    jwtSecretKey: process.env.API_JWT_SECRET_KEY,
    cookie: {
      secure: true,
      maxAge: 1000 * 60 * 60, // 1 hour
      sameSite: 'strict',
    },
  },
  // Email
  email: {
    senderAddr: process.env.EMAIL_SENDER,
    silent: Boolean(process.env.EMAIL_SILENT) || false,
  },
  // Storage
  storage: {
    privateBucket: process.env.STORAGE_BUCKET_PRIVATE,
    publicBucket: process.env.STORAGE_BUCKET_PUBLIC,
    defaultSignedUrlSec: 60 * 60,
  },
  // Cloud
  cloud: {
    defaultRegison: process.env.AWS_DEFAULT_REGION || 'ap-northeast-1',
  },
  // Developer
  developer: {
    email: 'example@example.com',
    firstName: 'John',
    firstNameKana: 'John',
    lastName: 'Doe',
    lastNameKana: 'Doe',
  },
};

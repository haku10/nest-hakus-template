export type AppEnv =
  | 'local'
  | 'development'
  | 'staging'
  | 'production'
  | 'test';
export type AppEnvShort = 'loc' | 'dev' | 'stg' | 'prd' | 'tst' | '';
export type ServerRoles = 'api' | 'adminapi' | 'job';
export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export interface AppConfig {
  // Global
  readonly global: {
    readonly env: AppEnv;
    readonly envShort: AppEnvShort;
  };
  // Api
  readonly api: {
    readonly serverRoles: ServerRoles[];
    readonly port: number;
    readonly logLevel: LogLevel;
    readonly baseUrl: string;
    readonly allowedUrls: string[];
    readonly globalPrefix: string;
    readonly frontendBaseUrl: string;
    readonly bcryptSalt: string;
    readonly jwtSecretKey: string;
    readonly cookie: {
      readonly secure: boolean;
      readonly sameSite: boolean | 'strict' | 'lax' | 'none';
      readonly maxAge: number;
    };
  };
  // Email
  readonly email: {
    readonly senderAddr: string;
    // サイレントモード。trueの場合、メール送信を行わない
    readonly silent: boolean;
  };
  // Storage
  readonly storage: {
    readonly privateBucket: string;
    readonly publicBucket: string;
    readonly defaultSignedUrlSec: number;
  };
  // Cloud
  readonly cloud: {
    readonly defaultRegison: string;
  };
  // Developer
  readonly developer: {
    readonly email: string;
    readonly firstName: string;
    readonly firstNameKana: string;
    readonly lastName: string;
    readonly lastNameKana: string;
  };
}

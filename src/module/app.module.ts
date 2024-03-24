import { MiddlewareConsumer, Module } from '@nestjs/common';

import { DebugModule } from './debug/debug.module';
import { appConfig } from '@/config';
import { HttpLoggerMiddleware } from '@/lib/middleware/http-logger.middleware';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { BooksModule } from './domain/books/books.module';
import { UsersModule } from './domain/users/users.module';

// NOTE: ロード順に影響を及ぼすモジュール以外は基本的にアルファベット順で記載

// ローカル環境だけロードする
const localModules = appConfig.global.env === 'local' ? [DebugModule] : [];

// serverRoleにかかわらずロードする
const commonModules = [HealthcheckModule];

// serverRole=apiのときにロードする
const apiModules = appConfig.api.serverRoles.includes('api')
  ? // NOTE: swaggerの並び順に影響するため、アルファベット順で記載する
    [BooksModule, UsersModule]
  : [];

@Module({
  imports: [...localModules, ...commonModules, ...apiModules],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    // ミドルウェアを使う場合はここで有効にする
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}

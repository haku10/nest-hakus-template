import { NestFactory, Reflector } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './module/app.module';
import { PrismaService } from './module/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS設定
  app.enableCors({
    // TODO: とりあえずは全許可としておく
    origin: '*',
    credentials: false, // OriginをまたいでCookieを送りたい場合はtrue
  });
  // -------------------------------------------------- swagger

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .addBearerAuth({ type: 'http', scheme: 'bearer' }, 'authorization')
      .setTitle('Backend')
      .setDescription('Backend')
      .setVersion('1.0.0')
      .addServer('api')
      .build(),
  );
  SwaggerModule.setup(['swagger'].join('/'), app, document);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // -------------------------------------------------- app

  app.setGlobalPrefix('api');

  // to gloabally use serialization feature: https://docs.nestjs.com/techniques/serialization
  // responseにclass-transformerのデコレーターがついている場合に適用する
  app.useGlobalInterceptors(
    // excludePrefixesを使い、passwordは常にresponseから除外する
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludePrefixes: ['password'],
    }),
  );

  await app.listen(3000);
}
bootstrap();

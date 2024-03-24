import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/**
 * コントローラー層のリクエスト完了時にログを出す
 */
@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, baseUrl } = req;
    const ip = req.headers['x-forwarded-for'] || req.ip;
    const userAgent = req.get('user-agent') || '';

    const requestedAt = Date.now();

    res.on('close', () => {
      const took = Date.now() - requestedAt; // in ms
      const { statusCode } = res;

      this.logger.log(
        `[${method} "${baseUrl}"] --> [${statusCode}] {Took: ${took}ms, IP: ${ip}, UserAgent: ${userAgent}}}`,
      );
    });

    next();
  }
}

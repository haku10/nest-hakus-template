import { BadRequestException, NotFoundException } from '@nestjs/common';

/**
 * deprecated: GlobalErrorHandlerで処理
 * DB操作で対象が見つからなかった場合にNotFoundExceptionをThrowするデコレータ
 * 基本的にはレコード指定して操作が必要な find, update, delete に対して使用する
 */
export const NotFoundExceptionHandler = (): MethodDecorator => {
  return (
    _target: Record<string, unknown>,
    _methodName: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      // デコレータ を付与した関数本体をasyncに
      const originalMethodFunc = async () => {
        return originalMethod.apply(this, [...args]);
      };

      // asyncで実行したい内容
      const asyncFunc = async () => {
        try {
          return await originalMethodFunc();
        } catch (e) {
          if (e.code === 'P2025') {
            throw new NotFoundException('見つかりませんでした');
          }
          throw e;
        }
      };
      return asyncFunc();
    };
  };
};

/**
 * deprecated: GlobalErrorHandlerで処理
 * DB操作で重複キーの新規作成時にBadRequestExceptionをThrowするデコレータ
 * create に対して使用する
 */
export const DupKeyExceptionHandler = (): MethodDecorator => {
  return (
    _target: Record<string, unknown>,
    _methodName: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      // デコレータ を付与した関数本体をasyncに
      const originalMethodFunc = async () => {
        return originalMethod.apply(this, [...args]);
      };

      // asyncで実行したい内容
      const asyncFunc = async () => {
        try {
          return await originalMethodFunc();
        } catch (e) {
          if (e.code === 'P2002') {
            throw new BadRequestException('既に存在します');
          }
          throw e;
        }
      };
      return asyncFunc();
    };
  };
};

import { isPlainObject } from 'is-plain-object';

import { DeepPartial } from '@/type/object';
import { deepmerge } from '@/lib';

/**
 * configMerger Object.assignと違い、ネストされた内容も全てマージする
 */
export const configMerger = <T>(target: T, source: DeepPartial<T>): T => {
  return deepmerge(target, source as any, {
    isMergeableObject: isPlainObject, // PlainなObjectでなければインスタンスをまるまるコピーする
    arrayMerge: (_dest, src) => src, // 配列は後勝ち上書き
  });
};

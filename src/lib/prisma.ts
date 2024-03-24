import { PrismaClient } from '@prismaClient';
import { SortOrderInput } from '@/type/input';

type Models = Extract<PrismaClient[keyof PrismaClient], { fields: unknown }>;

/**
 * prismaのselectオプション用: 特定カラムをexcludeしたい場合に使用する
 * @param fields prismaのモデルのfields
 * @param exclude excludeしたいカラム名の配列
 * @example
const user = await this.prisma.user.findUnique({
     select:
         prismaExclude(this.prisma.user.fields, ['password']), 
    });
 */
export const prismaExclude = <
  T extends Models['fields'],
  ExcludeT extends (keyof T)[],
>(
  fields: T,
  exclude: ExcludeT,
) => {
  const keys = Object.keys(fields) as (keyof T)[];
  const excludeSet = new Set(exclude);
  const attributes: Partial<Record<keyof T[][number], boolean>> = {};
  for (const key of keys) {
    if (excludeSet.has(key)) attributes[key] = false;
    else attributes[key] = true;
  }

  type IncludeType = {
    [K in keyof T]: true;
  };
  type Result = Omit<IncludeType, ExcludeT[number]>;
  return attributes as Result;
};

/**
 * ユーザー入力のSortOrderInputをprismaのorderByに変換する
 * keyがドット.で区切られている場合は関連エンティティによるソートとみなし、ネストしてorderByを生成する
 * ※ネストは複数階層に対応している
 * 例1: { key: 'createdAt', direction: 'desc' } => { createdAt: 'desc' }
 * 例2: { key: 'child.createdAt', direction: 'asc' } => { child: { createdAt: 'asc' } }
 *
 */
export const sortOrderInputToOrderBy = (input: SortOrderInput) => {
  // inputが無い or {}の場合は空のオブジェクトを返す
  if (!input || Object.keys(input).length === 0) return {};

  const keys = input.key.split('.');

  const recurse = (keys: string[], direction: 'asc' | 'desc') => {
    if (keys.length === 1) {
      return { [keys[0]]: direction };
    }

    const [first, ...rest] = keys;
    return { [first]: recurse(rest, direction) };
  };

  return recurse(keys, input.direction);
};

// Partialはネストされているオブジェクトの型までoptionalにすることは出来ないので、
// ネストされた型もoptionalになる型を作成
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R>
    ? Array<DeepPartial<R>>
    : DeepPartial<T[K]>;
};



export type UnionDiscriminant<T, K extends keyof T, V extends T[K]> = T extends Record<K, V> ? T : never;

export const trimDef = <T extends { default: any }>(obj: T) => obj.default;
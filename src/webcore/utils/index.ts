import * as React from "react";

export type UnionDiscriminant<T, K extends keyof T, V extends T[K]> = T extends Record<K, V> ? T : never;

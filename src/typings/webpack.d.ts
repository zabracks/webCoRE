
declare module "*.png" {
    const s: string;
    export = s;
}

declare module "*.svg";

declare const VERSION: string;
declare const DEBUG: boolean;

declare type Casted<T> =
    T extends object ? T : never;
    
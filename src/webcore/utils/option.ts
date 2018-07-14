
export interface Some<T> {
    case: "some";
    val: T;
}

export interface None {
    case: "none";
}

export type Option<T> =
    | Some<T>
    | None;

export const some = <T>(x: T): Some<T> => ({ case: "some", val: x });
export const None: None = { case: "none" };

export const isSome = <T>(opt: Option<T>): opt is Some<T> => {
    const casted = opt as Some<T>;
    return casted.case === "some" && casted.val !== undefined;
};

export const isNone = <T>(opt: Option<T>): opt is None => {
    const casted = opt as None;
    return casted.case !== undefined && casted.case === "none";
};

export const bind = <T, U>(opt: Option<T>, f: (src: T) => Option<U>): Option<U> =>
    opt.case === "none"
        ? None
        : f(opt.val);

export const get = <T>(opt: Option<T>) => {
    if (isSome(opt)) {
        return opt.val;
    }
    throw new Error("value is none");
};

export const getOrElse = <T>(opt: Option<T>, f: (() => T) | T): T => isSome(opt) ? opt.val : (f instanceof Function ? f() : f);

import { Dispatch } from "redux";
import { ApplicationState } from "webcore/store";

// tslint:disable-next-line:no-namespace
export namespace Action {
    export type ActionCreatorFunction = (...args: Array<any>) => any;

    export interface ActionCreatorDirectory { [actionType: string]: ActionCreatorFunction; }

    export type ActionUnion<T extends ActionCreatorDirectory> = ReturnType<T[keyof T]>;

    export interface Action<TActionType extends string> {
        type: TActionType;
    }

    export interface PayloadAction<TActionType extends string, TPayload> extends Action<TActionType> {
        payload: TPayload;
    }

    type AsyncRole = "request" | "response";
    export interface AsyncAction<TActionType extends string, TPayload> extends PayloadAction<TActionType, TPayload> {
        role: AsyncRole;
    }

    export function create<TActionType extends string>(type: TActionType): Action<TActionType>;
    export function create<TActionType extends string, TPayload>(type: TActionType, payload: TPayload): PayloadAction<TActionType, TPayload>;
    export function create<TActionType extends string, TPayload>(type: TActionType, payload: TPayload, ): AsyncAction<TActionType, TPayload>;
    export function create<TActionType extends string, TPayload, TResponse>(type: TActionType, payload?: TPayload, role?: AsyncRole) {
        return { type, payload, role };
    }

}

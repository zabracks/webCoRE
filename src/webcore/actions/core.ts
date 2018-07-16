import { Dispatch } from "redux";
import { ApplicationState } from "webcore/store";
import { ActionCreators } from ".";

// tslint:disable-next-line:no-namespace
export namespace Action {
    export type ActionCreatorFunction = (...args: Array<any>) => any;

    export interface ActionCreatorDirectory { [actionType: string]: ActionCreatorFunction; }

    export type BaseActionUnion<T extends ActionCreatorDirectory> = ReturnType<T[keyof T]>;

    // tslint:disable-next-line:no-shadowed-variable
    export interface Action<TActionType extends string> {
        type: TActionType;
    }

    export interface PayloadAction<TActionType extends string, TPayload> extends Action<TActionType> {
        payload: TPayload;
    }

    // export interface ResponseAction<TRequest extends Action<any>, TResponse> extends PayloadAction<"ASYNC/response", TResponse> {
    //     request: TRequest;
    //     operation: TRequest["type"];
    // }

    export function create<TActionType extends string>(type: TActionType): Action<TActionType>;
    export function create<TActionType extends string, TPayload>(type: TActionType, payload: TPayload): PayloadAction<TActionType, TPayload>;
    export function create<TActionType extends string, TPayload>(type: TActionType, payload?: TPayload) {
        return { type, payload };
    }

    export interface ResponseAction<TT extends string, TP, TReq extends PayloadAction<TT, TP>, TRes> {
        type: "ASYNC/response";
        operation: TT;
        request: TP;
        response: TRes;
    }

    export type ResponseCreator<TT extends string, TP, TRequest extends PayloadAction<TT, TP>, TResp> =
        (response: TResp) => ResponseAction<TT, TP, TRequest, TResp>;

    export interface RequestAction<TT extends string, TP, TReq extends PayloadAction<TT, TP>, TRes> {
        type: "ASYNC/request";
        operation: TT;
        request: TP;
        response: ResponseCreator<TT, TP, TReq, TRes>;
    }

    export type BoundAsyncAction =
        <TResponse>() =>
            <TT extends string, TP, TRequest extends PayloadAction<TT, TP>>(reqAction: TRequest) =>
                RequestAction<TT, TP, TRequest, TResponse>;

    export const bindAsync = <TResponse>() =>
        <TT extends string, TP, TRequest extends PayloadAction<TT, TP>>(reqAction: TRequest) => ({
            type: "ASYNC/request" as "ASYNC/request",
            operation: reqAction.type as TRequest["type"],
            request: reqAction.payload as TRequest["payload"],
            response: (res: TResponse) => ({
                type: "ASYNC/response" as "ASYNC/response",
                operation: reqAction.type as TRequest["type"],
                request: reqAction.payload as TRequest["payload"],
                response: res,
            }),
        });

    const a = {
        doRegThing: (c: string) => create("regular", {c}),
        // doThing: (b: string) => bindAsync<{ x: number }>(create("sup", { a: b })),
    };
    type TestAction = BaseActionUnion<typeof a>;
    type IsRequest<T> = T extends RequestAction<infer TT, infer TP, infer TReq, infer TRes> ? RequestAction<TT, TP, TReq, TRes> : never;
    type IsResponse<T> = T extends IsRequest<T> ? ReturnType<T["response"]> : never;
    export type IsAsync<T> = IsRequest<T> | IsResponse<T>;
    export type ActionUnion<T extends ActionCreatorDirectory> =
        | BaseActionUnion<T>
        | IsResponse<BaseActionUnion<T>>;

    type testRequests = ActionUnion<typeof a>;
}

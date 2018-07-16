import { Action } from "webcore/actions/core";
import { UnionDiscriminant } from "webcore/utils";

import api from "./api";
import auth from "./auth";
import ui from "./ui";
import * as Option from "../utils/option";
import { resolve } from "dns";

export const ActionCreators = Object.assign({}, auth, ui, api);
export type AppAction = Action.ActionUnion<typeof ActionCreators>;

const getActionType = (a: AppAction) => a.type;
export type ActionType = ReturnType<typeof getActionType>;
export type ActionCase<T extends ActionType> = UnionDiscriminant<AppAction, "type", T>;

const createMatch =  <TObj>() => <K extends keyof TObj>(key: K) => (a: TObj) => {
    const expr = {
        match: Option.None,
        with: (t: TObj[K], cb: (entity: UnionDiscriminant<TObj, typeof key, TObj[K]>) => void) => {
            if (Option.isNone(expr.match) && typeof a[key] === typeof t) {
                cb(a as UnionDiscriminant<TObj, typeof key, TObj[K]>);
                return Object.assign(expr, { match: Option.some(t) });
            }
            return expr;
        },
    };
    return expr;
};

type AsyncAction = Action.IsAsync<AppAction>;

//export const match = createMatch<AppAction>()("type");
//export const matchAsync = createMatch<AsyncAction>()<"operation">("operation");

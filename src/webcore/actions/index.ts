import { Action } from "webcore/actions/core";
import { UnionDiscriminant } from "webcore/utils";

import api from "./api";
import auth from "./auth";
import ui from "./ui";

const syncActionCreators = Object.assign({}, auth, ui, api);
export const ActionCreators = Object.assign({}, syncActionCreators);

export type AppAction = Action.ActionUnion<typeof ActionCreators>;

const getActionType = (a: AppAction) => a.type;
export type ActionType = ReturnType<typeof getActionType>;
export type ActionCase<T extends ActionType> = UnionDiscriminant<AppAction, "type", T>;

export const match = (a: AppAction) => {
    const expr = {
        with: <T extends ActionType>(t: T, cb: (action: ActionCase<T>) => void) => {
            if (a.type === t) {
                cb(a as ActionCase<T>);
            }
            return expr;
        },
    };
    return expr;
};

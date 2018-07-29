import { Action } from "./core";
import { UnionDiscriminant } from "../utils";

import api from "./api";
import auth from "./auth";
import ui from "./ui";

export const ActionCreators = Object.assign({}, auth, ui, api);
export type AppAction = Action.ActionUnion<typeof ActionCreators>;

export type AsyncAppAction = Action.IsAsync<AppAction>;
export type RequestAction = Action.IsRequest<AppAction>;
export type BaseAppAction = Exclude<AppAction, AsyncAppAction>;

export type ActionCase<T extends ActionType> = UnionDiscriminant<AppAction, "type", T>;

export type ActionType = AppAction["type"];
export type AsyncActionType = AsyncAppAction["type"];
export type BaseActionType = BaseAppAction["type"];

export type AsyncOperationType = AsyncAppAction["operation"];

export type AsyncActionCase<TOperation extends AsyncOperationType> =
    UnionDiscriminant<AsyncAppAction, "operation", TOperation>;

import { ActionCase, AsyncActionType, AppAction, BaseActionType, AsyncActionCase, AsyncOperationType, ActionType } from "../actions";
import { ApplicationState } from "../store";
import deepmerge = require("deepmerge");

type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]>; };
const getStateMember = (k: keyof ApplicationState, s: ApplicationState) => s[k];
type StateComponent = ReturnType<typeof getStateMember>;

type deepmergeType = <T>(x: T, y: DeepPartial<T>, options?: deepmerge.Options | undefined) => T;
const doMerge = (deepmerge as any).default as deepmergeType;

type ActionHandler<TState extends StateComponent> =
    (state: TState, initial: TState, mutate: (newState: DeepPartial<TState>) => TState, merge: deepmergeType) => Partial<{
        [K in ActionType]: (action: ActionCase<K>) => TState;
    }>;

const merge = <TBase>(oldState: TBase) => (newProps: DeepPartial<TBase>) => doMerge(oldState, newProps);

export const deepCopy = <T>(o: T) => JSON.parse(JSON.stringify(o)) as T;
type RawActionHandler<TState extends StateComponent> = (action: any) => TState;
export function reduce<TState extends StateComponent>(initState: TState, actionHandler: ActionHandler<TState>) {
    return (state?: TState, action?: AppAction) => {
        if (!action || !state) { return initState; }

        const handler = actionHandler(state, initState, merge(state), doMerge)[action.type] as RawActionHandler<TState>;

        if (handler) {
            return handler(action);
        }

        return state;
    };
}

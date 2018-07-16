import { ActionCase, AsyncActionType, AppAction, BaseActionType, AsyncActionCase, AsyncOperationType } from "webcore/actions";
import { ApplicationState } from "webcore/store";

type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]>; };
const getStateMember = (k: keyof ApplicationState, s: ApplicationState) => s[k];
type StateComponent = ReturnType<typeof getStateMember>;
type ActionHandler<TState extends StateComponent> =
    (state: TState, initial: TState, mutate: (newState: DeepPartial<TState>) => TState) => DeepPartial<{
        [K in BaseActionType]: (action: ActionCase<K>) => TState;
    } & {
        async: {
            [A in AsyncOperationType]: (action: AsyncActionCase<A>) => ;
        }        
    }>;

const merge = <T extends object>(oldState: T) => (newProps: DeepPartial<T>): T => {
    try {
        const merged: any = oldState;

        Object.entries(newProps).forEach(
            ([key, value]) => merged[key] = merged[key] !== undefined && merged[key] instanceof Object ? merge(merged[key])(value) : value);

        return merged as T;
    } catch (e) {
        throw e;
    }
};
const mutate = <TState extends StateComponent>(oldState: TState) => merge(oldState);

export const deepCopy = <T>(o: T) => JSON.parse(JSON.stringify(o)) as T;
type RawActionHandler<TState extends StateComponent> = (action: any) => TState;
export function reduce<TState extends StateComponent>(initState: TState, actionHandler: ActionHandler<TState>) {
    return (state?: TState, action?: AppAction) => {
        if (!action || !state) { return initState; }

        const handler = actionHandler(state, initState, mutate(state))[action.type] as RawActionHandler<TState>;

        if (handler) {
            return handler(action);
        }

        return state;
    };
}

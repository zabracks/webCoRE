import { ActionCase, ActionType, AppAction } from "webcore/actions";
import { ApplicationState } from "webcore/store";

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U>
      ? Array<DeepPartial<U>>
      // tslint:disable-next-line:no-shadowed-variable
      : T[P] extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>
        : DeepPartial<T[P]>
  };

const getStateMember = (k: keyof ApplicationState, s: ApplicationState) => s[k];
type StateComponent = ReturnType<typeof getStateMember>;

type ActionHandler<TState extends StateComponent> =
    (state: TState, initial: TState, mutate: (newState: DeepPartial<TState>) => TState) => Partial<{
    [K in ActionType]: (action: ActionCase<K>) => TState;
}>;

const merge = <T>(oldState: T) => (newProps: DeepPartial<T>) => Object.assign({}, oldState, newProps) as T;
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

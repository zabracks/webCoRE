import { reduce } from "./core";
import defaults from "../store/defaults";

export default reduce(defaults.async, (state, init, mutate) => ({
    "ASYNC/request": a => mutate({
        asyncActions: state.asyncActions.filter(asyncAction => asyncAction.operation === a.operation).length > 0
                ? state.asyncActions
                : state.asyncActions.concat([a]),
    }),
    "ASYNC/response": a => ({
        asyncActions: state.asyncActions.filter(asyncAction => asyncAction.operation != a.operation),
    })
}));

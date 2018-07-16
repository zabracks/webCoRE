import { reduce } from "./core";
import defaults from "../store/defaults";

export default reduce(defaults.async, (state, init, mutate) => ({
    "ASYNC/request": a => mutate({
        asyncActions: state.asyncActions
            .find(asyncAction => asyncAction.type === "ASYNC/request" && asyncAction.operation === a.operation)
                ? state.asyncActions
                : state.asyncActions.concat([a]),
    }),
    "ASYNC/response": a => mutate({
        asyncActions: state.asyncActions
            .filter(asyncAction => asyncAction.type === "ASYNC/request" && asyncAction.operation !== a.operation),
    })
}));

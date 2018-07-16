import { reduce } from "webcore/reducers/core";
import defaults from "webcore/store/defaults";
import { some } from "../utils/option";

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

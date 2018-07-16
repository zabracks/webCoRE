import { reduce } from "./core";
import defaults from "../store/defaults";
import { some } from "../utils/option";

export default reduce(defaults.instance, (state, init, mutate) => ({
    "ASYNC/response": action => mutate({
        remoteState: (() => {
            switch(action.operation) {
                case "API/dashboard-load":
                    return some(action.response.instance);
            default:
                return undefined;
            }
        })(),
    }),
}));

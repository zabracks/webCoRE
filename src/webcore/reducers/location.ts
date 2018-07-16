import { reduce } from "./core";
import defaults from "../store/defaults";
import { some } from "../utils/option";

export default reduce(defaults.location, (state, init, mutate) => ({
    "ASYNC/response": action => mutate({
        remoteState: (() => {
            switch(action.operation) {
                case "API/dashboard-load":
                    return some(action.response.location);
            default:
                return undefined;
            }
        })(),
    }),
}));

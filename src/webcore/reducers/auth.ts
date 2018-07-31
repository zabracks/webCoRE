import { reduce } from "./core";
import defaults from "../store/defaults";
import { some, None } from "../utils/option";
import { extractInstanceUri } from "../utils/legacy";

function atou(str: string) {
    return decodeURIComponent(escape(window.atob(str)));
}

export default reduce(defaults.auth, (state, init, mutate) => ({
    "ASYNC/response": action => mutate({
        instanceUri: (() => {
            switch (action.operation) {
                case "API/dashboard-register":
                    return (l => l >= 80 && l <= 180)(action.response.rawResponse.length)
                                ? some(extractInstanceUri(atou(action.response.rawResponse)))
                                : None;

                default:
                    return state.instanceUri;
            }
        })(),
        token: (() => {
            switch (action.operation) {
                case "API/authenticate":
                    return some(action.response.instance.token);
                default:
                    return state.token;
            }
        })(),
    }),
}));

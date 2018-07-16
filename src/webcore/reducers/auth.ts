import { reduce } from "webcore/reducers/core";
import defaults from "webcore/store/defaults";
import { some, None } from "webcore/utils/option";
import { extractInstanceUri } from "webcore/utils/legacy";
import { DEFAULT_ECDH_CURVE } from "tls";

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
                                : None
                
                default:
                    return state.instanceUri;
            }
        })(),
        token: (() => {
            switch(action.operation) {
                case "API/authenticate":
                    return some(action.response.instance.token);
                default:
                    return state.token;
            }
        })()
    }),
}));

import { reduce } from "webcore/reducers/core";
import defaults from "webcore/store/defaults";
import { some, None } from "webcore/utils/option";
import { extractInstanceUri } from "webcore/utils/legacy";

function atou(str: string) {
    return decodeURIComponent(escape(window.atob(str)));
}

export default reduce(defaults.auth, (state, init, mutate) => ({
    "API/response/dashboard-register": action => mutate({
        instanceUri:
            (l => l >= 80 && l <= 180)(action.payload.response.rawResponse.length)
            ? some(extractInstanceUri(atou(action.payload.response.rawResponse)))
            : None,
    }),

    "API/response/authenticate": action => mutate({
        token: some(action.payload.response.instance.token),
    }),
}));

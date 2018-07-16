import { reduce } from "webcore/reducers/core";
import defaults from "webcore/store/defaults";
import { some } from "../utils/option";

export default reduce(defaults.instance, (state, init, mutate) => ({
    "ASYNC/response": action => ,
    "API/response/dashboard-load": action => mutate({
        remoteState: some(action.payload.response.instance),
    }),
}));

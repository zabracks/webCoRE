import { Action } from "webcore/actions/core";

export default {
    tokenChange: (token: string) => Action.create("AUTH/set-token", { token }),
};

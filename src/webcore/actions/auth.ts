import { Action } from "./core";

export default {
    tokenChange: (token: string) => Action.create("AUTH/set-token", { token }),
};

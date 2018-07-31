import { reduce } from "./core";
import defaults from "../store/defaults";

export default reduce(defaults.ui, (state, init, mutate, doMerge) => {
    return ({
        "UI/toggle-sidebar": action => mutate({
            sidebarOpen: !state.sidebarOpen,
        }),

        "UI/auth/set-registration-code": action => mutate({
            registration: {
                registrationCode: action.payload.code,
            },
        }),

        "UI/auth/set-password": action => mutate({
            registration: {
                password: action.payload.password,
            },
        }),
    });
});

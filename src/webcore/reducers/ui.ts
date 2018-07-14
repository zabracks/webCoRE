import { reduce } from "webcore/reducers/core";
import defaults from "webcore/store/defaults";

export default reduce(defaults.ui, (state, init, mutate) => ({
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
}));

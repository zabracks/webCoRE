import { Action } from "./core";

export default {
    registrationCodeChange: (code: string) => Action.create("UI/auth/set-registration-code", { code }),
    passwordFieldChange: (password: string) => Action.create("UI/auth/set-password", { password }),
};

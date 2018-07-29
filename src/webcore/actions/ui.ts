import { Action } from "./core";

export default {
    ping: () => Action.create("UI/ping"),

    toggleSidebar: () => Action.create("UI/toggle-sidebar"),

    registrationCodeChange: (code: string) => Action.create("UI/auth/set-registration-code", { code }),
    passwordFieldChange: (password: string) => Action.create("UI/auth/set-password", { password }),
};

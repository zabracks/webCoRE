import { ApplicationState } from ".";
import { None } from "../utils/option";

const defaultState: ApplicationState = {
    auth: {
        instanceUri: None,
        token: None,
    },
    ui: {
        sidebarOpen: false,

        registration: {
            registrationCode: "",
            password: "",
            submitted: false,
        },
    },
    instance: None,
    location: {
        remoteState: None,
    },
    async: {
        asyncActions: [],
    },
};

export default defaultState;

import { ApplicationState } from ".";
import { None } from "../utils/option";

const defaultState: ApplicationState = {
    auth: {
        instanceUri: None,
        token: None,
    },
    ui: {
        registration: {
            registrationCode: "",
            password: "",
            submitted: false,
        },
    },
    instance: {
        remoteState: None,
    },
    location: {
        remoteState: None,
    },
    async: {
        asyncActions: [],
    },
};

export default defaultState;

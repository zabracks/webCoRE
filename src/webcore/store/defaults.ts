import { ApplicationState } from "webcore/store";
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
    }
};

export default defaultState;

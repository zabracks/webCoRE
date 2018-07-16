import { Either } from "tsmonad/lib/src";
import { Option } from "../utils/option";
import * as ApiModels from "smartapp-api/models";
import { AppAction } from "../actions";

export interface AuthStatus {
    token: Option<string>;
    instanceUri: Option<string>;
}

export interface InstanceState {
    remoteState: Option<ApiModels.Instance>;
}

export interface LocationState {
    remoteState: Option<ApiModels.Location>;
}

export interface RegistrationState {
    registrationCode: string;
    password: string;
    submitted: boolean;
}

export interface UserInterfaceState {
    registration: RegistrationState;
}

export interface AsyncOrchestration {
    asyncActions: Array<AppAction>;
}

export interface ApplicationState {
    auth: AuthStatus;

    ui: UserInterfaceState;

    instance: InstanceState;
    location: LocationState;

    async: AsyncOrchestration;
}

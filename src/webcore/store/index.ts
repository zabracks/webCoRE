import { Either } from "tsmonad";
import { Option } from "webcore/utils/option";
import * as ApiModels from "smartapp-api/models";

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

export interface ApplicationState {
    auth: AuthStatus;

    ui: UserInterfaceState;

    instance: InstanceState;
    location: LocationState;
}

import { Option } from "../utils/option";
import * as ApiModels from "smartapp-api/models";
import { RequestAction } from "../actions";
import { Category, PistonListing } from "../models";

export interface AuthStatus {
    token: Option<string>;
    instanceUri: Option<string>;
}

export interface InstanceState {
    categories: Array<Category>;
    pistonsIndex: Array<PistonListing>;
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
    sidebarOpen: boolean;

    registration: RegistrationState;
}

export interface AsyncOrchestration {
    asyncActions: Array<RequestAction>;
}

export interface ApplicationState {
    auth: AuthStatus;

    ui: UserInterfaceState;

    instance: Option<InstanceState>;
    location: LocationState;

    async: AsyncOrchestration;
}

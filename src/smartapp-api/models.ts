export type InternalTypeName = string; // TODO: Use explicit string cases
export type InternalTypeValue<T extends InternalTypeName> = any;

export interface ApiErrorResult {
    name: string;
    error: string;
    now: number;
}

export interface PistonListing {
    id: string;
    name: string;
    meta: null | {
        t: number;
        s: {
            t1?: string;
            "new"?: string;
            autoNew?: string;
        };
        c: string | null;
        a: boolean;
        n: number;
        z: string;
    }; // state[hashId(it.id, updateCache)]
}

export interface Category {
    t: string; // TODO: use specific string cases in this type.
    n: string;
    i: number;
}

export interface Settings {
    ifttt_url?: string;
    places?: Array<any>;
    categories: Array<Category>;
}

export interface TypedValue {
    v: any;
    t: string; // TODO: make the whole typedvalue type a union type like actions
}

export interface AccountListing {
    id: string;
}

export interface Instance {
    account: AccountListing;
    pistons: Array<PistonListing>;
    id: string;
    locationId: string;
    name: string;
    uri: string;
    deviceVersion: string;
    coreVersion: string;
    enabled: boolean;
    settings: Settings;
    lifx: {
        scenes?: Array<any>;
        lights?: Array<any>;
        groups?: Array<any>;
        locations?: Array<any>;
    };

    globalVars: {
        [varName: string]: TypedValue,
    }; // listAvailableVariables()
    virtualDevices: any;
}

export type InstanceWithDevices = Instance & {
    contacts: any; // listAvailableContacts(false, updateCache)
    devices: any; // listAvailableDevices(false, updateCache)
};

export type InstanceWithToken = Instance & { token: string; };

export interface Hub {
    id: string;
    name: string;
    firmware: string;
    physical: boolean;
    powerSource: "battery" | "mains";
}

export interface Incident {
    date: number;
    title: string;
    message: string;
    args: Array<any>;
    sourceType: string;
}

export interface Mode {
    id: string;
    name: string;
}

export interface TimeZone {
    id: string;
    name: string;
    offset: number;
}

export interface Location {
    id: string;
    name: string;
    mode: string;
    modes: Array<Mode>;
    shm: string;
    temperatureScale: "C" | "F";
    contactBookEnabled: boolean;
    hubs: Array<Hub>;
    incidents: Array<any>;
    timeZone?: TimeZone;
    zipCode: string;
}

export interface TokenApiRequest {
    token: string;
    dev: string;
}

export interface DashboardActiveRequest {
    dashboard: "0" | "1";
}

export type ApplicationLoadRequest =
    TokenApiRequest & DashboardActiveRequest;

export interface AuthenticateRequestParams {
    pin: string;
}

export interface RawResponse {
    rawResponse: string;
}

export interface BaseApiResponse {
    name: string;
    instance: Instance;
    location: Location;
    now: number;
}

export type AuthenticationApiResult = BaseApiResponse & {
    instance: InstanceWithToken;
};

export interface DashboardData {
    [id: string]: {
        [k: string]: any;
    };
}

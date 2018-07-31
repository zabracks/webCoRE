import { Action } from "./core";
import { ErrorResult } from "smartapp-api/results";
import { AuthenticationApiResult, RawResponse, BaseApiResponse } from "smartapp-api/models";

const apiActions = {
    authenticateApiRequest: (baseUrl: string, password: string) =>
        Action.bindAsync<AuthenticationApiResult>()(Action.create("API/authenticate", { baseUrl, password })),

    registerDashboardRequest: (registrationCode: string) =>
        Action.bindAsync<RawResponse>()(Action.create("API/dashboard-register", { registrationCode })),

    loadDashboardDataRequest: () =>
        Action.bindAsync<BaseApiResponse>()(Action.create("API/dashboard-load", {})),
};

type ApiAction = Action.ActionUnion<typeof apiActions>;

const actions = Object.assign({}, apiActions, {
    apiError: (error: ErrorResult) => Action.create("API/error", { error }),
    configureApi: (baseUrl: string, token: string) => Action.create("API/configure", { baseUrl, token }),
});

export default actions;

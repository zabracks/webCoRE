import { Action } from "webcore/actions/core";
import { ApiResult, ErrorResult } from "smartapp-api/results";
import { AuthenticationApiResult, RawResponse, BaseApiResponse } from "smartapp-api/models";
import client from "smartapp-api/SmartappApiClient";
import { ActionCreators } from ".";

const actions = {
    apiError: (error: ErrorResult) => Action.create("API/error", { error }),

    configureApi: (baseUrl: string, token: string) => Action.create("API/configure", { baseUrl, token }),

    authenticateRequest: (baseUrl: string, password: string) => Action.create("API/request/authenticate", { baseUrl, password }),
    authenticateResponse: (response: AuthenticationApiResult) => Action.create("API/response/authenticate", {response}),

    registerDashboardRequest: (registrationCode: string) => Action.create("API/request/dashboard-register", { registrationCode }),
    registerDashboardResponse: (response: RawResponse) => Action.create("API/response/dashboard-register", { response }),

    loadDashboardDataRequest: () => Action.create("API/request/dashboard-load"),
    loadDashboardDataResponse: (response: BaseApiResponse) => Action.create("API/response/dashboard-load", {response}),

};

export default actions;

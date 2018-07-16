import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import * as Option from "../utils/option";
import { isNone } from "../utils/option";
import { ActionCreators, AppAction } from "../actions";
import { ApplicationState } from "../store";

import SmartappApiClient from "smartapp-api/SmartappApiClient";
import { ApiResult, SuccessResult, ErrorResult } from "smartapp-api/results";
import client from "smartapp-api/SmartappApiClient";

interface ApiConfiguration {
    baseUrl: string;
    token: string;
}

let configuration: Option.Option<ApiConfiguration> = Option.None;

export const ApiRelayMiddleware: Middleware =
    (store: MiddlewareAPI<Dispatch<any>, ApplicationState>) => {
        const dispatch = (aa: AppAction) => Promise.resolve().then(_ => store.dispatch(aa));

        function ifOk<T, U>(successHandler: (s: T) => U) {
            return (res: ApiResult<T>) => {
                if (res.type === "success") {
                    successHandler(res.data);
                } else {
                    dispatch(ActionCreators.apiError(res));
                }
            };
        }

        const getAuthenticatedClient = () => SmartappApiClient("").getAuthenticatedClient("", "");
        type ApiClient = ReturnType<typeof getAuthenticatedClient>;
        let cachedClient = Option.None as Option.Option<ApiClient>;
        const createClient = () => new Promise<ApiClient>((resolve, reject) =>
            isNone(configuration)
                ? reject("Client has not been configured.")
                : resolve(SmartappApiClient(configuration.val.baseUrl).getAuthenticatedClient(configuration.val.token, "")));
        const getClient = () => {
            if (Option.isNone(cachedClient)) {
                return createClient().then(c => {
                    cachedClient = Option.some<ApiClient>(c);
                    return cachedClient.val;
                });
            } else {
                return Promise.resolve(cachedClient.val);
            }
        };

        return (next: Dispatch<AppAction>) => (action: AppAction) => {

            if (isNone(configuration)) {
                const state = store.getState();
                if (Option.isSome(state.auth.instanceUri) && Option.isSome(state.auth.token)) {
                    configuration = Option.some({ baseUrl: state.auth.instanceUri.val, token: state.auth.token.val });
                }
            }

            (() => {
                switch (action.type) {
                    case "API/configure":
                        configuration = Option.some(action.payload);
                        return dispatch(ActionCreators.loadDashboardDataRequest());
                    case "ASYNC/request":
                        const state = store.getState();
                        if(state.async.asyncActions.find(a => a.type === "ASYNC/request" && a.operation === action.operation)) {

                        }
                        return ((a: typeof action) => {
                            switch (a.operation) {
                                case "API/authenticate":
                                    return SmartappApiClient(a.request.baseUrl)
                                        .authenticate(a.request.password)
                                        .then(
                                            ifOk(data => {
                                                configuration = Option.some({
                                                    baseUrl: a.request.baseUrl,
                                                    token: data.instance.token,
                                                });
                                                dispatch(a.response(data));
                                            }));
                                case "API/dashboard-register":
                                    return SmartappApiClient()
                                        .register(a.request.registrationCode)
                                        .then(r => dispatch(a.response(r.data)));
                                case "API/dashboard-load":
                                    return getClient()
                                        .then(c => c.initialLoad())
                                        .then(ifOk(data => dispatch(a.response(data))));
                            }
                        })(action);
                    default:
                        return;
                }
            })();
            return next(action);
        };
    };

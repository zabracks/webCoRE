import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import * as Option from "webcore/utils/option";
import { isNone } from "webcore/utils/option";
import { ActionCreators, AppAction, match } from "../actions";
import { ApplicationState } from "../store";

import SmartappApiClient from "smartapp-api/SmartappApiClient";
import { ApiResult, SuccessResult, ErrorResult } from "smartapp-api/results";

interface ApiConfiguration {
    baseUrl: string;
    token: string;
}

export const ApiRelayMiddleware: Middleware =
    (store: MiddlewareAPI<Dispatch<AppAction>, ApplicationState>) => {
        const dispatch = (aa: AppAction) => Promise.resolve().then(_ => store.dispatch(aa));
        let configuration: Option.Option<ApiConfiguration> = Option.None;

        const ifOk = <T>(successHandler: (s: T) => any) => (res: ApiResult<T>) => {
            if (res.type === "success") {
                successHandler(res.data);
            } else {
                dispatch(ActionCreators.apiError(res));
            }
        };

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
            next(action);

            if (isNone(configuration)) {
                const state = store.getState();
                if (Option.isSome(state.auth.instanceUri) && Option.isSome(state.auth.token)) {
                    configuration = Option.some({ baseUrl: state.auth.instanceUri.val, token: state.auth.token.val });
                }
            }

            match(action)
                .with("API/configure", a =>
                    Promise.resolve(Option.some(a.payload))
                        .then(cfg => configuration = cfg)
                        .then(() => dispatch(ActionCreators.loadDashboardDataRequest())))

                .with("API/request/authenticate", a =>
                    SmartappApiClient(a.payload.baseUrl)
                        .authenticate(a.payload.password)
                        .then(
                            ifOk(data => dispatch(ActionCreators.configureApi(a.payload.baseUrl, data.instance.token))
                                            .then(() => dispatch(ActionCreators.authenticateResponse(data)))
                                            .then(() => dispatch(ActionCreators.loadDashboardDataRequest())))))

                .with("API/request/dashboard-register", a =>
                    SmartappApiClient()
                        .register(a.payload.registrationCode)
                        .then(r => dispatch(ActionCreators.registerDashboardResponse(r.data))))

                .with("API/request/dashboard-load", a =>
                    getClient().then(client => client.initialLoad())
                               .then(ifOk(data => dispatch(ActionCreators.loadDashboardDataResponse(data)))))
                ;
        };
    };

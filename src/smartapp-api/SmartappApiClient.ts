
import * as fetchJsonp from "fetch-jsonp";
import { ApiResult, ErrorResult, SuccessResult } from "./results";
import { ApiErrorResult, ApplicationLoadRequest, AuthenticateRequestParams, AuthenticationApiResult, BaseApiResponse, RawResponse } from "./models";
import * as md5 from 'md5';

interface QueryStringParameter { key: string; value: string; }
type ApiResponse<T> = Promise<ApiResult<T>>;

const WEBCORE_API_BASE_URL = "https://api.webcore.co";

export const GetPaths = (baseUrl: string) => {
    return {
        Register: (code: string) => `${WEBCORE_API_BASE_URL}/dashboard/register/${code}`,
        Dashboard: {
            Load: `${baseUrl}intf/dashboard/load`,
        },
    };
};

interface BaseClientOptions { baseUrl: string; deviceVersion: string; }
type AuthenticatedClientOptions = BaseClientOptions & { token: string; };
type PasswordClientOptions = BaseClientOptions & { password: string; };

export type ClientOptions =
    | AuthenticatedClientOptions
    | PasswordClientOptions;

const INTERNAL_JSONP_CB = "a";

const isErrorResult = (o: ApiErrorResult): o is ApiErrorResult => {
    const e = o as ApiErrorResult;
    return e.name !== undefined && e.error !== undefined && e.now !== undefined;
};

async function parseResponse<T>(r: any): Promise<ApiResult<T>> {
    const parsed = r;
    if (isErrorResult(parsed)) {
        return Promise.resolve(new ErrorResult(parsed));
    } else {
        return Promise.resolve(new SuccessResult(parsed as T));
    }
}

async function parseJsonpResponse<T>(r: any): Promise<ApiResult<T>> {
    if (isErrorResult(r)) {
        return Promise.resolve(new ErrorResult(r as ApiErrorResult));
    } else {
        return Promise.resolve(new SuccessResult(r as T));
    }
}

const addQuerystring = (querystringParameters: Array<QueryStringParameter>) => {
    const qs = new URLSearchParams();
    querystringParameters.forEach(p => {
        qs.append(p.key, p.value);
    });
    return qs;
};

async function performRequest<T>(input: string, init: RequestInit, querystringParameters: Array<QueryStringParameter>): Promise<ApiResult<T>> {
    const response = await fetch(querystringParameters && querystringParameters.length > 0 ? `${input}?${addQuerystring(querystringParameters)}` : input, init);
    return parseResponse<T>(await response.json());
}

async function performJsonp<T>(input: string, querystringParameters?: Array<QueryStringParameter>): Promise<ApiResult<T>> {
    const response = await fetchJsonp(querystringParameters && querystringParameters.length > 0 ? `${input}?${addQuerystring(querystringParameters)}` : input, {
        timeout: 60000,
    });
    return parseJsonpResponse<T>(await response.json());
}

const getParameters = <Q>(querystringParameters: Q): Array<QueryStringParameter> => {
    return querystringParameters !== undefined
            ? Object.keys(querystringParameters)
                    .filter(k => querystringParameters.hasOwnProperty(k))
                    .map(k => ({key: k, value: (querystringParameters as any)[k].toString() }) as QueryStringParameter)
            : [];
};

async function jsonp<T, Q>(input: string, querystringParameters?: Q): ApiResponse<T> {
    return await performJsonp<T>(input, getParameters(querystringParameters));
}

async function get<T, Q>(input: string, querystringParameters?: Q): ApiResponse<T> {
    const init: RequestInit = {
        // credentials: 'include',
    };

    return await performRequest<T>(input, init, getParameters(querystringParameters));
}

async function post<T>(input: string, body?: any, querystringParameters?: Array<QueryStringParameter>) {
    const init: RequestInit = {
        method: "POST",
    };
    const params =
        querystringParameters !== undefined
            ? Object.keys(querystringParameters)
                    .filter(k => querystringParameters.hasOwnProperty(k))
                    .map(k => ({key: k, value: (querystringParameters as any)[k].toString() }) as QueryStringParameter)
            : [];
    return await fetch(input, init);
}

const client = (baseUrl?: string) => {
    const paths = GetPaths(baseUrl || "localhost");

    return {
        register: (code: string) => post<string>(paths.Register(code)).then(async r => new SuccessResult({ rawResponse: await r.text() } as RawResponse)),
        authenticate: (password: string) =>
            jsonp<AuthenticationApiResult, AuthenticateRequestParams>(paths.Dashboard.Load, {
                pin: md5("pin:" + password),
            }),
        getAuthenticatedClient: (token: string, deviceVersion: string) => {
            return {
                initialLoad: () =>
                    jsonp<BaseApiResponse, ApplicationLoadRequest>(paths.Dashboard.Load, {
                        dashboard: "0",
                        token,
                        dev: deviceVersion,
                    }),
            };
        },
    };
};

export default client;

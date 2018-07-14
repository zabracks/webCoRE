import { ApiErrorResult } from "./models";

export class SuccessResult<T> {
    public type: "success";
    public data: T;

    public constructor(data: T) {
        this.type = "success";
        this.data = data;
    }
}

export class ErrorResult {
    public type: "error";
    public data: ApiErrorResult;

    public constructor(error: ApiErrorResult) {
        this.type = "error";
        this.data = error;
    }
}

export type ApiResult<T> =
    | SuccessResult<T>
    | ErrorResult;

import { Result } from "./result";
export default interface Resource<T> {
    httpStatusCode: number;
    resource?: T;
}
export interface ApiResponse<T> extends Resource<T> {
    headers?: Record<string, any>;
}
export interface ApiErrorResponse {
    httpStatusCode?: number;
    errors?: ApiError[];
}
export interface ApiError {
    error?: string;
    errorValues?: Record<string, string>;
    location?: string;
    locationType?: string;
    type?: string;
}
export declare type ApiResult<T> = Result<T, ApiErrorResponse>;

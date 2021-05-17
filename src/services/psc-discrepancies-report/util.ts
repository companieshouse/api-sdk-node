import { HttpResponse } from "../../http";
import Resource, { ApiErrorResponse, ApiError, ApiResponse } from "../../services/resource";
import { failure, success, Result, Success, Failure } from "../result";
import Mapping from "../../mapping/mapping";

type NestedErrors = { errors: ApiError[] }

export default class {
    constructor () { }

    processResponse (resp: HttpResponse): Result<ApiResponse<any>, ApiErrorResponse> {
        if (resp.error) {
            const error: ApiErrorResponse = {
                httpStatusCode: resp.status,
                errors: this.buildErrors(resp.error)
            };
            return failure(error);
        } else {
            return success({
                httpStatusCode: resp.status,
                headers: resp.headers,
                resource: resp.body
            })
        }
    }

    private buildErrors (errors: string | NestedErrors): ApiError[] {
        if (typeof errors === "string") {
            const ret: ApiError = {
                error: errors
            };
            return [ret];
        } else if ((errors as NestedErrors).errors) {
            return (errors as NestedErrors).errors.reduce<ApiError[]>((previousValue, currentValue) => {
                return [...previousValue, Mapping.camelCaseKeys(currentValue)]
            }, []);
        } else {
            return [];
        }
    }
}

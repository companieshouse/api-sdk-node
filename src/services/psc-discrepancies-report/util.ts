import { HttpResponse } from "../../http";
import Resource, { ApiErrorResponse, ApiError, ApiResponse } from "../../services/resource";
import { failure, success, Result, Success, Failure } from "../result";
import Mapping from "../../mapping/mapping";

export default class {
    constructor () { }

    processResponse (resp: HttpResponse) {
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

    private buildErrors (errors: any) {
        if (errors) {
            if (Array.isArray(errors)) {
                return errors.map(error => this.buildErrors(error));
            } else if ((errors as ApiError).type) {
                return Mapping.camelCaseKeys(errors);
            } else if (Object.getOwnPropertyNames(errors).includes("errors") || Object.getOwnPropertyNames(errors).includes("error")) {
                return this.buildErrors(errors.errors ? errors.errors : errors.error);
            } else {
                const ret: ApiError = {
                    error: errors
                };
                return [ret];
            }
        } else {
            return null;
        }
    }
}

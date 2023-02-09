import {
    AccountValidatorRequest, AccountValidatorResponse
} from "./types";
import { HttpResponse, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
export default class {
    constructor (private readonly client: IHttpClient) { }
    /**
     * POST method to submit a file for validation
     * @param accountValidatorRequest 
     * @returns 
     */
    public async postFileForValidation (accountValidatorRequest: AccountValidatorRequest): Promise<Resource<AccountValidatorResponse> | ApiErrorResponse> {
        const resp: HttpResponse =
            await this.client.httpPost("/validate",accountValidatorRequest);

        if (resp.status !== 200) {
            return {
                httpStatusCode: resp.status,
                errors: []
            }
        }

        const resource: Resource<AccountValidatorResponse> = {
            httpStatusCode: resp.status
        };

        return resource;
    }

    /**
     * GET method to check the status of a file for validation request
     * @param fileId 
     * @returns 
     */
    public async getFileValidationStatus (fileId: string): Promise<Resource<AccountValidatorResponse> | ApiErrorResponse> {
        const resp: HttpResponse =
            await this.client.httpGet(`/validate/check/${fileId}`);

        if (resp.status !== 200) {
            return {
                httpStatusCode: resp.status,
                errors: []
            }
        }

        const resource: Resource<AccountValidatorResponse> = {
            httpStatusCode: resp.status
        };

        return resource;
    }
}
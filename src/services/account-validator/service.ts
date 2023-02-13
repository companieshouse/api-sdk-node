import { AccountValidatorRequest, AccountValidatorResponse } from "./types";
import { IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
import Mapping from "../../mapping/mapping";
export default class {
    constructor (private readonly client: IHttpClient) {}
    /**
     * POST method to submit a file for validation
     * @param accountValidatorRequest
     * @returns
     */
    public async postFileForValidation (
        accountValidatorRequest: AccountValidatorRequest
    ): Promise<Resource<AccountValidatorResponse> | ApiErrorResponse> {
        const resp = await this.client.httpPost(
            "/validate",
            accountValidatorRequest
        );

        if (resp.status !== 200) {
            return {
                httpStatusCode: resp.status,
                errors: []
            };
        }

        return {
            httpStatusCode: resp.status,
            resource: Mapping.camelCaseKeys(resp.body)
        };
    }

    /**
     * GET method to check the status of a file for validation request
     * @param fileId
     * @returns
     */
    public async getFileValidationStatus (
        fileId: string
    ): Promise<Resource<AccountValidatorResponse> | ApiErrorResponse> {
        const resp = await this.client.httpGet(`/validate/check/${fileId}`);

        if (resp.status !== 200) {
            return {
                httpStatusCode: resp.status,
                errors: []
            };
        }

        return {
            httpStatusCode: resp.status,
            resource: Mapping.camelCaseKeys(resp.body)
        };
    }
}

import { AccountValidatorRequest, AccountValidatorResponse } from "./types";
import { IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
export default class {
    private readonly client;
    constructor(client: IHttpClient);
    /**
     * POST method to submit a file for validation
     * @param accountValidatorRequest
     * @returns
     */
    postFileForValidation(accountValidatorRequest: AccountValidatorRequest): Promise<Resource<AccountValidatorResponse> | ApiErrorResponse>;
    /**
     * GET method to check the status of a file for validation request
     * @param fileId
     * @returns
     */
    getFileValidationStatus(fileId: string): Promise<Resource<AccountValidatorResponse> | ApiErrorResponse>;
}

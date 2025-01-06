import { PlannedMaintenance, PscVerification, PscVerificationData } from "./types";
import { IHttpClient } from "../../http";
import Resource, { ApiErrorResponse, ApiResponse } from "../resource";
/**
 * The PSC Verification Service expects request body data to be configured in camelCase format and will
 * unwrap this data into snake case format before submitting this on to the PSC verification API. Response
 * body data received from the API is then converted from snake case back into camel case before it is returned.
 */
export default class PscVerificationService {
    private readonly client;
    constructor(client: IHttpClient);
    postPscVerification(transactionId: string, pscVerification: PscVerificationData): Promise<Resource<PscVerification> | ApiErrorResponse>;
    getPscVerification(transactionId: string, pscVerificationId: string): Promise<Resource<PscVerification> | ApiErrorResponse>;
    patchPscVerification(transactionId: string, filingId: string, pscVerificationPatch: PscVerificationData): Promise<Resource<PscVerification> | ApiErrorResponse>;
    checkPlannedMaintenance(): Promise<ApiResponse<PlannedMaintenance> | ApiErrorResponse>;
    private populateFrontEndResource;
}

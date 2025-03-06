import { IHttpClient } from "../../http";
import { LimitedPartnership, LimitedPartnershipResourceCreated, LimitedPartnershipIncorporation } from "./types";
import Resource, { ApiErrorResponse } from "../resource";
export default class LimitedPartnershipsService {
    private readonly client;
    constructor(client: IHttpClient);
    postLimitedPartnership(transactionId: string, body: LimitedPartnership): Promise<Resource<LimitedPartnershipResourceCreated> | ApiErrorResponse>;
    patchLimitedPartnership(transactionId: string, submissionId: string, body: LimitedPartnership["data"]): Promise<Resource<void> | ApiErrorResponse>;
    getLimitedPartnership(transactionId: string, submissionId: string): Promise<Resource<LimitedPartnership> | ApiErrorResponse>;
    postLimitedPartnershipIncorporation(transactionId: string): Promise<Resource<LimitedPartnershipResourceCreated> | ApiErrorResponse>;
    getLimitedPartnershipIncorporation(transactionId: string, filingResourceId: string, includeSubResources?: boolean): Promise<Resource<LimitedPartnershipIncorporation> | ApiErrorResponse>;
}

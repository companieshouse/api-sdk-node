import { IHttpClient } from "../../http";
import { LimitedPartnership, LimitedPartnershipCreated } from "./types";
import Resource, { ApiErrorResponse } from "../resource";
export default class LimitedPartnershipsService {
    private readonly client;
    constructor(client: IHttpClient);
    postLimitedPartnership(transactionId: string, body: LimitedPartnership): Promise<Resource<LimitedPartnershipCreated> | ApiErrorResponse>;
    patchLimitedPartnership(transactionId: string, submissionId: string, body: {
        type: string;
        data: Record<string, any>;
    }): Promise<Resource<void> | ApiErrorResponse>;
}

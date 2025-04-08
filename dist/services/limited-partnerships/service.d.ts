import { IHttpClient } from "../../http";
import { Incorporation, LimitedPartnership, LimitedPartnershipResourceCreated, LimitedPartnershipIncorporation, GeneralPartner } from "./types";
import Resource, { ApiErrorResponse } from "../resource";
export default class LimitedPartnershipsService {
    private readonly client;
    constructor(client: IHttpClient);
    postLimitedPartnership(transactionId: string, body: LimitedPartnership): Promise<Resource<LimitedPartnershipResourceCreated> | ApiErrorResponse>;
    patchLimitedPartnership(transactionId: string, submissionId: string, body: LimitedPartnership["data"]): Promise<Resource<void> | ApiErrorResponse>;
    getLimitedPartnership(transactionId: string, submissionId: string): Promise<Resource<LimitedPartnership> | ApiErrorResponse>;
    postLimitedPartnershipIncorporation(transactionId: string, body: Incorporation): Promise<Resource<LimitedPartnershipResourceCreated> | ApiErrorResponse>;
    getLimitedPartnershipIncorporation(transactionId: string, filingResourceId: string, includeSubResources?: boolean): Promise<Resource<LimitedPartnershipIncorporation> | ApiErrorResponse>;
    postGeneralPartner(transactionId: string, body: GeneralPartner): Promise<Resource<LimitedPartnershipResourceCreated> | ApiErrorResponse>;
    getGeneralPartner(transactionId: string, generalPartnerId: string): Promise<Resource<GeneralPartner> | ApiErrorResponse>;
    patchGeneralPartner(transactionId: string, generalPartnerId: string, body: GeneralPartner["data"]): Promise<Resource<void> | ApiErrorResponse>;
}

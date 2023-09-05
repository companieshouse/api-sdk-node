import { IHttpClient } from "../../http";
import { BeneficialOwnersPrivateData, HttpStatusCode, OverseasEntity, OverseasEntityCreated, OverseasEntityExtraDetails, ManagingOfficersPrivateData } from "./types";
import Resource, { ApiErrorResponse } from "../resource";
export default class OverseasEntityService {
    private readonly client;
    constructor(client: IHttpClient);
    getOverseasEntity(transactionId: string, overseasEntityId: string): Promise<Resource<OverseasEntity> | ApiErrorResponse>;
    getOverseasEntityDetails(transactionId: string, overseasEntityId: string): Promise<Resource<OverseasEntityExtraDetails> | ApiErrorResponse>;
    postOverseasEntity(transactionId: string, body: OverseasEntity, isSaveAndResumeFeatureActive?: boolean): Promise<Resource<OverseasEntityCreated> | ApiErrorResponse>;
    putOverseasEntity(transactionId: string, overseasEntityId: string, body: OverseasEntity): Promise<Resource<HttpStatusCode> | ApiErrorResponse>;
    /**
     * Get private beneficial owner data for an overseas entity
     * @param transactionId of the entity
     * @param overseasEntityId of the entity
     */
    getBeneficialOwnerPrivateData(transactionId: string, overseasEntityId: string): Promise<Resource<BeneficialOwnersPrivateData> | ApiErrorResponse>;
    getManagingOfficersPrivateData(transactionId: string, overseasEntityId: string): Promise<Resource<ManagingOfficersPrivateData> | ApiErrorResponse>;
}

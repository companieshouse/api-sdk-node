import { IHttpClient } from "../../http";
import { HttpStatusCode, OverseasEntity, OverseasEntityCreated, OverseasEntityExtraDetails, BeneficialOwnerPrivateData, ManagingOfficerPrivateData } from "./types";
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
    getBeneficialOwnersPrivateData(transactionId: string, overseasEntityId: string): Promise<Resource<BeneficialOwnerPrivateData[]> | ApiErrorResponse>;
    /**
     * Get private managing officer data for an overseas entity
     * @param transactionId of the entity
     * @param overseasEntityId of the entity
     */
    getManagingOfficersPrivateData(transactionId: string, overseasEntityId: string): Promise<Resource<ManagingOfficerPrivateData[]> | ApiErrorResponse>;
}

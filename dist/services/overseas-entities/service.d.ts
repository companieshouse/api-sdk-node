import { IHttpClient } from "../../http";
import { HttpStatusCode, OverseasEntity, OverseasEntityCreated, OverseasEntityExtraDetails, BeneficialOwnerPrivateData, ManagingOfficerPrivateData, TrustData, TrustLinkData, IndividualTrusteeData, CorporateTrusteeData } from "./types";
import Resource, { ApiErrorResponse } from "../resource";
export default class OverseasEntityService {
    private readonly client;
    constructor(client: IHttpClient);
    getOverseasEntity(transactionId: string, overseasEntityId: string): Promise<Resource<OverseasEntity> | ApiErrorResponse>;
    getOverseasEntityDetails(transactionId: string, overseasEntityId: string): Promise<Resource<OverseasEntityExtraDetails> | ApiErrorResponse>;
    postOverseasEntity(transactionId: string, body: OverseasEntity): Promise<Resource<OverseasEntityCreated> | ApiErrorResponse>;
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
    /**
     *  Get trust data for an overseas entity
     * @param transactionId of the entity
     * @param overseasEntityId of the entity
     * @returns an array of trusts for an overseas entity
     */
    getTrustData(transactionId: string, overseasEntityId: string): Promise<Resource<TrustData[]> | ApiErrorResponse>;
    /**
     * Get trust links data for an overseas entity
     * @param transactionId of the entity
     * @param overseasEntityId of the entity
     * @returns an array of trust links for an overseas entity
     */
    getTrustLinks(transactionId: string, overseasEntityId: string): Promise<Resource<TrustLinkData[]> | ApiErrorResponse>;
    /**
     * Get the individual trustees for a trust
     * @param transactionId of the entity
     * @param overseasEntityId of the entity
     * @param trustId of the trust
     * @returns an array of individual trustees for a trust
    */
    getIndividualTrustees(transactionId: string, overseasEntityId: string, trustId: string): Promise<Resource<IndividualTrusteeData[]> | ApiErrorResponse>;
    /**
     * Get the corporate trustees for a trust
     * @param transactionId of the entity
     * @param overseasEntityId of the entity
     * @param trustId of the trust
     * @returns an array of corporate trustees for a trust
     */
    getCorporateTrustees(transactionId: string, overseasEntityId: string, trustId: string): Promise<Resource<CorporateTrusteeData[]> | ApiErrorResponse>;
}

import { HttpResponse, IHttpClient } from "../../http";
import {
    HttpStatusCode,
    OverseasEntity,
    OverseasEntityCreated,
    OverseasEntityExtraDetails,
    BeneficialOwnerPrivateData,
    BeneficialOwnerPrivateDataResource,
    ManagingOfficerPrivateData,
    ManagingOfficerPrivateDataResource,
    TrustData,
    TrustDataResource,
    TrustLinkData,
    TrustLinkDataResource
} from "./types";
import Resource, { ApiErrorResponse } from "../resource";
import { mapOverseasEntity, mapOverseasEntityExtraDetails, mapOverseasEntityResource } from "./mapping";
import Mapping from "../../mapping/mapping";

export default class OverseasEntityService {
    constructor (private readonly client: IHttpClient) { }

    public async getOverseasEntity (transactionId: string, overseasEntityId: string): Promise< Resource<OverseasEntity> | ApiErrorResponse > {
        const URL = `transactions/${transactionId}/overseas-entity/${overseasEntityId}`
        const response: HttpResponse = await this.client.httpGet(URL);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            };
        }

        const resource: Resource<OverseasEntity> = {
            httpStatusCode: response.status,
            resource: mapOverseasEntityResource(response.body)
        };

        return resource;
    }

    public async getOverseasEntityDetails (transactionId: string, overseasEntityId: string): Promise< Resource<OverseasEntityExtraDetails> | ApiErrorResponse > {
        const URL = `private/transactions/${transactionId}/overseas-entity/${overseasEntityId}/details`
        const response: HttpResponse = await this.client.httpGet(URL);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            };
        }

        const resource: Resource<OverseasEntityExtraDetails> = {
            httpStatusCode: response.status,
            resource: mapOverseasEntityExtraDetails(response.body)
        };

        return resource;
    }

    public async postOverseasEntity (
        transactionId: string,
        body: OverseasEntity,
        isSaveAndResumeFeatureActive: boolean = false
    ): Promise<Resource<OverseasEntityCreated> | ApiErrorResponse> {
        const URL = (isSaveAndResumeFeatureActive)
            ? `/transactions/${transactionId}/overseas-entity/start`
            : `/transactions/${transactionId}/overseas-entity`;
        const response: HttpResponse = await this.client.httpPost(URL, mapOverseasEntity(body));

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            };
        }

        const resource: Resource<OverseasEntityCreated> = {
            httpStatusCode: response.status
        };

        resource.resource = { ...response.body };
        return resource;
    }

    public async putOverseasEntity (transactionId: string, overseasEntityId: string, body: OverseasEntity): Promise<Resource<HttpStatusCode> | ApiErrorResponse> {
        const URL = `transactions/${transactionId}/overseas-entity/${overseasEntityId}`

        const resp = await this.client.httpPut(URL, mapOverseasEntity(body));

        if (resp.error) {
            return {
                httpStatusCode: resp.status,
                errors: [resp.error]
            };
        }

        return { httpStatusCode: resp.status };
    }

    /**
     * Get private beneficial owner data for an overseas entity
     * @param transactionId of the entity
     * @param overseasEntityId of the entity
     */
    public async getBeneficialOwnersPrivateData (transactionId: string, overseasEntityId: string): Promise< Resource<BeneficialOwnerPrivateData[]> | ApiErrorResponse > {
        const URL = `private/transactions/${transactionId}/overseas-entity/${overseasEntityId}/beneficial-owners`
        const response: HttpResponse = await this.client.httpGet(URL);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            };
        }

        const resource: Resource<BeneficialOwnerPrivateData[]> = {
            httpStatusCode: response.status,
            resource: Mapping.camelCaseKeys<BeneficialOwnerPrivateData[]>(response.body as BeneficialOwnerPrivateDataResource[])
        };

        return resource;
    }

    /**
     * Get private managing officer data for an overseas entity
     * @param transactionId of the entity
     * @param overseasEntityId of the entity
     */
    public async getManagingOfficersPrivateData (transactionId: string, overseasEntityId: string): Promise<Resource<ManagingOfficerPrivateData[]> | ApiErrorResponse> {
        const URL = `private/transactions/${transactionId}/overseas-entity/${overseasEntityId}/managing-officers`;
        const response: HttpResponse = await this.client.httpGet(URL);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            };
        }

        const resource: Resource<ManagingOfficerPrivateData[]> = {
            httpStatusCode: response.status,
            resource: Mapping.camelCaseKeys<ManagingOfficerPrivateData[]>(response.body as ManagingOfficerPrivateDataResource[])
        };

        return resource;
    }

    /**
     *  Get trust data for an overseas entity
     * @param transactionId of the entity
     * @param overseasEntityId of the entity
     * @param trustId of the trust
     * @returns an array of trusts for an overseas entity
     */
    public async getTrustData (transactionId: string, overseasEntityId: string, trustId: string): Promise<Resource<TrustData[]> | ApiErrorResponse> {
        const URL = `private/transactions/${transactionId}/overseas-entity/${overseasEntityId}/trust/${trustId}`;
        const response: HttpResponse = await this.client.httpGet(URL);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            };
        }

        const resource: Resource<TrustData[]> = {
            httpStatusCode: response.status,
            resource: response.body as TrustDataResource[] as TrustData[]
        };

        return resource;
    }

    /**
     * Get trust links data for an overseas entity
     * @param transactionId of the entity
     * @param overseasEntityId of the entity
     * @returns an array of trust links for an overseas entity
     */
    public async getTrustLinks (transactionId: string, overseasEntityId: string): Promise<Resource<TrustLinkData[]> | ApiErrorResponse> {
        const URL = `private/transactions/${transactionId}/overseas-entity/${overseasEntityId}/trusts/beneficial-owners/links`;
        const response: HttpResponse = await this.client.httpGet(URL);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            };
        }

        const resource: Resource<TrustLinkData[]> = {
            httpStatusCode: response.status,
            resource: response.body as TrustLinkDataResource[] as TrustLinkData[]
        };

        return resource;
    }
}

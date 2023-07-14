import { HttpResponse, IHttpClient } from "../../http";
import {
    HttpStatusCode,
    OverseasEntity,
    OverseasEntityCreated,
    OverseasEntityExtraDetails
} from "./types";
import Resource, { ApiErrorResponse } from "../resource";
import { mapOverseasEntity, mapOverseasEntityExtraDetails, mapOverseasEntityResource } from "./mapping";

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
}

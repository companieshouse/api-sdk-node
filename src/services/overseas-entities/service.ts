import { HttpResponse, IHttpClient } from "../../http";
import { OverseasEntity, OverseasEntityCreated } from "./types";
import Resource, { ApiErrorResponse } from "../resource";
import { mapOverseasEntity } from "./mapping";

export default class OverseasEntityService {
    constructor (private readonly client: IHttpClient) { }

    public async postOverseasEntity (transactionId: string, body: OverseasEntity): Promise<Resource<OverseasEntityCreated> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/overseas-entity`;
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

    public async putOverseasEntity (transactionId: string, body: OverseasEntity): Promise<Resource<OverseasEntityCreated> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/overseas-entity`;
        const response: HttpResponse = await this.client.httpPut(URL, mapOverseasEntity(body));

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

    // no id returned, so this needs changing
    public async patchOverseasEntity (transactionId: string): Promise<Resource<void> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/overseas-entity`;
        const response: HttpResponse = await this.client.httpPatch(URL);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            };
        }

        const resource: Resource<OverseasEntityCreated> = {
            httpStatusCode: response.status
        };

        return resource;
    }
}

import { HttpResponse, IHttpClient } from "../../http";
import { HttpStatusCode, OverseasEntity, OverseasEntityCreated } from "./types";
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

    public async putOverseasEntity (transactionId: string, overseasEntityId: string, body: OverseasEntity): Promise<Resource<HttpStatusCode> | ApiErrorResponse> {
        const URL = `transactions/${transactionId}/overseas-entity/${overseasEntityId}`

        const resp = await this.client.httpPut(URL, mapOverseasEntity(body));

        if (resp.error) {
            return {
                httpStatusCode: resp.status,
                errors: [resp.error]
            };
        }

        return { httpStatusCode: resp.status }
    }
}

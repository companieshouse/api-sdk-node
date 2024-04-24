import {
    Acsp,
    AcspDto,
    AcspResponse,
    AcspResponseDto
} from "./types";
import { HttpResponse, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
import Mapping from "../../mapping/mapping";

export default class {
    constructor (private readonly client: IHttpClient) { }

    public async getAcsp (transactionId: string, id: string): Promise<Resource<Acsp> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}/acsp/${id}`;
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        const resource: Resource<Acsp> = {
            httpStatusCode: resp.status
        };

        const body = resp.body as AcspDto;

        resource.resource = Mapping.camelCaseKeys<Acsp>(body);

        return resource;
    }

    /**
     * Post an ACSP object to update on the API.
     */
    public async postACSP (transactionId: string, acsp: Acsp): Promise<Resource<AcspResponse> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}/acsp`;

        const resp = await this.client.httpPut(url, acsp);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        const resource: Resource<AcspResponse> = {
            httpStatusCode: resp.status
        };
        const body = resp.body as AcspResponseDto;
        resource.resource = resp.body as AcspResponse
        return resource;
    }
}

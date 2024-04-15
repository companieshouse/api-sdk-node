import {
    Address,
    AddressResource,
    AcspDto
} from "./types";
import { HttpResponse, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
import Mapping from "../../mapping/mapping";

export default class {
    constructor (private readonly client: IHttpClient) { }

    public async getAcsp (transactionId: string, id: string): Promise<Resource<AcspDto> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}/acsp/${id}`;
        const resp: HttpResponse = await this.client.httpGet(url);

        console.log("inside api-sdk-node getAcsp", resp, resp.error);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error], errorString: "acspapi" };
        }

        const resource: Resource<AcspDto> = {
            httpStatusCode: resp.status
        };

        const body = resp.body as AcspDto;

        resource.resource = Mapping.camelCaseKeys<AcspDto>(body);

        return resource;
    }
}

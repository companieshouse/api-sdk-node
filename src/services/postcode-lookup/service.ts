import {HttpResponse, IHttpClient} from "../../http";
import Resource from "../resource";
import {UKAddresses} from "./types";
import Mapping from "../../mapping/mapping";

export default class PostcodeLookupService {
    constructor (private readonly client: IHttpClient) { }

    public async getListOfValidPostcodeAddresses (postcode: string): Promise<Resource<UKAddresses[]>> {
        const url = `${this.getPostcodeLookupUrl()}/valid-addresses/${postcode}`;
        return this.getPostcodeLookupResponse(url);
    }

    private getPostcodeLookupUrl () {
        return `http://postcode.cidev.aws.chdev.org/`;
    }

    private async getPostcodeLookupResponse (url: string): Promise<Resource<UKAddresses[]>> {
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, resource: null };
        }

        const resource: Resource<UKAddresses[]> = { httpStatusCode: resp.status, resource: null };

        const body = resp.body as UKAddresses[];

        resource.resource = Mapping.camelCaseKeys<UKAddresses[]>(body)

        return resource;
    }
}

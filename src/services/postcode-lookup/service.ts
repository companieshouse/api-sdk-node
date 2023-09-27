import {HttpResponse, IHttpClient} from "../../http";
import Resource from "../resource";
import {UKAddresses} from "./types";
import Mapping from "../../mapping/mapping";
import Util from "../psc-discrepancies-report/util"

export default class PostcodeLookupService {
    constructor (readonly client: IHttpClient) {  }

    public async isValidUKPostcode (postcode: string): Promise<boolean> {
        const url = `${this.getPostcodeLookupUrl()}/postcode/${postcode}`;
        console.log(`url is ${url}`);
        return this.getValidatePostcodeLookupResponse(url);
    }

    public async getListOfValidPostcodeAddresses (postcode: string): Promise<Resource<UKAddresses[]>> {
        const url = `${this.getPostcodeLookupUrl()}/multiple-addresses/${postcode}`;
        console.log(`url is ${url}`);
        return this.getPostcodeLookupResponse(url);
    }

    public getPostcodeLookupUrl () {
        return `http://postcode.cidev.aws.chdev.org`;
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

    async getValidatePostcodeLookupResponse (url: string): Promise<boolean> {
        debugger;
        const resp: HttpResponse = await this.client.httpGet(url);
        debugger;
        console.log(resp.status);
        return resp.status === 200;
    }
}

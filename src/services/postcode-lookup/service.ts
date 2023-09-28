import { HttpResponse, IHttpClient } from "../../http";
import Resource from "../resource";
import { UKAddresses } from "./types";
import Mapping from "../../mapping/mapping";
import Util from "../psc-discrepancies-report/util"

export default class PostcodeLookupService {
    constructor (readonly client: IHttpClient) { }

    public async isValidUKPostcode (postcodeValidationUrl: string, postcode: string): Promise<boolean> {
        const url = `${postcodeValidationUrl}/${postcode}`;
        return this.getValidatePostcodeLookupResponse(url);
    }

    public async getListOfValidPostcodeAddresses (postcodeAddressesLookupUrl: string, postcode: string): Promise<Resource<UKAddresses[]>> {
        const url = `${postcodeAddressesLookupUrl}/${postcode}`;
        return this.getPostcodeAddressesLookup(url);
    }

    async getValidatePostcodeLookupResponse (url: string): Promise<boolean> {
        const resp: HttpResponse = await this.client.httpGet(url);
        return resp.status === 200;
    }

    private async getPostcodeAddressesLookup (url: string): Promise<Resource<UKAddresses[]>> {
        const resp: HttpResponse = await this.client.httpGet(url);
        if (resp.status !== 200) {
            return { httpStatusCode: resp.status, resource: {} as UKAddresses[] };
        }
        const resource: Resource<UKAddresses[]> = { httpStatusCode: resp.status, resource: null };
        const body = resp.body as UKAddresses[];
        resource.resource = Mapping.camelCaseKeys<UKAddresses[]>(body)
        return resource;
    }
}

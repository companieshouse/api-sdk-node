import { HttpResponse, IHttpClient } from "../../http";
import Resource from "../resource";
import { UKAddress } from "./types";
import Mapping from "../../mapping/mapping";
import Util from "../psc-discrepancies-report/util"

export default class PostcodeLookupService {
    constructor (readonly client: IHttpClient) { }

    public async isValidUKPostcode (postcodeValidationUrl: string, postcode: string): Promise<boolean> {
        const url = `${postcodeValidationUrl}/${postcode}`;
        return this.getValidatePostcodeLookupResponse(url);
    }

    public async getListOfValidPostcodeAddresses (postcodeAddressesLookupUrl: string, postcode: string): Promise<Resource<UKAddress[]>> {
        const url = `${postcodeAddressesLookupUrl}/${postcode}`;
        return this.getPostcodeAddressesLookup(url);
    }

    private async getValidatePostcodeLookupResponse (url: string): Promise<boolean> {
        const resp: HttpResponse = await this.client.httpGet(url);
        return resp.status === 200;
    }

    private async getPostcodeAddressesLookup (url: string): Promise<Resource<UKAddress[]>> {
        const resp: HttpResponse = await this.client.httpGet(url);
        if (resp.status !== 200) {
            return { httpStatusCode: resp.status, resource: {} as UKAddress[] };
        }
        const resource: Resource<UKAddress[]> = { httpStatusCode: resp.status, resource: null };
        const body = resp.body as UKAddress[];
        resource.resource = Mapping.camelCaseKeys<UKAddress[]>(body)
        return resource;
    }
}

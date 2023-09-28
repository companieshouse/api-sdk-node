import { IHttpClient } from "../../http";
import Resource from "../resource";
import { UKAddresses } from "./types";
export default class PostcodeLookupService {
    readonly client: IHttpClient;
    constructor(client: IHttpClient);
    isValidUKPostcode(postcodeValidationUrl: string, postcode: string): Promise<boolean>;
    getListOfValidPostcodeAddresses(postcodeAddressesLookupUrl: string, postcode: string): Promise<Resource<UKAddresses[]>>;
    getValidatePostcodeLookupResponse(url: string): Promise<boolean>;
    private getPostcodeAddressesLookup;
}

import { IHttpClient } from "../../http";
import Resource from "../resource";
import { UKAddress } from "./types";
export default class PostcodeLookupService {
    readonly client: IHttpClient;
    constructor(client: IHttpClient);
    isValidUKPostcode(postcodeValidationUrl: string, postcode: string): Promise<boolean>;
    getListOfValidPostcodeAddresses(postcodeAddressesLookupUrl: string, postcode: string): Promise<Resource<UKAddress[]>>;
    private getValidatePostcodeLookupResponse;
    private getPostcodeAddressesLookup;
}

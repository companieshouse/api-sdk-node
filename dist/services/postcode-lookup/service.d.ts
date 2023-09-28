import { IHttpClient } from "../../http";
import Resource from "../resource";
import { UKAddresses } from "./types";
import Util from "../psc-discrepancies-report/util";
export default class PostcodeLookupService {
    readonly client: IHttpClient;
    utility: Util;
    constructor(client: IHttpClient);
    isValidUKPostcode(postcodeValidationUrl: string, postcode: string): Promise<boolean>;
    getListOfValidPostcodeAddresses(postcodeAddressesLookupUrl: string, postcode: string): Promise<Resource<UKAddresses[]>>;
    private getPostcodeAddressesLookup;
    getValidatePostcodeLookupResponse(url: string): Promise<boolean>;
}

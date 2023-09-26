import { IHttpClient } from "../../http";
import Resource from "../resource";
import { UKAddresses } from "./types";
export default class PostcodeLookupService {
    private readonly client;
    constructor(client: IHttpClient);
    isValidUKPostcode(postcode: string): Promise<Resource<UKAddresses>>;
    getListOfValidPostcodeAddresses(postcode: string): Promise<Resource<UKAddresses[]>>;
    private getPostcodeLookupUrl;
    private getPostcodeLookupResponse;
    private getValidatePostcodeLookupResponse;
}

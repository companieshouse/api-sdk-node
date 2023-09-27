import { IHttpClient } from "../../http";
import Resource from "../resource";
import { UKAddresses } from "./types";
export default class PostcodeLookupService {
    readonly client: IHttpClient;
    constructor(client: IHttpClient);
    isValidUKPostcode(postcode: string): Promise<boolean>;
    getListOfValidPostcodeAddresses(postcode: string): Promise<Resource<UKAddresses[]>>;
    getPostcodeLookupUrl(): string;
    private getPostcodeLookupResponse;
    getValidatePostcodeLookupResponse(url: string): Promise<boolean>;
}

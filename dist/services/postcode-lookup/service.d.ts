import { IHttpClient } from "../../http";
import Resource from "../resource";
import { UKAddresses } from "./types";
export default class PostcodeLookupService {
    private readonly client;
    constructor(client: IHttpClient);
    getListOfValidPostcodeAddresses(postcode: string): Promise<Resource<UKAddresses>>;
    private getPostcodeLookupUrl;
    private getPostcodeLookupResponse;
}

import { IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
import { RegisteredEmailAddressCreatedResource, RegisteredEmailAddress } from "./types";
export default class RegisteredEmailAddressService {
    private readonly client;
    constructor(client: IHttpClient);
    /**
     * Create a Registered Email Address.
     *
     * @param transactionId
     * @param registeredEmailAddress
     */
    postRegisteredEmailAddress(transactionId: string, registeredEmailAddress: RegisteredEmailAddress): Promise<Resource<RegisteredEmailAddressCreatedResource> | ApiErrorResponse>;
    private populateResource;
    private mapToResource;
}

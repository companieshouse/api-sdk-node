import { IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
import { RegisteredEmailAddress, RegisteredEmailAddressResource } from "./types";

export default class RegisteredEmailAddressService {
    constructor (private readonly client: IHttpClient) {
    }

    /**
     * Create a Registered Email Address.
     *
     * @param transactionId
     * @param registeredEmailAddress
     */
    public async postRegisteredEmailAddress (transactionId: string, registeredEmailAddress: RegisteredEmailAddress): Promise<Resource<RegisteredEmailAddress> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}/registered-email-address`;

        const registeredEmailAddressResource: RegisteredEmailAddressResource = this.mapToResource(registeredEmailAddress);

        const resp = await this.client.httpPost(url, registeredEmailAddressResource);

        if (resp.error) {
            return Promise.reject(resp);
        }

        const resource: Resource<RegisteredEmailAddress> = {
            httpStatusCode: resp.status
        };

        // cast the response body to the expected type
        const body = resp.body as RegisteredEmailAddressResource;

        this.populateResource(resource, body);

        return Promise.resolve(resource);
    }

    private populateResource (resource: Resource<RegisteredEmailAddress>, body: RegisteredEmailAddressResource) {
        resource.resource = {
            registeredEmailAddress: body.registered_email_address,
            acceptAppropriateEmailAddressStatement: body.accept_appropriate_email_address_statement
        };
    }

    private mapToResource (registeredEmailAddress: RegisteredEmailAddress): RegisteredEmailAddressResource {
        return {
            registered_email_address: registeredEmailAddress.registeredEmailAddress,
            accept_appropriate_email_address_statement: registeredEmailAddress.acceptAppropriateEmailAddressStatement
        }
    }
}

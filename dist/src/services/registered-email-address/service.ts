import { IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
import {
    RegisteredEmailAddressCreatedResource,
    RegisteredEmailAddress,
    RegisteredEmailAddressResource,
    RegisteredEmailAddressResponse
} from "./types";

export default class RegisteredEmailAddressService {
    constructor (private readonly client: IHttpClient) {
    }

    /**
     * Create a Registered Email Address.
     *
     * @param transactionId
     * @param registeredEmailAddress
     */
    public async postRegisteredEmailAddress (transactionId: string, registeredEmailAddress: RegisteredEmailAddress): Promise<Resource<RegisteredEmailAddressCreatedResource> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}/registered-email-address`;

        const registeredEmailAddressResource: RegisteredEmailAddressResource = this.mapToResource(registeredEmailAddress);

        const resp = await this.client.httpPost(url, registeredEmailAddressResource);

        if (resp.error) {
            return Promise.reject(resp);
        }

        const resource: Resource<RegisteredEmailAddressCreatedResource> = {
            httpStatusCode: resp.status
        };

        // cast the response body to the expected type
        const body = resp.body as RegisteredEmailAddressResponse;

        this.populateResource(resource, body);

        return Promise.resolve(resource);
    }

    private populateResource (resource: Resource<RegisteredEmailAddressCreatedResource>, body: RegisteredEmailAddressResponse) {
        resource.resource = {
            id: body.id,
            data: {
                registeredEmailAddress: body.data.registered_email_address,
                acceptAppropriateEmailAddressStatement: body.data.accept_appropriate_email_address_statement,
                etag: body.data.etag,
                kind: body.data.kind
            },
            createdAt: body.created_at,
            updatedAt: body.updated_at,
            links: {
                self: body.links.self
            }
        };
    }

    private mapToResource (registeredEmailAddress: RegisteredEmailAddress): RegisteredEmailAddressResource {
        return {
            registered_email_address: registeredEmailAddress.registeredEmailAddress,
            accept_appropriate_email_address_statement: registeredEmailAddress.acceptAppropriateEmailAddressStatement
        }
    }
}

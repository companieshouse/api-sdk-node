"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class RegisteredEmailAddressService {
    constructor(client) {
        this.client = client;
    }
    /**
     * Create a Registered Email Address.
     *
     * @param transactionId
     * @param registeredEmailAddress
     */
    postRegisteredEmailAddress(transactionId, registeredEmailAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/transactions/${transactionId}/registered-email-address`;
            const registeredEmailAddressResource = this.mapToResource(registeredEmailAddress);
            const resp = yield this.client.httpPost(url, registeredEmailAddressResource);
            if (resp.error) {
                return Promise.reject(resp);
            }
            const resource = {
                httpStatusCode: resp.status
            };
            // cast the response body to the expected type
            const body = resp.body;
            this.populateResource(resource, body);
            return Promise.resolve(resource);
        });
    }
    populateResource(resource, body) {
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
    mapToResource(registeredEmailAddress) {
        return {
            registered_email_address: registeredEmailAddress.registeredEmailAddress,
            accept_appropriate_email_address_statement: registeredEmailAddress.acceptAppropriateEmailAddressStatement
        };
    }
}
exports.default = RegisteredEmailAddressService;
//# sourceMappingURL=service.js.map
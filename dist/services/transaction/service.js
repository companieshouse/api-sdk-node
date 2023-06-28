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
class TransactionService {
    constructor(client) {
        this.client = client;
    }
    /**
   * Post a transaction.
   *
   * @param transaction the transaction to create
   */
    postTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = "/transactions";
            if (transaction.id) {
                url += "/" + transaction.id;
            }
            const transactionResource = this.mapToResource(transaction);
            const resp = yield this.client.httpPost(url, transactionResource);
            if (resp.error) {
                return {
                    httpStatusCode: resp.status,
                    errors: [resp.error]
                };
            }
            const resource = {
                httpStatusCode: resp.status
            };
            // cast the response body to the expected type
            const body = resp.body;
            this.populateResource(resource, body);
            return resource;
        });
    }
    /**
     * Put a transaction
     *
     * @param replacment transaction
     */
    putTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "/transactions/" + transaction.id;
            const transactionResource = this.mapToResource(transaction);
            const resp = yield this.client.httpPut(url, transactionResource);
            if (resp.error) {
                return {
                    httpStatusCode: resp.status,
                    errors: [resp.error]
                };
            }
            const resource = {
                headers: resp.headers,
                httpStatusCode: resp.status
            };
            return resource;
        });
    }
    populateResource(resource, body) {
        resource.resource = {
            id: body.id,
            etag: body.etag,
            links: body.links,
            reference: body.reference,
            status: body.status,
            kind: body.kind,
            companyName: body.company_name,
            companyNumber: body.company_number,
            createdAt: body.created_at,
            createdBy: body.created_by,
            updatedAt: body.updated_at,
            description: body.description,
            resources: body.resources
        };
    }
    /**
     * Get a transaction.
     *
     * @param transactionId the id of the transaction to retrieve
     */
    getTransaction(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "/transactions/" + transactionId;
            const resp = yield this.client.httpGet(url);
            if (resp.error) {
                return {
                    httpStatusCode: resp.status,
                    errors: [resp.error]
                };
            }
            const resource = {
                httpStatusCode: resp.status
            };
            // cast the response body to the expected type
            const body = resp.body;
            resource.resource = {
                id: body.id,
                etag: body.etag,
                links: body.links,
                reference: body.reference,
                status: body.status,
                kind: body.kind,
                companyName: body.company_name,
                companyNumber: body.company_number,
                createdAt: body.created_at,
                createdBy: body.created_by,
                updatedAt: body.updated_at,
                description: body.description,
                resources: body.resources
            };
            return resource;
        });
    }
    mapToResource(transaction) {
        return {
            company_name: transaction.companyName,
            company_number: transaction.companyNumber,
            created_at: transaction.createdAt,
            created_by: transaction.createdBy,
            description: transaction.description,
            etag: transaction.etag,
            id: transaction.id,
            kind: transaction.kind,
            links: transaction.links,
            reference: transaction.reference,
            resources: transaction.resources,
            status: transaction.status,
            updated_at: transaction.updatedAt
        };
    }
}
exports.default = TransactionService;
//# sourceMappingURL=service.js.map
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mapping_1 = __importDefault(require("../../mapping/mapping"));
/**
 * The PSC Verification Service expects request body data to be configured in camelCase format and will
 * unwrap this data into snake case format before submitting this on to the PSC verification API. Response
 * body data received from the API is then converted from snake case back into camel case before it is returned.
 */
class PscVerificationService {
    constructor(client) {
        this.client = client;
    }
    postPscVerification(transactionId, pscVerification) {
        return __awaiter(this, void 0, void 0, function* () {
            const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification`;
            const pscVerificationResource = mapping_1.default.snakeCaseKeys(pscVerification);
            const response = yield this.client.httpPost(resourceUri, pscVerificationResource);
            if (response.error) {
                return {
                    httpStatusCode: response.status,
                    errors: [response.error]
                };
            }
            return this.populateFrontEndResource(response);
        });
    }
    getPscVerification(transactionId, pscVerificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification/${pscVerificationId}`;
            const response = yield this.client.httpGet(resourceUri);
            if (response.error) {
                return {
                    httpStatusCode: response.status,
                    errors: [response.error]
                };
            }
            return this.populateFrontEndResource(response);
        });
    }
    patchPscVerification(transactionId, filingId, pscVerificationPatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const additionalHeaders = { "Content-Type": "application/merge-patch+json" };
            const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification/${filingId}`;
            const pscVerificationPatchResource = mapping_1.default.snakeCaseKeys(pscVerificationPatch);
            const response = yield this.client.httpPatch(resourceUri, pscVerificationPatchResource, additionalHeaders);
            if (response.error) {
                return {
                    httpStatusCode: response.status,
                    errors: [response.error]
                };
            }
            return this.populateFrontEndResource(response);
        });
    }
    getValidationStatus(transactionId, pscVerificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification/${pscVerificationId}/validation_status`;
            const response = yield this.client.httpGet(resourceUri);
            if (response.status >= 400) {
                return { httpStatusCode: response.status, errors: [response.error] };
            }
            const resource = { httpStatusCode: response.status };
            const body = response.body;
            resource.resource = mapping_1.default.camelCaseKeys(body);
            return resource;
        });
    }
    populateFrontEndResource(response) {
        const frontEndResource = {
            httpStatusCode: response.status,
            resource: response.body
        };
        const body = response.body;
        frontEndResource.resource = mapping_1.default.camelCaseKeys(body);
        return frontEndResource;
    }
}
exports.default = PscVerificationService;
//# sourceMappingURL=service.js.map
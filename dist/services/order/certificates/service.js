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
const mapping_1 = __importDefault(require("../../../mapping/mapping"));
const result_1 = require("../../result");
class default_1 {
    constructor(client) {
        this.client = client;
    }
    getCertificate(certificateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.httpGet(`/orderable/certificates/${certificateId}`);
            return this.handleResponse(response);
        });
    }
    // Create a whole certificate item in one invocation
    postCertificate(certificateItemRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.httpPost("/orderable/certificates", mapping_1.default.snakeCaseKeys(certificateItemRequest));
            return this.handleResponse(response);
        });
    }
    /*
     * Create a partial certificate item with an initial request.
     *
     * Note: use patchCertificate to add or amend certificate item properties.
     */
    postInitialCertificate(certificateItemRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.httpPost("/orderable/certificates/initial", mapping_1.default.snakeCaseKeys(certificateItemRequest));
            return this.handleResponse(response);
        });
    }
    /*
     * Add or amend certificate item properties; there can be one or more patch requests.
     *
     * Note: use this method after a call to postInitialCertificate.
     */
    patchCertificate(certificateItemRequest, certificateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const additionalHeaders = {
                "Content-Type": "application/merge-patch+json"
            };
            const response = yield this.client.httpPatch(`/orderable/certificates/${certificateId}`, mapping_1.default.snakeCaseKeys(certificateItemRequest), additionalHeaders);
            return this.handleResponse(response);
        });
    }
    handleResponse(serverResponse) {
        const response = {
            httpStatusCode: serverResponse.status
        };
        if (serverResponse.error) {
            return result_1.failure({
                httpStatusCode: serverResponse.status,
                errors: serverResponse.error.errors
            });
        }
        else {
            response.resource = mapping_1.default.camelCaseKeys(serverResponse.body);
            return result_1.success(response);
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=service.js.map
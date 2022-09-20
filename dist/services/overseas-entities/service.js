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
const mapping_1 = require("./mapping");
class OverseasEntityService {
    constructor(client) {
        this.client = client;
    }
    postOverseasEntity(transactionId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const URL = `/transactions/${transactionId}/overseas-entity`;
            const response = yield this.client.httpPost(URL, mapping_1.mapOverseasEntity(body));
            if (response.error) {
                return {
                    httpStatusCode: response.status,
                    errors: [response.error]
                };
            }
            const resource = {
                httpStatusCode: response.status
            };
            resource.resource = Object.assign({}, response.body);
            return resource;
        });
    }
    /**
     * Proof of concept for ROE-1271
     * Not to be used for Live code
     * @param transactionId
     * @param body
     * @returns
     */
    proofOfConceptPutOverseasEntity(transactionId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const URL = `/transactions/${transactionId}/overseas-entity`;
            const response = yield this.client.httpPut(URL, mapping_1.mapOverseasEntity(body));
            if (response.error) {
                return {
                    httpStatusCode: response.status,
                    errors: [response.error]
                };
            }
            const resource = {
                httpStatusCode: response.status
            };
            resource.resource = Object.assign({}, response.body);
            return resource;
        });
    }
    /**
     * Proof of concept for ROE-1271
     * Not to be used for Live code
     * @param transactionId
     * @returns
     */
    // no id returned, so this needs changing
    proofOfConceptPatchOverseasEntity(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const URL = `/transactions/${transactionId}/overseas-entity`;
            const response = yield this.client.httpPatch(URL);
            if (response.error) {
                return {
                    httpStatusCode: response.status,
                    errors: [response.error]
                };
            }
            const resource = {
                httpStatusCode: response.status
            };
            return resource;
        });
    }
}
exports.default = OverseasEntityService;
//# sourceMappingURL=service.js.map
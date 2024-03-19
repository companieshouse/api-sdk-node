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
class default_1 {
    constructor(client) {
        this.client = client;
    }
    postPscVerification(transactionId, pscVerification) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/transactions/${transactionId}/persons-with-significant-control-verification`;
            const response = yield this.client.httpPost(url, pscVerification);
            if (response.error) {
                return {
                    httpStatusCode: response.status,
                    errors: [response.error]
                };
            }
            const resource = {
                httpStatusCode: response.status
            };
            const body = response.body;
            this.populateResource(resource, body);
            return resource;
        });
    }
    populateResource(resource, body) {
        resource.resource = body;
    }
}
exports.default = default_1;
//# sourceMappingURL=service.js.map
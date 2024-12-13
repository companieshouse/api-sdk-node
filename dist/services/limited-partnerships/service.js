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
class LimitedPartnershipsService {
    constructor(client) {
        this.client = client;
    }
    postLimitedPartnership(transactionId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const URL = `/transactions/${transactionId}/limited-partnership/partnership`;
            const response = yield this.client.httpPost(URL, body);
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
    patchLimitedPartnership(transactionId, submissionId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const URL = `/transactions/${transactionId}/limited-partnership/partnership/${submissionId}`;
            const response = yield this.client.httpPatch(URL, body);
            if (response.error) {
                return {
                    httpStatusCode: response.status,
                    errors: [response.error]
                };
            }
            return {
                httpStatusCode: response.status
            };
        });
    }
}
exports.default = LimitedPartnershipsService;
//# sourceMappingURL=service.js.map
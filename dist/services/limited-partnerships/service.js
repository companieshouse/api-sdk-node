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
            return {
                httpStatusCode: response.status,
                resource: Object.assign({}, response.body)
            };
        });
    }
    patchLimitedPartnership(transactionId, submissionId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const URL = `/transactions/${transactionId}/limited-partnership/partnership/${submissionId}`;
            const response = yield this.client.httpPatch(URL, body);
            return {
                httpStatusCode: response.status,
                resource: Object.assign({}, response.body)
            };
        });
    }
    getLimitedPartnership(transactionId, submissionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const URL = `/transactions/${transactionId}/limited-partnership/partnership/${submissionId}`;
            const response = yield this.client.httpGet(URL);
            return {
                httpStatusCode: response.status,
                resource: Object.assign({}, response.body)
            };
        });
    }
}
exports.default = LimitedPartnershipsService;
//# sourceMappingURL=service.js.map
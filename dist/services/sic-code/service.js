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
    getCondensedSicCodes() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "/internal/condensed-sic-codes";
            const resp = yield this.client.httpGet(url);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error && resp.status !== 400) {
                resource.resource = resp.error;
                return resource;
            }
            const apiResource = resp.body ? resp.body : resp.error;
            if (!apiResource) {
                throw new Error(`No body or error body returned from ${url} API call - http status from API = ${resp.status}`);
            }
            resource.resource = apiResource;
            return resource;
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=service.js.map
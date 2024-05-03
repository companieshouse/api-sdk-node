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
class default_1 {
    constructor(client) {
        this.client = client;
    }
    getAcsp(transactionId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/transactions/${transactionId}/acsp/${id}`;
            const resp = yield this.client.httpGet(url);
            if (resp.status >= 400) {
                return { httpStatusCode: resp.status, errors: [resp.error] };
            }
            const resource = {
                httpStatusCode: resp.status
            };
            const body = resp.body;
            resource.resource = mapping_1.default.camelCaseKeys(body);
            return resource;
        });
    }
    /**
     * Post an ACSP object to update on the API.
     */
    postACSP(transactionId, acsp) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/transactions/${transactionId}/acsp`;
            const resp = yield this.client.httpPut(url, acsp);
            if (resp.status >= 400) {
                return { httpStatusCode: resp.status, errors: [resp.error] };
            }
            const resource = {
                httpStatusCode: resp.status
            };
            const body = resp.body;
            resource.resource = resp.body;
            return resource;
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=service.js.map
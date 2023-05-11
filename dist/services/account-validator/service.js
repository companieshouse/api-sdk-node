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
    /**
     * POST method to submit a file for validation
     * @param accountValidatorRequest
     * @returns
     */
    postFileForValidation(accountValidatorRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpPost("/validate", accountValidatorRequest);
            if (resp.status !== 200) {
                return {
                    httpStatusCode: resp.status,
                    errors: []
                };
            }
            return {
                httpStatusCode: resp.status,
                resource: mapping_1.default.camelCaseKeys(resp.body)
            };
        });
    }
    /**
     * GET method to check the status of a file for validation request
     * @param fileId
     * @returns
     */
    getFileValidationStatus(fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpGet(`/validate/check/${fileId}`);
            if (resp.status !== 200) {
                return {
                    httpStatusCode: resp.status,
                    errors: []
                };
            }
            return {
                httpStatusCode: resp.status,
                resource: mapping_1.default.camelCaseKeys(resp.body)
            };
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=service.js.map
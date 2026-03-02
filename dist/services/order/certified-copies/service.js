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
class CertifiedCopyService {
    constructor(client) {
        this.client = client;
    }
    getCertifiedCopy(certifiedCopyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpGet(`/orderable/certified-copies/${certifiedCopyId}`);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            const body = resp.body;
            resource.resource = mapping_1.default.camelCaseKeys(body, CertifiedCopyService.EXCLUDED_FIELDS);
            return resource;
        });
    }
    ;
    /*
     * Add or amend certified copy item properties; there can be one or more patch requests.
     *
     * Note: use this method after the certified copy item has been created.
     */
    patchCertifiedCopy(certifiedCopyItemRequest, certifiedCopyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const additionalHeaders = {
                "Content-Type": "application/merge-patch+json"
            };
            const response = yield this.client.httpPatch(`/orderable/certified-copies/${certifiedCopyId}`, mapping_1.default.snakeCaseKeys(certifiedCopyItemRequest), additionalHeaders);
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
exports.default = CertifiedCopyService;
CertifiedCopyService.EXCLUDED_FIELDS = {
    deep: true,
    stopPaths: [
        "description_values",
        "item_options.filing_history_documents.filing_history_description_values" // certified copies
    ]
};
;
//# sourceMappingURL=service.js.map
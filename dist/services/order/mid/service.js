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
class MissingImageDeliveryService {
    constructor(client) {
        this.client = client;
    }
    getMid(missingImageDeliveryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpGet(`/orderable/missing-image-deliveries/${missingImageDeliveryId}`);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            const body = resp.body;
            resource.resource = mapping_1.default.camelCaseKeys(body, MissingImageDeliveryService.EXCLUDED_FIELDS);
            return resource;
        });
    }
    ;
    postMid(midItemRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const midItemRequestResource = mapping_1.default.snakeCaseKeys(midItemRequest);
            const resp = yield this.client.httpPost("/orderable/missing-image-deliveries", midItemRequestResource);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            const body = resp.body;
            resource.resource = mapping_1.default.camelCaseKeys(body, MissingImageDeliveryService.EXCLUDED_FIELDS);
            return resource;
        });
    }
    ;
}
exports.default = MissingImageDeliveryService;
MissingImageDeliveryService.EXCLUDED_FIELDS = {
    deep: true,
    stopPaths: [
        "description_values",
        "item_options.filing_history_description_values"
    ]
};
;
//# sourceMappingURL=service.js.map
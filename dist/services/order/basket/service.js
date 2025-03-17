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
const result_1 = require("../../result");
const mapping_1 = __importDefault(require("../../../mapping/mapping"));
const mapping_2 = __importDefault(require("./mapping"));
class BasketService {
    constructor(client) {
        this.client = client;
    }
    getBasket() {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpGet("/basket");
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            const body = resp.body;
            resource.resource = mapping_1.default.camelCaseKeys(body, BasketService.EXCLUDED_FIELDS_FULL_BASKET);
            return resource;
        });
    }
    patchBasket(basketRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const basketRequestResource = mapping_2.default.mapBasketRequestToBasketRequestResource(basketRequest);
            const additionalHeaders = {
                "Content-Type": "application/merge-patch+json"
            };
            const resp = yield this.client.httpPatch("/basket", basketRequestResource, additionalHeaders);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            const body = resp.body;
            resource.resource = mapping_1.default.camelCaseKeys(body, BasketService.EXCLUDED_FIELDS_FULL_BASKET);
            return resource;
        });
    }
    postItemToBasket(itemUriRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.addItemToBasket("/basket/items", itemUriRequest);
        });
    }
    appendItemToBasket(itemUriRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.addItemToBasket("/basket/items/append", itemUriRequest);
        });
    }
    checkoutBasket() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpPost("/basket/checkouts");
            const result = {
                httpStatusCode: resp.status,
                headers: resp.headers
            };
            if (resp.error) {
                return result_1.failure({
                    httpStatusCode: resp.status,
                    errors: ((_a = resp === null || resp === void 0 ? void 0 : resp.error) === null || _a === void 0 ? void 0 : _a.errors) || resp.error
                });
            }
            const body = resp.body;
            result.resource = mapping_1.default.camelCaseKeys(body, BasketService.EXCLUDED_FIELDS_FULL_BASKET);
            return result_1.success(result);
        });
    }
    getBasketLinks() {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpGet("/basket/links");
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            const body = resp.body;
            resource.resource = mapping_1.default.camelCaseKeys(body);
            return resource;
        });
    }
    removeBasketItem(itemUriRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemUriRequestResource = mapping_1.default.snakeCaseKeys(itemUriRequest);
            const response = yield this.client.httpPut("/basket/items/remove", itemUriRequestResource);
            return {
                httpStatusCode: response.status
            };
        });
    }
    addItemToBasket(path, itemUriRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemUriRequestResource = mapping_1.default.snakeCaseKeys(itemUriRequest);
            const resp = yield this.client.httpPost(path, itemUriRequestResource);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            const body = resp.body;
            resource.resource = mapping_1.default.camelCaseKeys(body, BasketService.EXCLUDED_FIELDS_SINGLE_ITEM_BASKET);
            return resource;
        });
    }
}
exports.default = BasketService;
BasketService.EXCLUDED_FIELDS_FULL_BASKET = {
    deep: true,
    stopPaths: [
        "items.description_values",
        "items.item_options.filing_history_description_values",
        "items.item_options.filing_history_documents.filing_history_description_values" // certified copies
    ]
};
BasketService.EXCLUDED_FIELDS_SINGLE_ITEM_BASKET = {
    deep: true,
    stopPaths: [
        "description_values",
        "item_options.filing_history_description_values",
        "item_options.filing_history_documents.filing_history_description_values" // certified copies
    ]
};
//# sourceMappingURL=service.js.map
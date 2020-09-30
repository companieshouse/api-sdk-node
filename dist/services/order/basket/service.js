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
const mapping_1 = __importDefault(require("./mapping"));
const result_1 = require("../../../services/result");
const mapping_2 = __importDefault(require("../../../mapping/mapping"));
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
            resource.resource = mapping_2.default.camelCaseKeys(body);
            return resource;
        });
    }
    patchBasket(basketRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const basketRequestResource = mapping_1.default.mapBasketRequestToBasketRequestResource(basketRequest);
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
            resource.resource = mapping_2.default.camelCaseKeys(body);
            return resource;
        });
    }
    postItemToBasket(itemUriRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemUriRequestResource = mapping_1.default.mapItemUriRequestToItemUriRequestResource(itemUriRequest);
            const resp = yield this.client.httpPost("/basket/items", itemUriRequestResource);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            const body = resp.body;
            resource.resource = mapping_1.default.mapItemUriResourceToItemUri(body);
            return resource;
        });
    }
    checkoutBasket() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
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
            result.resource = {
                checkedOutBy: {
                    email: body.checked_out_by.email,
                    id: body.checked_out_by.id
                },
                deliveryDetails: {
                    addressLine1: (_b = body.delivery_details) === null || _b === void 0 ? void 0 : _b.address_line_1,
                    addressLine2: (_c = body.delivery_details) === null || _c === void 0 ? void 0 : _c.address_line_2,
                    country: (_d = body.delivery_details) === null || _d === void 0 ? void 0 : _d.country,
                    forename: (_e = body.delivery_details) === null || _e === void 0 ? void 0 : _e.forename,
                    locality: (_f = body.delivery_details) === null || _f === void 0 ? void 0 : _f.locality,
                    poBox: (_g = body.delivery_details) === null || _g === void 0 ? void 0 : _g.po_box,
                    postalCode: (_h = body.delivery_details) === null || _h === void 0 ? void 0 : _h.postal_code,
                    region: (_j = body.delivery_details) === null || _j === void 0 ? void 0 : _j.region,
                    surname: (_k = body.delivery_details) === null || _k === void 0 ? void 0 : _k.surname
                },
                etag: body.etag,
                items: body.items,
                kind: body.kind,
                links: {
                    payment: body.links.payment,
                    self: body.links.self
                },
                paidAt: body.paid_at,
                paymentReference: body.payment_reference,
                reference: body.reference,
                status: body.status,
                totalOrderCost: body.total_order_cost
            };
            return result_1.success(result);
        });
    }
}
exports.default = BasketService;
//# sourceMappingURL=service.js.map
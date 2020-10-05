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
const result_1 = require("../../services/result");
class PaymentService {
    constructor(client) {
        this.client = client;
    }
    /**
   * Begins a new payment session.
   *
   * @param createPaymentRequest a create payment request
   */
    createPayment(createPaymentRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createPaymentHandler(createPaymentRequest, "/payments");
        });
    }
    /**
   * Begins a new payment session.
   * use this if full url is set as baseUrl (usually retrieved from X-Payment-Required header)
   * @param createPaymentRequest a create payment request
   */
    createPaymentWithFullUrl(createPaymentRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createPaymentHandler(createPaymentRequest, "");
        });
    }
    /**
   * Retrieves a payment session.
   *
   * @param paymentResourceUri the desired payment session's URI
   */
    getPayment(paymentResourceUri) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpGet(paymentResourceUri);
            return this.handlePaymentHttpResponse(resp);
        });
    }
    createPaymentHandler(createPaymentRequest, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const createPaymentRequestResource = mapping_1.default.snakeCaseKeys(createPaymentRequest);
            const resp = yield this.client.httpPost(path, createPaymentRequestResource);
            return this.handlePaymentHttpResponse(resp);
        });
    }
    handlePaymentHttpResponse(resp) {
        var _a;
        const response = {
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
        response.resource = mapping_1.default.camelCaseKeys(body);
        return result_1.success(response);
    }
}
exports.default = PaymentService;
//# sourceMappingURL=service.js.map
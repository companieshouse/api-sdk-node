"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./services/company-officers/service"));
const service_2 = __importDefault(require("./services/company-profile/service"));
const service_3 = __importDefault(require("./services/company-psc/service"));
const lfp_1 = require("./services/lfp");
const order_1 = require("./services/order/");
const payment_1 = require("./services/payment/");
/**
 * ApiClient is the class that all service objects hang off.
 */
class ApiClient {
    constructor(apiClient, accountClient) {
        this.apiClient = apiClient;
        this.accountClient = accountClient;
        // services on the api domain using the apiClient
        this.lateFilingPenalties = new lfp_1.LateFilingPenaltyService(apiClient);
        this.companyOfficers = new service_1.default(apiClient);
        this.companyProfile = new service_2.default(apiClient);
        this.companyPsc = new service_3.default(apiClient);
        this.certificate = new order_1.CertificateService(apiClient);
        this.certifiedCopies = new order_1.CertifiedCopiesService(apiClient);
        this.basket = new order_1.BasketService(apiClient);
        this.payment = new payment_1.PaymentService(apiClient); // TODO split payments url/domain into a separate config item and http client
        this.order = new order_1.OrderService(apiClient);
        this.mid = new order_1.MidService(apiClient);
        // service on the account/identity domain using the accountClient
        // e.g. user profile service can be added here when required
    }
}
exports.default = ApiClient;
//# sourceMappingURL=client.js.map
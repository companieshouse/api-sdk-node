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
const service_4 = __importDefault(require("./services/company-filing-history/service"));
const refresh_token_1 = require("./services/refresh-token");
const service_5 = __importDefault(require("./services/search/advanced-search/service"));
const service_6 = __importDefault(require("./services/search/alphabetical-search/service"));
const service_7 = __importDefault(require("./services/search/dissolved-search/service"));
const service_8 = __importDefault(require("./services/psc-discrepancies/service"));
const service_9 = __importDefault(require("./services/psc-discrepancies-report/service"));
const service_10 = __importDefault(require("./services/transaction/service"));
const service_11 = __importDefault(require("./services/company-psc-statements/service"));
const confirmation_statement_1 = require("./services/confirmation-statement");
const overseas_entities_1 = require("./services/overseas-entities");
const service_12 = require("./services/order/search/service");
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
        this.companyFilingHistory = new service_4.default(apiClient);
        this.companyProfile = new service_2.default(apiClient);
        this.companyPsc = new service_3.default(apiClient);
        this.companyPscStatements = new service_11.default(apiClient);
        this.confirmationStatementService = new confirmation_statement_1.ConfirmationStatementService(apiClient);
        this.certificate = new order_1.CertificateService(apiClient);
        this.certifiedCopies = new order_1.CertifiedCopiesService(apiClient);
        this.basket = new order_1.BasketService(apiClient);
        this.payment = new payment_1.PaymentService(apiClient); // TODO split payments url/domain into a separate config item and http client
        this.checkout = new order_1.CheckoutService(apiClient);
        this.order = new order_1.OrderService(apiClient);
        this.orderSearchService = new service_12.OrderSearchService(apiClient);
        this.mid = new order_1.MidService(apiClient);
        this.alphabeticalSearch = new service_6.default(apiClient);
        this.dissolvedSearch = new service_7.default(apiClient);
        this.advancedSearch = new service_5.default(apiClient);
        this.overseasEntity = new overseas_entities_1.OverseasEntityService(apiClient);
        // service on the account/identity domain using the accountClient
        // e.g. user profile service can be added here when required
        this.refreshToken = new refresh_token_1.RefreshTokenService(accountClient);
        this.pscDiscrepancies = new service_8.default(apiClient);
        this.pscDiscrepancyReport = new service_9.default(apiClient);
        this.transaction = new service_10.default(apiClient);
    }
}
exports.default = ApiClient;
//# sourceMappingURL=client.js.map
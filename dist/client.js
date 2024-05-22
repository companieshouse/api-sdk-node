"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./services/company-officers/service"));
const service_2 = __importDefault(require("./services/company-profile/service"));
const service_3 = __importDefault(require("./services/company-metrics/service"));
const service_4 = __importDefault(require("./services/company-psc/service"));
const lfp_1 = require("./services/lfp");
const order_1 = require("./services/order/");
const payment_1 = require("./services/payment/");
const service_5 = __importDefault(require("./services/company-filing-history/service"));
const refresh_token_1 = require("./services/refresh-token");
const service_6 = __importDefault(require("./services/search/advanced-search/service"));
const service_7 = __importDefault(require("./services/search/alphabetical-search/service"));
const service_8 = __importDefault(require("./services/search/dissolved-search/service"));
const service_9 = __importDefault(require("./services/psc-discrepancies/service"));
const service_10 = __importDefault(require("./services/psc-discrepancies-report/service"));
const service_11 = __importDefault(require("./services/transaction/service"));
const service_12 = __importDefault(require("./services/company-psc-statements/service"));
const confirmation_statement_1 = require("./services/confirmation-statement");
const overseas_entities_1 = require("./services/overseas-entities");
const service_13 = require("./services/order/search/service");
const service_14 = __importDefault(require("./services/order/order-item/service"));
const service_15 = __importDefault(require("./services/order/checkout-item/service"));
const service_16 = __importDefault(require("./services/officer-filing/service"));
const service_17 = __importDefault(require("./services/acsp/service"));
const service_18 = __importDefault(require("./services/registered-email-address/service"));
const postcode_lookup_1 = require("./services/postcode-lookup");
const service_19 = __importDefault(require("./services/psc-verification-link/service"));
const accounts_filing_1 = require("./services/accounts-filing");
const service_20 = __importDefault(require("./services/psc/service"));
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
        this.companyFilingHistory = new service_5.default(apiClient);
        this.companyProfile = new service_2.default(apiClient);
        this.companyMetrics = new service_3.default(apiClient);
        this.companyPsc = new service_4.default(apiClient);
        this.companyPscStatements = new service_12.default(apiClient);
        this.confirmationStatementService = new confirmation_statement_1.ConfirmationStatementService(apiClient);
        this.certificate = new order_1.CertificateService(apiClient);
        this.certifiedCopies = new order_1.CertifiedCopiesService(apiClient);
        this.basket = new order_1.BasketService(apiClient);
        this.payment = new payment_1.PaymentService(apiClient); // TODO split payments url/domain into a separate config item and http client
        this.checkout = new order_1.CheckoutService(apiClient);
        this.checkoutItem = new service_15.default(apiClient);
        this.order = new order_1.OrderService(apiClient);
        this.orderItem = new service_14.default(apiClient);
        this.officerFiling = new service_16.default(apiClient);
        this.acsp = new service_17.default(apiClient);
        this.checkoutSearchService = new service_13.CheckoutSearchService(apiClient);
        this.mid = new order_1.MidService(apiClient);
        this.alphabeticalSearch = new service_7.default(apiClient);
        this.dissolvedSearch = new service_8.default(apiClient);
        this.advancedSearch = new service_6.default(apiClient);
        this.overseasEntity = new overseas_entities_1.OverseasEntityService(apiClient);
        // service on the account/identity domain using the accountClient
        // e.g. user profile service can be added here when required
        this.refreshToken = new refresh_token_1.RefreshTokenService(accountClient);
        this.pscDiscrepancies = new service_9.default(apiClient);
        this.pscDiscrepancyReport = new service_10.default(apiClient);
        this.transaction = new service_11.default(apiClient);
        this.registeredEmailAddressService = new service_18.default(apiClient);
        this.postCodeLookup = new postcode_lookup_1.PostcodeLookupService(apiClient);
        this.pscVerificationService = new service_19.default(apiClient);
        this.accountsFilingService = new accounts_filing_1.AccountsFilingService(apiClient);
        this.pscService = new service_20.default(apiClient);
    }
}
exports.default = ApiClient;
//# sourceMappingURL=client.js.map
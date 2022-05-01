import IHttpClient from "./http/http-client";
import CompanyOfficersService from "./services/company-officers/service";
import CompanyProfileService from "./services/company-profile/service";
import CompanyPscService from "./services/company-psc/service";
import { LateFilingPenaltyService } from "./services/lfp";
import { BasketService, CheckoutService, OrderService, CertificateService, CertifiedCopiesService, MidService } from "./services/order/";
import { PaymentService } from "./services/payment/";
import CompanyFilingHistoryService from "./services/company-filing-history/service";
import { RefreshTokenService } from "./services/refresh-token";
import AdvancedSearchService from "./services/search/advanced-search/service";
import AlphabeticalSearchService from "./services/search/alphabetical-search/service";
import DissolvedSearchService from "./services/search/dissolved-search/service";
import PSCDiscrepancyService from "./services/psc-discrepancies/service";
import PSCDiscrepanciesReportService from "./services/psc-discrepancies-report/service";
import TransactionService from "./services/transaction/service";
import CompanyPscStatementsService from "./services/company-psc-statements/service";
import { ConfirmationStatementService } from "./services/confirmation-statement";
import { OverseasEntityService } from "./services/overseas-entities";
import { OrderSearchService } from "./services/order/search/service";
/**
 * ApiClient is the class that all service objects hang off.
 */
export default class ApiClient {
    readonly apiClient: IHttpClient;
    readonly accountClient: IHttpClient;
    readonly lateFilingPenalties: LateFilingPenaltyService;
    readonly companyOfficers: CompanyOfficersService;
    readonly companyFilingHistory: CompanyFilingHistoryService;
    readonly companyProfile: CompanyProfileService;
    readonly companyPsc: CompanyPscService;
    readonly companyPscStatements: CompanyPscStatementsService;
    readonly confirmationStatementService: ConfirmationStatementService;
    readonly certificate: CertificateService;
    readonly certifiedCopies: CertifiedCopiesService;
    readonly basket: BasketService;
    readonly payment: PaymentService;
    readonly checkout: CheckoutService;
    readonly order: OrderService;
    readonly orderSearchService: OrderSearchService;
    readonly mid: MidService;
    readonly refreshToken: RefreshTokenService;
    readonly alphabeticalSearch: AlphabeticalSearchService;
    readonly dissolvedSearch: DissolvedSearchService;
    readonly advancedSearch: AdvancedSearchService;
    readonly pscDiscrepancies: PSCDiscrepancyService;
    readonly pscDiscrepancyReport: PSCDiscrepanciesReportService;
    readonly transaction: TransactionService;
    readonly overseasEntity: OverseasEntityService;
    constructor(apiClient: IHttpClient, accountClient: IHttpClient);
}

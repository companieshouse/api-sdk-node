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
import { CheckoutSearchService } from "./services/order/search/service";
import OrderItemService from "./services/order/order-item/service";

/**
 * ApiClient is the class that all service objects hang off.
 */
export default class ApiClient {
  public readonly lateFilingPenalties: LateFilingPenaltyService;
  public readonly companyOfficers: CompanyOfficersService;
  public readonly companyFilingHistory: CompanyFilingHistoryService;
  public readonly companyProfile: CompanyProfileService;
  public readonly companyPsc: CompanyPscService;
  public readonly companyPscStatements: CompanyPscStatementsService;
  public readonly confirmationStatementService: ConfirmationStatementService;
  public readonly certificate: CertificateService;
  public readonly certifiedCopies: CertifiedCopiesService;
  public readonly basket: BasketService;
  public readonly payment: PaymentService;
  public readonly checkout: CheckoutService;
  public readonly order: OrderService;
  public readonly orderItem: OrderItemService;
  public readonly checkoutSearchService: CheckoutSearchService;
  public readonly mid : MidService;
  public readonly refreshToken: RefreshTokenService;
  public readonly alphabeticalSearch: AlphabeticalSearchService;
  public readonly dissolvedSearch: DissolvedSearchService;
  public readonly advancedSearch: AdvancedSearchService;
  public readonly pscDiscrepancies: PSCDiscrepancyService;
  public readonly pscDiscrepancyReport: PSCDiscrepanciesReportService;
  public readonly transaction: TransactionService;
  public readonly overseasEntity: OverseasEntityService;

  constructor (readonly apiClient: IHttpClient, readonly accountClient: IHttpClient) {
      // services on the api domain using the apiClient
      this.lateFilingPenalties = new LateFilingPenaltyService(apiClient);
      this.companyOfficers = new CompanyOfficersService(apiClient);
      this.companyFilingHistory = new CompanyFilingHistoryService(apiClient);
      this.companyProfile = new CompanyProfileService(apiClient);
      this.companyPsc = new CompanyPscService(apiClient);
      this.companyPscStatements = new CompanyPscStatementsService(apiClient);
      this.confirmationStatementService = new ConfirmationStatementService(apiClient);
      this.certificate = new CertificateService(apiClient);
      this.certifiedCopies = new CertifiedCopiesService(apiClient);
      this.basket = new BasketService(apiClient);
      this.payment = new PaymentService(apiClient); // TODO split payments url/domain into a separate config item and http client
      this.checkout = new CheckoutService(apiClient);
      this.order = new OrderService(apiClient);
      this.orderItem = new OrderItemService(apiClient);
      this.checkoutSearchService = new CheckoutSearchService(apiClient);
      this.mid = new MidService(apiClient);
      this.alphabeticalSearch = new AlphabeticalSearchService(apiClient);
      this.dissolvedSearch = new DissolvedSearchService(apiClient);
      this.advancedSearch = new AdvancedSearchService(apiClient);
      this.overseasEntity = new OverseasEntityService(apiClient);
      // service on the account/identity domain using the accountClient
      // e.g. user profile service can be added here when required
      this.refreshToken = new RefreshTokenService(accountClient);
      this.pscDiscrepancies = new PSCDiscrepancyService(apiClient);
      this.pscDiscrepancyReport = new PSCDiscrepanciesReportService(apiClient);
      this.transaction = new TransactionService(apiClient);
  }
}

import IHttpClient from "./http/http-client";
import CompanyOfficersService from "./services/company-officers/service";
import CompanyProfileService from "./services/company-profile/service";
import CompanyPscService from "./services/company-psc/service";
import { LateFilingPenaltyService } from "./services/lfp";
import { BasketService, OrderService, CertificateService, CertifiedCopiesService, MidService } from "./services/order/";
import { PaymentService } from "./services/payment/";
import CompanyFilingHistoryService from "./services/company-filing-history/service";
import { RefreshTokenService } from "./services/refresh-token";
import AlphabeticalSearchService from "./services/search/alphabetical-search/service";
import DissolvedSearchService from "./services/search/dissolved-search/service";
import PSCDiscrepancyService from "./services/psc-discrepancies/service";
import PSCDiscrepanciesReportService from "./services/psc-discrepancies-report/service";

/**
 * ApiClient is the class that all service objects hang off.
 */
export default class ApiClient {
  public readonly lateFilingPenalties: LateFilingPenaltyService;
  public readonly companyOfficers: CompanyOfficersService;
  public readonly companyFilingHistory: CompanyFilingHistoryService;
  public readonly companyProfile: CompanyProfileService;
  public readonly companyPsc : CompanyPscService ;
  public readonly certificate: CertificateService;
  public readonly certifiedCopies: CertifiedCopiesService;
  public readonly basket: BasketService;
  public readonly payment: PaymentService;
  public readonly order: OrderService;
  public readonly mid : MidService;
  public readonly refreshToken: RefreshTokenService;
  public readonly alphabeticalSearch: AlphabeticalSearchService;
  public readonly dissolvedSearch: DissolvedSearchService;
  public readonly pscDiscrepancies: PSCDiscrepancyService;
  public readonly pscDiscrepancyReport:PSCDiscrepanciesReportService;

  constructor (readonly apiClient: IHttpClient, readonly accountClient: IHttpClient) {
      // services on the api domain using the apiClient
      this.lateFilingPenalties = new LateFilingPenaltyService(apiClient);
      this.companyOfficers = new CompanyOfficersService(apiClient);
      this.companyFilingHistory = new CompanyFilingHistoryService(apiClient);
      this.companyProfile = new CompanyProfileService(apiClient);
      this.companyPsc = new CompanyPscService(apiClient);
      this.certificate = new CertificateService(apiClient);
      this.certifiedCopies = new CertifiedCopiesService(apiClient);
      this.basket = new BasketService(apiClient);
      this.payment = new PaymentService(apiClient); // TODO split payments url/domain into a separate config item and http client
      this.order = new OrderService(apiClient);
      this.mid = new MidService(apiClient);
      this.alphabeticalSearch = new AlphabeticalSearchService(apiClient);
      this.dissolvedSearch = new DissolvedSearchService(apiClient);
      // service on the account/identity domain using the accountClient
      // e.g. user profile service can be added here when required
      this.refreshToken = new RefreshTokenService(accountClient);
      this.pscDiscrepancies = new PSCDiscrepancyService(apiClient);
      this.pscDiscrepanciesReport = new PSCDiscrepancyReportService(apiClient);
  }
}

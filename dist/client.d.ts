import IHttpClient from "./http/http-client";
import CompanyOfficersService from "./services/company-officers/service";
import CompanyProfileService from "./services/company-profile/service";
import CompanyPscService from "./services/company-psc/service";
import { LateFilingPenaltyService } from "./services/lfp";
import { BasketService, OrderService, CertificateService, CertifiedCopiesService, MidService } from "./services/order/";
import { PaymentService } from "./services/payment/";
/**
 * ApiClient is the class that all service objects hang off.
 */
export default class ApiClient {
    readonly apiClient: IHttpClient;
    readonly accountClient: IHttpClient;
    readonly lateFilingPenalties: LateFilingPenaltyService;
    readonly companyOfficers: CompanyOfficersService;
    readonly companyProfile: CompanyProfileService;
    readonly companyPsc: CompanyPscService;
    readonly certificate: CertificateService;
    readonly certifiedCopies: CertifiedCopiesService;
    readonly basket: BasketService;
    readonly payment: PaymentService;
    readonly order: OrderService;
    readonly mid: MidService;
    constructor(apiClient: IHttpClient, accountClient: IHttpClient);
}

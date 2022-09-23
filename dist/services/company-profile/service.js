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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * https://developer.companieshouse.gov.uk/api/docs/company/company_number/company_number.html
 */
class CompanyProfileService {
    constructor(client) {
        this.client = client;
    }
    /**
   * Get the profile for a company.
   *
   * @param number the company number to look up
   */
    getCompanyProfile(number) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpGet(`/company/${number}`);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            // cast the response body to the expected type
            const body = resp.body;
            const roa = body.registered_office_address;
            const acc = body.accounts;
            const nextAccs = acc === null || acc === void 0 ? void 0 : acc.next_accounts;
            const confirmationStatement = body.confirmation_statement;
            const links = body.links;
            resource.resource = {
                companyName: body.company_name,
                companyNumber: body.company_number,
                companyStatus: body.company_status,
                companyStatusDetail: body.company_status_detail,
                dateOfCreation: body.date_of_creation,
                jurisdiction: body.jurisdiction,
                sicCodes: body.sic_codes,
                hasBeenLiquidated: body.has_been_liquidated,
                hasSuperSecurePscs: body === null || body === void 0 ? void 0 : body.has_super_secure_pscs,
                type: body.type,
                hasCharges: body.has_charges,
                hasInsolvencyHistory: body.has_insolvency_history,
                registeredOfficeAddress: {
                    addressLineOne: roa === null || roa === void 0 ? void 0 : roa.address_line_1,
                    addressLineTwo: roa === null || roa === void 0 ? void 0 : roa.address_line_2,
                    careOf: roa === null || roa === void 0 ? void 0 : roa.care_of,
                    country: roa === null || roa === void 0 ? void 0 : roa.country,
                    locality: roa === null || roa === void 0 ? void 0 : roa.locality,
                    poBox: roa === null || roa === void 0 ? void 0 : roa.po_box,
                    postalCode: roa === null || roa === void 0 ? void 0 : roa.postal_code,
                    premises: roa === null || roa === void 0 ? void 0 : roa.premises,
                    region: roa === null || roa === void 0 ? void 0 : roa.region
                },
                accounts: {
                    nextAccounts: {
                        periodEndOn: nextAccs === null || nextAccs === void 0 ? void 0 : nextAccs.period_end_on,
                        periodStartOn: nextAccs === null || nextAccs === void 0 ? void 0 : nextAccs.period_start_on
                    },
                    nextDue: acc === null || acc === void 0 ? void 0 : acc.next_due,
                    overdue: acc === null || acc === void 0 ? void 0 : acc.overdue
                },
                confirmationStatement: {
                    lastMadeUpTo: confirmationStatement === null || confirmationStatement === void 0 ? void 0 : confirmationStatement.last_made_up_to,
                    nextDue: confirmationStatement === null || confirmationStatement === void 0 ? void 0 : confirmationStatement.next_due,
                    nextMadeUpTo: confirmationStatement === null || confirmationStatement === void 0 ? void 0 : confirmationStatement.next_made_up_to,
                    overdue: confirmationStatement === null || confirmationStatement === void 0 ? void 0 : confirmationStatement.overdue
                },
                links: {
                    filingHistory: links === null || links === void 0 ? void 0 : links.filing_history
                }
            };
            return resource;
        });
    }
}
exports.default = CompanyProfileService;
//# sourceMappingURL=service.js.map
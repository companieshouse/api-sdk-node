import chai from "chai";
import sinon from "sinon";
import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";

import CompanyProfileService from "../../../src/services/company-profile/service";
import { RequestClient, HttpResponse } from "../../../src/http";
import { CompanyProfileResource } from "../../../src/services/company-profile/types";
const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("company-profile", () => {
    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    afterEach(done => {
        sinon.reset();
        sinon.restore();
        done();
    });

    it("returns an error response on failure", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyProfile : CompanyProfileService = new CompanyProfileService(requestClient);
        const data = await companyProfile.getCompanyProfile("NUMBER-NOT-IMPORTANT");

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("maps the company field data items correctly", async () => {
        const mockResponseBody : CompanyProfileResource = ({
            company_name: "HELLO LTD",
            company_number: "88",
            company_status: "liquidation",
            date_of_creation: "1945-08-07",
            jurisdiction: "england-wales",
            company_status_detail: "not sure",
            sic_codes: ["85100"],
            has_been_liquidated: false,
            has_super_secure_pscs: false,
            type: "private-limited-shares-section-30-exemption",
            has_charges: false,
            has_insolvency_history: true,
            registered_office_address: {
                address_line_1: "100 Rochester Row",
                address_line_2: "London",
                postal_code: "SW1P 1JP",
                care_of: "Someone",
                country: "England",
                locality: "Greater London",
                po_box: "None",
                premises: "",
                region: ""
            },
            service_address: {
                address_line_1: "101 Test Road",
                address_line_2: "Cambridge",
                postal_code: "CB1 ",
                care_of: "Someone",
                country: "England",
                locality: "Cambridgeshire",
                po_box: "None",
                premises: "",
                region: ""
            },
            accounts: {
                next_accounts: {
                    period_end_on: "2018-11-22",
                    period_start_on: "2017-03-01"
                },
                next_due: "2019-07-01",
                overdue: true
            },
            foreign_company_details: {
                business_activity: "Trading",
                governed_by: "Corporation Law Of Australia",
                legal_form: "Public Company Limited By Shares",
                originating_registry: {
                    name: "State Of Victoria - Australia",
                    country: "Australia"
                },
                is_a_credit_finacial_institution: false
            },
            confirmation_statement: {
                last_made_up_to: "2018-08-24",
                next_due: "2019-08-24",
                next_made_up_to: "2019-07-20",
                overdue: true
            },
            is_on_register_in_country_formed_in: "false",
            links: {
                filing_history: "/company/00000000/filing-history"
            }
        });

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyProfile : CompanyProfileService = new CompanyProfileService(requestClient);
        const data = await companyProfile.getCompanyProfile("NUMBER-NOT-IMPORTANT");

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.companyName).to.equal(mockResponseBody.company_name);
        expect(data.resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(data.resource.companyStatus).to.equal(mockResponseBody.company_status);
        expect(data.resource.companyStatusDetail).to.equal(mockResponseBody.company_status_detail);
        expect(data.resource.dateOfCreation).to.equal(mockResponseBody.date_of_creation);
        expect(data.resource.jurisdiction).to.equal(mockResponseBody.jurisdiction);
        expect(data.resource.sicCodes).to.eql(mockResponseBody.sic_codes);
        expect(data.resource.hasBeenLiquidated).to.equal(mockResponseBody.has_been_liquidated);
        expect(data.resource.hasSuperSecurePscs).to.equal(mockResponseBody.has_super_secure_pscs);
        expect(data.resource.type).to.equal(mockResponseBody.type);
        expect(data.resource.hasCharges).to.equal(mockResponseBody.has_charges);
        expect(data.resource.hasInsolvencyHistory).to.equal(mockResponseBody.has_insolvency_history);
        expect(data.resource.registeredOfficeAddress.addressLineOne).to.equal(mockResponseBody.registered_office_address.address_line_1);
        expect(data.resource.registeredOfficeAddress.addressLineTwo).to.equal(mockResponseBody.registered_office_address.address_line_2);
        expect(data.resource.registeredOfficeAddress.postalCode).to.equal(mockResponseBody.registered_office_address.postal_code);
        expect(data.resource.registeredOfficeAddress.careOf).to.equal(mockResponseBody.registered_office_address.care_of);
        expect(data.resource.registeredOfficeAddress.country).to.equal(mockResponseBody.registered_office_address.country);
        expect(data.resource.registeredOfficeAddress.locality).to.equal(mockResponseBody.registered_office_address.locality);
        expect(data.resource.registeredOfficeAddress.poBox).to.equal(mockResponseBody.registered_office_address.po_box);
        expect(data.resource.registeredOfficeAddress.premises).to.equal(mockResponseBody.registered_office_address.premises);
        expect(data.resource.registeredOfficeAddress.region).to.equal(mockResponseBody.registered_office_address.region);
        expect(data.resource.serviceAddress?.addressLineOne).to.equal(mockResponseBody.service_address?.address_line_1);
        expect(data.resource.serviceAddress?.addressLineTwo).to.equal(mockResponseBody.service_address?.address_line_2);
        expect(data.resource.serviceAddress?.postalCode).to.equal(mockResponseBody.service_address?.postal_code);
        expect(data.resource.serviceAddress?.careOf).to.equal(mockResponseBody.service_address?.care_of);
        expect(data.resource.serviceAddress?.country).to.equal(mockResponseBody.service_address?.country);
        expect(data.resource.serviceAddress?.locality).to.equal(mockResponseBody.service_address?.locality);
        expect(data.resource.serviceAddress?.poBox).to.equal(mockResponseBody.service_address?.po_box);
        expect(data.resource.serviceAddress?.premises).to.equal(mockResponseBody.service_address?.premises);
        expect(data.resource.registeredOfficeAddress.region).to.equal(mockResponseBody.registered_office_address.region);
        expect(data.resource.accounts.nextAccounts.periodEndOn).to.equal(mockResponseBody.accounts.next_accounts.period_end_on);
        expect(data.resource.accounts.nextAccounts.periodStartOn).to.equal(mockResponseBody.accounts.next_accounts.period_start_on);
        expect(data.resource.accounts.nextDue).to.equal(mockResponseBody.accounts.next_due);
        expect(data.resource.accounts.overdue).to.equal(mockResponseBody.accounts.overdue);
        expect(data.resource.confirmationStatement.lastMadeUpTo).to.equal(mockResponseBody.confirmation_statement.last_made_up_to);
        expect(data.resource.confirmationStatement.nextDue).to.equal(mockResponseBody.confirmation_statement.next_due);
        expect(data.resource.confirmationStatement.nextMadeUpTo).to.equal(mockResponseBody.confirmation_statement.next_made_up_to);
        expect(data.resource.confirmationStatement.overdue).to.equal(mockResponseBody.confirmation_statement.overdue);
        expect(data.resource.links.filingHistory).to.equal(mockResponseBody.links.filing_history);
        expect(data.resource?.foreignCompanyDetails?.governedBy).to.equal(mockResponseBody.foreign_company_details?.governed_by);
        expect(data.resource?.foreignCompanyDetails?.legalForm).to.equal(mockResponseBody.foreign_company_details?.legal_form);
        expect(data.resource?.foreignCompanyDetails?.businessActivity).to.equal(mockResponseBody.foreign_company_details?.business_activity);
        expect(data.resource?.foreignCompanyDetails?.isACreditFinacialInstitution).to.equal(mockResponseBody.foreign_company_details?.is_a_credit_finacial_institution);
        expect(data.resource?.foreignCompanyDetails?.originatingRegistry?.name).to.equal(mockResponseBody.foreign_company_details?.originating_registry?.name);
        expect(data.resource?.foreignCompanyDetails?.originatingRegistry?.country).to.equal(mockResponseBody.foreign_company_details?.originating_registry?.country);
        expect(data.resource?.isOnRegisterInCountryFormedIn).to.equal(mockResponseBody.is_on_register_in_country_formed_in === "true");
    });

    it("maps the company field data items correctly when registered office, accounts, confirmation statement, links, and super_secure_pscs are missing", async () => {
        const mockResponseBody : CompanyProfileResource = ({
            company_name: "HELLO LTD",
            company_number: "88",
            company_status: "liquidation",
            date_of_creation: "1945-08-07",
            jurisdiction: "england-wales",
            company_status_detail: "not sure",
            sic_codes: ["85100"],
            has_been_liquidated: false,
            type: "private-limited-shares-section-30-exemption",
            has_charges: false,
            has_insolvency_history: true,
            registered_office_address: undefined,
            service_address: undefined,
            foreign_company_details: undefined,
            accounts: undefined,
            confirmation_statement: undefined,
            links: undefined,
            is_on_register_in_country_formed_in: undefined
        });

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyProfile : CompanyProfileService = new CompanyProfileService(requestClient);
        const data = await companyProfile.getCompanyProfile("NUMBER-NOT-IMPORTANT");

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.companyName).to.equal(mockResponseBody.company_name);
        expect(data.resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(data.resource.companyStatus).to.equal(mockResponseBody.company_status);
        expect(data.resource.companyStatusDetail).to.equal(mockResponseBody.company_status_detail);
        expect(data.resource.dateOfCreation).to.equal(mockResponseBody.date_of_creation);
        expect(data.resource.jurisdiction).to.equal(mockResponseBody.jurisdiction);
        expect(data.resource.sicCodes).to.eql(mockResponseBody.sic_codes);
        expect(data.resource.hasBeenLiquidated).to.equal(mockResponseBody.has_been_liquidated);
        expect(data.resource.type).to.equal(mockResponseBody.type);
        expect(data.resource.hasCharges).to.equal(mockResponseBody.has_charges);
        expect(data.resource.hasInsolvencyHistory).to.equal(mockResponseBody.has_insolvency_history);
        expect(data.resource.registeredOfficeAddress.addressLineOne).to.be.undefined;
        expect(data.resource.registeredOfficeAddress.addressLineTwo).to.be.undefined;
        expect(data.resource.registeredOfficeAddress.postalCode).to.be.undefined;
        expect(data.resource.registeredOfficeAddress.careOf).to.be.undefined;
        expect(data.resource.registeredOfficeAddress.country).to.be.undefined;
        expect(data.resource.registeredOfficeAddress.locality).to.be.undefined;
        expect(data.resource.registeredOfficeAddress.poBox).to.be.undefined;
        expect(data.resource.registeredOfficeAddress.premises).to.be.undefined;
        expect(data.resource.registeredOfficeAddress.region).to.be.undefined;
        expect(data.resource.serviceAddress?.addressLineOne).to.be.undefined;
        expect(data.resource.serviceAddress?.addressLineTwo).to.be.undefined;
        expect(data.resource.serviceAddress?.postalCode).to.be.undefined;
        expect(data.resource.serviceAddress?.careOf).to.be.undefined;
        expect(data.resource.serviceAddress?.country).to.be.undefined;
        expect(data.resource.serviceAddress?.locality).to.be.undefined;
        expect(data.resource.serviceAddress?.poBox).to.be.undefined;
        expect(data.resource.serviceAddress?.premises).to.be.undefined;
        expect(data.resource.serviceAddress?.region).to.be.undefined;
        expect(data.resource.accounts.nextAccounts.periodEndOn).to.be.undefined;
        expect(data.resource.accounts.nextAccounts.periodStartOn).to.be.undefined;
        expect(data.resource.accounts.nextDue).to.be.undefined;
        expect(data.resource.accounts.overdue).to.be.undefined;
        expect(data.resource.confirmationStatement.lastMadeUpTo).to.be.undefined;
        expect(data.resource.confirmationStatement.nextDue).to.be.undefined;
        expect(data.resource.confirmationStatement.nextMadeUpTo).to.be.undefined;
        expect(data.resource.confirmationStatement.overdue).to.be.undefined;
        expect(data.resource?.foreignCompanyDetails?.businessActivity).to.be.undefined;
        expect(data.resource?.foreignCompanyDetails?.governedBy).to.be.undefined;
        expect(data.resource?.foreignCompanyDetails?.businessActivity).to.be.undefined;
        expect(data.resource?.foreignCompanyDetails?.isACreditFinacialInstitution).to.be.undefined;
        expect(data.resource?.foreignCompanyDetails?.originatingRegistry?.name).to.be.undefined;
        expect(data.resource?.foreignCompanyDetails?.originatingRegistry?.country).to.be.undefined;
        expect(data.resource?.isOnRegisterInCountryFormedIn).to.be.undefined;
        expect(data.resource.links.filingHistory).to.be.undefined;
        expect(data.resource.hasSuperSecurePscs).to.be.undefined;
    });
});

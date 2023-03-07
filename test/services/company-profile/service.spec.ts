import chai from "chai";
import sinon from "sinon";
import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";

import CompanyProfileService from "../../../src/services/company-profile/service";
import { RequestClient, HttpResponse } from "../../../src/http";
import { CompanyProfileResource, CompanyProfile } from "../../../src/services/company-profile/types";
import { fullCompanyProfileMock, registeredAddressEtcMissingCompanyProfileMock, foreignCompanyDetailsEtcMissingCompanyProfileMock } from "./mocks";

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
        const mockResponseBody : CompanyProfileResource = fullCompanyProfileMock;

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyProfile : CompanyProfileService = new CompanyProfileService(requestClient);
        const data = await companyProfile.getCompanyProfile("NUMBER-NOT-IMPORTANT");

        const resource = data.resource as CompanyProfile;

        expect(data.httpStatusCode).to.equal(200);
        expect(resource.companyName).to.equal(mockResponseBody.company_name);
        expect(resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(resource.companyStatus).to.equal(mockResponseBody.company_status);
        expect(resource.companyStatusDetail).to.equal(mockResponseBody.company_status_detail);
        expect(resource.dateOfCreation).to.equal(mockResponseBody.date_of_creation);
        expect(resource.jurisdiction).to.equal(mockResponseBody.jurisdiction);
        expect(resource.sicCodes).to.eql(mockResponseBody.sic_codes);
        expect(resource.hasBeenLiquidated).to.equal(mockResponseBody.has_been_liquidated);
        expect(resource.hasSuperSecurePscs).to.equal(mockResponseBody.has_super_secure_pscs);
        expect(resource.type).to.equal(mockResponseBody.type);
        expect(resource.hasCharges).to.equal(mockResponseBody.has_charges);
        expect(resource.hasInsolvencyHistory).to.equal(mockResponseBody.has_insolvency_history);
        expect(resource.registeredOfficeAddress.addressLineOne).to.equal(mockResponseBody.registered_office_address.address_line_1);
        expect(resource.registeredOfficeAddress.addressLineTwo).to.equal(mockResponseBody.registered_office_address.address_line_2);
        expect(resource.registeredOfficeAddress.postalCode).to.equal(mockResponseBody.registered_office_address.postal_code);
        expect(resource.registeredOfficeAddress.careOf).to.equal(mockResponseBody.registered_office_address.care_of);
        expect(resource.registeredOfficeAddress.country).to.equal(mockResponseBody.registered_office_address.country);
        expect(resource.registeredOfficeAddress.locality).to.equal(mockResponseBody.registered_office_address.locality);
        expect(resource.registeredOfficeAddress.poBox).to.equal(mockResponseBody.registered_office_address.po_box);
        expect(resource.registeredOfficeAddress.premises).to.equal(mockResponseBody.registered_office_address.premises);
        expect(resource.registeredOfficeAddress.region).to.equal(mockResponseBody.registered_office_address.region);
        expect(resource.serviceAddress?.addressLineOne).to.equal(mockResponseBody.service_address?.address_line_1);
        expect(resource.serviceAddress?.addressLineTwo).to.equal(mockResponseBody.service_address?.address_line_2);
        expect(resource.serviceAddress?.postalCode).to.equal(mockResponseBody.service_address?.postal_code);
        expect(resource.serviceAddress?.careOf).to.equal(mockResponseBody.service_address?.care_of);
        expect(resource.serviceAddress?.country).to.equal(mockResponseBody.service_address?.country);
        expect(resource.serviceAddress?.locality).to.equal(mockResponseBody.service_address?.locality);
        expect(resource.serviceAddress?.poBox).to.equal(mockResponseBody.service_address?.po_box);
        expect(resource.serviceAddress?.premises).to.equal(mockResponseBody.service_address?.premises);
        expect(resource.registeredOfficeAddress.region).to.equal(mockResponseBody.registered_office_address.region);
        expect(resource.accounts.nextAccounts.periodEndOn).to.equal(mockResponseBody.accounts.next_accounts.period_end_on);
        expect(resource.accounts.nextAccounts.periodStartOn).to.equal(mockResponseBody.accounts.next_accounts.period_start_on);
        expect(resource.accounts.nextDue).to.equal(mockResponseBody.accounts.next_due);
        expect(resource.accounts.overdue).to.equal(mockResponseBody.accounts.overdue);
        expect(resource.confirmationStatement?.lastMadeUpTo).to.equal(mockResponseBody.confirmation_statement?.last_made_up_to);
        expect(resource.confirmationStatement?.nextDue).to.equal(mockResponseBody.confirmation_statement?.next_due);
        expect(resource.confirmationStatement?.nextMadeUpTo).to.equal(mockResponseBody.confirmation_statement?.next_made_up_to);
        expect(resource.confirmationStatement?.overdue).to.equal(mockResponseBody.confirmation_statement?.overdue);
        expect(resource.links.filingHistory).to.equal(mockResponseBody.links.filing_history);
        expect(resource.foreignCompanyDetails?.governedBy).to.equal(mockResponseBody.foreign_company_details?.governed_by);
        expect(resource.foreignCompanyDetails?.legalForm).to.equal(mockResponseBody.foreign_company_details?.legal_form);
        expect(resource.foreignCompanyDetails?.registrationNumber).to.equal(mockResponseBody.foreign_company_details?.registration_number);
        expect(resource.foreignCompanyDetails?.businessActivity).to.equal(mockResponseBody.foreign_company_details?.business_activity);
        expect(resource.foreignCompanyDetails?.isACreditFinacialInstitution).to.equal(mockResponseBody.foreign_company_details?.is_a_credit_finacial_institution);
        expect(resource.foreignCompanyDetails?.originatingRegistry?.name).to.equal(mockResponseBody.foreign_company_details?.originating_registry?.name);
        expect(resource.foreignCompanyDetails?.originatingRegistry?.country).to.equal(mockResponseBody.foreign_company_details?.originating_registry?.country);
        expect(resource.isOnRegisterInCountryFormedIn).to.equal(mockResponseBody.is_on_register_in_country_formed_in === "true");
    });

    it("maps the company field data items correctly when registered office, accounts, confirmation statement, links, and super_secure_pscs are missing", async () => {
        const mockResponseBody = registeredAddressEtcMissingCompanyProfileMock;

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyProfile : CompanyProfileService = new CompanyProfileService(requestClient);
        const data = await companyProfile.getCompanyProfile("NUMBER-NOT-IMPORTANT");

        const resource = data.resource as CompanyProfile;

        expect(data.httpStatusCode).to.equal(200);
        expect(resource.companyName).to.equal(mockResponseBody.company_name);
        expect(resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(resource.companyStatus).to.equal(mockResponseBody.company_status);
        expect(resource.companyStatusDetail).to.equal(mockResponseBody.company_status_detail);
        expect(resource.dateOfCreation).to.equal(mockResponseBody.date_of_creation);
        expect(resource.jurisdiction).to.equal(mockResponseBody.jurisdiction);
        expect(resource.sicCodes).to.eql(mockResponseBody.sic_codes);
        expect(resource.hasBeenLiquidated).to.equal(mockResponseBody.has_been_liquidated);
        expect(resource.type).to.equal(mockResponseBody.type);
        expect(resource.hasCharges).to.equal(mockResponseBody.has_charges);
        expect(resource.hasInsolvencyHistory).to.equal(mockResponseBody.has_insolvency_history);
        expect(resource.registeredOfficeAddress.addressLineOne).to.be.undefined;
        expect(resource.registeredOfficeAddress.addressLineTwo).to.be.undefined;
        expect(resource.registeredOfficeAddress.postalCode).to.be.undefined;
        expect(resource.registeredOfficeAddress.careOf).to.be.undefined;
        expect(resource.registeredOfficeAddress.country).to.be.undefined;
        expect(resource.registeredOfficeAddress.locality).to.be.undefined;
        expect(resource.registeredOfficeAddress.poBox).to.be.undefined;
        expect(resource.registeredOfficeAddress.premises).to.be.undefined;
        expect(resource.registeredOfficeAddress.region).to.be.undefined;
        expect(resource.serviceAddress?.addressLineOne).to.be.undefined;
        expect(resource.serviceAddress?.addressLineTwo).to.be.undefined;
        expect(resource.serviceAddress?.postalCode).to.be.undefined;
        expect(resource.serviceAddress?.careOf).to.be.undefined;
        expect(resource.serviceAddress?.country).to.be.undefined;
        expect(resource.serviceAddress?.locality).to.be.undefined;
        expect(resource.serviceAddress?.poBox).to.be.undefined;
        expect(resource.serviceAddress?.premises).to.be.undefined;
        expect(resource.serviceAddress?.region).to.be.undefined;
        expect(resource.accounts.nextAccounts.periodEndOn).to.be.undefined;
        expect(resource.accounts.nextAccounts.periodStartOn).to.be.undefined;
        expect(resource.accounts.nextDue).to.be.undefined;
        expect(resource.accounts.overdue).to.be.undefined;
        expect(resource.confirmationStatement?.lastMadeUpTo).to.be.undefined;
        expect(resource.confirmationStatement?.nextDue).to.be.undefined;
        expect(resource.confirmationStatement?.nextMadeUpTo).to.be.undefined;
        expect(resource.confirmationStatement?.overdue).to.be.undefined;
        expect(resource.foreignCompanyDetails?.businessActivity).to.be.undefined;
        expect(resource.foreignCompanyDetails?.governedBy).to.be.undefined;
        expect(resource.foreignCompanyDetails?.registrationNumber).to.be.undefined;
        expect(resource.foreignCompanyDetails?.legalForm).to.be.undefined;
        expect(resource.foreignCompanyDetails?.businessActivity).to.be.undefined;
        expect(resource.foreignCompanyDetails?.isACreditFinacialInstitution).to.be.undefined;
        expect(resource.foreignCompanyDetails?.originatingRegistry?.name).to.be.undefined;
        expect(resource.foreignCompanyDetails?.originatingRegistry?.country).to.be.undefined;
        expect(resource.isOnRegisterInCountryFormedIn).to.be.false;
        expect(resource.links.filingHistory).to.be.undefined;
        expect(resource.hasSuperSecurePscs).to.be.undefined;
    });

    it("maps the company field data items correctly when foreign company details, service address, is on register of country formed in are missing", async () => {
        const mockResponseBody = foreignCompanyDetailsEtcMissingCompanyProfileMock;

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyProfile : CompanyProfileService = new CompanyProfileService(requestClient);
        const data = await companyProfile.getCompanyProfile("NUMBER-NOT-IMPORTANT");

        const resource = data.resource as CompanyProfile;

        expect(data.httpStatusCode).to.equal(200);
        expect(resource.companyName).to.equal(mockResponseBody.company_name);
        expect(resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(resource.companyStatus).to.equal(mockResponseBody.company_status);
        expect(resource.companyStatusDetail).to.equal(mockResponseBody.company_status_detail);
        expect(resource.dateOfCreation).to.equal(mockResponseBody.date_of_creation);
        expect(resource.jurisdiction).to.equal(mockResponseBody.jurisdiction);
        expect(resource.sicCodes).to.eql(mockResponseBody.sic_codes);
        expect(resource.hasBeenLiquidated).to.equal(mockResponseBody.has_been_liquidated);
        expect(resource.type).to.equal(mockResponseBody.type);
        expect(resource.hasCharges).to.equal(mockResponseBody.has_charges);
        expect(resource.hasInsolvencyHistory).to.equal(mockResponseBody.has_insolvency_history);
        expect(resource.registeredOfficeAddress.addressLineOne).to.be.undefined;
        expect(resource.registeredOfficeAddress.addressLineTwo).to.be.undefined;
        expect(resource.registeredOfficeAddress.postalCode).to.be.undefined;
        expect(resource.registeredOfficeAddress.careOf).to.be.undefined;
        expect(resource.registeredOfficeAddress.country).to.be.undefined;
        expect(resource.registeredOfficeAddress.locality).to.be.undefined;
        expect(resource.registeredOfficeAddress.poBox).to.be.undefined;
        expect(resource.registeredOfficeAddress.premises).to.be.undefined;
        expect(resource.registeredOfficeAddress.region).to.be.undefined;
        expect(resource.serviceAddress?.addressLineOne).to.be.undefined;
        expect(resource.serviceAddress?.addressLineTwo).to.be.undefined;
        expect(resource.serviceAddress?.postalCode).to.be.undefined;
        expect(resource.serviceAddress?.careOf).to.be.undefined;
        expect(resource.serviceAddress?.country).to.be.undefined;
        expect(resource.serviceAddress?.locality).to.be.undefined;
        expect(resource.serviceAddress?.poBox).to.be.undefined;
        expect(resource.serviceAddress?.premises).to.be.undefined;
        expect(resource.serviceAddress?.region).to.be.undefined;
        expect(resource.accounts.nextAccounts.periodEndOn).to.be.undefined;
        expect(resource.accounts.nextAccounts.periodStartOn).to.be.undefined;
        expect(resource.accounts.nextDue).to.be.undefined;
        expect(resource.accounts.overdue).to.be.undefined;
        expect(resource.confirmationStatement?.lastMadeUpTo).to.be.undefined;
        expect(resource.confirmationStatement?.nextDue).to.be.undefined;
        expect(resource.confirmationStatement?.nextMadeUpTo).to.be.undefined;
        expect(resource.confirmationStatement?.overdue).to.be.undefined;
        expect(resource.foreignCompanyDetails?.businessActivity).to.be.undefined;
        expect(resource.foreignCompanyDetails?.governedBy).to.be.undefined;
        expect(resource.foreignCompanyDetails?.legalForm).to.be.undefined;
        expect(resource.foreignCompanyDetails?.registrationNumber).to.be.undefined;
        expect(resource.foreignCompanyDetails?.businessActivity).to.be.undefined;
        expect(resource.foreignCompanyDetails?.isACreditFinacialInstitution).to.be.undefined;
        expect(resource.foreignCompanyDetails?.originatingRegistry?.name).to.be.undefined;
        expect(resource.foreignCompanyDetails?.originatingRegistry?.country).to.be.undefined;
        expect(resource.isOnRegisterInCountryFormedIn).to.be.false;
        expect(resource.links.filingHistory).to.be.undefined;
        expect(resource.hasSuperSecurePscs).to.be.undefined;
    });
});

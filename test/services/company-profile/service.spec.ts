import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";

import CompanyProfileService from "../../../src/services/company-profile/service";
import { RequestClient, HttpResponse } from "../../../src/http";
import { CompanyProfileResource, CompanyProfile } from "../../../src/services/company-profile/types";
import { fullCompanyProfileMock, registeredAddressEtcMissingCompanyProfileMock, foreignCompanyDetailsEtcMissingCompanyProfileMock } from "./mocks";

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("company-profile", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    afterEach(done => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
        done();
    });

    it("returns an error response on failure", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };

        const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
        const companyProfile : CompanyProfileService = new CompanyProfileService(requestClient);
        const data = await companyProfile.getCompanyProfile("NUMBER-NOT-IMPORTANT");

        expect(data.httpStatusCode).toBe(401);
        expect(data.resource).toBeUndefined();
    });

    it("maps the company field data items correctly", async () => {
        const mockResponseBody : CompanyProfileResource = fullCompanyProfileMock;

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
        const companyProfile : CompanyProfileService = new CompanyProfileService(requestClient);
        const data = await companyProfile.getCompanyProfile("NUMBER-NOT-IMPORTANT");

        const resource = data.resource as CompanyProfile;

        expect(data.httpStatusCode).toBe(200);
        expect(resource.companyName).toBe(mockResponseBody.company_name);
        expect(resource.companyNumber).toBe(mockResponseBody.company_number);
        expect(resource.companyStatus).toBe(mockResponseBody.company_status);
        expect(resource.companyStatusDetail).toBe(mockResponseBody.company_status_detail);
        expect(resource.dateOfCreation).toBe(mockResponseBody.date_of_creation);
        expect(resource.jurisdiction).toBe(mockResponseBody.jurisdiction);
        expect(resource.sicCodes).toEqual(mockResponseBody.sic_codes);
        expect(resource.hasBeenLiquidated).toBe(mockResponseBody.has_been_liquidated);
        expect(resource.hasSuperSecurePscs).toBe(mockResponseBody.has_super_secure_pscs);
        expect(resource.type).toBe(mockResponseBody.type);
        expect(resource.hasCharges).toBe(mockResponseBody.has_charges);
        expect(resource.hasInsolvencyHistory).toBe(mockResponseBody.has_insolvency_history);
        expect(resource.registeredOfficeAddress.addressLineOne).toBe(mockResponseBody.registered_office_address.address_line_1);
        expect(resource.registeredOfficeAddress.addressLineTwo).toBe(mockResponseBody.registered_office_address.address_line_2);
        expect(resource.registeredOfficeAddress.postalCode).toBe(mockResponseBody.registered_office_address.postal_code);
        expect(resource.registeredOfficeAddress.careOf).toBe(mockResponseBody.registered_office_address.care_of);
        expect(resource.registeredOfficeAddress.country).toBe(mockResponseBody.registered_office_address.country);
        expect(resource.registeredOfficeAddress.locality).toBe(mockResponseBody.registered_office_address.locality);
        expect(resource.registeredOfficeAddress.poBox).toBe(mockResponseBody.registered_office_address.po_box);
        expect(resource.registeredOfficeAddress.premises).toBe(mockResponseBody.registered_office_address.premises);
        expect(resource.registeredOfficeAddress.region).toBe(mockResponseBody.registered_office_address.region);
        expect(resource.serviceAddress?.addressLineOne).toBe(mockResponseBody.service_address?.address_line_1);
        expect(resource.serviceAddress?.addressLineTwo).toBe(mockResponseBody.service_address?.address_line_2);
        expect(resource.serviceAddress?.postalCode).toBe(mockResponseBody.service_address?.postal_code);
        expect(resource.serviceAddress?.careOf).toBe(mockResponseBody.service_address?.care_of);
        expect(resource.serviceAddress?.country).toBe(mockResponseBody.service_address?.country);
        expect(resource.serviceAddress?.locality).toBe(mockResponseBody.service_address?.locality);
        expect(resource.serviceAddress?.poBox).toBe(mockResponseBody.service_address?.po_box);
        expect(resource.serviceAddress?.premises).toBe(mockResponseBody.service_address?.premises);
        expect(resource.registeredOfficeAddress.region).toBe(mockResponseBody.registered_office_address.region);
        expect(resource.accounts.nextAccounts.periodEndOn).toBe(mockResponseBody.accounts.next_accounts.period_end_on);
        expect(resource.accounts.nextAccounts.periodStartOn).toBe(mockResponseBody.accounts.next_accounts.period_start_on);
        expect(resource.accounts.nextDue).toBe(mockResponseBody.accounts.next_due);
        expect(resource.accounts.overdue).toBe(mockResponseBody.accounts.overdue);
        expect(resource.confirmationStatement?.lastMadeUpTo).toBe(mockResponseBody.confirmation_statement?.last_made_up_to);
        expect(resource.confirmationStatement?.nextDue).toBe(mockResponseBody.confirmation_statement?.next_due);
        expect(resource.confirmationStatement?.nextMadeUpTo).toBe(mockResponseBody.confirmation_statement?.next_made_up_to);
        expect(resource.confirmationStatement?.overdue).toBe(mockResponseBody.confirmation_statement?.overdue);
        expect(resource.links.filingHistory).toBe(mockResponseBody.links.filing_history);
        expect(resource.foreignCompanyDetails?.governedBy).toBe(mockResponseBody.foreign_company_details?.governed_by);
        expect(resource.foreignCompanyDetails?.legalForm).toBe(mockResponseBody.foreign_company_details?.legal_form);
        expect(resource.foreignCompanyDetails?.registrationNumber).toBe(mockResponseBody.foreign_company_details?.registration_number);
        expect(resource.foreignCompanyDetails?.businessActivity).toBe(mockResponseBody.foreign_company_details?.business_activity);
        expect(resource.foreignCompanyDetails?.isACreditFinacialInstitution).toBe(mockResponseBody.foreign_company_details?.is_a_credit_finacial_institution);
        expect(resource.foreignCompanyDetails?.originatingRegistry?.name).toBe(mockResponseBody.foreign_company_details?.originating_registry?.name);
        expect(resource.foreignCompanyDetails?.originatingRegistry?.country).toBe(mockResponseBody.foreign_company_details?.originating_registry?.country);
        expect(resource.isOnRegisterInCountryFormedIn).toBe(mockResponseBody.is_on_register_in_country_formed_in === "true");
    });

    it(
        "maps the company field data items correctly when registered office, accounts, confirmation statement, links, and super_secure_pscs are missing",
        async () => {
            const mockResponseBody = registeredAddressEtcMissingCompanyProfileMock;

            const mockGetResponse = {
                status: 200,
                body: mockResponseBody
            };

            const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
            const companyProfile : CompanyProfileService = new CompanyProfileService(requestClient);
            const data = await companyProfile.getCompanyProfile("NUMBER-NOT-IMPORTANT");

            const resource = data.resource as CompanyProfile;

            expect(data.httpStatusCode).toBe(200);
            expect(resource.companyName).toBe(mockResponseBody.company_name);
            expect(resource.companyNumber).toBe(mockResponseBody.company_number);
            expect(resource.companyStatus).toBe(mockResponseBody.company_status);
            expect(resource.companyStatusDetail).toBe(mockResponseBody.company_status_detail);
            expect(resource.dateOfCreation).toBe(mockResponseBody.date_of_creation);
            expect(resource.jurisdiction).toBe(mockResponseBody.jurisdiction);
            expect(resource.sicCodes).toEqual(mockResponseBody.sic_codes);
            expect(resource.hasBeenLiquidated).toBe(mockResponseBody.has_been_liquidated);
            expect(resource.type).toBe(mockResponseBody.type);
            expect(resource.hasCharges).toBe(mockResponseBody.has_charges);
            expect(resource.hasInsolvencyHistory).toBe(mockResponseBody.has_insolvency_history);
            expect(resource.registeredOfficeAddress.addressLineOne).toBeUndefined();
            expect(resource.registeredOfficeAddress.addressLineTwo).toBeUndefined();
            expect(resource.registeredOfficeAddress.postalCode).toBeUndefined();
            expect(resource.registeredOfficeAddress.careOf).toBeUndefined();
            expect(resource.registeredOfficeAddress.country).toBeUndefined();
            expect(resource.registeredOfficeAddress.locality).toBeUndefined();
            expect(resource.registeredOfficeAddress.poBox).toBeUndefined();
            expect(resource.registeredOfficeAddress.premises).toBeUndefined();
            expect(resource.registeredOfficeAddress.region).toBeUndefined();
            expect(resource.serviceAddress?.addressLineOne).toBeUndefined();
            expect(resource.serviceAddress?.addressLineTwo).toBeUndefined();
            expect(resource.serviceAddress?.postalCode).toBeUndefined();
            expect(resource.serviceAddress?.careOf).toBeUndefined();
            expect(resource.serviceAddress?.country).toBeUndefined();
            expect(resource.serviceAddress?.locality).toBeUndefined();
            expect(resource.serviceAddress?.poBox).toBeUndefined();
            expect(resource.serviceAddress?.premises).toBeUndefined();
            expect(resource.serviceAddress?.region).toBeUndefined();
            expect(resource.accounts.nextAccounts.periodEndOn).toBeUndefined();
            expect(resource.accounts.nextAccounts.periodStartOn).toBeUndefined();
            expect(resource.accounts.nextDue).toBeUndefined();
            expect(resource.accounts.overdue).toBeUndefined();
            expect(resource.confirmationStatement?.lastMadeUpTo).toBeUndefined();
            expect(resource.confirmationStatement?.nextDue).toBeUndefined();
            expect(resource.confirmationStatement?.nextMadeUpTo).toBeUndefined();
            expect(resource.confirmationStatement?.overdue).toBeUndefined();
            expect(resource.foreignCompanyDetails?.businessActivity).toBeUndefined();
            expect(resource.foreignCompanyDetails?.governedBy).toBeUndefined();
            expect(resource.foreignCompanyDetails?.registrationNumber).toBeUndefined();
            expect(resource.foreignCompanyDetails?.legalForm).toBeUndefined();
            expect(resource.foreignCompanyDetails?.businessActivity).toBeUndefined();
            expect(resource.foreignCompanyDetails?.isACreditFinacialInstitution).toBeUndefined();
            expect(resource.foreignCompanyDetails?.originatingRegistry?.name).toBeUndefined();
            expect(resource.foreignCompanyDetails?.originatingRegistry?.country).toBeUndefined();
            expect(resource.isOnRegisterInCountryFormedIn).toBe(false);
            expect(resource.links.filingHistory).toBeUndefined();
            expect(resource.hasSuperSecurePscs).toBeUndefined();
        }
    );

    it(
        "maps the company field data items correctly when foreign company details, service address, is on register of country formed in are missing",
        async () => {
            const mockResponseBody = foreignCompanyDetailsEtcMissingCompanyProfileMock;

            const mockGetResponse = {
                status: 200,
                body: mockResponseBody
            };

            const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
            const companyProfile : CompanyProfileService = new CompanyProfileService(requestClient);
            const data = await companyProfile.getCompanyProfile("NUMBER-NOT-IMPORTANT");

            const resource = data.resource as CompanyProfile;

            expect(data.httpStatusCode).toBe(200);
            expect(resource.companyName).toBe(mockResponseBody.company_name);
            expect(resource.companyNumber).toBe(mockResponseBody.company_number);
            expect(resource.companyStatus).toBe(mockResponseBody.company_status);
            expect(resource.companyStatusDetail).toBe(mockResponseBody.company_status_detail);
            expect(resource.dateOfCreation).toBe(mockResponseBody.date_of_creation);
            expect(resource.jurisdiction).toBe(mockResponseBody.jurisdiction);
            expect(resource.sicCodes).toEqual(mockResponseBody.sic_codes);
            expect(resource.hasBeenLiquidated).toBe(mockResponseBody.has_been_liquidated);
            expect(resource.type).toBe(mockResponseBody.type);
            expect(resource.hasCharges).toBe(mockResponseBody.has_charges);
            expect(resource.hasInsolvencyHistory).toBe(mockResponseBody.has_insolvency_history);
            expect(resource.registeredOfficeAddress.addressLineOne).toBeUndefined();
            expect(resource.registeredOfficeAddress.addressLineTwo).toBeUndefined();
            expect(resource.registeredOfficeAddress.postalCode).toBeUndefined();
            expect(resource.registeredOfficeAddress.careOf).toBeUndefined();
            expect(resource.registeredOfficeAddress.country).toBeUndefined();
            expect(resource.registeredOfficeAddress.locality).toBeUndefined();
            expect(resource.registeredOfficeAddress.poBox).toBeUndefined();
            expect(resource.registeredOfficeAddress.premises).toBeUndefined();
            expect(resource.registeredOfficeAddress.region).toBeUndefined();
            expect(resource.serviceAddress?.addressLineOne).toBeUndefined();
            expect(resource.serviceAddress?.addressLineTwo).toBeUndefined();
            expect(resource.serviceAddress?.postalCode).toBeUndefined();
            expect(resource.serviceAddress?.careOf).toBeUndefined();
            expect(resource.serviceAddress?.country).toBeUndefined();
            expect(resource.serviceAddress?.locality).toBeUndefined();
            expect(resource.serviceAddress?.poBox).toBeUndefined();
            expect(resource.serviceAddress?.premises).toBeUndefined();
            expect(resource.serviceAddress?.region).toBeUndefined();
            expect(resource.accounts.nextAccounts.periodEndOn).toBeUndefined();
            expect(resource.accounts.nextAccounts.periodStartOn).toBeUndefined();
            expect(resource.accounts.nextDue).toBeUndefined();
            expect(resource.accounts.overdue).toBeUndefined();
            expect(resource.confirmationStatement?.lastMadeUpTo).toBeUndefined();
            expect(resource.confirmationStatement?.nextDue).toBeUndefined();
            expect(resource.confirmationStatement?.nextMadeUpTo).toBeUndefined();
            expect(resource.confirmationStatement?.overdue).toBeUndefined();
            expect(resource.foreignCompanyDetails?.businessActivity).toBeUndefined();
            expect(resource.foreignCompanyDetails?.governedBy).toBeUndefined();
            expect(resource.foreignCompanyDetails?.legalForm).toBeUndefined();
            expect(resource.foreignCompanyDetails?.registrationNumber).toBeUndefined();
            expect(resource.foreignCompanyDetails?.businessActivity).toBeUndefined();
            expect(resource.foreignCompanyDetails?.isACreditFinacialInstitution).toBeUndefined();
            expect(resource.foreignCompanyDetails?.originatingRegistry?.name).toBeUndefined();
            expect(resource.foreignCompanyDetails?.originatingRegistry?.country).toBeUndefined();
            expect(resource.isOnRegisterInCountryFormedIn).toBe(false);
            expect(resource.links.filingHistory).toBeUndefined();
            expect(resource.hasSuperSecurePscs).toBeUndefined();
        }
    );
});

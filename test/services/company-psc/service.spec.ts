import chai from "chai";
import sinon from "sinon";
import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";

import CompanyPscService from "../../../src/services/company-psc/service";
import { RequestClient, HttpResponse } from "../../../src/http";
import { CompanyPersonsWithSignificantControlResource } from "../../../src/services/company-psc/types";
const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("company-psc", () => {
    let mockRequest: sinon.SinonStub;
    let companyPsc: CompanyPscService;
    let mockResponseBody: CompanyPersonsWithSignificantControlResource;

    beforeEach(() => {
        sinon.reset();
        sinon.restore();

        mockResponseBody = {
            active_count: "1",
            ceased_count: "0",
            items_per_page: "1",
            start_index: "0",
            total_results: "1",
            links: {
                self: "company/123/persons-with-significant-control"
            },
            items: [
                {
                    natures_of_control: [
                        "ownership-of-shares-25-to-50-percent-as-person"
                    ],
                    name: "James Potter",
                    links: {
                        self: "/company/123/persons-with-significant-control/individual/L2m6DxTJA0pkUNh9SIcJY8_cdWE"
                    },
                    etag: "fe416d8a3e09c93eb961ad89b0c606982c3c01e1",
                    name_elements: {
                        title: "Dr",
                        forename: "James",
                        other_forenames: "young wizard",
                        middle_name: "Sirius",
                        surname: "Potter"
                    },
                    nationality: "British",
                    country_of_residence: "Wales",
                    address: {
                        postal_code: "CF14 3UZ",
                        locality: "Cardiff",
                        region: "South Glamorgan",
                        address_line_1: "Crown Way"
                    },
                    notified_on: "2016-01-01",
                    date_of_birth: {
                        year: "1981",
                        month: "4"
                    },
                    identification: {
                        country_registered: "Wales",
                        legal_authority: "Wales",
                        legal_form: "Public Limited Company",
                        place_registered: "Companies House",
                        registration_number: "INC08394823"
                    },
                    ceased_on: "2023-2-1"
                }
            ]
        };

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        companyPsc = new CompanyPscService(requestClient);
    });

    afterEach(() => {
        sinon.restore();
    });

    it("returns an error response on failure", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        mockRequest.resolves(mockGetResponse);

        const data = await companyPsc.getCompanyPsc("NUMBER-NOT-IMPORTANT");

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("maps the company field data items correctly", async () => {
        const data = await companyPsc.getCompanyPsc("123");

        expect(data.httpStatusCode).to.equal(200);

        expect(data.resource?.activeCount).to.equal(mockResponseBody.active_count);
        expect(data.resource?.ceasedCount).to.equal(mockResponseBody.ceased_count);
        expect(data.resource?.itemsPerPage).to.equal(mockResponseBody.items_per_page);
        expect(data.resource?.startIndex).to.equal(mockResponseBody.start_index);
        expect(data.resource?.totalResults).to.equal(mockResponseBody.total_results);

        expect(data.resource?.links.self).to.equal(mockResponseBody.links.self);

        expect(data.resource?.items.length).to.equal(mockResponseBody.items.length);

        expect(data.resource?.items[0].countryOfResidence).to.equal(mockResponseBody.items[0].country_of_residence);
        expect(data.resource?.items[0].etag).to.equal(mockResponseBody.items[0].etag);
        expect(data.resource?.items[0].nationality).to.equal(mockResponseBody.items[0].nationality);
        expect(data.resource?.items[0].name).to.equal(mockResponseBody.items[0].name);

        expect(data.resource?.items[0].naturesOfControl).to.eql(mockResponseBody.items[0].natures_of_control);

        expect(data.resource?.items[0].address.addressLine1).to.equal(mockResponseBody.items[0].address.address_line_1);
        expect(data.resource?.items[0].address.locality).to.equal(mockResponseBody.items[0].address.locality);
        expect(data.resource?.items[0].address.postalCode).to.equal(mockResponseBody.items[0].address.postal_code);
        expect(data.resource?.items[0].address.region).to.equal(mockResponseBody.items[0].address.region);

        expect(data.resource?.items[0].dateOfBirth.month).to.equal(mockResponseBody.items[0].date_of_birth.month);
        expect(data.resource?.items[0].dateOfBirth.year).to.equal(mockResponseBody.items[0].date_of_birth.year);

        expect(data.resource?.items[0].identification?.legalAuthority).to.equal(mockResponseBody.items[0].identification?.legal_authority);
        expect(data.resource?.items[0].identification?.legalForm).to.equal(mockResponseBody.items[0].identification?.legal_form);
        expect(data.resource?.items[0].identification?.placeRegistered).to.equal(mockResponseBody.items[0].identification?.place_registered);
        expect(data.resource?.items[0].identification?.registrationNumber).to.equal(mockResponseBody.items[0].identification?.registration_number);

        expect(data.resource?.items[0].nameElements.title).to.equal(mockResponseBody.items[0].name_elements.title);
        expect(data.resource?.items[0].nameElements.forename).to.equal(mockResponseBody.items[0].name_elements.forename);
        expect(data.resource?.items[0].nameElements.otherForenames).to.equal(mockResponseBody.items[0].name_elements.other_forenames);
        expect(data.resource?.items[0].nameElements.middleName).to.equal(mockResponseBody.items[0].name_elements.middle_name);
        expect(data.resource?.items[0].nameElements.surname).to.equal(mockResponseBody.items[0].name_elements.surname);
    });

    it("uses default values for startIndex and itemsPerPage when not provided", async () => {
        await companyPsc.getCompanyPsc("123");
        expect(mockRequest.calledWith("/company/123/persons-with-significant-control?start_index=0&items_per_page=30")).to.be.true;
    });

    it("uses provided startIndex and itemsPerPage values", async () => {
        await companyPsc.getCompanyPsc("123", 10, 20);
        expect(mockRequest.calledWith("/company/123/persons-with-significant-control?start_index=10&items_per_page=20")).to.be.true;
    });

    it("uses default startIndex when not provided and itemsPerPage is provided", async () => {
        await companyPsc.getCompanyPsc("123", undefined, 10);
        expect(mockRequest.calledWith("/company/123/persons-with-significant-control?start_index=0&items_per_page=10")).to.be.true;
    });

    it("uses default itemsPerPage when not provided and startIndex is provided", async () => {
        await companyPsc.getCompanyPsc("123", 10);
        expect(mockRequest.calledWith("/company/123/persons-with-significant-control?start_index=10&items_per_page=30")).to.be.true;
    });

    it("uses provided headers", async () => {
        const headers = { "X-Request-Id": "random-uuid" };
        await companyPsc.getCompanyPsc("123", 10, 20, headers);
        expect(mockRequest.calledWith("/company/123/persons-with-significant-control?start_index=10&items_per_page=20", headers)).to.be.true;
    });
});

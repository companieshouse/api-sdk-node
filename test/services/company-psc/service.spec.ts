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
        const companyPsc : CompanyPscService = new CompanyPscService(requestClient);
        const data = await companyPsc.getCompanyPsc("NUMBER-NOT-IMPORTANT");

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("maps the company field data items correctly", async () => {
        const mockResponseBody : CompanyPersonsWithSignificantControlResource = ({
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
                        forename: "James",
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
        });

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyPsc : CompanyPscService = new CompanyPscService(requestClient);
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
        expect(data.resource?.items[0].address.region).to.equal(mockResponseBody.items[0].address.region);

        expect(data.resource?.items[0].dateOfBirth.month).to.equal(mockResponseBody.items[0].date_of_birth.month);
        expect(data.resource?.items[0].dateOfBirth.year).to.equal(mockResponseBody.items[0].date_of_birth.year);

        expect(data.resource?.items[0].identification?.legalAuthority).to.equal(mockResponseBody.items[0].identification?.legal_authority);
        expect(data.resource?.items[0].identification?.legalForm).to.equal(mockResponseBody.items[0].identification?.legal_form);
        expect(data.resource?.items[0].identification?.placeRegistered).to.equal(mockResponseBody.items[0].identification?.place_registered);
        expect(data.resource?.items[0].identification?.registrationNumber).to.equal(mockResponseBody.items[0].identification?.registration_number)
    });
});

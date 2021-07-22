import chai from "chai";
import sinon from "sinon";

import { EnhancedSearchService } from "../../../../src/services/search/enhanced-search";
import { RequestClient } from "../../../../src/http";
import { CompaniesResource } from "../../../../src/services/search/enhanced-search/types";
import Resource from "../../../../src/services/resource";

const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

const mockResponseBody : CompaniesResource = ({
    etag: "etag",
    top_hit: {
        company_name: "test company",
        company_number: "0000789",
        company_status: "active",
        company_type: "company type",
        kind: "kind",
        links: {
            company_profile: "/company/FC022000"
        },
        date_of_cessation: (new Date("19910212")),
        date_of_creation: (new Date("19910212")),
        registered_office_address: {
            address_line_1: "test house",
            address_line_2: "test street",
            locality: "cardiff",
            postal_code: "cf5 6rb",
            premises: "premises",
            country: "country"
        }
    },
    items: [
        {
            company_name: "test company",
            company_number: "0000789",
            company_status: "active",
            company_type: "company type",
            kind: "kind",
            links: {
                company_profile: "/company/FC022000"
            },
            date_of_cessation: (new Date("19910212")),
            date_of_creation: (new Date("19910212")),
            registered_office_address: {
                address_line_1: "test house",
                address_line_2: "test street",
                locality: "cardiff",
                postal_code: "cf5 6rb",
                premises: "premises",
                country: "country"
            }
        }
    ],
    kind: "kind",
    hits: 1
})

const mockRequestId = "fdskfhsdoifhsffsif";
const testCompanyName = "TEST COMPANY NAME";
const testLocation = "TEST LOCATION";
const testIncorporatedFrom = " TEST INCORPORATED FROM";
const testIncorporatedTo = " TEST INCORPORATED TO";
const searchType = "enhanced";

describe("create an enhanced search GET", () => {
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
        const mockGetRequest = {
            status: 401,
            error: "An error occurred"
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetRequest);
        const search: EnhancedSearchService = new EnhancedSearchService(requestClient);
        const data: Resource<CompaniesResource> = await search.getCompanies(testCompanyName, testLocation, testIncorporatedFrom, testIncorporatedTo, mockRequestId);

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("returns enhanced search results correctly", async () => {
        const mockGetRequest = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetRequest);
        const search: EnhancedSearchService = new EnhancedSearchService(requestClient);
        const data: Resource<CompaniesResource> = await search.getCompanies(testCompanyName, testLocation, testIncorporatedFrom, testIncorporatedTo, mockRequestId);
        const item = data.resource.items[0];
        const mockItem = mockResponseBody.items[0];

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBody.etag);
        expect(data.resource.top_hit.company_name).to.equal(mockResponseBody.top_hit.company_name);
        expect(data.resource.top_hit.company_number).to.equal(mockResponseBody.top_hit.company_number);
        expect(data.resource.top_hit.company_status).to.equal(mockResponseBody.top_hit.company_status);
        expect(data.resource.top_hit.company_type).to.equal(mockResponseBody.top_hit.company_type);
        expect(data.resource.top_hit.kind).to.equal(mockResponseBody.top_hit.kind);
        expect(data.resource.top_hit.links.company_profile).to.equal(mockResponseBody.top_hit.links.company_profile);
        expect(data.resource.top_hit.date_of_cessation).to.equal(mockResponseBody.top_hit.date_of_cessation);
        expect(data.resource.top_hit.date_of_creation).to.equal(mockResponseBody.top_hit.date_of_creation);
        expect(data.resource.top_hit.registered_office_address.address_line_1).to.equal(mockResponseBody.top_hit.registered_office_address.address_line_1);
        expect(data.resource.top_hit.registered_office_address.address_line_2).to.equal(mockResponseBody.top_hit.registered_office_address.address_line_2);
        expect(data.resource.top_hit.registered_office_address.locality).to.equal(mockResponseBody.top_hit.registered_office_address.locality);
        expect(data.resource.top_hit.registered_office_address.postal_code).to.equal(mockResponseBody.top_hit.registered_office_address.postal_code);
        expect(data.resource.top_hit.registered_office_address.premises).to.equal(mockResponseBody.top_hit.registered_office_address.premises);
        expect(data.resource.top_hit.registered_office_address.country).to.equal(mockResponseBody.top_hit.registered_office_address.country);
        expect(item.company_name).to.equal(mockItem.company_name);
        expect(item.company_number).to.equal(mockItem.company_number);
        expect(item.company_status).to.equal(mockItem.company_status);
        expect(item.kind).to.equal(mockItem.kind);
        expect(item.links.company_profile).to.equal(mockItem.links.company_profile);
        expect(item.date_of_cessation).to.equal(mockItem.date_of_cessation);
        expect(item.date_of_creation).to.equal(mockItem.date_of_creation);
        expect(item.registered_office_address.address_line_1).to.equal(mockItem.registered_office_address.address_line_1);
        expect(item.registered_office_address.address_line_2).to.equal(mockItem.registered_office_address.address_line_2);
        expect(item.registered_office_address.locality).to.equal(mockItem.registered_office_address.locality);
        expect(item.registered_office_address.postal_code).to.equal(mockItem.registered_office_address.postal_code);
        expect(item.registered_office_address.premises).to.equal(mockItem.registered_office_address.premises);
        expect(data.resource.kind).to.equal(mockResponseBody.kind);
        expect(data.resource.hits).to.equal(mockResponseBody.hits);
    });
});

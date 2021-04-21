import chai from "chai";
import sinon from "sinon";

import { DissolvedSearchService } from "../../../../src/services/search/dissolved-search";
import { RequestClient } from "../../../../src/http";
import { CompaniesResource } from "../../../../src/services/search/dissolved-search/types";
import Resource from "../../../../src/services/resource";
const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

const mockResponseBody : CompaniesResource = ({
    etag: "etag",
    items: [
        {
            address: {
                locality: "cardiff",
                postal_code: "cf5 6rb"
            },
            company_name: "test company",
            company_number: "0000789",
            company_status: "active",
            date_of_cessation: (new Date("19910212")),
            date_of_creation: (new Date("19910212")),
            kind: "kind",
            previous_company_names: [
                {
                    ceased_on: (new Date("19910212")),
                    effective_from: (new Date("19910212")),
                    name: "old name"
                }
            ]
        }
    ],
    kind: "kind",
    top_hit: {
        address: {
            locality: "cardiff",
            postal_code: "cf5 6rb"
        },
        company_name: "test company",
        company_number: "0000789",
        company_status: "active",
        date_of_cessation: (new Date("19910212")),
        date_of_creation: (new Date("19910212")),
        kind: "kind",
        previous_company_names: [
            {
                ceased_on: (new Date("19910212")),
                effective_from: (new Date("19910212")),
                name: "old name"
            }
        ]
    }
});

const mockRequestId = "fdskfhsdoifhsffsif";
const testCompanyName = "TEST COMPANY NAME";
const searchType = "alphabetical";
const changedName = "best-match";

describe("create a dissolved search GET", () => {
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
        const search: DissolvedSearchService = new DissolvedSearchService(requestClient);
        const data: Resource<CompaniesResource> = await search.getCompanies(testCompanyName, mockRequestId, searchType, changedName);

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("returns dissolved search results correctly", async () => {
        const mockGetRequest = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetRequest);
        const search: DissolvedSearchService = new DissolvedSearchService(requestClient);
        const data: Resource<CompaniesResource> = await search.getCompanies(testCompanyName, mockRequestId, searchType, changedName);
        const item = data.resource.items[0];
        const mockItem = mockResponseBody.items[0];

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBody.etag);
        expect(item.address.locality).to.equal(mockItem.address.locality);
        expect(item.address.postal_code).to.equal(mockItem.address.postal_code);
        expect(item.company_name).to.equal(mockItem.company_name);
        expect(item.company_number).to.equal(mockItem.company_number);
        expect(item.company_status).to.equal(mockItem.company_status);
        expect(item.date_of_cessation).to.equal(mockItem.date_of_cessation);
        expect(item.date_of_creation).to.equal(mockItem.date_of_creation);
        expect(item.kind).to.equal(mockItem.kind);
        expect(item.previous_company_names[0].ceased_on).to.equal(mockItem.previous_company_names[0].ceased_on);
        expect(item.previous_company_names[0].effective_from).to.equal(mockItem.previous_company_names[0].effective_from);
        expect(item.previous_company_names[0].name).to.equal(mockItem.previous_company_names[0].name);
        expect(data.resource.kind).to.equal(mockResponseBody.kind);
        expect(data.resource.top_hit.address.locality).to.equal(mockResponseBody.top_hit.address.locality);
        expect(data.resource.top_hit.address.postal_code).to.equal(mockResponseBody.top_hit.address.postal_code);
        expect(data.resource.top_hit.company_name).to.equal(mockResponseBody.top_hit.company_name);
        expect(data.resource.top_hit.company_number).to.equal(mockResponseBody.top_hit.company_number);
        expect(data.resource.top_hit.company_status).to.equal(mockResponseBody.top_hit.company_status);
        expect(data.resource.top_hit.date_of_cessation).to.equal(mockResponseBody.top_hit.date_of_cessation);
        expect(data.resource.top_hit.date_of_creation).to.equal(mockResponseBody.top_hit.date_of_creation);
        expect(data.resource.top_hit.kind).to.equal(mockResponseBody.top_hit.kind);
        expect(data.resource.top_hit.previous_company_names[0].ceased_on).to.equal(mockResponseBody.top_hit.previous_company_names[0].ceased_on);
        expect(data.resource.top_hit.previous_company_names[0].effective_from).to.equal(mockResponseBody.top_hit.previous_company_names[0].effective_from);
        expect(data.resource.top_hit.previous_company_names[0].name).to.equal(mockResponseBody.top_hit.previous_company_names[0].name);
    });
});

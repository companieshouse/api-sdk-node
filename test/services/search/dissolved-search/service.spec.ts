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
            date_of_cessation: "19910212",
            date_of_creation: "19910212",
            kind: "kind",
            previous_company_names: [
                {
                    ceased_on: "19910212",
                    effective_from: "19910212",
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
        date_of_cessation: "19910212",
        date_of_creation: "19910212",
        kind: "kind",
        previous_company_names: [
            {
                ceased_on: "19910212",
                effective_from: "19910212",
                name: "old name"
            }
        ]
    }
});

const mockRequestId = "fdskfhsdoifhsffsif";
const testCompanyName = "TEST COMPANY NAME";

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
        const data: Resource<CompaniesResource> = await search.getCompanies(testCompanyName, mockRequestId);

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
        const data: Resource<CompaniesResource> = await search.getCompanies(testCompanyName, mockRequestId);

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBody.etag);
        // expect(data.resource.topHit).to.equal(mockResponseBody.topHit);
        // expect(data.resource.results[0].ID).to.equal(mockResponseBody.results[0].ID);
        // expect(data.resource.results[0].company_type).to.equal(mockResponseBody.results[0].company_type)
        // expect(data.resource.results[0].items.company_number).to.equal(mockResponseBody.results[0].items.company_number);
        // expect(data.resource.results[0].items.company_status).to.equal(mockResponseBody.results[0].items.company_status);
        // expect(data.resource.results[0].items.corporate_name).to.equal(mockResponseBody.results[0].items.corporate_name);
        // expect(data.resource.results[0].items.record_type).to.equal(mockResponseBody.results[0].items.record_type);
        // expect(data.resource.results[0].links).to.equal(mockResponseBody.results[0].links);
    });
});

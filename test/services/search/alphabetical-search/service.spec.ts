import chai from "chai";
import sinon from "sinon";

import { AlphabeticalSearchService } from "../../../../src/services/search/alphabetical-search";
import { RequestClient } from "../../../../src/http";
import { CompaniesResource } from "../../../../src/services/search/alphabetical-search/types";
import Resource from "../../../../src/services/resource";
const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

const mockResponseBody : CompaniesResource = ({
    searchType: "",
    topHit: "TEST COMPANY",
    results: [
        {
            ID: "FC022000",
            company_type: "oversea-company",
            items: {
                company_number: "FC022000",
                company_status: "active",
                corporate_name: "corporate name",
                record_type: "record type"
            },
            links: {
                self: "/company/FC022000"
            }
        }
    ]
});

const mockRequestId = "fdskfhsdoifhsffsif";
const testCompanyName = "TEST COMPANY NAME";

describe("create a alphabetical search GET", () => {
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
        const search: AlphabeticalSearchService = new AlphabeticalSearchService(requestClient);
        const data: Resource<CompaniesResource> = await search.getCompanies(testCompanyName, mockRequestId);

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("returns alphabetical search results correctly", async () => {
        const mockGetRequest = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetRequest);
        const search: AlphabeticalSearchService = new AlphabeticalSearchService(requestClient);
        const data: Resource<CompaniesResource> = await search.getCompanies(testCompanyName, mockRequestId);

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.topHit).to.equal(mockResponseBody.topHit);
        expect(data.resource.results[0].ID).to.equal(mockResponseBody.results[0].ID);
        expect(data.resource.results[0].company_type).to.equal(mockResponseBody.results[0].company_type)
        expect(data.resource.results[0].items.company_number).to.equal(mockResponseBody.results[0].items.company_number);
        expect(data.resource.results[0].items.company_status).to.equal(mockResponseBody.results[0].items.company_status);
        expect(data.resource.results[0].items.corporate_name).to.equal(mockResponseBody.results[0].items.corporate_name);
        expect(data.resource.results[0].items.record_type).to.equal(mockResponseBody.results[0].items.record_type);
        expect(data.resource.results[0].links).to.equal(mockResponseBody.results[0].links);
    });
});

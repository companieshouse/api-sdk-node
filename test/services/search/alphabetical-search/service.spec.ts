import chai from "chai";
import sinon from "sinon";

import { AlphabeticalSearchService } from "../../../../src/services/search/alphabetical-search";
import { RequestClient } from "../../../../src/http";
import { CompaniesResource } from "../../../../src/services/search/alphabetical-search/types";
import Resource from "../../../../src/services/resource";
const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

const mockResponseBody : CompaniesResource = ({
    etag: "etag",
    searchType: "",
    topHit: {
        company_name: "test company",
        company_number: "0000789",
        company_status: "active",
        kind: "kind",
        ordered_alpha_key_with_id: "testcompany:0000789"
    },
    items: [
        {
            company_type: "oversea-company",
            company_number: "FC022000",
            company_status: "active",
            corporate_name: "corporate name",
            record_type: "record type",
            ordered_alpha_key: "ordered alpha key",
            ordered_alpha_key_with_id: "COMPANY:00000000",
            links: {
                self: "/company/FC022000"
            },
            kind: "kind"
        }
    ]
});

const mockRequestId = "fdskfhsdoifhsffsif";
const testCompanyName = "TEST COMPANY NAME";
const searchBefore = "TESTCOMPANYTOP:00000000";
const searchAfter = "TESTCOMPANYBOTTOM:00000000";
const size = 20;

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
        const data: Resource<CompaniesResource> = await search.getCompanies(testCompanyName, mockRequestId, null, null, null);

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
        const data: Resource<CompaniesResource> = await search.getCompanies(testCompanyName, mockRequestId, null, null, null);

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.topHit).to.equal(mockResponseBody.topHit);
        expect(data.resource.items[0].company_type).to.equal(mockResponseBody.items[0].company_type)
        expect(data.resource.items[0].company_number).to.equal(mockResponseBody.items[0].company_number);
        expect(data.resource.items[0].company_status).to.equal(mockResponseBody.items[0].company_status);
        expect(data.resource.items[0].corporate_name).to.equal(mockResponseBody.items[0].corporate_name);
        expect(data.resource.items[0].record_type).to.equal(mockResponseBody.items[0].record_type);
        expect(data.resource.items[0].ordered_alpha_key).to.equal(mockResponseBody.items[0].ordered_alpha_key);
        expect(data.resource.items[0].links).to.equal(mockResponseBody.items[0].links);
    });

    it("returns alphabetical search results correctly when searching previous results", async () => {
        const mockGetRequest = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetRequest);
        const search: AlphabeticalSearchService = new AlphabeticalSearchService(requestClient);
        const data: Resource<CompaniesResource> = await search.getCompanies(testCompanyName, mockRequestId, searchBefore, null, size);

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.topHit).to.equal(mockResponseBody.topHit);
        expect(data.resource.items[0].company_type).to.equal(mockResponseBody.items[0].company_type)
        expect(data.resource.items[0].company_number).to.equal(mockResponseBody.items[0].company_number);
        expect(data.resource.items[0].company_status).to.equal(mockResponseBody.items[0].company_status);
        expect(data.resource.items[0].corporate_name).to.equal(mockResponseBody.items[0].corporate_name);
        expect(data.resource.items[0].record_type).to.equal(mockResponseBody.items[0].record_type);
        expect(data.resource.items[0].ordered_alpha_key).to.equal(mockResponseBody.items[0].ordered_alpha_key);
        expect(data.resource.items[0].links).to.equal(mockResponseBody.items[0].links);
    });

    it("returns alphabetical search results correctly when searching next results", async () => {
        const mockGetRequest = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetRequest);
        const search: AlphabeticalSearchService = new AlphabeticalSearchService(requestClient);
        const data: Resource<CompaniesResource> = await search.getCompanies(testCompanyName, mockRequestId, null, searchAfter, size);

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.topHit).to.equal(mockResponseBody.topHit);
        expect(data.resource.items[0].company_type).to.equal(mockResponseBody.items[0].company_type)
        expect(data.resource.items[0].company_number).to.equal(mockResponseBody.items[0].company_number);
        expect(data.resource.items[0].company_status).to.equal(mockResponseBody.items[0].company_status);
        expect(data.resource.items[0].corporate_name).to.equal(mockResponseBody.items[0].corporate_name);
        expect(data.resource.items[0].record_type).to.equal(mockResponseBody.items[0].record_type);
        expect(data.resource.items[0].ordered_alpha_key).to.equal(mockResponseBody.items[0].ordered_alpha_key);
        expect(data.resource.items[0].links).to.equal(mockResponseBody.items[0].links);
    });
});

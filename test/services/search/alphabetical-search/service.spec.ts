import { AlphabeticalSearchService } from "../../../../src/services/search/alphabetical-search";
import { RequestClient } from "../../../../src/http";
import { CompaniesResource } from "../../../../src/services/search/alphabetical-search/types";
import Resource from "../../../../src/services/resource";

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

const mockResponseBody : CompaniesResource = ({
    etag: "etag",
    top_hit: {
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
            company_name: "corporate name",
            ordered_alpha_key: "ordered alpha key",
            ordered_alpha_key_with_id: "COMPANY:00000000",
            links: {
                company_profile: "/company/FC022000"
            },
            kind: "kind"
        }
    ],
    kind: "kind"
});

const mockRequestId = "fdskfhsdoifhsffsif";
const testCompanyName = "TEST COMPANY NAME";
const searchBefore = "TESTCOMPANYTOP:00000000";
const searchAfter = "TESTCOMPANYBOTTOM:00000000";
const size = 20;

describe("create a alphabetical search GET", () => {
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
        const mockGetRequest = {
            status: 401,
            error: "An error occurred"
        };

        const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetRequest);
        const search: AlphabeticalSearchService = new AlphabeticalSearchService(requestClient);
        const data: Resource<CompaniesResource> = await search.getCompanies(testCompanyName, mockRequestId, null, null, null);

        expect(data.httpStatusCode).toBe(401);
        expect(data.resource).toBeUndefined();
    });

    it("returns alphabetical search results correctly", async () => {
        const mockGetRequest = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetRequest);
        const search: AlphabeticalSearchService = new AlphabeticalSearchService(requestClient);
        const data: Resource<CompaniesResource> = await search.getCompanies(testCompanyName, mockRequestId, null, null, null);

        expect(data.httpStatusCode).toBe(200);
        expect(data.resource.top_hit).toBe(mockResponseBody.top_hit);
        expect(data.resource.items[0].company_type).toBe(mockResponseBody.items[0].company_type)
        expect(data.resource.items[0].company_number).toBe(mockResponseBody.items[0].company_number);
        expect(data.resource.items[0].company_status).toBe(mockResponseBody.items[0].company_status);
        expect(data.resource.items[0].company_name).toBe(mockResponseBody.items[0].company_name);
        expect(data.resource.items[0].kind).toBe(mockResponseBody.items[0].kind);
        expect(data.resource.items[0].ordered_alpha_key).toBe(mockResponseBody.items[0].ordered_alpha_key);
        expect(data.resource.items[0].links).toBe(mockResponseBody.items[0].links);
    });

    it(
        "returns alphabetical search results correctly when searching previous results",
        async () => {
            const mockGetRequest = {
                status: 200,
                body: mockResponseBody
            };

            const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetRequest);
            const search: AlphabeticalSearchService = new AlphabeticalSearchService(requestClient);
            const data: Resource<CompaniesResource> = await search.getCompanies(testCompanyName, mockRequestId, searchBefore, null, size);

            expect(data.httpStatusCode).toBe(200);
            expect(data.resource.top_hit).toBe(mockResponseBody.top_hit);
            expect(data.resource.items[0].company_type).toBe(mockResponseBody.items[0].company_type)
            expect(data.resource.items[0].company_number).toBe(mockResponseBody.items[0].company_number);
            expect(data.resource.items[0].company_status).toBe(mockResponseBody.items[0].company_status);
            expect(data.resource.items[0].company_name).toBe(mockResponseBody.items[0].company_name);
            expect(data.resource.items[0].kind).toBe(mockResponseBody.items[0].kind);
            expect(data.resource.items[0].ordered_alpha_key).toBe(mockResponseBody.items[0].ordered_alpha_key);
            expect(data.resource.items[0].links).toBe(mockResponseBody.items[0].links);
        }
    );

    it(
        "returns alphabetical search results correctly when searching next results",
        async () => {
            const mockGetRequest = {
                status: 200,
                body: mockResponseBody
            };

            const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetRequest);
            const search: AlphabeticalSearchService = new AlphabeticalSearchService(requestClient);
            const data: Resource<CompaniesResource> = await search.getCompanies(testCompanyName, mockRequestId, null, searchAfter, size);

            expect(data.httpStatusCode).toBe(200);
            expect(data.resource.top_hit).toBe(mockResponseBody.top_hit);
            expect(data.resource.items[0].company_type).toBe(mockResponseBody.items[0].company_type)
            expect(data.resource.items[0].company_number).toBe(mockResponseBody.items[0].company_number);
            expect(data.resource.items[0].company_status).toBe(mockResponseBody.items[0].company_status);
            expect(data.resource.items[0].company_name).toBe(mockResponseBody.items[0].company_name);
            expect(data.resource.items[0].kind).toBe(mockResponseBody.items[0].kind);
            expect(data.resource.items[0].ordered_alpha_key).toBe(mockResponseBody.items[0].ordered_alpha_key);
            expect(data.resource.items[0].links).toBe(mockResponseBody.items[0].links);
        }
    );
});

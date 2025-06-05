import { RequestClient } from "../../../src/http";
import CompanyFilingHistoryService from "../../../src/services/company-filing-history/service";
import {
    CompanyFilingHistoryResource,
    FilingHistoryItemResource
} from "../../../src/services/company-filing-history/types";

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("company-filing-history", () => {
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
        const companyFilingService : CompanyFilingHistoryService = new CompanyFilingHistoryService(requestClient);
        const data = await companyFilingService.getCompanyFilingHistory("NUMBER-NOT-IMPORTANT");

        expect(data.httpStatusCode).toBe(401);
        expect(data.resource).toBeUndefined();
    });

    it("maps the company filing history data items correctly", async () => {
        const mockFilingHistoryItem: FilingHistoryItemResource = {
            category: "category",
            date: "someDate",
            description: "A description",
            transaction_id: "transaction id",
            type: "a type"
        }
        const mockResponseBody : CompanyFilingHistoryResource = {
            etag: "someEtag",
            filing_history_status: "someFilingHistoryStatus",
            items: [mockFilingHistoryItem],
            items_per_page: 1,
            kind: "a kind",
            start_index: 0,
            total_count: 1
        };

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
        const companyFilingHistoryService : CompanyFilingHistoryService = new CompanyFilingHistoryService(requestClient);
        const data = await companyFilingHistoryService.getCompanyFilingHistory("123");

        expect(data.httpStatusCode).toBe(200);

        expect(data.resource?.etag).toBe(mockResponseBody.etag)
        expect(data.resource?.filingHistoryStatus).toBe(mockResponseBody.filing_history_status)
        expect(data.resource?.itemsPerPage).toBe(mockResponseBody.items_per_page)
        expect(data.resource?.kind).toBe(mockResponseBody.kind)
        expect(data.resource?.startIndex).toBe(mockResponseBody.start_index)
        expect(data.resource?.totalCount).toBe(mockResponseBody.total_count)

        expect(data.resource?.items[0].category).toBe(mockFilingHistoryItem.category);
        expect(data.resource?.items[0].date).toBe(mockFilingHistoryItem.date);
        expect(data.resource?.items[0].description).toBe(mockFilingHistoryItem.description);
        expect(data.resource?.items[0].transactionId).toBe(mockFilingHistoryItem.transaction_id);
        expect(data.resource?.items[0].type).toBe(mockFilingHistoryItem.type);
    });
});

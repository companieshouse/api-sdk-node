import chai from "chai";
import {RequestClient} from "../../../src/http";
import sinon from "sinon";
import CompanyFilingHistoryService from "../../../src/services/company-filing-history/service";
import {
  CompanyFilingHistoryResource,
  FilingHistoryItemResource
} from "../../../src/services/company-filing-history/types";

const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("company-filing-history", () => {
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
    const companyFilingService : CompanyFilingHistoryService = new CompanyFilingHistoryService(requestClient);
    const data = await companyFilingService.getCompanyFilingHistory("NUMBER-NOT-IMPORTANT");

    expect(data.httpStatusCode).to.equal(401);
    expect(data.resource).to.be.undefined;
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

    const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
    const companyFilingHistoryService : CompanyFilingHistoryService = new CompanyFilingHistoryService(requestClient);
    const data = await companyFilingHistoryService.getCompanyFilingHistory("123");

    expect(data.httpStatusCode).to.equal(200);

    expect(data.resource.etag).to.equal(mockResponseBody.etag)
    expect(data.resource.filingHistoryStatus).to.equal(mockResponseBody.filing_history_status)
    expect(data.resource.itemsPerPage).to.equal(mockResponseBody.items_per_page)
    expect(data.resource.kind).to.equal(mockResponseBody.kind)
    expect(data.resource.startIndex).to.equal(mockResponseBody.start_index)
    expect(data.resource.totalCount).to.equal(mockResponseBody.total_count)

    expect(data.resource.items[0].category).to.equal(mockFilingHistoryItem.category);
    expect(data.resource.items[0].date).to.equal(mockFilingHistoryItem.date);
    expect(data.resource.items[0].description).to.equal(mockFilingHistoryItem.description);
    expect(data.resource.items[0].transactionId).to.equal(mockFilingHistoryItem.transaction_id);
    expect(data.resource.items[0].type).to.equal(mockFilingHistoryItem.type);
    });
});

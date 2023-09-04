import chai from "chai";
import sinon from "sinon";
import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";

import LateFilingPenaltyService from "../../../src/services/lfp/service";
import { RequestClient, HttpResponse } from "../../../src/http";
const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("lfp", () => {
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
        const companyProfile : LateFilingPenaltyService = new LateFilingPenaltyService(requestClient);
        const data = await companyProfile.getPenalties("NUMBER-NOT-IMPORTANT");

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined
    });

    it("maps the penalty data correctly if there are no penalties", async () => {
        const mockResponseBody = ({
            etag: "string",
            items_per_page: 0,
            start_index: 0,
            total_results: 0,
            items: null // lfp-pay-api returns null if there are no penalties
        });

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyProfile : LateFilingPenaltyService = new LateFilingPenaltyService(requestClient);
        const data = await companyProfile.getPenalties("NUMBER-NOT-IMPORTANT");

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBody.etag);
        expect(data.resource.itemsPerPage).to.equal(mockResponseBody.items_per_page);
        expect(data.resource.startIndex).to.equal(mockResponseBody.start_index);
        expect(data.resource.totalResults).to.equal(mockResponseBody.total_results);
        expect(data.resource.items.length).to.eql(0);
    });

    it("maps the penalty data items correctly", async () => {
        const mockResponseBody = ({
            etag: "string",
            items_per_page: 0,
            start_index: 1,
            total_results: 2,
            items: [{
                id: "string",
                etag: "string",
                kind: "string",
                is_paid: true,
                is_dca: false,
                due_date: "2019-12-19",
                made_up_date: "2019-12-19",
                transaction_date: "2019-12-19",
                original_amount: 33,
                outstanding: 44,
                type: "penalty"
            }]
        });

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyProfile : LateFilingPenaltyService = new LateFilingPenaltyService(requestClient);
        const data = await companyProfile.getPenalties("NUMBER-NOT-IMPORTANT");

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBody.etag);
        expect(data.resource.itemsPerPage).to.equal(mockResponseBody.items_per_page);
        expect(data.resource.startIndex).to.equal(mockResponseBody.start_index);
        expect(data.resource.totalResults).to.equal(mockResponseBody.total_results);
        expect(data.resource.items.length).to.eql(1);
        expect(data.resource.items[0].id).to.equal(mockResponseBody.items[0].id);
        expect(data.resource.items[0].etag).to.equal(mockResponseBody.items[0].etag);
        expect(data.resource.items[0].kind).to.equal(mockResponseBody.items[0].kind);
        expect(data.resource.items[0].isPaid).to.equal(mockResponseBody.items[0].is_paid);
        expect(data.resource.items[0].isDCA).to.equal(mockResponseBody.items[0].is_dca);
        expect(data.resource.items[0].dueDate).to.equal(mockResponseBody.items[0].due_date);
        expect(data.resource.items[0].madeUpDate).to.equal(mockResponseBody.items[0].made_up_date);
        expect(data.resource.items[0].transactionDate).to.equal(mockResponseBody.items[0].transaction_date);
        expect(data.resource.items[0].originalAmount).to.equal(mockResponseBody.items[0].original_amount);
        expect(data.resource.items[0].outstandingAmount).to.equal(mockResponseBody.items[0].outstanding);
        expect(data.resource.items[0].type).to.equal(mockResponseBody.items[0].type);
    });

    it("maps the penalty data items correctly when fields are missing", async () => {
        const mockResponseBody = ({
            etag: "string",
            items_per_page: 0,
            start_index: undefined,
            total_results: 2,
            items: [{
                id: "string",
                etag: undefined,
                kind: "string",
                is_paid: true,
                is_dca: undefined,
                due_date: "2019-12-19",
                made_up_date: "2019-12-19",
                transaction_date: "2019-12-19",
                original_amount: undefined,
                outstanding: undefined,
                type: "penalty"
            }]
        });

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyProfile : LateFilingPenaltyService = new LateFilingPenaltyService(requestClient);
        const data = await companyProfile.getPenalties("NUMBER-NOT-IMPORTANT");

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBody.etag);
        expect(data.resource.itemsPerPage).to.equal(mockResponseBody.items_per_page);
        expect(data.resource.startIndex).to.be.undefined
        expect(data.resource.totalResults).to.equal(mockResponseBody.total_results);
        expect(data.resource.items.length).to.eql(1);
        expect(data.resource.items[0].id).to.equal(mockResponseBody.items[0].id);
        expect(data.resource.items[0].etag).to.be.undefined
        expect(data.resource.items[0].kind).to.equal(mockResponseBody.items[0].kind);
        expect(data.resource.items[0].isPaid).to.equal(mockResponseBody.items[0].is_paid);
        expect(data.resource.items[0].isDCA).to.be.undefined
        expect(data.resource.items[0].dueDate).to.equal(mockResponseBody.items[0].due_date);
        expect(data.resource.items[0].madeUpDate).to.equal(mockResponseBody.items[0].made_up_date);
        expect(data.resource.items[0].transactionDate).to.equal(mockResponseBody.items[0].transaction_date);
        expect(data.resource.items[0].originalAmount).to.be.undefined
        expect(data.resource.items[0].outstandingAmount).to.be.undefined
        expect(data.resource.items[0].type).to.equal(mockResponseBody.items[0].type);
    });
});

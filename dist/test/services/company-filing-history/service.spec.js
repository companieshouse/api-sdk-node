"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const http_1 = require("../../../src/http");
const sinon_1 = __importDefault(require("sinon"));
const service_1 = __importDefault(require("../../../src/services/company-filing-history/service"));
const expect = chai_1.default.expect;
const requestClient = new http_1.RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
describe("company-filing-history", () => {
    beforeEach(() => {
        sinon_1.default.reset();
        sinon_1.default.restore();
    });
    afterEach(done => {
        sinon_1.default.reset();
        sinon_1.default.restore();
        done();
    });
    it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyFilingService = new service_1.default(requestClient);
        const data = yield companyFilingService.getCompanyFilingHistory("NUMBER-NOT-IMPORTANT");
        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    }));
    it("maps the company filing history data items correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const mockFilingHistoryItem = {
            category: "category",
            date: "someDate",
            description: "A description",
            transaction_id: "transaction id",
            type: "a type"
        };
        const mockResponseBody = {
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
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyFilingHistoryService = new service_1.default(requestClient);
        const data = yield companyFilingHistoryService.getCompanyFilingHistory("123");
        expect(data.httpStatusCode).to.equal(200);
        expect((_a = data.resource) === null || _a === void 0 ? void 0 : _a.etag).to.equal(mockResponseBody.etag);
        expect((_b = data.resource) === null || _b === void 0 ? void 0 : _b.filingHistoryStatus).to.equal(mockResponseBody.filing_history_status);
        expect((_c = data.resource) === null || _c === void 0 ? void 0 : _c.itemsPerPage).to.equal(mockResponseBody.items_per_page);
        expect((_d = data.resource) === null || _d === void 0 ? void 0 : _d.kind).to.equal(mockResponseBody.kind);
        expect((_e = data.resource) === null || _e === void 0 ? void 0 : _e.startIndex).to.equal(mockResponseBody.start_index);
        expect((_f = data.resource) === null || _f === void 0 ? void 0 : _f.totalCount).to.equal(mockResponseBody.total_count);
        expect((_g = data.resource) === null || _g === void 0 ? void 0 : _g.items[0].category).to.equal(mockFilingHistoryItem.category);
        expect((_h = data.resource) === null || _h === void 0 ? void 0 : _h.items[0].date).to.equal(mockFilingHistoryItem.date);
        expect((_j = data.resource) === null || _j === void 0 ? void 0 : _j.items[0].description).to.equal(mockFilingHistoryItem.description);
        expect((_k = data.resource) === null || _k === void 0 ? void 0 : _k.items[0].transactionId).to.equal(mockFilingHistoryItem.transaction_id);
        expect((_l = data.resource) === null || _l === void 0 ? void 0 : _l.items[0].type).to.equal(mockFilingHistoryItem.type);
    }));
});
//# sourceMappingURL=service.spec.js.map
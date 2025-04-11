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
const sinon_1 = __importDefault(require("sinon"));
const service_1 = __importDefault(require("../../../src/services/lfp/service"));
const http_1 = require("../../../src/http");
const expect = chai_1.default.expect;
const requestClient = new http_1.RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
describe("lfp", () => {
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
        const companyProfile = new service_1.default(requestClient);
        const data = yield companyProfile.getPenalties("NUMBER-NOT-IMPORTANT");
        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    }));
    it("maps the penalty data correctly if there are no penalties", () => __awaiter(void 0, void 0, void 0, function* () {
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
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyProfile = new service_1.default(requestClient);
        const data = yield companyProfile.getPenalties("NUMBER-NOT-IMPORTANT");
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBody.etag);
        expect(data.resource.itemsPerPage).to.equal(mockResponseBody.items_per_page);
        expect(data.resource.startIndex).to.equal(mockResponseBody.start_index);
        expect(data.resource.totalResults).to.equal(mockResponseBody.total_results);
        expect(data.resource.items.length).to.eql(0);
    }));
    it("maps the penalty data items correctly", () => __awaiter(void 0, void 0, void 0, function* () {
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
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyProfile = new service_1.default(requestClient);
        const data = yield companyProfile.getPenalties("NUMBER-NOT-IMPORTANT");
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
    }));
    it("maps the penalty data items correctly when fields are missing", () => __awaiter(void 0, void 0, void 0, function* () {
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
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyProfile = new service_1.default(requestClient);
        const data = yield companyProfile.getPenalties("NUMBER-NOT-IMPORTANT");
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBody.etag);
        expect(data.resource.itemsPerPage).to.equal(mockResponseBody.items_per_page);
        expect(data.resource.startIndex).to.be.undefined;
        expect(data.resource.totalResults).to.equal(mockResponseBody.total_results);
        expect(data.resource.items.length).to.eql(1);
        expect(data.resource.items[0].id).to.equal(mockResponseBody.items[0].id);
        expect(data.resource.items[0].etag).to.be.undefined;
        expect(data.resource.items[0].kind).to.equal(mockResponseBody.items[0].kind);
        expect(data.resource.items[0].isPaid).to.equal(mockResponseBody.items[0].is_paid);
        expect(data.resource.items[0].isDCA).to.be.undefined;
        expect(data.resource.items[0].dueDate).to.equal(mockResponseBody.items[0].due_date);
        expect(data.resource.items[0].madeUpDate).to.equal(mockResponseBody.items[0].made_up_date);
        expect(data.resource.items[0].transactionDate).to.equal(mockResponseBody.items[0].transaction_date);
        expect(data.resource.items[0].originalAmount).to.be.undefined;
        expect(data.resource.items[0].outstandingAmount).to.be.undefined;
        expect(data.resource.items[0].type).to.equal(mockResponseBody.items[0].type);
    }));
});
//# sourceMappingURL=service.spec.js.map
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
const alphabetical_search_1 = require("../../../../src/services/search/alphabetical-search");
const http_1 = require("../../../../src/http");
const expect = chai_1.default.expect;
const requestClient = new http_1.RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
const mockResponseBody = ({
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
        sinon_1.default.reset();
        sinon_1.default.restore();
    });
    afterEach(done => {
        sinon_1.default.reset();
        sinon_1.default.restore();
        done();
    });
    it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetRequest = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetRequest);
        const search = new alphabetical_search_1.AlphabeticalSearchService(requestClient);
        const data = yield search.getCompanies(testCompanyName, mockRequestId, null, null, null);
        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    }));
    it("returns alphabetical search results correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetRequest = {
            status: 200,
            body: mockResponseBody
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetRequest);
        const search = new alphabetical_search_1.AlphabeticalSearchService(requestClient);
        const data = yield search.getCompanies(testCompanyName, mockRequestId, null, null, null);
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.top_hit).to.equal(mockResponseBody.top_hit);
        expect(data.resource.items[0].company_type).to.equal(mockResponseBody.items[0].company_type);
        expect(data.resource.items[0].company_number).to.equal(mockResponseBody.items[0].company_number);
        expect(data.resource.items[0].company_status).to.equal(mockResponseBody.items[0].company_status);
        expect(data.resource.items[0].company_name).to.equal(mockResponseBody.items[0].company_name);
        expect(data.resource.items[0].kind).to.equal(mockResponseBody.items[0].kind);
        expect(data.resource.items[0].ordered_alpha_key).to.equal(mockResponseBody.items[0].ordered_alpha_key);
        expect(data.resource.items[0].links).to.equal(mockResponseBody.items[0].links);
    }));
    it("returns alphabetical search results correctly when searching previous results", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetRequest = {
            status: 200,
            body: mockResponseBody
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetRequest);
        const search = new alphabetical_search_1.AlphabeticalSearchService(requestClient);
        const data = yield search.getCompanies(testCompanyName, mockRequestId, searchBefore, null, size);
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.top_hit).to.equal(mockResponseBody.top_hit);
        expect(data.resource.items[0].company_type).to.equal(mockResponseBody.items[0].company_type);
        expect(data.resource.items[0].company_number).to.equal(mockResponseBody.items[0].company_number);
        expect(data.resource.items[0].company_status).to.equal(mockResponseBody.items[0].company_status);
        expect(data.resource.items[0].company_name).to.equal(mockResponseBody.items[0].company_name);
        expect(data.resource.items[0].kind).to.equal(mockResponseBody.items[0].kind);
        expect(data.resource.items[0].ordered_alpha_key).to.equal(mockResponseBody.items[0].ordered_alpha_key);
        expect(data.resource.items[0].links).to.equal(mockResponseBody.items[0].links);
    }));
    it("returns alphabetical search results correctly when searching next results", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetRequest = {
            status: 200,
            body: mockResponseBody
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetRequest);
        const search = new alphabetical_search_1.AlphabeticalSearchService(requestClient);
        const data = yield search.getCompanies(testCompanyName, mockRequestId, null, searchAfter, size);
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.top_hit).to.equal(mockResponseBody.top_hit);
        expect(data.resource.items[0].company_type).to.equal(mockResponseBody.items[0].company_type);
        expect(data.resource.items[0].company_number).to.equal(mockResponseBody.items[0].company_number);
        expect(data.resource.items[0].company_status).to.equal(mockResponseBody.items[0].company_status);
        expect(data.resource.items[0].company_name).to.equal(mockResponseBody.items[0].company_name);
        expect(data.resource.items[0].kind).to.equal(mockResponseBody.items[0].kind);
        expect(data.resource.items[0].ordered_alpha_key).to.equal(mockResponseBody.items[0].ordered_alpha_key);
        expect(data.resource.items[0].links).to.equal(mockResponseBody.items[0].links);
    }));
});
//# sourceMappingURL=service.spec.js.map
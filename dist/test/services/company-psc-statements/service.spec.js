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
const http_1 = require("../../../src/http");
const service_1 = __importDefault(require("../../../src/services/company-psc-statements/service"));
const expect = chai_1.default.expect;
const requestClient = new http_1.RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
describe("company-psc-statements", () => {
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
        sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyPscStatement = new service_1.default(requestClient);
        const data = yield companyPscStatement.getCompanyPscStatements("NUMBER-NOT-IMPORTANT", 2, 1);
        expect(data.httpStatusCode).to.equal(401);
    }));
    it("maps the psc statement data items correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockResponseBody = ({
            active_count: "1",
            ceased_count: "0",
            items_per_page: "1",
            start_index: "0",
            total_results: "1",
            links: {
                self: "statementsSelfLink"
            },
            items: [
                {
                    ceased_on: "ceased",
                    etag: "etag",
                    kind: "kind",
                    links: { self: "statementSelfLink" },
                    notified_on: "notifiedOn",
                    statement: "statement"
                }
            ]
        });
        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };
        sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyPscStatementService = new service_1.default(requestClient);
        const data = yield companyPscStatementService.getCompanyPscStatements("NUMBER-NOT-IMPORTANT", 2, 1);
        expect(data.httpStatusCode).to.equal(200);
        const castedResponse = data;
        expect(castedResponse.resource.activeCount).to.equal(mockResponseBody.active_count);
        expect(castedResponse.resource.ceasedCount).to.equal(mockResponseBody.ceased_count);
        expect(castedResponse.resource.itemsPerPage).to.equal(mockResponseBody.items_per_page);
        expect(castedResponse.resource.startIndex).to.equal(mockResponseBody.start_index);
        expect(castedResponse.resource.totalResults).to.equal(mockResponseBody.total_results);
        expect(castedResponse.resource.links.self).to.equal(mockResponseBody.links.self);
        expect(castedResponse.resource.items.length).to.equal(mockResponseBody.items.length);
        expect(castedResponse.resource.items[0].ceasedOn).to.equal(mockResponseBody.items[0].ceased_on);
        expect(castedResponse.resource.items[0].etag).to.equal(mockResponseBody.items[0].etag);
        expect(castedResponse.resource.items[0].kind).to.equal(mockResponseBody.items[0].kind);
        expect(castedResponse.resource.items[0].notifiedOn).to.equal(mockResponseBody.items[0].notified_on);
        expect(castedResponse.resource.items[0].statement).to.equal(mockResponseBody.items[0].statement);
    }));
});
//# sourceMappingURL=service.spec.js.map
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
const service_1 = __importDefault(require("../../../src/services/transaction/service"));
const http_1 = require("../../../src/http");
const expect = chai_1.default.expect;
const requestClient = new http_1.RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
describe("transaction", () => {
    beforeEach(() => {
        sinon_1.default.reset();
        sinon_1.default.restore();
    });
    afterEach(done => {
        sinon_1.default.reset();
        sinon_1.default.restore();
        done();
    });
    it("post returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPostResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostResponse);
        const transaction = new service_1.default(requestClient);
        const data = yield transaction.postTransaction({});
        expect(data.httpStatusCode).to.equal(401);
        const castedData = data;
        expect(castedData.errors[0]).to.equal("An error occurred");
    }));
    it("post maps the company field data items correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockResponseBody = ({
            id: "12345678",
            company_name: "HELLO LTD",
            company_number: "88",
            links: {
                self: "/self"
            },
            reference: "ref",
            description: "desc",
            resources: {
                resource: {
                    kind: "kind",
                    links: {
                        resource: "self",
                        costs: "costs"
                    }
                }
            }
        });
        const mockPostResponse = {
            status: 200,
            body: mockResponseBody
        };
        sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostResponse);
        const transaction = new service_1.default(requestClient);
        const data = yield transaction.postTransaction({});
        expect(data.httpStatusCode).to.equal(200);
        const castedData = data;
        expect(castedData.resource.companyName).to.equal(mockResponseBody.company_name);
        expect(castedData.resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(castedData.resource.links.self).to.equal(mockResponseBody.links.self);
        expect(castedData.resource.reference).to.equal(mockResponseBody.reference);
        expect(castedData.resource.description).to.equal(mockResponseBody.description);
    }));
    it("get returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const transaction = new service_1.default(requestClient);
        const data = yield transaction.getTransaction({});
        expect(data.httpStatusCode).to.equal(401);
        const castedData = data;
        expect(castedData.errors[0]).to.equal("An error occurred");
    }));
    it("get maps the company field data items correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockResponseBody = ({
            id: "12345678",
            company_name: "HELLO LTD",
            company_number: "88",
            links: {
                self: "/self"
            },
            reference: "ref",
            description: "desc"
        });
        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const transaction = new service_1.default(requestClient);
        const data = yield transaction.getTransaction({});
        expect(data.httpStatusCode).to.equal(200);
        const castedData = data;
        expect(castedData.resource.companyName).to.equal(mockResponseBody.company_name);
        expect(castedData.resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(castedData.resource.links.self).to.equal(mockResponseBody.links.self);
        expect(castedData.resource.reference).to.equal(mockResponseBody.reference);
        expect(castedData.resource.description).to.equal(mockResponseBody.description);
    }));
    it("put returns successful response", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPutResponse = {
            headers: {
                "X-Payment-Required": "http://link-to-payment"
            },
            status: 202
        };
        sinon_1.default.stub(requestClient, "httpPut").resolves(mockPutResponse);
        const transaction = new service_1.default(requestClient);
        const data = yield transaction.putTransaction({ id: "abc" });
        expect(data.httpStatusCode).to.equal(202);
        const castedData = data;
        expect(castedData.headers["X-Payment-Required"]).to.equal("http://link-to-payment");
    }));
    it("put returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPutResponse = {
            status: 422,
            error: "Unprocessable Entity"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpPut").resolves(mockPutResponse);
        const transaction = new service_1.default(requestClient);
        const data = yield transaction.putTransaction({ id: "abc" });
        expect(data.httpStatusCode).to.equal(422);
        const castedData = data;
        expect(castedData.errors[0]).to.equal("Unprocessable Entity");
    }));
    it("get transaction list for resource kind returns success response ", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const itemsArray = ([
            {
                id: "123",
                status: "closed"
            }
        ]);
        const transactionList = ({
            items: itemsArray
        });
        const mockGetResponse = {
            status: 200,
            body: transactionList
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const transaction = new service_1.default(requestClient);
        const data = yield transaction.getTransactionsForResourceKind({});
        expect(data.httpStatusCode).to.equal(200);
        const castedData = data;
        expect((_a = castedData.resource) === null || _a === void 0 ? void 0 : _a.items[0].id).to.equal(transactionList.items[0].id);
        expect((_b = castedData.resource) === null || _b === void 0 ? void 0 : _b.items[0].status).to.equal(transactionList.items[0].status);
    }));
});
//# sourceMappingURL=service.spec.js.map
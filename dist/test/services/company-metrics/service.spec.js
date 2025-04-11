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
const service_1 = __importDefault(require("../../../src/services/company-metrics/service"));
const expect = chai_1.default.expect;
const requestClient = new http_1.RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
describe("company-metrics", () => {
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
        const companyMetricsService = new service_1.default(requestClient);
        const data = yield companyMetricsService.getCompanyMetrics("NUMBER-NOT-IMPORTANT");
        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    }));
    it("maps the company metrics data items correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const mockResponseBody = ({
            etag: "etag",
            counts: {
                appointments: {
                    activeDirectorsCount: 12,
                    activeSecretariesCount: 1,
                    activeCount: 13,
                    resignedCount: 49,
                    totalCount: 62,
                    activeLlpMembersCount: 0
                }
            },
            mortgage: {
                satisfiedCount: 13,
                partSatisfiedCount: 0,
                totalCount: 14
            }
        });
        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyMetricsService = new service_1.default(requestClient);
        const data = yield companyMetricsService.getCompanyMetrics("123");
        expect(data.httpStatusCode).to.equal(200);
        expect((_a = data.resource) === null || _a === void 0 ? void 0 : _a.etag).to.equal(mockResponseBody.etag);
        expect((_b = data.resource) === null || _b === void 0 ? void 0 : _b.counts.appointments.activeCount).to.equal(mockResponseBody.counts.appointments.activeCount);
        expect((_c = data.resource) === null || _c === void 0 ? void 0 : _c.counts.appointments.activeDirectorsCount).to.equal(mockResponseBody.counts.appointments.activeDirectorsCount);
        expect((_d = data.resource) === null || _d === void 0 ? void 0 : _d.counts.appointments.activeLlpMembersCount).to.equal(mockResponseBody.counts.appointments.activeLlpMembersCount);
        expect((_e = data.resource) === null || _e === void 0 ? void 0 : _e.counts.appointments.activeSecretariesCount).to.equal(mockResponseBody.counts.appointments.activeSecretariesCount);
        expect((_f = data.resource) === null || _f === void 0 ? void 0 : _f.counts.appointments.resignedCount).to.equal(mockResponseBody.counts.appointments.resignedCount);
        expect((_g = data.resource) === null || _g === void 0 ? void 0 : _g.counts.appointments.totalCount).to.equal(mockResponseBody.counts.appointments.totalCount);
        expect((_h = data.resource) === null || _h === void 0 ? void 0 : _h.mortgage.partSatisfiedCount).to.equal(mockResponseBody.mortgage.partSatisfiedCount);
        expect((_j = data.resource) === null || _j === void 0 ? void 0 : _j.mortgage.satisfiedCount).to.equal(mockResponseBody.mortgage.satisfiedCount);
        expect((_k = data.resource) === null || _k === void 0 ? void 0 : _k.mortgage.totalCount).to.equal(mockResponseBody.mortgage.totalCount);
    }));
});
//# sourceMappingURL=service.spec.js.map
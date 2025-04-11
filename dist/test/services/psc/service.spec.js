"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const chai_1 = require("chai");
const http_status_codes_1 = require("http-status-codes");
const mocha_1 = require("mocha");
const sinon = __importStar(require("sinon"));
const service_1 = __importDefault(require("../../../src/services/psc/service"));
const service_mock_1 = require("./service.mock");
const mapping_1 = __importDefault(require("../../../src/mapping/mapping"));
mocha_1.describe("PSC details", () => {
    const pscService = new service_1.default(service_mock_1.requestClient);
    mocha_1.describe("GET Individual endpoint", () => {
        it("should return status 200 OK and PSC resource representation on authorised access", () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(service_mock_1.requestClient, "httpGet").resolves(service_mock_1.mockIndividualResponse[200]);
            const response = (yield pscService.getPscIndividual(service_mock_1.COMPANY_NUMBER, service_mock_1.PSC_NOTIFICATION_ID));
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.OK);
            chai_1.expect(response.resource).to.eql(mapping_1.default.camelCaseKeys(service_mock_1.PSC_INDIVIDUAL));
        }));
        it("should return status 401 Unauthorised when access is unauthorised", () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            sinon.stub(service_mock_1.requestClient, "httpGet").resolves(service_mock_1.mockIndividualResponse[401]);
            const response = yield pscService.getPscIndividual(service_mock_1.COMPANY_NUMBER, service_mock_1.PSC_NOTIFICATION_ID);
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.UNAUTHORIZED);
            chai_1.expect((_a = response.errors) === null || _a === void 0 ? void 0 : _a[0]).to.equal(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
        }));
        it("should return status 400 Bad Request when the resource ID is null in the request", () => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            sinon.stub(service_mock_1.requestClient, "httpGet").resolves(service_mock_1.mockIndividualResponse[400]);
            const response = (yield pscService.getPscIndividual(null, null));
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.BAD_REQUEST);
            chai_1.expect((_b = response.errors) === null || _b === void 0 ? void 0 : _b[0]).to.equal(http_status_codes_1.ReasonPhrases.BAD_REQUEST);
        }));
        it("should return status 404 Not Found when the resource ID is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            var _c;
            sinon.stub(service_mock_1.requestClient, "httpGet").resolves(service_mock_1.mockIndividualResponse[404]);
            const response = (yield pscService.getPscIndividual(service_mock_1.COMPANY_NUMBER, service_mock_1.PSC_NOTIFICATION_ID));
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.NOT_FOUND);
            chai_1.expect((_c = response.errors) === null || _c === void 0 ? void 0 : _c[0]).to.equal(http_status_codes_1.ReasonPhrases.NOT_FOUND);
        }));
        it("should return status 500 Internal Server Error if a server error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            var _d;
            sinon.stub(service_mock_1.requestClient, "httpGet").resolves(service_mock_1.mockIndividualResponse[500]);
            const response = (yield pscService.getPscIndividual(service_mock_1.COMPANY_NUMBER, service_mock_1.PSC_NOTIFICATION_ID));
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            chai_1.expect((_d = response.errors) === null || _d === void 0 ? void 0 : _d[0]).to.equal(http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR);
        }));
    });
});
//# sourceMappingURL=service.spec.js.map
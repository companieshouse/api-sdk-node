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
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const util_1 = __importDefault(require("../../../src/services/psc-discrepancies-report/util"));
const utility = new util_1.default();
const mockSuccessResponse = {
    body: {
        links: {
            self: "/psc-discrepancy-reports/573a4369-c29d-44d7-9580-e52f85c4a19b"
        },
        etag: "fa1774742515a04204dc105520cee4a4b8d2fc37",
        kind: "psc_discrepancy_report#psc_discrepancy_report",
        material_discrepancies: ["1", "2"],
        obliged_entity_organisation_name: "orgName",
        obliged_entity_telephone_number: "telephone",
        obliged_entity_contact_name: "contactName",
        obliged_entity_name: "obligedEntity",
        obliged_entity_email: "demo@ch.gov.uk",
        obliged_entity_type: "2",
        company_number: "00006400",
        submission_reference: "1755-1223-1316-1244",
        status: "COMPLETE"
    },
    status: 200,
    headers: {
        "Content-Type": "application/json"
    }
};
const mockErrorResponseCode = {
    status: 400
};
const mockGenericErrorResponse = {
    status: 404,
    error: "Error:Object not found"
};
const mockApiErrorResponse = {
    status: 400,
    error: {
        errors: [
            {
                error: "material_discrepancies contains an invalid subfield",
                location: "material_discrepancies",
                location_type: "request-body",
                type: "ch:validation"
            }
        ]
    }
};
describe("Process Response", () => {
    beforeEach(() => {
        sinon_1.default.reset();
        sinon_1.default.restore();
    });
    afterEach(done => {
        sinon_1.default.reset();
        sinon_1.default.restore();
        done();
    });
    it("returns an ApiResponse with correctly mapped fields on success", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = utility.processResponse(mockSuccessResponse);
        chai_1.expect(result.isFailure()).to.be.false;
        chai_1.expect(result.isSuccess()).to.be.true;
        const data = result.value;
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect(JSON.stringify(data.headers)).to.be.equal(JSON.stringify(mockSuccessResponse.headers));
        chai_1.expect(JSON.stringify(data.resource)).to.be.equal(JSON.stringify(mockSuccessResponse.body));
    }));
    it("returns an ApiErrorResponse with no Errors if only error status code is sent", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = utility.processResponse(mockErrorResponseCode);
        chai_1.expect(result.isFailure()).to.be.false;
        chai_1.expect(result.isSuccess()).to.be.true;
        const data = result.value;
        chai_1.expect(data.httpStatusCode).to.equal(400);
        chai_1.expect(JSON.stringify(data.errors)).to.be.undefined;
    }));
    it("returns an ApiErrorResponse with a single ApiError if response body does not match APIError format", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = utility.processResponse(mockGenericErrorResponse);
        chai_1.expect(result.isFailure()).to.be.true;
        chai_1.expect(result.isSuccess()).to.be.false;
        const data = result.value;
        chai_1.expect(data.httpStatusCode).to.equal(404);
        chai_1.expect(data.errors).to.have.lengthOf(1);
        chai_1.expect(data.errors[0].error).to.be.equal(mockGenericErrorResponse.error);
    }));
    it("returns an ApiErrorResponse with ApiErrors matching response body if body does match APIError format", () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedError = {
            error: "material_discrepancies contains an invalid subfield",
            location: "material_discrepancies",
            locationType: "request-body",
            type: "ch:validation"
        };
        const result = utility.processResponse(mockApiErrorResponse);
        chai_1.expect(result.isFailure()).to.be.true;
        chai_1.expect(result.isSuccess()).to.be.false;
        const data = result.value;
        chai_1.expect(data.httpStatusCode).to.equal(400);
        chai_1.expect(JSON.stringify(data.errors)).to.be.equal(JSON.stringify([expectedError]));
    }));
});
//# sourceMappingURL=util.spec.js.map
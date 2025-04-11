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
const confirmation_statement_1 = require("../../../src/services/confirmation-statement");
const mockValues = __importStar(require("./confirmation.statement.mock"));
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const confirmation_statement_mock_1 = require("./confirmation.statement.mock");
const TRANSACTION_ID = "12345";
const CONFIRMATION_STATEMENT_ID = "r4nd0m";
const COMPANY_NUMBER = "11111111";
beforeEach(() => {
    sinon_1.default.reset();
    sinon_1.default.restore();
});
afterEach(done => {
    sinon_1.default.reset();
    sinon_1.default.restore();
    done();
});
describe("check eligibility GET", () => {
    it("should return company validation object", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockCheckEligibility[200]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getEligibility(COMPANY_NUMBER);
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect(data.resource.eligibilityStatusCode).to.equal(mockValues.mockCompanyValidationResponseResourceOk.eligibility_status_code);
    }));
    it("should return error 400 company validation error object", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockCheckEligibility[400]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getEligibility(COMPANY_NUMBER);
        chai_1.expect(data.httpStatusCode).to.equal(400);
        chai_1.expect(data.resource.eligibilityStatusCode).to.equal(mockValues.mockCompanyValidationResponseResourceCompanyNotFound.eligibility_status_code);
    }));
    it("should return error 401 - Unauthorised", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockCheckEligibility[401]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getEligibility(COMPANY_NUMBER);
        chai_1.expect(data.httpStatusCode).to.equal(401);
        chai_1.expect(data.resource).to.be.undefined;
    }));
    it("should return error 404 - not found", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockCheckEligibility[404]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getEligibility(COMPANY_NUMBER);
        chai_1.expect(data.httpStatusCode).to.equal(404);
        chai_1.expect(data.resource).to.be.undefined;
    }));
    it("should return error 500 - Internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockCheckEligibility[500]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getEligibility(COMPANY_NUMBER);
        chai_1.expect(data.httpStatusCode).to.equal(500);
        chai_1.expect(data.resource).to.be.undefined;
    }));
    it("should throw error if no body received from API", () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedErrorMessage = "No body or error body returned from confirmation-statement/company/11111111/eligibility API call - http status from API = 202";
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockCheckEligibility[202]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        yield chai_1.expect(csService.getEligibility(COMPANY_NUMBER)).to.be.rejectedWith(expectedErrorMessage);
    }));
});
describe("create confirmation statement POST", () => {
    it("should return creation object", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockCreatePostResponse[201]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.postNewConfirmationStatement(TRANSACTION_ID);
        const createdConfirmationStatement = data.resource;
        chai_1.expect(data.httpStatusCode).to.equal(201);
        chai_1.expect(createdConfirmationStatement.id).to.equal(mockValues.mockConfirmationStatementCreatedResource.id);
    }));
    it("should return error 400 company validation error object", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockCreatePostResponse[400]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.postNewConfirmationStatement(TRANSACTION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(400);
        const resource = data.resource;
        chai_1.expect(resource.eligibilityStatusCode).to.equal(mockValues.mockCompanyValidationResponseResourceCompanyNotFound.eligibility_status_code);
    }));
    it("should return error 401 - Unauthorised", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockCreatePostResponse[401]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.postNewConfirmationStatement(TRANSACTION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(401);
        chai_1.expect(data.errors[0]).to.equal("Unauthorised");
    }));
    it("should return error 404 - not found", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockCreatePostResponse[404]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.postNewConfirmationStatement(TRANSACTION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(404);
        chai_1.expect(data.errors[0]).to.equal("No Confirmation Statement found");
    }));
    it("should return error 500 - Internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockCreatePostResponse[500]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.postNewConfirmationStatement(TRANSACTION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(500);
        chai_1.expect(data.errors[0]).to.equal("Internal server error");
    }));
});
describe("Update confirmation statement POST", () => {
    it("should return update object", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSubmitPostResponse[200]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.postUpdateConfirmationStatement(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID, mockValues.mockConfirmationStatementSubmission);
        chai_1.expect(data.httpStatusCode).to.equal(200);
        const updatedConfirmationStatement = data.resource;
        const mockSubmission = mockValues.mockConfirmationStatementSubmissionResource;
        chai_1.expect(updatedConfirmationStatement.id).to.equal(mockSubmission.id);
        chai_1.expect(updatedConfirmationStatement.data.confirmationStatementMadeUpToDate).to.equal(mockSubmission.data.confirmation_statement_made_up_to_date);
        chai_1.expect(updatedConfirmationStatement.data.statementOfCapitalData.sectionStatus).to.equal(mockSubmission.data.statement_of_capital_data.section_status);
        chai_1.expect(updatedConfirmationStatement.data.statementOfCapitalData.statementOfCapital.classOfShares).to.equal(mockSubmission.data.statement_of_capital_data.statement_of_capital.class_of_shares);
        chai_1.expect(updatedConfirmationStatement.data.sicCodeData.sectionStatus).to.equal(mockSubmission.data.sic_code_data.section_status);
        chai_1.expect(updatedConfirmationStatement.data.sicCodeData.sicCode.code).to.equal(mockSubmission.data.sic_code_data.sic_code.code);
        chai_1.expect(updatedConfirmationStatement.data.registeredOfficeAddressData.sectionStatus).to.equal(mockSubmission.data.registered_office_address_data.section_status);
        chai_1.expect(updatedConfirmationStatement.data.registeredEmailAddressData.sectionStatus).to.equal(mockSubmission.data.registered_email_address_data.section_status);
        chai_1.expect(updatedConfirmationStatement.data.activeOfficerDetailsData.sectionStatus).to.equal(mockSubmission.data.active_officer_details_data.section_status);
        chai_1.expect(updatedConfirmationStatement.data.shareholderData.sectionStatus).to.equal(mockSubmission.data.shareholder_data.section_status);
        chai_1.expect(updatedConfirmationStatement.data.registerLocationsData.sectionStatus).to.equal(mockSubmission.data.register_locations_data.section_status);
        chai_1.expect(updatedConfirmationStatement.data.tradingStatusData.tradingStatusAnswer).to.equal(mockSubmission.data.trading_status_data.trading_status_answer);
        chai_1.expect(updatedConfirmationStatement.data.acceptLawfulPurposeStatement).to.equal(mockSubmission.data.accept_lawful_purpose_statement);
    }));
    it("should return error 404 - not found", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSubmitPostResponse[404]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.postUpdateConfirmationStatement(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID, mockValues.mockConfirmationStatementSubmission);
        chai_1.expect(data.httpStatusCode).to.equal(404);
    }));
});
describe("submit confirmation statement POST", () => {
    it("should confirmation submission object for submission post method", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSubmitPostResponse[202]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.postConfirmationStatementSubmission(TRANSACTION_ID);
        const confirmationStatementSubmission = data.resource;
        chai_1.expect(data.httpStatusCode).to.equal(202);
        chai_1.expect(confirmationStatementSubmission.id).to.equal(mockValues.mockConfirmationStatementSubmissionResource.id);
    }));
    it("should return error 401 - Unauthorised", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSubmitPostResponse[401]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.postConfirmationStatementSubmission(TRANSACTION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(401);
        chai_1.expect(data.resource).to.be.undefined;
    }));
    it("should return error 404 - not found", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSubmitPostResponse[404]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.postConfirmationStatementSubmission(TRANSACTION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(404);
        chai_1.expect(data.resource).to.be.undefined;
    }));
    it("should return error 500 - Internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSubmitPostResponse[500]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.postConfirmationStatementSubmission(TRANSACTION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(500);
        chai_1.expect(data.resource).to.be.undefined;
    }));
});
describe("statement of capital data GET", () => {
    it("should return statement of capital object", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetStatementOfCapital[200]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getStatementOfCapital(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect(data.resource.classOfShares).to.equal(mockValues.mockStatementOfCapital.class_of_shares);
    }));
    it("should not return statement of capital object", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetStatementOfCapital[404]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getStatementOfCapital(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        chai_1.expect(data.httpStatusCode).to.equal(404);
        chai_1.expect(data.errors[0]).to.equal("No statement of capital data found");
    }));
});
describe("Active officer details GET", () => {
    it("should return active officer details object", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetActiveOfficerDetails[200]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getActiveOfficerDetails(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect(data.resource.dateOfBirth).to.equal(mockValues.mockActiveOfficerDetails.date_of_birth);
    }));
    it("should return error 404 - No active director details were found", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetActiveOfficerDetails[404]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getActiveOfficerDetails(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        chai_1.expect(data.httpStatusCode).to.equal(404);
        chai_1.expect(data.errors[0]).to.equal("No active director details were found");
    }));
    it("should return error 500 - Internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetActiveOfficerDetails[500]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getActiveOfficerDetails(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        chai_1.expect(data.httpStatusCode).to.equal(500);
        chai_1.expect(data.errors[0]).to.equal("Internal server error");
    }));
});
describe("List active officers details GET", () => {
    it("should return active officer details object", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetListActiveOfficersDetails[200]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getListActiveOfficerDetails(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect(data.resource[1].dateOfBirth).to.equal(mockValues.mockActiveOfficerDetails.date_of_birth);
    }));
    it("should return error 404 - No active director details were found", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetListActiveOfficersDetails[404]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getListActiveOfficerDetails(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        chai_1.expect(data.httpStatusCode).to.equal(404);
        chai_1.expect(data.errors[0]).to.equal("No active officers details were found");
    }));
    it("should return error 500 - Internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetListActiveOfficersDetails[500]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getListActiveOfficerDetails(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        chai_1.expect(data.httpStatusCode).to.equal(500);
        chai_1.expect(data.errors[0]).to.equal("Internal server error");
    }));
});
describe("persons with significant control GET", () => {
    it("should return a list of persons with significant control", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(confirmation_statement_mock_1.mockGetPersonsOfSignificantControl[200]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getPersonsOfSignificantControl(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect(data.resource[0].nameElements.surname).to.equal("Smith");
        chai_1.expect(data.resource[0].nameElements.middleName).to.be.undefined;
        chai_1.expect(data.resource[1].nameElements.surname).to.equal("Johnson");
        chai_1.expect(data.resource[1].naturesOfControl).to.be.undefined;
        chai_1.expect(data.resource[0].dateOfBirthIso).to.equal("1984-01-23");
        chai_1.expect(data.resource[1].dateOfBirthIso).to.be.undefined;
        chai_1.expect((_a = data.resource[0].serviceAddress) === null || _a === void 0 ? void 0 : _a.addressLine1).to.equal("10 This road");
        chai_1.expect((_b = data.resource[0].address) === null || _b === void 0 ? void 0 : _b.addressLine1).to.equal("20 Any road");
    }));
    it("should not map missing address or names", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves({ status: 200, body: mockValues.mockPscNoNameNoAddress });
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getPersonsOfSignificantControl(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect(data.resource[0].nameElements).to.be.undefined;
        chai_1.expect(data.resource[0].address).to.be.undefined;
        chai_1.expect(data.resource[0].serviceAddress).to.be.undefined;
        chai_1.expect(data.resource[0].appointmentType).to.equal("1");
    }));
    it("should return error 500 - Internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(confirmation_statement_mock_1.mockGetPersonsOfSignificantControl[500]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getPersonsOfSignificantControl(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        chai_1.expect(data.httpStatusCode).to.equal(500);
        chai_1.expect(data.errors[0]).to.equal("Internal server error");
    }));
});
describe("Shareholder GET", () => {
    it("should return a list of shareholder", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(confirmation_statement_mock_1.mockGetShareholder[200]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getShareholders(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect(data.resource[0].surname).to.equal("Lewis");
        chai_1.expect(data.resource[0].foreName2).to.undefined;
        chai_1.expect(data.resource[1].surname).to.equal("Bond");
    }));
    it("should return a 500 error - Internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(confirmation_statement_mock_1.mockGetShareholder[500]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getShareholders(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        chai_1.expect(data.httpStatusCode).to.equal(500);
        chai_1.expect(data.errors[0]).to.equal("Internal server error");
    }));
});
describe("Register Location GET", () => {
    it("should return a list of registers and their locations", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(confirmation_statement_mock_1.mockGetRegisterLocations[200]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getRegisterLocations(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect(data.resource[0].registerTypeDesc).to.equal("Reg Type Desc 1");
        chai_1.expect(data.resource[0].sailAddress.addressLine1).to.equal("20 Any road");
        chai_1.expect(data.resource[1].registerTypeDesc).to.equal("Reg Type Desc 2");
    }));
    it("should return a 500 error - Internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(confirmation_statement_mock_1.mockGetRegisterLocations[500]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getRegisterLocations(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        chai_1.expect(data.httpStatusCode).to.equal(500);
        chai_1.expect(data.errors[0]).to.equal("Internal server error");
    }));
});
describe("confirmation statement submission GET", () => {
    it("should return confirmation statement submission object", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetConfirmationStatementSubmission[200]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getConfirmationStatementSubmission(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        const mockResource = mockValues.mockConfirmationStatementSubmissionResource;
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect(data.resource.id).to.equal(mockResource.id);
        chai_1.expect(data.resource.links).to.equal(mockResource.links);
        chai_1.expect(data.resource.data.confirmationStatementMadeUpToDate).to.equal(mockResource.data.confirmation_statement_made_up_to_date);
        chai_1.expect(data.resource.data.statementOfCapitalData.sectionStatus).to.equal(mockResource.data.statement_of_capital_data.section_status);
        const statementOfCapital = data.resource.data.statementOfCapitalData.statementOfCapital;
        const mockStatementOfCapital = mockResource.data.statement_of_capital_data.statement_of_capital;
        chai_1.expect(statementOfCapital.aggregateNominalValue).to.equal(mockStatementOfCapital.aggregate_nominal_value);
        chai_1.expect(statementOfCapital.classOfShares).to.equal(mockStatementOfCapital.class_of_shares);
        chai_1.expect(statementOfCapital.currency).to.equal(mockStatementOfCapital.currency);
        chai_1.expect(statementOfCapital.numberAllotted).to.equal(mockStatementOfCapital.number_allotted);
        chai_1.expect(statementOfCapital.prescribedParticulars).to.equal(mockStatementOfCapital.prescribed_particulars);
        chai_1.expect(statementOfCapital.totalAggregateNominalValue).to.equal(mockStatementOfCapital.total_aggregate_nominal_value);
        chai_1.expect(statementOfCapital.totalAmountUnpaidForCurrency).to.equal(mockStatementOfCapital.total_amount_unpaid_for_currency);
        chai_1.expect(statementOfCapital.totalNumberOfShares).to.equal(mockStatementOfCapital.total_number_of_shares);
        chai_1.expect(data.resource.data.acceptLawfulPurposeStatement).to.equal(mockResource.data.accept_lawful_purpose_statement);
    }));
    it("should return confirmation statement submission object with no statement of capital", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves({ status: 200, body: mockValues.mockConfirmationStatementSubmissionResourceNoSOC });
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getConfirmationStatementSubmission(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect(data.resource.id).to.equal(mockValues.mockConfirmationStatementSubmissionResourceNoSOC.id);
        chai_1.expect(data.resource.links).to.equal(mockValues.mockConfirmationStatementSubmissionResourceNoSOC.links);
        chai_1.expect(data.resource.data.statementOfCapitalData.sectionStatus).to.equal(mockValues.mockConfirmationStatementSubmissionResourceNoSOC.data.statement_of_capital_data.section_status);
        chai_1.expect(data.resource.data.statementOfCapitalData.statementOfCapital).to.be.undefined;
    }));
    it("should return error info when confirmation statement submission not returned", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetConfirmationStatementSubmission[404]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getConfirmationStatementSubmission(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        chai_1.expect(data.httpStatusCode).to.equal(404);
        chai_1.expect(data.errors[0]).to.equal("No confirmation statement submission found");
    }));
    it("should return confirmation statement submission object with registered email address", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetConfirmationStatementSubmission[200]);
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const data = yield csService.getConfirmationStatementSubmission(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);
        const mockResource = mockValues.mockConfirmationStatementSubmissionResource;
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect(data.resource.id).to.equal(mockResource.id);
        chai_1.expect(data.resource.links).to.equal(mockResource.links);
        chai_1.expect(data.resource.data.confirmationStatementMadeUpToDate).to.equal(mockResource.data.confirmation_statement_made_up_to_date);
        chai_1.expect(data.resource.data.registeredEmailAddressData.sectionStatus).to.equal(mockResource.data.registered_email_address_data.section_status);
        chai_1.expect(data.resource.data.registeredEmailAddressData.registeredEmailAddress).to.equal(mockResource.data.registered_email_address_data.registered_email_address);
    }));
});
describe("getNextMadeUpToDate tests", () => {
    it("Should not map optional fields when filing is due", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves({ status: 200, body: mockValues.mockNextMadeUpToDateResourceIsDue });
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const response = yield csService.getNextMadeUpToDate(COMPANY_NUMBER);
        const nextMadeUpToDate = response.resource;
        chai_1.expect(response.httpStatusCode).to.equal(200);
        chai_1.expect(nextMadeUpToDate.currentNextMadeUpToDate).to.equal(mockValues.mockNextMadeUpToDateResourceIsDue.current_next_made_up_to_date);
        chai_1.expect(nextMadeUpToDate.isDue).to.equal(mockValues.mockNextMadeUpToDateResourceIsDue.is_due);
        chai_1.expect(nextMadeUpToDate.newNextMadeUpToDate).to.be.undefined;
    }));
    it("Should map optional fields when filing is not due", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves({ status: 200, body: mockValues.mockNextMadeUpToDateResourceIsNotDue });
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const response = yield csService.getNextMadeUpToDate(COMPANY_NUMBER);
        const nextMadeUpToDate = response.resource;
        chai_1.expect(response.httpStatusCode).to.equal(200);
        chai_1.expect(nextMadeUpToDate.currentNextMadeUpToDate).to.equal(mockValues.mockNextMadeUpToDateResourceIsNotDue.current_next_made_up_to_date);
        chai_1.expect(nextMadeUpToDate.isDue).to.equal(mockValues.mockNextMadeUpToDateResourceIsNotDue.is_due);
        chai_1.expect(nextMadeUpToDate.newNextMadeUpToDate).not.to.be.undefined;
        chai_1.expect(nextMadeUpToDate.newNextMadeUpToDate).to.equal(mockValues.mockNextMadeUpToDateResourceIsNotDue.new_next_made_up_to_date);
    }));
    it("Should not map optional fields when no cs found in company profile", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves({ status: 200, body: mockValues.mockNextMadeUpToDateResourceNoCs });
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const response = yield csService.getNextMadeUpToDate(COMPANY_NUMBER);
        const nextMadeUpToDate = response.resource;
        chai_1.expect(response.httpStatusCode).to.equal(200);
        chai_1.expect(nextMadeUpToDate.currentNextMadeUpToDate).to.be.null;
        chai_1.expect(nextMadeUpToDate.isDue).to.be.undefined;
        chai_1.expect(nextMadeUpToDate.newNextMadeUpToDate).to.be.undefined;
    }));
    it("Should return an error when api response status >= 400", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves({ status: 404, error: "Not Found" });
        const csService = new confirmation_statement_1.ConfirmationStatementService(mockValues.requestClient);
        const response = yield csService.getNextMadeUpToDate(COMPANY_NUMBER);
        chai_1.expect(response.httpStatusCode).to.equal(404);
        chai_1.expect(response.errors[0]).to.equal("Not Found");
    }));
});
//# sourceMappingURL=confirmation.statement.spec.js.map
import {
    ActiveDirectorDetails,
    CompanyValidationResponse,
    ConfirmationStatementCreated,
    ConfirmationStatementService,
    ConfirmationStatementSubmission,
    PersonOfSignificantControl,
    StatementOfCapital,
    StatementOfCapitalResource,
    Shareholder,
    RegisterLocation,
    NextMadeUpToDate
} from "../../../src/services/confirmation-statement";
import * as mockValues from "./confirmation.statement.mock";
import { expect } from "chai";
import sinon from "sinon";
import { mockGetPersonsOfSignificantControl, mockGetShareholder, mockGetRegisterLocations } from "./confirmation.statement.mock";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";

const TRANSACTION_ID = "12345";
const CONFIRMATION_STATEMENT_ID = "r4nd0m";
const COMPANY_NUMBER = "11111111";

beforeEach(() => {
    sinon.reset();
    sinon.restore();
});

afterEach(done => {
    sinon.reset();
    sinon.restore();
    done();
});

describe("check eligibility GET", () => {
    it("should return company validation object", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockCheckEligibility[200]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data = await csService.getEligibility(COMPANY_NUMBER);

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.eligibilityStatusCode).to.equal(mockValues.mockCompanyValidationResponseResourceOk.eligibility_status_code);
    });

    it("should return error 400 company validation error object", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockCheckEligibility[400]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data = await csService.getEligibility(COMPANY_NUMBER);

        expect(data.httpStatusCode).to.equal(400);
        expect(data.resource.eligibilityStatusCode).to.equal(mockValues.mockCompanyValidationResponseResourceCompanyNotFound.eligibility_status_code);
    });

    it("should return error 401 - Unauthorised", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockCheckEligibility[401]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data = await csService.getEligibility(COMPANY_NUMBER);

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("should return error 404 - not found", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockCheckEligibility[404]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data = await csService.getEligibility(COMPANY_NUMBER);

        expect(data.httpStatusCode).to.equal(404);
        expect(data.resource).to.be.undefined;
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockCheckEligibility[500]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data = await csService.getEligibility(COMPANY_NUMBER);

        expect(data.httpStatusCode).to.equal(500);
        expect(data.resource).to.be.undefined;
    });

    it("should throw error if no body received from API", async () => {
        const expectedErrorMessage = "No body or error body returned from confirmation-statement/company/11111111/eligibility API call - http status from API = 202";
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockCheckEligibility[202]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        await expect(csService.getEligibility(COMPANY_NUMBER)).to.be.rejectedWith(expectedErrorMessage);
    });
});

describe("create confirmation statement POST", () => {
    it("should return creation object", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockCreatePostResponse[201]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<ConfirmationStatementCreated> =
          await csService.postNewConfirmationStatement(TRANSACTION_ID) as Resource<ConfirmationStatementCreated>;

        const createdConfirmationStatement = data.resource as ConfirmationStatementCreated;
        expect(data.httpStatusCode).to.equal(201);
        expect(createdConfirmationStatement.id).to.equal(mockValues.mockConfirmationStatementCreatedResource.id);
    });

    it("should return error 400 company validation error object", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockCreatePostResponse[400]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<CompanyValidationResponse> =
          await csService.postNewConfirmationStatement(TRANSACTION_ID) as Resource<CompanyValidationResponse>;

        expect(data.httpStatusCode).to.equal(400);
        const resource: CompanyValidationResponse = data.resource as CompanyValidationResponse;
        expect(resource.eligibilityStatusCode).to.equal(mockValues.mockCompanyValidationResponseResourceCompanyNotFound.eligibility_status_code);
    });

    it("should return error 401 - Unauthorised", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockCreatePostResponse[401]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse =
          await csService.postNewConfirmationStatement(TRANSACTION_ID) as ApiErrorResponse;

        expect(data.httpStatusCode).to.equal(401);
        expect(data.errors[0]).to.equal("Unauthorised");
    });

    it("should return error 404 - not found", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockCreatePostResponse[404]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse =
        await csService.postNewConfirmationStatement(TRANSACTION_ID) as ApiErrorResponse;

        expect(data.httpStatusCode).to.equal(404);
        expect(data.errors[0]).to.equal("No Confirmation Statement found");
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockCreatePostResponse[500]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse =
        await csService.postNewConfirmationStatement(TRANSACTION_ID) as ApiErrorResponse;

        expect(data.httpStatusCode).to.equal(500);
        expect(data.errors[0]).to.equal("Internal server error");
    });
});

describe("Update confirmation statement POST", () => {
    it("should return update object", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSubmitPostResponse[200]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<ConfirmationStatementSubmission> = await csService.postUpdateConfirmationStatement(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID,
            mockValues.mockConfirmationStatementSubmission) as Resource<ConfirmationStatementSubmission>

        expect(data.httpStatusCode).to.equal(200);
        const updatedConfirmationStatement = data.resource;
        const mockSubmission = mockValues.mockConfirmationStatementSubmissionResource;
        expect(updatedConfirmationStatement.id).to.equal(mockSubmission.id);
        expect(updatedConfirmationStatement.data.confirmationStatementMadeUpToDate).to.equal(mockSubmission.data.confirmation_statement_made_up_to_date);
        expect(updatedConfirmationStatement.data.statementOfCapitalData.sectionStatus).to.equal(mockSubmission.data.statement_of_capital_data.section_status);
        expect(updatedConfirmationStatement.data.statementOfCapitalData.statementOfCapital.classOfShares).to.equal(mockSubmission.data.statement_of_capital_data.statement_of_capital.class_of_shares);
        expect(updatedConfirmationStatement.data.sicCodeData.sectionStatus).to.equal(mockSubmission.data.sic_code_data.section_status);
        expect(updatedConfirmationStatement.data.sicCodeData.sicCode.code).to.equal(mockSubmission.data.sic_code_data.sic_code.code);
        expect(updatedConfirmationStatement.data.registeredOfficeAddressData.sectionStatus).to.equal(mockSubmission.data.registered_office_address_data.section_status);
        expect(updatedConfirmationStatement.data.activeDirectorDetailsData.sectionStatus).to.equal(mockSubmission.data.active_director_details_data.section_status);
        expect(updatedConfirmationStatement.data.shareholderData.sectionStatus).to.equal(mockSubmission.data.shareholder_data.section_status);
        expect(updatedConfirmationStatement.data.registerLocationsData.sectionStatus).to.equal(mockSubmission.data.register_locations_data.section_status);
        expect(updatedConfirmationStatement.data.tradingStatusData.tradingStatusAnswer).to.equal(mockSubmission.data.trading_status_data.trading_status_answer);
    });

    it("should return error 404 - not found", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSubmitPostResponse[404]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse =
        await csService.postUpdateConfirmationStatement(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID,
            mockValues.mockConfirmationStatementSubmission) as ApiErrorResponse;

        expect(data.httpStatusCode).to.equal(404);
    });
});

describe("submit confirmation statement POST", () => {
    it("should confirmation submission object for submission post method", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSubmitPostResponse[202]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data = await csService.postConfirmationStatementSubmission(TRANSACTION_ID);

        const confirmationStatementSubmission = data.resource as ConfirmationStatementSubmission;
        expect(data.httpStatusCode).to.equal(202);

        expect(confirmationStatementSubmission.id).to.equal(mockValues.mockConfirmationStatementSubmissionResource.id);
    });

    it("should return error 401 - Unauthorised", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSubmitPostResponse[401]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data = await csService.postConfirmationStatementSubmission(TRANSACTION_ID);

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("should return error 404 - not found", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSubmitPostResponse[404]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data = await csService.postConfirmationStatementSubmission(TRANSACTION_ID);

        expect(data.httpStatusCode).to.equal(404);
        expect(data.resource).to.be.undefined;
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSubmitPostResponse[500]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data = await csService.postConfirmationStatementSubmission(TRANSACTION_ID);

        expect(data.httpStatusCode).to.equal(500);
        expect(data.resource).to.be.undefined;
    });
});

describe("statement of capital data GET", () => {
    it("should return statement of capital object", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetStatementOfCapital[200]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<StatementOfCapital> = await csService.getStatementOfCapital(COMPANY_NUMBER) as Resource<StatementOfCapital>;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.classOfShares).to.equal(mockValues.mockStatementOfCapital.class_of_shares);
    });

    it("should not return statement of capital object", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetStatementOfCapital[404]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse = await csService.getStatementOfCapital(COMPANY_NUMBER);

        expect(data.httpStatusCode).to.equal(404);
        expect(data.errors[0]).to.equal("No statement of capital data found");
    });
});

describe("Active officer details GET", () => {
    it("should return active officer details object", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetActiveDirectorDetails[200]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<ActiveDirectorDetails> = await csService.getActiveDirectorDetails(COMPANY_NUMBER) as Resource<ActiveDirectorDetails>;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.dateOfBirth).to.equal(mockValues.mockActiveDirectorDetails.date_of_birth);
    });

    it("should return error 404 - No active director details were found", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetActiveDirectorDetails[404]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse = await csService.getActiveDirectorDetails(COMPANY_NUMBER);

        expect(data.httpStatusCode).to.equal(404);
        expect(data.errors[0]).to.equal("No active director details were found");
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetActiveDirectorDetails[500]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse = await csService.getActiveDirectorDetails(COMPANY_NUMBER);

        expect(data.httpStatusCode).to.equal(500);
        expect(data.errors[0]).to.equal("Internal server error");
    });
});

describe("persons with significant control GET", () => {
    it("should return a list of persons with significant control", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockGetPersonsOfSignificantControl[200]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<PersonOfSignificantControl[]> = await csService.getPersonsOfSignificantControl(COMPANY_NUMBER) as Resource<PersonOfSignificantControl[]>;
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource[0].nameElements.surname).to.equal("Smith");
        expect(data.resource[0].nameElements.middleName).to.be.undefined;
        expect(data.resource[1].nameElements.surname).to.equal("Johnson");
        expect(data.resource[1].naturesOfControl).to.be.undefined;
        expect(data.resource[0].dateOfBirthIso).to.equal("1984-01-23");
        expect(data.resource[1].dateOfBirthIso).to.be.undefined;
        expect(data.resource[0].serviceAddressArea).to.equal("area");
        expect(data.resource[0].serviceAddressCareOf).to.equal("care of");
        expect(data.resource[0].serviceAddressCountryName).to.equal("country name");
        expect(data.resource[0].serviceAddressPoBox).to.equal("po box");
        expect(data.resource[0].serviceAddressRegion).to.equal("region");
        expect(data.resource[0].serviceAddressHouseNameNumber).to.equal("house name number");
    });

    it("should not map missing address or names", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves({ status: 200, body: mockValues.mockPscNoNameNoAddress });
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<PersonOfSignificantControl[]> = await csService.getPersonsOfSignificantControl(COMPANY_NUMBER) as Resource<PersonOfSignificantControl[]>;
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource[0].nameElements).to.be.undefined;
        expect(data.resource[0].address).to.be.undefined;
        expect(data.resource[0].appointmentType).to.equal("1");
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockGetPersonsOfSignificantControl[500]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse = await csService.getPersonsOfSignificantControl(COMPANY_NUMBER) as ApiErrorResponse;
        expect(data.httpStatusCode).to.equal(500);
        expect(data.errors[0]).to.equal("Internal server error");
    });
});

describe("Shareholder GET", () => {
    it("should return a list of shareholder", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockGetShareholder[200]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<Shareholder[]> = await csService.getShareholders(COMPANY_NUMBER) as Resource<Shareholder[]>;
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource[0].surname).to.equal("Lewis");
        expect(data.resource[0].foreName2).to.undefined;
        expect(data.resource[1].surname).to.equal("Bond");
    });

    it("should return a 500 error - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockGetShareholder[500]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse = await csService.getShareholders(COMPANY_NUMBER) as ApiErrorResponse;
        expect(data.httpStatusCode).to.equal(500);
        expect(data.errors[0]).to.equal("Internal server error");
    });
});

describe("Register Location GET", () => {
    it("should return a list of registers and their locations", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockGetRegisterLocations[200]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<RegisterLocation[]> = await csService.getRegisterLocations(COMPANY_NUMBER) as Resource<RegisterLocation[]>;
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource[0].registerTypeDesc).to.equal("Reg Type Desc 1");
        expect(data.resource[0].sailAddress.addressLine1).to.equal("20 Any road");
        expect(data.resource[1].registerTypeDesc).to.equal("Reg Type Desc 2");
    });

    it("should return a 500 error - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockGetRegisterLocations[500]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse = await csService.getRegisterLocations(COMPANY_NUMBER) as ApiErrorResponse;
        expect(data.httpStatusCode).to.equal(500);
        expect(data.errors[0]).to.equal("Internal server error");
    });
});

describe("confirmation statement submission GET", () => {
    it("should return confirmation statement submission object", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetConfirmationStatementSubmission[200]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<ConfirmationStatementSubmission> =
            await csService.getConfirmationStatementSubmission(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID) as Resource<ConfirmationStatementSubmission>;

        const mockResource = mockValues.mockConfirmationStatementSubmissionResource;
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.id).to.equal(mockResource.id);
        expect(data.resource.links).to.equal(mockResource.links);
        expect(data.resource.data.confirmationStatementMadeUpToDate).to.equal(mockResource.data.confirmation_statement_made_up_to_date);
        expect(data.resource.data.statementOfCapitalData.sectionStatus).to.equal(mockResource.data.statement_of_capital_data.section_status);
        const statementOfCapital: StatementOfCapital = data.resource.data.statementOfCapitalData.statementOfCapital;
        const mockStatementOfCapital: StatementOfCapitalResource = mockResource.data.statement_of_capital_data.statement_of_capital
        expect(statementOfCapital.aggregateNominalValue).to.equal(mockStatementOfCapital.aggregate_nominal_value);
        expect(statementOfCapital.classOfShares).to.equal(mockStatementOfCapital.class_of_shares);
        expect(statementOfCapital.currency).to.equal(mockStatementOfCapital.currency);
        expect(statementOfCapital.numberAllotted).to.equal(mockStatementOfCapital.number_allotted);
        expect(statementOfCapital.prescribedParticulars).to.equal(mockStatementOfCapital.prescribed_particulars);
        expect(statementOfCapital.totalAggregateNominalValue).to.equal(mockStatementOfCapital.total_aggregate_nominal_value);
        expect(statementOfCapital.totalAmountUnpaidForCurrency).to.equal(mockStatementOfCapital.total_amount_unpaid_for_currency);
        expect(statementOfCapital.totalNumberOfShares).to.equal(mockStatementOfCapital.total_number_of_shares);
    });

    it("should return confirmation statement submission object with no statement of capital", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves({ status: 200, body: mockValues.mockConfirmationStatementSubmissionResourceNoSOC });
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<ConfirmationStatementSubmission> =
            await csService.getConfirmationStatementSubmission(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID) as Resource<ConfirmationStatementSubmission>;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.id).to.equal(mockValues.mockConfirmationStatementSubmissionResourceNoSOC.id);
        expect(data.resource.links).to.equal(mockValues.mockConfirmationStatementSubmissionResourceNoSOC.links)
        expect(data.resource.data.statementOfCapitalData.sectionStatus).to.equal(mockValues.mockConfirmationStatementSubmissionResourceNoSOC.data.statement_of_capital_data.section_status);
        expect(data.resource.data.statementOfCapitalData.statementOfCapital).to.be.undefined;
    });

    it("should return error info when confirmation statement submission not returned", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetConfirmationStatementSubmission[404]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse =
            await csService.getConfirmationStatementSubmission(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID) as Resource<ApiErrorResponse>;

        expect(data.httpStatusCode).to.equal(404);
        expect(data.errors[0]).to.equal("No confirmation statement submission found");
    });
});

describe("getNextMadeUpToDate tests", () => {
    it("Should not map optional fields when filing is due", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves({ status: 200, body: mockValues.mockNextMadeUpToDateResourceIsDue });
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const response: Resource<NextMadeUpToDate> = await csService.getNextMadeUpToDate(COMPANY_NUMBER) as Resource<NextMadeUpToDate>;
        const nextMadeUpToDate: NextMadeUpToDate = response.resource;

        expect(response.httpStatusCode).to.equal(200);
        expect(nextMadeUpToDate.currentNextMadeUpToDate).to.equal(mockValues.mockNextMadeUpToDateResourceIsDue.current_next_made_up_to_date);
        expect(nextMadeUpToDate.isDue).to.equal(mockValues.mockNextMadeUpToDateResourceIsDue.is_due);
        expect(nextMadeUpToDate.newNextMadeUpToDate).to.be.undefined;
    });

    it("Should map optional fields when filing is not due", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves({ status: 200, body: mockValues.mockNextMadeUpToDateResourceIsNotDue });
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const response: Resource<NextMadeUpToDate> = await csService.getNextMadeUpToDate(COMPANY_NUMBER) as Resource<NextMadeUpToDate>;
        const nextMadeUpToDate: NextMadeUpToDate = response.resource;

        expect(response.httpStatusCode).to.equal(200);
        expect(nextMadeUpToDate.currentNextMadeUpToDate).to.equal(mockValues.mockNextMadeUpToDateResourceIsNotDue.current_next_made_up_to_date);
        expect(nextMadeUpToDate.isDue).to.equal(mockValues.mockNextMadeUpToDateResourceIsNotDue.is_due);
        expect(nextMadeUpToDate.newNextMadeUpToDate).not.to.be.undefined;
        expect(nextMadeUpToDate.newNextMadeUpToDate).to.equal(mockValues.mockNextMadeUpToDateResourceIsNotDue.new_next_made_up_to_date);
    });

    it("Should not map optional fields when no cs found in company profile", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves({ status: 200, body: mockValues.mockNextMadeUpToDateResourceNoCs });
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const response: Resource<NextMadeUpToDate> = await csService.getNextMadeUpToDate(COMPANY_NUMBER) as Resource<NextMadeUpToDate>;
        const nextMadeUpToDate: NextMadeUpToDate = response.resource;

        expect(response.httpStatusCode).to.equal(200);
        expect(nextMadeUpToDate.currentNextMadeUpToDate).to.be.null;
        expect(nextMadeUpToDate.isDue).to.be.undefined
        expect(nextMadeUpToDate.newNextMadeUpToDate).to.be.undefined;
    });

    it("Should return an error when api response status >= 400", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves({ status: 404, error: "Not Found" });
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const response: ApiErrorResponse = await csService.getNextMadeUpToDate(COMPANY_NUMBER) as ApiErrorResponse;

        expect(response.httpStatusCode).to.equal(404);
        expect(response.errors[0]).to.equal("Not Found");
    });
});

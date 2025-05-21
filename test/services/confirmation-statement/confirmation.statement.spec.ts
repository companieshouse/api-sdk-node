import {
    ActiveOfficerDetails,
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

        expect(data.httpStatusCode).toBe(200);
        expect(data.resource.eligibilityStatusCode).toBe(mockValues.mockCompanyValidationResponseResourceOk.eligibility_status_code);
    });

    it("should return error 400 company validation error object", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockCheckEligibility[400]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data = await csService.getEligibility(COMPANY_NUMBER);

        expect(data.httpStatusCode).toBe(400);
        expect(data.resource.eligibilityStatusCode).toBe(
            mockValues.mockCompanyValidationResponseResourceCompanyNotFound.eligibility_status_code
        );
    });

    it("should return error 401 - Unauthorised", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockCheckEligibility[401]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data = await csService.getEligibility(COMPANY_NUMBER);

        expect(data.httpStatusCode).toBe(401);
        expect(data.resource).toBeUndefined();
    });

    it("should return error 404 - not found", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockCheckEligibility[404]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data = await csService.getEligibility(COMPANY_NUMBER);

        expect(data.httpStatusCode).toBe(404);
        expect(data.resource).toBeUndefined();
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockCheckEligibility[500]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data = await csService.getEligibility(COMPANY_NUMBER);

        expect(data.httpStatusCode).toBe(500);
        expect(data.resource).toBeUndefined();
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
        expect(data.httpStatusCode).toBe(201);
        expect(createdConfirmationStatement.id).toBe(mockValues.mockConfirmationStatementCreatedResource.id);
    });

    it("should return error 400 company validation error object", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockCreatePostResponse[400]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<CompanyValidationResponse> =
          await csService.postNewConfirmationStatement(TRANSACTION_ID) as Resource<CompanyValidationResponse>;

        expect(data.httpStatusCode).toBe(400);
        const resource: CompanyValidationResponse = data.resource as CompanyValidationResponse;
        expect(resource.eligibilityStatusCode).toBe(
            mockValues.mockCompanyValidationResponseResourceCompanyNotFound.eligibility_status_code
        );
    });

    it("should return error 401 - Unauthorised", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockCreatePostResponse[401]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse =
          await csService.postNewConfirmationStatement(TRANSACTION_ID) as ApiErrorResponse;

        expect(data.httpStatusCode).toBe(401);
        expect(data.errors[0]).toBe("Unauthorised");
    });

    it("should return error 404 - not found", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockCreatePostResponse[404]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse =
        await csService.postNewConfirmationStatement(TRANSACTION_ID) as ApiErrorResponse;

        expect(data.httpStatusCode).toBe(404);
        expect(data.errors[0]).toBe("No Confirmation Statement found");
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockCreatePostResponse[500]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse =
        await csService.postNewConfirmationStatement(TRANSACTION_ID) as ApiErrorResponse;

        expect(data.httpStatusCode).toBe(500);
        expect(data.errors[0]).toBe("Internal server error");
    });
});

describe("Update confirmation statement POST", () => {
    it("should return update object", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSubmitPostResponse[200]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<ConfirmationStatementSubmission> = await csService.postUpdateConfirmationStatement(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID,
            mockValues.mockConfirmationStatementSubmission) as Resource<ConfirmationStatementSubmission>

        expect(data.httpStatusCode).toBe(200);
        const updatedConfirmationStatement = data.resource;
        const mockSubmission = mockValues.mockConfirmationStatementSubmissionResource;
        expect(updatedConfirmationStatement.id).toBe(mockSubmission.id);
        expect(updatedConfirmationStatement.data.confirmationStatementMadeUpToDate).toBe(mockSubmission.data.confirmation_statement_made_up_to_date);
        expect(updatedConfirmationStatement.data.statementOfCapitalData.sectionStatus).toBe(mockSubmission.data.statement_of_capital_data.section_status);
        expect(updatedConfirmationStatement.data.statementOfCapitalData.statementOfCapital.classOfShares).toBe(
            mockSubmission.data.statement_of_capital_data.statement_of_capital.class_of_shares
        );
        expect(updatedConfirmationStatement.data.sicCodeData.sectionStatus).toBe(mockSubmission.data.sic_code_data.section_status);
        expect(updatedConfirmationStatement.data.sicCodeData.sicCode.code).toBe(mockSubmission.data.sic_code_data.sic_code.code);
        expect(updatedConfirmationStatement.data.registeredOfficeAddressData.sectionStatus).toBe(mockSubmission.data.registered_office_address_data.section_status);
        expect(updatedConfirmationStatement.data.registeredEmailAddressData.sectionStatus).toBe(mockSubmission.data.registered_email_address_data.section_status);
        expect(updatedConfirmationStatement.data.activeOfficerDetailsData.sectionStatus).toBe(mockSubmission.data.active_officer_details_data.section_status);
        expect(updatedConfirmationStatement.data.shareholderData.sectionStatus).toBe(mockSubmission.data.shareholder_data.section_status);
        expect(updatedConfirmationStatement.data.registerLocationsData.sectionStatus).toBe(mockSubmission.data.register_locations_data.section_status);
        expect(updatedConfirmationStatement.data.tradingStatusData.tradingStatusAnswer).toBe(mockSubmission.data.trading_status_data.trading_status_answer);
        expect(updatedConfirmationStatement.data.acceptLawfulPurposeStatement).toBe(mockSubmission.data.accept_lawful_purpose_statement);
    });

    it("should return error 404 - not found", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSubmitPostResponse[404]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse =
        await csService.postUpdateConfirmationStatement(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID,
            mockValues.mockConfirmationStatementSubmission) as ApiErrorResponse;

        expect(data.httpStatusCode).toBe(404);
    });
});

describe("submit confirmation statement POST", () => {
    it(
        "should confirmation submission object for submission post method",
        async () => {
            sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSubmitPostResponse[202]);
            const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
            const data = await csService.postConfirmationStatementSubmission(TRANSACTION_ID);

            const confirmationStatementSubmission = data.resource as ConfirmationStatementSubmission;
            expect(data.httpStatusCode).toBe(202);

            expect(confirmationStatementSubmission.id).toBe(mockValues.mockConfirmationStatementSubmissionResource.id);
        }
    );

    it("should return error 401 - Unauthorised", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSubmitPostResponse[401]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data = await csService.postConfirmationStatementSubmission(TRANSACTION_ID);

        expect(data.httpStatusCode).toBe(401);
        expect(data.resource).toBeUndefined();
    });

    it("should return error 404 - not found", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSubmitPostResponse[404]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data = await csService.postConfirmationStatementSubmission(TRANSACTION_ID);

        expect(data.httpStatusCode).toBe(404);
        expect(data.resource).toBeUndefined();
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSubmitPostResponse[500]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data = await csService.postConfirmationStatementSubmission(TRANSACTION_ID);

        expect(data.httpStatusCode).toBe(500);
        expect(data.resource).toBeUndefined();
    });
});

describe("statement of capital data GET", () => {
    it("should return statement of capital object", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetStatementOfCapital[200]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<StatementOfCapital> = await csService.getStatementOfCapital(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID) as Resource<StatementOfCapital>;

        expect(data.httpStatusCode).toBe(200);
        expect(data.resource.classOfShares).toBe(mockValues.mockStatementOfCapital.class_of_shares);
    });

    it("should not return statement of capital object", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetStatementOfCapital[404]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse = await csService.getStatementOfCapital(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);

        expect(data.httpStatusCode).toBe(404);
        expect(data.errors[0]).toBe("No statement of capital data found");
    });
});

describe("Active officer details GET", () => {
    it("should return active officer details object", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetActiveOfficerDetails[200]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<ActiveOfficerDetails> = await csService.getActiveOfficerDetails(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID) as Resource<ActiveOfficerDetails>;

        expect(data.httpStatusCode).toBe(200);
        expect(data.resource.dateOfBirth).toBe(mockValues.mockActiveOfficerDetails.date_of_birth);
    });

    it(
        "should return error 404 - No active director details were found",
        async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetActiveOfficerDetails[404]);
            const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
            const data: ApiErrorResponse = await csService.getActiveOfficerDetails(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);

            expect(data.httpStatusCode).toBe(404);
            expect(data.errors[0]).toBe("No active director details were found");
        }
    );

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetActiveOfficerDetails[500]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse = await csService.getActiveOfficerDetails(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);

        expect(data.httpStatusCode).toBe(500);
        expect(data.errors[0]).toBe("Internal server error");
    });
});

describe("List active officers details GET", () => {
    it("should return active officer details object", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetListActiveOfficersDetails[200]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<ActiveOfficerDetails[]> = await csService.getListActiveOfficerDetails(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID) as Resource<ActiveOfficerDetails[]>;

        expect(data.httpStatusCode).toBe(200);
        expect(data.resource[1].dateOfBirth).toBe(mockValues.mockActiveOfficerDetails.date_of_birth);
    });

    it(
        "should return error 404 - No active director details were found",
        async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetListActiveOfficersDetails[404]);
            const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
            const data: ApiErrorResponse = await csService.getListActiveOfficerDetails(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);

            expect(data.httpStatusCode).toBe(404);
            expect(data.errors[0]).toBe("No active officers details were found");
        }
    );

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetListActiveOfficersDetails[500]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse = await csService.getListActiveOfficerDetails(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID);

        expect(data.httpStatusCode).toBe(500);
        expect(data.errors[0]).toBe("Internal server error");
    });
});

describe("persons with significant control GET", () => {
    it("should return a list of persons with significant control", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockGetPersonsOfSignificantControl[200]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<PersonOfSignificantControl[]> = await csService.getPersonsOfSignificantControl(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID) as Resource<PersonOfSignificantControl[]>;
        expect(data.httpStatusCode).toBe(200);
        expect(data.resource[0].nameElements.surname).toBe("Smith");
        expect(data.resource[0].nameElements.middleName).toBeUndefined();
        expect(data.resource[1].nameElements.surname).toBe("Johnson");
        expect(data.resource[1].naturesOfControl).toBeUndefined();
        expect(data.resource[0].dateOfBirthIso).toBe("1984-01-23");
        expect(data.resource[1].dateOfBirthIso).toBeUndefined();
        expect(data.resource[0].serviceAddress?.addressLine1).toBe("10 This road");
        expect(data.resource[0].address?.addressLine1).toBe("20 Any road");
    });

    it("should not map missing address or names", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves({ status: 200, body: mockValues.mockPscNoNameNoAddress });
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<PersonOfSignificantControl[]> = await csService.getPersonsOfSignificantControl(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID) as Resource<PersonOfSignificantControl[]>;
        expect(data.httpStatusCode).toBe(200);
        expect(data.resource[0].nameElements).toBeUndefined();
        expect(data.resource[0].address).toBeUndefined();
        expect(data.resource[0].serviceAddress).toBeUndefined();
        expect(data.resource[0].appointmentType).toBe("1");
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockGetPersonsOfSignificantControl[500]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse = await csService.getPersonsOfSignificantControl(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID) as ApiErrorResponse;
        expect(data.httpStatusCode).toBe(500);
        expect(data.errors[0]).toBe("Internal server error");
    });
});

describe("Shareholder GET", () => {
    it("should return a list of shareholder", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockGetShareholder[200]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<Shareholder[]> = await csService.getShareholders(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID) as Resource<Shareholder[]>;
        expect(data.httpStatusCode).toBe(200);
        expect(data.resource[0].surname).toBe("Lewis");
        expect(data.resource[0].foreName2).toBeUndefined();
        expect(data.resource[1].surname).toBe("Bond");
    });

    it("should return a 500 error - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockGetShareholder[500]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse = await csService.getShareholders(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID) as ApiErrorResponse;
        expect(data.httpStatusCode).toBe(500);
        expect(data.errors[0]).toBe("Internal server error");
    });
});

describe("Register Location GET", () => {
    it("should return a list of registers and their locations", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockGetRegisterLocations[200]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<RegisterLocation[]> = await csService.getRegisterLocations(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID) as Resource<RegisterLocation[]>;
        expect(data.httpStatusCode).toBe(200);
        expect(data.resource[0].registerTypeDesc).toBe("Reg Type Desc 1");
        expect(data.resource[0].sailAddress.addressLine1).toBe("20 Any road");
        expect(data.resource[1].registerTypeDesc).toBe("Reg Type Desc 2");
    });

    it("should return a 500 error - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockGetRegisterLocations[500]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: ApiErrorResponse = await csService.getRegisterLocations(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID) as ApiErrorResponse;
        expect(data.httpStatusCode).toBe(500);
        expect(data.errors[0]).toBe("Internal server error");
    });
});

describe("confirmation statement submission GET", () => {
    it("should return confirmation statement submission object", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetConfirmationStatementSubmission[200]);
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const data: Resource<ConfirmationStatementSubmission> =
            await csService.getConfirmationStatementSubmission(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID) as Resource<ConfirmationStatementSubmission>;

        const mockResource = mockValues.mockConfirmationStatementSubmissionResource;
        expect(data.httpStatusCode).toBe(200);
        expect(data.resource.id).toBe(mockResource.id);
        expect(data.resource.links).toBe(mockResource.links);
        expect(data.resource.data.confirmationStatementMadeUpToDate).toBe(mockResource.data.confirmation_statement_made_up_to_date);
        expect(data.resource.data.statementOfCapitalData.sectionStatus).toBe(mockResource.data.statement_of_capital_data.section_status);
        const statementOfCapital: StatementOfCapital = data.resource.data.statementOfCapitalData.statementOfCapital;
        const mockStatementOfCapital: StatementOfCapitalResource = mockResource.data.statement_of_capital_data.statement_of_capital
        expect(statementOfCapital.aggregateNominalValue).toBe(mockStatementOfCapital.aggregate_nominal_value);
        expect(statementOfCapital.classOfShares).toBe(mockStatementOfCapital.class_of_shares);
        expect(statementOfCapital.currency).toBe(mockStatementOfCapital.currency);
        expect(statementOfCapital.numberAllotted).toBe(mockStatementOfCapital.number_allotted);
        expect(statementOfCapital.prescribedParticulars).toBe(mockStatementOfCapital.prescribed_particulars);
        expect(statementOfCapital.totalAggregateNominalValue).toBe(mockStatementOfCapital.total_aggregate_nominal_value);
        expect(statementOfCapital.totalAmountUnpaidForCurrency).toBe(mockStatementOfCapital.total_amount_unpaid_for_currency);
        expect(statementOfCapital.totalNumberOfShares).toBe(mockStatementOfCapital.total_number_of_shares);
        expect(data.resource.data.acceptLawfulPurposeStatement).toBe(mockResource.data.accept_lawful_purpose_statement);
    });

    it(
        "should return confirmation statement submission object with no statement of capital",
        async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves({ status: 200, body: mockValues.mockConfirmationStatementSubmissionResourceNoSOC });
            const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
            const data: Resource<ConfirmationStatementSubmission> =
                await csService.getConfirmationStatementSubmission(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID) as Resource<ConfirmationStatementSubmission>;

            expect(data.httpStatusCode).toBe(200);
            expect(data.resource.id).toBe(mockValues.mockConfirmationStatementSubmissionResourceNoSOC.id);
            expect(data.resource.links).toBe(mockValues.mockConfirmationStatementSubmissionResourceNoSOC.links)
            expect(data.resource.data.statementOfCapitalData.sectionStatus).toBe(
                mockValues.mockConfirmationStatementSubmissionResourceNoSOC.data.statement_of_capital_data.section_status
            );
            expect(data.resource.data.statementOfCapitalData.statementOfCapital).toBeUndefined();
        }
    );

    it(
        "should return error info when confirmation statement submission not returned",
        async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetConfirmationStatementSubmission[404]);
            const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
            const data: ApiErrorResponse =
                await csService.getConfirmationStatementSubmission(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID) as Resource<ApiErrorResponse>;

            expect(data.httpStatusCode).toBe(404);
            expect(data.errors[0]).toBe("No confirmation statement submission found");
        }
    );

    it(
        "should return confirmation statement submission object with registered email address",
        async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetConfirmationStatementSubmission[200]);
            const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
            const data: Resource<ConfirmationStatementSubmission> =
                await csService.getConfirmationStatementSubmission(TRANSACTION_ID, CONFIRMATION_STATEMENT_ID) as Resource<ConfirmationStatementSubmission>;

            const mockResource = mockValues.mockConfirmationStatementSubmissionResource;
            expect(data.httpStatusCode).toBe(200);
            expect(data.resource.id).toBe(mockResource.id);
            expect(data.resource.links).toBe(mockResource.links);
            expect(data.resource.data.confirmationStatementMadeUpToDate).toBe(mockResource.data.confirmation_statement_made_up_to_date);
            expect(data.resource.data.registeredEmailAddressData.sectionStatus).toBe(mockResource.data.registered_email_address_data.section_status);
            expect(data.resource.data.registeredEmailAddressData.registeredEmailAddress).toBe(mockResource.data.registered_email_address_data.registered_email_address);
        }
    );
});

describe("getNextMadeUpToDate tests", () => {
    it("Should not map optional fields when filing is due", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves({ status: 200, body: mockValues.mockNextMadeUpToDateResourceIsDue });
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const response: Resource<NextMadeUpToDate> = await csService.getNextMadeUpToDate(COMPANY_NUMBER) as Resource<NextMadeUpToDate>;
        const nextMadeUpToDate: NextMadeUpToDate = response.resource;

        expect(response.httpStatusCode).toBe(200);
        expect(nextMadeUpToDate.currentNextMadeUpToDate).toBe(mockValues.mockNextMadeUpToDateResourceIsDue.current_next_made_up_to_date);
        expect(nextMadeUpToDate.isDue).toBe(mockValues.mockNextMadeUpToDateResourceIsDue.is_due);
        expect(nextMadeUpToDate.newNextMadeUpToDate).toBeUndefined();
    });

    it("Should map optional fields when filing is not due", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves({ status: 200, body: mockValues.mockNextMadeUpToDateResourceIsNotDue });
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const response: Resource<NextMadeUpToDate> = await csService.getNextMadeUpToDate(COMPANY_NUMBER) as Resource<NextMadeUpToDate>;
        const nextMadeUpToDate: NextMadeUpToDate = response.resource;

        expect(response.httpStatusCode).toBe(200);
        expect(nextMadeUpToDate.currentNextMadeUpToDate).toBe(
            mockValues.mockNextMadeUpToDateResourceIsNotDue.current_next_made_up_to_date
        );
        expect(nextMadeUpToDate.isDue).toBe(mockValues.mockNextMadeUpToDateResourceIsNotDue.is_due);
        expect(nextMadeUpToDate.newNextMadeUpToDate).toBeDefined();
        expect(nextMadeUpToDate.newNextMadeUpToDate).toBe(mockValues.mockNextMadeUpToDateResourceIsNotDue.new_next_made_up_to_date);
    });

    it(
        "Should not map optional fields when no cs found in company profile",
        async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves({ status: 200, body: mockValues.mockNextMadeUpToDateResourceNoCs });
            const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
            const response: Resource<NextMadeUpToDate> = await csService.getNextMadeUpToDate(COMPANY_NUMBER) as Resource<NextMadeUpToDate>;
            const nextMadeUpToDate: NextMadeUpToDate = response.resource;

            expect(response.httpStatusCode).toBe(200);
            expect(nextMadeUpToDate.currentNextMadeUpToDate).toBeNull();
            expect(nextMadeUpToDate.isDue).toBeUndefined()
            expect(nextMadeUpToDate.newNextMadeUpToDate).toBeUndefined();
        }
    );

    it("Should return an error when api response status >= 400", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves({ status: 404, error: "Not Found" });
        const csService: ConfirmationStatementService = new ConfirmationStatementService(mockValues.requestClient);
        const response: ApiErrorResponse = await csService.getNextMadeUpToDate(COMPANY_NUMBER) as ApiErrorResponse;

        expect(response.httpStatusCode).toBe(404);
        expect(response.errors[0]).toBe("Not Found");
    });
});

import {
    CompanyOfficer, OfficerFilingService
} from "../../../src/services/officer-filing";
import * as mockValues from "./officer.filing.mock";
import { expect } from "chai";
import sinon from "sinon";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";

const TRANSACTION_ID = "12345";
const COMPANY_NUMBER = "00006400";

beforeEach(() => {
    sinon.reset();
    sinon.restore();
});

afterEach(done => {
    sinon.reset();
    sinon.restore();
    done();
});

describe("List active Directors details GET", () => {
    it("should return active director details object", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetListActiveDirectorsDetails[200]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: Resource<CompanyOfficer[]> = await ofService.getListActiveDirectorDetails(TRANSACTION_ID) as Resource<CompanyOfficer[]>;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource[1].dateOfBirth).to.contain(mockValues.mockActiveDirectorDetails.date_of_birth);
    });

    it("should return error 404 - No active director details were found", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetListActiveDirectorsDetails[404]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getListActiveDirectorDetails(TRANSACTION_ID);

        expect(data.httpStatusCode).to.equal(404);
        expect(data.errors[0]).to.equal("No active directors details were found");
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetListActiveDirectorsDetails[500]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getListActiveDirectorDetails(TRANSACTION_ID);

        expect(data.httpStatusCode).to.equal(500);
        expect(data.errors[0]).to.equal("Internal server error");
    });
});

describe("Current or future dissolved GET", () => {
    it("should return Boolean value", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetCurrentOrFutureDissolved[200]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: Resource<Boolean> = await ofService.getCurrentOrFutureDissolved(COMPANY_NUMBER) as Resource<Boolean>;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource).to.equal(true);
    });

    it("should return Boolean value of false", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetCurrentOrFutureDissolvedReturnsFalse[200]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: Resource<Boolean> = await ofService.getCurrentOrFutureDissolved(COMPANY_NUMBER) as Resource<Boolean>;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource).to.equal(false);
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetCurrentOrFutureDissolved[500]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getCurrentOrFutureDissolved(COMPANY_NUMBER);

        expect(data.httpStatusCode).to.equal(500);
        expect(data.errors[0]).to.equal("Internal server error");
    });
});

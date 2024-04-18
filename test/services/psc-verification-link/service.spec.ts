import { describe } from "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import * as mockValues from "./service.mock"
import PscVerificationService from "../../../src/services/psc-verification-link/service";
import { PscVerificationResource } from "../../../src/services/psc-verification-link/types";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";

describe("PSC Verification Link POST tests", () => {
    const pscService = new PscVerificationService(mockValues.requestClient);

    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    afterEach(done => {
        sinon.reset();
        sinon.restore();
        done();
    });

    it("should return status 200 OK and filing resource representation on authorised access", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPscVerificationCreatedResponse[201]);

        const response = (await pscService.postPscVerification(
            mockValues.TRANSACTION_ID,
            mockValues.PSC_VERIFICATION_MOCK
        )) as Resource<PscVerificationResource>;

        expect(response.httpStatusCode).to.equal(201);
        expect(response.resource).to.equal(mockValues.mockPscVerificationCreatedResource);
    });

    it("should return status 401 Unauthorised on unauthorised access", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPscVerificationCreatedResponse[401]);

        const response = await pscService.postPscVerification(mockValues.TRANSACTION_ID, { company_number: mockValues.COMPANY_NUMBER }) as ApiErrorResponse;

        expect(response.httpStatusCode).to.equal(401);
        expect(response.errors?.[0]).to.equal(mockValues.UNAUTHORISED);
    });

    it("should return staus 400 Bad Request for bad data", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPscVerificationCreatedResponse[400]);

        const data = await pscService.postPscVerification(mockValues.TRANSACTION_ID, { company_number: "" }) as ApiErrorResponse;

        expect(data.httpStatusCode).to.equal(400);
        expect(data.errors?.[0]).to.equal(mockValues.BAD_REQUEST);
    });
});

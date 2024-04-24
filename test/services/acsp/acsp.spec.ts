import {
    Acsp,
    AcspResponse,
    AcspService
} from "../../../src/services/acsp";
import * as mockValues from "./acsp.mock";
import { expect } from "chai";
import sinon from "sinon";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";

const TRANSACTION_ID = "12345";
const SUBMISSION_ID = "645d1188c794645afe15f5cc";

beforeEach(() => {
    sinon.reset();
    sinon.restore();
});

afterEach(done => {
    sinon.reset();
    sinon.restore();
    done();
});

describe("Acsp Registration GET", () => {
    it("should return an Acsp registration", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetAcsp[200]);
        const ofService: AcspService = new AcspService(mockValues.requestClient);
        const data: Resource<Acsp> = await ofService.getAcsp(TRANSACTION_ID, SUBMISSION_ID) as Resource<Acsp>;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource?.typeOfBusiness).to.equal("LIMITED_LIABILITY_PARTNERSHIP");
    });

    it("should return error 404 - Not found", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetAcsp[404]);
        const ofService: AcspService = new AcspService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getAcsp(TRANSACTION_ID, SUBMISSION_ID);

        expect(data.httpStatusCode).to.equal(404);
        expect(data.errors?.[0]).to.equal("Acsp registration not found");
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetAcsp[500]);
        const ofService: AcspService = new AcspService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getAcsp(TRANSACTION_ID, SUBMISSION_ID);

        expect(data.httpStatusCode).to.equal(500);
        expect(data.errors?.[0]).to.equal("Internal server error");
    });
});

describe("Acsp Registration POST", () => {
    it("should return an Acsp registration", async () => {
        sinon.stub(mockValues.requestClient, "httpPut").resolves(mockValues.mockPostAcsp[200]);
        const ofService: AcspService = new AcspService(mockValues.requestClient);
        const data: Resource<AcspResponse> = await ofService.postACSP(TRANSACTION_ID, mockValues.mockAcspResponce) as Resource<AcspResponse>;
        console.log("data: ", JSON.stringify(data));
        expect(data.httpStatusCode).to.equal(200);
    });

    it("should return error 404 - Not found", async () => {
        sinon.stub(mockValues.requestClient, "httpPut").resolves(mockValues.mockPostAcsp[404]);
        const ofService: AcspService = new AcspService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.postACSP(TRANSACTION_ID, mockValues.mockAcsp);

        expect(data.httpStatusCode).to.equal(404);
        expect(data.errors?.[0]).to.equal("Acsp registration not found");
    });
});

import {
    AcspData,
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
        const data: Resource<AcspData> = await ofService.getAcsp(TRANSACTION_ID, SUBMISSION_ID) as Resource<AcspData>;
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource).to.deep.equal(mockValues.mockAcsp);
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
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPostAcsp[200]);
        const ofService: AcspService = new AcspService(mockValues.requestClient);
        const data: Resource<AcspResponse> = await ofService.postACSP(TRANSACTION_ID, mockValues.mockAcspResponce) as Resource<AcspResponse>;
        expect(data.httpStatusCode).to.equal(200);
    });

    it("should return error 409 - Document already exists", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPostAcsp[409]);
        const ofService: AcspService = new AcspService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.postACSP(TRANSACTION_ID, mockValues.mockAcsp);
        expect(data.httpStatusCode).to.equal(409);
        expect(data.errors?.[0]).to.equal("A document already exist with this id");
    });
});

describe("Acsp Registration PUT", () => {
    it("should return an Acsp registration", async () => {
        sinon.stub(mockValues.requestClient, "httpPut").resolves(mockValues.mockPutAcsp[200]);
        const ofService: AcspService = new AcspService(mockValues.requestClient);
        const data: Resource<AcspResponse> = await ofService.putACSP(TRANSACTION_ID, SUBMISSION_ID, mockValues.mockAcspResponce) as Resource<AcspResponse>;
        expect(data.httpStatusCode).to.equal(200);
    });

    it("should return error 404 - Not found", async () => {
        sinon.stub(mockValues.requestClient, "httpPut").resolves(mockValues.mockPutAcsp[404]);
        const ofService: AcspService = new AcspService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.putACSP(TRANSACTION_ID, SUBMISSION_ID, mockValues.mockAcsp);
        expect(data.httpStatusCode).to.equal(404);
        expect(data.errors?.[0]).to.equal("Acsp registration not found");
    });
});

describe("Acsp Registration DELETE", () => {
    it("should return 204 on successful delete", async () => {
        sinon.stub(mockValues.requestClient, "httpDelete").resolves(mockValues.mockDeleteAcsp[204]);
        const ofService: AcspService = new AcspService(mockValues.requestClient);
        const data = await ofService.deleteSavedApplication(TRANSACTION_ID, SUBMISSION_ID);
        expect(data.status).to.equal(204);
    })

    it("should return 404 if no application exists", async () => {
        sinon.stub(mockValues.requestClient, "httpDelete").resolves(mockValues.mockDeleteAcsp[404]);
        const ofService: AcspService = new AcspService(mockValues.requestClient);
        const data = await ofService.deleteSavedApplication(TRANSACTION_ID, SUBMISSION_ID);
        expect(data.status).to.equal(404);
    })
})

import { CondensedSicCodeService, CondensedSicCodeData } from "../../../src/services/sic-code";
import sinon from "sinon";
import chai from "chai";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";
import { RequestClient } from "../../../src/http";

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
const expect = chai.expect;

beforeEach(() => {
    sinon.reset();
    sinon.restore();
});

afterEach((done) => {
    sinon.reset();
    sinon.restore();
    done();
});

describe("Get Condensed SIC Code data", () => {
    it("Should return Condensed SIC Code data", async () => {
        const mockResponseBody = [
            { sic_code: "00001", sic_description: "SIC 1" },
            { sic_code: "00002", sic_description: "SIC 2" },
            { sic_code: "00003", sic_description: "SIC 3" }
        ];

        sinon.stub(requestClient, "httpGet").resolves({
            status: 200,
            body: mockResponseBody
        });

        const service: CondensedSicCodeService = new CondensedSicCodeService(requestClient);

        const response = await service.getCondensedSicCodes() as Resource<CondensedSicCodeData[]>;

        expect(response.httpStatusCode).to.be.equal(200);
        expect(response.resource).to.be.equal(mockResponseBody);
    });
});

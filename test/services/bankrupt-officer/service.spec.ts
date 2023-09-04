import { expect } from "chai";
import { RequestClient } from "../../../src/http";
import sinon from "sinon";
import { BadosService } from "../../../src/services/bankrupt-officer";
import * as BankruptOfficer from "../../../src/services/bankrupt-officer/scottish";

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("bankrupt-officer", () => {
    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    afterEach(done => {
        sinon.reset();
        sinon.restore();
        done();
    });

    it("returns an error response on failure", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };

        sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);

        const bankruptOfficerService : BankruptOfficer.BadosService = new BadosService(requestClient);
        const data = await bankruptOfficerService.getBankruptOfficer("NUMBER-NOT-IMPORTANT");

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });
    it("maps the company filing history data items correctly", async () => {
        const mockGetResponse = {
            status: 200,
            body: <BankruptOfficer.FullBankruptOfficer> {
                caseReference: "Some Reference",
                bankruptcyType: "Some Bankruptcy type",
                ephemeralKey: "ephemeralKey"
            }
        };

        sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);

        const bankruptOfficerService : BankruptOfficer.BadosService = new BadosService(requestClient);
        const data = await bankruptOfficerService.getBankruptOfficer("123");

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource?.ephemeralKey).to.equal(mockGetResponse.body.ephemeralKey);
        expect(data.resource?.caseReference).to.equal(mockGetResponse.body.caseReference);
        expect(data.resource?.bankruptcyType).to.equal(mockGetResponse.body.bankruptcyType);
    });
});

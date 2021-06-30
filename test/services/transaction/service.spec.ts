import chai from "chai";
import sinon from "sinon";

import TransactionService from "../../../src/services/transaction/service";
import { RequestClient } from "../../../src/http";
import { Transaction, TransactionResource } from "../../../src/services/transaction";
const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("transaction", () => {
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
        const mockPostResponse = {
            status: 401,
            error: "An error occurred"
        };

        const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);
        const transaction : TransactionService = new TransactionService(requestClient);
        const data = await transaction.postTransaction({} as Transaction);

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("maps the company field data items correctly", async () => {
        const mockResponseBody : TransactionResource = ({
            id: "12345678",
            company_name: "HELLO LTD",
            company_number: "88",
            links: {
                self: "/self"
            },
            reference: "ref",
            description: "desc"
        });

        const mockPostResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);
        const transaction : TransactionService = new TransactionService(requestClient);
        const data = await transaction.postTransaction({} as Transaction);

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.companyName).to.equal(mockResponseBody.company_name);
        expect(data.resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(data.resource.links.self).to.equal(mockResponseBody.links.self);
        expect(data.resource.reference).to.equal(mockResponseBody.reference);
        expect(data.resource.description).to.equal(mockResponseBody.description);
    });
});

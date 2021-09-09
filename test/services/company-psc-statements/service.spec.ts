import chai from "chai";
import sinon from "sinon";

import { RequestClient } from "../../../src/http";
import CompanyPscStatementsService from "../../../src/services/company-psc-statements/service";
import {
    CompanyPersonsWithSignificantControlStatements,
    CompanyPersonsWithSignificantControlStatementsResource
} from "../../../src/services/company-psc-statements";
import Resource from "../../../src/services/resource";
const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("company-psc-statements", () => {
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
        const companyPscStatement : CompanyPscStatementsService = new CompanyPscStatementsService(requestClient);
        const data = await companyPscStatement.getCompanyPscStatements("NUMBER-NOT-IMPORTANT", 2, 1);

        expect(data.httpStatusCode).to.equal(401);
    });

    it("maps the psc statement data items correctly", async () => {
        const mockResponseBody : CompanyPersonsWithSignificantControlStatementsResource = ({
            active_count: "1",
            ceased_count: "0",
            items_per_page: "1",
            start_index: "0",
            total_results: "1",
            links: {
                self: "statementsSelfLink"
            },
            items: [
                {
                    ceased_on: "ceased",
                    etag: "etag",
                    kind: "kind",
                    links: { self: "statementSelfLink" },
                    notified_on: "notifiedOn",
                    statement: "statement"
                }
            ]
        });

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyPscStatementService : CompanyPscStatementsService = new CompanyPscStatementsService(requestClient);
        const data = await companyPscStatementService.getCompanyPscStatements("NUMBER-NOT-IMPORTANT", 2, 1);

        expect(data.httpStatusCode).to.equal(200);

        const castedResponse: Resource<CompanyPersonsWithSignificantControlStatements> = data as Resource<CompanyPersonsWithSignificantControlStatements>

        expect(castedResponse.resource.activeCount).to.equal(mockResponseBody.active_count);
        expect(castedResponse.resource.ceasedCount).to.equal(mockResponseBody.ceased_count);
        expect(castedResponse.resource.itemsPerPage).to.equal(mockResponseBody.items_per_page);
        expect(castedResponse.resource.startIndex).to.equal(mockResponseBody.start_index);
        expect(castedResponse.resource.totalResults).to.equal(mockResponseBody.total_results);

        expect(castedResponse.resource.links.self).to.equal(mockResponseBody.links.self);

        expect(castedResponse.resource.items.length).to.equal(mockResponseBody.items.length);

        expect(castedResponse.resource.items[0].ceasedOn).to.equal(mockResponseBody.items[0].ceased_on);
        expect(castedResponse.resource.items[0].etag).to.equal(mockResponseBody.items[0].etag);
        expect(castedResponse.resource.items[0].kind).to.equal(mockResponseBody.items[0].kind);
        expect(castedResponse.resource.items[0].notifiedOn).to.equal(mockResponseBody.items[0].notified_on);
        expect(castedResponse.resource.items[0].statement).to.equal(mockResponseBody.items[0].statement);
    });
});

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

        expect(data.httpStatusCode).toBe(401);
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

        expect(data.httpStatusCode).toBe(200);

        const castedResponse: Resource<CompanyPersonsWithSignificantControlStatements> = data as Resource<CompanyPersonsWithSignificantControlStatements>

        expect(castedResponse.resource.activeCount).toBe(mockResponseBody.active_count);
        expect(castedResponse.resource.ceasedCount).toBe(mockResponseBody.ceased_count);
        expect(castedResponse.resource.itemsPerPage).toBe(mockResponseBody.items_per_page);
        expect(castedResponse.resource.startIndex).toBe(mockResponseBody.start_index);
        expect(castedResponse.resource.totalResults).toBe(mockResponseBody.total_results);

        expect(castedResponse.resource.links.self).toBe(mockResponseBody.links.self);

        expect(castedResponse.resource.items.length).toBe(mockResponseBody.items.length);

        expect(castedResponse.resource.items[0].ceasedOn).toBe(mockResponseBody.items[0].ceased_on);
        expect(castedResponse.resource.items[0].etag).toBe(mockResponseBody.items[0].etag);
        expect(castedResponse.resource.items[0].kind).toBe(mockResponseBody.items[0].kind);
        expect(castedResponse.resource.items[0].notifiedOn).toBe(mockResponseBody.items[0].notified_on);
        expect(castedResponse.resource.items[0].statement).toBe(mockResponseBody.items[0].statement);
    });
});

import chai from "chai";
import sinon from "sinon";

import { DissolvedSearchService } from "../../../../src/services/search/dissolved-search";
import { RequestClient } from "../../../../src/http";
import { CompaniesResource } from "../../../../src/services/search/dissolved-search/types";
import Resource from "../../../../src/services/resource";
const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

const mockResponseBody : CompaniesResource = ({
    etag: "etag",
    items: [
        {
            registered_office_address: {
                address_line_1: "test house",
                address_line_2: "test street",
                locality: "cardiff",
                postal_code: "cf5 6rb"
            },
            company_name: "test company",
            company_number: "0000789",
            company_status: "active",
            date_of_cessation: (new Date("19910212")),
            date_of_creation: (new Date("19910212")),
            kind: "kind",
            ordered_alpha_key_with_id: "testcompany:0000789",
            previous_company_names: [
                {
                    ceased_on: (new Date("19910212")),
                    effective_from: (new Date("19910212")),
                    name: "old name"
                }
            ],
            matched_previous_company_name:
                {
                    ceased_on: (new Date("19910212")),
                    effective_from: (new Date("19910212")),
                    name: "old name"
                }
        }
    ],
    kind: "kind",
    top_hit: {
        registered_office_address: {
            address_line_1: "test house",
            address_line_2: "test street",
            locality: "cardiff",
            postal_code: "cf5 6rb"
        },
        company_name: "test company",
        company_number: "0000789",
        company_status: "active",
        date_of_cessation: (new Date("19910212")),
        date_of_creation: (new Date("19910212")),
        kind: "kind",
        ordered_alpha_key_with_id: "testcompany:0000789",
        previous_company_names: [
            {
                ceased_on: (new Date("19910212")),
                effective_from: (new Date("19910212")),
                name: "old name"
            }
        ],
        matched_previous_company_name:
            {
                ceased_on: (new Date("19910212")),
                effective_from: (new Date("19910212")),
                name: "old name"
            }
    },
    hits: 20
});

const mockRequestId = "fdskfhsdoifhsffsif";
const testCompanyName = "TEST COMPANY NAME";
const searchType = "alphabetical";
const startIndex = 0;
const searchBefore = "testcompany:0000784"
const searchafter = "testcompany:0000794"
const page = 0

describe("create a dissolved search GET", () => {
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
        const mockGetRequest = {
            status: 401,
            error: "An error occurred"
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetRequest);
        const search: DissolvedSearchService = new DissolvedSearchService(requestClient);
        const data: Resource<CompaniesResource> = await search.getCompanies(testCompanyName, mockRequestId, searchType, startIndex, searchBefore, searchafter, page);

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("returns dissolved search results correctly", async () => {
        const mockGetRequest = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetRequest);
        const search: DissolvedSearchService = new DissolvedSearchService(requestClient);
        const data: Resource<CompaniesResource> = await search.getCompanies(testCompanyName, mockRequestId, searchType, startIndex, searchBefore, searchafter, page);
        const item = data.resource.items[0];
        const mockItem = mockResponseBody.items[0];

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBody.etag);
        expect(item.registered_office_address.locality).to.equal(mockItem.registered_office_address.locality);
        expect(item.registered_office_address.postal_code).to.equal(mockItem.registered_office_address.postal_code);
        expect(item.company_name).to.equal(mockItem.company_name);
        expect(item.company_number).to.equal(mockItem.company_number);
        expect(item.company_status).to.equal(mockItem.company_status);
        expect(item.date_of_cessation).to.equal(mockItem.date_of_cessation);
        expect(item.date_of_creation).to.equal(mockItem.date_of_creation);
        expect(item.kind).to.equal(mockItem.kind);
        expect(item.previous_company_names[0].ceased_on).to.equal(mockItem.previous_company_names[0].ceased_on);
        expect(item.previous_company_names[0].effective_from).to.equal(mockItem.previous_company_names[0].effective_from);
        expect(item.previous_company_names[0].name).to.equal(mockItem.previous_company_names[0].name);
        expect(item.matched_previous_company_name.ceased_on).to.equal(mockItem.matched_previous_company_name.ceased_on);
        expect(item.matched_previous_company_name.effective_from).to.equal(mockItem.matched_previous_company_name.effective_from);
        expect(item.matched_previous_company_name.name).to.equal(mockItem.matched_previous_company_name.name);
        expect(data.resource.kind).to.equal(mockResponseBody.kind);
        expect(data.resource.top_hit.registered_office_address.address_line_1).to.equal(mockResponseBody.top_hit.registered_office_address.address_line_1);
        expect(data.resource.top_hit.registered_office_address.address_line_2).to.equal(mockResponseBody.top_hit.registered_office_address.address_line_2);
        expect(data.resource.top_hit.registered_office_address.locality).to.equal(mockResponseBody.top_hit.registered_office_address.locality);
        expect(data.resource.top_hit.registered_office_address.postal_code).to.equal(mockResponseBody.top_hit.registered_office_address.postal_code);
        expect(data.resource.top_hit.company_name).to.equal(mockResponseBody.top_hit.company_name);
        expect(data.resource.top_hit.company_number).to.equal(mockResponseBody.top_hit.company_number);
        expect(data.resource.top_hit.company_status).to.equal(mockResponseBody.top_hit.company_status);
        expect(data.resource.top_hit.date_of_cessation).to.equal(mockResponseBody.top_hit.date_of_cessation);
        expect(data.resource.top_hit.date_of_creation).to.equal(mockResponseBody.top_hit.date_of_creation);
        expect(data.resource.top_hit.kind).to.equal(mockResponseBody.top_hit.kind);
        expect(data.resource.top_hit.previous_company_names[0].ceased_on).to.equal(mockResponseBody.top_hit.previous_company_names[0].ceased_on);
        expect(data.resource.top_hit.previous_company_names[0].effective_from).to.equal(mockResponseBody.top_hit.previous_company_names[0].effective_from);
        expect(data.resource.top_hit.previous_company_names[0].name).to.equal(mockResponseBody.top_hit.previous_company_names[0].name);
        expect(data.resource.top_hit.matched_previous_company_name.ceased_on).to.equal(mockResponseBody.top_hit.matched_previous_company_name.ceased_on);
        expect(data.resource.top_hit.matched_previous_company_name.effective_from).to.equal(mockResponseBody.top_hit.matched_previous_company_name.effective_from);
        expect(data.resource.top_hit.matched_previous_company_name.name).to.equal(mockResponseBody.top_hit.matched_previous_company_name.name);
        expect(data.resource.hits).to.equal(mockResponseBody.hits);
    });
});

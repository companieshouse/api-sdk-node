import chai from "chai";
import sinon from "sinon";

import { AdvancedSearchService } from "../../../../src/services/search/advanced-search";
import { RequestClient } from "../../../../src/http";
import { CompaniesResource } from "../../../../src/services/search/advanced-search/types";
import Resource from "../../../../src/services/resource";

const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

const mockResponseBody : CompaniesResource = ({
    etag: "etag",
    top_hit: {
        company_name: "test company",
        company_number: "0000789",
        company_status: "active",
        company_type: "company type",
        company_subtype: "company subtype",
        kind: "kind",
        links: {
            company_profile: "/company/FC022000"
        },
        date_of_cessation: (new Date("19910212")),
        date_of_creation: (new Date("19910212")),
        registered_office_address: {
            address_line_1: "test house",
            address_line_2: "test street",
            locality: "cardiff",
            postal_code: "cf5 6rb",
            premises: "premises",
            region: "region",
            country: "country"
        },
        sic_codes: [
            "999999"
        ]
    },
    items: [
        {
            company_name: "test company",
            company_number: "0000789",
            company_status: "active",
            company_type: "company type",
            company_subtype: "company subtype",
            kind: "kind",
            links: {
                company_profile: "/company/FC022000"
            },
            date_of_cessation: (new Date("19910212")),
            date_of_creation: (new Date("19910212")),
            registered_office_address: {
                address_line_1: "test house",
                address_line_2: "test street",
                locality: "cardiff",
                postal_code: "cf5 6rb",
                premises: "premises",
                region: "region",
                country: "country"
            },
            sic_codes: [
                "999999"
            ]
        }
    ],
    kind: "kind",
    hits: 1
})

const mockRequestId = "fdskfhsdoifhsffsif";
const testStartIndex = 0;
const testCompanyNameIncludes = "INCLUDES";
const testCompanyNameExcludes = "EXCLUDES"
const testLocation = "TEST LOCATION";
const testIncorporatedFrom = "TEST INCORPORATED FROM";
const testIncorporatedTo = "TEST INCORPORATED TO";
const testSicCodes = "999999";
const testCompanyStatus = "TEST COMPANY STATUS";
const testCompanyType = "TEST COMPANY TYPE";
const testCompanySubtype = "TEST COMPANY SUBTYPE"
const testDissolvedFrom = "TEST DISSOLVED FROM";
const testDissolvedTo = "TEST DISSOLVED TO";
const searchType = "advanced";
const size = 20;

describe("create an advanced search GET", () => {
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
        const search: AdvancedSearchService = new AdvancedSearchService(requestClient);
        const data: Resource<CompaniesResource> = await search.getCompanies(testStartIndex, testCompanyNameIncludes, testCompanyNameExcludes, testLocation, testIncorporatedFrom,
            testIncorporatedTo, testSicCodes, testCompanyStatus, testCompanyType, testCompanySubtype, testDissolvedFrom, testDissolvedTo, size, mockRequestId);

        expect(data.httpStatusCode).toBe(401);
        expect(data.resource).toBeUndefined();
    });

    it("returns advanced search results correctly", async () => {
        const mockGetRequest = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetRequest);
        const search: AdvancedSearchService = new AdvancedSearchService(requestClient);
        const data: Resource<CompaniesResource> = await search.getCompanies(testStartIndex, testCompanyNameIncludes, testCompanyNameExcludes, testLocation, testIncorporatedFrom,
            testIncorporatedTo, testSicCodes, testCompanyStatus, testCompanyType, testCompanySubtype, testDissolvedFrom, testDissolvedTo, size, mockRequestId);
        const item = data.resource.items[0];
        const mockItem = mockResponseBody.items[0];

        expect(data.httpStatusCode).toBe(200);
        expect(data.resource.etag).toBe(mockResponseBody.etag);
        expect(data.resource.top_hit.company_name).toBe(mockResponseBody.top_hit.company_name);
        expect(data.resource.top_hit.company_number).toBe(mockResponseBody.top_hit.company_number);
        expect(data.resource.top_hit.company_status).toBe(mockResponseBody.top_hit.company_status);
        expect(data.resource.top_hit.company_type).toBe(mockResponseBody.top_hit.company_type);
        expect(data.resource.top_hit.company_subtype).toBe(mockResponseBody.top_hit.company_subtype);
        expect(data.resource.top_hit.kind).toBe(mockResponseBody.top_hit.kind);
        expect(data.resource.top_hit.links.company_profile).toBe(mockResponseBody.top_hit.links.company_profile);
        expect(data.resource.top_hit.date_of_cessation).toBe(mockResponseBody.top_hit.date_of_cessation);
        expect(data.resource.top_hit.date_of_creation).toBe(mockResponseBody.top_hit.date_of_creation);
        expect(data.resource.top_hit.registered_office_address.address_line_1).toBe(mockResponseBody.top_hit.registered_office_address.address_line_1);
        expect(data.resource.top_hit.registered_office_address.address_line_2).toBe(mockResponseBody.top_hit.registered_office_address.address_line_2);
        expect(data.resource.top_hit.registered_office_address.locality).toBe(mockResponseBody.top_hit.registered_office_address.locality);
        expect(data.resource.top_hit.registered_office_address.postal_code).toBe(mockResponseBody.top_hit.registered_office_address.postal_code);
        expect(data.resource.top_hit.registered_office_address.premises).toBe(mockResponseBody.top_hit.registered_office_address.premises);
        expect(data.resource.top_hit.registered_office_address.country).toBe(mockResponseBody.top_hit.registered_office_address.country);
        expect(data.resource.top_hit.sic_codes).toBe(mockResponseBody.top_hit.sic_codes);
        expect(item.company_name).toBe(mockItem.company_name);
        expect(item.company_number).toBe(mockItem.company_number);
        expect(item.company_status).toBe(mockItem.company_status);
        expect(item.company_type).toBe(mockItem.company_type);
        expect(item.company_subtype).toBe(mockItem.company_subtype);
        expect(item.kind).toBe(mockItem.kind);
        expect(item.links.company_profile).toBe(mockItem.links.company_profile);
        expect(item.date_of_cessation).toBe(mockItem.date_of_cessation);
        expect(item.date_of_creation).toBe(mockItem.date_of_creation);
        expect(item.registered_office_address.address_line_1).toBe(mockItem.registered_office_address.address_line_1);
        expect(item.registered_office_address.address_line_2).toBe(mockItem.registered_office_address.address_line_2);
        expect(item.registered_office_address.locality).toBe(mockItem.registered_office_address.locality);
        expect(item.registered_office_address.postal_code).toBe(mockItem.registered_office_address.postal_code);
        expect(item.registered_office_address.premises).toBe(mockItem.registered_office_address.premises);
        expect(item.sic_codes).toBe(mockItem.sic_codes);
        expect(data.resource.kind).toBe(mockResponseBody.kind);
        expect(data.resource.hits).toBe(mockResponseBody.hits);
    });
});

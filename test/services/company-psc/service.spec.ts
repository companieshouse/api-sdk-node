import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";

import CompanyPscService from "../../../src/services/company-psc/service";
import { RequestClient, HttpResponse } from "../../../src/http";
import { CompanyPersonsWithSignificantControlResource } from "../../../src/services/company-psc/types";

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("company-psc", () => {
    let mockRequest: jest.Mock;
    let companyPsc: CompanyPscService;
    let mockResponseBody: CompanyPersonsWithSignificantControlResource;

    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();

        mockResponseBody = {
            active_count: "1",
            ceased_count: "0",
            items_per_page: "1",
            start_index: "0",
            total_results: "1",
            links: {
                self: "company/123/persons-with-significant-control"
            },
            items: [
                {
                    natures_of_control: [
                        "ownership-of-shares-25-to-50-percent-as-person"
                    ],
                    name: "James Potter",
                    links: {
                        self: "/company/123/persons-with-significant-control/individual/L2m6DxTJA0pkUNh9SIcJY8_cdWE"
                    },
                    etag: "fe416d8a3e09c93eb961ad89b0c606982c3c01e1",
                    name_elements: {
                        title: "Dr",
                        forename: "James",
                        other_forenames: "young wizard",
                        middle_name: "Sirius",
                        surname: "Potter"
                    },
                    nationality: "British",
                    country_of_residence: "Wales",
                    address: {
                        postal_code: "CF14 3UZ",
                        locality: "Cardiff",
                        region: "South Glamorgan",
                        address_line_1: "Crown Way"
                    },
                    notified_on: "2016-01-01",
                    date_of_birth: {
                        year: "1981",
                        month: "4"
                    },
                    identification: {
                        country_registered: "Wales",
                        legal_authority: "Wales",
                        legal_form: "Public Limited Company",
                        place_registered: "Companies House",
                        registration_number: "INC08394823"
                    },
                    ceased_on: "2023-2-1"
                }
            ]
        };

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
        companyPsc = new CompanyPscService(requestClient);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("returns an error response on failure", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        mockRequest.mockResolvedValue(mockGetResponse);

        const data = await companyPsc.getCompanyPsc("NUMBER-NOT-IMPORTANT");

        expect(data.httpStatusCode).toBe(401);
        expect(data.resource).toBeUndefined();
    });

    it("maps the company field data items correctly", async () => {
        const data = await companyPsc.getCompanyPsc("123");

        expect(data.httpStatusCode).toBe(200);

        expect(data.resource?.activeCount).toBe(mockResponseBody.active_count);
        expect(data.resource?.ceasedCount).toBe(mockResponseBody.ceased_count);
        expect(data.resource?.itemsPerPage).toBe(mockResponseBody.items_per_page);
        expect(data.resource?.startIndex).toBe(mockResponseBody.start_index);
        expect(data.resource?.totalResults).toBe(mockResponseBody.total_results);

        expect(data.resource?.links.self).toBe(mockResponseBody.links.self);

        expect(data.resource?.items.length).toBe(mockResponseBody.items.length);

        expect(data.resource?.items[0].countryOfResidence).toBe(mockResponseBody.items[0].country_of_residence);
        expect(data.resource?.items[0].etag).toBe(mockResponseBody.items[0].etag);
        expect(data.resource?.items[0].nationality).toBe(mockResponseBody.items[0].nationality);
        expect(data.resource?.items[0].name).toBe(mockResponseBody.items[0].name);

        expect(data.resource?.items[0].naturesOfControl).toEqual(mockResponseBody.items[0].natures_of_control);

        expect(data.resource?.items[0].address.addressLine1).toBe(mockResponseBody.items[0].address.address_line_1);
        expect(data.resource?.items[0].address.locality).toBe(mockResponseBody.items[0].address.locality);
        expect(data.resource?.items[0].address.postalCode).toBe(mockResponseBody.items[0].address.postal_code);
        expect(data.resource?.items[0].address.region).toBe(mockResponseBody.items[0].address.region);

        expect(data.resource?.items[0].dateOfBirth.month).toBe(mockResponseBody.items[0].date_of_birth.month);
        expect(data.resource?.items[0].dateOfBirth.year).toBe(mockResponseBody.items[0].date_of_birth.year);

        expect(data.resource?.items[0].identification?.legalAuthority).toBe(mockResponseBody.items[0].identification?.legal_authority);
        expect(data.resource?.items[0].identification?.legalForm).toBe(mockResponseBody.items[0].identification?.legal_form);
        expect(data.resource?.items[0].identification?.placeRegistered).toBe(mockResponseBody.items[0].identification?.place_registered);
        expect(data.resource?.items[0].identification?.registrationNumber).toBe(mockResponseBody.items[0].identification?.registration_number);

        expect(data.resource?.items[0].nameElements.title).toBe(mockResponseBody.items[0].name_elements.title);
        expect(data.resource?.items[0].nameElements.forename).toBe(mockResponseBody.items[0].name_elements.forename);
        expect(data.resource?.items[0].nameElements.otherForenames).toBe(mockResponseBody.items[0].name_elements.other_forenames);
        expect(data.resource?.items[0].nameElements.middleName).toBe(mockResponseBody.items[0].name_elements.middle_name);
        expect(data.resource?.items[0].nameElements.surname).toBe(mockResponseBody.items[0].name_elements.surname);
    });

    it(
        "uses default values for startIndex and itemsPerPage when not provided",
        async () => {
            await companyPsc.getCompanyPsc("123");
            expect(mockRequest).toHaveBeenCalledWith(
                "/company/123/persons-with-significant-control?start_index=0&items_per_page=25"
            );
        }
    );

    it("uses provided startIndex and itemsPerPage values", async () => {
        await companyPsc.getCompanyPsc("123", 10, 20);
        expect(mockRequest).toHaveBeenCalledWith(
            "/company/123/persons-with-significant-control?start_index=10&items_per_page=20"
        );
    });

    it(
        "uses default startIndex when not provided and itemsPerPage is provided",
        async () => {
            await companyPsc.getCompanyPsc("123", undefined, 10);
            expect(mockRequest).toHaveBeenCalledWith(
                "/company/123/persons-with-significant-control?start_index=0&items_per_page=10"
            );
        }
    );

    it(
        "uses default itemsPerPage when not provided and startIndex is provided",
        async () => {
            await companyPsc.getCompanyPsc("123", 10);
            expect(mockRequest).toHaveBeenCalledWith(
                "/company/123/persons-with-significant-control?start_index=10&items_per_page=25"
            );
        }
    );
});

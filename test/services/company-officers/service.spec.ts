import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";

import CompanyOfficersService from "../../../src/services/company-officers/service";
import { RequestClient, HttpResponse } from "../../../src/http";
import { CompanyOfficersResource } from "../../../src/services/company-officers/types";


const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("company-officers", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    afterEach(done => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
        done();
    });

    it("returns an error response on failure", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
        const companyOfficers : CompanyOfficersService = new CompanyOfficersService(requestClient);
        const data = await companyOfficers.getCompanyOfficers("NUMBER-NOT-IMPORTANT");

        expect(data.httpStatusCode).toBe(401);
        expect(data.resource).toBeUndefined();
    });

    it("maps the company field data items correctly", async () => {
        const mockResponseBody : CompanyOfficersResource = ({
            active_count: "1",
            etag: "someEtag",
            inactive_count: "0",
            items_per_page: "1",
            kind: "officer-list",
            resigned_count: "0",
            start_index: "0",
            total_results: "1",
            links: {
                self: "company/123/officers"
            },
            items: [
                {
                    appointed_on: (new Date()).toISOString(),
                    occupation: "director",
                    country_of_residence: "United Kingdom",
                    nationality: "British",
                    resigned_on: (new Date()).toISOString(),
                    name: "Some Director",
                    officer_role: "director",
                    responsibilities: "Determining the company’s strategic objectives and policies",
                    address: {
                        address_line_1: "123 Street",
                        address_line_2: "Some area",
                        care_of: "Some council",
                        country: "United Kingdom",
                        locality: "Wales",
                        po_box: "123",
                        postal_code: "SW1",
                        premises: "some premises",
                        region: "South"
                    },
                    date_of_birth: {
                        day: "15",
                        month: "4",
                        year: "1996"
                    },
                    former_names: [
                        {
                            forenames: "Fore",
                            surname: "Sur"
                        }
                    ],
                    identification: {
                        identification_type: "some identification type",
                        legal_authority: "some legal auth",
                        legal_form: "some legal form",
                        place_registered: "some place",
                        registration_number: "some reg"
                    },
                    contact_details: {
                        contact_name: "Firstname Surname"
                    },
                    links: {
                        self: "appointmentId01",
                        officer: {
                            appointments: "officers/456/appointments"
                        }
                    }
                }
            ]
        });

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
        const companyOfficers : CompanyOfficersService = new CompanyOfficersService(requestClient);
        const data = await companyOfficers.getCompanyOfficers("123");

        expect(data.httpStatusCode).toBe(200);

        expect(data.resource.activeCount).toBe(mockResponseBody.active_count);
        expect(data.resource.etag).toBe(mockResponseBody.etag);
        expect(data.resource.inactiveCount).toBe(mockResponseBody.inactive_count);
        expect(data.resource.itemsPerPage).toBe(mockResponseBody.items_per_page);
        expect(data.resource.kind).toBe(mockResponseBody.kind);
        expect(data.resource.resignedCount).toBe(mockResponseBody.resigned_count);
        expect(data.resource.startIndex).toBe(mockResponseBody.start_index);
        expect(data.resource.totalResults).toBe(mockResponseBody.total_results);

        expect(data.resource.links.self).toBe(mockResponseBody.links.self);

        expect(data.resource.items.length).toBe(mockResponseBody.items.length);

        expect(data.resource.items[0].appointedOn).toBe(mockResponseBody.items[0].appointed_on);
        expect(data.resource.items[0].countryOfResidence).toBe(mockResponseBody.items[0].country_of_residence);
        expect(data.resource.items[0].nationality).toBe(mockResponseBody.items[0].nationality);
        expect(data.resource.items[0].occupation).toBe(mockResponseBody.items[0].occupation);
        expect(data.resource.items[0].resignedOn).toBe(mockResponseBody.items[0].resigned_on);
        expect(data.resource.items[0].name).toBe(mockResponseBody.items[0].name);
        expect(data.resource.items[0].officerRole).toBe(mockResponseBody.items[0].officer_role);
        expect(data.resource.items[0].responsibilities).toBe(mockResponseBody.items[0].responsibilities);

        expect(data.resource.items[0].address.addressLine1).toBe(mockResponseBody.items[0].address.address_line_1);
        expect(data.resource.items[0].address.addressLine2).toBe(mockResponseBody.items[0].address.address_line_2);
        expect(data.resource.items[0].address.careOf).toBe(mockResponseBody.items[0].address.care_of);
        expect(data.resource.items[0].address.country).toBe(mockResponseBody.items[0].address.country);
        expect(data.resource.items[0].address.locality).toBe(mockResponseBody.items[0].address.locality);
        expect(data.resource.items[0].address.poBox).toBe(mockResponseBody.items[0].address.po_box);
        expect(data.resource.items[0].address.postalCode).toBe(mockResponseBody.items[0].address.postal_code);
        expect(data.resource.items[0].address.premises).toBe(mockResponseBody.items[0].address.premises);
        expect(data.resource.items[0].address.region).toBe(mockResponseBody.items[0].address.region);

        expect(data.resource.items[0].dateOfBirth.day).toBe(mockResponseBody.items[0].date_of_birth.day);
        expect(data.resource.items[0].dateOfBirth.month).toBe(mockResponseBody.items[0].date_of_birth.month);
        expect(data.resource.items[0].dateOfBirth.year).toBe(mockResponseBody.items[0].date_of_birth.year);

        expect(data.resource.items[0].formerNames.length).toBe(mockResponseBody.items[0].former_names.length);
        expect(data.resource.items[0].formerNames[0].forenames).toBe(mockResponseBody.items[0].former_names[0].forenames);
        expect(data.resource.items[0].formerNames[0].surname).toBe(mockResponseBody.items[0].former_names[0].surname);

        expect(data.resource.items[0].identification.identificationType).toBe(mockResponseBody.items[0].identification.identification_type);
        expect(data.resource.items[0].identification.legalAuthority).toBe(mockResponseBody.items[0].identification.legal_authority);
        expect(data.resource.items[0].identification.legalForm).toBe(mockResponseBody.items[0].identification.legal_form);
        expect(data.resource.items[0].identification.placeRegistered).toBe(mockResponseBody.items[0].identification.place_registered);
        expect(data.resource.items[0].identification.registrationNumber).toBe(mockResponseBody.items[0].identification.registration_number);

        expect(data.resource.items[0].contactDetails.contactName).toBe(mockResponseBody.items[0].contact_details.contact_name);

        expect(data.resource.items[0].links.officer.appointments).toBe(mockResponseBody.items[0].links.officer.appointments);
        expect(data.resource.items[0].links.self).toBe(mockResponseBody.items[0].links.self);
    });

    it("should pass url with default parameters when undefined", async () => {
        const spy = jest.spyOn(requestClient, "httpGet").mockClear();
        const companyOfficers : CompanyOfficersService = new CompanyOfficersService(requestClient);
        await companyOfficers.getCompanyOfficers("123");
        expect(spy).toHaveBeenCalledWith("/company/123/officers?page_size=35&page_index=0&register_view=false");
    });

    it("should pass url with specified parameters", async () => {
        const spy = jest.spyOn(requestClient, "httpGet").mockClear();
        const companyOfficers : CompanyOfficersService = new CompanyOfficersService(requestClient);
        await companyOfficers.getCompanyOfficers("123", 10, 2, true);
        expect(spy).toHaveBeenCalledWith("/company/123/officers?page_size=10&page_index=2&register_view=true");
    });

    it("should pass url with orderBy parameter", async () => {
        const spy = jest.spyOn(requestClient, "httpGet").mockClear();
        const companyOfficers : CompanyOfficersService = new CompanyOfficersService(requestClient);
        await companyOfficers.getCompanyOfficers("123", 10, 2, true, "resigned_on");
        expect(spy).toHaveBeenCalledWith(
            "/company/123/officers?page_size=10&page_index=2&register_view=true&order_by=resigned_on"
        );
    });
});

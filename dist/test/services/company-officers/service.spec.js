"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const sinon_1 = __importDefault(require("sinon"));
const service_1 = __importDefault(require("../../../src/services/company-officers/service"));
const http_1 = require("../../../src/http");
const expect = chai_1.default.expect;
const requestClient = new http_1.RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
describe("company-officers", () => {
    beforeEach(() => {
        sinon_1.default.reset();
        sinon_1.default.restore();
    });
    afterEach(done => {
        sinon_1.default.reset();
        sinon_1.default.restore();
        done();
    });
    it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyOfficers = new service_1.default(requestClient);
        const data = yield companyOfficers.getCompanyOfficers("NUMBER-NOT-IMPORTANT");
        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    }));
    it("maps the company field data items correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockResponseBody = ({
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
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyOfficers = new service_1.default(requestClient);
        const data = yield companyOfficers.getCompanyOfficers("123");
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.activeCount).to.equal(mockResponseBody.active_count);
        expect(data.resource.etag).to.equal(mockResponseBody.etag);
        expect(data.resource.inactiveCount).to.equal(mockResponseBody.inactive_count);
        expect(data.resource.itemsPerPage).to.equal(mockResponseBody.items_per_page);
        expect(data.resource.kind).to.equal(mockResponseBody.kind);
        expect(data.resource.resignedCount).to.equal(mockResponseBody.resigned_count);
        expect(data.resource.startIndex).to.equal(mockResponseBody.start_index);
        expect(data.resource.totalResults).to.equal(mockResponseBody.total_results);
        expect(data.resource.links.self).to.equal(mockResponseBody.links.self);
        expect(data.resource.items.length).to.equal(mockResponseBody.items.length);
        expect(data.resource.items[0].appointedOn).to.equal(mockResponseBody.items[0].appointed_on);
        expect(data.resource.items[0].countryOfResidence).to.equal(mockResponseBody.items[0].country_of_residence);
        expect(data.resource.items[0].nationality).to.equal(mockResponseBody.items[0].nationality);
        expect(data.resource.items[0].occupation).to.equal(mockResponseBody.items[0].occupation);
        expect(data.resource.items[0].resignedOn).to.equal(mockResponseBody.items[0].resigned_on);
        expect(data.resource.items[0].name).to.equal(mockResponseBody.items[0].name);
        expect(data.resource.items[0].officerRole).to.equal(mockResponseBody.items[0].officer_role);
        expect(data.resource.items[0].responsibilities).to.equal(mockResponseBody.items[0].responsibilities);
        expect(data.resource.items[0].address.addressLine1).to.equal(mockResponseBody.items[0].address.address_line_1);
        expect(data.resource.items[0].address.addressLine2).to.equal(mockResponseBody.items[0].address.address_line_2);
        expect(data.resource.items[0].address.careOf).to.equal(mockResponseBody.items[0].address.care_of);
        expect(data.resource.items[0].address.country).to.equal(mockResponseBody.items[0].address.country);
        expect(data.resource.items[0].address.locality).to.equal(mockResponseBody.items[0].address.locality);
        expect(data.resource.items[0].address.poBox).to.equal(mockResponseBody.items[0].address.po_box);
        expect(data.resource.items[0].address.postalCode).to.equal(mockResponseBody.items[0].address.postal_code);
        expect(data.resource.items[0].address.premises).to.equal(mockResponseBody.items[0].address.premises);
        expect(data.resource.items[0].address.region).to.equal(mockResponseBody.items[0].address.region);
        expect(data.resource.items[0].dateOfBirth.day).to.equal(mockResponseBody.items[0].date_of_birth.day);
        expect(data.resource.items[0].dateOfBirth.month).to.equal(mockResponseBody.items[0].date_of_birth.month);
        expect(data.resource.items[0].dateOfBirth.year).to.equal(mockResponseBody.items[0].date_of_birth.year);
        expect(data.resource.items[0].formerNames.length).to.equal(mockResponseBody.items[0].former_names.length);
        expect(data.resource.items[0].formerNames[0].forenames).to.equal(mockResponseBody.items[0].former_names[0].forenames);
        expect(data.resource.items[0].formerNames[0].surname).to.equal(mockResponseBody.items[0].former_names[0].surname);
        expect(data.resource.items[0].identification.identificationType).to.equal(mockResponseBody.items[0].identification.identification_type);
        expect(data.resource.items[0].identification.legalAuthority).to.equal(mockResponseBody.items[0].identification.legal_authority);
        expect(data.resource.items[0].identification.legalForm).to.equal(mockResponseBody.items[0].identification.legal_form);
        expect(data.resource.items[0].identification.placeRegistered).to.equal(mockResponseBody.items[0].identification.place_registered);
        expect(data.resource.items[0].identification.registrationNumber).to.equal(mockResponseBody.items[0].identification.registration_number);
        expect(data.resource.items[0].contactDetails.contactName).to.equal(mockResponseBody.items[0].contact_details.contact_name);
        expect(data.resource.items[0].links.officer.appointments).to.equal(mockResponseBody.items[0].links.officer.appointments);
        expect(data.resource.items[0].links.self).to.equal(mockResponseBody.items[0].links.self);
    }));
    it("should pass url with default parameters when undefined", () => __awaiter(void 0, void 0, void 0, function* () {
        const spy = sinon_1.default.spy(requestClient, "httpGet");
        const companyOfficers = new service_1.default(requestClient);
        yield companyOfficers.getCompanyOfficers("123");
        expect(spy.calledWith("/company/123/officers?page_size=35&page_index=0&register_view=false")).to.equal(true);
    }));
    it("should pass url with specified parameters", () => __awaiter(void 0, void 0, void 0, function* () {
        const spy = sinon_1.default.spy(requestClient, "httpGet");
        const companyOfficers = new service_1.default(requestClient);
        yield companyOfficers.getCompanyOfficers("123", 10, 2, true);
        expect(spy.calledWith("/company/123/officers?page_size=10&page_index=2&register_view=true")).to.equal(true);
    }));
    it("should pass url with orderBy parameter", () => __awaiter(void 0, void 0, void 0, function* () {
        const spy = sinon_1.default.spy(requestClient, "httpGet");
        const companyOfficers = new service_1.default(requestClient);
        yield companyOfficers.getCompanyOfficers("123", 10, 2, true, "resigned_on");
        expect(spy.calledWith("/company/123/officers?page_size=10&page_index=2&register_view=true&order_by=resigned_on")).to.equal(true);
    }));
});
//# sourceMappingURL=service.spec.js.map
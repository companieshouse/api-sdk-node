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
const service_1 = __importDefault(require("../../../src/services/company-psc/service"));
const http_1 = require("../../../src/http");
const expect = chai_1.default.expect;
const requestClient = new http_1.RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
describe("company-psc", () => {
    let mockRequest;
    let companyPsc;
    let mockResponseBody;
    beforeEach(() => {
        sinon_1.default.reset();
        sinon_1.default.restore();
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
        mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        companyPsc = new service_1.default(requestClient);
    });
    afterEach(() => {
        sinon_1.default.restore();
    });
    it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        mockRequest.resolves(mockGetResponse);
        const data = yield companyPsc.getCompanyPsc("NUMBER-NOT-IMPORTANT");
        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    }));
    it("maps the company field data items correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10;
        const data = yield companyPsc.getCompanyPsc("123");
        expect(data.httpStatusCode).to.equal(200);
        expect((_a = data.resource) === null || _a === void 0 ? void 0 : _a.activeCount).to.equal(mockResponseBody.active_count);
        expect((_b = data.resource) === null || _b === void 0 ? void 0 : _b.ceasedCount).to.equal(mockResponseBody.ceased_count);
        expect((_c = data.resource) === null || _c === void 0 ? void 0 : _c.itemsPerPage).to.equal(mockResponseBody.items_per_page);
        expect((_d = data.resource) === null || _d === void 0 ? void 0 : _d.startIndex).to.equal(mockResponseBody.start_index);
        expect((_e = data.resource) === null || _e === void 0 ? void 0 : _e.totalResults).to.equal(mockResponseBody.total_results);
        expect((_f = data.resource) === null || _f === void 0 ? void 0 : _f.links.self).to.equal(mockResponseBody.links.self);
        expect((_g = data.resource) === null || _g === void 0 ? void 0 : _g.items.length).to.equal(mockResponseBody.items.length);
        expect((_h = data.resource) === null || _h === void 0 ? void 0 : _h.items[0].countryOfResidence).to.equal(mockResponseBody.items[0].country_of_residence);
        expect((_j = data.resource) === null || _j === void 0 ? void 0 : _j.items[0].etag).to.equal(mockResponseBody.items[0].etag);
        expect((_k = data.resource) === null || _k === void 0 ? void 0 : _k.items[0].nationality).to.equal(mockResponseBody.items[0].nationality);
        expect((_l = data.resource) === null || _l === void 0 ? void 0 : _l.items[0].name).to.equal(mockResponseBody.items[0].name);
        expect((_m = data.resource) === null || _m === void 0 ? void 0 : _m.items[0].naturesOfControl).to.eql(mockResponseBody.items[0].natures_of_control);
        expect((_o = data.resource) === null || _o === void 0 ? void 0 : _o.items[0].address.addressLine1).to.equal(mockResponseBody.items[0].address.address_line_1);
        expect((_p = data.resource) === null || _p === void 0 ? void 0 : _p.items[0].address.locality).to.equal(mockResponseBody.items[0].address.locality);
        expect((_q = data.resource) === null || _q === void 0 ? void 0 : _q.items[0].address.postalCode).to.equal(mockResponseBody.items[0].address.postal_code);
        expect((_r = data.resource) === null || _r === void 0 ? void 0 : _r.items[0].address.region).to.equal(mockResponseBody.items[0].address.region);
        expect((_s = data.resource) === null || _s === void 0 ? void 0 : _s.items[0].dateOfBirth.month).to.equal(mockResponseBody.items[0].date_of_birth.month);
        expect((_t = data.resource) === null || _t === void 0 ? void 0 : _t.items[0].dateOfBirth.year).to.equal(mockResponseBody.items[0].date_of_birth.year);
        expect((_v = (_u = data.resource) === null || _u === void 0 ? void 0 : _u.items[0].identification) === null || _v === void 0 ? void 0 : _v.legalAuthority).to.equal((_w = mockResponseBody.items[0].identification) === null || _w === void 0 ? void 0 : _w.legal_authority);
        expect((_y = (_x = data.resource) === null || _x === void 0 ? void 0 : _x.items[0].identification) === null || _y === void 0 ? void 0 : _y.legalForm).to.equal((_z = mockResponseBody.items[0].identification) === null || _z === void 0 ? void 0 : _z.legal_form);
        expect((_1 = (_0 = data.resource) === null || _0 === void 0 ? void 0 : _0.items[0].identification) === null || _1 === void 0 ? void 0 : _1.placeRegistered).to.equal((_2 = mockResponseBody.items[0].identification) === null || _2 === void 0 ? void 0 : _2.place_registered);
        expect((_4 = (_3 = data.resource) === null || _3 === void 0 ? void 0 : _3.items[0].identification) === null || _4 === void 0 ? void 0 : _4.registrationNumber).to.equal((_5 = mockResponseBody.items[0].identification) === null || _5 === void 0 ? void 0 : _5.registration_number);
        expect((_6 = data.resource) === null || _6 === void 0 ? void 0 : _6.items[0].nameElements.title).to.equal(mockResponseBody.items[0].name_elements.title);
        expect((_7 = data.resource) === null || _7 === void 0 ? void 0 : _7.items[0].nameElements.forename).to.equal(mockResponseBody.items[0].name_elements.forename);
        expect((_8 = data.resource) === null || _8 === void 0 ? void 0 : _8.items[0].nameElements.otherForenames).to.equal(mockResponseBody.items[0].name_elements.other_forenames);
        expect((_9 = data.resource) === null || _9 === void 0 ? void 0 : _9.items[0].nameElements.middleName).to.equal(mockResponseBody.items[0].name_elements.middle_name);
        expect((_10 = data.resource) === null || _10 === void 0 ? void 0 : _10.items[0].nameElements.surname).to.equal(mockResponseBody.items[0].name_elements.surname);
    }));
    it("uses default values for startIndex and itemsPerPage when not provided", () => __awaiter(void 0, void 0, void 0, function* () {
        yield companyPsc.getCompanyPsc("123");
        expect(mockRequest.calledWith("/company/123/persons-with-significant-control?start_index=0&items_per_page=25")).to.be.true;
    }));
    it("uses provided startIndex and itemsPerPage values", () => __awaiter(void 0, void 0, void 0, function* () {
        yield companyPsc.getCompanyPsc("123", 10, 20);
        expect(mockRequest.calledWith("/company/123/persons-with-significant-control?start_index=10&items_per_page=20")).to.be.true;
    }));
    it("uses default startIndex when not provided and itemsPerPage is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        yield companyPsc.getCompanyPsc("123", undefined, 10);
        expect(mockRequest.calledWith("/company/123/persons-with-significant-control?start_index=0&items_per_page=10")).to.be.true;
    }));
    it("uses default itemsPerPage when not provided and startIndex is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        yield companyPsc.getCompanyPsc("123", 10);
        expect(mockRequest.calledWith("/company/123/persons-with-significant-control?start_index=10&items_per_page=25")).to.be.true;
    }));
});
//# sourceMappingURL=service.spec.js.map
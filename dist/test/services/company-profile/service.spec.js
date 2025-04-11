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
const service_1 = __importDefault(require("../../../src/services/company-profile/service"));
const http_1 = require("../../../src/http");
const mocks_1 = require("./mocks");
const expect = chai_1.default.expect;
const requestClient = new http_1.RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
describe("company-profile", () => {
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
        const companyProfile = new service_1.default(requestClient);
        const data = yield companyProfile.getCompanyProfile("NUMBER-NOT-IMPORTANT");
        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    }));
    it("maps the company field data items correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17;
        const mockResponseBody = mocks_1.fullCompanyProfileMock;
        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyProfile = new service_1.default(requestClient);
        const data = yield companyProfile.getCompanyProfile("NUMBER-NOT-IMPORTANT");
        const resource = data.resource;
        expect(data.httpStatusCode).to.equal(200);
        expect(resource.companyName).to.equal(mockResponseBody.company_name);
        expect(resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(resource.companyStatus).to.equal(mockResponseBody.company_status);
        expect(resource.companyStatusDetail).to.equal(mockResponseBody.company_status_detail);
        expect(resource.dateOfCreation).to.equal(mockResponseBody.date_of_creation);
        expect(resource.jurisdiction).to.equal(mockResponseBody.jurisdiction);
        expect(resource.sicCodes).to.eql(mockResponseBody.sic_codes);
        expect(resource.hasBeenLiquidated).to.equal(mockResponseBody.has_been_liquidated);
        expect(resource.hasSuperSecurePscs).to.equal(mockResponseBody.has_super_secure_pscs);
        expect(resource.type).to.equal(mockResponseBody.type);
        expect(resource.hasCharges).to.equal(mockResponseBody.has_charges);
        expect(resource.hasInsolvencyHistory).to.equal(mockResponseBody.has_insolvency_history);
        expect(resource.registeredOfficeAddress.addressLineOne).to.equal(mockResponseBody.registered_office_address.address_line_1);
        expect(resource.registeredOfficeAddress.addressLineTwo).to.equal(mockResponseBody.registered_office_address.address_line_2);
        expect(resource.registeredOfficeAddress.postalCode).to.equal(mockResponseBody.registered_office_address.postal_code);
        expect(resource.registeredOfficeAddress.careOf).to.equal(mockResponseBody.registered_office_address.care_of);
        expect(resource.registeredOfficeAddress.country).to.equal(mockResponseBody.registered_office_address.country);
        expect(resource.registeredOfficeAddress.locality).to.equal(mockResponseBody.registered_office_address.locality);
        expect(resource.registeredOfficeAddress.poBox).to.equal(mockResponseBody.registered_office_address.po_box);
        expect(resource.registeredOfficeAddress.premises).to.equal(mockResponseBody.registered_office_address.premises);
        expect(resource.registeredOfficeAddress.region).to.equal(mockResponseBody.registered_office_address.region);
        expect((_a = resource.serviceAddress) === null || _a === void 0 ? void 0 : _a.addressLineOne).to.equal((_b = mockResponseBody.service_address) === null || _b === void 0 ? void 0 : _b.address_line_1);
        expect((_c = resource.serviceAddress) === null || _c === void 0 ? void 0 : _c.addressLineTwo).to.equal((_d = mockResponseBody.service_address) === null || _d === void 0 ? void 0 : _d.address_line_2);
        expect((_e = resource.serviceAddress) === null || _e === void 0 ? void 0 : _e.postalCode).to.equal((_f = mockResponseBody.service_address) === null || _f === void 0 ? void 0 : _f.postal_code);
        expect((_g = resource.serviceAddress) === null || _g === void 0 ? void 0 : _g.careOf).to.equal((_h = mockResponseBody.service_address) === null || _h === void 0 ? void 0 : _h.care_of);
        expect((_j = resource.serviceAddress) === null || _j === void 0 ? void 0 : _j.country).to.equal((_k = mockResponseBody.service_address) === null || _k === void 0 ? void 0 : _k.country);
        expect((_l = resource.serviceAddress) === null || _l === void 0 ? void 0 : _l.locality).to.equal((_m = mockResponseBody.service_address) === null || _m === void 0 ? void 0 : _m.locality);
        expect((_o = resource.serviceAddress) === null || _o === void 0 ? void 0 : _o.poBox).to.equal((_p = mockResponseBody.service_address) === null || _p === void 0 ? void 0 : _p.po_box);
        expect((_q = resource.serviceAddress) === null || _q === void 0 ? void 0 : _q.premises).to.equal((_r = mockResponseBody.service_address) === null || _r === void 0 ? void 0 : _r.premises);
        expect(resource.registeredOfficeAddress.region).to.equal(mockResponseBody.registered_office_address.region);
        expect(resource.accounts.nextAccounts.periodEndOn).to.equal(mockResponseBody.accounts.next_accounts.period_end_on);
        expect(resource.accounts.nextAccounts.periodStartOn).to.equal(mockResponseBody.accounts.next_accounts.period_start_on);
        expect(resource.accounts.nextDue).to.equal(mockResponseBody.accounts.next_due);
        expect(resource.accounts.overdue).to.equal(mockResponseBody.accounts.overdue);
        expect((_s = resource.confirmationStatement) === null || _s === void 0 ? void 0 : _s.lastMadeUpTo).to.equal((_t = mockResponseBody.confirmation_statement) === null || _t === void 0 ? void 0 : _t.last_made_up_to);
        expect((_u = resource.confirmationStatement) === null || _u === void 0 ? void 0 : _u.nextDue).to.equal((_v = mockResponseBody.confirmation_statement) === null || _v === void 0 ? void 0 : _v.next_due);
        expect((_w = resource.confirmationStatement) === null || _w === void 0 ? void 0 : _w.nextMadeUpTo).to.equal((_x = mockResponseBody.confirmation_statement) === null || _x === void 0 ? void 0 : _x.next_made_up_to);
        expect((_y = resource.confirmationStatement) === null || _y === void 0 ? void 0 : _y.overdue).to.equal((_z = mockResponseBody.confirmation_statement) === null || _z === void 0 ? void 0 : _z.overdue);
        expect(resource.links.filingHistory).to.equal(mockResponseBody.links.filing_history);
        expect((_0 = resource.foreignCompanyDetails) === null || _0 === void 0 ? void 0 : _0.governedBy).to.equal((_1 = mockResponseBody.foreign_company_details) === null || _1 === void 0 ? void 0 : _1.governed_by);
        expect((_2 = resource.foreignCompanyDetails) === null || _2 === void 0 ? void 0 : _2.legalForm).to.equal((_3 = mockResponseBody.foreign_company_details) === null || _3 === void 0 ? void 0 : _3.legal_form);
        expect((_4 = resource.foreignCompanyDetails) === null || _4 === void 0 ? void 0 : _4.registrationNumber).to.equal((_5 = mockResponseBody.foreign_company_details) === null || _5 === void 0 ? void 0 : _5.registration_number);
        expect((_6 = resource.foreignCompanyDetails) === null || _6 === void 0 ? void 0 : _6.businessActivity).to.equal((_7 = mockResponseBody.foreign_company_details) === null || _7 === void 0 ? void 0 : _7.business_activity);
        expect((_8 = resource.foreignCompanyDetails) === null || _8 === void 0 ? void 0 : _8.isACreditFinacialInstitution).to.equal((_9 = mockResponseBody.foreign_company_details) === null || _9 === void 0 ? void 0 : _9.is_a_credit_finacial_institution);
        expect((_11 = (_10 = resource.foreignCompanyDetails) === null || _10 === void 0 ? void 0 : _10.originatingRegistry) === null || _11 === void 0 ? void 0 : _11.name).to.equal((_13 = (_12 = mockResponseBody.foreign_company_details) === null || _12 === void 0 ? void 0 : _12.originating_registry) === null || _13 === void 0 ? void 0 : _13.name);
        expect((_15 = (_14 = resource.foreignCompanyDetails) === null || _14 === void 0 ? void 0 : _14.originatingRegistry) === null || _15 === void 0 ? void 0 : _15.country).to.equal((_17 = (_16 = mockResponseBody.foreign_company_details) === null || _16 === void 0 ? void 0 : _16.originating_registry) === null || _17 === void 0 ? void 0 : _17.country);
        expect(resource.isOnRegisterInCountryFormedIn).to.equal(mockResponseBody.is_on_register_in_country_formed_in === "true");
    }));
    it("maps the company field data items correctly when registered office, accounts, confirmation statement, links, and super_secure_pscs are missing", () => __awaiter(void 0, void 0, void 0, function* () {
        var _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40;
        const mockResponseBody = mocks_1.registeredAddressEtcMissingCompanyProfileMock;
        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyProfile = new service_1.default(requestClient);
        const data = yield companyProfile.getCompanyProfile("NUMBER-NOT-IMPORTANT");
        const resource = data.resource;
        expect(data.httpStatusCode).to.equal(200);
        expect(resource.companyName).to.equal(mockResponseBody.company_name);
        expect(resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(resource.companyStatus).to.equal(mockResponseBody.company_status);
        expect(resource.companyStatusDetail).to.equal(mockResponseBody.company_status_detail);
        expect(resource.dateOfCreation).to.equal(mockResponseBody.date_of_creation);
        expect(resource.jurisdiction).to.equal(mockResponseBody.jurisdiction);
        expect(resource.sicCodes).to.eql(mockResponseBody.sic_codes);
        expect(resource.hasBeenLiquidated).to.equal(mockResponseBody.has_been_liquidated);
        expect(resource.type).to.equal(mockResponseBody.type);
        expect(resource.hasCharges).to.equal(mockResponseBody.has_charges);
        expect(resource.hasInsolvencyHistory).to.equal(mockResponseBody.has_insolvency_history);
        expect(resource.registeredOfficeAddress.addressLineOne).to.be.undefined;
        expect(resource.registeredOfficeAddress.addressLineTwo).to.be.undefined;
        expect(resource.registeredOfficeAddress.postalCode).to.be.undefined;
        expect(resource.registeredOfficeAddress.careOf).to.be.undefined;
        expect(resource.registeredOfficeAddress.country).to.be.undefined;
        expect(resource.registeredOfficeAddress.locality).to.be.undefined;
        expect(resource.registeredOfficeAddress.poBox).to.be.undefined;
        expect(resource.registeredOfficeAddress.premises).to.be.undefined;
        expect(resource.registeredOfficeAddress.region).to.be.undefined;
        expect((_18 = resource.serviceAddress) === null || _18 === void 0 ? void 0 : _18.addressLineOne).to.be.undefined;
        expect((_19 = resource.serviceAddress) === null || _19 === void 0 ? void 0 : _19.addressLineTwo).to.be.undefined;
        expect((_20 = resource.serviceAddress) === null || _20 === void 0 ? void 0 : _20.postalCode).to.be.undefined;
        expect((_21 = resource.serviceAddress) === null || _21 === void 0 ? void 0 : _21.careOf).to.be.undefined;
        expect((_22 = resource.serviceAddress) === null || _22 === void 0 ? void 0 : _22.country).to.be.undefined;
        expect((_23 = resource.serviceAddress) === null || _23 === void 0 ? void 0 : _23.locality).to.be.undefined;
        expect((_24 = resource.serviceAddress) === null || _24 === void 0 ? void 0 : _24.poBox).to.be.undefined;
        expect((_25 = resource.serviceAddress) === null || _25 === void 0 ? void 0 : _25.premises).to.be.undefined;
        expect((_26 = resource.serviceAddress) === null || _26 === void 0 ? void 0 : _26.region).to.be.undefined;
        expect(resource.accounts.nextAccounts.periodEndOn).to.be.undefined;
        expect(resource.accounts.nextAccounts.periodStartOn).to.be.undefined;
        expect(resource.accounts.nextDue).to.be.undefined;
        expect(resource.accounts.overdue).to.be.undefined;
        expect((_27 = resource.confirmationStatement) === null || _27 === void 0 ? void 0 : _27.lastMadeUpTo).to.be.undefined;
        expect((_28 = resource.confirmationStatement) === null || _28 === void 0 ? void 0 : _28.nextDue).to.be.undefined;
        expect((_29 = resource.confirmationStatement) === null || _29 === void 0 ? void 0 : _29.nextMadeUpTo).to.be.undefined;
        expect((_30 = resource.confirmationStatement) === null || _30 === void 0 ? void 0 : _30.overdue).to.be.undefined;
        expect((_31 = resource.foreignCompanyDetails) === null || _31 === void 0 ? void 0 : _31.businessActivity).to.be.undefined;
        expect((_32 = resource.foreignCompanyDetails) === null || _32 === void 0 ? void 0 : _32.governedBy).to.be.undefined;
        expect((_33 = resource.foreignCompanyDetails) === null || _33 === void 0 ? void 0 : _33.registrationNumber).to.be.undefined;
        expect((_34 = resource.foreignCompanyDetails) === null || _34 === void 0 ? void 0 : _34.legalForm).to.be.undefined;
        expect((_35 = resource.foreignCompanyDetails) === null || _35 === void 0 ? void 0 : _35.businessActivity).to.be.undefined;
        expect((_36 = resource.foreignCompanyDetails) === null || _36 === void 0 ? void 0 : _36.isACreditFinacialInstitution).to.be.undefined;
        expect((_38 = (_37 = resource.foreignCompanyDetails) === null || _37 === void 0 ? void 0 : _37.originatingRegistry) === null || _38 === void 0 ? void 0 : _38.name).to.be.undefined;
        expect((_40 = (_39 = resource.foreignCompanyDetails) === null || _39 === void 0 ? void 0 : _39.originatingRegistry) === null || _40 === void 0 ? void 0 : _40.country).to.be.undefined;
        expect(resource.isOnRegisterInCountryFormedIn).to.be.false;
        expect(resource.links.filingHistory).to.be.undefined;
        expect(resource.hasSuperSecurePscs).to.be.undefined;
    }));
    it("maps the company field data items correctly when foreign company details, service address, is on register of country formed in are missing", () => __awaiter(void 0, void 0, void 0, function* () {
        var _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63;
        const mockResponseBody = mocks_1.foreignCompanyDetailsEtcMissingCompanyProfileMock;
        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const companyProfile = new service_1.default(requestClient);
        const data = yield companyProfile.getCompanyProfile("NUMBER-NOT-IMPORTANT");
        const resource = data.resource;
        expect(data.httpStatusCode).to.equal(200);
        expect(resource.companyName).to.equal(mockResponseBody.company_name);
        expect(resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(resource.companyStatus).to.equal(mockResponseBody.company_status);
        expect(resource.companyStatusDetail).to.equal(mockResponseBody.company_status_detail);
        expect(resource.dateOfCreation).to.equal(mockResponseBody.date_of_creation);
        expect(resource.jurisdiction).to.equal(mockResponseBody.jurisdiction);
        expect(resource.sicCodes).to.eql(mockResponseBody.sic_codes);
        expect(resource.hasBeenLiquidated).to.equal(mockResponseBody.has_been_liquidated);
        expect(resource.type).to.equal(mockResponseBody.type);
        expect(resource.hasCharges).to.equal(mockResponseBody.has_charges);
        expect(resource.hasInsolvencyHistory).to.equal(mockResponseBody.has_insolvency_history);
        expect(resource.registeredOfficeAddress.addressLineOne).to.be.undefined;
        expect(resource.registeredOfficeAddress.addressLineTwo).to.be.undefined;
        expect(resource.registeredOfficeAddress.postalCode).to.be.undefined;
        expect(resource.registeredOfficeAddress.careOf).to.be.undefined;
        expect(resource.registeredOfficeAddress.country).to.be.undefined;
        expect(resource.registeredOfficeAddress.locality).to.be.undefined;
        expect(resource.registeredOfficeAddress.poBox).to.be.undefined;
        expect(resource.registeredOfficeAddress.premises).to.be.undefined;
        expect(resource.registeredOfficeAddress.region).to.be.undefined;
        expect((_41 = resource.serviceAddress) === null || _41 === void 0 ? void 0 : _41.addressLineOne).to.be.undefined;
        expect((_42 = resource.serviceAddress) === null || _42 === void 0 ? void 0 : _42.addressLineTwo).to.be.undefined;
        expect((_43 = resource.serviceAddress) === null || _43 === void 0 ? void 0 : _43.postalCode).to.be.undefined;
        expect((_44 = resource.serviceAddress) === null || _44 === void 0 ? void 0 : _44.careOf).to.be.undefined;
        expect((_45 = resource.serviceAddress) === null || _45 === void 0 ? void 0 : _45.country).to.be.undefined;
        expect((_46 = resource.serviceAddress) === null || _46 === void 0 ? void 0 : _46.locality).to.be.undefined;
        expect((_47 = resource.serviceAddress) === null || _47 === void 0 ? void 0 : _47.poBox).to.be.undefined;
        expect((_48 = resource.serviceAddress) === null || _48 === void 0 ? void 0 : _48.premises).to.be.undefined;
        expect((_49 = resource.serviceAddress) === null || _49 === void 0 ? void 0 : _49.region).to.be.undefined;
        expect(resource.accounts.nextAccounts.periodEndOn).to.be.undefined;
        expect(resource.accounts.nextAccounts.periodStartOn).to.be.undefined;
        expect(resource.accounts.nextDue).to.be.undefined;
        expect(resource.accounts.overdue).to.be.undefined;
        expect((_50 = resource.confirmationStatement) === null || _50 === void 0 ? void 0 : _50.lastMadeUpTo).to.be.undefined;
        expect((_51 = resource.confirmationStatement) === null || _51 === void 0 ? void 0 : _51.nextDue).to.be.undefined;
        expect((_52 = resource.confirmationStatement) === null || _52 === void 0 ? void 0 : _52.nextMadeUpTo).to.be.undefined;
        expect((_53 = resource.confirmationStatement) === null || _53 === void 0 ? void 0 : _53.overdue).to.be.undefined;
        expect((_54 = resource.foreignCompanyDetails) === null || _54 === void 0 ? void 0 : _54.businessActivity).to.be.undefined;
        expect((_55 = resource.foreignCompanyDetails) === null || _55 === void 0 ? void 0 : _55.governedBy).to.be.undefined;
        expect((_56 = resource.foreignCompanyDetails) === null || _56 === void 0 ? void 0 : _56.legalForm).to.be.undefined;
        expect((_57 = resource.foreignCompanyDetails) === null || _57 === void 0 ? void 0 : _57.registrationNumber).to.be.undefined;
        expect((_58 = resource.foreignCompanyDetails) === null || _58 === void 0 ? void 0 : _58.businessActivity).to.be.undefined;
        expect((_59 = resource.foreignCompanyDetails) === null || _59 === void 0 ? void 0 : _59.isACreditFinacialInstitution).to.be.undefined;
        expect((_61 = (_60 = resource.foreignCompanyDetails) === null || _60 === void 0 ? void 0 : _60.originatingRegistry) === null || _61 === void 0 ? void 0 : _61.name).to.be.undefined;
        expect((_63 = (_62 = resource.foreignCompanyDetails) === null || _62 === void 0 ? void 0 : _62.originatingRegistry) === null || _63 === void 0 ? void 0 : _63.country).to.be.undefined;
        expect(resource.isOnRegisterInCountryFormedIn).to.be.false;
        expect(resource.links.filingHistory).to.be.undefined;
        expect(resource.hasSuperSecurePscs).to.be.undefined;
    }));
});
//# sourceMappingURL=service.spec.js.map
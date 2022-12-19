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
const mapping_1 = __importDefault(require("../../mapping/mapping"));
/**
 * https://developer.companieshouse.gov.uk/api/docs/company/company_number/officers/officers.html
 */
class CompanyOfficersService {
    constructor(client) {
        this.client = client;
    }
    /**
   * Get the officers for a company.
   *
   * @param number the company number to look up
   * @param pageSize the number of officers to show on the page
   * @param pageIndex the start position of the page
   * @param registerView Display register specific information. If given register is held at Companies House,
   * registers_view set to true and correct register_type specified, only active officers will be returned.
   * Those will also have full date of birth.Defaults to false
   * @param orderBy the field by which to order the result set
   */
    getCompanyOfficers(number, pageSize = 35, pageIndex = 0, registerView = false, orderBy) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `/company/${number}/officers`;
            url = url.concat("?", `page_size=${pageSize}`, "&", `page_index=${pageIndex}`, "&", `register_view=${registerView}`);
            if (orderBy) {
                url = url.concat(`&order_by=${orderBy}`);
            }
            const resp = yield this.client.httpGet(url);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            const body = resp.body;
            resource.resource = mapping_1.default.camelCaseKeys(body);
            return resource;
        });
    }
}
exports.default = CompanyOfficersService;
//# sourceMappingURL=service.js.map
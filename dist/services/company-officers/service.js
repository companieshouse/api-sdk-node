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
   */
    getCompanyOfficers(number) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpGet(`/company/${number}/officers`);
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
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
 * https://developer.companieshouse.gov.uk/api/docs/company/company_number/filing-history/getFilingHistoryList.html
 **/
class CompanyFilingHistoryService {
    constructor(client) {
        this.client = client;
    }
    /**
   * Get the filing history for a company
   *
   */
    getCompanyFilingHistory(number, category) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryString;
            if (category) {
                queryString = `?category=${category}`;
            }
            let url = `/company/${number}/filing-history`;
            if (queryString) {
                url = url.concat(queryString);
            }
            const resp = yield this.client.httpGet(url);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            // cast the response body to the expected type
            const body = resp.body;
            resource.resource = mapping_1.default.camelCaseKeys(body);
            return resource;
        });
    }
}
exports.default = CompanyFilingHistoryService;
//# sourceMappingURL=service.js.map
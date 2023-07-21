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
 * https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/reference/persons-with-significant-control/list-statements
 */
class CompanyPscStatementsService {
    constructor(client) {
        this.client = client;
    }
    /**
     * Get the PSC statements for a company.
     *
     * @param companyNumber the company number to look up
     * @param pageSize the size of the page to return
     * @param pageIndex the index of the page to return
     * @param registerView Display register specific information.
     */
    getCompanyPscStatements(companyNumber, pageSize, pageIndex, registerView = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `/company/${companyNumber}/persons-with-significant-control-statements`;
            url = url.concat("?", `page_size=${pageSize}`, "&", `page_index=${pageIndex}`, "&", `register_view=${registerView}`);
            const resp = yield this.client.httpGet(url);
            if (resp.status !== 200) {
                return {
                    httpStatusCode: resp.status,
                    errors: resp.error
                };
            }
            const sdkResponse = {
                httpStatusCode: resp.status
            };
            const body = resp.body;
            sdkResponse.resource = mapping_1.default.camelCaseKeys(body);
            return sdkResponse;
        });
    }
}
exports.default = CompanyPscStatementsService;
//# sourceMappingURL=service.js.map
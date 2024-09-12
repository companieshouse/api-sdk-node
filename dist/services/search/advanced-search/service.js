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
Object.defineProperty(exports, "__esModule", { value: true });
require("url-search-params-polyfill");
class AdvancedSearchService {
    constructor(client) {
        this.client = client;
    }
    getCompanies(startIndex, companyNameIncludes, companyNameExcludes, location, incorporatedFrom, incorporatedTo, sicCodes, companyStatus, companyType, companySubtype, dissolvedFrom, dissolvedTo, size, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const START_INDEX_QUERY = "start_index";
            const COMPANY_NAME_INCLUDES_QUERY = "company_name_includes";
            const COMPANY_NAME_EXCLUDES_QUERY = "company_name_excludes";
            const LOCATION_QUERY = "location";
            const INCORPORATED_FROM_QUERY = "incorporated_from";
            const INCORPORATED_TO_QUERY = "incorporated_to";
            const SIC_CODES_QUERY = "sic_codes";
            const COMPANY_STATUS_QUERY = "company_status";
            const COMPANY_TYPE_QUERY = "company_type";
            const COMPANY_SUBTYPE_QUERY = "company_subtype";
            const DISSOLVED_FROM_QUERY_PARAMETER = "dissolved_from";
            const DISSOLVED_TO_QUERY_PARAMETER = "dissolved_to";
            const SIZE_QUERY_PARAMETER = "size";
            const additionalHeaders = {
                "X-Request-ID": requestId,
                "Content-Type": "application/json"
            };
            const buildAdvancedSearchURL = new URLSearchParams("/advanced-search/companies?");
            if (startIndex !== null) {
                buildAdvancedSearchURL.append(START_INDEX_QUERY, String(startIndex));
            }
            if (companyNameIncludes !== null) {
                buildAdvancedSearchURL.append(COMPANY_NAME_INCLUDES_QUERY, companyNameIncludes);
            }
            if (companyNameExcludes !== null) {
                buildAdvancedSearchURL.append(COMPANY_NAME_EXCLUDES_QUERY, companyNameExcludes);
            }
            if (location !== null) {
                buildAdvancedSearchURL.append(LOCATION_QUERY, location);
            }
            if (incorporatedFrom !== null) {
                buildAdvancedSearchURL.append(INCORPORATED_FROM_QUERY, incorporatedFrom);
            }
            if (incorporatedTo !== null) {
                buildAdvancedSearchURL.append(INCORPORATED_TO_QUERY, incorporatedTo);
            }
            if (sicCodes !== null) {
                buildAdvancedSearchURL.append(SIC_CODES_QUERY, sicCodes);
            }
            if (companyStatus !== null) {
                buildAdvancedSearchURL.append(COMPANY_STATUS_QUERY, companyStatus);
            }
            if (companyType !== null) {
                buildAdvancedSearchURL.append(COMPANY_TYPE_QUERY, companyType);
            }
            if (companySubtype !== null) {
                buildAdvancedSearchURL.append(COMPANY_SUBTYPE_QUERY, companySubtype);
            }
            if (dissolvedFrom !== null) {
                buildAdvancedSearchURL.append(DISSOLVED_FROM_QUERY_PARAMETER, dissolvedFrom);
            }
            if (dissolvedTo !== null) {
                buildAdvancedSearchURL.append(DISSOLVED_TO_QUERY_PARAMETER, dissolvedTo);
            }
            if (size !== null) {
                buildAdvancedSearchURL.append(SIZE_QUERY_PARAMETER, String(size));
            }
            const advancedSearchUrl = buildAdvancedSearchURL.toString();
            const resp = yield this.client.httpGet(advancedSearchUrl, additionalHeaders);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            resource.resource = resp.body;
            return resource;
        });
    }
}
exports.default = AdvancedSearchService;
//# sourceMappingURL=service.js.map
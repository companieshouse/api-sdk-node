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
class AlphabeticalSearchService {
    constructor(client) {
        this.client = client;
    }
    getCompanies(companyName, requestId, searchBefore, searchAfter, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const SEARCH_BEFORE_QUERY = "&search_before=";
            const SEARCH_AFTER_QUERY = "&search_after=";
            const SIZE_QUERY = "&size=";
            const additionalHeaders = {
                "X-Request-ID": requestId,
                "Content-Type": "application/json"
            };
            let alphabeticalSearchURL = "/alphabetical-search/companies?q=" + companyName;
            if (searchBefore != null) {
                alphabeticalSearchURL += SEARCH_BEFORE_QUERY + searchBefore;
            }
            if (searchAfter != null) {
                alphabeticalSearchURL += SEARCH_AFTER_QUERY + searchAfter;
            }
            if (size != null) {
                alphabeticalSearchURL += SIZE_QUERY + size;
            }
            const resp = yield this.client.httpGet(alphabeticalSearchURL, additionalHeaders);
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
exports.default = AlphabeticalSearchService;
//# sourceMappingURL=service.js.map
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
class DissolvedSearchService {
    constructor(client) {
        this.client = client;
    }
    getCompanies(companyName, requestId, searchType, startIndex, searchBefore, searchAfter, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const additionalHeaders = {
                "X-Request-ID": requestId,
                "Content-Type": "application/json"
            };
            const ALPHABETICAL_QUERY = "&search_type=alphabetical";
            const BEST_MATCH_QUERY = "&search_type=best-match";
            const PREVIOUS_NAME_QUERY = "&search_type=previous-name-dissolved";
            const START_INDEX_QUERY = "&start_index=";
            const SEARCH_BEFORE_QUERY = "&search_before=";
            const SEARCH_AFTER_QUERY = "&search_after=";
            const SIZE_QUERY = "&size=";
            let dissolvedSearchURL = "/dissolved-search/companies?q=" + companyName;
            if (searchType === "alphabetical") {
                dissolvedSearchURL += ALPHABETICAL_QUERY;
                if (searchAfter !== null) {
                    dissolvedSearchURL += SEARCH_AFTER_QUERY + searchAfter;
                }
                if (searchBefore !== null) {
                    dissolvedSearchURL += SEARCH_BEFORE_QUERY + searchBefore;
                }
                if (size !== null) {
                    dissolvedSearchURL += SIZE_QUERY + size;
                }
            }
            if (!startIndex && searchType === "previousNameDissolved") {
                dissolvedSearchURL += PREVIOUS_NAME_QUERY;
            }
            if (startIndex && searchType === "previousNameDissolved") {
                dissolvedSearchURL += PREVIOUS_NAME_QUERY + START_INDEX_QUERY + startIndex;
            }
            if (!startIndex && searchType === "bestMatch") {
                dissolvedSearchURL += BEST_MATCH_QUERY;
            }
            if (startIndex && searchType === "bestMatch") {
                dissolvedSearchURL += BEST_MATCH_QUERY + START_INDEX_QUERY + startIndex;
            }
            const resp = yield this.client.httpGet(dissolvedSearchURL, additionalHeaders);
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
exports.default = DissolvedSearchService;
//# sourceMappingURL=service.js.map
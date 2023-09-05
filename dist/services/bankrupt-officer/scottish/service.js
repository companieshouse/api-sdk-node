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
const BANKRUPT_OFFICER_SEARCH_API_URL = "/internal/officer-search/scottish-bankrupt-officers";
class default_1 {
    constructor(client) {
        this.client = client;
    }
    getBankruptOfficer(ephemeralKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpGet(`${BANKRUPT_OFFICER_SEARCH_API_URL}/${ephemeralKey}`);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            resource.resource = Object.assign({}, resp.body);
            return resource;
        });
    }
    getBankruptOfficers(bankruptOfficerSearchQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpPost(BANKRUPT_OFFICER_SEARCH_API_URL, bankruptOfficerSearchQuery);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            resource.resource = {
                itemsPerPage: resp.body.itemsPerPage,
                startIndex: resp.body.startIndex,
                totalResults: resp.body.totalResults,
                items: [...resp.body.items]
            };
            return resource;
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=service.js.map
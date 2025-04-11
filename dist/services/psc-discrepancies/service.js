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
const util_1 = __importDefault(require("../psc-discrepancies-report/util"));
class default_1 {
    constructor(client) {
        this.client = client;
        this.utility = new util_1.default();
    }
    getPscDiscrepanciesForReport(reportSelfLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpGet(this.buildBaseURL(reportSelfLink));
            return this.utility.processResponse(resp);
        });
    }
    getPscDiscrepancy(selfLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpGet(selfLink);
            return this.utility.processResponse(resp);
        });
    }
    createPscDiscrepancy(reportSelfLink, discrepancy) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpPost(this.buildBaseURL(reportSelfLink), discrepancy);
            return this.utility.processResponse(resp);
        });
    }
    buildBaseURL(reportSelfLink) {
        return `${reportSelfLink}/discrepancies`;
    }
}
exports.default = default_1;
//# sourceMappingURL=service.js.map
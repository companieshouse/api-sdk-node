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
class default_1 {
    constructor(client) {
        this.client = client;
    }
    /**
   * Get a list of penalties for a company.
   *
   * @param companyNumber the company number
   */
    getPenalties(companyNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpGet(`/company/${companyNumber}/penalties/late-filing`);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            resource.resource = {
                etag: resp.body.etag,
                itemsPerPage: resp.body.items_per_page,
                startIndex: resp.body.start_index,
                totalResults: resp.body.total_results,
                items: resp.body.items.map((i) => ({
                    id: i.id,
                    etag: i.etag,
                    kind: i.kind,
                    isDCA: i.is_dca,
                    isPaid: i.is_paid,
                    dueDate: i.due_date,
                    madeUpDate: i.made_up_date,
                    transactionDate: i.transaction_date,
                    originalAmount: i.original_amount,
                    outstandingAmount: i.outstanding,
                    type: i.type
                }))
            };
            return resource;
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=service.js.map
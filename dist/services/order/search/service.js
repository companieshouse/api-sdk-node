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
exports.OrderSearchService = void 0;
const result_1 = require("../../result");
const mapping_1 = __importDefault(require("../../../mapping/mapping"));
class OrderSearchService {
    constructor(client) {
        this.client = client;
    }
    search(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverRequest = mapping_1.default.snakeCaseKeys(request);
            const queryParams = Object.keys(serverRequest).map(key => key + "=" + serverRequest[key]).join("&");
            const serverResponse = yield this.client.httpGet("/orders/search" + (queryParams ? ("?" + queryParams) : ""));
            const response = {
                httpStatusCode: serverResponse.status
            };
            if (serverResponse.error) {
                return result_1.failure({
                    httpStatusCode: serverResponse.status,
                    errors: serverResponse.error.errors
                });
            }
            else {
                response.resource = mapping_1.default.camelCaseKeys(serverResponse.body);
                return result_1.success(response);
            }
        });
    }
}
exports.OrderSearchService = OrderSearchService;
//# sourceMappingURL=service.js.map
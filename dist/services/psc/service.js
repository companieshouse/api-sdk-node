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
 * https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/reference/persons-with-significant-control/get-individual
 */
class PscService {
    constructor(client) {
        this.client = client;
    }
    /**
   * Get the PSC details for an individual person.
   *
   * @param companyNumber the company number to look up
   * @param notificationId the PSC Notification Id to retrieve
   */
    getPscIndividual(companyNumber, notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.httpGet(`/company/${companyNumber}/persons-with-significant-control/individual/${notificationId}`);
            const resource = {
                httpStatusCode: response.status
            };
            if (response.error) {
                return {
                    httpStatusCode: response.status,
                    errors: [response.error]
                };
            }
            const body = response.body;
            resource.resource = mapping_1.default.camelCaseKeys(body);
            return resource;
        });
    }
    /**
   * Get the PSC individual details with their verification state.
   *
   * @param companyNumber the company number to look up
   * @param notificationId the PSC Notification Id to retrieve
   */
    getPscIndWithVerificationState(companyNumber, pscNotificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resourceUri = `/company/${companyNumber}/persons-with-significant-control/individual/${pscNotificationId}/verification-state`;
            const response = yield this.client.httpGet(resourceUri);
            if (response.error) {
                return {
                    httpStatusCode: response.status,
                    errors: [response.error]
                };
            }
            const frontEndResource = {
                httpStatusCode: response.status
            };
            const body = response.body;
            frontEndResource.resource = mapping_1.default.camelCaseKeys(body);
            return frontEndResource;
        });
    }
}
exports.default = PscService;
//# sourceMappingURL=service.js.map
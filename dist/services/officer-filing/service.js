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
class default_1 {
    constructor(client) {
        this.client = client;
    }
    getListActiveDirectorDetails(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.getOfficerFilingUrlIncTransactionId(transactionId)}/active-directors-details`;
            return this.getCompanyOfficerDetails(url);
        });
    }
    getValidationStatus(transactionId, submissionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.getOfficerFilingUrlIncTransactionIdAndSubmissionId(transactionId, submissionId)}/validation_status`;
            return this.getValidationStatusResponse(url);
        });
    }
    getOfficerFilingUrlIncTransactionId(transactionId) {
        return `/transactions/${transactionId}/officers`;
    }
    getOfficerFilingUrlIncTransactionIdAndSubmissionId(transactionId, submissionId) {
        return `/transactions/${transactionId}/officers/${submissionId}/`;
    }
    /**
    * Get the director details including the termination date out of the filing.
    * to be used on the check your answers page for TM01.
    *
    * @params transaction id and submission id to look up the filing
    */
    getDirectorAndTerminationDate(transactionId, submissionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.getOfficerFilingUrlIncTransactionIdAndSubmissionId(transactionId, submissionId)}/tm01-check-answers-directors-details`;
            return this.getCompanyOfficerDetails(url);
        });
    }
    getCurrentOrFutureDissolved(companyNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/officer-filing/company/${companyNumber}/eligibility-check/past-future-dissolved`;
            const resp = yield this.client.httpGet(url);
            if (resp.status >= 400) {
                return { httpStatusCode: resp.status, errors: [resp.error] };
            }
            return { httpStatusCode: resp.status, resource: resp.body };
        });
    }
    getValidationStatusResponse(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpGet(url);
            if (resp.status >= 400) {
                return { httpStatusCode: resp.status, errors: [resp.error] };
            }
            const resource = { httpStatusCode: resp.status };
            const body = resp.body;
            resource.resource = mapping_1.default.camelCaseKeys(body);
            return resource;
        });
    }
    getOfficerFiling(transactionId, filingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/transactions/${transactionId}/officers/${filingId}`;
            const resp = yield this.client.httpGet(url);
            if (resp.status >= 400) {
                return { httpStatusCode: resp.status, errors: [resp.error] };
            }
            const resource = {
                httpStatusCode: resp.status
            };
            const body = resp.body;
            resource.resource = mapping_1.default.camelCaseKeys(body);
            return resource;
        });
    }
    /**
     * Post an officer filing object to update on the API.
     */
    postOfficerFiling(transactionId, officerFiling) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/transactions/${transactionId}/officers`;
            const officerFilingResource = this.mapToDto(officerFiling);
            const resp = yield this.client.httpPost(url, officerFilingResource);
            if (resp.error) {
                return {
                    httpStatusCode: resp.status,
                    errors: [resp.error]
                };
            }
            const resource = {
                httpStatusCode: resp.status
            };
            const body = resp.body;
            this.populateResource(resource, body);
            return resource;
        });
    }
    /**
     * Patch an officer filing object to update on the API.
     */
    patchOfficerFiling(transactionId, filingId, officerFiling) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/transactions/${transactionId}/officers/${filingId}`;
            const officerFilingResource = this.mapToDto(officerFiling);
            const resp = yield this.client.httpPatch(url, officerFilingResource);
            if (resp.error) {
                return {
                    httpStatusCode: resp.status,
                    errors: [resp.error]
                };
            }
            const resource = {
                httpStatusCode: resp.status
            };
            const body = resp.body;
            this.populateResource(resource, body);
            return resource;
        });
    }
    /**
     * Map an OfficerFiling object to an OfficerFilingDto which represents the expected json data model
     */
    mapToDto(officerFiling) {
        return {
            reference_appointment_id: officerFiling.referenceAppointmentId,
            reference_etag: officerFiling.referenceEtag,
            resigned_on: officerFiling.resignedOn
        };
    }
    /**
     * Map a FilingResponseDto in its json data model to a regular FilingResponse object
     * @param resource Where the FilingResponse fields will be set
     * @param body The FilingResponseDto json data model that will be mapped
     */
    populateResource(resource, body) {
        resource.resource = {
            id: body.id
        };
    }
    getCompanyOfficerDetails(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpGet(url);
            if (resp.status >= 400) {
                return { httpStatusCode: resp.status, errors: [resp.error] };
            }
            const resource = { httpStatusCode: resp.status };
            const body = resp.body;
            resource.resource = mapping_1.default.camelCaseKeys(body);
            return resource;
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=service.js.map
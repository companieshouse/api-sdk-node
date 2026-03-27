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
const util_1 = require("../../util");
/**
 * A service class for managing communications with the associations API.
 */
class AssociationsService {
    /**
     * Constructs an AssociationsService instance.
     * @param client - The HTTP client for making requests.
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Initiates an HTTP GET request to retrieve the associations for a company.
     * @param companyNumber - a company number of the company for which the associations should be retrieved.
     * @param includeRemoved - a flag to get a list of companies where status is "removed". Default value: false.
     * @param pageIndex - a page number to be returned. Default value: 0.
     * @param itemsPerPage - a number of items to be returned per page. Default value: 15.
     * @returns a promise that resolves to the HTTP response from the server that includes the associations or errors object.
     */
    getCompanyAssociations(companyNumber, includeRemoved, pageIndex, itemsPerPage, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryString = "";
            if (includeRemoved || pageIndex || itemsPerPage) {
                const queryParameters = {
                    include_removed: includeRemoved || undefined,
                    page_index: pageIndex || undefined,
                    items_per_page: itemsPerPage || undefined
                };
                queryString = this.getQueryString(queryParameters);
            }
            const url = `/associations/companies/${companyNumber}${queryString}`;
            const headers = util_1.addRequestIdHeader(requestId);
            const response = yield this.client.httpGet(url, headers);
            return this.getResource(response);
        });
    }
    /**
     * Searches for an association between a user and a company using either the user's email or user ID.
     * Only one of userEmail or userId should be provided.
     * Optionally filter by association status.
     *
     * @param companyNumber - The company number to search associations for.
     * @param userEmail - The user's email address (optional).
     * @param userId - The user's unique identifier (optional).
     * @param associationStatus - Array of association statuses to filter by (optional).
     *        Available values: confirmed, awaiting-approval, removed, migrated, unauthorised.
     *        Default: confirmed.
     * @returns Promise resolving to the association or errors object.
     */
    searchForCompanyAssociation(companyNumber, userEmail, userId, associationStatus, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/associations/companies/${companyNumber}/search`;
            const body = {};
            if (userEmail)
                body.user_email = userEmail;
            if (userId)
                body.user_id = userId;
            if (associationStatus)
                body.status = associationStatus;
            const headers = util_1.addRequestIdHeader(requestId);
            const response = yield this.client.httpPost(url, body, headers);
            return this.getResource(response);
        });
    }
    /**
         * Initiates an HTTP GET request to retrieve the associations searched based on association status.
         * @param associationStatus - an association status used to filter associations. This parameter is required. Available values: confirmed, awaiting-approval, removed. Default value: confirmed.
         * @param pageIndex - a page to be returned. Default value: 0.
         * @param itemsPerPage - a number of items returned per page. Default value: 15.
         * @param companyNumber - a filter based on company number.
         * @returns a promise that resolves to the HTTP response from the server that includes the associations or errors object.
         */
    searchAssociations(associationStatus, pageIndex, itemsPerPage, companyNumber, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParameters = {
                page_index: pageIndex || undefined,
                items_per_page: itemsPerPage || undefined,
                company_number: companyNumber || undefined,
                status: associationStatus
            };
            const queryString = this.getQueryString(queryParameters);
            const url = `/associations${queryString}`;
            const headers = util_1.addRequestIdHeader(requestId);
            const response = yield this.client.httpGet(url, headers);
            return this.getResource(response);
        });
    }
    /**
     * Creates a new association for a user with provided userId.
     * @param companyNumber - The company number for the new association.
     * @param userId - The user's unique identifier.
     * @returns A promise resolving to the new association's link or errors object.
     */
    createAssociation(companyNumber, userId, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "/associations";
            const body = { company_number: companyNumber, user_id: userId };
            const headers = util_1.addRequestIdHeader(requestId);
            const response = yield this.client.httpPost(url, body, headers);
            return this.getResource(response);
        });
    }
    /**
     * Invites a user with the provided email address to a company.
     * @param companyNumber - The company number.
     * @param inviteeEmailAddress - The email address of the user to invite.
     * @returns A promise resolving to the new association's link or errors object.
     */
    inviteUser(companyNumber, inviteeEmailAddress, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "/associations/invitations";
            const body = { company_number: companyNumber, invitee_email_id: inviteeEmailAddress };
            const headers = util_1.addRequestIdHeader(requestId);
            const response = yield this.client.httpPost(url, body, headers);
            return this.getResource(response);
        });
    }
    /**
     * Returns an association data for the association with the provided association identifier.
     * @param associationId - an identifier of the association for which data has to be returned.
     * @returns a promise that resolves to the HTTP response from the server that includes the association data or errors object.
     */
    getAssociation(associationId, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/associations/${associationId}`;
            const headers = util_1.addRequestIdHeader(requestId);
            const response = yield this.client.httpGet(url, headers);
            return this.getResource(response);
        });
    }
    /**
     * Changes the status of an association with the provided identifier to the provided status.
     * @param associationId - an identifier of the association to modify.
     * @param status - a new status for the association.
     * @returns a promise that resolves to the HTTP response from the server that has no resource data or includes errors object.
     */
    updateAssociationStatus(associationId, status, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/associations/${associationId}`;
            const body = { status: status };
            const headers = util_1.addRequestIdHeader(requestId);
            const response = yield this.client.httpPatch(url, body, headers);
            return this.getResource(response);
        });
    }
    /**
     * Initiates an HTTP GET fetch active invitations for a user in session from all associations.
     * This request return only the invitations which are active (status = awaiting_approval)
     * and not expired.
     * @param pageIndex - page number to be returned, default value: 0.
     * @param itemsPerPage - a number of items to be returned per page. Default value: 15.
     * @returns a promise that resolves to the invitations list for this user or errors object.
     */
    getInvitations(pageIndex, itemsPerPage, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParameters = {
                page_index: pageIndex || undefined,
                items_per_page: itemsPerPage || undefined
            };
            const queryString = this.getQueryString(queryParameters);
            const url = `/associations/invitations${queryString}`;
            const headers = util_1.addRequestIdHeader(requestId);
            const response = yield this.client.httpGet(url, headers);
            return this.getResource(response);
        });
    }
    /**
     * Creates a new invitation (association) for the supplied email and company number.
     * @param companyNumber - the company number.
     * @param inviteeEmailAddress - email address of the user invited to have an association.
     * @returns a promise that resolves to the HTTP response from the server that includes the new association's identifier or errors object.
     */
    postInvitation(companyNumber, inviteeEmailAddress, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                company_number: companyNumber,
                invitee_email_id: inviteeEmailAddress
            };
            const url = `/associations/invitations`;
            const headers = util_1.addRequestIdHeader(requestId);
            const response = yield this.client.httpPost(url, body, headers);
            return this.getResource(response);
        });
    }
    /**
     * Initiates an HTTP GET request to return all previous states for an association. This will not return the active state.
     * @param associationID - an identifier of the association for which the previous states are being returned.
     * @param pageIndex - a page number to be returned. Default value: 0.
     * @param itemsPerPage - a number of items to be returned per page. Default value: 15.
     * @returns a promise that resolves to the HTTP response from the server that includes the PreviousStateList or an Errors object.
     */
    getPreviousStates(associationID, pageIndex, itemsPerPage, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryString = "";
            if (pageIndex || itemsPerPage) {
                const queryParameters = {
                    page_index: pageIndex || undefined,
                    items_per_page: itemsPerPage || undefined
                };
                queryString = this.getQueryString(queryParameters);
            }
            const url = `/associations/${associationID}/previous-states${queryString}`;
            const headers = util_1.addRequestIdHeader(requestId);
            const response = yield this.client.httpGet(url, headers);
            return this.getResource(response);
        });
    }
    /**
     * Creates a query string based on the properties provided in queryParameters object.
     * @param queryParameters - an object of which properties are used as key-value entries to a query string to be added to URL.
     * @returns - a query string or an empty string if no parameters provided.
     */
    getQueryString(queryParameters) {
        let queryString = "";
        if (queryParameters && Object.keys(queryParameters).length > 0) {
            let counter = Object.keys(queryParameters).length;
            queryString = "?";
            for (const [key, value] of Object.entries(queryParameters)) {
                counter--;
                if (!value) {
                    continue;
                }
                const keyValuePair = key === AssociationsService.STATUS
                    ? this.getExplodableArray(key, value)
                    : `${key}=${value}`;
                const separator = counter > 0 ? "&" : "";
                queryString = `${queryString}${keyValuePair}${separator}`;
            }
        }
        return queryString;
    }
    /**
     * Creates a string containing key-value pairs connected with an ampersand & to include in a query string.
     * @param keyName - a key name common for all values.
     * @param values - an array of values to include in the string.
     * @returns a string containing key-value pairs connected with an ampersand.
     */
    getExplodableArray(keyName, values) {
        let queryString = "";
        let counter = values.length;
        for (const value of values) {
            counter--;
            const separator = counter > 0 ? "&" : "";
            queryString = `${queryString}${keyName}=${value}${separator}`;
        }
        return queryString;
    }
    /**
     * Maps the resource data structures from snake case to camel keys.
     * @param response - a HTTP response object with resource data.
     * @returns a resource data with camel case keys.
     */
    getResource(response) {
        const resource = {
            httpStatusCode: response.status
        };
        resource.resource = mapping_1.default.camelCaseKeys(response.body);
        return resource;
    }
}
exports.default = AssociationsService;
AssociationsService.STATUS = "status";
//# sourceMappingURL=service.js.map
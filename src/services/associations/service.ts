import IHttpClient, { Headers, HttpResponse } from "http/http-client";
import Resource from "../../services/resource";
import {
    Association,
    AssociationList,
    AssociationsResponse,
    AssociationStatus,
    Errors,
    InvitationList,
    NewAssociationResponse,
    PreviousStateList,
    QueryParameters
} from "./types";
import Mapping from "../../mapping/mapping";

/**
 * A service class for managing communications with the associations API.
 */
export default class AssociationsService {
    private static readonly STATUS = "status";

    /**
     * Constructs an AssociationsService instance.
     * @param client - The HTTP client for making requests.
     */
    constructor (private readonly client: IHttpClient) { }

    /**
     * Initiates an HTTP GET request to retrieve the associations for a company.
     * @param companyNumber - a company number of the company for which the associations should be retrieved.
     * @param includeRemoved - a flag to get a list of companies where status is "removed". Default value: false.
     * @param pageIndex - a page number to be returned. Default value: 0.
     * @param itemsPerPage - a number of items to be returned per page. Default value: 15.
     * @param userEmail - an email address of a user to check if associated with the company.
     * @param userId - a unique identifier of a user to check if associated with the company.
     * @returns a promise that resolves to the HTTP response from the server that includes the associations or errors object.
     */
    public async getCompanyAssociations (
        companyNumber: string,
        includeRemoved?: boolean,
        pageIndex?: number,
        itemsPerPage?: number,
        userEmail?: string,
        userId?: string
    ): Promise<Resource<AssociationList | Errors>> {
        let queryString: string = "";
        if (includeRemoved || pageIndex || itemsPerPage || userId) {
            const queryParameters: QueryParameters = {
                include_removed: includeRemoved || undefined,
                page_index: pageIndex || undefined,
                items_per_page: itemsPerPage || undefined,
                user_id: userId || undefined
            };
            queryString = this.getQueryString(queryParameters);
        }

        let headers: Headers;
        if (userEmail) {
            headers = { user_email: userEmail };
        }

        const url = `/associations/companies/${companyNumber}${queryString}`;
        const response = await this.client.httpGet(url, headers);

        return this.getResource(response) as Resource<AssociationList | Errors>;
    }

    /**
     * Initiates an HTTP GET request to retrieve the associations searched based on association status.
     * @param associationStatus - an association status used to filter associations. This parameter is required. Available values: confirmed, awaiting-approval, removed. Default value: confirmed.
     * @param pageIndex - a page to be returned. Default value: 0.
     * @param itemsPerPage - a number of items returned per page. Default value: 15.
     * @param companyNumber - a filter based on company number.
     * @returns a promise that resolves to the HTTP response from the server that includes the associations or errors object.
     */
    public async searchAssociations (
        associationStatus: AssociationStatus[],
        pageIndex?: number,
        itemsPerPage?: number,
        companyNumber?: string
    ): Promise<Resource<AssociationList | Errors>> {
        const queryParameters: QueryParameters = {
            page_index: pageIndex || undefined,
            items_per_page: itemsPerPage || undefined,
            company_number: companyNumber || undefined,
            status: associationStatus
        };
        const queryString = this.getQueryString(queryParameters);

        const url = `/associations${queryString}`;
        const response = await this.client.httpGet(url);

        return this.getResource(response) as Resource<AssociationList | Errors>;
    }

    /**
     * Creates a new association for a user in session.
     * @param companyNumber - a company number of the company with which a new association for the user will be created.
     * @param inviteeEmailAddress - an email address of the user invited to have an association with a company.
     * @returns a promise that resolves to the HTTP response from the server that includes the new association's link (it contains the association identifier) or errors object.
     */
    public async createAssociation (
        companyNumber: string,
        inviteeEmailAddress?: string
    ): Promise<Resource<NewAssociationResponse | Errors>> {
        const url = inviteeEmailAddress ? "/associations/invitations" : "/associations";
        const body = inviteeEmailAddress
            ? { company_number: companyNumber, invitee_email_id: inviteeEmailAddress }
            : { company_number: companyNumber };
        const response = await this.client.httpPost(url, body);

        return this.getResource(response) as Resource<NewAssociationResponse | Errors>;
    }

    /**
     * Returns an association data for the association with the provided association identifier.
     * @param associationId - an identifier of the association for which data has to be returned.
     * @returns a promise that resolves to the HTTP response from the server that includes the association data or errors object.
     */
    public async getAssociation (
        associationId: string
    ): Promise<Resource<Association | Errors>> {
        const url = `/associations/${associationId}`;
        const response = await this.client.httpGet(url);

        return this.getResource(response) as Resource<Association | Errors>;
    }

    /**
     * Changes the status of an association with the provided identifier to the provided status.
     * @param associationId - an identifier of the association to modify.
     * @param status - a new status for the association.
     * @returns a promise that resolves to the HTTP response from the server that has no resource data or includes errors object.
     */
    public async updateAssociationStatus (
        associationId: string,
        status: AssociationStatus
    ): Promise<Resource<undefined | Errors>> {
        const url = `/associations/${associationId}`;
        const body = { status: status };
        const response = await this.client.httpPatch(url, body);

        return this.getResource(response) as Resource<undefined | Errors>;
    }

    /**
     * Initiates an HTTP GET fetch active invitations for a user in session from all associations.
     * This request return only the invitations which are active (status = awaiting_approval)
     * and not expired.
     * @param pageIndex - page number to be returned, default value: 0.
     * @param itemsPerPage - a number of items to be returned per page. Default value: 15.
     * @returns a promise that resolves to the invitations list for this user or errors object.
     */
    public async getInvitations (
        pageIndex?: number,
        itemsPerPage?: number
    ): Promise<Resource<InvitationList | Errors>> {
        const queryParameters: QueryParameters = {
            page_index: pageIndex || undefined,
            items_per_page: itemsPerPage || undefined
        };
        const queryString = this.getQueryString(queryParameters);

        const url = `/associations/invitations${queryString}`;
        const response = await this.client.httpGet(url);

        return this.getResource(response) as Resource<InvitationList | Errors>;
    }

    /**
     * Creates a new invitation (association) for the supplied email and company number.
     * @param companyNumber - the company number.
     * @param inviteeEmailAddress - email address of the user invited to have an association.
     * @returns a promise that resolves to the HTTP response from the server that includes the new association's identifier or errors object.
     */
    public async postInvitation (
        companyNumber: string,
        inviteeEmailAddress: string
    ): Promise<Resource<NewAssociationResponse | Errors>> {
        const body = {
            company_number: companyNumber,
            invitee_email_id: inviteeEmailAddress
        };
        const url = `/associations/invitations`;

        const response = await this.client.httpPost(url, body);

        return this.getResource(response) as Resource<NewAssociationResponse | Errors>;
    }

    /**
     * Initiates an HTTP GET request to return all previous states for an association. This will not return the active state.
     * @param associationID - an identifier of the association for which the previous states are being returned.
     * @param pageIndex - a page number to be returned. Default value: 0.
     * @param itemsPerPage - a number of items to be returned per page. Default value: 15.
     * @returns a promise that resolves to the HTTP response from the server that includes the PreviousStateList or an Errors object.
     */
    public async getPreviousStates (
        associationID: string,
        pageIndex?: number,
        itemsPerPage?: number
    ): Promise<Resource<PreviousStateList | Errors>> {
        let queryString: string = "";
        if (pageIndex || itemsPerPage) {
            const queryParameters: QueryParameters = {
                page_index: pageIndex || undefined,
                items_per_page: itemsPerPage || undefined
            };
            queryString = this.getQueryString(queryParameters);
        }

        const url = `/associations/${associationID}/previous-states${queryString}`;
        const response = await this.client.httpGet(url);

        return this.getResource(response) as Resource<PreviousStateList | Errors>;
    }

    /**
     * Creates a query string based on the properties provided in queryParameters object.
     * @param queryParameters - an object of which properties are used as key-value entries to a query string to be added to URL.
     * @returns - a query string or an empty string if no parameters provided.
     */
    private getQueryString (queryParameters: QueryParameters): string {
        let queryString: string = "";
        if (queryParameters && Object.keys(queryParameters).length > 0) {
            let counter = Object.keys(queryParameters).length;
            queryString = "?";
            for (const [key, value] of Object.entries(queryParameters)) {
                counter--;
                if (!value) {
                    continue;
                }

                const keyValuePair =
                    key === AssociationsService.STATUS
                        ? this.getExplodableArray<AssociationStatus>(key, value)
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
    private getExplodableArray<T> (keyName: string, values: T[]): string {
        let queryString: string = "";
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
    private getResource (response: HttpResponse): Resource<AssociationsResponse> {
        const resource: Resource<AssociationsResponse> = {
            httpStatusCode: response.status
        };

        resource.resource = Mapping.camelCaseKeys<AssociationsResponse>(response.body);

        return resource;
    }
}

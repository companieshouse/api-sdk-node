import IHttpClient from "http/http-client";
import Resource from "../../services/resource";
import { Association, AssociationList, AssociationStatus, Errors, InvitationList, NewAssociationResponse, PreviousStateList } from "./types";
/**
 * A service class for managing communications with the associations API.
 */
export default class AssociationsService {
    private readonly client;
    private static readonly STATUS;
    /**
     * Constructs an AssociationsService instance.
     * @param client - The HTTP client for making requests.
     */
    constructor(client: IHttpClient);
    /**
     * Initiates an HTTP GET request to retrieve the associations for a company.
     * @param companyNumber - a company number of the company for which the associations should be retrieved.
     * @param includeRemoved - a flag to get a list of companies where status is "removed". Default value: false.
     * @param pageIndex - a page number to be returned. Default value: 0.
     * @param itemsPerPage - a number of items to be returned per page. Default value: 15.
     * @param userId - a unique identifier of a user to check if associated with the company.
     * @returns a promise that resolves to the HTTP response from the server that includes the associations or errors object.
     */
    getCompanyAssociations(companyNumber: string, includeRemoved?: boolean, pageIndex?: number, itemsPerPage?: number, userId?: string): Promise<Resource<AssociationList | Errors>>;
    /**
     * Initiates an HTTP GET request to retrieve the association for a company for the provided user email.
     * @param companyNumber  - a company number of the company for which the associations should be retrieved.
     * @param userEmail - an email address of a user to check if associated with the company.
     * @returns a promise that resolves to the HTTP response from the server that includes the association or errors object.
     */
    getCompanyAssociationByUserEmail(companyNumber: string, userEmail: string): Promise<Resource<Association | Errors>>;
    /**
         * Initiates an HTTP GET request to retrieve the associations searched based on association status.
         * @param associationStatus - an association status used to filter associations. This parameter is required. Available values: confirmed, awaiting-approval, removed. Default value: confirmed.
         * @param pageIndex - a page to be returned. Default value: 0.
         * @param itemsPerPage - a number of items returned per page. Default value: 15.
         * @param companyNumber - a filter based on company number.
         * @returns a promise that resolves to the HTTP response from the server that includes the associations or errors object.
         */
    searchAssociations(associationStatus: AssociationStatus[], pageIndex?: number, itemsPerPage?: number, companyNumber?: string): Promise<Resource<AssociationList | Errors>>;
    /**
     * Creates a new association for a user in session.
     * @param companyNumber - a company number of the company with which a new association for the user will be created.
     * @param inviteeEmailAddress - an email address of the user invited to have an association with a company.
     * @returns a promise that resolves to the HTTP response from the server that includes the new association's link (it contains the association identifier) or errors object.
     */
    createAssociation(companyNumber: string, inviteeEmailAddress?: string): Promise<Resource<NewAssociationResponse | Errors>>;
    /**
     * Returns an association data for the association with the provided association identifier.
     * @param associationId - an identifier of the association for which data has to be returned.
     * @returns a promise that resolves to the HTTP response from the server that includes the association data or errors object.
     */
    getAssociation(associationId: string): Promise<Resource<Association | Errors>>;
    /**
     * Changes the status of an association with the provided identifier to the provided status.
     * @param associationId - an identifier of the association to modify.
     * @param status - a new status for the association.
     * @returns a promise that resolves to the HTTP response from the server that has no resource data or includes errors object.
     */
    updateAssociationStatus(associationId: string, status: AssociationStatus): Promise<Resource<undefined | Errors>>;
    /**
     * Initiates an HTTP GET fetch active invitations for a user in session from all associations.
     * This request return only the invitations which are active (status = awaiting_approval)
     * and not expired.
     * @param pageIndex - page number to be returned, default value: 0.
     * @param itemsPerPage - a number of items to be returned per page. Default value: 15.
     * @returns a promise that resolves to the invitations list for this user or errors object.
     */
    getInvitations(pageIndex?: number, itemsPerPage?: number): Promise<Resource<InvitationList | Errors>>;
    /**
     * Creates a new invitation (association) for the supplied email and company number.
     * @param companyNumber - the company number.
     * @param inviteeEmailAddress - email address of the user invited to have an association.
     * @returns a promise that resolves to the HTTP response from the server that includes the new association's identifier or errors object.
     */
    postInvitation(companyNumber: string, inviteeEmailAddress: string): Promise<Resource<NewAssociationResponse | Errors>>;
    /**
     * Initiates an HTTP GET request to return all previous states for an association. This will not return the active state.
     * @param associationID - an identifier of the association for which the previous states are being returned.
     * @param pageIndex - a page number to be returned. Default value: 0.
     * @param itemsPerPage - a number of items to be returned per page. Default value: 15.
     * @returns a promise that resolves to the HTTP response from the server that includes the PreviousStateList or an Errors object.
     */
    getPreviousStates(associationID: string, pageIndex?: number, itemsPerPage?: number): Promise<Resource<PreviousStateList | Errors>>;
    /**
     * Creates a query string based on the properties provided in queryParameters object.
     * @param queryParameters - an object of which properties are used as key-value entries to a query string to be added to URL.
     * @returns - a query string or an empty string if no parameters provided.
     */
    private getQueryString;
    /**
     * Creates a string containing key-value pairs connected with an ampersand & to include in a query string.
     * @param keyName - a key name common for all values.
     * @param values - an array of values to include in the string.
     * @returns a string containing key-value pairs connected with an ampersand.
     */
    private getExplodableArray;
    /**
     * Maps the resource data structures from snake case to camel keys.
     * @param response - a HTTP response object with resource data.
     * @returns a resource data with camel case keys.
     */
    private getResource;
}

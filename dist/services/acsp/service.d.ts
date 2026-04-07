import { AcspData, AcspResponse, ClientVerificationEmail } from "./types";
import { HttpResponse, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
export default class {
    private readonly client;
    constructor(client: IHttpClient);
    getAcsp(transactionId: string, acspApplicationId: string): Promise<Resource<AcspData> | ApiErrorResponse>;
    /**
     * Post an ACSP object to create on the API.
     * @param transactionId transaction id associated with the data to be saved
     * @param acsp the data to be saved
     */
    postACSP(transactionId: string, acsp: AcspData): Promise<Resource<AcspResponse> | ApiErrorResponse>;
    /**
     * Put an ACSP object to update on the API.
     * @param transactionId transaction id associated with the data to be saved
     * @param acspApplicationId acsp application id unique to the application
     * @param acsp the data to be saved
     */
    putACSP(transactionId: string, acspApplicationId: string, acsp: AcspData): Promise<Resource<AcspResponse> | ApiErrorResponse>;
    getSavedApplication(acspApplicationId: string): Promise<HttpResponse>;
    /**
     * Delete an existing ACSP application from MongoDB
     * @param transactionId the id of the transaction associated with the application. This will also be deleted.
     * @param acspApplicationId the id of the user whose application will be deleted
     */
    deleteSavedApplication(transactionId: string, acspApplicationId: string): Promise<HttpResponse>;
    /**
     * Send an identity verification email to verify or reverify a client identity web app.
     * @param emailData the email data containing verification details
     * @param queryParams optional query parameters
     * @param queryParams.application_type optional application type to filter the verification or reverification services.
     * @returns Promise that resolves to the HTTP response from the API
     */
    sendIdentityVerificationEmail(emailData: ClientVerificationEmail, queryParams?: {
        application_type?: string;
    }): Promise<HttpResponse>;
}

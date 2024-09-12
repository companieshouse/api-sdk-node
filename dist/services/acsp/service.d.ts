import { AcspData, AcspResponse } from "./types";
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
     * @param acspApplicationId the id of the user whose application will be deleted
     */
    deleteSavedApplication(acspApplicationId: string): Promise<HttpResponse>;
}

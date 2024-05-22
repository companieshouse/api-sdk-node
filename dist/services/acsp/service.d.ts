import { AcspData, AcspResponse } from "./types";
import { IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
export default class {
    private readonly client;
    constructor(client: IHttpClient);
    getAcsp(transactionId: string, id: string): Promise<Resource<AcspData> | ApiErrorResponse>;
    /**
     * Post an ACSP object to update on the API.
     */
    postACSP(transactionId: string, acsp: AcspData): Promise<Resource<AcspResponse> | ApiErrorResponse>;
}

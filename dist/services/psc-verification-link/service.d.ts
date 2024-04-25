import { PscVerification, PscVerificationResource } from "./types";
import { IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
export default class PscVerificationService {
    private readonly client;
    constructor(client: IHttpClient);
    postPscVerification(transactionId: string, pscVerification: PscVerification): Promise<Resource<PscVerificationResource> | ApiErrorResponse>;
    getPscVerification(transactionId: string, pscVerificationId: string): Promise<Resource<PscVerificationResource> | ApiErrorResponse>;
    private populateResource;
}

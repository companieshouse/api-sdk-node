import { PscVerification, PscVerificationResource } from "./types";
import { IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
export default class {
    private readonly client;
    constructor(client: IHttpClient);
    postPscVerification(transactionId: string, pscVerification: PscVerification): Promise<Resource<PscVerificationResource> | ApiErrorResponse>;
    private populateResource;
}

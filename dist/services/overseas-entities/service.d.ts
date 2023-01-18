import { IHttpClient } from "../../http";
import { HttpStatusCode, OverseasEntity, OverseasEntityCreated } from "./types";
import Resource, { ApiErrorResponse } from "../resource";
export default class OverseasEntityService {
    private readonly client;
    constructor(client: IHttpClient);
    getOverseasEntity(transactionId: string, overseasEntityId: string): Promise<Resource<OverseasEntity> | ApiErrorResponse>;
    postOverseasEntity(transactionId: string, body: OverseasEntity, isSaveAndResumeFeatureActive?: boolean): Promise<Resource<OverseasEntityCreated> | ApiErrorResponse>;
    putOverseasEntity(transactionId: string, overseasEntityId: string, body: OverseasEntity): Promise<Resource<HttpStatusCode> | ApiErrorResponse>;
}

import { IHttpClient } from "../../http";
import { OverseasEntity, OverseasEntityCreated } from "./types";
import Resource, { ApiErrorResponse } from "../resource";
export default class OverseasEntityService {
    private readonly client;
    constructor(client: IHttpClient);
    postOverseasEntity(transactionId: string, body: OverseasEntity): Promise<Resource<OverseasEntityCreated> | ApiErrorResponse>;
}

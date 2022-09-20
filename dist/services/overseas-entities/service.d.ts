import { IHttpClient } from "../../http";
import { OverseasEntity, OverseasEntityCreated } from "./types";
import Resource, { ApiErrorResponse } from "../resource";
export default class OverseasEntityService {
    private readonly client;
    constructor(client: IHttpClient);
    postOverseasEntity(transactionId: string, body: OverseasEntity): Promise<Resource<OverseasEntityCreated> | ApiErrorResponse>;
    /**
     * Proof of concept for ROE-1271
     * Not to be used for Live code
     * @param transactionId
     * @param body
     * @returns
     */
    proofOfConceptPutOverseasEntity(transactionId: string, body: OverseasEntity): Promise<Resource<OverseasEntityCreated> | ApiErrorResponse>;
    /**
     * Proof of concept for ROE-1271
     * Not to be used for Live code
     * @param transactionId
     * @returns
     */
    proofOfConceptPatchOverseasEntity(transactionId: string): Promise<Resource<void> | ApiErrorResponse>;
}

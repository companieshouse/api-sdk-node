import { IHttpClient } from "../../../http";
import { MidItem, MidItemPostRequest } from "./types";
import Resource from "../../resource";
export default class {
    private readonly client;
    constructor(client: IHttpClient);
    getMid(missingImageDeliveryId: string): Promise<Resource<MidItem>>;
    postMid(midItemRequest: MidItemPostRequest): Promise<Resource<MidItem>>;
}

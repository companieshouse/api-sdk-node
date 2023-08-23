import { IHttpClient } from "../../../http";
import { MidItem, MidItemPostRequest } from "./types";
import Resource from "../../resource";
export default class MissingImageDeliveryService {
    private readonly client;
    private static readonly EXCLUDED_FIELDS;
    constructor(client: IHttpClient);
    getMid(missingImageDeliveryId: string): Promise<Resource<MidItem>>;
    postMid(midItemRequest: MidItemPostRequest): Promise<Resource<MidItem>>;
}

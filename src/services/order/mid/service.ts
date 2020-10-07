import { IHttpClient } from "../../../http";
import { MidItem, MidItemResource, MidItemPostRequest, MidItemRequestResource } from "./types";
import Resource from "../../resource";
import MidMapping from "./mapping";

export default class {
    constructor (private readonly client: IHttpClient) { }

    public async getMid (missingImageDeliveryId: string): Promise<Resource<MidItem>> {
        const resp = await this.client.httpGet(`/orderable/missing-image-deliveries/${missingImageDeliveryId}`);

        const resource: Resource<MidItem> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        };

        const body = resp.body as MidItemResource;

        resource.resource = MidMapping.mapMidItemResourceToMidItem(body);
        return resource;
    };

    public async postMid (midItemRequest: MidItemPostRequest): Promise<Resource<MidItem>> {
        const midItemRequestResource: MidItemRequestResource = MidMapping.mapMidItemRequestToMidItemRequestResource(midItemRequest);
        const resp = await this.client.httpPost("/orderable/missing-image-deliveries", midItemRequestResource);

        const resource: Resource<MidItem> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        };

        const body = resp.body as MidItemResource;

        resource.resource = MidMapping.mapMidItemResourceToMidItem(body);
        return resource;
    };
};

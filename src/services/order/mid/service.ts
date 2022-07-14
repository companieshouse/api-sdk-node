import { IHttpClient } from "../../../http";
import { MidItem, MidItemResource, MidItemPostRequest, MidItemRequestResource } from "./types";
import Resource from "../../resource";
import Mapping from "../../../mapping/mapping";

export default class MissingImageDeliveryService {
    private static readonly EXCLUDED_FIELDS = {
        deep: true,
        stopPaths: [
            "description_values",
            "item_options.filing_history_description_values"
        ]
    };

    constructor (private readonly client: IHttpClient) { }

    public async getMid (missingImageDeliveryId: string): Promise<Resource<MidItem>> {
        const resp = await this.client.httpGet(`/orderable/missing-image-deliveries/${missingImageDeliveryId}`);

        const resource: Resource<MidItem> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        const body = resp.body as MidItemResource;

        resource.resource = Mapping.camelCaseKeys(body, MissingImageDeliveryService.EXCLUDED_FIELDS);
        return resource;
    };

    public async postMid (midItemRequest: MidItemPostRequest): Promise<Resource<MidItem>> {
        const midItemRequestResource = Mapping.snakeCaseKeys(midItemRequest);
        const resp = await this.client.httpPost("/orderable/missing-image-deliveries", midItemRequestResource);

        const resource: Resource<MidItem> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        const body = resp.body as MidItemResource;

        resource.resource = Mapping.camelCaseKeys(body, MissingImageDeliveryService.EXCLUDED_FIELDS);
        return resource;
    };
};

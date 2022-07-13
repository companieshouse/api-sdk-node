import { IHttpClient } from "../../../http";
import { CertifiedCopyItem, CertifiedCopyItemResource } from "./types";
import Resource from "../../resource";
import Mapping from "../../../mapping/mapping";

export default class CertifiedCopyService {
    private static readonly EXCLUDED_FIELDS = {
        deep: true,
        stopPaths: [
            "description_values", // all items
            "item_options.filing_history_documents.filing_history_description_values" // certified copies
        ]
    };

    constructor (private readonly client: IHttpClient) { }

    public async getCertifiedCopy (certifiedCopyId: string): Promise<Resource<CertifiedCopyItem>> {
        const resp = await this.client.httpGet(`/orderable/certified-copies/${certifiedCopyId}`);

        const resource: Resource<CertifiedCopyItem> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        const body = resp.body as CertifiedCopyItemResource;

        resource.resource = Mapping.camelCaseKeys(body, CertifiedCopyService.EXCLUDED_FIELDS);
        return resource;
    };
};

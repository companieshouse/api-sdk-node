import { IHttpClient } from "../../../http";
import { CertifiedCopyItem, CertifiedCopyItemResource } from "./types";
import Resource from "../../resource";
import CertifiedCopyMapping from "./mapping";
import Mapping from "../../../mapping/mapping";

export default class {
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

        resource.resource = CertifiedCopyMapping.mapCertifiedItemResourceToCertifiedCopyItem(body);
        return resource;
    };
};

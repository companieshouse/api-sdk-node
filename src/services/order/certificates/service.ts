import { IHttpClient } from "../../../http";
import {
    CertificateItem, CertificateItemResource, CertificateItemPostRequest, CertificateItemRequestResource,
    CertificateItemPatchRequest
} from "./types";
import Resource from "../../resource";
import CertificateMapping from "./mapping";

export default class {
    constructor (private readonly client: IHttpClient) { }

    public async getCertificate (certificateId: string): Promise<Resource<CertificateItem>> {
        const resp = await this.client.httpGet(`/orderable/certificates/${certificateId}`);

        const resource: Resource<CertificateItem> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        const body = resp.body as CertificateItemResource;

        resource.resource = CertificateMapping.mapCertificateItemResourceToCertificateItem(body);
        return resource;
    }

    public async postCertificate (certificateItemRequest: CertificateItemPostRequest): Promise<Resource<CertificateItem>> {
        const certificateItemRequestResource: CertificateItemRequestResource =
    CertificateMapping.mapCertificateItemRequestToCertificateItemRequestResource(certificateItemRequest);

        const resp = await this.client.httpPost("/orderable/certificates", certificateItemRequestResource);

        const resource: Resource<CertificateItem> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        const body = resp.body as CertificateItemResource;

        resource.resource = CertificateMapping.mapCertificateItemResourceToCertificateItem(body);
        return resource;
    }

    public async patchCertificate (certificateItemRequest: CertificateItemPatchRequest, certificateId: string):
    Promise<Resource<CertificateItem>> {
        const certificateItemRequestResource: CertificateItemRequestResource =
    CertificateMapping.mapCertificateItemRequestToCertificateItemRequestResource(certificateItemRequest);

        const additionalHeaders = {
            "Content-Type": "application/merge-patch+json"
        };
        const resp = await this.client.httpPatch(`/orderable/certificates/${certificateId}`,
            certificateItemRequestResource, additionalHeaders);

        const resource: Resource<CertificateItem> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        const body = resp.body as CertificateItemResource;

        resource.resource = CertificateMapping.mapCertificateItemResourceToCertificateItem(body);
        return resource;
    }
}
